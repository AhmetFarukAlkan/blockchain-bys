import React from "react";
import BaseModal from "../../common/base-modal/BaseModal";
import BaseView from "../../common/base-view/BaseView";
import ShowStudentTranscript from "../../pages/Student/ShowStudentTranscript";

const ShowStudentTranscriptModal = ({ props }) => {
  const { userId, departmentId } = props;

  const modalProps = {
    header: {
      title: `Transkript`,
      icon: "cross",
    },
    isCancellable: true,
    fullScreen: true,
    isTranscript: true,
  };

  return (
    <BaseModal {...modalProps} className={"transcript-modal"}>
      <BaseView className={"p-4"}>
        <ShowStudentTranscript userId={userId} departmentId={departmentId} />
      </BaseView>
    </BaseModal>
  );
};

export default ShowStudentTranscriptModal;
