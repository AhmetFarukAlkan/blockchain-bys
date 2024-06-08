import React from "react";
import BaseView from "../../common/base-view/BaseView";
import DataTable from "../../_Shared/External/Table/DataTable";
import { Mediator } from "../../_Shared/External/Mediators/TableMediator";
import { useGetDepartmentTeachersQuery } from "../../../Api/Services/DepartmentService/departmentService";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import { ROLE } from "../../../Constants/roleConstants";
import GreenButton from "../../common/button/GreenButton";

const DepartmentTeachers = (props) => {
  const { departmentId } = props;
  const { openModal } = useModalDispatcher();

  const {data: teachers} = useGetDepartmentTeachersQuery({id: departmentId});

  const openAddDepartmentUserModal = () => {
    openModal({
      name: "AddDepartmentUserModal",
      props: {
        departmentId: departmentId,
        role: ROLE.TEACHER
      },
    });
  };

  const columns = [
    {
      field: 'userId',
      title: 'Id',
    },
    {
      field: 'fullName',
      title: 'Ad soyad',
    },
    {
      field: 'mail',
      title: 'E-posta',
    },
    {
      field: 'phone',
      title: 'Telefon Numarası',
    },
  ];

  return (
    <BaseView className={"mt-3"}>
      <GreenButton
        icon={"plus"}
        className={"mt-2 mb-4"}
        onClick={openAddDepartmentUserModal}
        label={"Öğretim Üyesi Ekle"}
      />
      <DataTable columns={columns} data={teachers || []}/>
    </BaseView>
  );
};

export default DepartmentTeachers;
