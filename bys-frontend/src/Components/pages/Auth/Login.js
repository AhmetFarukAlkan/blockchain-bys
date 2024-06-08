import React, {useState} from 'react';
import {Form, Button, Alert, Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {ACCESS_TOKEN} from '../../../common/constants/local.storage.constants';
import {useAppDispatch} from '../../../Hooks/useRedux';
import Http from '../../../Http';
import {setUser} from '../../../redux/slices/mainSlice';
import {URL} from '../../../Constants/urlConstants';
import BaseView from '../../common/base-view/BaseView';
import { useMain } from '../../../Hooks/useSlices';
import marmaraLogo from '../../../Assets/Img/marmara_university_logo.svg.png';
import marmaraLightLogo from '../../../Assets/Img/marmara_university_logo_light.svg - Kopya.png';
import kulliye from '../../../Assets/Img//kulliye.jpg';
import BaseCard from '../../common/base-card/BaseCard';
import GreenButton from '../../common/button/GreenButton';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import BaseText from '../../common/base-text/BaseText';

function Login() {
  const {preferences: { isDarkMode }} = useMain();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  let history = useHistory();
  const dispatch = useAppDispatch();

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setError(false);

    event.preventDefault();

    Http.post('login', {email: email, password: password})
      .then((res) => {
        Http.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
        localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
        dispatch(setUser(res.data));

        setTimeout(() => {
          localStorage.removeItem(ACCESS_TOKEN);
          dispatch(setUser(null));
          Http.defaults.headers.common.Authorization = '';
          history.push(URL.LOGIN);
        }, 3600000);

        history.push(URL.HOME);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        }
      });
  };

  return (
      <BaseView className="flex justify-center" style={{backgroundImage: `url(${kulliye})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <BaseView className="h-screen flex items-center">
          <BaseCard className={'bg-white p-8'}>
            <BaseView className={'mb-2'}>
              <Image src={marmaraLogo} width={'360'}/>
            </BaseView>
            <Form className="" noValidate validated={validated} onSubmit={handleSubmit}>
              <BaseText text={'Giriş Yap'} className={'font-bold mb-4'}/>
              {
                error ?
                <Alert key="danger" variant="danger">{error}</Alert>
                      : ''
              }
              <Form.Group controlId="validationCustom01">
                <Form.Label><BaseText text={'E-Posta:'}/></Form.Label>
                <Form.Control
                  onChange={onChangeEmail}
                  required
                  type="email"
                />
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label><BaseText text={'Şifre:'}/></Form.Label>
                <Form.Control
                  required
                  onChange={onChangePassword}
                  type="password"
                />
              </Form.Group>
              <Button type="submit">Giriş Yap</Button>
              <Link to={URL.REGISTER} className={'ml-4'}>
                <GreenButton label={'Kayıt Ol'} className="whitespace-nowrap"/>
              </Link>
            </Form>
          </BaseCard>
        </BaseView>
      </BaseView>
  );
}

export default Login;
