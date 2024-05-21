"use client";
import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type Theme = "light" | "dark";

export default function ThemeSwitch() {
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
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      //this code checks your device theme settings
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <button
      className="fixed bottom-5 right-5 bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40
    shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all
    "
      onClick={toggleTheme} //run toggleTheme function on button press
    >
      {" "}
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
