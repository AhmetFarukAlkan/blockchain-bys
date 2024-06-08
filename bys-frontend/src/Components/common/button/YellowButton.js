import React from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

const YellowButton = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
    focus:outline-none text-white bg-amber-500
    hover:bg-amber-800 focus:ring-4 focus:ring-amber-300
    font-medium rounded-lg text-xs dark:bg-amber-600
    dark:hover:bg-amber-700 dark:focus:ring-amber-800
    ${className || ''}
  `);

  return (
    <Button label={label} {...props} className={classes}/>
  );
};

export default YellowButton;
