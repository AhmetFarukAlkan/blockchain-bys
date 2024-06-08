import React from 'react';
import DataTable from './DataTable';
import BaseView from '../../../common/base-view/BaseView';
import { twMerge } from 'tailwind-merge';
import BaseText from '../../../common/base-text/BaseText';

const WeeklyScheduleTable = (props) => {
  const {data} = props

  const cardClassName = twMerge(`
    w-full bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
  `)

  const showCell = (cells) => {
    return cells?.map((cell) => {
      return <BaseView className={cardClassName}>
               <BaseText text={cell?.code} className={'flex'}/>
               <BaseText text={cell?.name} className={'flex'}/>
               <BaseText text={cell?.location} className={'flex'}/>
             </BaseView>
    });
  }


  const columnClassName = '';

  const columns = [
    {
      field: "time",
      title: "Saatler",
    },
    {
      field: "monday",
      title: "Pazartesi",
      render: (rowData) => showCell(rowData.monday),
      className: columnClassName
    },
    {
      field: "tuesday",
      title: "Salı",
      render: (rowData) => showCell(rowData.tuesday),
      className: columnClassName
    },
    {
      field: "wednesday",
      title: "Çarşamba",
      render: (rowData) => showCell(rowData.wednesday),
      className: columnClassName
    },
    {
      field: "thursday",
      title: "Perşembe",
      render: (rowData) => showCell(rowData.thursday),
      className: columnClassName
    },
    {
      field: "friday",
      title: "Cuma",
      render: (rowData) => showCell(rowData.friday),
      className: columnClassName
    },
    {
      field: "saturday",
      title: "Cumartesi",
      render: (rowData) => showCell(rowData.saturday),
      className: columnClassName
    },
    {
      field: "sunday",
      title: "Pazar",
      render: (rowData) => showCell(rowData.sunday),
      className: columnClassName
    }
  ];

  return (
    <DataTable columns={columns} data={data || []}/>
  );
};

export default WeeklyScheduleTable;
