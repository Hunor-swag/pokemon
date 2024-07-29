"use client";

import TextInput from "@/components/text-input";
import { useForm } from "react-hook-form";
import { displayToastAfterFetch } from "@/lib/toasts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function Login({ callbackUrl }: { callbackUrl: string }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const router = useRouter();

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function onSubmit(formdata: any) {
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		const user = await signIn("credentials", {
			email: formdata.email,
			password: formdata.password,
			redirect: false,
		});

		if (user?.error) {
			toast.error("Invalid email or password", {
				autoClose: 2000,
				theme: "dark",
				style: {
					backgroundColor: "gray",
				},
			});
		} else {
			toast.success("Login successful", {
				autoClose: 2000,
				theme: "dark",
				style: {
					backgroundColor: "gray",
				},
			});
			if (callbackUrl) {
				router.push(callbackUrl);
			} else {
				router.push("/dashboard");
			}
		}
		router.refresh();
		setIsSubmitting(false);
	}

	return (
		<form
			className='flex flex-col space-y-4 w-full text-sm'
			onSubmit={handleSubmit(async (data) => {
				onSubmit(data);
			})}
		>
			<TextInput
				label={"Email"}
				type='email'
				register={register}
				name='email'
				required={true}
				error={errors.email?.message?.toString()}
			/>
			<TextInput
				label={"Password"}
				type='password'
				register={register}
				name='password'
				required={true}
				minLength={8}
				error={errors.password?.message?.toString()}
			/>
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? "Logging in..." : "Login"}
			</Button>
		</form>
	);
}
