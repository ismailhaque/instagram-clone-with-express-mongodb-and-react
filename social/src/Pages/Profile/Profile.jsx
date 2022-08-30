import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsGrid3X3Gap, BsBookmark } from 'react-icons/bs'
import { RiContactsBook2Line } from 'react-icons/ri'
import { Link, Outlet } from 'react-router-dom'
import LoginRegisterFooter from '../../Components/LoginRegisterFooter/LoginRegisterFooter'
import TopBar from '../../Components/TopBar/TopBar'
import avatar from '../images/avatar.png'
import './Profile.scss'

const Profile = () => {
  const profile_photo = (e) => {

    console.log(e.target.value);

  }


  const profile_menu = (e) => {
    document.querySelectorAll('.btn').forEach(item => {
      item.classList.remove('active')
    })

    e.target.classList.add('active')
  }
  return (
    <>
      <div className='topbar'>
        <TopBar />
      </div>

      <div className="profile_container">
        <div className="profile-wraper">
          <div className="profile_image">
            <form action="" method='post' encType='multipart/form-data'>
              <label htmlFor="img_upload">
                <img src={avatar} alt="" />
              </label>
              <input onChange={profile_photo} name='photo' type="file" id='img_upload' style={{ display: 'none' }} />
            </form>

          </div>
          <div className="profile_detiles">
            <div className="profile_username_edit">
              <p className="username">
                ismailhaque
              </p>
              <Link className='btn' to={'/setting'}>Edit profile</Link>
              <Link to={'/setting'} className='icon'> <AiOutlineSetting /></Link>
            </div>

            <div className="post-follow">
              <p className="post"><b>1</b> post</p>
              <p className="followers"><b>47</b> followers</p>
              <p className="following"><b>10</b> following </p>
            </div>

            <div className="full-name">
              <p>MD ISMAIL HAQUE</p>
            </div>
            <div className="professional-bio">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis in quos, rerum distinctio perferendis vel dolores dolore provident voluptate placeat ipsam, officia repudiandae quis numquam totam exercitationem quia, necessitatibus sint?
            </div>

            <div className="website-url">
              <a href="www.fiverr.com">www.fiverr.com</a>
            </div>
          </div>
        </div>

        <div className="post-saved-taged-menu">
          <ul>
            <li><Link onClick={profile_menu} className='btn' to={'/profile/posts'}> <span><BsGrid3X3Gap /></span>POSTS</Link></li>
            <li><Link onClick={profile_menu} className='btn' to={'/profile/saved'}> <span><BsBookmark /></span>SAVED</Link></li>
            <li><Link onClick={profile_menu} className='btn' to={'/profile/tagged'}><span><RiContactsBook2Line /></span> TAGGED</Link></li>
          </ul>
        </div>

        <div className="profile-outlet">
          <Outlet />
        </div>
      </div>

      <LoginRegisterFooter />

    </>

  )
}

export default Profile