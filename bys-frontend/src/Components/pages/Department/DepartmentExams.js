import React, { useEffect } from "react";
import BaseView from "../../common/base-view/BaseView";
import ShowDepartmentExams from "./ShowDepartmentExams";
import { useForm } from "react-hook-form";
import SemesterSelect from "../../common/form-elements/SemesterSelect";
import YearSelect from "../../common/form-elements/YearSelect";
import { formSetter, getCurrentSemester, getCurrentYear } from "../../../Utils/utils";

const DepartmentExams = (props) => {
  const { departmentId } = props;
  const form = useForm();

  useEffect(() => {
    formSetter({ form, values: {
      year: getCurrentYear(),
      semester: getCurrentSemester()
    }});
  }, []);

  return (
    <BaseView>
      <BaseView className={'grid grid-cols-5 gap-4 mt-4'}>
        <YearSelect
          label="Yıl" 
          form={form} 
          isClearable={false} 
        />
        <SemesterSelect
          label="Dönem"
          form={form}
          isClearable={false} 
        />
      </BaseView>
      {
        departmentId && form.watch('year') && form.watch('semester') &&
          <ShowDepartmentExams 
            departmentId={departmentId}
            year={form.watch('year')}
            semester={form.watch('semester')}
          />
      }
    </BaseView>
  );
};

export default DepartmentExams;
