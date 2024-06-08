import React from 'react';
import TextInput from '../../../common/form-elements/TextInput';
import BaseView from '../../../common/base-view/BaseView';

const FacultyForm = (props) => {
  const {faculty, form} = props;

  return (
    <BaseView className={'grid grid-cols-1 gap-4 gap-y-2'}>
      <TextInput label="Adı" form={form} name="name" rules={{required: 'Ad Zorunludur'}} defaultValue={faculty?.name}/>
      <TextInput label="E-Mail" form={form} name="email" rules={{required: 'E-Mail Zorunludur'}} defaultValue={faculty?.email}/>
      <TextInput label="Telefon" form={form} name="phone_number" rules={{required: 'Telefon Numarası Zorunludur'}} defaultValue={faculty?.phone_number}/>
      <TextInput label="Lokasyon" form={form} name="location" rules={{required: 'Lokasyon Zorunludur'}} defaultValue={faculty?.location}/>
    </BaseView>
  );
}

export default FacultyForm;
