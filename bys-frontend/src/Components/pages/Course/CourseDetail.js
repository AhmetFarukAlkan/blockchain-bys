import React from 'react';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import CourseCard from '../../common/card/CourseCard';
import { useGetCourseQuery, useGetOpenedCourseDetailQuery } from '../../../Api/Services/CourseService/courseService';
import QuickSupportComments from './CourseComments';

const CourseDetail = (props) => {
  const params = props.match.params.id;
  const {data: course, isLoading} = useGetOpenedCourseDetailQuery({id: params});

  return (
    <BasePageWrapper>
      {!isLoading &&
          <CourseCard course={course}/>
      }
      <QuickSupportComments courseId={params}/>
    </BasePageWrapper>
  );
}

export default CourseDetail;

