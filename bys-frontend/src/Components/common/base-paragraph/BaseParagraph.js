import React from 'react';
import {twMerge} from 'tailwind-merge';

const BaseParagraph = (props) => {

  const {className, text} = props;

  const classes = twMerge(`
    font-normal text-gray-700 dark:text-white
    ${className || ''}
  `);

  return (
    <p className={classes}>
      {text}
    </p>
  );
};

export default BaseParagraph;
