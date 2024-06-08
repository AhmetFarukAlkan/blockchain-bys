import React from 'react';
import OutlineGreen from '../../common/button/OutlineGreen';
import BaseView from '../../common/base-view/BaseView';
import TextAreaInput from '../../common/form-elements/TextAreaInput';

const CourseCommentForm = (props) => {
  const {form, title, onSubmit, body} = props;

  return (
    <BaseView>
      {title && <h5 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h5>}

      <TextAreaInput label="Yorum" className={'mb-4'} form={form} name="body" rules={{required: 'Bu alan zorunludur.'}} defaultValue={body}/>

      <BaseView className={'text-right'}>
        <OutlineGreen icon={'paper-plane'} label={'Yorum Ekle'} onClick={onSubmit}/>
      </BaseView>
    </BaseView>
  );
};

export default CourseCommentForm;
