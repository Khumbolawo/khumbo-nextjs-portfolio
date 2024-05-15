//creating helper function to do the form validation

export const validateString = (value: unknown, maxLength: number) => {
  //server side validation for typescript to leave us alone
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

//error handling helper function
export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    //wrapped in if statement to assign the correct type to the error variable
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message); //convert whatever error we get into a string
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
