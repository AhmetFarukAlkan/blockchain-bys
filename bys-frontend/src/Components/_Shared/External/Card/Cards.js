import React from 'react';
import {isEmpty} from '../../../../Utils/utils';
import BaseView from '../../../common/base-view/BaseView';
import Card from './Card';

const Cards = (props) => {
  const {fields, className, children} = props;

  return (
    !isEmpty(fields) && fields.map((field, index) => {
      return (
        <Card key={index}
              {...field}
              className={className || ''}
        >
          {children}
        </Card>
      );
    })

  );
};

export default Cards;
