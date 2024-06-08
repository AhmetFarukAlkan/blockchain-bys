import React from 'react';
import BaseView from '../base-view/BaseView';
import BaseText from '../base-text/BaseText';
import { getFormattedDateTrTime } from '../../../Utils/utils';
import { getExamTypeKey } from '../../../Enum/ExamTypes';
import BaseBadge from '../base-badge/BaseBadge';
import BaseButton from '../button/BaseButton';
import useModalDispatcher from '../../../Hooks/useModalDispatcher';

const ExamCard = (props) => {
  const { exam, editable = false, departmentId } = props;
  const { openModal } = useModalDispatcher();

  const openUpdateExamModal = () => {
    openModal({
        name: 'UpdateExamModal',
        props: {exam, departmentId}
    });
  };

  return (
    <BaseView>
      <BaseView className="mx-auto h-full bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-md shadow-md relative">
        <BaseView className={'flex justify-end'}>
          {editable &&
            <BaseButton
              className="p-1 ml-2 bg-transparent border border-green-400 text-green-400 text-sm rounded-lg hover:ring-2"
              icon="edit"
              onClick={() => openUpdateExamModal()}
            />
          }
        </BaseView>
        <BaseView className="flex flex-col justify-between h-full pb-4">
          <BaseText text={`${exam?.courseName} - ${exam?.code}`} className="text-sm font-bold text-gray-600 dark:text-gray-600" />
          <BaseText text={`Başlangıç Tarihi: ${getFormattedDateTrTime(exam?.startTime)}`} className="text-sm font-bold mt-2 text-gray-600 dark:text-gray-600" />
          <BaseText text={`Bitiş Tarihi:  ${getFormattedDateTrTime(exam?.endTime)}`} className="text-sm font-bold text-gray-600 dark:text-gray-600" />
          <BaseText text={`Konumu:  ${exam?.location}`} className="text-sm font-bold mt-2 text-gray-600 dark:text-gray-600" />
          <BaseView className="flex items-center justify-end">
              <BaseBadge className={'mb-2 mr-2'} label={`${getExamTypeKey(exam?.examType, 'label')} Sınavı`} color={getExamTypeKey(exam?.examType, 'color')}/>
          </BaseView>
        </BaseView>
      </BaseView>
    </BaseView>
  );
};

export default ExamCard;
