import React from 'react';
import { useForm } from 'react-hook-form';
import Toastify from 'toastify-js';
import BaseCard from '../../common/base-card/BaseCard';
import BaseView from '../../common/base-view/BaseView';
import CourseCommentForm from './CourseCommentForm';
import { useCreateCourseCommentMutation, useGetCourseCommentsQuery } from '../../../Api/Services/CourseService/courseService';
import { useMain } from '../../../Hooks/useSlices';
import ShowCourseComment from './ShowCourseComment';
import BaseParagraph from '../../common/base-paragraph/BaseParagraph';

const QuickSupportComments = (props) => {
  const {
    courseId
  } = props;

  const defaultValues = {
    body: "",
  }

  const {user} = useMain();
  const form = useForm({ defaultValues });
  const { data: comments } = useGetCourseCommentsQuery({ id: courseId });
  const [createComment] = useCreateCourseCommentMutation();

  const handleCreateComment = (data) => {
    data.userId = user.id
    createComment({ id: courseId, body: data }).then(r => {
      Toastify({
        text: 'Yorum başarılı bir şekilde eklendi',
        duration: 2000,
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)'
      });

      form.reset();
    });
  };

  return (
    <BaseView className={'!mt-4'}>
      <BaseCard className={'p-2 sm:p-4 !mt-6'}>
        <CourseCommentForm title={'Yorum'} form={form}
          onSubmit={form.handleSubmit(handleCreateComment)} />
      </BaseCard>

      {comments
        ? comments.map((comment, index) => {
          return (
            <ShowCourseComment comment={comment} courseId={courseId} key={index} />
          );
        })
        : <BaseParagraph text={'Henüz hiç yorum yapılmamış'} />
      }
    </BaseView>
  );

}
  ;

export default QuickSupportComments;
