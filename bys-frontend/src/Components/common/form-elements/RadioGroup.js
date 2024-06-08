import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseRadioGroup from './BaseRadioGroup';

const RadioGroup = (props) => {
  const { form, name, label, options, className, inputClassName, labelClassName, onChangeValue, rules, defaultValue, disabled } = props;

  const classes = twMerge(`
    ${className || ''}
  `);

  const inputClasses = twMerge(`
    ${inputClassName || ''}
  `);

  const handleOnChange = (value, onChange) => {
    onChangeValue && onChangeValue(value, onChange);

    onChange(String(value));
  };

  return (
    <BaseView className={classes}>
      <Controller
        control={form.control}
        {...props}
        rules={rules}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value, ref}) => (
          <BaseRadioGroup
            label={label}
            name={name}
            options={options}
            inputClassName={inputClasses}
            labelClassName={labelClassName}
            disabled={disabled}
            rules={rules}
            value={value}
            onChange={(value) => handleOnChange(value, onChange)}
            inputRef={ref}
          />
        )}
      />
      <ErrorMessage
        errors={form.formState.errors}
        name={name}
        render={({ message }) => <BaseText className={'mt-2 text-xs text-red-600 dark:text-red-400'} text={message} />}
      />
    </BaseView>
  );
};

export default RadioGroup;
