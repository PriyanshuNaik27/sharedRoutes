import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(() => {
		try {
			const raw = localStorage.getItem("darkMode");
			if (raw !== null) return raw === "true";
			return (
				typeof window !== "undefined" &&
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches
			);
		} catch (e) {
			return false;
		}
	});

	useEffect(() => {
		try {
			const root = document.documentElement;
			if (darkMode) root.classList.add("dark");
			else root.classList.remove("dark");
			localStorage.setItem("darkMode", darkMode ? "true" : "false");
		} catch (e) {
			// ignore
		}
	}, [darkMode]);

	const toggleDarkMode = () => setDarkMode((v) => !v);

	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => {
	const ctx = useContext(DarkModeContext);
	if (!ctx) throw new Error("useDarkMode must be used within DarkModeProvider");
	return ctx;
};

export default DarkModeContext;
