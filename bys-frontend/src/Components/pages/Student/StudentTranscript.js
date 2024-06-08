import React from 'react';
import BaseView from '../../common/base-view/BaseView';
import { useForm } from 'react-hook-form';
import { useMain } from '../../../Hooks/useSlices';
import StudentDepartmentSelect from '../../common/form-elements/StudentDepartmentSelect';
import BaseText from '../../common/base-text/BaseText';
import ShowStudentTranscript from './ShowStudentTranscript';

const StudentTranscript = (props) => {
  const {user} = useMain();
  const form = useForm();

  return (
    <BaseView className={'p-4'}>
        <BaseView className="grid grid-cols-5 gap-2 mt-3">
          <StudentDepartmentSelect form={form} label={'Bölümler'} userId={user.id}/>
        </BaseView>
        {
          form.watch('department_id') ? 
            <ShowStudentTranscript
              userId={user.id} 
              departmentId={form.watch('department_id')}
            />
          :
            <BaseText text={'Lütfen Bölüm Seçin'}/>
        }
    </BaseView>
  );
};

export default StudentTranscript;
