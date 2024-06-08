import React, { useEffect } from 'react';
import {isEmpty, selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { useGetStudentDepartmentsQuery } from '../../../Api/Services/UserService/userService';

const StudentDepartmentSelect = (props) => {
  const {name = 'department_id', userId, form, ...restProps} = props;
  const {data: departments} = useGetStudentDepartmentsQuery({id: userId});

  const options = selectMapper({ items: departments || [], labelKey: 'name', valueKey: 'id' });

  useEffect(() => {
    if (isEmpty(departments))
      return;

      form.setValue(name, departments[0].id);
  }, [departments]);  

  return <Select name={name} form={form} {...restProps} options={options}/>;
};

export default StudentDepartmentSelect;
