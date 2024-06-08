import React, {createElement} from 'react';
import {Route, Switch} from 'react-router-dom';
import Footer from '../../Components/_Shared/Main/Footer/Footer';
import Header from '../../Components/_Shared/Main/Header/Header';
import SideMenu from '../../Components/_Shared/Main/Header/SideMenu';
import BaseView from '../../Components/common/base-view/BaseView';
import useSideMenu from '../../Hooks/useSideMenu';
import mainRoute from '../../Routes/MainRoute';

const MainLayout = () => {
  const {expandedStatus} = useSideMenu();

  return (
    <>
      <Header/>
      <BaseView className={'flex flex-row'}>
        <SideMenu/>
        <BaseView className={`w-[${expandedStatus ? '85%' : '95%'}] bg-gray-100 dark:bg-gray-900`}>
          <BaseView className={`p-4`}>
            <Switch>
              {mainRoute.map((item, index) => {
                return (
                  <Route path={item.path}
                         exact={item.exact}
                         key={item.path}
                         render={(componentProps) => createElement(item.component, componentProps)}
                  />
                );
              })
              }
            </Switch>
          </BaseView>
          <Footer/>
        </BaseView>
      </BaseView>
    </>);
};

export default MainLayout;
