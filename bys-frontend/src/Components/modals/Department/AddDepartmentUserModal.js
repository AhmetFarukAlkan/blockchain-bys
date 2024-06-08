import React, { useEffect } from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import { useChangeUserRoleMutation, useLazyGetUserQuery } from "../../../Api/Services/UserService/userService";
import BaseView from "../../common/base-view/BaseView";
import TextInput from "../../common/form-elements/TextInput";
import NumericInput from "../../common/form-elements/NumericInput";
import RoleSelect from "../../common/form-elements/RoleSelect";
import { ROLE } from "../../../Constants/roleConstants";
import DepartmentTeacherSelect from "../../common/form-elements/DepartmentTeacherSelect";
import { getRoleKey } from "../../../Enum/Roles";
import { formSetter } from "../../../Utils/utils";

const AddDepartmentUserModal = ({ props }) => {
  const { departmentId, role } = props;
  const form = useForm();
  const { goBackModal } = useModalDispatcher();

  const [changeUserRole] = useChangeUserRoleMutation();
  const [getUser, { data: user }] = useLazyGetUserQuery();

  const handleUser = (data) => {
    data.department_id = departmentId;
    changeUserRole({id: form.watch('user_id'), body: data })
    .unwrap()
    .then((r) => {
      Toastify({
        text: "Kullanıcı başarıyla bölüme eklendi",
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
      title: `${getRoleKey(role, 'label')} Ekle`,
      icon: "cross",
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
    form.watch('user_id') &&
      getUser({id: form.watch('user_id')});
  }, [form.watch('user_id')]);  

  useEffect(() => {
    user &&
    formSetter({ form, values: {
      name: user.name,
      surname: user.surname,
      mail: user.mail,
      phone: user.phone,
    }});
  }, [user]);  

  useEffect(() => {
    role && form.setValue('role', role)
  }, [role]);  

  return (
    <BaseModal {...modalProps}>
      <NumericInput label="Kullanıcı Id" form={form} name="user_id"/>
      <BaseView className="grid grid-cols-2 gap-4">
        <TextInput label="Adı" form={form} name="name" defaultValue={user?.name} disabled />
        <TextInput label="Soyadı" form={form} name="surname" defaultValue={user?.surname} disabled/>
        <TextInput label="Mail" form={form} name="mail" defaultValue={user?.mail} disabled/>
        <TextInput label="Telefon Numarası" form={form} name="phone" defaultValue={user?.phone} disabled/>
      </BaseView>
      <RoleSelect name={'role'} label={'Rol'} form={form} disabled/>
      {form.watch('role') === ROLE.STUDENT &&
        <DepartmentTeacherSelect name={'teacherId'} label={'Danışman'} form={form} departmentId={departmentId}/>
      }
    </BaseModal>
  );
};

export default AddDepartmentUserModal;
