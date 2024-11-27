import { useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const { booking, isLoading } = useBooking();
	const { deleteBooking, isDeleting } = useDeleteBooking();
	const { checkOut, isCheckingOut } = useCheckout();
	const navigate = useNavigate();
	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;

	if (!booking) return <Empty resourceName="booking" />;

	const { id: bookingId, status } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag $type={statusToTagName[status as keyof typeof statusToTagName]}>{status?.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
				{status === "checked-in" && (
					<Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
						Check out
					</Button>
				)}
				<Button $variation="danger" onClick={() => setShowConfirmDelete((show) => !show)}>
					Delete
				</Button>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
			{showConfirmDelete && (
				<Modal onClose={() => setShowConfirmDelete(false)}>
					<ConfirmDelete
						onConfirm={() => deleteBooking(bookingId, { onSettled: () => navigate(-1) })}
						resourceName={`Booking with id #${bookingId}`}
						disabled={isDeleting}
						onCloseModal={() => setShowConfirmDelete(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default BookingDetail;
