import React from 'react';
import AsyncSelect from 'react-select/async';
import BaseInfoLabel from '../base-label/BaseInfoLabel';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';

const BaseSelect = (props) => {
  const { label, name, options, rules, labelClassName, infoLabelClassName, placeholder, isMultiple, cacheOptions, defaultOptions, infoLabel } = props;

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');

  return (
    <BaseView className={''}>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName}/>}
      {infoLabel && <BaseInfoLabel text={infoLabel} className={infoLabelClassName} />}
      <AsyncSelect
        isClearable={true}
        cacheOptions={cacheOptions}
        defaultOptions={defaultOptions}
        loadOptions={options}
        {...props}
        name={name}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder || ''}
        isMulti={isMultiple}
        menuPlacement={'auto'}
      />
    </BaseView>
  );
};

export default BaseSelect;
