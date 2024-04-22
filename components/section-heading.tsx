import React from "react";

type SectionHeadingProps = {
  //defining props allows us to pass in different arguments as children and have this componenent display whatever we pass into it later
  children: React.ReactNode; //standard syntax for declaring a prop to a component
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  //children are passed in as argument to component
  return (
    <h2 className="text-3xl font-medium capitalize mb-8 text-center">
      {children}
    </h2>
  );
}
