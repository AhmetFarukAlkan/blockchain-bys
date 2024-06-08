import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {twMerge} from 'tailwind-merge';
import {Menu} from '../../../../Data/SideBar/SideBarMenu.js';
import useSideMenu from '../../../../Hooks/useSideMenu';
import BaseView from '../../../common/base-view/BaseView';
import SidebarItem from '../Menu/SideBarItem';
import { useMain } from '../../../../Hooks/useSlices.js';

const SideMenu = () => {
  const {setExpandedValue, expandedStatus} = useSideMenu();
  const {preferences: { isDarkMode }} = useMain();

  const handleToggle = () => {
    if (expandedStatus) {
      setExpandedValue('50px');
    } else {
      setExpandedValue('350px');
    }
  };

  const sideMenuClasses = twMerge(`
    h-full sticky top-0 left-0
    overflow-hidden
    dark:bg-slate-dark
    border-r-[1px]
    border-slate-200
    dark:border-slate-800
    bg-[#f8fafc]
    dark:bg-gray-900
    font-bold
    w-[${expandedStatus ? '15%' : '5%'}]
  `);

  return (
    <>
      <BaseView className={sideMenuClasses}>
        <div className={'w-[15%] w-[5%] w-[85%] w-[95%]'}></div>
        <nav aria-label="Main Nav" className={'flex flex-col overflow-auto h-[100vh] hide-scrollbar'}>
          <BaseView className={`flex justify-items-start !py-5 ${expandedStatus ? 'pl-3' : 'mx-auto'}`}>
            {<FontAwesomeIcon icon={expandedStatus ? 'xmark' : 'bars'}
                              onClick={() => handleToggle()}
                              size={'1x'}
                              color={isDarkMode ? 'white' : 'black'}
                              className={'cursor-pointer'}/>}
          </BaseView>

          {Menu.map((item, index) => (
            <SidebarItem key={index} item={item} expanded={expandedStatus} darkMode={isDarkMode}/>
          ))}
        </nav>
      </BaseView>
    </>
  );
};

export default SideMenu;
