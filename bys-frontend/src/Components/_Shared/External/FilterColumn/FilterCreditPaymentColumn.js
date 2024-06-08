import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {useForm} from 'react-hook-form';
import {deleteObjectKeys} from '../../../../Utils/utils';
import BaseView from '../../../common/base-view/BaseView';
import GreenButton from '../../../common/button/GreenButton';
import RedButton from '../../../common/button/RedButton';
import BaseDateRangePicker from '../../../common/form-elements/BaseDateRangePicker';

const FilterCreditPaymentColumn = (props) => {
  const {mediator} = props;
  const defaultValues = {created_at: ''};
  const form = useForm({defaultValues});

  const clearFilter = () => {
    let formValues = form.getValues();
    form.reset();
    let clearedFilter = mediator.getFilterQuery();
    deleteObjectKeys(clearedFilter, Object.keys(formValues));
    mediator.setFilterQuery(clearedFilter);
  };

  const onSubmit = (data) => {
    mediator.setFilterQuery(data);
  };

  return (
    <BaseView>
      <BaseView className="grid grid-cols-5 gap-4">
        <BaseDateRangePicker label="Oluşturma Tarihi:" form={form} name="created_at"/>
      </BaseView>
      <BaseView className={'flex justify-end !mt-4'}>
        <GreenButton
          className={'!mr-2'}
          label="Filtrele"
          icon="search"
          isKeyHandler={true}
          onClick={form.handleSubmit(onSubmit)}
        />
        <RedButton
          label="Temizle"
          icon="trash"
          onClick={clearFilter}
        />
      </BaseView>
    </BaseView>
  );
};

export default FilterCreditPaymentColumn;
