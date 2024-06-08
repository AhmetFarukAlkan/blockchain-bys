import React from "react";
import TextInput from "../../../common/form-elements/TextInput";
import BaseView from "../../../common/base-view/BaseView";
import NumericInput from "../../../common/form-elements/NumericInput";
import Select from '../../../common/form-elements/Select';
import { Semesters } from "../../../../Enum/Semesters";
import { CourseStatuses } from "../../../../Enum/CourseStatuses";
import DepartmentTeacherSelect from "../../../common/form-elements/DepartmentTeacherSelect";
import GradingRulesForm from "./GradingRulesForm";
import ScheludesInput from "../../../common/form-elements/ScheludesInput";
import YearSelect from "../../../common/form-elements/YearSelect";
import { getCurrentSemester, getCurrentYear } from "../../../../Utils/utils";
import SemesterSelect from "../../../common/form-elements/SemesterSelect";

const OpenedCourseForm = (props) => {
  const { course, departmentId, form } = props;

  return (
    <BaseView>
      <BaseView className="flex space-x-4 p-3">
        <BaseView className="w-1/2">
          <BaseView className={"grid grid-cols-1 gap-4 gap-y-2"}>
            <YearSelect
              label="Yıl" 
              form={form} 
              defaultValue={course?.year || getCurrentYear()}
            />
            <SemesterSelect
              label="Dönem"
              form={form}
              defaultValue={course?.semester || getCurrentSemester()}
            />
            <TextInput
              label="Lokasyonu"
              form={form}
              name="location"
              rules={{ required: "Lokasyon Zorunludur" }}
              defaultValue={course?.location}
            />
            {course &&
              <>
                <Select
                  label="Durumu"
                  form={form}
                  name="is_active"
                  options={CourseStatuses}
                  rules={{ required: "Durum Zorunludur" }}
                  defaultValue={course?.isActive}
                />
                <DepartmentTeacherSelect
                  label={"Öğretim Görevlisi"}
                  form={form}
                  name={"teacher_ids"}
                  departmentId={departmentId}
                  defaultValue={course?.teacherIds}
                  isMultiple
                />
              </>
            }
          </BaseView>
        </BaseView>
        <BaseView className="w-1/2">
          <GradingRulesForm form={form} gradingRules={course?.gradingRules}/>
        </BaseView>
      </BaseView>
      <BaseView className={"grid grid-cols-1 gap-4 gap-y-2"}>
        <ScheludesInput
          form={form}
          defaultValue={course?.schedules}
        />
      </BaseView>
    </BaseView>
  );
};

export default OpenedCourseForm;
