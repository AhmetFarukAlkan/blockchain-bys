import React from "react";
import BaseView from "../../common/base-view/BaseView";
import DataTable from "../../_Shared/External/Table/DataTable";
import { useGetDepartmentCoursesQuery } from "../../../Api/Services/DepartmentService/departmentService";
import GreenButton from "../../common/button/GreenButton";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import OutlineGreen from "../../common/button/OutlineGreen";

const DepartmentCourses = (props) => {
  const { departmentId } = props;

  const {
    data: courses,
    isLoading,
    refetch,
  } = useGetDepartmentCoursesQuery({
    id: departmentId,
  });

  const { openModal } = useModalDispatcher();

  const openAddCourseModal = () => {
    openModal({
      name: "AddCourseModal",
      props: {
        refetch: refetch,
        departmentId: departmentId,
      },
    });
  };

  const openUpdateCourseModal = (course) => {
    openModal({
      name: "UpdateCourseModal",
      props: {
        course: course,
        refetch: refetch,
        departmentId: departmentId
      },
    });
  };

  const openAddOpenedCourseModal = (courseId) => {
    openModal({
      name: "AddOpenedCourseModal",
      props: {
        courseId: courseId,
        departmentId: departmentId
      },
    });
  };

  const columns = [
    {
      field: "",
      title: "",
      render: (rowData) => (
        <OutlineGreen
          icon={"edit"}
          onClick={() => openUpdateCourseModal(rowData)}
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
        <GreenButton
          icon={"plus"}
          onClick={() => openAddOpenedCourseModal(rowData.id)}
          label={"Dersi Aç"}
        />
      ),
    },
  ];

  return (
    <BaseView className={"mt-3"}>
      <GreenButton
        icon={"plus"}
        className={"mt-2 mb-4"}
        onClick={openAddCourseModal}
        label={"Ders Ekle"}
      />
      {!isLoading && (
        <DataTable columns={columns} data={courses}/>
      )}
    </BaseView>
  );
};

export default DepartmentCourses;
