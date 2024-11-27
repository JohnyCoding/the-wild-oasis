import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { CabinFormValues } from "../../types/types";

export function useEditCabin() {
	const queryClient = useQueryClient();
	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }: { newCabinData: CabinFormValues; id: number }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully updated");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: (err) => toast.error(err.message),
	});
	return { editCabin, isEditing };
}
