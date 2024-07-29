"use client";

import TextInput from "@/components/text-input";
import { useForm } from "react-hook-form";
import { displayToastAfterFetch } from "@/lib/toasts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/button";

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm(); // initialize the react-hook-form

	const router = useRouter(); // router for navigation

	const [isSubmitting, setIsSubmitting] = useState(false); // state to check if the form is already submitting

	async function onSubmit(formdata: any) {
		// function to handle the form submission
		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		const res = await fetch(`/api/auth/register`, {
			// call the register API endpoint
			method: "POST",
			body: JSON.stringify({
				// pass the necessary data in the request body
				email: formdata.email,
				password: formdata.password,
				repeat_password: formdata.repeat_password,
				firstname: formdata.firstname,
				lastname: formdata.lastname,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		if (res.status === 200) reset();

		displayToastAfterFetch(res, data); // display the result in a toast
		setIsSubmitting(false);
		router.push("/auth/login"); // redirect to the login page after successful registration
	}

	return (
		<form
			className='flex flex-col space-y-4 w-full text-sm'
			onSubmit={handleSubmit(async (data) => {
				onSubmit(data);
			})}
		>
			<TextInput
				label={"Lastname"}
				type='text'
				register={register}
				name='lastname'
				required={true}
				error={errors.lastname?.message?.toString()}
			/>
			<TextInput
				label={"Firstname"}
				type='text'
				register={register}
				name='firstname'
				required={true}
				error={errors.firstname?.message?.toString()}
			/>

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
			<TextInput
				label={"Repeat Password"}
				type='password'
				register={register}
				name='repeat_password'
				required={true}
				error={errors.repeat_password?.message?.toString()}
			/>
			<Button type='submit' disabled={isSubmitting}>
				{isSubmitting ? "Submitting..." : "Register"}
			</Button>
		</form>
	);
}
