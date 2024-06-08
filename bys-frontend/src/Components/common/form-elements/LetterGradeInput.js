import React, { useEffect } from 'react';
import TextInput from './TextInput';
import { calculateGrade, isEmpty } from '../../../Utils/utils';
import { LetterGrade } from '../../../Enum/LetterGrades';

const LetterGradeInput = (props) => {
  const {
    studentCourseInfoId, 
    name = `letterGrade[${studentCourseInfoId}]`, 
    gradeScale, 
    form, 
    defaultValue,
    ...restProps
  } = props;

  const absentee = form.watch(`absentee[${studentCourseInfoId}]`);
  const midtermGrade = form.watch(`midtermGrade[${studentCourseInfoId}]`);
  const finalGrade = form.watch(`finalGrade[${studentCourseInfoId}]`);
  const makeupExamGrade = form.watch(`makeupExamGrade[${studentCourseInfoId}]`);

  useEffect(() => {
    if (absentee === 1)
      form.setValue(name, 'dz');
    else if (makeupExamGrade && makeupExamGrade !== -1 && makeupExamGrade < 35) {
      form.setValue(name, LetterGrade.FF)
    }
    else if ((makeupExamGrade === -1 || !makeupExamGrade) && finalGrade && finalGrade !== -1 && finalGrade < 35) {
      form.setValue(name, LetterGrade.FF)
    } else if ((makeupExamGrade === -1 || !makeupExamGrade) && (finalGrade === -1 || !finalGrade) ) {
      form.setValue(name, defaultValue);
    } else {
      const score = (finalGrade || makeupExamGrade ? 
        (parseFloat(midtermGrade) + (parseFloat(makeupExamGrade) || parseFloat(finalGrade))) / 2 : '');
      score && form.setValue(name, calculateGrade(score, !isEmpty(gradeScale) ? gradeScale : {})) //: form.setValue(name, '');
    } 
  }, [defaultValue, absentee, midtermGrade, finalGrade, makeupExamGrade, gradeScale, name, studentCourseInfoId]);  

  useEffect(() => {
    if (isEmpty(defaultValue))
      return;

      form.setValue(name, defaultValue);
  }, [defaultValue, gradeScale, studentCourseInfoId]);

  return <TextInput name={name} form={form} disabled defaultValue={defaultValue} {...restProps}/>;
};

export default LetterGradeInput;
