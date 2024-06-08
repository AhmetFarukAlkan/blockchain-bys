import React from 'react';

const BaseView = (props) => {
  const {className} = props;

  return (
    <div {...props} className={className}>
      {props.children}
    </div>
  );
};

export default BaseView;
