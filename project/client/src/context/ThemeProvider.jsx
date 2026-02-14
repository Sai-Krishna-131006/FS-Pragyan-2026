import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

/**
 * Global ThemeProvider
 *
 * • Reads saved preference from localStorage ("light" | "dark")
 * • Falls back to "light" if nothing is saved
 * • Toggles `.dark` on document.documentElement
 * • Persists every change to localStorage
 */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    const isDark = theme === "dark";

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook — use in any component:
 *
 *   const { isDark, toggleTheme } = useTheme();
 */
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within a <ThemeProvider>");
    }
    return ctx;
}
