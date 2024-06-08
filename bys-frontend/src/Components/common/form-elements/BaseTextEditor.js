import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import BaseLabel from '../base-label/BaseLabel';
import BaseView from '../base-view/BaseView';

const BaseTextEditor = (props) => {
  const {
    name,
    label,
    onChange,
    labelClassName,
    value,
    rules,
  } = props;

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');
  const handleEditorChange = (editor) => onChange(editor);

  return (
    <BaseView>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName}/>}
      <Editor
        name={name}
        apiKey="ewfn5hvqo75w2kdlm3b0i034887zfytt6z8b9tesgnfbb1xx"
        init={{height: 300}}
        content={value}
        onEditorChange={handleEditorChange}
      />
    </BaseView>
  );
}

export default BaseTextEditor;
