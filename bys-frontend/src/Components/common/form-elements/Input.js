import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import {InputType} from '../../../common/constants/common.constants';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseInput from './BaseInput';

const Input = (props) => {
  const {
    form,
    name,
    type,
    onChangeText,
    onKeyDown,
    label,
    placeholder,
    className,
    inputClassName,
    labelClassName,
    suffix,
    rules,
    defaultValue,
    disabled
  } = props;

  const handleOnChange = (event, onChange) => {
    const {value} = event.currentTarget;

    if (onChangeText) {
      onChangeText(value, onChange);
    }

    ![InputType.NUMBER].includes(type) && onChange(value);
  };

  return (
    <BaseView className={className}>
      <Controller
        control={form.control}
        {...props}
        rules={rules}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value, ref}) => (
          <BaseInput
            name={name}
            value={value}
            label={label}
            labelClassName={labelClassName}
            inputClassName={inputClassName}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={(event) => handleOnChange(event, onChange)}
            onKeyDown={(event) => onKeyDown && onKeyDown(event)}
            type={type}
            rules={rules}
            disabled={disabled}
            suffix={suffix}
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

export default Input;
