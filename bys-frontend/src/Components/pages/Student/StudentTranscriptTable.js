import React from 'react';
import { getAbstenceStatusKey } from '../../../Enum/AbstenceStatuses';
import BaseView from '../../common/base-view/BaseView';
import { ListGroupView } from '../../_Shared/External/ListGroup/ListGroupView';
import { calculateInfo } from '../../../Utils/utils';
import BaseCard from '../../common/base-card/BaseCard';
import DataTable from '../../_Shared/External/Table/DataTable';
import { round } from '../../../Utils/mathUtil';

const StudentTranscriptTable = (props) => {
  const {courses} = props;

  const columns = [
    {
      field: "code",
      title: "Kodu",
    },
    {
      field: "name",
      title: "Dersin Adı",
    },
    {
      field: "credit",
      title: "Kredi",
    },
    {
      field: "absentee",
      title: "Devam Durumu",
      render: rowData => getAbstenceStatusKey(rowData.absentee, 'label'),
    },
    {
      field: "letterGrade",
      title: "Harf Notu",
      render: rowData => rowData.letterGrade ? rowData.letterGrade.toUpperCase() : '',
    },
  ];

  const info = calculateInfo(courses);

  const selectedCoursesInfo = [
    {
      title: 'Dönem Kredisi',
      value: info.totalCredit
    },
    {
      title: 'YANO',
      value: info.yano ? round(info.yano, 2) : ''
    }
  ];

  return (
    <BaseView>
      <DataTable
        columns={columns}
        data={courses || []}
        overflowX={false}
      />
      <BaseView>
        <BaseView className={'flex justify-end mt-4'}>
        <BaseView>
          <BaseCard className={'!pr-5 !pl-5'}>
            <ListGroupView items={selectedCoursesInfo} classNameItem={'dark:text-white !py-1'}/>
          </BaseCard>
        </BaseView>
        </BaseView>
      </BaseView>
    </BaseView>
  );
};

export default StudentTranscriptTable;
