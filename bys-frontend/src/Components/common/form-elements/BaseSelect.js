import React from 'react';
import ReactSelect from 'react-select';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';
import { twMerge } from 'tailwind-merge';

const BaseSelect = (props) => {
  const { label, name, value, options, rules, labelClassName, selectClassName, placeholder, isMultiple } = props;

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  const selectClasses = twMerge(`
    'react-select-container z-20'
    ${selectClassName || ''}
  `);

  return (
    <BaseView>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName} />}
      <ReactSelect
        isClearable={true}
        {...props}
        value={value || null}
        name={name}
        options={options}
        className={selectClasses}
        classNamePrefix="react-select"
        placeholder={placeholder || ''}
        isMulti={isMultiple}
        menuPlacement={'auto'}
      />
    </BaseView>
  );
};

export default BaseSelect;
