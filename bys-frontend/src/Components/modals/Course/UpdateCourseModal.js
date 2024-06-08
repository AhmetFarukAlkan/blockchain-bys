import React from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import CourseForm from "../../_Shared/External/Course/CourseForm";
import { useUpdateCourseMutation } from "../../../Api/Services/CourseService/courseService";

const UpdateCourseModal = ({props}) => {
  const {course, refetch, departmentId} = props;
  const form = useForm();
  const [updateCourse] = useUpdateCourseMutation();
  const { goBackModal } = useModalDispatcher();

  const handleCourse = (data) => {
    data.departmentId = departmentId;
    updateCourse({id: course.id, body: data})
      .unwrap()
      .then((r) => {
        Toastify({
          text: "Ders Başarıyla Güncellendi",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #37ecba, #72afd3)",
          stopOnFocus: true,
        }).showToast();
        refetch();
        goBackModal();
      });
  };

  const modalProps = {
    header: {
      title: `Dersi Güncelle`,
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
      <CourseForm form={form} course={course}/>
    </BaseModal>
  );
};

export default UpdateCourseModal;
