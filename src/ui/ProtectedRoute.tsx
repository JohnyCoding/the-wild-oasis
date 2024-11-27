import { ReactNode } from "react";
import { useUser } from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";

import Spinner from "./Spinner";
import styled from "styled-components";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

type Props = {
	children: ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
	const { isAuthenticated, isLoading } = useUser();

	if (!isAuthenticated && !isLoading) return <Navigate to="/login" />;

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
}
