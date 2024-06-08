import React from 'react';
import {selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { Days } from '../../../Enum/Days';

const DaySelect = (props) => {
  const {name, ...restProps} = props;
  
  const options = selectMapper({items: Days || [], labelKey: 'label', valueKey: 'value'});

  return <Select name={name || 'days'} {...restProps} options={options} rules={{ required: "Ders Günü Zorunludur" }}/>;
};

export default DaySelect;
