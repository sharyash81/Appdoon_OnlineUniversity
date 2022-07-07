//React Js
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//Authentication
import Register from './Components/Authentication/Register';
import Login from "./Components/Authentication/Login";
import ForgetPassword from './Components/Authentication/ForgetPassword';

//Statics
import Navigation from "./Components/Statics/Navigation";
import Footer from "./Components/Statics/Footer";

//Roadmap
import Roadmaps from "./Components/Roadmap/Roadmaps";
import Roadmap from './Components/Roadmap/Roadmap';

//Lesson
import Lesson from './Components/Roadmap/Lesson';
import Lessons from './Components/Roadmap/Lessons';

//Category
import ListCategory from './Components/List_Roadmap/ListCategory';

//Homework
import All_Questions from './Components/HomeWork/All_Questions';

//User(Profile)
import Profile from './Components/User/Profile';
import UserRoadmaps from './Components/User/UserRoadmaps';
import UserFavoriteRoadmaps from './Components/User/UserFavoriteRoadmaps';
import EditProfile from './Components/User/EditProfile';
import EditPassord from './Components/User/EditPassword';
import UserCreatedRoadmaps from './Components/User/UserCreatedRoadmaps';
import UserCreatedLessons from './Components/User/UserCreatedLessons';

//Others
import NotFound from './Components/Others/NotFound';
import AboutUs from './Components/Others/AboutUs';

function App() {

  return (
    <BrowserRouter>

      <Navigation/>

        <Routes>

          {/*Authentication*/}
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/forget_password" element={<ForgetPassword/>}/>

          {/*Roadmap*/}
          <Route exact path="/" element={<Roadmaps/>}/>
          <Route exact path="/roadmaps" element={<Roadmaps/>}/>
          <Route path={`/roadmap/:id`} element={<Roadmap/>}/>

          {/*Lesson*/}
          <Route path={`/lessons`} element={<Lessons/>}/>
          <Route path={`/lesson/:id`} element={<Lesson/>}/>

          {/*Category*/}
          <Route path={`/categories`} element={<ListCategory/>}/>

          {/*Homework*/}
          <Route path={`/All_Questions`} element={<All_Questions/>}/>

          {/*User(Profile)*/}
          <Route path={`/Profile`} element={<Profile/>}/>
          <Route path={`/UserRoadmaps`} element={<UserRoadmaps/>}/>
          <Route path={`/UserFavoriteRoadmaps`} element={<UserFavoriteRoadmaps/>}/>
          <Route path={`/EditProfile`} element={<EditProfile/>}/>
          <Route path={`/EditPassword`} element={<EditPassord/>}/>
          <Route path={`/UserCreatedRoadmaps`} element={<UserCreatedRoadmaps/>}/>
          <Route path={`/UserCreatedLessons`} element={<UserCreatedLessons/>}/>

          {/*Others*/}
          <Route path={`/about_us`} element={<AboutUs/>}/>
          <Route path="*" element={<NotFound/>}/>

        </Routes>

      <Footer/>

    </BrowserRouter>
  );
}

export default App;