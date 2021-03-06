import {NavLink} from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from 'bootstrap';
import useFetch from '../Common/useFetch';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

import '../../Modular_Css/RoadmapBox.css';


const UserLessonpBox = ({ data:lesson }) => {

    const [cookies, setCookie] = useCookies(['Appdoon_Auth']);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!cookies.Appdoon_Auth){
            navigate('/login')
        }
    },[cookies])

    return(
        cookies.Appdoon_Auth &&
        /*data from back*/
        <div class="add-group-border">
            <NavLink to= {`/lesson/${lesson.Id}`} >
            <div class="add-group"></div>
            <img src={process.env.REACT_APP_PHOTOPATH+"lesson/"+lesson.TopBannerSrc} alt={lesson.Title}></img>
                <h3>{lesson.Title}</h3>
            </NavLink>
        </div>
    )
}
export default UserLessonpBox;