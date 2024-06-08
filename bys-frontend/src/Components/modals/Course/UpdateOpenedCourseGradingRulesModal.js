import React from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import GradingRulesForm from "../../_Shared/External/Course/GradingRulesForm";
import { useUpdateOpenedCourseGradingRulesMutation } from "../../../Api/Services/CourseService/courseService";

const UpdateOpenedCourseGradingRulesModal = ({ props }) => {
  const { openedCourse, departmentId } = props;
  const form = useForm();
  const [updateOpenedCourseGradingRule] = useUpdateOpenedCourseGradingRulesMutation();
  const { goBackModal } = useModalDispatcher();

  const handleCourse = (data) => {
    data.grading_rules = JSON.stringify(data.grading_rules);
    data.departmentId = departmentId;
    updateOpenedCourseGradingRule({ body: data, id: openedCourse.id })
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
      title: `Harf Notu Aralığı Belirle`,
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
      <GradingRulesForm form={form} gradingRules={openedCourse?.gradingRules}/>
    </BaseModal>
  );
};

export default UpdateOpenedCourseGradingRulesModal;
