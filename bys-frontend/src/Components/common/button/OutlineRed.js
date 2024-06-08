import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const OutlineGreen = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    text-red-700 hover:text-white border border-red-700 
    hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 
    font-medium rounded-lg text-sm px-3 py-1 text-center 
    dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 
    dark:focus:ring-red-900 transition transition-all duration-300
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default OutlineGreen;
