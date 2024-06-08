import React from 'react';
import {isEmpty} from '../../../../Utils/utils';
import Button from '../../../common/button/Button';
import BaseView from '../../../common/base-view/BaseView';
import BaseText from '../../../common/base-text/BaseText';

export const SideBarTop = (props) => {
  const {settings} = props;

  return (
    <>
      <h3 className="mb-3 text-uppercase">
        <BaseView className="container-fluid">
          <BaseView className="flex">
            <BaseView className="columns-1">{settings.logo}</BaseView>
            <BaseView className="columns-1">{settings.integrationLogo}</BaseView>
            <BaseView className="columns-1 ml-auto"><BaseText text={settings.referenceCode} className={'text-lg'}/></BaseView>
          </BaseView>
          <BaseView className="columns-1 mt-3 flex-wrap">
            <h4 className="text-center">
              {settings.title}
            </h4>
          </BaseView>
        </BaseView>
        <BaseView className="text-center">
          <br/>
          {
            !isEmpty(settings.components) &&
            (
              settings.components.map((component, index) => {
                return (
                  <span key={index}>
                    {component.value}
                  </span>
                );
              })
            )
          }
          {
            !isEmpty(settings.buttons) &&
            (
              settings.buttons.map((button, index) => {
                return (
                  !button.hidden &&
                  <Button
                    label={button.title}
                    key={index}
                    name={button.name}
                    className={`mr-2 mb-2 ${button.className || ''}`}
                    onClick={button.onClick}
                    icon={button.icon}/>
                );
              })
            )}
        </BaseView>
      </h3>
      {
        !isEmpty(settings.infoLabels) &&
        settings.infoLabels.map((item, index) => {
          return (
            item.control && (
              <h3 key={index} className={`text-center mb-3 ${item.className ? item.className : ''}`}>
                {item.title}
              </h3>
            )
          );
        })
      }
    </>
  );
};
