"use client";

import {
    createContext,
    startTransition,
    use,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "theme";

const getSystemTheme = (): Theme => {
    if (typeof window === "undefined" || !window.matchMedia) {
        return "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeClass = (theme: Theme) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const hasManualPreferenceRef = useRef(
        typeof window === "undefined" ? false : localStorage.getItem(THEME_STORAGE_KEY) !== null,
    );
    const mediaCleanupRef = useRef<(() => void) | null>(null);

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "dark";
        const fromDOM = document.documentElement.getAttribute("data-theme");
        if (fromDOM === "light" || fromDOM === "dark") return fromDOM;
        return getSystemTheme();
    });

    useEffect(() => {
        if (hasManualPreferenceRef.current) {
            return undefined;
        }

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = (event: MediaQueryListEvent) => {
            const nextTheme: Theme = event.matches ? "dark" : "light";
            setTheme(nextTheme);
            applyThemeClass(nextTheme);
        };

        if (media.addEventListener) {
            media.addEventListener("change", onChange);
        } else {
            media.addListener(onChange);
        }

        mediaCleanupRef.current = () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", onChange);
            } else {
                media.removeListener(onChange);
            }
        };

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", onChange);
            } else {
                media.removeListener(onChange);
            }
        };
    }, []);

    const setThemeWithTransition = useCallback((nextTheme: Theme) => {
        hasManualPreferenceRef.current = true;
        mediaCleanupRef.current?.();
        mediaCleanupRef.current = null;
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const apply = () => {
            applyThemeClass(nextTheme);
            document.documentElement.dataset.theme = nextTheme;
            setTheme(nextTheme);
        };

        if (!prefersReducedMotion && "startViewTransition" in document) {
            document.documentElement.classList.add("theme-transition");
            const transition = (
                document as Document & {
                    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
                }
            ).startViewTransition?.(() => {
                startTransition(() => {
                    apply();
                });
            });

            transition?.finished.finally(() => {
                document.documentElement.classList.remove("theme-transition");
            });
            return;
        }

        apply();
    }, []);

    const toggleTheme = useCallback(() => {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        setThemeWithTransition(nextTheme);
    }, [theme, setThemeWithTransition]);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = use(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}
