import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const LightButton = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    text-gray-900 border border-gray-300
    focus:outline-none hover:bg-gray-100 focus:ring-4
    focus:ring-gray-200 font-medium rounded-lg text-xs
    dark:bg-gray-800 dark:text-white transition transition-all duration-300
    dark:border-gray-600 dark:hover:bg-gray-700
    dark:hover:border-gray-600 dark:focus:ring-gray-700
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default LightButton;
