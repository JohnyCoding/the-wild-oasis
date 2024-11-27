import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { format, isToday } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import styled from "styled-components";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { BookingTableInfo } from "../../types/types";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

function BookingRow({
	booking: { id: bookingId, startDate, endDate, numNights, totalPrice, status, guests, cabins },
}: {
	booking: BookingTableInfo;
}) {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const navigate = useNavigate();
	const { checkOut, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	const { fullName: guestName, email } = guests ?? {};
	const { name: cabinName } = cabins ?? {};

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	if (!startDate || !endDate || !totalPrice) throw new Error("Booking table info is incomplete");

	return (
		<>
			<Table.Row>
				<Cabin>{cabinName}</Cabin>

				<Stacked>
					<span>{guestName}</span>
					<span>{email}</span>
				</Stacked>

				<Stacked>
					<span>
						{isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
					</span>
					<span>
						{format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
					</span>
				</Stacked>

				<Tag $type={statusToTagName[status as keyof typeof statusToTagName]}>{status?.replace("-", " ")}</Tag>

				<Amount>{formatCurrency(totalPrice)}</Amount>

				<Menus.Menu>
					<Menus.Toggle id={bookingId.toString()} />
					<Menus.List id={bookingId.toString()}>
						<Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${bookingId}`)}>
							See details
						</Menus.Button>
						{status === "unconfirmed" && (
							<Menus.Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
								Check in
							</Menus.Button>
						)}

						{status === "checked-in" && (
							<Menus.Button icon={<HiArrowUpOnSquare />} onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
								Check out
							</Menus.Button>
						)}

						<Menus.Button icon={<HiTrash />} onClick={() => setShowConfirmDelete((show) => !show)}>
							Delete
						</Menus.Button>
					</Menus.List>
				</Menus.Menu>
			</Table.Row>
			{showConfirmDelete && (
				<Modal onClose={() => setShowConfirmDelete(false)}>
					<ConfirmDelete
						onConfirm={() => deleteBooking(bookingId)}
						resourceName={`Booking with id #${bookingId}`}
						disabled={isDeleting}
						onCloseModal={() => setShowConfirmDelete(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default BookingRow;
