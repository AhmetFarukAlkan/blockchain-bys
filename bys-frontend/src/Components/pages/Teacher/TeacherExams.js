import React from 'react';
import BaseView from '../../common/base-view/BaseView';
import { useMain } from '../../../Hooks/useSlices';
import ShowTeacherExams from './ShowTeacherExams';
import { ROLE } from '../../../Constants/roleConstants';
import TeacherDepartmentSelect from '../../common/form-elements/TeacherDepartmentSelect';
import PermissionsGate from '../../common/roles/PermissionsGate';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import BaseText from '../../common/base-text/BaseText';
import { useForm } from 'react-hook-form';
import SemesterSelect from '../../common/form-elements/SemesterSelect';
import { getCurrentSemester, getCurrentYear } from '../../../Utils/utils';
import YearSelect from '../../common/form-elements/YearSelect';

const TeacherExams = (props) => {
  const { user } = useMain();
  const form = useForm();

  return (
    <PermissionsGate scopes={[ROLE.TEACHER] || []}>
      <BasePageWrapper text={'Verdiğim Derslerin Sınav Takvimi'}>
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
            <ShowTeacherExams
              departmentId={form.watch('department_id')} 
              year={form.watch('year')}
              semester={form.watch('semester')}
              user={user}
            />
              :
            <BaseText text={'Lütfen Bölüm Seçin'}/>
        }
      </BasePageWrapper>
    </PermissionsGate>
  );
};

export default TeacherExams;
