import React, {useState} from 'react';
import {InputType} from '../../../common/constants/common.constants';
import Button from '../button/Button';
import Input from './Input';

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);

  const suffixComponent = () => (
    <Button
      name={props.name}
      onClick={() => setVisible(!visible)}
      className={'p-0 bg-transparent dark:bg-transparent active:bg-transparent dark:active:bg-transparent'}
      icon={{icon: visible ? 'eye-dropper' : 'eye', customSize: 20}}
    />
  );

  return <Input {...props} type={InputType[visible ? 'TEXT' : 'PASSWORD']}/>;
};

export default PasswordInput;
