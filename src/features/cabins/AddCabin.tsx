import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

// export default function AddCabin() {
// 	return (
// 		<Modal>
// 			<Modal.Open opensWindowName="cabin-form">
// 				<Button>Add new cabin</Button>
// 			</Modal.Open>
// 			<Modal.Window name="cabin-form">
// 				<CreateCabinForm />
// 			</Modal.Window>

// 			{/* <Modal.Open opens="table">
// 				<Button>Show table</Button>
// 			</Modal.Open>
// 			<Modal.Window name="table">
// 				<CreateCabinForm />
// 			</Modal.Window> */}
// 		</Modal>
// 	);
// }

export default function AddCabin() {
	const [isOpenModal, setisOpenModal] = useState(false);

	return (
		<div>
			<Button onClick={() => setisOpenModal((open) => !open)}>Add new cabin</Button>
			{isOpenModal && (
				<Modal onClose={() => setisOpenModal(false)}>
					<CreateCabinForm onCloseModal={() => setisOpenModal(false)} />
				</Modal>
			)}
		</div>
	);
}
