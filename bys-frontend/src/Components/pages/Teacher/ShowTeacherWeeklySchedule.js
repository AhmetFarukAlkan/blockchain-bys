import React from 'react';
import { useGetTeacherWeeklyScheduleQuery } from '../../../Api/Services/UserService/userService';
import WeeklyScheduleTable from '../../_Shared/External/Table/WeeklyScheduleTable';
import BaseView from '../../common/base-view/BaseView';

const ShowTeacherWeeklySchedule = (props) => {
  const { userId, departmentId, year, semester } = props;

  const query = {
    departmentId: departmentId,
    year: year,
    semester: semester, 
  };


  const { data: weeklySchedule } = useGetTeacherWeeklyScheduleQuery({ id: userId, query: query });

  return (
    <BaseView className={'mt-4'}>
      <WeeklyScheduleTable data={weeklySchedule}/>
    </BaseView>
  );
};

export default ShowTeacherWeeklySchedule;
