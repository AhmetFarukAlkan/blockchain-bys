import React from 'react';
import BaseView from '../../../common/base-view/BaseView';
import BaseBoxContainer from '../../../common/base-box-container/BaseBoxContainer';
import {ListGroupView} from '../ListGroup/ListGroupView';
import {SideBarTop} from './SideBarTop';

const SideBar = (props) => {
  const {sideBarTop, sideBarBody, children, classNameListGroup} = props;

  return (
    <BaseBoxContainer {...props}>
      <SideBarTop settings={sideBarTop}/>
      <BaseView>
        <ListGroupView items={sideBarBody} className={classNameListGroup}/>
      </BaseView>
      {children}
    </BaseBoxContainer>
  );
};

export default SideBar;
