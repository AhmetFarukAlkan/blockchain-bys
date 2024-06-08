import React from 'react';
import BaseCard from '../../common/base-card/BaseCard';
import { ListGroupView } from '../../_Shared/External/ListGroup/ListGroupView';
import BaseView from '../../common/base-view/BaseView';

const SelectedCoursesSummary = (props) => {
  const { info } = props;
  const selectedCoursesInfo = [
    {
      title: 'Toplam Ders Sayısı',
      value: info.courseNumber
    },
    {
      title: 'Toplam Kredi',
      value: info.totalCredit
    },
    {
      title: 'Toplam Ders Saati',
      value: info.totalCourseHourse
    }
  ];

  return (
    <BaseView>
      <BaseCard className={'!pr-5 !pl-5'}>
        <ListGroupView items={selectedCoursesInfo} classNameItem={'dark:text-white !py-1'}/>
      </BaseCard>
    </BaseView>
  );
};

export default SelectedCoursesSummary;
