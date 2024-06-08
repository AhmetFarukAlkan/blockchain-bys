import React from 'react';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import BaseTab from '../../common/base-tab/BaseTab';
import BaseView from '../../common/base-view/BaseView';
import NewUserTable from './NewUserTable';
import PassiveUserTable from './PassiveUserTable';

function UserList() {
  return (
    <PermissionsGate scopes={[ROLE.ADMIN] || []}>
      <BasePageWrapper text={'Pasif Kullanıcılar'}>
        <BaseTab>
          <BaseView label={'Yeni Kullanıcılar'}>
            <NewUserTable/>
          </BaseView>
          <BaseView label={'Pasif Kullanıcılar'}>
            <PassiveUserTable/>
          </BaseView>
        </BaseTab>
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default UserList;
