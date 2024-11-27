import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

type Props = {
	bookingId: number;
};

function CheckoutButton({ bookingId }: Props) {
	const { checkOut, isCheckingOut } = useCheckout();

	return (
		<Button $variation="primary" $size="small" onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
			Check out
		</Button>
	);
}

export default CheckoutButton;
