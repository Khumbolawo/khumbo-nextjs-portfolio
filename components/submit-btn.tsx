//submit button on contact form will become its own component
import React from "react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitBtn() {
  const { pending } = useFormStatus(); //nextjs hook we can use for a loading animation in the send button
  return (
    <button
      type="submit"
      className="group flex items-center justify-center h-[3rem] w-[8rem] gap-2 bg-gray-900 text-white 
          rounded-full outline-none transition-all focus:scale-110 hover:scale-110 active:scale-105 hover:bg-gray-950
          disabled:scale-100 disabled:bg-opacity-65 disabled:cursor-not-allowed dark:bg-white dark:bg-opacity-10"
    >
      {pending ? ( //if pending is true, show loading animation. Else, just show button
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        //have to put rest of code in react fragment for unknown reason
        <>
          Submit{" "}
          <FaPaperPlane
            className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 
                "
          />{" "}
        </>
      )}
    </button>
  );
}
