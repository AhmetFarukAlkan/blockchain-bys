import React from 'react';
import {InputType} from '../../../common/constants/common.constants';
import Input from './Input';

const TimeInput = (props) => <Input {...props} type={InputType.TIME} />;

export default TimeInput;
