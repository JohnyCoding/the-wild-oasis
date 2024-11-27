import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

export default function Logout() {
	const { logout, isLoggingOut } = useLogout();

	return (
		<ButtonIcon disabled={isLoggingOut} onClick={() => logout()}>
			{!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
}
