import React from 'react';
import {selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { Roles } from '../../../Enum/Roles';

const RoleSelect = (props) => {
  const {name, ...restProps} = props;
  
  const options = selectMapper({items: Roles || [], labelKey: 'label', valueKey: 'value'});

  return <Select name={name || 'roles'} {...restProps} options={options} rules={{ required: "Rol Zorunludur" }}/>;
};

export default RoleSelect;
