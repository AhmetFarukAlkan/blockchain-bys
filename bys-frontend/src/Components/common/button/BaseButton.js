import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {twMerge} from 'tailwind-merge';
import useEnterKeyHandler from '../../../Hooks/useEnterKeyHandler';

const BaseButton = (props) => {
  const {label, name, className, icon, buttonClassName, iconColor, iconSize, isKeyHandler=false, ...restProps} = props;

  const classes = twMerge(`
    px-3 py-2 items-center font-semibold
    cursor-not-allowed
    ${className || ''}
  `);

  const buttonClasses = twMerge(`
     ${label ? 'mr-2' : ''} ${buttonClassName || ''}
  `);

  useEnterKeyHandler(restProps.onClick, isKeyHandler);

  return (
    <button {...restProps} className={classes} type={'button'}>
      {icon && <FontAwesomeIcon icon={icon} color={iconColor} size={iconSize} className={buttonClasses}/>}
      {label}
    </button>
  );
};

export default BaseButton;
