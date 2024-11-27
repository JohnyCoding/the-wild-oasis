import styled from "styled-components";

const StyledSelect = styled.select<{ type?: string }>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid ${(props) => (props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)")};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

type Props = {
	options: { label: string; value: string }[];
	value: string;
	type?: string;
	handleChange: (value: string) => void;
};

export default function Select({ options, value, type, handleChange }: Props) {
	return (
		<StyledSelect value={value} type={type} onChange={(e) => handleChange(e.target.value)}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}
