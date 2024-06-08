import React from 'react';
import BaseView from '../base-view/BaseView';
import BaseParagraph from '../base-paragraph/BaseParagraph';
import { twMerge } from 'tailwind-merge';

const ActivityLog = (props) => {
  const { activities = [], className } = props;

  const classes = twMerge(`
    p-2 sm:p-4
    ${className || ''}
  `);

  return (
    <BaseView className={classes}>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {activities?.map((activity, index) => {
          return (
            <li className="mb-10 ml-4" key={index}>
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{activity.created_at}</time>
              <BaseParagraph className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" text={activity.entry.split(',')[1]} />
            </li>
          )
        })}
      </ol>
    </BaseView>
  );
}

export default ActivityLog;
