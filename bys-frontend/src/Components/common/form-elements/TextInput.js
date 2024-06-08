import React from 'react';
import {InputType} from '../../../common/constants/common.constants';
import Input from './Input';

const TextInput = (props) => <Input {...props} type={InputType.TEXT} />;

export default TextInput;
