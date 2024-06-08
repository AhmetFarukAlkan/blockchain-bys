import React from 'react';
import BaseView from '../../common/base-view/BaseView';
import { useForm } from 'react-hook-form';
import { useMain } from '../../../Hooks/useSlices';
import BaseText from '../../common/base-text/BaseText';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import PermissionsGate from '../../common/roles/PermissionsGate';
import { ROLE } from '../../../Constants/roleConstants';
import TeacherDepartmentSelect from '../../common/form-elements/TeacherDepartmentSelect';
import ShowTeacherWeeklySchedule from './ShowTeacherWeeklySchedule';
import YearSelect from '../../common/form-elements/YearSelect';
import SemesterSelect from '../../common/form-elements/SemesterSelect';
import { getCurrentSemester, getCurrentYear } from '../../../Utils/utils';

const TeacherWeeklySchedule = (props) => {
  const {user} = useMain();
  const form = useForm();

  return (
    <PermissionsGate scopes={[ROLE.TEACHER] || []}>
      <BasePageWrapper text={'Haftalık Ders Programı'} className={'p-4'}>
          <BaseView className="grid grid-cols-5 gap-2 mt-3">
            <TeacherDepartmentSelect 
              form={form} 
              label={'Bölümler'} 
              userId={user.id}
            />
            <YearSelect
              label="Yıl" 
              form={form} 
              defaultValue={getCurrentYear()}
              isClearable={false} 
            />
            <SemesterSelect
              label="Dönem"
              form={form}
              defaultValue={getCurrentSemester()}
              isClearable={false} 
            />
          </BaseView>
          {
            form.watch('department_id') ? 
              <ShowTeacherWeeklySchedule
                userId={user.id} 
                departmentId={form.watch('department_id')}
                year={form.watch('year')}
                semester={form.watch('semester')}  
              />
            :
              <BaseText text={'Lütfen Bölüm Seçin'}/>
          }
      </BasePageWrapper>
    </PermissionsGate>
  );
};

export default TeacherWeeklySchedule;
