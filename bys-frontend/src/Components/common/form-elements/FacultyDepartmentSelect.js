import React from 'react';
import {selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { useGetFacultyDepartmentsQuery } from '../../../Api/Services/FacultyService/facultyService';
import { getDegreeLevelKey } from '../../../Enum/DegreeLevels';
import lodash from "lodash";

const FacultyDepartmentSelect = (props) => {
  const {name = 'department_id', facultyId, form, ...restProps} = props;
  const {data: departments} = useGetFacultyDepartmentsQuery({id: facultyId});

  const options = departments?.map((item) => ({
    label: `${lodash.get(item, 'name')} - ${getDegreeLevelKey(lodash.get(item, 'degree_level'), 'label')}`,
    value: lodash.get(item, 'id'),
  }));

  return <Select name={name} form={form} {...restProps} options={options}/>;
};

export default FacultyDepartmentSelect;
