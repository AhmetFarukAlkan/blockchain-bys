import React from 'react';
import PermissionsGate from '../../common/roles/PermissionsGate';
import { ROLE } from '../../../Constants/roleConstants';
import BaseTab from '../../common/base-tab/BaseTab';
import BaseView from '../../common/base-view/BaseView';
import BasePageWrapper from '../../common/base-page-wrapper/BasePageWrapper';
import { useGetFacultiesQuery } from '../../../Api/Services/FacultyService/facultyService';
import BaseParagraph from '../../common/base-paragraph/BaseParagraph';
import DepartmentTable from './DepartmentTable';

const Departments = () => {
  const { data: faculties } = useGetFacultiesQuery();

  return (
    <PermissionsGate scopes={[ROLE.ADMIN] || []}>
      <BasePageWrapper text={"Bölümler"}>
          {faculties ? 
            <BaseTab>
             {
              faculties.map((faculty, index) => {
                return (
                  <BaseView label={faculty.name}>
                    <DepartmentTable facultyId={faculty.id}/>
                  </BaseView>
                );
              })
             }
            </BaseTab>
            : 
            <BaseParagraph text={'Henüz Hiç Fakülte Yok'} />
          }
      </BasePageWrapper>
    </PermissionsGate>
  );
}

export default Departments;
