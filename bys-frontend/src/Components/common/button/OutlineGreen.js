import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const OutlineGreen = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    text-green-700 hover:text-white border border-green-700
    hover:bg-green-800 focus:ring-4 focus:outline-none 
    focus:ring-green-300 font-medium rounded-lg text-sm 
    px-3 py-1 text-center dark:border-green-500 
    dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600
    dark:focus:ring-green-800 transition transition-all duration-300
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default OutlineGreen;
