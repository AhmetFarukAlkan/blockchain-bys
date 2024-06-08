import React, { useRef } from 'react';
import BaseViewWithRef from '../../common/base-view/BaseViewWithRef';

const CourseCommentContent = (props) => {
  const {comment} = props;
  const contentRef = useRef();

  return (
    <BaseViewWithRef ref={contentRef}>
      <p className={'mb-5 text-base text-gray-500 dark:text-gray-400'}
        dangerouslySetInnerHTML={{ __html: comment.body }}/>
    </BaseViewWithRef>
  );
};

export default CourseCommentContent;
