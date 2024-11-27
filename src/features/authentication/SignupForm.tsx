import { FieldValues, useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function SignupForm() {
	const { signup, isSigningUp } = useSignup();
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	function onSubmit({ fullName, email, password }: FieldValues) {
		signup(
			{ fullName, email, password },
			{
				onSettled: () => reset(),
			}
		);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors?.fullname?.message?.toString()}>
				<Input type="text" id="fullName" disabled={isSigningUp} {...register("fullName", { required: "This field is required" })} />
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message?.toString()}>
				<Input
					type="email"
					id="email"
					disabled={isSigningUp}
					{...register("email", { required: "This field is required", pattern: { value: /\S+@\S+\.\S+/, message: "Provide a valid email address" } })}
				/>
			</FormRow>

			<FormRow label="Password (min 8 characters)" error={errors?.password?.message?.toString()}>
				<Input
					type="password"
					id="password"
					disabled={isSigningUp}
					{...register("password", {
						required: "This field is required",
						minLength: { value: 8, message: "Password needs a minimum of 8 characters" },
					})}
				/>
			</FormRow>

			<FormRow label="Repeat password" error={errors?.passwordConfirm?.message?.toString()}>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSigningUp}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) => value === getValues().password || "Passwords need to match",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button $variation="secondary" type="reset" onClick={reset} disabled={isSigningUp}>
					Cancel
				</Button>
				<Button disabled={isSigningUp}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
