import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const GreenButton = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    focus:outline-none text-white bg-green-600
    hover:bg-green-800 focus:ring-4 focus:ring-green-300
    font-medium rounded-lg text-xs
    dark:bg-green-600
    dark:hover:bg-green-700 dark:focus:ring-green-800
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default GreenButton;
