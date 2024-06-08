import React from 'react';
import BaseView from '../../common/base-view/BaseView';
import { useMain } from '../../../Hooks/useSlices';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { useForm } from 'react-hook-form';
import StudentDepartmentSelect from '../../common/form-elements/StudentDepartmentSelect';
import BaseText from '../../common/base-text/BaseText';
import StudentCourses from './StudentCourses';
import YearSelect from '../../common/form-elements/YearSelect';
import { getCurrentSemester, getCurrentYear } from '../../../Utils/utils';
import SemesterSelect from '../../common/form-elements/SemesterSelect';

const StudentAcademicInfos = (props) => {
  const { user } = useMain();
  const form = useForm();

  return (
    <PermissionsGate scopes={[ROLE.STUDENT] || []}>
      <BasePageWrapper text={'Aldığım Dersler'}>
        <BaseView className="grid grid-cols-5 gap-2 mt-3">
          <StudentDepartmentSelect 
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
            <StudentCourses 
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

export default StudentAcademicInfos;
