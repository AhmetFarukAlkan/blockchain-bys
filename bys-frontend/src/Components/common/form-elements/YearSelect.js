import React, { useEffect } from 'react';
import {isEmpty, selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';

const YearSelect = (props) => {
  const {name = 'year', form, defaultValue, ...restProps} = props;
  
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1999 }, (_, index) => {
    const yearValue = currentYear - index;
    return { label: yearValue, value: yearValue };
  });

  const options = selectMapper({
    items: years,
    labelKey: 'label',
    valueKey: 'value'
  });

  useEffect(() => {
    if (isEmpty(defaultValue))
      return;

      form.setValue(name, defaultValue);
  }, [defaultValue]);

  return <Select name={name} form={form} defaultValue={defaultValue} {...restProps} options={options} rules={{ required: "Yıl Zorunludur" }}/>;
};

export default YearSelect;
