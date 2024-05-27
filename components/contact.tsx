"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import { useFormStatus } from "react-dom";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      //opacity animation that i will definitely be using for all my front ends
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{
        once: true,
      }}
      ref={ref}
    >
      <SectionHeading>Contact</SectionHeading>
      <p className="text-gray-700 -mt-5 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:khumbo87@gmail.com">
          Khumbo87@gmail.com
        </a>{" "}
        or through this form.
      </p>

      {/* fancy nextjs form below
      action is a special nextjs thing that lets us access data from input fields and do stuff with it
      */}
      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          //promises, async await, need to learn these independently
          const { data, error } = await sendEmail(formData);

          if (error) {
            //showing the user any errors generated on the client side
            toast.error(error); //using hot-toast library to send the alert as a nicer looking toast on the client on error
            return;
          }
          toast.success("Email sent!"); //using hot-toast library to send the alert as a nicer looking toast on the client on success
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500} //validation stuff for the text in the form
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          placeholder="Your message"
          required
          maxLength={5000} //validation stuff for the text in the form
          name="message"
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
