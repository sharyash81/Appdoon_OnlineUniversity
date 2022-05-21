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

function EditRoadmapModal({ roadmap, sensetive, setSensetive }) {

    const [url, setUrl] = useState(process.env.REACT_APP_API + "category");
    const [urlput, setUrlPost] = useState(process.env.REACT_APP_API + "roadmap/");
    const {data : categories, error} = useFetch(url,sensetive);

    const [boxPhotoPath, setBoxPhotoPath] = useState("");

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
            formData.append("Title",roadmap.Title);
        }
        else{
            formData.append("Title",event.target.Title.value);
        }

        if(event.target.Description.value == ""){
            formData.append("Description",roadmap.Description);
        }
        else{
            formData.append("Description",event.target.Description.value);
        }


        formData.append("PhotoFileName",imagesrc);

        
        
        let i = 0;
        for (var option of selectedOptions)
        {
            i++;
            formData.append("CategoriesId"+i,option.value);
        }
        

        let body = formData;

        const [resmess, colormess] = await useUpdate(urlput+roadmap.Id,body);
        HandleMessage(resmess,colormess);
    }

    const [options, setOptions] = useState([]);

    const [selectedOptions,setSelectedOptions] = useState();

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    useEffect(()=> {
        if(roadmap.Categories && categories){
            const tempOptions = [];
            for(var i = 0; i < categories.length; i++){
                tempOptions.push({value: categories[i].Name, label:categories[i].Name});
            }
            const tempSelectedOptions = [];
            for(var i = 0; i < roadmap.Categories.length; i++){
                tempSelectedOptions.push({value: roadmap.Categories[i].Name, label:roadmap.Categories[i].Name});
            }
            setOptions(tempOptions);
            setSelectedOptions(tempSelectedOptions);
        }
    },[roadmap,categories])


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

    const customStyleForTestsList = {
        menuList:(provided) => ({
            ...provided,
            maxHeight:"200px",
            
        }),
    };
      
    return (
        <div style={{top: "1%"}} dir="rtl" class="modal fade" id="editModal" role="dialog">
            <div style={{marginBottom:"50px", maxWidth: "550px"}} class="modal-dialog">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">ویرایش رودمپ : {roadmap.Title}</h4>
                    </div>
                    <div style={{overflowY: "scroll", height:"500px"}} class="modal-body">
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
                                                                        <label for="Title">نام رودمپ</label>
                                                                        <input id="Title" placeholder={roadmap.Title} type="text" class="number-email-input" name="Title"/>
                                                                    </div>

                                                                    
                                                                    <div class="form-account-title">
                                                                        <label for="Description">توضیحات</label>
                                                                        <textarea id="Description" placeholder={roadmap.Description} class="number-email-input" name="Description"/>
                                                                    </div>

                                                                    <div style={{textAlign:"right", width:"100%" ,marginBottom:"50px"}} class="form-account-title">
                                                                        
                                                                        <label style={{float:"right"}} for="Photo">تصویر رودمپ</label>
                                                                        
                                                                        <input id="Photo" name='Photo' onChange={handlePhotoChange} class="form-control" type="File" hidden="hidden" />
                                                                        
                                                                        <br/>
                                                                        <button type="button" class="btn btn-primary" onClick={handleClick}>آپلود تصویر</button>
                                                                        <img id="PreviewPhoto" class="img-thumbnail" src={process.env.REACT_APP_PHOTOPATH+"roadmap/"+roadmap.ImageSrc} style={{float:"left" , width:"100px"}}/>
                                                                    </div>

                                                                    <div style={{marginBottom:"0px"}} class="form-account-title">
                                                                        <label for="Categories">دسته‌بندی‌ها</label>


                                                                        {categories && (
                                                                            <Select 
                                                                                menuPlacement="top"
                                                                                placeholder="دسته‌ها را انتخاب کنید ..."
                                                                                isMulti={true}
                                                                                value={selectedOptions}
                                                                                onChange={handleChange}
                                                                                options={options}
                                                                                styles={customStyleForTestsList}
                                                                            />


                                                                            )
                                                                        }
                                                                        
                                                                        {roadmap && 
                                                                            (
                                                                                <div></div>
                                                                            )
                                                                        }

                                                                        
                                                                    </div>


                                                                    {/*
                                                                    <div class="form-auth-row">
                                                                        <label for="#" class="ui-checkbox mt-1">
                                                                            <input type="checkbox" value="1" name="login" id="remember"/>
                                                                            <span class="ui-checkbox-check"></span>
                                                                        </label>
                                                                        <label for="remember" class="remember-me mr-0">مرا به خاطر بسپار</label>
                                                                    </div>
                                                                    */
                                                                    }




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
                            <button style={{float:"left"}} type="submit" class="btn btn-primary" form="editform">ویرایش رودمپ</button>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default EditRoadmapModal;