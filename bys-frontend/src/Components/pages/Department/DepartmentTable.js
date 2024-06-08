import React from "react";
import BaseView from "../../common/base-view/BaseView";
import DataTable from "../../_Shared/External/Table/DataTable";
import { useGetFacultyDepartmentsQuery } from "../../../Api/Services/FacultyService/facultyService";
import GreenButton from "../../common/button/GreenButton";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import { Mediator } from "../../_Shared/External/Mediators/TableMediator";
import OutlineGreen from "../../common/button/OutlineGreen";
import { URL } from "../../../Constants/urlConstants";
import { Link } from "react-router-dom";
import BaseText from "../../common/base-text/BaseText";
import { getDegreeLevelKey } from "../../../Enum/DegreeLevels";

const DepartmentTable = (props) => {
  const { facultyId } = props;

  const mediator = new Mediator();
  const {
    data: departments,
    isLoading,
    refetch,
  } = useGetFacultyDepartmentsQuery({ id: facultyId });
  const { openModal } = useModalDispatcher();

  const openAddDepartmentModal = () => {
    openModal({
      name: "AddDepartmentModal",
      props: {
        refetch: refetch,
        faculty_id: facultyId,
      },
    });
  };

  const openUpdateDepartmentModal = (department) => {
    openModal({
      name: "UpdateDepartmentModal",
      props: {
        department: department,
        faculty_id: facultyId,
        refetch: refetch,
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
          onClick={() => openUpdateDepartmentModal(rowData)}
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
      render: (rowData) => (
        <Link
          to={URL.DEPARTMENTS + "/" + rowData?.id}
          className="tableLink"
          // target="_blank"
        >
          <BaseText text={rowData?.name} className="whitespace-nowrap" />
        </Link>
      ),
    },
    {
      field: "degree_level",
      title: "Derecesi",
      render: (rowData) => getDegreeLevelKey(rowData.degree_level, 'label'),
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
    {
      field: "wallet_address",
      title: "Cüzdan Adresi",
    },
  ];

  return (
    <BaseView className={"mt-3"}>
      <GreenButton
        icon={"plus"}
        className={"mt-2 mb-4"}
        onClick={openAddDepartmentModal}
        label={"Bölüm Ekle"}
      />
      {!isLoading && (
        <DataTable columns={columns} data={departments} mediator={mediator} />
      )}
    </BaseView>
  );
};

export default DepartmentTable;
