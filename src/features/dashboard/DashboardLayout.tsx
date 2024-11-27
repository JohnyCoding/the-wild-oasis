import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from "../cabins/useCabins";

import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardLayout() {
	const { bookings, isLoading: isLoading1 } = useRecentBookings();
	const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
	const { cabins, isLoading: isLoading3 } = useCabins();

	if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

	if (!bookings) throw new Error("Bookings could not be loaded");
	if (!confirmedStays) throw new Error("Confirmed stays could not be loaded");
	if (!cabins) throw new Error("Cabins could not be loaded");

	return (
		<StyledDashboardLayout>
			<Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins?.length} />
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}
