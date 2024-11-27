import React, { createContext, ReactNode, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button<{ onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }>`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul<{ $position: Position }>`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.$position.x}px;
	top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

type Position = {
	x: number;
	y: number;
};

type MenusContextType = {
	openId: string;
	position: Position | null;
	close: () => void;
	open: React.Dispatch<React.SetStateAction<string>>;
	setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: { children: ReactNode }) {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState<Position | null>(null);

	const close = () => setOpenId("");
	const open = setOpenId;

	return <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>{children}</MenusContext.Provider>;
}

function Toggle({ id }: { id: string }) {
	const { openId, close, open, setPosition } = useContext(MenusContext)!;

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.stopPropagation();
		const rect = (e.target as HTMLElement).closest("button")!.getBoundingClientRect();
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		});

		if (openId === "" || openId !== id) open(id);
		else close();
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List({ id, children }: { id: string; children: ReactNode }) {
	const { openId, position, close } = useContext(MenusContext)!;
	const { ref } = useOutsideClick<HTMLUListElement>(close, false);

	if (openId !== id) return null;

	return createPortal(
		<StyledList $position={position!} ref={ref}>
			{children}
		</StyledList>,
		document.body
	);
}

type ButtonProps = {
	children: ReactNode;
	icon: ReactNode;
	onClick: () => void;
	disabled?: boolean;
};

function Button({ children, icon, onClick, disabled = false }: ButtonProps) {
	const { close } = useContext(MenusContext)!;

	function handleClick() {
		onClick();
		close();
	}

	return (
		<li>
			<StyledButton onClick={handleClick} disabled={disabled}>
				{icon} <span>{children}</span>
			</StyledButton>
		</li>
	);
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
