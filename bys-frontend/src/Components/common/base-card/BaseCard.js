import React from 'react';
import {twMerge} from 'tailwind-merge';

const BaseCard = (props) => {
  const {className} = props;


  const classes = twMerge(`
    w-full bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
    ${className || ''}
  `)

  return (
    <div {...props} className={classes}>
      {props.children}
    </div>
  );
};

export default BaseCard;
