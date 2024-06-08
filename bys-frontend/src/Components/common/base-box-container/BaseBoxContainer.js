import React from 'react';
import {twMerge} from 'tailwind-merge';

const BaseBoxContainer = (props) => {
  const {children, className} = props;

  const classes = twMerge(`
      rounded-lg border px-4 py-6 mb-4 
      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
      shadow-lg
      ${className || ''}
  `)

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default BaseBoxContainer;
