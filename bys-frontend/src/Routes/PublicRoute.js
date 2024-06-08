import ForgotPassword from '../Components/pages/Auth/ForgotPassword';
import Login from '../Components/pages/Auth/Login';
import Register from '../Components/pages/Auth/Register';
import ResetPassword from '../Components/pages/Auth/ResetPassword';
import {URL} from '../Constants/urlConstants';

const PublicRoute = [
  {
    path: URL.DEFAULT_PATH,
    exact: true,
    component: Login
  },
  {
    path: URL.LOGIN,
    exact: true,
    component: Login
  },
  {
    path: URL.REGISTER,
    exact: true,
    component: Register
  },
  {
    path: URL.FORGOT_PASSWORD,
    exact: true,
    component: ForgotPassword
  },
  {
    path: URL.RESET_PASSWORD,
    exact: true,
    component: ResetPassword
  }
];

export default PublicRoute;
