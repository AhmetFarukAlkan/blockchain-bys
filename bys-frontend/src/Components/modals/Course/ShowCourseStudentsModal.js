import React from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import { useForm } from 'react-hook-form';
import Toastify from 'toastify-js';
import { useUpdateStudentAcademicInfoMutation } from '../../../Api/Services/UserService/userService';
import { AbstenceStatuses, getAbstenceStatusKey } from '../../../Enum/AbstenceStatuses';
import GreenButton from '../../common/button/GreenButton';
import Select from '../../common/form-elements/Select';
import BaseView from '../../common/base-view/BaseView';
import ExamGradeInput from '../../common/form-elements/ExamGradeInput';
import { useGetOpenedCourseStudentsQuery } from '../../../Api/Services/CourseService/courseService';
import { StudentCourseStatuses } from '../../../Enum/StudentCourseStatuses';
import LetterGradeInput from '../../common/form-elements/LetterGradeInput';
import DataTable from '../../_Shared/External/Table/DataTable';

const ShowCourseStudentsModal = ({props}) => {
  const {courseId, options, departmentId} = props;
  const form = useForm();

  const { data: students } = useGetOpenedCourseStudentsQuery({ id: courseId });
  const [updateStudentAcademicInfo] = useUpdateStudentAcademicInfoMutation();

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

  const modalProps = {
    header: {
      title: `Öğrenci Listesi`,
      icon: 'cross'
    },
    isCancellable: true,
    fullScreen: true
  };

  const columns = [
    {
      field: "studentName",
      title: "Adı",
    },
    {
      field: "number",
      title: "Numarası",
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
          className={'min-w-40'}
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
          disabled
        />
      ),
      className: 'hidden',
    },
    {
      field: "save",
      title: "Kaydet",
      render: rowData => (
        <GreenButton 
          label="Kaydet" 
          className="ml-2" 
          onClick={() => handleSave(rowData.studentCourseInfoId)}
        />
      ),
      hide: options?.hide?.save
    },
  ];

  return (
    <BaseModal {...modalProps} >
      <BaseView className={'p-4'}>
        <DataTable
          columns={columns}
          data={students}
          overflowX={false}
        />
      </BaseView>
    </BaseModal>
  );
};

export default ShowCourseStudentsModal;
