import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
	const { user } = useUser();
	const { email, user_metadata } = user ?? {};
	const { fullName: currentFullName } = user_metadata ?? {};

	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState<File | undefined>(undefined);
	const { updateUser, isUpdating } = useUpdateUser();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!fullName) return;
		updateUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(undefined);
					(e.target as HTMLFormElement)?.reset();
				},
			}
		);
	}

	function handleCancel() {
		setFullName(currentFullName);
		setAvatar(undefined);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" disabled={isUpdating} />
			</FormRow>
			<FormRow label="Avatar image">
				<FileInput id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0])} disabled={isUpdating} />
			</FormRow>
			<FormRow>
				<Button type="reset" $variation="secondary" disabled={isUpdating} onClick={handleCancel}>
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update account</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
