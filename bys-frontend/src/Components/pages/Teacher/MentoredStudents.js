import React from 'react';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import { useGetAdvisorStudentsQuery } from '../../../Api/Services/UserService/userService';
import { useMain } from '../../../Hooks/useSlices';
import Table from '../../_Shared/External/Table/Table';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import YellowButton from '../../common/button/YellowButton';
import OutlineGreen from '../../common/button/OutlineGreen';

const MentoredStudents = (props) => {
  const {user} = useMain();

  const {data: data, isLoading, refetch} = useGetAdvisorStudentsQuery({id: user.id});
  const { openModal } = useModalDispatcher();

  const modalOptions = {
    hide: {
      changeMidtermGrade: true,
      changeFinalGrade: true,
      changeMakeupExamGrade: true,
      changeStudentStatus: true,
      changeAbsentee: true,
      advisorApprove: true,
      save: true,
      delete: true,
    }
  }

  const openUStudentAcademicInfoModal = (userId) => {
    openModal({
      name: "ShowStudentAcademicInfosModal",
      props: {
        userId: userId,
        departmentId: data?.advisorInfo?.departmentId,
        options: modalOptions
      },
    });
  };

  const openUStudentTranscriptModal = (userId) => {
    openModal({
      name: "ShowStudentTranscriptModal",
      props: {
        userId: userId,
        departmentId: data?.advisorInfo?.departmentId,
      },
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
      field: 'mail',
      title: 'E-posta',
    },
    {
      field: 'number',
      title: 'Numarası',
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
        </>
      ),
    },
  ];

  const hide = {
    totalItems: true,
    seach: true,
    paginate: true,
  }

  return (
    <PermissionsGate scopes={[ROLE.TEACHER, ROLE.TEACHER] || []}>
      <BasePageWrapper text={'Danışmanı Olduğum Öğreciler'}>
        <Table
          columns={columns}
          incomingData={data?.students || []}
          hide={hide}
        />
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default MentoredStudents;

