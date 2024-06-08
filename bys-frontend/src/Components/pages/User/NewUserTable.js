import React from 'react';
import {Mediator} from '../../_Shared/External/Mediators/TableMediator';
import Table from '../../_Shared/External/Table/Table';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import GreenButton from '../../common/button/GreenButton';
import { isEmpty } from '../../../Utils/utils';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import BaseText from '../../common/base-text/BaseText';

function NewUserTable() {
  const mediator = new Mediator();
  const fetchUrl = BACKEND_URL.USERS;

  const { openModal } = useModalDispatcher();

  const customInitialQuery = {
    hasRole: false,
  };

  const openShowApproveUserModal = (user) => {
    openModal({
      name: "ShowApproveUserModal",
      props: {user: user},
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
      render: (rowData) => <BaseText text={`${rowData.name} ${rowData.surname}`}/>
    },
    {
      field: 'mail',
      title: 'E-posta',
    },
    {
      field: '',
      title: '',
      render: (rowData) => (
        <>
          {isEmpty(rowData.roles) &&
            <GreenButton
              icon={"eye"}
              onClick={() => openShowApproveUserModal(rowData)}
              label={"Onayla"}
            />
          }
        </>
      ),
    },
  ];

  return (
    <PermissionsGate scopes={[ROLE.ADMIN] || []}>
      <Table
        columns={columns}
        fetchUrl={fetchUrl}
        mediator={mediator}
        customInitialQuery={customInitialQuery}
      />
    </PermissionsGate>
  );
}

export default NewUserTable;
