import React from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import { useUpdateOpenedCourseMutation } from "../../../Api/Services/CourseService/courseService";
import OpenedCourseForm from "../../_Shared/External/Course/OpenedCourseForm";
import { calculateSchedules } from "../../../Utils/utils";

const UpdateOpenedCourseModal = ({ props }) => {
  const { openedCourse, departmentId } = props;
  const form = useForm();
  const [updateCourse] = useUpdateOpenedCourseMutation();
  const { goBackModal } = useModalDispatcher();

  const handleCourse = (data) => {
    data.grading_rules = JSON.stringify(data.grading_rules);
    data.schedules = calculateSchedules(data.days, data.hours);
    data.departmentId = departmentId;
    updateCourse({ body: data, id: openedCourse.id })
      .unwrap()
      .then((r) => {
        Toastify({
          text: "Ders başarıyla güncellendi",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #37ecba, #72afd3)",
          stopOnFocus: true,
        }).showToast();
        goBackModal();
      });
  };

  const modalProps = {
    header: {
      title: `Ders Aç`,
      icon: "cross",
    },
    isCancellable: true,
    buttons: [
      {
        label: "Kaydet",
        onClick: form.handleSubmit(handleCourse),
        className:
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
      },
    ],
  };

  return (
    <BaseModal {...modalProps}>
      <OpenedCourseForm form={form} course={openedCourse} departmentId={departmentId}/>
    </BaseModal>
  );
};

export default UpdateOpenedCourseModal;
