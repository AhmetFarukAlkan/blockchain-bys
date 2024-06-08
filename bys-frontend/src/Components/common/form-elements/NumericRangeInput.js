import React from 'react';
import BaseView from '../base-view/BaseView';
import BaseLabel from '../base-label/BaseLabel';
import NumericInput from './NumericInput';
import { twMerge } from 'tailwind-merge';

const NumericRangeInput = (props) => {
  const { label, name, form } = props;

  const labelClasses = twMerge(`
    ml-2 text-sm font-medium text-gray-900 mb-0 mt-0 mr-0
  `);

  return (
    <BaseView>
      {label && <BaseLabel text={label} className={labelClasses}/>}
      <BaseView className={'grid grid-cols-2'}>
        <NumericInput placeholder="Min" form={form} name={`${name}[min]`}/>
        <NumericInput placeholder="Max" form={form} name={`${name}[max]`}/>
      </BaseView>    
    </BaseView>
  )
};

export default NumericRangeInput;
