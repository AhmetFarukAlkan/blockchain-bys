import React from 'react';
import {Image} from 'react-bootstrap';
import BaseView from '../../common/base-view/BaseView';
import { useMain } from '../../../Hooks/useSlices';
import marmaraLogo from '../../../Assets/Img/marmara_university_logo.svg.png';
import marmaraLightLogo from '../../../Assets/Img/marmara_university_logo_light.svg - Kopya.png';
import kulliye from '../../../Assets/Img//kulliye.jpg';
import BaseCard from '../../common/base-card/BaseCard';
import { useForm } from 'react-hook-form';
import TextInput from '../../common/form-elements/TextInput';
import BaseText from '../../common/base-text/BaseText';
import EmailInput from '../../common/form-elements/EmailInput';
import PasswordInput from '../../common/form-elements/PasswordInput';
import DefaultButton from '../../common/button/DefaultButton';
import { useRegisterMutation } from '../../../Api/Services/AuthService/authService';
import Toastify from 'toastify-js';
import { URL } from '../../../Constants/urlConstants';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import GreenButton from '../../common/button/GreenButton';

const Register = () => {
  const form = useForm();
  let history = useHistory();
  const {preferences: { isDarkMode }} = useMain();

  const [register] = useRegisterMutation();

  const handleSubmit = (data) => {
    if (data.password !== data.password_confirmation) {
      Toastify({
        text: 'Şifreler Uyuşmuyor',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: true
      }).showToast();
      return;
    }

    register({body: data}).then(r => {
      Toastify({
        text: 'Başarıyla Kayıt Olundu',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
        stopOnFocus: true
      }).showToast();
      history.push({ pathname: URL.LOGIN })
    });
  };

  return (
      <BaseView className="flex justify-center" style={{backgroundImage: `url(${kulliye})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <BaseView className="h-screen flex items-center">
          <BaseCard className={'bg-white p-8'}>
            <BaseView className={'mb-2'}>
              <Image src={marmaraLogo} width={'360'}/>
            </BaseView>
            <BaseView className={'mt-4'}>
              <BaseText text={'Kayıt Ol'} className={'font-bold mb-4'}/>
                <BaseView className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Adı"
                    form={form}
                    name="name"
                    rules={{ required: "Ad Zorunludur" }}
                  />
                  <TextInput
                    label="Soyad"
                    form={form}
                    name="surname"
                    rules={{ required: "Soyad Zorunludur" }}
                  />
                  <EmailInput
                    label="E-Mail"
                    form={form}
                    name="mail"
                    rules={{ required: "Mail Zorunludur" }}
                  />
                  <TextInput
                    label="Telefon Numarası"
                    form={form}
                    name="phone"
                    rules={{ required: "Telefon Numarası Zorunludur" }}
                  />
                  <PasswordInput 
                    label={'Şifre'} 
                    form={form} 
                    name={'password'}
                    rules={{ required: "Şifre Zorunludur" }}
                  />
                  <PasswordInput
                    label={'Şifre Tekrar'} 
                    form={form} 
                    name={'password_confirmation'}
                    rules={{ required: "Şifre Zorunludur" }}
                  />
                </BaseView>
                <BaseView>
                  <DefaultButton 
                    label={'Kaydol'} 
                    className={'mt-6'}
                    onClick={form.handleSubmit(handleSubmit)}
                  />
                  <Link to={URL.LOGIN} className={'ml-4'}>
                    <GreenButton label={'Giriş Yap'} className="whitespace-nowrap"/>
                  </Link>
                </BaseView>
              </BaseView>
            </BaseCard>
        </BaseView>
      </BaseView>
  );
}

export default Register;
