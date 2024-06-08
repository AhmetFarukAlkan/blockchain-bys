import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import BaseTextEditor from './BaseTextEditor';

const TextEditor = (props) => {
  const {
    form,
    name,
    onChangeText,
    label,
    placeholder,
    className,
    inputClassName,
    labelClassName,
    suffix,
    rules,
    defaultValue,
    disabled,
  } = props;

  const handleOnChange = (event, onChange) => {
    const value = event;

    if (onChangeText) {
      onChangeText(value, onChange);
    }

    onChange(value);
  };

  return (
    <BaseView className={className}>
      <Controller
        control={form.control}
        {...props}
        rules={rules}
        defaultValue={defaultValue ?? ''}
        render={({onChange, onBlur, value, ref}) => {
          return (
            <BaseTextEditor
              name={name}
              value={form.watch(name)}
              label={label}
              labelClassName={labelClassName}
              inputClassName={inputClassName}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={(event) => handleOnChange(event, onChange)}
              rules={rules}
              disabled={disabled}
              suffix={suffix}
              inputRef={ref}
            />
          );
        }}
      />

      <ErrorMessage
        errors={form.formState.errors}
        name={name}
        render={({ message }) => <BaseText className={'mt-2 text-xs text-red-600 dark:text-red-400'} text={message} />}
      />
    </BaseView>
  );
};

export default TextEditor;
