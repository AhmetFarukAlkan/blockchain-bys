import React from "react";
import BasePageHeading from "../base-headings/BasePageHeading";
import BaseView from "../base-view/BaseView";
import { twMerge } from "tailwind-merge";

const BasePageWrapper = (props) => {
  const { className, text } = props;

  const classes = twMerge(`
    place-items-center
    w-full bg-gray-100 p-6 rounded-lg 
    scroll-mt-48 overflow-x-scroll 
    lg:overflow-visible dark:bg-gray-900 dark:border-0
    ${className || ""}
  `);

  return (
    <BaseView {...props} className={classes}>
      {text && <BasePageHeading text={text} />}
      {props.children}
    </BaseView>
  );
};

export default BasePageWrapper;
