import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { BREAKFAST_PRICE } from "../../utils/constants";

import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking, isLoading } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSettings();
	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking?.isPaid]);

	if (isLoading || isLoadingSettings) return <Spinner />;

	if (!booking) throw new Error("Booking could not be loaded for checkin");
	if (!settings) throw new Error("Settings could not be loaded for checkin");

	const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;
	if (!bookingId || !guests || !totalPrice || !numGuests || !numNights) throw new Error("Booking has incomplete data");

	const optionalBreakfastPrice = (settings.breakfastPrice ?? BREAKFAST_PRICE) * numNights * numGuests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: (totalPrice ?? 0) + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}
						id="breakfast"
					>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox checked={confirmPaid} onChange={() => setConfirmPaid((confirm) => !confirm)} disabled={confirmPaid || isCheckingIn} id="confirm">
					I confirm that {guests.fullName} has paid the total amount{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(totalPrice + optionalBreakfastPrice)}  (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={isCheckingIn}>
					Check in booking #{bookingId}
				</Button>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
