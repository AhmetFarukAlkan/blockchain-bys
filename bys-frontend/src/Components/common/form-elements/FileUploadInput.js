import {ErrorMessage} from '@hookform/error-message';
import React from 'react';
import {Controller} from 'react-hook-form';
import {FilePond, registerPlugin} from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import BaseText from '../base-text/BaseText';
import BaseView from '../base-view/BaseView';
registerPlugin(FilePondPluginImagePreview)

const FileUploadInput = (props) => {
  const {
    form,
    name,
    className,
    rules,
    defaultValue,
    allowMultiple,
    allowImageCrop,
    allowImageTransform,
    allowImagePreview
  } = props;

  return (
    <BaseView className={className}>
      <Controller
        control={form.control}
        {...props}
        rules={rules}
        defaultValue={defaultValue ?? []}
        render={({onChange, onBlur, value, ref}) => (
          <FilePond
            files={value}
            allowMultiple={allowMultiple}
            allowImageCrop={allowImageCrop}
            allowImageTransform={allowImageTransform}
            imageCropAspectRatio={"1:1"}
            onupdatefiles={onChange}
            allowImagePreview={allowImagePreview}
            ref={ref}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        )}
      />

      <ErrorMessage
        errors={form.formState.errors}
        name={name}
        render={({ message }) => <BaseText className={'mt-2 text-xs text-red-600 dark:text-red-400'} text={message} />}
      />
    </BaseView>
  );
};

export default FileUploadInput;
