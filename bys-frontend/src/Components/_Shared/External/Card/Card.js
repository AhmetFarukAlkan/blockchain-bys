import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseParagraph from '../../../common/base-paragraph/BaseParagraph';
import BaseView from '../../../common/base-view/BaseView';
import { Image } from 'react-bootstrap';

const Card = (props) => {
  const {title, value, type, icon, iconColor, customIcon, className, render, children} = props;

  const classes = twMerge(`
    relative block p-8 border border-gray-100 
    rounded-xl shadow-xl md sm:p-8 
    dark:bg-gray-500 dark:border-gray-700
    ${className || ''}
  `);

  return (
    <BaseView {...props} className={classes}>
      <h5 className="text-sm text-gray-500 mt-2 dark:text-white">{title}</h5>
      {icon
       ? <FontAwesomeIcon className={`absolute text-3xl right-4 top-4 text-${iconColor}-400`} icon={icon}/>
       : ''}
      {customIcon && 
        <Image
          className={`absolute right-4 top-4`} 
          src={customIcon}
          width={'35'}
        />
      }
      <BaseParagraph
        className={`text-gray-700 text-3xl mt-4 mb-0 font-bold ${'date' === type && 'text-base font-normal'}`}
        text={value}/>
      {children}
      {render ? render : ''}
    </BaseView>
  );
};

export default Card;
