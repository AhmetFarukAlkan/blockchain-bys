import {ErrorMessage} from '@hookform/error-message';
import React, {useState} from 'react';
import DatePicker from 'react-tailwindcss-datepicker';
import {Controller} from 'react-hook-form';
import {twMerge} from 'tailwind-merge';
import BaseLabel from '../base-label/BaseLabel';
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
import moment from 'moment';

const BaseDateRangePicker = (props) => {
  const {
    form,
    name,
    label,
    placeholder,
    className,
    rules,
    defaultValue,
    asSingle
  } = props;

  const configs = {
    shortcuts: {
      today: 'Bugün',
      yesterday: 'Dün',
      past: (period) => `Son ${period} Gün`,
      currentMonth: 'Bu Ay',
      pastMonth: 'Geçen Ay',
      currentYear: { 
        text: "Bu Yıl",
        period: {
          start: moment().startOf('year'),
          end: moment().endOf('year')
        }, 
      },
      pastYear: { 
        text: "Geçen Yıl",
        period: {
          start: moment().subtract(1, 'year').startOf('year'),
          end: moment().subtract(1, 'year').endOf('year')
        }, 
      }, 
    }
  };

  const handleOnChange = (event, onChange) => {
    onChange(event);
  };

  const containerClasses = twMerge(`
    relative block w-full text-sm text-gray-900 border
    border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500
    focus:border-blue-500 dark:border-gray-700
  `);

  const inputClasses = twMerge(`
    relative transition-all duration-300 pr-14 w-full
    border-gray-300 dark:text-gray-900 dark:text-white
    dark:border-slate-600 dark:bg-gray-700 rounded-lg 
    tracking-wide font-light text-sm placeholder-gray-400
    bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed
    focus:border-blue-500 focus:ring-blue-500/20 !py-2 pl-2
  `);

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  return (
    <BaseView className={className}>
      {label && <BaseLabel text={label} isRequired={isRequired()}/>}
      <Controller
        control={form.control}
        {...props}
        rules={rules}
        defaultValue={defaultValue || ''}
        render={({onChange, onBlur, value}) => (
          <DatePicker
            placeholder={placeholder || ''}
            containerClassName={containerClasses}
            inputClassName={inputClasses}
            i18n="tr"
            value={value || {startDate: null, endDate: null}}
            onChange={(event) => handleOnChange(event, onChange)}
            displayFormat="DD-MM-YYYY"
            asSingle={asSingle}
            configs={configs}
            showShortcuts={!asSingle}
            useRange={false}
            startWeekOn="mon"
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

export default BaseDateRangePicker;
