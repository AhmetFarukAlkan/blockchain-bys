import React from 'react';
import {InputType} from '../../../common/constants/common.constants';
import Input from './Input';

const NumericInput = (props) => {
  const { min, max, onChangeText, allowNegative } = props;

  const handleOnChange = (value, onChange) => {
    let number = Math.abs(Number(value));

    if (allowNegative) {
      number = Number(value);
    }

    if (value && !/^\D+$/.test(value)) {
      value = number.toString();
    }

    if (min) {
      value = parseInt(number) <= parseInt(min.toString()) ? min.toString() : value?.toString();
    }

    if (max) {
      value = parseInt(number) >= parseInt(max.toString()) ? max.toString() : value?.toString();
    }

    onChangeText && onChangeText(value, onChange);

    onChange && onChange(value);
  };

  return <Input {...props} type={InputType.NUMBER} onChangeText={(event, onChange) => handleOnChange(event, onChange)} />;
};

export default NumericInput;
