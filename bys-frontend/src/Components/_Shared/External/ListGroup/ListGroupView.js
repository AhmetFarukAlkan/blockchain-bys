import React from 'react';
import {twMerge} from 'tailwind-merge';
import {isEmpty} from '../../../../Utils/utils';

export const ListGroupView = ({items, className, classNameItem}) => {

  const classes = twMerge(`
    divide-y divide-gray-200 dark:divide-gray-700
    ${className || ''}
  `);

  const classesItem = twMerge(`
  py-3 sm:py-4
  ${classNameItem || ''}
  `);

  return (
    <ul className={classes}>
      {
        !isEmpty(items) &&
        items.map((item, index) => {
          return (
            <li key={index} className={classesItem}>
              <div className="flex space-x-2">
                {item.title && <div><strong>{item.title}: </strong></div>}
                <div className="break-all dark:text-white">{item.value} {item.render}</div>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};
