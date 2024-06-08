import React from 'react';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import { useMain } from '../../../Hooks/useSlices';
import Table from '../../_Shared/External/Table/Table';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';
import TeacherDepartmentSelect from '../../common/form-elements/TeacherDepartmentSelect';
import ShowGivenCourses from './ShowGivenCourses';
import BaseView from '../../common/base-view/BaseView';
import BaseText from '../../common/base-text/BaseText';
import { useForm } from 'react-hook-form';
import YearSelect from '../../common/form-elements/YearSelect';
import { getCurrentSemester, getCurrentYear } from '../../../Utils/utils';
import SemesterSelect from '../../common/form-elements/SemesterSelect';

const GivenCourses = (props) => {
  const {user} = useMain();
  const form = useForm();

  return (
    <PermissionsGate scopes={[ROLE.TEACHER] || []}>
      <BasePageWrapper text={'Verilen Dersler'}>
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
            <ShowGivenCourses 
              departmentId={form.watch('department_id')} 
              user={user}
              year={form.watch('year')}
              semester={form.watch('semester')}  
            />
              :
            <BaseText text={'Lütfen Bölüm Seçin'}/>
        }
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default GivenCourses;

