import React from "react";
import BaseView from "../../common/base-view/BaseView";
import { useMain } from "../../../Hooks/useSlices";
import { useGetStudentCoursesQuery } from "../../../Api/Services/UserService/userService";
import CourseCard from "../../common/card/CourseCard";
import BaseText from "../../common/base-text/BaseText";
import { isEmpty } from "../../../Utils/utils";

const ShowStudentCourses = (props) => {
  const { user, departmentId } = props;

  const { data: studentCourses } = useGetStudentCoursesQuery({ id: user.id, query: {departmentId: departmentId}});

  return (
    <BaseView className="grid grid-cols-3 gap-4 mt-4">
      {
        !isEmpty(studentCourses) ?
          studentCourses?.map((course, key) => {
            return (
              <CourseCard
                key={key}
                course={course}
              />
            );
          }) : <BaseText text={'Henüz Bir Derse Kayıt Olmamışsınız'}/> 
      }
    </BaseView>
  );
};

export default ShowStudentCourses;
