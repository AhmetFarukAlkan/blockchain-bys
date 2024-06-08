import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseLabel from '../base-label/BaseLabel';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';

const BaseCheckBox = (props) => {
  const {
    label,
    name,
    inputClassName,
    onChange,
    labelClassName,
    textClassName,
    value,
    checkmarkClassName,
    disabled,
    className
  } = props;

  const checkmarkClasses = twMerge(`
    
    ${checkmarkClassName || ''}
  `);

  const checkBoxClasses = twMerge(`
    w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
    rounded focus:ring-blue-500 focus:ring-2 
    dark:focus:ring-blue-600 dark:ring-offset-gray-800 
    dark:bg-gray-700 dark:border-gray-600
    ${inputClassName || ''}
  `);

  const labelClasses = twMerge(`
    ml-2 text-sm font-medium text-gray-900 mb-0 mt-0 mr-0
  `);

  const textClasses = twMerge(`
    ${textClassName || ''}
  `);

  return (
    <BaseView className={`flex items-center ${className || ''}`}>
      <input
        type={'checkbox'}
        id={name}
        name={name}
        className={checkBoxClasses}
        onChange={onChange}
        checked={value}
        data-testid={`input.${name}`}
        disabled={disabled}
      />
      {label && (<BaseLabel text={label} disabled={disabled} labelClassName={labelClasses} className={textClasses}/>)}
    </BaseView>
  );
};

export default BaseCheckBox;
