import React from 'react';
import PermissionsGate from '../../common/roles/PermissionsGate';
import { ROLE } from '../../../Constants/roleConstants';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { useGetDepartmentQuery } from '../../../Api/Services/DepartmentService/departmentService';
import DepartmentDetailSideBar from './DepartmentDetailSideBar';
import BaseView from '../../common/base-view/BaseView';
import BaseCard from '../../common/base-card/BaseCard';
import BaseText from '../../common/base-text/BaseText';
import BaseTab from '../../common/base-tab/BaseTab';
import BasePageHeading from '../../common/base-headings/BasePageHeading';
import DepartmentCourses from './DepartmentCourses';
import DepartmentOpenedCourses from './DepartmentOpenedCourses';
import DepartmentTeachers from './DepartmentTeachers';
import DepartmentStudents from './DepartmentStudents';
import DepartmentExams from './DepartmentExams';

const DepartmentDetail = (props) => {
  const params = props.match.params.id;

  const { data: department } = useGetDepartmentQuery({ id: params });

  return (
    <PermissionsGate scopes={[ROLE.ADMIN] || []}>
      <BasePageWrapper text={"Bölüm Detayı"}>
        <BaseView className="grid grid-cols-4 gap-6">
          <BaseView className="col-span-1">
            <DepartmentDetailSideBar departmentDetail={department} departmentId={params}/>
          </BaseView>
          <BaseView className="col-span-3">
            <BaseCard className={'p-6'}>
              <BasePageHeading text={'Bölüm Hakkında Bilgiler'}/>
              <BaseTab>
                <BaseView label={'Dersler'}>
                  <DepartmentCourses departmentId={params}/>
                </BaseView>
                <BaseView label={'Açılan Dersler'}>
                  <BaseTab>
                    <BaseView label={'Aktif Dersler'}>
                      <DepartmentOpenedCourses departmentId={params} isActive={1}/>
                    </BaseView>
                    <BaseView label={'Pasif Dersler'}>
                      <DepartmentOpenedCourses departmentId={params} isActive={0}/>
                    </BaseView>
                  </BaseTab>
                </BaseView>
                <BaseView label={'Sınavlar'}>
                  <DepartmentExams departmentId={params}/>
                </BaseView>
                <BaseView label={'Öğretim Üyeleri'}>
                  <DepartmentTeachers departmentId={params}/>
                </BaseView>
                <BaseView label={'Öğrenciler'}>
                  <BaseTab>
                    <BaseView label={'Aktif Öğrenciler'}>
                      <DepartmentStudents departmentId={params} isActive={1}/>
                    </BaseView>
                    <BaseView label={'Pasif Öğrenciler'}>
                      <DepartmentStudents departmentId={params} isActive={0}/>
                    </BaseView>
                  </BaseTab>
                </BaseView>
              </BaseTab>
            </BaseCard>
          </BaseView>
        </BaseView>
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default DepartmentDetail;
