import React from 'react';
import {selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { Hours } from '../../../Enum/Hours';

const HourSelect = (props) => {
  const {name, ...restProps} = props;
  
  const options = selectMapper({items: Hours || [], labelKey: 'label', valueKey: 'value'});

  return <Select name={name || 'days'} {...restProps} options={options} rules={{ required: "Ders Saati Zorunludur" }}/>;
};

export default HourSelect;
