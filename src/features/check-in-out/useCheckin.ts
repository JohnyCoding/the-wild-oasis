import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

import { BreakfastInfo } from "../../types/types";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }: { bookingId: number; breakfast: BreakfastInfo }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({ type: "active" });
			navigate("/");
		},
		onError: () => toast.error("There was an error while checking in"),
	});

	return { checkin, isCheckingIn };
}
