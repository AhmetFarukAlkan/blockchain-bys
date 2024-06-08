import React, { useEffect } from "react";
import TextInput from "../../../common/form-elements/TextInput";
import BaseView from "../../../common/base-view/BaseView";
import { ExamTypes } from "../../../../Enum/ExamTypes";
import Select from "../../../common/form-elements/Select";
import BaseDateRangePicker from "../../../common/form-elements/BaseDateRangePicker";
import TimeInput from "../../../common/form-elements/TimeInput";
import { dateTimeToUnixTimeStamp } from "../../../../Utils/utils";
import moment from "moment";

const ExamForm = (props) => {
  const { exam, form } = props;

  const startTime = dateTimeToUnixTimeStamp(moment(form.watch('start_date')?.startDate + ' ' + form.watch('start_time')).format('MM.DD.YYYY HH:mm'));
  const endTime = dateTimeToUnixTimeStamp(moment(form.watch('end_date')?.startDate + ' ' + form.watch('end_time')).format('MM.DD.YYYY HH:mm'));

  return (
    <BaseView className={"grid grid-cols-1 gap-4 gap-y-2"}>
      <Select
        label="Sınav Tipi"
        form={form}
        name="examType"
        options={ExamTypes}
        rules={{ required: "Sınav Tipi Zorunludur" }}
        defaultValue={exam?.examType}
      />
      <BaseView className="grid grid-cols-4 gap-4">
          <BaseDateRangePicker label={'Sınavın Başlama Tarihi'} className="col-span-2" form={form} name="start_date" rules={{required: 'Başlama Tarihi Zorunludur'}} asSingle/>
          <TimeInput label={'Sınavın Başlama Saati'} className="col-span-2" form={form} name="start_time" rules={{required: 'Başlama Saati Zorunludur'}} />
      </BaseView>
      <BaseView className="grid grid-cols-4 gap-4">
          <BaseDateRangePicker label={'Sınavın Bitiş Tarihi'} className="col-span-2" form={form} name="end_date" rules={{required: 'Bitiş Tarihi Zorunludur'}} asSingle/>
          <TimeInput label={'Sınavın Bitiş Saati'} className="col-span-2" form={form} name="end_time" rules={{required: 'Bitiş Saati Zorunludur'}} />
      </BaseView>
      <TextInput
        label="Lokasyonu"
        form={form}
        name="location"
        rules={{ required: "Lokasyon Zorunludur" }}
        defaultValue={exam?.location}
      />
    </BaseView>
  );
};

export default ExamForm;
