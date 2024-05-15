"use server";

import { error } from "console";
import { m } from "framer-motion";
//resend is our mailing client that will handle sending emails from our contact page
import { Resend } from "resend";
import { validateString, getErrorMessage } from "../lib/utilities";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

//creating a new resend object using the resend constructor
const resend = new Resend(process.env.RESEND_API_KEY);

//passing the form data to a backend as a server action
export const sendEmail = async (formData: FormData) => {
  //grabbing the content from the form
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  //the server side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }
  console.log("running on server");
  console.log(formData.get("senderEmail"));
  console.log(formData.get("message"));

  //try catch block for debugging
  let data;
  try {
    //method that actually sends the email
    await resend.emails.send({
      from: "Contact Form<onboarding@resend.dev>", //syntax to customize the appearance of the sender in the email
      to: "khumbo87@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail as string, //typescript is ass sometimes
      react: React.createElement(ContactFormEmail, {
        //necessary to write jsx/tsx in a js/ts file
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error), //smaller function we can use to do all the error handling
    };
  }

  return { data };
};
