import React, { useEffect } from 'react';
import {isEmpty, selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { Semesters } from '../../../Enum/Semesters';

const SemesterSelect = (props) => {
  const {name = 'semester', form, defaultValue, ...restProps} = props;
  
  const options = selectMapper({items: Semesters || [], labelKey: 'label', valueKey: 'value'});

  useEffect(() => {
    if (isEmpty(defaultValue))
      return;

      form.setValue(name, defaultValue);
  }, [defaultValue]);

  return <Select name={name} form={form} defaultValue={defaultValue} {...restProps} options={options} rules={{ required: "Dönem Zorunludur" }}/>;
};

export default SemesterSelect;
