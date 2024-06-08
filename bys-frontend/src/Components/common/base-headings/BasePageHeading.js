import React from 'react';
import {twMerge} from 'tailwind-merge';

const BasePageHeading = (props) => {
  const {text, className} = props;

  const classes = twMerge(`
  text-2xl inline-block mb-6
  border-b-4 border-black
  dark:text-white dark:border-white
  ${className || ''}
  `);

  return (
    <div>
      <h2 className={classes}>{text}</h2>
    </div>
  );
};

export default BasePageHeading;