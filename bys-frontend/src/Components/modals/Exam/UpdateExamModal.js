import React, { useEffect } from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import { useForm } from "react-hook-form";
import useModalDispatcher from "../../../Hooks/useModalDispatcher";
import Toastify from "toastify-js";
import { useUpdateExamMutation } from "../../../Api/Services/ExamService/examService";
import ExamForm from "../../_Shared/External/Exam/ExamForm";
import { dateTimeToUnixTimeStamp, formSetter, formatDate, getFormattedDate, getFormattedDateTrTime } from "../../../Utils/utils";
import moment from "moment";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

const UpdateExamModal = ({ props }) => {
  const { exam, departmentId } = props;
  Moment.locale("tr");
  momentLocalizer();
  const form = useForm();
  const [updateExam] = useUpdateExamMutation();
  const { goBackModal } = useModalDispatcher();

  const handleExam = (data) => {
    data.departmentId = departmentId;
    data.startTime = dateTimeToUnixTimeStamp(moment(data.start_date.startDate + ' ' + data.start_time).format('MM.DD.YYYY HH:mm'));
    data.endTime = dateTimeToUnixTimeStamp(moment(data.end_date.startDate + ' ' + data.end_time).format('MM.DD.YYYY HH:mm'));
    updateExam({id: exam.id, body: data })
      .unwrap()
      .then((r) => {
        Toastify({
          text: "Sınav başarıyla güncellendi",
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
      title: `Sınavı Düzenle`,
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

  useEffect(() => {
    const start_date = getFormattedDate(formatDate(getFormattedDateTrTime(exam?.startTime)));
    const end_date = getFormattedDate(formatDate(getFormattedDateTrTime(exam?.endTime)));;

    formSetter({ form, values: {
        examType: exam?.examType,
        location: exam?.location,
        start_date: {
            startDate: start_date,
            endDate: start_date
        },
        start_time: moment(getFormattedDateTrTime(exam?.startTime), 'DD.MM.YYYY HH:mm').format('HH:mm'),
        end_date: {
            startDate: end_date,
            endDate: end_date
        },
        end_time: moment(getFormattedDateTrTime(exam?.endTime), 'DD.MM.YYYY HH:mm').format('HH:mm')
    }});
  }, [exam]);

  return (
    <BaseModal {...modalProps}>
      <ExamForm form={form} />
    </BaseModal>
  );
};

export default UpdateExamModal;
