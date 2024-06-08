import React from 'react';
import BaseView from '../../common/base-view/BaseView';
import ExamCard from '../../common/card/ExamCard';
import { useGetStudentExamsQuery } from '../../../Api/Services/UserService/userService';

const ShowStudentExams = (props) => {
  const { user, departmentId, year, semester } = props;

  const query = {
    departmentId: departmentId,
    year: year,
    semester: semester, 
  };

  const { data: exams } = useGetStudentExamsQuery({ id: user.id, query: query });

  return (
    <BaseView className="grid grid-cols-2 gap-4 mt-4">
        {exams?.map((exam, key) => {
            return (
              <ExamCard key={key} exam={exam}/>
            );
        })}
    </BaseView>
  );
};

export default ShowStudentExams;
