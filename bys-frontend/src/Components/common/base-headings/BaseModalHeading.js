import React from 'react';
import {twMerge} from 'tailwind-merge';

const BasePageHeading = (props) => {
  const {text, className} = props;

  const classes = twMerge(`
  text-xl font-semibold text-gray-900 dark:text-white
  ${className || ''}
  `);

  return (
    <div>
      <h3 className={classes}>{text}</h3>
    </div>
  );
};

export default BasePageHeading;