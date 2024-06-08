import React from 'react';
import { useGetStudentAcademicInfosQuery } from '../../../Api/Services/UserService/userService';
import Table from '../../_Shared/External/Table/Table';
import { Mediator } from '../../_Shared/External/Mediators/TableMediator';
import { getStudentCourseStatusKey } from '../../../Enum/StudentCourseStatuses';
import { getAbstenceStatusKey } from '../../../Enum/AbstenceStatuses';
import BaseView from '../../common/base-view/BaseView';
import { useMain } from '../../../Hooks/useSlices';

const StudentCourses = (props) => {
  const { departmentId, year, semester } = props;

  const {user} = useMain();
  const mediator = new Mediator();

  const query = {
    departmentId: departmentId,
    year: year,
    semester: semester, 
  };

  const { data: academicInfos } = useGetStudentAcademicInfosQuery({ id: user.id, query: query });

  const columns = [
    {
      field: "name",
      title: "Adı",
    },
    {
      field: "code",
      title: "Kodu",
    },
    {
      field: "credit",
      title: "Kredi",
    },
    {
      field: "absentee",
      title: "Devam Durumu",
      render: rowData => getAbstenceStatusKey(rowData.absentee, 'label'),
    },
    {
      field: "midtermGrade",
      title: "Vize",
      render: rowData => rowData.midtermGrade === -1 ? '' : rowData.midtermGrade,
    },
    {
      field: "finalGrade",
      title: "Final",
      render: rowData => rowData.finalGrade === -1 ? '' : rowData.finalGrade,
    },
    {
      field: "makeupExamGrade",
      title: "Büt",
      render: rowData => rowData.makeupExamGrade === -1 ? '' : rowData.makeupExamGrade,
    },
    {
      field: "letterGrade",
      title: "Harf Notu",
      render: rowData => rowData.letterGrade ? rowData.letterGrade : '',
    },
    {
      field: "studentStatus",
      title: "Durumu",
      render: rowData => getStudentCourseStatusKey(rowData.studentStatus, 'label'),
    },
  ];

  const hideTableComponents = {
    totalItems: true,
    seach: true,
    paginate: true,
  }

  return (
    <BaseView>
      <Table
        columns={columns}
        incomingData={academicInfos}
        hide={hideTableComponents}
        mediator={mediator}
      />
    </BaseView>
  );
};

export default StudentCourses;
