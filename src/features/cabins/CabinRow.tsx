import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";

import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { Database } from "../../types/supabaseTypes";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

type Props = {
	cabin: Database["public"]["Tables"]["cabins"]["Row"];
};

export default function CabinRow({ cabin }: Props) {
	const [showForm, setShowForm] = useState(false);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const { deleteCabin, isDeleting } = useDeleteCabin();
	const { createCabin } = useCreateCabin();

	const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity: maxCapacity ?? 0,
			regularPrice: regularPrice ?? 0,
			discount: discount ?? 0,
			image: image ?? "",
			description: description ?? "",
		});
	}

	return (
		<>
			<Table.Row>
				<Img src={image?.toString()} />
				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice ?? 0)}</Price>
				{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
				<div>
					<Menus.Menu>
						<Menus.Toggle id={cabinId.toString()} />

						<Menus.List id={cabinId.toString()}>
							<Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
								Duplicate
							</Menus.Button>
							<Menus.Button icon={<HiPencil />} onClick={() => setShowForm((show) => !show)}>
								Edit
							</Menus.Button>
							<Menus.Button icon={<HiTrash />} onClick={() => setShowConfirmDelete((show) => !show)}>
								Delete
							</Menus.Button>
						</Menus.List>
					</Menus.Menu>
				</div>
			</Table.Row>
			{showForm && (
				<Modal onClose={() => setShowForm(false)}>
					<CreateCabinForm cabinToEdit={cabin} onCloseModal={() => setShowForm(false)} />
				</Modal>
			)}
			{showConfirmDelete && (
				<Modal onClose={() => setShowConfirmDelete(false)}>
					<ConfirmDelete
						onConfirm={() => deleteCabin(cabinId)}
						resourceName={cabin.name ?? ""}
						disabled={isDeleting}
						onCloseModal={() => setShowConfirmDelete(false)}
					/>
				</Modal>
			)}
		</>
	);
}
