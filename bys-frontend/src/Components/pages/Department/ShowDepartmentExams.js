import React from "react";
import BaseView from "../../common/base-view/BaseView";
import { useGetDepartmentExamsQuery } from "../../../Api/Services/DepartmentService/departmentService";
import ExamCard from "../../common/card/ExamCard";

const ShowDepartmentExams = (props) => {
  const { departmentId, year, semester } = props;

  const query = {
    year: year,
    semester: semester, 
  };

  const { data: exams } = useGetDepartmentExamsQuery({ id: departmentId, query: query});

  return (
    <BaseView>
      <BaseView className="grid grid-cols-2 gap-4 mt-4">
        {exams?.map((exam, key) => {
            return (
              <ExamCard key={key} exam={exam} departmentId={departmentId} editable={true}/>
            );
        })}
      </BaseView>
    </BaseView>
  );
};

export default ShowDepartmentExams;
