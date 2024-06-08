import React from 'react';
import BaseView from '../base-view/BaseView';
import {twMerge} from 'tailwind-merge';

const BaseFilterWrapper = (props) => {
  const {className} = props;

  const classes = twMerge(`
    place-items-center
    w-full bg-[#f8fafc]
    p-6 border 
    border-blue-grey-50 rounded-lg 
    scroll-mt-48 
    overflow-x-scroll 
    lg:overflow-visible
    ${className || ''}
  `);

  return (
    <BaseView
      {...props}
      className={classes}
    >
      {props.children}
    </BaseView>
  );
};

export default BaseFilterWrapper;
