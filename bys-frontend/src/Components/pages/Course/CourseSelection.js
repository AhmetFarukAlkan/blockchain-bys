import React, { useEffect } from 'react';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { ROLE } from '../../../Constants/roleConstants';
import PermissionsGate from '../../common/roles/PermissionsGate';
import StudentDepartmentSelect from '../../common/form-elements/StudentDepartmentSelect';
import { useForm } from 'react-hook-form';
import { useMain } from '../../../Hooks/useSlices';
import BaseView from '../../common/base-view/BaseView';
import DepartmentCourses from './DepartmentCourses';
import BaseText from '../../common/base-text/BaseText';
import { useGetCourseSelectionActivityQuery, useToggleCourseSelectionActivityMutation } from '../../../Api/Services/CourseService/courseService';
import RedBadge from '../../common/base-badge/RedBadge';
import RedButton from '../../common/button/RedButton';
import GreenButton from '../../common/button/GreenButton';
import Toastify from 'toastify-js';
import { useLazyGetUserDepartmentActivityQuery } from '../../../Api/Services/UserService/userService';

const CourseSelection = (props) => {
  const { user } = useMain();
  const form = useForm();

  const { data: activity } = useGetCourseSelectionActivityQuery();
  const [toggleCourseSelectionActivity] = useToggleCourseSelectionActivityMutation();
  const [getUserDepartmentActivity, { data: userDepartmentActivity }] = useLazyGetUserDepartmentActivityQuery();

  const toggleActivity = () => {
    toggleCourseSelectionActivity().then(response => {
      Toastify({
        text: `Ders Seçme Dönemi ${activity === true ? 'Kapatıldı' : 'Açıldı'}`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: true
      }).showToast();
    });
  };

  useEffect(() => {
    form.watch('department_id') &&
      getUserDepartmentActivity({id: user.id, query: {departmentId: form.watch('department_id')}});
  }, [form.watch('department_id')]);  

  return (
    <>
      <PermissionsGate scopes={[ROLE.ADMIN] || []}>
        <BaseView className={'p-6'}>
          {
            activity === true ? 
              <RedButton label={'Ders Seçimleri Kapat'}  onClick={() => toggleActivity()}/>
            :
              <GreenButton label={'Ders Seçimlerini Aç'}  onClick={() => toggleActivity()}/>
          }
        </BaseView>
      </PermissionsGate>
      <PermissionsGate scopes={[ROLE.STUDENT] || []}>
        <BasePageWrapper text={'Ders Seçimi'}>
          <BaseView className="grid grid-cols-5 gap-2 mt-3">
            <StudentDepartmentSelect form={form} label={'Bölümler'} userId={user.id}/>
          </BaseView>
          {
            activity == true ?
            form.watch('department_id') ? 
              userDepartmentActivity?.isActive === 1 ? 
                <DepartmentCourses departmentId={form.watch('department_id')}/> 
                  :
                <RedBadge label={'Bu bölümde bu işlemi yapamazsınız'} className={'mt-4'}/>
                :
              <BaseText text={'Lütfen Bölüm Seçin'}/>
            : 
            <RedBadge label={'Ders Seçme Döneminde Değilsiniz'} className={'mt-4'}/>
          }
        </BasePageWrapper>
      </PermissionsGate>
    </>
  );
}

export default CourseSelection;

