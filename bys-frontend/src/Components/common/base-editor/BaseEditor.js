import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import BaseView from "../base-view/BaseView";
import BaseLabel from "../base-label/BaseLabel";
import { isEmpty } from "../../../Utils/utils";

export const BaseEditor = (props) => {
  const {
    defaultValue = '',
    name,
    value,
    label,
    labelClassName,
    onChange,
    rules,
  } = props;

  const [tEditor, setTEditor] = useState();

  const isRequired = () => rules && JSON.stringify(rules).includes('"required"');
  const handleEditorChange = (editor) => onChange(editor);

  useEffect(() => {
    isEmpty(value) && tEditor?.editor?.setContent(value);
  }, [value]);

  return (
    <BaseView>
      {label && <BaseLabel text={label} isRequired={isRequired()} className={labelClassName} />}
        <Editor apiKey="ewfn5hvqo75w2kdlm3b0i034887zfytt6z8b9tesgnfbb1xx" initialValue={defaultValue} ref={(editor) => setTEditor(editor)} onInit={() => {}} name={name} init={{
          height: 400,
          menubar: true,
          language: 'tr',
          plugins: ['advlist autolink lists link image preview powerpaste', 'charmap print preview anchor help', 'searchreplace visualblocks code', 'insertdatetime media table paste wordcount', 'link'],
          toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | \
                                                      alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | \
                                                      forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons |\
                                                      fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | \
                                                      a11ycheck ltr rtl | showcomments addcomment',
        }}
          onEditorChange={onChange && handleEditorChange}
          content={tEditor?.current?.getContent()}
        />
    </BaseView>
  );
}
