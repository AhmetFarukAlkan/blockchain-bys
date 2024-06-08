import React from 'react';
import {useMain} from '../../../Hooks/useSlices';

export const hasRoles = ({userPermissions, scopes}) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return userPermissions.some((role) => scopesMap[role]);
};

const PermissionsGate = ({children, scopes = []}) => {
  const {user} = useMain();
  const userPermissions = user.roles

  const permissionGranted = scopes.length > 0 ? hasRoles({userPermissions, scopes}) : true;

  if (!permissionGranted) return <></>;

  return <>{children}</>;
};

export default PermissionsGate;
