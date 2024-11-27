import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isPending: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) => loginApi({ email, password }),
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data.user);
			navigate("/dashboard", { replace: true });
			toast.success(`${data.user!.email} successfully logged in`);
		},
		onError: () => toast.error("Provided email or password are incorrect"),
	});

	return { login, isLoggingIn };
}
