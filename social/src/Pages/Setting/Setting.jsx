import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter'
import TopBar from '../../Components/TopBar/TopBar'
import AuthContext from '../../Context/AuthContext'
import LoaderContext from '../../Context/LoaderContext'
import './Setting.scss'

const Setting = () => {

  // use navigate
  const navigate = useNavigate()

  // use context
  const { loader_dispatch } = useContext(LoaderContext)
  const { dispatch } = useContext(AuthContext)

  const setting_menu = (e) => {
    document.querySelectorAll('.btn').forEach(item => {
      item.classList.remove('active')
    })

    e.target.classList.add('active')
  }

  //Log out 
  const Log_out = (e) => {
    e.preventDefault()
    loader_dispatch({ type: 'LOADER_START' });
    Cookies.remove('token')
    dispatch({ type: 'LOGOUT_USER' })
    navigate('/')

  }

  return (

    <>
      <div className='topbar'>
        <TopBar />
      </div>

      <div className="setting-container">
        <div className="setting-wraper">
          <div className="setting-menu">
            <ul>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/edit_profile'}>Edit profile</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/professional_account'}>Professional account</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/change_password'}>Change Password</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/app_and_website'}>Apps and websites</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/email_notifications'}>Email notifications</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/push_notifications'}>Push notifications</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/manage_contacts'}>Manage contacts</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/privacy_and_security'}>Privacy and security</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/login_activity'}>Login activity</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/email_from_instagram'}>Emails from Instagram</Link>
              </li>
              <li>
                <Link className='btn' onClick={setting_menu} to={'/setting/help'}>Help</Link>
              </li>
              <li>
                <a className='logout-btn' onClick={Log_out}>Switch account</a>
              </li>
            </ul>
          </div>
          <div className="setting-outlet">
            <Outlet />
          </div>
        </div>
      </div>

      <LoginRegisterFooter />

    </>

  )
}

export default Setting