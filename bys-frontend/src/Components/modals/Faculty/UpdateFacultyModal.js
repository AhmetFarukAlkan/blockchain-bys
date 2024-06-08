import React from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import { useForm } from 'react-hook-form';
import { useUpdateFacultyMutation } from '../../../Api/Services/FacultyService/facultyService';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import Toastify from 'toastify-js';
import FacultyForm from '../../_Shared/External/Faculty/FacultyForm';

const UpdateFacultyModal = ({props}) => {
  const {faculty, mediator} = props;
  const form = useForm();
  const [updateFaculty] = useUpdateFacultyMutation();
  const {goBackModal} = useModalDispatcher();

  const handleFaculty = (data) => {
    updateFaculty({id: faculty.id, body: data}).unwrap().then(r => {
        Toastify({
          text: 'Fakulte başarıyla güncellendi',
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
          stopOnFocus: true
        }).showToast();
        mediator.updateRowData({ id: faculty.id, ...data });
        goBackModal();
      });
  };

  const modalProps = {
    header: {
      title: `${faculty.name} Fakültesini Düzenle`,
      icon: 'cross'
    },
    isCancellable: true,
    buttons: [
        {
          label: 'Kaydet',
          onClick: form.handleSubmit(handleFaculty),
          className: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        }
      ]
  };

  return (
    <BaseModal {...modalProps} >
      <FacultyForm faculty={faculty} form={form}/>
    </BaseModal>
  );
};

export default UpdateFacultyModal;
