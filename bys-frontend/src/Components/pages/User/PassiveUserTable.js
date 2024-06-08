import React from 'react';
import {Mediator} from '../../_Shared/External/Mediators/TableMediator';
import Table from '../../_Shared/External/Table/Table';
import {BACKEND_URL} from '../../../Constants/backendUrlConstants';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import BaseText from '../../common/base-text/BaseText';

function PassiveUserTable() {
  const mediator = new Mediator();
  const fetchUrl = BACKEND_URL.USERS;

  const customInitialQuery = {
    hasRole: true,
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

export default PassiveUserTable;
