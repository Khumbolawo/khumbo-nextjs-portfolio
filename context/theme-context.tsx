"use client";
import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
  //this is the type of the props that will be passed into the ThemeContextProvider. Typescripts wants to know what props the component will take in.
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

//instantiating the context variable with the initial value of null
const ThemeContext = createContext<ThemeContextType | null>(null);

//need to use context api for theme variable to use the current theme with a 3rd party tool like our react timeline component
export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light"); //dark mode baybee

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark"); //this is how we make the theme persist after refresh
      document.documentElement.classList.add("dark"); //this is how we add the dark class to DOM. will allow us to use the toggle
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark"); //this is how we remove the dark class in DOM. will allow us to use the toggle
    }
  };

  useEffect(() => {
    //useeffect is necessary here to interact with the user's localstorage, a component outside of react
    const localTheme = window.localStorage.getItem("theme") as Theme | null;

    if (localTheme) {
      //this code sets our theme to whatever we last wrote to the theme variable in local storage
      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
        window.localStorage.setItem("theme", "dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //this code checks your device theme settings
      setTheme("dark");
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    }
  }, []);

  //exporting the theme context provider to be used in the app
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
