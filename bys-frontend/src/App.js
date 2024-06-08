import React, {createElement} from 'react';
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import ConfirmContextProvider from './Contexts/ConfirmContextProvider';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import ModalProvider from './providers/ModalProvider';
import {isEmpty} from './Utils/utils';
import AuthLayout from './views/layouts/AuthLayout';
import MainLayout from './views/layouts/MainLayout';
import {useMain} from './Hooks/useSlices';
import {ACCESS_TOKEN} from './common/constants/local.storage.constants';
import Loading from './Components/common/loading/loading';
import { URL } from './Constants/urlConstants';

const App = () => {
  library.add(fas, far, fab);

  const {user} = useMain();

  const handleLayout = () => {
    if (!isEmpty(user) && !isEmpty(localStorage.getItem(ACCESS_TOKEN))) {
      return MainLayout;
    } else {
      return AuthLayout;
    }
  };

  const checkAccess = () => {
    if (isEmpty(localStorage.getItem(ACCESS_TOKEN))) {
      return <Redirect to={URL.LOGIN}/>;
    }
  };

  return (
    <>
      <ConfirmContextProvider>
        <Router>
          {checkAccess()}
          {createElement(handleLayout())}
        </Router>
        <ModalProvider/>
        <Loading/>
      </ConfirmContextProvider>
    </>
  );
};

export default App;
