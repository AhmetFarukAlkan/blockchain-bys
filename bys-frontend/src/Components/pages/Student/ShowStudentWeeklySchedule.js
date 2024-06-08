import React from 'react';
import { useGetStudentWeeklyScheduleQuery } from '../../../Api/Services/UserService/userService';
import WeeklyScheduleTable from '../../_Shared/External/Table/WeeklyScheduleTable';
import BaseView from '../../common/base-view/BaseView';

const ShowStudentWeeklySchedule = (props) => {
  const { userId, departmentId, year, semester } = props;

  const query = {
    departmentId: departmentId,
    year: year,
    semester: semester, 
  };

  const { data: weeklySchedule } = useGetStudentWeeklyScheduleQuery({ id: userId, query: query });

  return (
    <BaseView className={'mt-4'}>
      <WeeklyScheduleTable data={weeklySchedule}/>
    </BaseView>
  );
};

export default ShowStudentWeeklySchedule;
