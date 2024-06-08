import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';

const BaseInput = (props) => {
  const {
    label,
    type,
    name,
    inputClassName,
    placeholder,
    onChange,
    labelClassName,
    value,
    rules,
    disabled,
    suffix
  } = props;

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  const inputClasses = twMerge(`
    bg-gray-50 border border-gray-300 text-gray-900
    text-sm rounded-lg focus-visible:ring-blue-500 focus-visible:border-blue-500
    focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
    dark:focus:ring-blue-500 dark:focus:border-blue-500
    dark:focus-visible:ring-blue-500 dark:focus-visible:border-blue-500
    ${disabled && 'cursor-not-allowed bg-gray-200 text-gray-600 dark:bg-gray-500 dark:text-gray-200'}
    ${inputClassName || ''}
  `);

  return (
    <BaseView className={''}>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName}/>}
      <BaseView className={''}>
        <input
          autoComplete="off"
          type={type}
          id={name}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={isRequired()}
          disabled={disabled}
        />
        {suffix && <BaseView className={''}>{suffix}</BaseView>}
      </BaseView>
    </BaseView>
  );
};

export default BaseInput;
