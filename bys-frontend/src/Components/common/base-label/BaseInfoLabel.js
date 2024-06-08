import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {twMerge} from 'tailwind-merge';

const BaseInfoLabel = (props) => {
  const {text, className} = props;

  const labelClasses = twMerge(`
    text-sm text-gray-500 dark:text-gray-400
    text-blue-800 dark:text-blue-400
    ${className || ''}
  `);

  return (
    <span className={labelClasses}>
      <FontAwesomeIcon className={'!mr-1'} icon={'circle-info'}/>
      {text ?? ''}
    </span>
  );
};

export default BaseInfoLabel;
