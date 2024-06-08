import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseCheckBox from './BaseCheckBox';

const CheckBox = (props) => {
  const {form, label, name, inputClassName, labelClassName, className, onStatusChange, defaultValue, disabled} = props;

  const inputClasses = twMerge(`
    ${inputClassName || ''}
  `);

  const labelClasses = twMerge(`
    ${labelClassName || ''}
  `);

  const handleOnChange = (event, onChange) => {
    if (onStatusChange) {
      onStatusChange(event.currentTarget.checked);
    }
    onChange(event.currentTarget.checked);
  };

  return (
    <BaseView className={className}>
      <Controller
        control={form.control}
        {...props}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value, ref}) => (
          <BaseCheckBox
            name={name}
            value={value}
            label={label}
            labelClassName={labelClasses}
            inputClassName={inputClasses}
            className={className}
            onBlur={onBlur}
            onChange={(event) => handleOnChange(event, onChange)}
            disabled={disabled}
            inputRef={ref}
          />
        )}
      />

      <ErrorMessage
        errors={form.formState.errors}
        name={name}
        render={({message}) => <BaseText className={'mt-2 text-xs text-red-600 dark:text-red-400'} text={message}/>}
      />
    </BaseView>
  );
};
export default CheckBox;
