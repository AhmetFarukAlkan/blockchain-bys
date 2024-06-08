import React from 'react';
import {twMerge} from 'tailwind-merge';
import { isEmpty } from '../../../Utils/utils';

const BaseBadge = (props) => {
  const {label, className, color} = props;
  const mainColor = color || 'green';

  const classes = twMerge(`
  w-max font-medium px-2.5 py-0.5 rounded
  flex flex-nowrap text-white
  bg-${mainColor}-600 dark:bg-${mainColor}-900
  ${className || ''}
  `);

  return (
    <span
      className={classes}>
      {label}
    </span>
  );
};

export default BaseBadge;
