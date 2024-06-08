import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseBadge from './BaseBadge';

const PurpleBadge = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
  bg-purple-600 text-purple-200
  dark:bg-purple-900 dark:text-purple-100
  ${className || ''}
  `);

  return (
    <BaseBadge className={classes} label={label}/>
  );
};

export default PurpleBadge;
