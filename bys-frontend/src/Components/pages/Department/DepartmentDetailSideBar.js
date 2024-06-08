import React from 'react';
import NumberFormat from 'react-number-format';
import SideBar from '../../_Shared/External/SideBar/SideBar';
import { getDegreeLevelKey } from '../../../Enum/DegreeLevels';

const DepartmentDetailSideBar = (props) => {
  const {departmentDetail, departmentId} = props;

  const sideInfoBarInputs = {
    sideBarTop: {
      title: departmentDetail?.name,
    },
    sideBarBody: [
      {
        title: 'Id',
        value: departmentId,
      },
      {
        title: 'Fakülte Adı',
        value: departmentDetail?.facultyName,
      },
      {
        title: 'Derecesi',
        value: getDegreeLevelKey(departmentDetail?.degree_level, 'label'),
      },
      {
        title: 'Telefon',
        value: (
          <NumberFormat
            value={departmentDetail?.phoneNumber}
            displayType={'text'}
            format="+## (###) ### ##-##"
          />
        )
      },
      {
        title: 'E-Mail',
        value: departmentDetail?.email
      },
      {
        title: 'Lokasyon',
        value: departmentDetail?.location
      }
    ]
  };

  return (
    <SideBar sideBarTop={sideInfoBarInputs.sideBarTop}
             sideBarBody={sideInfoBarInputs.sideBarBody}
             className="text-sm">
    </SideBar>
  );
}

export default DepartmentDetailSideBar;
