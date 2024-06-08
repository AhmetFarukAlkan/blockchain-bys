import React from "react";
import BasePageWrapper from "../../common/base-page-wrapper/BasePageWrapper";
import BaseView from "../../common/base-view/BaseView";
import { useMain } from "../../../Hooks/useSlices";
import BaseText from "../../common/base-text/BaseText";
import PermissionsGate from "../../common/roles/PermissionsGate";
import { ROLE } from "../../../Constants/roleConstants";
import StudentDepartmentSelect from "../../common/form-elements/StudentDepartmentSelect";
import { useForm } from 'react-hook-form';
import ShowStudentCourses from "./ShowStudentCourses";

const StudentCourses = () => {
  const { user } = useMain();
  const form = useForm();

  return (
    <PermissionsGate scopes={[ROLE.STUDENT] || []}>
      <BasePageWrapper text={'Aldığım Dersler'}>
        <BaseView className="grid grid-cols-5 gap-2 mt-3">
          <StudentDepartmentSelect form={form} label={'Bölümler'} userId={user.id}/>
        </BaseView>
        {
          form.watch('department_id') ? 
            <ShowStudentCourses departmentId={form.watch('department_id')} user={user}/>
              :
            <BaseText text={'Lütfen Bölüm Seçin'}/>
        }
      </BasePageWrapper>
    </PermissionsGate>
  );
};

export default StudentCourses;
