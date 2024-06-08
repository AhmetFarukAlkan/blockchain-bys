import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseBadge from './BaseBadge';

const YellowBadge = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
  bg-amber-600 text-amber-200
  dark:bg-amber-900 dark:text-amber-100
  ${className || ''}
  `);

  return (
    <BaseBadge className={classes} label={label}/>
  );
};

export default YellowBadge;
