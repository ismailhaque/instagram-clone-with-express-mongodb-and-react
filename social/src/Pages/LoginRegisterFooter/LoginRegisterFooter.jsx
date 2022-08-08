import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './LoginRegisterFooter.scss';

const LoginRegisterFooter = () => {

  return (
    <>
    
    <div className="footer-wraper">

        <div className="footer-menu">
            <a href="https://about.facebook.com/meta">Meta</a>
            <a href="https://about.instagram.com/">About</a>
            <a href="https://about.instagram.com/blog/">Blog</a>
            <a href="https://www.instagram.com/about/jobs/">Jobs</a>
            <a href="https://help.instagram.com/">Help</a>
            <a href="https://developers.facebook.com/docs/instagram">API</a>
            <a href="https://developers.facebook.com/docs/instagram">Privacy</a>
            <a href="https://www.instagram.com/legal/terms/">Terms</a>
            <a href="https://www.instagram.com/directory/profiles/">Top Accounts</a>
            <a href="https://www.instagram.com/directory/hashtags/">Hashtags</a>
            <a href="https://www.instagram.com/explore/locations/">Locations</a>
            <a href="https://www.instagram.com/web/lite/">Instagram Lite</a>
            <a href="https://www.facebook.com/help/instagram/261704639352628">Contact Uploading & Non-Users</a>
        </div>

        <div className="footer">

            <a href="#">English <IoIosArrowDown/></a>
            <p>© 2022 Instagram from Meta</p>
        
        </div>

    </div>
    
    </>
  )
};

export default LoginRegisterFooter;