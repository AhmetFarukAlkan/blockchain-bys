import React from 'react';
import useDarkMode from '../../../../Hooks/useDarkMode';
import Button from '../../../common/button/Button';

const DarkModeButton = () => {

  const {isDarkMode, changeDarkMode} = useDarkMode();

  return (
    <Button onClick={() => changeDarkMode(!isDarkMode)} name={'dark-mode'}
            label={''}
            icon={isDarkMode ? 'sun' : 'moon'}
            iconColor={isDarkMode ? 'white' : ''}
            iconSize={'xl'}
            className={'ml-4'}
    />
  );
};

export default DarkModeButton;
