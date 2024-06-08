import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import BaseText from '../../../common/base-text/BaseText';
import PermissionsGate from '../../../common/roles/PermissionsGate';

const SidebarItem = (props) => {
  const {item, expanded, darkMode} = props;

  const [open, setOpen] = useState(false);
  let location = useLocation();
  let currentPathName = location.pathname;

  useEffect(() => {
    setOpen(currentPathName.split('/').includes(item.relative_path));
  }, [location]);

  const onToggle = event => {
    event.preventDefault();
    setOpen(!open);
  };

  if (item.children) {
    return (
      <>
        <PermissionsGate scopes={item.permissions || []}>
          <details className="group transition transition-all 
                    duration-200 text-blue-600 dark:text-[#FB4685]"
                   {...(open ? {open: true} : {})}
          >
            <summary
              className={`flex ${expanded ? '' : 'justify-center'}
               px-4 py-2 cursor-pointer 
               hover:bg-gray-300 dark:hover:bg-gray-600`}
              onClick={onToggle}
              title={item.title}
            >
              {item.iconName && <FontAwesomeIcon icon={item.iconName} size={'sm'} color={darkMode ? 'white' : 'black'}/>}
              {expanded && <BaseText className={'ml-3 font-medium'} text={item.title}/>}
              {expanded && <FontAwesomeIcon icon={'chevron-up'}
                                            transform={{ rotate: open ? 0 : 180 }}
                                            color={darkMode ? 'white' : 'black'}
                                            className={'my-auto ml-auto mr-3 transition transition-all duration-200'}
                                            size={'sm'}/>}
            </summary>
            <nav aria-label="Teams Nav" className={`flex flex-col ${expanded ? 'mt-1.5 ml-4' : ''}`}>
              {item.children.map(
                (child, index) => <SidebarItem key={index} item={child} expanded={expanded} darkMode={darkMode}/>
              )}
            </nav>
          </details>
        </PermissionsGate>
      </>
    );
  } else {
    return (
      <>
        <PermissionsGate scopes={item.permissions || []}>
          <NavLink exact to={item.absolute_path ?? '#'}
                   className={`flex px-4 py-2 !no-underline
                    hover:bg-gray-300 !hover:text-dark 
                    text-blue-600 dark:text-[#FB4685]
                    dark:hover:bg-gray-600
                    ${expanded ? '' : 'justify-center'}
                    ${open ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                   title={item.title}
          >
            {item.iconName && <FontAwesomeIcon icon={item.iconName} size={'sm'} color={darkMode ? 'white' : 'black'}/>}
            {expanded && <BaseText className={'ml-3 font-medium'} text={item.title}/>}
          </NavLink>
        </PermissionsGate>
      </>
    );
  }
};

export default SidebarItem;