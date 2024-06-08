import React, { useEffect } from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import { useForm } from 'react-hook-form';
import Toastify from 'toastify-js';
import { useDeleteCourseSelectionStatusMutation, useLazyGetStudentAcademicInfosQuery, useUpdateStudentAcademicInfoMutation } from '../../../Api/Services/UserService/userService';
import { StudentCourseStatus, StudentCourseStatuses, getStudentCourseStatusKey } from '../../../Enum/StudentCourseStatuses';
import { AbstenceStatuses, getAbstenceStatusKey } from '../../../Enum/AbstenceStatuses';
import GreenButton from '../../common/button/GreenButton';
import { useChangeCourseSelectionStatusMutation } from '../../../Api/Services/CourseService/courseService';
import GreenBadge from '../../common/base-badge/GreenBadge';
import Select from '../../common/form-elements/Select';
import BaseView from '../../common/base-view/BaseView';
import ExamGradeInput from '../../common/form-elements/ExamGradeInput';
import LetterGradeInput from '../../common/form-elements/LetterGradeInput';
import SemesterSelect from '../../common/form-elements/SemesterSelect';
import YearSelect from '../../common/form-elements/YearSelect';
import { getCurrentSemester, getCurrentYear } from '../../../Utils/utils';
import DataTable from '../../_Shared/External/Table/DataTable';
import RedButton from '../../common/button/RedButton';
import useConfirm from '../../../Hooks/useConfirmHook';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';

