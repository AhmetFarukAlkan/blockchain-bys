import React from 'react';
import {twMerge} from 'tailwind-merge';
import BaseView from '../../Components/common/base-view/BaseView';

const BaseModalLayout = (props) => {

  const {className} = props;

  const classes = twMerge(`
    justify-center items-center flex overflow-x-hidden overflow-y-auto 
    fixed inset-0 z-50 outline-none focus:outline-none
    ${className || ''}
  `);

  return (
    <BaseView className={classes}>
        {props.children}
    </BaseView>
  );
};

export default BaseModalLayout;
