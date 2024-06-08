import React from 'react';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import { useGetAdvisorStudentsQuery } from '../../../Api/Services/UserService/userService';
import { useMain } from '../../../Hooks/useSlices';
import Table from '../../_Shared/External/Table/Table';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import OutlineGreen from '../../common/button/OutlineGreen';

const ReviewCourseSelection = (props) => {
  const {user} = useMain();

  const {data: data, isLoading, refetch} = useGetAdvisorStudentsQuery({id: user.id});
  const { openModal } = useModalDispatcher();

  const modalOptions = {
    hide: {
      absentee: true,
      midtermGrade: true,
      finalGrade: true,
      makeupExamGrade: true,
      changeMidtermGrade: true,
      changeFinalGrade: true,
      changeMakeupExamGrade: true,
      changeStudentStatus: true,
      changeAbsentee: true,
      changeLetterGrade: true,
      save: true
    }
  }

  const openShowStudentAcademicInfosModal = (userId) => {
    openModal({
      name: "ShowStudentAcademicInfosModal",
      props: {
        userId: userId,
        departmentId: data?.advisorInfo?.departmentId,
        options: modalOptions
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
        <OutlineGreen
          icon={"eye"}
          onClick={() => openShowStudentAcademicInfosModal(rowData.userId)}
          label={"Bilgiler"}
        />
      ),
    },
  ];

  const hide = {
    totalItems: true,
    seach: true,
    paginate: true,    
  }

  return (
    <PermissionsGate scopes={[ROLE.ADMIN, ROLE.TEACHER] || []}>
      <BasePageWrapper text={'Ders Seçimlerini İncele'}>
        <Table
          columns={columns}
          incomingData={data?.students || []}
          hide={hide}
        />
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default ReviewCourseSelection;

