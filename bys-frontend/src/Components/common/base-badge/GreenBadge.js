import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseBadge from './BaseBadge';

const GreenBadge = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
  bg-green-600 text-green-200
  dark:bg-green-900 dark:text-green-100
  ${className || ''}
  `);

  return (
    <BaseBadge className={classes} label={label}/>
  );
};

export default GreenBadge;
