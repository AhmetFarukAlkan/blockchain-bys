import React from "react";
import BaseView from "../../common/base-view/BaseView";
import DataTable from "../../_Shared/External/Table/DataTable";
import { useGetDepartmentStudentsQuery } from "../../../Api/Services/DepartmentService/departmentService";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import OutlineGreen from "../../common/button/OutlineGreen";
import YellowButton from "../../common/button/YellowButton";
import { ROLE } from "../../../Constants/roleConstants";
import GreenButton from "../../common/button/GreenButton";
import RedButton from "../../common/button/RedButton";
import { useChangeUserDepartmentActivityMutation } from "../../../Api/Services/UserService/userService";
import Toastify from 'toastify-js';

const DepartmentStudents = (props) => {
  const { departmentId, isActive } = props;

  const {data: students} = useGetDepartmentStudentsQuery({id: departmentId, query: {is_active: isActive}});
  const [changeUserActivity] = useChangeUserDepartmentActivityMutation();
  const { openModal } = useModalDispatcher();
  const { goBackModal } = useModalDispatcher();

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

  const openUStudentAcademicInfoModal = (userId) => {
    openModal({
      name: "ShowStudentAcademicInfosModal",
      props: {
        userId: userId,
        departmentId: departmentId,
        options: modalOptions
      },
    });
  };

  const openUStudentTranscriptModal = (userId) => {
    openModal({
      name: "ShowStudentTranscriptModal",
      props: {
        userId: userId,
        departmentId: departmentId,
      },
    });
  };

  const openAddDepartmentUserModal = () => {
    openModal({
      name: "AddDepartmentUserModal",
      props: {
        departmentId: departmentId,
        role: ROLE.STUDENT
      },
    });
  };

  const openShowWarningMessageModal = (data) => {
    openModal({
        name: 'ShowWarningMessageModal',
        props: {
          body: `Öğreniciyi ${isActive === 1 ? 'pasif' : 'aktif'} yapmak istediğinize emin misiniz?`,
          buttons: [
            {
              label: "Evet",
              onClick: () => handleStudentActivity(data.userId),
              className:
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
            },
          ]
        }
    });
  };

  const handleStudentActivity = async (id) => {
    changeUserActivity({id: id, body: {departmentId: departmentId, isActive: isActive !== 1}}).unwrap().then(r => {
      Toastify({
        text: 'Başarıyla Değiştirildi.',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: true
      }).showToast();
      goBackModal()
    });
  };

  const columns = [
    {
      field: 'userId',
      title: 'Id',
    },
    {
      field: 'name',
      title: 'Ad soyad',
    },
    {
      field: 'number',
      title: 'Numarası',
    },
    {
      field: 'mail',
      title: 'E-posta',
    },
    {
      field: 'phone',
      title: 'Telefon Numarası',
    },
    {
      field: "",
      title: "",
      render: (rowData) => (
        <>
          <OutlineGreen
            icon={"eye"}
            onClick={() => openUStudentAcademicInfoModal(rowData.userId)}
            label={"Bilgiler"}
          />
          <YellowButton
            icon={"eye"}
            onClick={() => openUStudentTranscriptModal(rowData.userId)}
            label={"Transkript"}
            className={"ml-2"}
          />
          {isActive === 1 &&
            <RedButton 
              label="Pasif Yap" 
              onClick={() => openShowWarningMessageModal(rowData)}
              className={"ml-2"}
            />
          }
          {isActive === 0 &&
            <GreenButton 
              label="Aktif Yap" 
              onClick={() => openShowWarningMessageModal(rowData)}
              className={"ml-2"}
            />
          }
        </>
      ),
    },
  ];

  return (
    <BaseView className={"mt-3"}>
      <GreenButton
        icon={"plus"}
        className={"mt-2 mb-4"}
        onClick={openAddDepartmentUserModal}
        label={"Öğrenci Ekle"}
      />
      <DataTable columns={columns} data={students || []}/>
    </BaseView>
  );
};

export default DepartmentStudents;
