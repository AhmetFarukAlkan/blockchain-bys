import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseAmountInput from './BaseAmountInput';

const AmountInput = (props) => {
  const {
    form,
    name,
    onChangeValue,
    label,
    suffixLabel,
    placeholder,
    className,
    inputClassName,
    labelClassName,
    min,
    max,
    decimalsLimit,
    rules,
    intlConfig,
    disabled,
    defaultValue
  } = props;

  const handleOnChange = (value, onChange) => {
    if (onChangeValue) {
      onChangeValue(value, onChange);
    }

    onChange(value);
  };

  return (
    <BaseView className={className}>
      <Controller
        control={form.control}
        {...props}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value}) => (
          <BaseAmountInput
            name={name}
            value={value}
            label={label}
            labelClassName={labelClassName}
            inputClassName={inputClassName}
            placeholder={placeholder}
            onChangeValue={(value) => handleOnChange(value || '', onChange)}
            rules={rules}
            disabled={disabled}
            min={min}
            max={max}
            onBlur={onBlur}
            decimalsLimit={decimalsLimit}
            suffixLabel={suffixLabel}
            intlConfig={intlConfig}
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

export default AmountInput;
