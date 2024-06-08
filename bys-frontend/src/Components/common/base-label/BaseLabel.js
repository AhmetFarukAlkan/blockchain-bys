import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseText from '../base-text/BaseText';

const BaseLabel = (props) => {
  const {text, className, textClassName, labelClassName, isRequired, disabled = false} = props;

  const labelClasses = twMerge(`
    cursor-pointer
    ${labelClassName || ''}
    ${(disabled && 'cursor-not-allowed') || ''}
  `);

  const textClasses = twMerge(`
    font-medium
    ${textClassName || ''}
    ${(disabled && 'text-grey-400 dark:opacity-80') || ''}
  `);

  return (
    <label className={labelClasses}>
      <BaseText className={textClasses} text={text}/>
      {isRequired && <BaseText className={textClasses} text={'*'}/>}
    </label>
  );
};

export default BaseLabel;
