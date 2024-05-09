"use client";
import React, { createContext, useContext, useState } from "react";
import type { SectionName } from "@/lib/types";
//creating a context component to track state instead of tracking state in the individual components

type ActiveSectionContextProviderProps = {
  //typescript shenanigans
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionName>("Home"); //setting default state of page to home page. this is a state hook that allows us to change the state of the page.

  const [timeOfLastClick, setTimeOfLastClick] = useState(0); //function we need to make to stop scroll behavior in the nav bar when we click on an item
  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
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
