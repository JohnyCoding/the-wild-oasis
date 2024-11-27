import { useCabins } from "./useCabins";
import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

export default function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (!cabins?.length) return <Empty resourceName="cabins" />;

	if (isLoading) return <Spinner />;

	const filterValue = searchParams.get("discount") || "all";
	let filteredCabins;
	if (filterValue === "all") filteredCabins = cabins;
	else if (filterValue === "no-discount") filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
	else filteredCabins = cabins?.filter((cabin) => cabin.discount ?? 0 > 0);

	const sortBy = searchParams.get("sortBy") || "name-asc";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = filteredCabins.sort((a, b) => {
		if ((a[field as keyof typeof a] ?? 0) > (b[field as keyof typeof b] ?? 0)) return 1 * modifier;
		if ((a[field as keyof typeof a] ?? 0) < (b[field as keyof typeof b] ?? 0)) return -1 * modifier;
		return 0;
	});

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
			</Table>
		</Menus>
	);
}
