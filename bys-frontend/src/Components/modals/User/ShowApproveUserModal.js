import React, { useEffect } from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import BaseView from '../../common/base-view/BaseView';
import TextInput from '../../common/form-elements/TextInput';
import { useForm } from 'react-hook-form';
import FacultySelect from '../../common/form-elements/FacultySelect';
import RoleSelect from '../../common/form-elements/RoleSelect';
import { ROLE } from '../../../Constants/roleConstants';
import FacultyDepartmentSelect from '../../common/form-elements/FacultyDepartmentSelect';
import { useApproveUserMutation } from '../../../Api/Services/UserService/userService';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import Toastify from "toastify-js";
import { generateUniqueStudentId } from '../../../Utils/utils';
import { useLazyGetDepartmentStudentsQuery } from '../../../Api/Services/DepartmentService/departmentService';
import DepartmentTeacherSelect from '../../common/form-elements/DepartmentTeacherSelect';

const ShowApproveUserModal = ({props}) => {
  const {user} = props;

  const form = useForm();
  const { goBackModal } = useModalDispatcher();

  const [approveUser] = useApproveUserMutation();
  const [getDepartmentStudents, { data: students }] = useLazyGetDepartmentStudentsQuery();

  const handleUser = (data) => {
    data.number = generateUniqueStudentId(data.department_id, data.faculty_id, students)
    approveUser({id: user.userId, body: data })
    .unwrap()
    .then((r) => {
      Toastify({
        text: "Kullanıcı başarıyla güncellendi",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #37ecba, #72afd3)",
        stopOnFocus: true,
      }).showToast();
      goBackModal();
    });
  };

  const modalProps = {
    header: {
      title: `Kullanıcıyı Onayla`,
      icon: 'cross'
    },
    isCancellable: true,
    buttons: [
      {
        label: "Kaydet",
        onClick: form.handleSubmit(handleUser),
        className:
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
      },
    ],
  };

  useEffect(() => {
    form.watch('role') === ROLE.STUDENT && form.watch('department_id') &&
      getDepartmentStudents({id: form.watch('department_id'), query: {is_active: 1}});
  }, [form.watch('role'), form.watch('department_id')]);  

  return (
    <BaseModal {...modalProps} >
      <BaseView className={'p-4'}>
        <BaseView className="grid grid-cols-2 gap-4">
          <TextInput label="Adı" form={form} name="name" defaultValue={user?.name} disabled />
          <TextInput label="Soyadı" form={form} name="surname" defaultValue={user?.surname} disabled/>
          <TextInput label="Mail" form={form} name="mail" defaultValue={user?.mail} disabled/>
          <TextInput label="Telefon Numarası" form={form} name="phone" defaultValue={user?.phone} disabled/>
        </BaseView>
        <RoleSelect name={'role'} label={'Rol'} form={form}/>
        {form.watch('role') && form.watch('role') !== ROLE.ADMIN && 
          <FacultySelect label={'Fakülte'} form={form}/>}
        {form.watch('faculty_id') && 
          <FacultyDepartmentSelect label={'Bölüm'} form={form} facultyId={form.watch('faculty_id')}/>}
        {form.watch('department_id') && form.watch('role') === ROLE.STUDENT &&
          <DepartmentTeacherSelect name={'teacherId'} label={'Danışman'} form={form} departmentId={form.watch('department_id')}/>
        }
      </BaseView>
    </BaseModal>
  );
};

export default ShowApproveUserModal;
