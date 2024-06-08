import React from 'react';
import {twMerge} from 'tailwind-merge';
import {maxLengthTransformation} from '../../../Utils/utils';

const BaseText = (props) => {
  const {text, className, maxLength} = props;

  const classes = twMerge(`
    text-gray-900 dark:text-white
    ${className || ''}
 `);

  return (
    <span {...props} className={classes}>
      {text && maxLengthTransformation(text, maxLength)}
    </span>
  );
};

export default BaseText;
