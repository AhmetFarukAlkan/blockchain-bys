import React from "react";
import BasePageWrapper from "../../common/base-page-wrapper/BasePageWrapper";
import BaseView from "../../common/base-view/BaseView";
import { useMain } from "../../../Hooks/useSlices";
import { useGetTeacherCoursesQuery } from "../../../Api/Services/UserService/userService";
import CourseCard from "../../common/card/CourseCard";
import BaseText from "../../common/base-text/BaseText";
import { isEmpty } from "../../../Utils/utils";

const ShowTeacherCourses = (props) => {
  const { user, departmentId } = props;

  const { data: teachetCourses } = useGetTeacherCoursesQuery({ id: user.id, query: {departmentId: departmentId} });

  return (
    <BaseView className="grid grid-cols-3 gap-4 mt-4">
      {
        !isEmpty(teachetCourses) ?
          teachetCourses?.map((course, key) => {
            return (
              <CourseCard
                key={key}
                course={course}
              />
            );
          }) : <BaseText text={'Henüz Bir Ders Vermiyorsunuz'}/> 
      }
    </BaseView>
  );
};

export default ShowTeacherCourses;
