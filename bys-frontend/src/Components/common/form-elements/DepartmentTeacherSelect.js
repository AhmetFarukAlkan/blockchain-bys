import React from 'react';
import {selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { useGetDepartmentTeachersQuery } from '../../../Api/Services/DepartmentService/departmentService';

const DepartmentTeacherSelect = (props) => {
  const {name = 'teacher_ids', departmentId, form, ...restProps} = props;
  const {data: teachers} = useGetDepartmentTeachersQuery({id: departmentId});

  const options = selectMapper({ items: teachers || [], labelKey: 'fullName', valueKey: 'userId' });

  return <Select name={name} form={form} {...restProps} options={options}/>;
};

export default DepartmentTeacherSelect;
