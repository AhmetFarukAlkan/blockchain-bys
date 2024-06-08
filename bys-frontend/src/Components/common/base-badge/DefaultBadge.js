import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseBadge from './BaseBadge';

const DefaultBadge = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
  bg-gray-600 text-gray-200
  dark:bg-gray-900 dark:text-gray-100
  ${className || ''}
  `);

  return (
    <BaseBadge className={classes} label={label}/>
  );
};

export default DefaultBadge;
