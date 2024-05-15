"use client";

import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "@/lib/types";

//refactoring our custom hook into its own file so all we need is to call it. makes code cleaner looking
//nb a hook is just a js function that starts with "use"
export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold, //when 50% of the section is in the viewport, the inView variable will be true
  }); //custom hook given to us by react-intersection-observer package. updates inView variable when this section comes into view in the viewport
  //inView variable is a bool we can now use to setactivesection to true when this component comes into view
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext(); //collecting the setter from the context provider
  useEffect(() => {
    //wrap function in useEffect as best practice. dont really know what useeffect does yet
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Home");
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
    inView,
  };
}
