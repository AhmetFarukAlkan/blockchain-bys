import React, {useState, useRef} from 'react';
import {twMerge} from 'tailwind-merge';
import BaseView from '../base-view/BaseView';
import BaseViewWithRef from '../base-view/BaseViewWithRef';
import Button from '../button/Button';
import useOnClickHook from '../custom-hook/useOnClickHook';

const DropdownButton = (props) => {
  const {
    label,
    dropdownItems,
    buttonClassName,
    className,
    menuContainerClassName,
    itemClassName,
    icon,
    drop
  } = props;

  const classes = twMerge(`
    ${className || ''}
  `);

  const toggleMenuContainerClasses = twMerge(`
    relative dark:bg-gray-700
  `);

  const toggleMenuClasses = twMerge(`
    absolute py-2 text-xs text-gray-700 bg-gray-100 
    border rounded-lg shadow 
    ${drop === 'left' && 'right-20'}
    ${drop === 'right' && 'left-20'}
    -bottom-16 dark:text-gray-900
    ${menuContainerClassName || ''}
  `);

  const buttonClasses = twMerge(`
    justify-start
    ${buttonClassName || ''}
  `);

  const itemClasses = twMerge(`
    px-4 py-2 hover:bg-gray-300 
    dark:hover:bg-gray-600 dark:hover:text-white
    ${itemClassName || ''}
  `);

  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  useOnClickHook(ref, () => setToggle(false));

  const handleDropdown = () => setToggle(!toggle);

  const handleItemClick = (action) => {
    action && action();
    setToggle(false);
  };

  return (
    <BaseViewWithRef ref={ref} className={classes}>
        <Button
          label={label}
          onClick={handleDropdown}
          className={buttonClasses}
          icon={icon}
          aria-label="Open Dropdown"
        />
      {toggle && (
        <BaseView className={toggleMenuContainerClasses}>
          <ul
            className={toggleMenuClasses}
            role="listbox"
            aria-labelledby="dropdown-title"
          >
            {dropdownItems.map((item, index) => (
              <li key={index}>
                <Button label={item.label} onClick={() => handleItemClick(item.onClick)} className={itemClasses}/>
              </li>
            ))}
          </ul>
        </BaseView>
      )}
    </BaseViewWithRef>
  );
};

export default DropdownButton;
