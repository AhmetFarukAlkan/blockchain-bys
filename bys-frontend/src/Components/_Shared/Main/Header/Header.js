import React, {useState} from 'react';
import {Navbar, NavDropdown, Image, Form} from 'react-bootstrap';
import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import marmaraLogo from '../../../../Assets/Img/marmara_university_logo.svg.png';
import marmaraLightLogo from '../../../../Assets/Img/marmara_university_logo_light.svg - Kopya.png';
import {ACCESS_TOKEN} from '../../../../common/constants/local.storage.constants';
import {URL} from '../../../../Constants/urlConstants';
import {useMain} from '../../../../Hooks/useSlices';
import Http from '../../../../Http';
import {Menu} from '../../../../Data/SideBar/SideBarMenu';
import {setUser} from '../../../../redux/slices/mainSlice';
import BaseView from '../../../common/base-view/BaseView';
import DarkModeButton from './DarkModeButton';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseText from '../../../common/base-text/BaseText';

function Header(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const {user} = useMain();
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const {preferences: { isDarkMode }} = useMain();

  const flatten = (items) => {
    const flat = [];
    items.forEach(item => {

      if (item.children && item.children.length) {
        flat.push(...flatten(item.children));
      } else {
        flat.push(item);
      }
    });
    return flat;
  };
  const menuItems = flatten(Menu);

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : menuItems.filter(item =>
      item.title.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onSuggestionsFetchRequested = ({value}) => {
    setSuggestions(getSuggestions(value));
  };

  const renderSuggestion = suggestion => (
    <div>
      <Link to={suggestion.absolute_path} onClick={(e) => {
        e.preventDefault();
        history.push(suggestion.absolute_path);
      }}>
        {suggestion.title}
      </Link>
    </div>
  );

  const onChange = (event, {newValue}) => {
    setValue(newValue);
  };

  const logout = event => {

    event.preventDefault();

    Http.post('logout')
      .then((res) => {
        dispatch(setUser(undefined));
        localStorage.removeItem(ACCESS_TOKEN);
        history.push(URL.LOGIN);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header className={'w-full bg-[#f8fafc] dark:bg-gray-900'}>
        <Navbar className="flex w-full !justify-between items-center">
          <BaseView className={'flex flex-row'}>
            <Navbar.Brand className="text-white">
              <Link to={URL.HOME}><Image src={isDarkMode ? marmaraLightLogo : marmaraLogo} width={'160'}/></Link>
            </Navbar.Brand>
          </BaseView>
          <BaseView className={'flex flex-row !text-gray-700 !dark:text-white'}>
            <DarkModeButton/>
            <NavDropdown title={user?.email} className="ml-4 mr-4 header-dropdown" id={'userDropDown'}>
              <NavDropdown.Item onClick={logout}>
                <FontAwesomeIcon icon="sign-out-alt" className="navIcon ml-2"/>
                <BaseText text={'Çıkış Yap'}/>
              </NavDropdown.Item>
            </NavDropdown>
          </BaseView>
        </Navbar>
      </header>
      <hr className="m-0 border-gray-200 dark:border-gray-700"/>
    </>
  );
}

export default Header;
