import React from 'react';

const View = (props) => {

  const {
    className
  } = props;

  return (
    <>
      <div {...props} className={className}>
        {props.children}
      </div>
    </>
  );
};
export default View;