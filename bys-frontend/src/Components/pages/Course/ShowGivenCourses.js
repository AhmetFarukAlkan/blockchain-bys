import React from 'react';
import { useGetTeacherGivenCoursesQuery } from '../../../Api/Services/UserService/userService';
import Table from '../../_Shared/External/Table/Table';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import GreenButton from '../../common/button/GreenButton';
import DefaultButton from '../../common/button/DefaultButton';

const ShowGivenCourses = (props) => {
  const { user, departmentId, year, semester } = props;
  const { openModal } = useModalDispatcher();

  const query = {
    departmentId: departmentId,
    year: year,
    semester: semester, 
  };

  const {data: teachetCourses, refetch} = useGetTeacherGivenCoursesQuery({id: user.id, query: query});

  const openShowCourseStudentsModal = (courseId) => {
    openModal({
      name: "ShowCourseStudentsModal",
      props: {
        courseId: courseId,
        options: modalOptions,
        departmentId: departmentId
      },
    });
  };

  const openUpdateOpenedCourseGradingRulesModal = (openedCourse) => {
    openModal({
      name: "UpdateOpenedCourseGradingRulesModal",
      props: {
        openedCourse: openedCourse,
        departmentId: departmentId
      },
    });
  };

  const modalOptions = {
    hide: {
      advisorApprove: true,
      studentStatus: true,
      makeupExamGrade: true,
      finalGrade: true,
      midtermGrade: true,
      absentee: true,
    }
  }

  const columns = [
    {
      field: "id",
      title: "Id",
    },
    {
      field: "courseId",
      title: "Ders Id",
    },
    {
      field: "name",
      title: "Adı",
    },
    {
      field: "code",
      title: "Kodu",
    },
    {
      field: "capacity",
      title: "Kapasite",
    },
    {
      field: "credit",
      title: "Kredi",
    },
    {
      field: "",
      title: "",
      render: (rowData) => (
        <>
          <GreenButton
            icon={"eye"}
            onClick={() => openShowCourseStudentsModal(rowData.id)}
            label={"Öğrenciler"}
          />
          <DefaultButton
            onClick={() => openUpdateOpenedCourseGradingRulesModal(rowData)}
            label={"Harf Notu Kuralları"}
            className={'ml-2'}
            icon={'right-left'}
          />
        </>
      )
    },
  ];

  const hide = {
    totalItems: true,
    seach: true,
    paginate: true,
  }

  return (
    <Table
      columns={columns}
      incomingData={teachetCourses || []}
      hide={hide}
    />
  );
}

export default ShowGivenCourses;

