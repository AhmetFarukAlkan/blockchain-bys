import React from 'react';
import {Route, Switch} from 'react-router-dom';
import BaseView from '../../Components/common/base-view/BaseView';
import publicRoute from '../../Routes/PublicRoute';

const AuthLayout = () => (
  <BaseView>
    <Switch>
      {publicRoute.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          render={(componentProps) => <item.component {...componentProps} />}
        />
      ))}
    </Switch>
  </BaseView>
);

export default AuthLayout;
