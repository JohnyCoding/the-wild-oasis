import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
	bookings,
	confirmedStays,
	numDays,
	cabinCount,
}: {
	bookings: {
		created_at: string;
		totalPrice: number | null;
		extrasPrice: number | null;
	}[];
	confirmedStays: any[];
	numDays: number;
	cabinCount: number;
}) {
	const numberOfBookings = bookings.length;
	const sales = bookings.reduce((acc, curr) => acc + (curr.totalPrice ?? 0), 0);
	const checkins = confirmedStays.length;
	const occupancy = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount);

	return (
		<>
			<Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numberOfBookings.toString()} />
			<Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
			<Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins.toString()} />
			<Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} value={`${Math.round(occupancy * 100)}%`} />
		</>
	);
}
