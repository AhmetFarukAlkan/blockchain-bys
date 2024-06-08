import React from 'react';
import BaseView from '../../common/base-view/BaseView';
import { useGetStudentTranscriptQuery, useGetUserQuery } from '../../../Api/Services/UserService/userService';
import StudentTranscriptTable from './StudentTranscriptTable';
import BaseText from '../../common/base-text/BaseText';
import { ListGroupView } from '../../_Shared/External/ListGroup/ListGroupView';
import { useGetDepartmentQuery } from '../../../Api/Services/DepartmentService/departmentService';
import BaseCard from '../../common/base-card/BaseCard';
import marmaraLogo from '../../../Assets/Img/marmara_university_logo.svg.png';
import marmaraLightLogo from '../../../Assets/Img/marmara_university_logo_light.svg - Kopya.png';
import { Image } from 'react-bootstrap';
import { useMain } from '../../../Hooks/useSlices';
import { getDegreeLevelKey } from '../../../Enum/DegreeLevels';
import { round } from '../../../Utils/mathUtil';

const ShowStudentTranscript = (props) => {
  const {userId, departmentId} = props;
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const {preferences: { isDarkMode }} = useMain();

  const { data: data } = useGetStudentTranscriptQuery({ id: userId, query: {departmentId: departmentId}});
  const { data: user } = useGetUserQuery({ id: userId });
  const { data: department } = useGetDepartmentQuery({ id: departmentId });
  
  const listStudentInfoCol = [
    {
        title: 'Ad Soyad',
        value: user?.name + ' ' + user?.surname
    },
    {
      title: 'Number',
      value: user?.number
    },
  ];

  const listDepartmentInfoCol = [
    {
      title: 'Fakülte Adı',
      value: department?.facultyName,
    },
    {
      title: 'Bölüm Adı',
      value: department?.name
    }
  ];

  const totalSummary = [
    {
      title: 'Toplam Kredi',
      value: data?.summary?.totalCredit
    },
    {
      title: 'GANO',
      value: data?.summary?.gano ? round(data.summary?.gano, 2) : ''
    }
  ];

  return (
    <BaseView className={'p-4'}>
      <BaseView>
        <Image src={isDarkMode ? marmaraLightLogo : marmaraLogo} width={'200'}/>
        <BaseView className={'text-center dark:text-white'}>
          <h3>T.C.</h3>
          <h3>MARMARA ÜNİVERSİTESİ</h3>
          <h3>BAŞARI DURUM BELGESİ</h3>
        </BaseView>
        <BaseText text={`${getDegreeLevelKey(department?.degree_level, 'label')} Derecesi`}/>
        <BaseText className={'flex justify-end'} text={`Tarih: ${formattedDate}`}/>
        <BaseView className="flex space-x-4">
            <BaseView className="w-1/2">
                <ListGroupView items={listStudentInfoCol} classNameItem={'dark:text-white'}/>
            </BaseView>
            <BaseView className="w-1/2">
                <ListGroupView items={listDepartmentInfoCol} classNameItem={'dark:text-white'}/>
            </BaseView>
        </BaseView>
        <BaseView>
          <BaseView className={'flex justify-end mt-4'}>
          <BaseView>
            <BaseCard className={'!pr-5 !pl-5'}>
              <ListGroupView items={totalSummary} classNameItem={'dark:text-white !py-1'}/>
            </BaseCard>
          </BaseView>
          </BaseView>
        </BaseView>
        {data && Object.entries(data?.transcript).map(([semester, courses]) => (
          <BaseView key={semester} className={'mt-4 dark:text-white'}>
            <h5>{semester}</h5>
            <StudentTranscriptTable courses={courses}/>
          </BaseView>
        ))}
      </BaseView>
    </BaseView>
  );
};

export default ShowStudentTranscript;
