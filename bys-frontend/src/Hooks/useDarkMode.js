import React, {useEffect} from 'react';
import {setDarkMode} from '../redux/slices/mainSlice';
import {useAppDispatch} from './useRedux';
import {useMain} from './useSlices';

const useDarkMode = () => {
  const htmlDocument = document.documentElement.classList;
  const {
    preferences: {isDarkMode}
  } = useMain();
  const dispatch = useAppDispatch();

  const changeDarkMode = (darkMode) => {
    dispatch(setDarkMode(darkMode));
  };

  useEffect(() => {
    isDarkMode ? htmlDocument.add('dark') : htmlDocument.remove('dark');
  }, [isDarkMode]);

  return {isDarkMode, changeDarkMode};
};

export default useDarkMode;
