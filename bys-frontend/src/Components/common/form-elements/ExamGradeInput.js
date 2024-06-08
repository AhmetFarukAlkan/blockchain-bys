import React, { useEffect } from 'react';
import NumericInput from './NumericInput';
import { isEmpty } from '../../../Utils/utils';

const ExamGradeInput = (props) => {
  const {name = 'exam', defaultValue, form, ...restProps} = props;

  useEffect(() => {
    if (isEmpty(defaultValue))
      return;

      form.setValue(name, defaultValue === -1 ? null : defaultValue);
  }, [defaultValue]);

  return (
    <NumericInput 
      name={name} 
      defaultValue={defaultValue === -1 ? null : defaultValue} 
      min={0} 
      max={100}
      form={form}
      {...restProps}
    />
  );
};

export default ExamGradeInput;
