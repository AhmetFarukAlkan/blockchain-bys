import axios from 'axios';
import React from 'react';
import {Redirect} from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {ACCESS_TOKEN} from './common/constants/local.storage.constants';
import {getMessage} from './Enum/messages';
import {URL} from './Constants/urlConstants';
import useModalDispatcher from './Hooks/useModalDispatcher';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem(ACCESS_TOKEN);
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      axios.defaults.headers.common.Authorization = null;
      const { goBackModal } = useModalDispatcher();
      goBackModal();
      return (
        <Redirect to="/login"/>
      );
    } else if (error.response.status === 422) {
      if (error.response.data && error.response.data.errors) {
        for (const key in error.response.data.errors) {
          if (error.response.data.errors.hasOwnProperty(key)) {
            const element = error.response.data.errors[key];
            Toastify({
              text: element,
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
              stopOnFocus: true
            }).showToast();
          }
        }
      } else {
        Toastify({
          text: getMessage(error.response.data.message),
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
          stopOnFocus: true
        }).showToast();
      }
    } else if (error.response.status === 404) {
      Toastify({
        text: getMessage(error.response.data.message),
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true
      }).showToast();
    } else if (error.response.status === 400) {
      Toastify({
        text: getMessage(error.response.data.message),
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true
      }).showToast();
    } else if (error.response.status === 500) {
      Toastify({
        text: 'Server Error',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true
      }).showToast();
    } else if (error.response.status === 403) {
      Toastify({
        text: 'Bu işlem için yetkiniz yok',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true
      }).showToast();
      const { goBackModal } = useModalDispatcher();
      goBackModal();
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      axios.defaults.headers.common.Authorization = null;
      return (
        <Redirect to="/login"/>
      );
    }

    return Promise.reject(error);
  }
);

export default axios;
