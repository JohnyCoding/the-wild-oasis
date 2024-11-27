import { FocusEvent } from "react";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { UpdateSettingsValues } from "../../types/types";
import { BREAKFAST_PRICE, MAX_BOOKING_LENGTH, MAX_GUESTS_PER_BOOKING, MIN_BOOKING_LENGTH } from "../../utils/constants";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings();
	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings ?? {};
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e: FocusEvent<HTMLInputElement, Element>, field: keyof UpdateSettingsValues): void {
		const value = e.target.value;
		if (!value) return;
		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength ?? MIN_BOOKING_LENGTH}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength ?? MAX_BOOKING_LENGTH}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking ?? MAX_GUESTS_PER_BOOKING}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice ?? BREAKFAST_PRICE}
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
