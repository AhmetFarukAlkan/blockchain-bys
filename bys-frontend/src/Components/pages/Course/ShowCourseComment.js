import React from 'react';
import BaseCard from '../../common/base-card/BaseCard';
import BaseView from '../../common/base-view/BaseView';
import {  getFormattedDateTrTime } from '../../../Utils/utils';
import CourseCommentContent from './CourseCommentContent';
import BaseParagraph from '../../common/base-paragraph/BaseParagraph';

const ShowCourseComment = (props) => {
  const {comment, courseId} = props;

  return (
    <BaseCard className={'p-2 sm:p-4 !mt-4'}>
      <BaseView className={'flex justify-between !mb-2'}>
        <BaseParagraph className={'text-xl mb-0'} text={comment.user_name}/>
         <BaseView>
            <span className={'text-gray-500 dark:text-gray-400'}>
              {getFormattedDateTrTime(comment.created_at)}
            </span>
         </BaseView>
      </BaseView>
      <CourseCommentContent comment={comment}/>
    </BaseCard>
  );
};

export default ShowCourseComment;
