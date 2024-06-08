import {ErrorMessage} from '@hookform/error-message';
import React, { useEffect } from 'react';
import {Controller} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseSelect from './BaseSelect';
import { isEmpty } from '../../../Utils/utils';

const Select = (props) => {
  const {
    form,
    name,
    label,
    className,
    onChangeValue,
    options,
    isMultiple,
    defaultValue,
    onChangeValueParams = []
  } = props;

  const handleSetValue = (value) =>
    options?.[isMultiple ? 'filter' : 'find']((option) =>
      isMultiple ? value?.includes(option.value) : option.value === value);

  const handleOnChange = (value, onChange) => {
    if (onChangeValue) {
      const onChangeValueResult = onChangeValue(value, ...onChangeValueParams);

      if (onChangeValueResult === false) {
        return;
      }
    }

    onChange(isMultiple ? value?.map((option) => option.value) : value?.value);
  };

  const classes = twMerge(`
    ${props.isDisabled && 'cursor-not-allowed z-20'}
    ${className || ''}
  `);

  useEffect(() => {
    if (isEmpty(defaultValue))
      return;

      form.setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <BaseView className={classes}>
      <Controller
        control={form.control}
        {...props}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value, ref}) => (
          <BaseSelect
            {...props}
            label={label}
            value={handleSetValue(value)}
            onBlur={onBlur}
            onChange={(_value) => handleOnChange(_value, onChange)}
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

export default Select;
