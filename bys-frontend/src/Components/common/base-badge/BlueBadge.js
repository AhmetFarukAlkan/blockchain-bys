import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseBadge from './BaseBadge';

const BlueBadge = (props) => {
  const {label, className} = props;

  const classes = twMerge(`
  bg-blue-600 text-blue-200
  dark:bg-blue-900 dark:text-blue-100
  ${className || ''}
  `);

  return (
    <BaseBadge className={classes} label={label}/>
  );
};

export default BlueBadge;
