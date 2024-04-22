"use client";
import React, { createContext, useContext, useState } from "react";
import { links } from "@/lib/data";

//creating a context component to track state instead of tracking state in the individual components
type SectionName = (typeof links)[number]["name"]; //typescript shenanigans

type ActiveSectionContextProviderProps = {
  //typescript shenanigans
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home"); //setting default state of page to home page. this is a state hook that allows us to change the state of the page.
  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

//custom hook we create to get rid of null errors in the active section hook
export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within a ActiveSectionContextProvider"
    );
  }

  return context;
}
