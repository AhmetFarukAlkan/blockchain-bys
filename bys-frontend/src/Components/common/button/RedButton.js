import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const RedButton = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    focus:outline-none text-white bg-red-600
    hover:bg-red-800 focus:ring-4
    focus:ring-red-300 font-medium rounded-lg
    text-xs dark:bg-red-600 
    dark:hover:bg-red-700 dark:focus:ring-red-900
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes} />
  );
};

export default RedButton;
