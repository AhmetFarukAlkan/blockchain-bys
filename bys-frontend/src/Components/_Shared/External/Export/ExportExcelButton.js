import React, {useState} from 'react';
import {excelExport} from '../../../../Utils/utils';
import LightButton from '../../../common/button/LightButton';
import SweetAlert from 'sweetalert2-react';
import useLoadingDispatcher from '../../../../Hooks/useLoadingDispatcher';
import { PERMISSIONS } from '../../../../Constants/permissionConstants';
import PermissionsGate from '../../../common/roles/PermissionsGate';

export const ExportExcelButton = (props) => {
  const {name, excelName, mediator, shouldDateFilter = true, className} = props;
  const [swTitle, setswTitle] = useState('');
  const [swText, setswText] = useState('');
  const [swShow, setswShow] = useState(false);
  const {increaseLoading, decreaseLoading} = useLoadingDispatcher();

  const onClick = async () => {
    let query = mediator.getFilterQuery();
    if (!shouldDateFilter || query.created_at_start || query.start || query.start_date || query.created_at || query.extension_payment_created_at || query.appointment_date) {
      try {
        increaseLoading();
        await excelExport(name, excelName, query); 
      } catch (error) {
        setswTitle('Hata Oluştu!');
        setswText('Excel çıktısı alırken bir hata oluştu.');
        setswShow(true);
      } finally {
        decreaseLoading(); 
      }
    } else {
      setswTitle('Hata Oluştu!');
      setswText('Çıktı almak için tarih aralığı girilmesi zorunludur.');
      setswShow(true);
    }
  };

  return (
    <PermissionsGate scopes={[PERMISSIONS.EXCEL_EXPORT]}>
      <SweetAlert
        show={swShow}
        title={swTitle}
        text={swText}
        onConfirm={() => setswShow(false)}
      />
      <LightButton className={className} label="Excel Çıktısı Al" icon="file-excel" onClick={() => onClick()}/>
    </PermissionsGate>
  );
};
