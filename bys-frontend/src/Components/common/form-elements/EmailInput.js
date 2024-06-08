import React from 'react';
import {InputType} from '../../../common/constants/common.constants';
import Input from './Input';

const EmailInput = (props) => <Input {...props} type={InputType.EMAIL} />;

export default EmailInput;
