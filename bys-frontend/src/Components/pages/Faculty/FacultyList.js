import React from "react";
import { Mediator } from "../../_Shared/External/Mediators/TableMediator";
import Table from "../../_Shared/External/Table/Table";
import { BACKEND_URL } from "../../../Constants/backendUrlConstants";
import BasePageWrapper from "../../common/base-page-wrapper/BasePageWrapper";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import OutlineGreen from "../../common/button/OutlineGreen";
import GreenButton from "../../common/button/GreenButton";
import PermissionsGate from "../../common/roles/PermissionsGate";
import { ROLE } from "../../../Constants/roleConstants";

function FacultyList() {
  const mediator = new Mediator();
  const fetchUrl = BACKEND_URL.FACULTIES;
  const { openModal } = useModalDispatcher();

  const openUpdateFacultyModal = (faculty) => {
    openModal({
      name: "UpdateFacultyModal",
      props: {
        faculty: faculty,
        mediator: mediator,
      },
    });
  };

  const openAddFacultyModal = () => {
    openModal({
      name: "AddFacultyModal",
      props: {
        mediator: mediator,
      },
    });
  };

  const columns = [
    {
      field: "",
      title: "",
      render: (rowData) => (
        <OutlineGreen
          icon={"edit"}
          onClick={() => openUpdateFacultyModal(rowData)}
          label={"Düzenle"}
        />
      ),
    },
    {
      field: "id",
      title: "Id",
    },
    {
      field: "name",
      title: "Adı",
    },
    {
      field: "email",
      title: "E-posta",
    },
    {
      field: "phone_number",
      title: "Numarası",
    },
    {
      field: "location",
      title: "Lokasyonu",
    },
  ];

  return (
    <PermissionsGate scopes={[ROLE.ADMIN] || []}>
      <BasePageWrapper text={"Fakülteler"}>
        <GreenButton
          icon={"plus"}
          onClick={openAddFacultyModal}
          label={"Fakülte Ekle"}
        />
        <Table columns={columns} fetchUrl={fetchUrl} mediator={mediator} />
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default FacultyList;
