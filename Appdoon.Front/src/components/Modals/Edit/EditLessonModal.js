import React from "react";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '../../Common/useFetch';
import { Col, Form } from "react-bootstrap";
import useDelete from '../../Common/useDelete';
import useUpdate from '../../Common/useUpdate';
import $ from 'jquery';
import Select from 'react-select';

import "../../../Modular_Css/EditRoadmapModal.css";

import chroma from 'chroma-js';

import { StylesConfig } from 'react-select';

function EditLessonModal({ lesson, sensetive, setSensetive }) {

    const [urlput, setUrlPost] = useState(process.env.REACT_APP_API + "lesson/");

    const HandleMessage = (resmess,colormess,id = "result_message_edit") => {
        document.getElementById(id).style.color = colormess;
        document.getElementById(id).innerHTML = resmess;
        setSensetive(!sensetive);
    }
    
    const HandleUpdate = async(event) => {
        event.preventDefault();
        
        
        let imagesrc = "1.jpg";
        const formData = new FormData();
        

        if(event.target.Photo.files.length){
            imagesrc = event.target.Photo.files[0].name;
            formData.append("myFile",event.target.Photo.files[0]);
        }

        

        if(event.target.Title.value == ""){
            formData.append("Title",lesson.Title);
        }
        else{
            formData.append("Title",event.target.Title.value);
        }

        if(event.target.Text.value == ""){
            formData.append("Text",lesson.Text);
        }
        else{
            formData.append("Text",event.target.Text.value);
        }


        formData.append("PhotoFileName",imagesrc);

        
        

        let body = formData;

        const [resmess, colormess] = await useUpdate(urlput+lesson.Id,body);
        HandleMessage(resmess,colormess);
    }


    useEffect(()=> {

    },[lesson])


    const handleClick = () =>{
        document.getElementById("Photo").click();
    }

    const handlePhotoChange = (event) =>{
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#PreviewPhoto')
                .attr('src', e.target.result)
        };

        reader.readAsDataURL(event.target.files[0]);
    }

      
    return (
        <div style={{top: "1%"}} dir="rtl" class="modal fade" id="editModal" role="dialog">
            <div style={{marginBottom:"50px", maxWidth: "550px"}} class="modal-dialog">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ویرایش درس : {lesson.Title}</h4>
                    </div>
                    <div style={{overflowY: "scroll", maxHeight:"500px"}} class="modal-body">
                        <div>
                            <div style={{marginTop:"-110px"}} class="container">
                                <div class="row">
                                    <div  class="col-lg">
                                        <section  class="page-account-box">
                                            <div>
                                                <div  class="ds-userlogin">
                                                    <div  class="account-box">
                                                        <div  class="Login-to-account mt-4">
                                                            <div style={{marginTop:"-20px", marginBottom:"40px"}} class="account-box-content">
                                                                <form onSubmit={HandleUpdate} id="editform" action="#" class="form-account text-right">

                                                                    <div class="form-account-title">
                                                                        <label for="Title">نام درس</label>
                                                                        <input id="Title" placeholder={lesson.Title} type="text" class="number-email-input" name="Title"/>
                                                                    </div>

                                                                    
                                                                    <div class="form-account-title">
                                                                        <label for="Text">متن</label>
                                                                        <textarea id="Text" placeholder={lesson.Text} class="number-email-input" name="Text"/>
                                                                    </div>

                                                                    <div style={{textAlign:"right", width:"100%" ,marginBottom:"50px"}} class="form-account-title">
                                                                        
                                                                        <label style={{float:"right"}} for="Photo">تصویر درس</label>
                                                                        
                                                                        <input id="Photo" name='Photo' onChange={handlePhotoChange} class="form-control" type="File" hidden="hidden" />
                                                                        
                                                                        <br/>
                                                                        <button type="button" class="btn btn-primary" onClick={handleClick}>آپلود تصویر</button>
                                                                        <img id="PreviewPhoto" class="img-thumbnail" src={process.env.REACT_APP_PHOTOPATH+"lesson/"+lesson.TopBannerSrc} style={{float:"left" , width:"100px"}}/>
                                                                    </div>





                                                                </form>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <div style={{width:"100%"}}>
                            <p style={{fontSize : "14px", float:"right", marginTop:"8px", marginBottom:"-8px"}} id="result_message_edit"></p>
                            <button style={{float:"left"}} type="submit" class="btn btn-primary" form="editform">ویرایش درس</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default EditLessonModal;