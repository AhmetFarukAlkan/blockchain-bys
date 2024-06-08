import React from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import { useCreateExamMutation } from "../../../Api/Services/ExamService/examService";
import ExamForm from "../../_Shared/External/Exam/ExamForm";
import { dateTimeToUnixTimeStamp } from "../../../Utils/utils";
import moment from "moment";

const AddExamModal = ({ props }) => {
  const { courseId, departmentId } = props;
  const form = useForm();
  const [createExam] = useCreateExamMutation();
  const { goBackModal } = useModalDispatcher();

  const handleExam = (data) => {
    data.courseId = courseId;
    data.departmentId = departmentId;
    data.startTime = dateTimeToUnixTimeStamp(moment(data.start_date.startDate + ' ' + data.start_time).format('MM.DD.YYYY HH:mm'));
    data.endTime = dateTimeToUnixTimeStamp(moment(data.end_date.startDate + ' ' + data.end_time).format('MM.DD.YYYY HH:mm'));

    if (data.startTime > data.endTime) {
      Toastify({
        text: "Bitiş tarihi başlangıç tarihinden sonra olmalı !",
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

    createExam({ body: data })
      .unwrap()
      .then((r) => {
        Toastify({
          text: "Sınav başarıyla eklendi",
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
      title: `Sınav Ekle`,
      icon: "cross",
    },
    isCancellable: true,
    buttons: [
      {
        label: "Kaydet",
        onClick: form.handleSubmit(handleExam),
        className:
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
      },
    ],
  };

  return (
    <BaseModal {...modalProps}>
      <ExamForm form={form} />
    </BaseModal>
  );
};

export default AddExamModal;