import React from "react";
import TextInput from "../../../common/form-elements/TextInput";
import BaseView from "../../../common/base-view/BaseView";
import NumericInput from "../../../common/form-elements/NumericInput";
import Select from '../../../common/form-elements/Select';
import { CourseStatuses } from "../../../../Enum/CourseStatuses";

const CourseForm = (props) => {
  const { course, form } = props;

  return (
    <BaseView className={"grid grid-cols-1 gap-4 gap-y-2"}>
      <TextInput
        label="Adı"
        form={form}
        name="name"
        rules={{ required: "Ad Zorunludur" }}
        defaultValue={course?.name}
      />
      <TextInput
        label="Dersin Kodu"
        form={form}
        name="code"
        rules={{ required: "Kode Zorunludur" }}
        defaultValue={course?.code}
      />
      <NumericInput
        label="Kredi" 
        form={form} 
        name="credit" 
        rules={{ required: "Kredi Zorunludur" }}
        defaultValue={course?.credit}
      />
      <NumericInput
        label="Kapasite" 
        form={form} 
        name="capacity" 
        rules={{ required: "Kapasite Zorunludur" }}
        defaultValue={course?.capacity}
      />
    </BaseView>
  );
};

export default CourseForm;
