import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseBadge from './BaseBadge';

const RedBadge = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
  bg-red-600 text-red-200
  dark:bg-red-900 dark:text-red-100
  ${className || ''}
  `);

  return (
    <BaseBadge className={classes} label={label}/>
  );
};

export default RedBadge;
