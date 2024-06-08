import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';
import Form from 'react-bootstrap/Form';

const BaseTextAreaInput = (props) => {
  const {
    label,
    name,
    inputClassName,
    placeholder,
    onChange,
    labelClassName,
    value,
    rules,
    disabled,
    suffix,
    rows,
    cols
  } = props;

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  const inputClasses = twMerge(`
    block p-2.5 w-full text-sm text-gray-900 
    bg-gray-50 rounded-lg border border-gray-300 
    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
    dark:focus:ring-blue-500 dark:focus:border-blue-500
    ${inputClassName || ''}
  `);

  return (
    <BaseView className={''}>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName}/>}
      <BaseView className={''}>
        <textarea
          id={name}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={isRequired()}
          disabled={disabled}
          rows={rows}
          cols={cols}
        />
        {suffix && <BaseView className={''}>{suffix}</BaseView>}
      </BaseView>
    </BaseView>
  );
};

export default BaseTextAreaInput;
