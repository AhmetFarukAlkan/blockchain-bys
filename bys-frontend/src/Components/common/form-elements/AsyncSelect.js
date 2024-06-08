import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseAsyncSelect from './BaseAsyncSelect';

const AsyncSelect = (props) => {
  const {
    form,
    name,
    label,
    className,
    onChangeValue,
    isMultiple,
    defaultValue,
    cacheOptions,
    defaultOptions,
    service,
    infoLabel,
    infoLabelClassName
  } = props;

  const handleSetValue = (value) => {
    return defaultOptions?.[isMultiple ? 'filter' : 'find']((option) =>
      isMultiple ? value?.includes(option.value) : option.value === value);
  };

  const handleOnChange = (value, onChange) => {
    onChangeValue && onChangeValue(value);

    onChange(isMultiple ? value?.map((option) => option.value) : value?.value);
  };

  const loadOptions = (inputValue, callback) => {
    service({query: {searchValue: inputValue}}).unwrap().then(r => {
      callback(r)
    });
  };

  const classes = twMerge(`
    ${className || ''}
  `);

  return (
    <BaseView className={classes}>
      <Controller
        control={form.control}
        {...props}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value, ref}) => (
          <BaseAsyncSelect
            {...props}
            label={label}
            infoLabel={infoLabel}
            infoLabelClassName={infoLabelClassName}
            cacheOptions={cacheOptions}
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
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

export default AsyncSelect;
