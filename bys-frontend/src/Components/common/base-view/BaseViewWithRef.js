import React, {forwardRef} from 'react';

const BaseViewWithRef = forwardRef((props, ref) => {
  const {className} = props;

  return (
    <div {...props} className={className} ref={ref}>
      {props.children}
    </div>
  );
});

export default BaseViewWithRef;