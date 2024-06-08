import React from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import CourseForm from "../../_Shared/External/Course/CourseForm";
import { useCreateCourseMutation } from "../../../Api/Services/CourseService/courseService";

const AddCourseModal = ({ props }) => {
  const { refetch } = props;
  const form = useForm();
  const [createCourse] = useCreateCourseMutation();
  const { goBackModal } = useModalDispatcher();

  const handleCourse = (data) => {
    data.departmentId = props.departmentId;
    createCourse({ body: data })
      .unwrap()
      .then((r) => {
        Toastify({
          text: "Ders başarıyla eklendi",
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
      title: `Ders Ekle`,
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
      <CourseForm form={form} />
    </BaseModal>
  );
};

export default AddCourseModal;
