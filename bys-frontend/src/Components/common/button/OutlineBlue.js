import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const OutlineGreen = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    text-blue-700 hover:text-white border border-blue-700
    hover:bg-blue-800 focus:ring-4 focus:outline-none
    focus:ring-blue-300 font-medium rounded-lg
    text-sm px-3 py-1 text-center dark:border-blue-500 
    dark:text-blue-500 dark:hover:text-white
    dark:hover:bg-blue-600 dark:focus:ring-blue-800
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default OutlineGreen;