const ShowStudentAcademicInfosModal = ({props}) => {
  const {userId, departmentId, options} = props;
  const form = useForm();
  const {openModal} = useModalDispatcher();
  const { goBackModal } = useModalDispatcher();

  const [getStudentAcademicInfos, { data: academicInfos }] = useLazyGetStudentAcademicInfosQuery();
  const [changeCourseSelectionStatus] = useChangeCourseSelectionStatusMutation();
  const [updateStudentAcademicInfo] = useUpdateStudentAcademicInfoMutation();
  const [deleteCourseSelection] = useDeleteCourseSelectionStatusMutation();

  const openShowWarningMessageModal = (selectionId) => {
    openModal({
        name: 'ShowWarningMessageModal',
        props: {
          body: "Öğrenicinin kaydını silmek istediğinize emin misiniz?",
          buttons: [
            {
              label: "Sil",
              onClick: () => handleDelete(selectionId),
              className:
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
            },
          ]
        }
    });
  };

  const handleSave = (selectionId) => {
    const formValues = form.getValues();

    const body = {
      absentee: formValues.absentee[selectionId], 
      midtermGrade: parseFloat(formValues.midtermGrade[selectionId]), 
      finalGrade: parseFloat(formValues.finalGrade[selectionId]), 
      makeupExamGrade: parseFloat(formValues.makeupExamGrade[selectionId]), 
      letterGrade: formValues.letterGrade[selectionId],
      status: formValues.studentStatus[selectionId],
      departmentId: departmentId
    };

    updateStudentAcademicInfo({id: selectionId, body: body}).unwrap().then(r => {
      Toastify({
        text: 'Başarıyla kaydedildi',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: true
      }).showToast();
    });
  };

  const handleDelete = async (selectionId) => {
    deleteCourseSelection({id: selectionId, body: {departmentId: departmentId}}).unwrap().then(r => {
      Toastify({
        text: 'Başarıyla silindi',
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

  const handleCourseSelectionApprove = (selectionId, status) => {
    changeCourseSelectionStatus({id: selectionId, body: {status: status, departmentId: departmentId}}).unwrap().then(r => {
      Toastify({
        text: 'Durum başarıyla değiştirildi',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: true
      }).showToast();
    //   goBackModal();
    });
  }

  const columns = [
    {
      field: "id",
      title: "Id",
      hide: true,
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
      field: "credit",
      title: "Kredi",
    },
    {
      field: "absentee",
      title: "Devam Durumu",
      render: rowData => getAbstenceStatusKey(rowData.absentee, 'label'),
      hide: options?.hide?.absentee
    },
    {
      field: "changeAbsentee",
      title: "Devam Durumu",
      render: rowData => (
        <Select
          form={form}
          name={`absentee[${rowData.studentCourseInfoId}]`}
          options={AbstenceStatuses}
          defaultValue={rowData?.absentee}
          className={'min-w-32'}
          isClearable={false}
        />
      ),
      hide: options?.hide?.changeAbsentee
    },
    {
      field: "midtermGrade",
      title: "Vize",
      render: rowData => rowData?.midtermGrade !== -1 ? rowData?.midtermGrade : '',
      hide: options?.hide?.midtermGrade,
    },
    {
      field: "changeMidtermGrade",
      title: "Vize",
      hide: options?.hide?.changeMidtermGrade,
      render: rowData => (
        <ExamGradeInput 
          form={form} 
          name={`midtermGrade[${rowData.studentCourseInfoId}]`} 
          defaultValue={rowData.midtermGrade} 
        />
      ),
    },
    {
      field: "finalGrade",
      title: "Final",
      render: rowData => rowData?.finalGrade !== -1 ? rowData?.finalGrade : '',
      hide: options?.hide?.finalGrade
    },
    {
      field: "changeFinalGrade",
      title: "Final",
      hide: options?.hide?.changeFinalGrade,
      render: rowData => (
        <ExamGradeInput 
          form={form} 
          name={`finalGrade[${rowData.studentCourseInfoId}]`} 
          defaultValue={rowData.finalGrade} 
        />
      ),
    },
    {
      field: "makeupExamGrade",
      title: "Büt",
      render: rowData => rowData?.makeupExamGrade !== -1 ? rowData?.makeupExamGrade : '',
      hide: options?.hide?.makeupExamGrade
    },
    {
      field: "changeMakeupExamGrade",
      title: "Büt",
      render: rowData => (
        <ExamGradeInput 
          form={form} 
          name={`makeupExamGrade[${rowData.studentCourseInfoId}]`} 
          defaultValue={rowData.makeupExamGrade} 
        />
      ),
      hide: options?.hide?.changeMakeupExamGrade
    },
    {
      field: "changeLetterGrade",
      title: "Harf Notu",
      render: rowData => (
        <LetterGradeInput 
          form={form} 
          studentCourseInfoId={rowData.studentCourseInfoId} 
          gradeScale={rowData.gradingRules} 
          defaultValue={rowData?.letterGrade}
        />
      ),
      hide: options?.hide?.changeLetterGrade
    },
    {
      field: "studentStatus",
      title: "Durumu",
      render: rowData => getStudentCourseStatusKey(rowData.studentStatus, 'label'),
      hide: options?.hide?.studentStatus
    },
    {
      field: "changeStudentStatus",
      title: "Durumu",
      render: rowData => (
        <Select
          form={form}
          name={`studentStatus[${rowData.studentCourseInfoId}]`}
          options={StudentCourseStatuses}
          defaultValue={rowData?.studentStatus}
          className={'min-w-52'}
          isClearable={false}
        />
      ),
      hide: options?.hide?.changeStudentStatus
    },
    {
      field: "advisorApprove",
      title: "Onayla",
      render: rowData => (
        rowData.studentStatus === StudentCourseStatus.IN_ADVISOR_REVIEW ?
          <GreenButton 
            label="Onayla" 
            className="ml-2" 
            onClick={() => handleCourseSelectionApprove(rowData.studentCourseInfoId, StudentCourseStatus.ADVISOR_APPROVED)}
          /> : <GreenBadge label={'Onaylanmış'}/>
      ),
      hide: options?.hide?.advisorApprove
    },
    {
      field: "save",
      title: "Kaydet",
      render: rowData => (
        <GreenButton 
          label="Kaydet" 
          onClick={() => handleSave(rowData.studentCourseInfoId)}
        />
      ),
      hide: options?.hide?.save
    },
    {
      field: "delete",
      title: "Sil",
      render: rowData => (
        <RedButton 
          label="Sil" 
          onClick={() => openShowWarningMessageModal(rowData.studentCourseInfoId)}
        />
      ),
      hide: options?.hide?.delete
    },
  ];

  const modalProps = {
    header: {
      title: `Akademik Bilgiler`,
      icon: 'cross'
    },
    isCancellable: true,
    fullScreen: true,
  };

  useEffect(() => {
    form.watch('semester') && form.watch('year') &&
      getStudentAcademicInfos({ id: userId, query: {
        departmentId: departmentId,
        year: form.watch('year'),
        semester: form.watch('semester'), 
      } });
  }, [form.watch('semester'), form.watch('year')]);  

  return (
    <BaseModal {...modalProps} >
      <BaseView className={"p-4"}>
        <BaseView className="grid grid-cols-5 gap-2 mt-3">
          <YearSelect
            label="Yıl" 
            form={form} 
            defaultValue={getCurrentYear()}
            isClearable={false} 
          />
          <SemesterSelect
            label="Dönem"
            form={form}
            defaultValue={getCurrentSemester()}
            isClearable={false} 
          />
        </BaseView>
        <DataTable
          columns={columns}
          data={academicInfos || []}
          overflowX={false}
        />
      </BaseView>
    </BaseModal>
  );
};

export default ShowStudentAcademicInfosModal;
