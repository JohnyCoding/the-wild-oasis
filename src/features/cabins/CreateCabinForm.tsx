import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { CabinFormValues } from "../../types/types";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { Database } from "../../types/supabaseTypes";

type Props = {
	cabinToEdit?: Database["public"]["Tables"]["cabins"]["Row"];
	onCloseModal?: () => void;
};

function CreateCabinForm({ cabinToEdit, onCloseModal }: Props) {
	const { id: editId, ...editValue } = cabinToEdit ?? {};
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm<CabinFormValues>({
		defaultValues: isEditSession ? editValue : {},
	});
	const { errors } = formState;

	const { createCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();

	const isWorking = isCreating || isEditing;

	const onSubmit: SubmitHandler<CabinFormValues> = (data) => {
		const image = typeof data.image === "string" ? data.image : data.image;

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId! },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
	};

	const onError: SubmitErrorHandler<CabinFormValues> = (errors) => {
		console.log(errors);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} $type={onCloseModal ? "modal" : "regular"}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) => value < getValues().regularPrice || "Discount should be less than price",
					})}
				/>
			</FormRow>

			<FormRow label="Description for website" error={errors?.description?.message}>
				<Textarea
					type="text"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button $variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
