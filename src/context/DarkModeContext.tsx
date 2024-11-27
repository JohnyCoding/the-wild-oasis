import { createContext, ReactNode, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type Props = {
	children: ReactNode;
};

type DarkModeContextType = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

function DarkModeProvider({ children }: Props) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches, "isDarkMode");

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark-mode");
			document.documentElement.classList.remove("light-mode");
		} else {
			document.documentElement.classList.remove("dark-mode");
			document.documentElement.classList.add("light-mode");
		}
	}, [isDarkMode]);

	function toggleDarkMode() {
		setIsDarkMode((isDark) => !isDark);
	}

	const contextValue: DarkModeContextType = {
		isDarkMode,
		toggleDarkMode,
	};

	return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
}

export { DarkModeProvider, DarkModeContext };
