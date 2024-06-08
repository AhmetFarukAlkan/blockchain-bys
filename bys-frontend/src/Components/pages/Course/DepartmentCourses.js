import React, { useEffect, useState } from 'react';
import BaseView from '../../common/base-view/BaseView';
import Toastify from "toastify-js";
import { useGetDepartmentOpenedCoursesQuery } from '../../../Api/Services/DepartmentService/departmentService';
import GreenButton from '../../common/button/GreenButton';
import { Mediator } from '../../_Shared/External/Mediators/TableMediator';
import RedButton from '../../common/button/RedButton';
import Table from '../../_Shared/External/Table/Table';
import BaseText from '../../common/base-text/BaseText';
import { isEmpty, parseTimeStringToObject } from '../../../Utils/utils';
import SelectedCoursesSummary from './SelectedCoursesSummary';
import { useMain } from '../../../Hooks/useSlices';
import { useGetStudentCoursesQuery, useSelectCourseMutation } from '../../../Api/Services/UserService/userService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { URL } from '../../../Constants/urlConstants';
import { getStudentCourseStatusKey } from '../../../Enum/StudentCourseStatuses';

const DepartmentCourses = (props) => {
  const { departmentId } = props;

  const { user } = useMain();
  const history = useHistory();
  const coursesMediator = new Mediator();
  const selectedCoursesMediator = new Mediator();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCoursesInfo, setSelectedCoursesInfo] = useState({
    courseNumber: 0,
    totalCredit: 0,
    totalCourseHourse: 0,
  });

  const {data: courses, isLoading} = useGetDepartmentOpenedCoursesQuery({id: departmentId, query:{is_active: 1}});
  const { data: studentCourses } = useGetStudentCoursesQuery({ id: user.id, query:{departmentId: departmentId}});
  const [selectCourse] = useSelectCourseMutation();

  const handleCourseSelection = () => {
    const filteredCourses = selectedCourses.filter(course => !course.hasOwnProperty('studentStatus'));
    const ids = filteredCourses.map(course => course.id);    

    if (isEmpty(ids)) {
      Toastify({
        text: "En az bir ders seçmelisiniz!",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #9d0f07, #9d0f07)",
        stopOnFocus: true,
      }).showToast();
      return ;
    }

    selectCourse({ id: user.id, body: {course_ids: ids, departmentId: departmentId} })
      .unwrap()
      .then((r) => {
        Toastify({
          text: "Danışman onayına gönderildi.",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #37ecba, #72afd3)",
          stopOnFocus: true,
        }).showToast();
        history.push({pathname: URL.HOME});
      });
  };

  const coursesColumns = [
    {
      title: "İşlemler",
      className: "flex justify-start",
      render: (rowData) => (
        <GreenButton
          icon={"plus"}
          onClick={() => selectCourseHandle(rowData)}
          label={"Ekle"}
        />
      ),
    },
    {
      field: "id",
      title: "Id",
      hide: true,
    },
    {
      field: "name",
      title: "Adı",
    },
    {
      field: "code",
      title: "Kodu",
    },
    {
      field: "capacity",
      title: "Max Kapasite",
    },
    {
      field: "credit",
      title: "Kredi",
    },
    {
      field: "schedules",
      title: "Saati",
      render: rowData => parseTimeStringToObject(rowData.schedules)?.length
    }
  ];

  const selectedCoursesColumns = [
    {
      title: "İşlemler",
      className: "flex justify-start",
      render: (rowData) => (
        !rowData.studentStatus ?
          <RedButton
            icon={"minus"}
            onClick={() => removeCourseHandle(rowData)}
            label={"Çıkar"}
          /> : ''
      ),
    },
    {
      field: "id",
      title: "Id",
      hide: true,
    },
    {
      field: "name",
      title: "Adı",
    },
    {
      field: "code",
      title: "Kodu",
    },
    {
      field: "capacity",
      title: "Max Kapasite",
    },
    {
      field: "credit",
      title: "Kredi",
    },
    {
      field: "schedules",
      title: "Saati",
      render: rowData => parseTimeStringToObject(rowData.schedules)?.length
    },
    {
      field: "studentStatus",
      title: "Durumu",
      render: rowData => getStudentCourseStatusKey(rowData.studentStatus, 'label')
    }
  ];

  const removeCourseHandle = (row) => {
    coursesMediator.addRowData(row);
    setSelectedCourses(selectedCourses.filter(course => course.id !== row.id));

    setSelectedCoursesInfo(prevInfo => ({
      courseNumber: prevInfo.courseNumber - 1,
      totalCredit: prevInfo.totalCredit - row.credit,
      totalCourseHourse: prevInfo.totalCourseHourse - parseTimeStringToObject(row.schedules)?.length
    }));
  }

  const selectCourseHandle = (row) => {
    setSelectedCourses([...selectedCourses, row]);
    coursesMediator.removeRowData(row);

    setSelectedCoursesInfo(prevInfo => ({
      courseNumber: prevInfo.courseNumber + 1,
      totalCredit: prevInfo.totalCredit + row.credit,
      totalCourseHourse: prevInfo.totalCourseHourse + parseTimeStringToObject(row.schedules)?.length
    }));
  }

  const hide = {
    totalItems: true,
    seach: true,
    paginate: true,
  }

  const filteredCourses = courses?.filter(course => {
    return !selectedCourses.find(selectedCourse => selectedCourse.id === course.id);
  });

  useEffect(() => {
    if (studentCourses) {
      const updatedSelectedCourses = [...selectedCourses];
      studentCourses.forEach(course => {
        const existingCourseIndex = updatedSelectedCourses.findIndex(selectedCourse => selectedCourse.id === course.id);
        if (existingCourseIndex === -1) {
          updatedSelectedCourses.push(course);
        }
      });
      setSelectedCourses(updatedSelectedCourses);

      let totalCredit = 0;
      let totalCourseHourse = 0;
      updatedSelectedCourses.forEach(course => {
        totalCredit += course.credit;
        totalCourseHourse += parseTimeStringToObject(course.schedules)?.length || 0;
      });

      setSelectedCoursesInfo({
        courseNumber: updatedSelectedCourses.length,
        totalCredit,
        totalCourseHourse,
      });
    }
  }, [studentCourses]);

  return (
    <BaseView className={'mt-4'}>
      <h4 className="pageHeader"><BaseText text={'Açılan Dersler'}/></h4>
      {!isLoading && (
        <Table 
          columns={coursesColumns}
          incomingData={filteredCourses}
          hide={hide}
          mediator={coursesMediator}
        />
      )}
      <h4 className="pageHeader mt-4"><BaseText text={'Seçilen Dersler'}/></h4>
      <GreenButton
        icon={"check"}
        onClick={() => handleCourseSelection()}
        label={"Danışman Onayına Gönder"}
      />
      <Table
        columns={selectedCoursesColumns}
        incomingData={selectedCourses}
        hide={hide}
        mediator={selectedCoursesMediator}
      />
      <BaseView>
        <BaseView className={'flex justify-end mt-4'}>
          <SelectedCoursesSummary info={selectedCoursesInfo}/>
        </BaseView>
      </BaseView>
    </BaseView>
  );
}

export default DepartmentCourses;
