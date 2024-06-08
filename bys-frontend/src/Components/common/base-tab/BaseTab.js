import React, {useState} from 'react';
import {slugify} from '../../../Utils/utils';
import BaseView from '../base-view/BaseView';

const BaseTab = (props) => {
  let children = Array.isArray(props.children) ? props.children : [props.children];

  if (!props.children) {
    children = [];
  }

  const [activeTab, setActiveTab] = useState(slugify(children[0].props.label));

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(slugify(newActiveTab));
  };

  return (
    <BaseView
      className={'text-sm font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'}>
      <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
          {children?.map((item, index) => {
            if (item) {
              return (
                <BaseView
                  key={index} onClick={(e) => handleClick(e, item.props.label)}
                  className={`
                  inline-block p-4 border-b-2 rounded-t-lg transition transition-all duration-300 
                  ${slugify(item.props.label) === activeTab
                    ? 'text-gray-600 border-gray-600 active dark:text-gray-300 dark:border-gray-300'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:cursor-pointer'}
                 `}
                >
                  {item.props.label}
                </BaseView>
              );
            }
          })}
        </li>
      </ul>
      {children?.map((item, index) => {
        if (item && slugify(item.props.label) === activeTab)
          return (
            <BaseView key={index} eventKey={slugify(item.props.label)} title={item.props.label}>
              {item.props.children}
            </BaseView>
          );
      })}
    </BaseView>
  );
};

export default BaseTab;