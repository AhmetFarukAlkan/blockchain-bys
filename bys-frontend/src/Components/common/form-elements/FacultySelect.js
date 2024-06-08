import React from 'react';
import {selectMapper} from '../../../Utils/utils';
import Select from '../form-elements/Select';
import { useGetFacultiesQuery } from '../../../Api/Services/FacultyService/facultyService';

const FacultySelect = (props) => {
  const {name = 'faculty_id', form, ...restProps} = props;
  const { data: faculties } = useGetFacultiesQuery();

  const options = selectMapper({ items: faculties || [], labelKey: 'name', valueKey: 'id' });

  return <Select name={name} form={form} {...restProps} options={options}/>;
};

export default FacultySelect;
