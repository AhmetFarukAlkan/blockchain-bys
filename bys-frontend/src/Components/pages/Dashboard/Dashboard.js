import React from "react";
import BaseView from "../../common/base-view/BaseView";
import { ROLE } from "../../../Constants/roleConstants";
import PermissionsGate from "../../common/roles/PermissionsGate";
import StudentCourses from "./StudentCourses";
import TeacherCourses from "./TeacherCourses";
import UserList from "../User/UserList";
import { useGetCourseSelectionActivityQuery, useToggleCourseSelectionActivityMutation } from "../../../Api/Services/CourseService/courseService";
import RedButton from "../../common/button/RedButton";
import GreenButton from "../../common/button/GreenButton";
import Toastify from 'toastify-js';

const Dashboard = () => {
  const { data: activity } = useGetCourseSelectionActivityQuery();
  const [toggleCourseSelectionActivity] = useToggleCourseSelectionActivityMutation();

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

  return (
    <BaseView>
      <PermissionsGate scopes={[ROLE.ADMIN] || []}>
        <BaseView className={'flex justify-end mr-6'}>
          {
            activity === true ? 
              <RedButton label={'Ders Seçimleri Kapat'}  onClick={() => toggleActivity()}/>
            :
              <GreenButton label={'Ders Seçimlerini Aç'}  onClick={() => toggleActivity()}/>
          }
        </BaseView>
        <UserList/>
      </PermissionsGate>
      <PermissionsGate scopes={[ROLE.STUDENT] || []}>
        <StudentCourses/>
      </PermissionsGate>
      <PermissionsGate scopes={[ROLE.TEACHER] || []}>
        <TeacherCourses/>
      </PermissionsGate>
    </BaseView>
  );
};

export default Dashboard;
