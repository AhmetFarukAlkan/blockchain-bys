import React, { useEffect, useState } from 'react';
import DaySelect from './DaySelect';
import HourSelect from './HourSelect';
import BaseView from '../base-view/BaseView';
import RedButton from '../button/RedButton';
import GreenButton from '../button/GreenButton';

const SchedulesInput = (props) => {
  const { form, defaultValue } = props;
  const initialScheduleCount = defaultValue ? JSON.parse(defaultValue).length : 1;
  const [schedules, setSchedules] = useState(Array.from({ length: initialScheduleCount }, (_, index) => ({ id: index + 1 })));

  const addSchedule = () => {
    const newScheduleId = schedules[schedules.length - 1].id + 1;
    setSchedules([...schedules, { id: newScheduleId }]);
  };

  const removeSchedule = (scheduleIdToRemove) => {
    if (schedules.length === 1) {
      return;
    }

    setSchedules(schedules.filter(schedule => schedule.id !== scheduleIdToRemove));
  };

  useEffect(() => {
    if (defaultValue) {
      const parsedValues = JSON.parse(defaultValue);
      parsedValues.forEach((value, index) => {
        const scheduleIndex = schedules?.findIndex(schedule => schedule.id === index + 1);
        if (scheduleIndex !== -1) {
          form.setValue(`days[${index + 1}]`, value.day);
          form.setValue(`hours[${index + 1}]`, value.hours);
        }
      });
    }
  }, [defaultValue, schedules]);

  return (
    <>
      <GreenButton label={'Ders Saati Ekle'} icon={'plus'} onClick={addSchedule}/>
      {schedules.map((schedule, index) => (
        <BaseView key={schedule.id} className={'grid grid-cols-7 space-x-4'}>
          <DaySelect form={form} name={`days[${schedule.id}]`} className={'col-span-3'}/>
          <HourSelect form={form} name={`hours[${schedule.id}]`} className={'col-span-3'}/>
          <RedButton icon={'minus'} onClick={() => removeSchedule(schedule.id)} className={'col-span-1'}/>
        </BaseView>
      ))}
    </>
  );
};

export default SchedulesInput;
