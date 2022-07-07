import {NavLink} from 'react-router-dom';
import { useState } from "react";
import useFetch from '../Common/useFetch';
import { Col, Form } from "react-bootstrap";
import RoadmapBox from '../Roadmap/RoadmapBox';
import UserRoadmapBox from './UserRoadmapBox';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserLessonpBox from './UserLessonBox';

const UserCreatedLessons = () => {

    const [cookies, setCookie] = useCookies(['Appdoon_Auth']);
    const navigate = useNavigate();


    const [sensetive, setSensetive] = useState(false);



    //User
    const [urlAuth, setUrlAuth] = useState(process.env.REACT_APP_API + "Authentication/InfoFromCookie")
    const {data : userInfo} = useFetch(urlAuth,sensetive);
    useEffect(()=>{
        if(!cookies.Appdoon_Auth){
            navigate('/login')
        }

        if(userInfo.Role){
            if(!(userInfo.Role == 'Admin' || userInfo.Role == 'Teacher')){
                navigate('/login')
            }
        }

    },[cookies,userInfo])

    //User
    const [urlLessons, setUrlLessons] = useState(process.env.REACT_APP_API + 'profile/GetCreatedLessons')
    const {data : lessons} = useFetch(urlLessons,sensetive);

    useEffect(() => {
        document.title = "مقالات ساخته شده";
    }, []);

    return(
        cookies.Appdoon_Auth && (userInfo.Role == 'Admin' || userInfo.Role == 'Teacher') &&
        <div class="container-main">
        <div class="d-block">
            <section class="profile-home">
                <div class="col-lg">
                    <div class="post-item-profile order-1 d-block">
                        <div class="col-lg-3 col-md-3 col-xs-12 pr">
                            <div class="sidebar-profile sidebar-navigation">
                                <section class="profile-box">
                                    <header class="profile-box-header-inline">
                                        <div class="profile-avatar user-avatar profile-img">
                                            <img src = "assets/images/man.png"></img>
                                        </div>
                                    </header>
                                    
                                </section>
                                <section class="profile-box">
                                    <ul class="profile-account-navs">
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/Profile" class=""><i class="mdi mdi-account-outline"></i>
                                                پروفایل
                                            </NavLink>
                                        </li>
                                        
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/UserRoadmaps" class=""><i class=""></i>
                                                رودمپ‌های شرکت کرده
                                            </NavLink>
                                        </li>
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/UserFavoriteRoadmaps" class=""><i class=""></i>
                                                رودمپ‌های مورد علاقه
                                            </NavLink>
                                        </li>
                                        {userInfo.Role && (userInfo.Role == "Admin" || userInfo.Role == "Teacher") &&
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/UserCreatedRoadmaps" class=""><i class=""></i>
                                                رودمپ‌های ساخته شده
                                            </NavLink>
                                        </li>
                                        }
                                        {userInfo.Role && (userInfo.Role == "Admin" || userInfo.Role == "Teacher") &&
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/UserCreatedLessons" class="active"><i class=""></i>
                                                مقالات ساخته شده
                                            </NavLink>
                                        </li>
                                        }
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/EditProfile" class=""><i class=""></i>
                                                ویرایش اطلاعات      
                                            </NavLink>
                                        </li>
                                        <li class="profile-account-nav-item navigation-link-dashboard">
                                            <NavLink to="/EditPassword" class=""><i class=""></i>
                                                تغییر رمز عبور
                                            </NavLink>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                        

            <div class="col-lg-9 col-md-9 col-xs-14 pl">

            <div class = "heightB">
            <main class="heightB">
            <div class="heightB">
                    <div class="heightB">
                        <section class="heightB">

                            {lessons.length > 0 && (
                                <div className = "grid-container">
                                {lessons.map((data, idx) => (
                                    <div class="grid-item">
                                        <UserLessonpBox data={data} key={idx} />
                                    </div>
                                ))}
                                </div>
                                )
                            }
                
                            {lessons.length === 0 && (
                                <div>
                                    شما در هیچ رودمپی شرکت نکرده‌اید.
                                </div>)
                            }



                        </section>

                    </div>
                </div>
            </main>
            </div>

 </div>

                    </div>
                </div>
            </section>
        </div>
    </div>
   
    );

}

export default UserCreatedLessons;