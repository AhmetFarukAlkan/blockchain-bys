import React, {useEffect, useState} from 'react';
import {twMerge} from 'tailwind-merge';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';

const BaseRadioGroup = (props) => {
  const {
    label,
    name,
    value,
    options,
    inputClassName,
    labelClassName,
    optionLabelClassName,
    rules,
    onChange,
    disabled
  } = props;

  const inputClasses = twMerge(`
    w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 
    focus:ring-blue-500 dark:focus:ring-blue-600 
    dark:ring-offset-gray-800 focus:ring-2 
    dark:bg-gray-700 dark:border-gray-600
    ${inputClassName || ''}
  `);

  const labelClasses = twMerge(`
    
    ${labelClassName || ''}
  `);

  const optionLabelClasses = twMerge(`
    ml-2 text-sm font-medium text-gray-900 mb-0
    ${optionLabelClassName || ''}
  `);

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  const [select, setSelect] = useState(Number(value) || 0);

  const handleSelect = (index) => {
    setSelect(index);
    onChange && onChange(index);
  };

  useEffect(() => {
    value && handleSelect(Number(value));
  }, [value]);

  return (
    <BaseView className={'flex'}>
      {options.map((item, index) => (
        <BaseView key={index} className={'flex items-center mr-4'}>
          <input
            id={`${name || 'name'}.${item.toLowerCase()}`}
            data-testid={`${name || 'name'}.${item.toLowerCase()}`}
            type={'radio'}
            name={`${name || 'name'}.${item.toLowerCase()}`}
            className={inputClasses}
            disabled={disabled}
            checked={index === select}
            onChange={() => handleSelect(index)}
          />
          <BaseLabel htmlFor={`${name || 'name'}.${item.toLowerCase()}`} className={optionLabelClasses} text={item}/>
        </BaseView>
      ))}
    </BaseView>
  );
};

export default BaseRadioGroup;
