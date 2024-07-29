"use client";

import { Span } from "next/dist/trace";
import React from "react";

type Props = {
	label?: string;
	placeholder?: string;
	type: string;
	error?: string;
	name: string;
	register: any;
	required?: boolean;
	minLength?: number;
	defaultValue?: string;
	maxLength?: number;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	customRules?: any;
};

export default function TextInput({
	label,
	placeholder,
	type,
	error,
	name,
	register,
	required = false,
	minLength = 0,
	defaultValue = "",
	maxLength = 255,
	disabled = false,
	onChange = (e) => register(name).onChange(e),
	customRules,
}: Props) {
	return (
		<div className='flex flex-col w-72'>
			{label && (
				<label className=''>
					{label}
					{required && <label className='text-red-500'> *</label>}
				</label>
			)}
			<input
				{...register(name, {
					required: {
						value: required,
						message: `This field is required`,
					},
					maxLength: {
						value: maxLength,
						message: `Must be less than ${maxLength} characters`,
					},
					minLength: {
						value: minLength,
						message: `Must be at least ${minLength} characters`,
					},
					validate: customRules,
				})}
				className={`  rounded-sm border px-2 py-2 outline-none focus:border-gray-500 focus:shadow-md transition-all duration-200 ${
					error ? "border-red-600 focus:border-red-600" : "border-gray-200"
				}`}
				defaultValue={defaultValue}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
			{error && <span className='text-red-500'>{error}</span>}
		</div>
	);
}
