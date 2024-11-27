import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type Props = {
	options: {
		label: string;
		value: string;
	}[];
};

export default function SortBy({ options }: Props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "";

	function handleChange(value: string) {
		searchParams.set("sortBy", value);
		setSearchParams(searchParams);
	}

	return <Select options={options} type="white" handleChange={handleChange} value={sortBy} />;
}
