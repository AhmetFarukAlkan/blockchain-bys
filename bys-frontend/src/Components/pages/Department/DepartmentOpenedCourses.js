import React from "react";
import BaseView from "../../common/base-view/BaseView";
import DataTable from "../../_Shared/External/Table/DataTable";
import { useGetDepartmentOpenedCoursesQuery } from "../../../Api/Services/DepartmentService/departmentService";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import OutlineGreen from "../../common/button/OutlineGreen";
import GreenButton from "../../common/button/GreenButton";
import DefaultButton from "../../common/button/DefaultButton";
import { getSemesterKey } from "../../../Enum/Semesters";
import { getCourseStatusKey } from "../../../Enum/CourseStatuses";
import BaseBadge from "../../common/base-badge/BaseBadge";

const DepartmentOpenedCourses = (props) => {
  const { departmentId, isActive} = props;
  const { openModal } = useModalDispatcher();

  const {data: courses, isLoading, refetch} = useGetDepartmentOpenedCoursesQuery({id: departmentId, query:{is_active: isActive}});

  const openUpdateOpenedCourseModal = (openedCourse) => {
    openModal({
      name: "UpdateOpenedCourseModal",
      props: {
        openedCourse: openedCourse,
        departmentId: departmentId
      },
    });
  };

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

  const openAddExamModal = (courseId) => {
    openModal({
      name: "AddExamModal",
      props: {
        courseId: courseId,
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
      field: "",
      title: "",
      render: (rowData) => (
        <OutlineGreen
          icon={"edit"}
          onClick={() => openUpdateOpenedCourseModal(rowData)}
          label={"Düzenle"}
        />
      ),
    },
    {
      field: "id",
      title: "Id",
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
      field: "year",
      title: "Yıl",
    },
    {
      field: "semester",
      title: "Dönem",
      render: (rowData) => getSemesterKey(rowData.semester, 'label')
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
      field: "location",
      title: "Lokasyon",
    },
    {
      field: "isActive",
      title: "Durumu",
      render: rowData => <BaseBadge className={'mb-2 mr-2'} label={getCourseStatusKey(rowData.isActive, 'label')} color={getCourseStatusKey(rowData.isActive, 'color')}/>
    },
    {
      field: "",
      title: "",
      render: (rowData) => (
        <>
          <DefaultButton
            icon={"eye"}
            onClick={() => openShowCourseStudentsModal(rowData.id)}
            label={"Öğrenciler"}
          />
          <GreenButton
            icon={"plus"}
            className={"ml-2"}
            onClick={() => openAddExamModal(rowData.id)}
            label={"Sınav Ekle"}
          />
        </>
      )
    },
  ];

  return (
    <BaseView className={"mt-3"}>
      {!isLoading && (
        <DataTable columns={columns} data={courses}/>
      )}
    </BaseView>
  );
};

export default DepartmentOpenedCourses;
