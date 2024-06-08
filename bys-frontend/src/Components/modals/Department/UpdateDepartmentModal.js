import React from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import { useForm } from 'react-hook-form';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import Toastify from 'toastify-js';
import DepartmentForm from '../../_Shared/External/Department/DepartmentForm';
import { useUpdateDepartmentMutation } from '../../../Api/Services/DepartmentService/departmentService';

const UpdateDepartmentModal = ({props}) => {
  const {department, faculty_id, refetch} = props;
  const form = useForm();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const {goBackModal} = useModalDispatcher();

  const handleDepartment = (data) => {
    data.faculty_id = faculty_id;

    updateDepartment({id: department.id, body: data}).unwrap().then(r => {
        Toastify({
          text: 'Bölüm başarıyla güncellendi',
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
          stopOnFocus: true
        }).showToast();
        refetch();
        goBackModal();
      });
  };

  const modalProps = {
    header: {
      title: `${department.name} Bölümünü Düzenle`,
      icon: 'cross'
    },
    isCancellable: true,
    buttons: [
        {
          label: 'Kaydet',
          onClick: form.handleSubmit(handleDepartment),
          className: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        }
      ]
  };

  return (
    <BaseModal {...modalProps} >
      <DepartmentForm department={department} form={form}/>
    </BaseModal>
  );
};

export default UpdateDepartmentModal;
