import CurrencyInput from '@ecancan/react-currency-input-field';
import React from 'react';
import {twMerge} from 'tailwind-merge';
import {CURRENCY} from '../../../common/constants/common.constants';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';

const BaseAmountInput = (props) => {
  const {
    label,
    name,
    rules,
    labelClassName,
    inputClassName,
    disabled,
    placeholder,
    value,
    onChangeValue,
    min,
    max,
    decimalsLimit = 2,
    intlConfig = {locale: 'tr-TR'},
    suffixLabel = CURRENCY.TRY.toUpperCase(),
    onBlur,
    prefix
  } = props;

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  const inputClasses = twMerge(`
    rounded-none rounded-r-lg bg-gray-50 border 
    border-gray-300 text-gray-900 focus:ring-blue-500
    focus:border-blue-500 block flex-1 min-w-0 w-full
    text-sm p-2.5 dark:bg-gray-700 
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
    dark:focus:ring-blue-500 dark:focus:border-blue-500
    focus-visible:outline-none
    ${disabled && 'cursor-not-allowed bg-gray-200 text-gray-600 dark:bg-gray-500 dark:text-gray-200'}
    ${inputClassName || ''}
  `);

  return (
    <BaseView>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName}/>}
      <BaseView className={'flex'}>
        {suffixLabel && (<span
            className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600">
            {suffixLabel}
          </span>
        )}
        <CurrencyInput
          name={name}
          id={name}
          prefix={prefix}
          className={inputClasses}
          placeholder={placeholder || '0.00'}
          value={value}
          required={isRequired()}
          disabled={disabled}
          decimalsLimit={decimalsLimit}
          decimalScale={decimalsLimit}
          onBlur={onBlur}
          min={min}
          max={max}
          onValueChange={onChangeValue}
          intlConfig={intlConfig}
        />
      </BaseView>
    </BaseView>
  );
};

export default BaseAmountInput;
