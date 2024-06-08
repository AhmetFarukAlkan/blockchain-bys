import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const DefaultButton = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    text-white bg-blue-700 hover:bg-blue-800
    focus:ring-4 focus:ring-blue-300
    font-medium rounded-lg text-xs
    dark:bg-blue-600 dark:hover:bg-blue-700
    focus:outline-none dark:focus:ring-blue-800
    transition transition-all duration-300
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default DefaultButton;
