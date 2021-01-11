import React from 'react';
import { useForm } from "react-hook-form";
import { API } from '../../shared/servicios/Api';
import './RegisterForm.scss';
import { Link } from 'react-router-dom';
// import Translater from '../../shared/components/Tranlater';
import MenuIcon from '../../assets/icons/MenuIcon.png';
import { useTranslation } from 'react-i18next';
import EnglishFlag from '../../assets/flagsIcons/english-flag.png';


export default function RegisterForm() {

    const [t, i18n] = useTranslation("global");


    const { register, handleSubmit } = useForm();

    const onSubmit = (formData, e) => {
        e.preventDefault();
        API.post('musicRecords/register', formData).then(res => {
            console.log('Te has registrado en mi app');
            window.location.href = "/login";

        })


    }

    function closeModal() {
        document.getElementById('openModal').style.display = 'none';
    }

    

    function showModal() {
        console.log('abriste el modal')
        document.getElementById('openModal').style.display = 'block';
    } 

    return (
        <div className="register-form-super-container"  >
            {/* THIS IS THE MODAL */}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className="register-form-super-container__span-signUp-container" >
                <div >
                    <span>Sign up</span>

                </div>
                <div style={{ border: '1px solid white' /* ,position:'absolute' */ }} >
                    <img onClick={showModal} style={{ width: '60px', height: '40px' }} src={MenuIcon} alt="language's icon" />




                    <div onClick={closeModal} id="openModal" style={{ display: 'none', position: 'fixed' }} >
                        <div style={{ height: '220px', width: '150px', backgroundColor: 'white' , opacity:'0.7' , borderRadius:'5%' }} >

                            <div>
                                <span style={{ fontSize: '10px' ,color:'black' }} >Languages:</span>
                            </div>

                            <div>
                                <ul style={{width:'0px'}} >
                                    <li onClick={closeModal, ()=> i18n.changeLanguage("en")} style={{ listStyle:'none' , fontSize:'10px', color:'black' , fontFamily:'fantasy' ,cursor:'pointer' }} >English</li>
                                    <li onClick={closeModal, ()=> i18n.changeLanguage("es")} style={{ listStyle:'none' , fontSize:'10px', color:'black' , fontFamily:'fantasy' ,cursor:'pointer' }} >Spanish</li>
                                    <li onClick={closeModal} style={{ listStyle:'none' , fontSize:'10px', color:'black' , fontFamily:'fantasy' ,cursor:'pointer' }} >Italian</li>
                                    <li onClick={closeModal} style={{ listStyle:'none' , fontSize:'10px', color:'black' , fontFamily:'fantasy' ,cursor:'pointer' }} >German</li>
                                    <li onClick={closeModal} style={{ listStyle:'none' , fontSize:'10px', color:'black' , fontFamily:'fantasy' ,cursor:'pointer' }} >French</li>
                                </ul>
                            </div>


                        </div>
                    </div>



                </div>
            </div>

            {/* <div className="register-form-super-container__register-translater-container">
                <Translater />
            </div> */}
            <div className="register-form-super-container__form-bin" >
                <div className="card-header" >
                    <span>
                        <span> {t("RegisterForm.registerCreateAccount")} </span>

                    </span>
                </div>
                <div className="row"  >
                    <div className="col-sm-12 col-md-8 col-lg-5 my-5 mx-auto" >


                        <div className="card-body" >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group" >
                                    <input className="form-control  "
                                        type="text" name="firstName"
                                        id="firstName"
                                        placeholder={t("RegisterForm.firstName")}
                                        ref={register({ require: true })}
                                    />
                                </div>

                                <div className="form-group">
                                    <input className="form-control  "
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        ref={register({ require: true })}
                                        placeholder={t("headers.LastName")}
                                    />
                                </div>

                                <div className="form-group" >
                                    <input className="form-control  "
                                        type="text"
                                        name="email"
                                        id="email"
                                        ref={register({ require: true })}
                                        placeholder={t("headers.email")}
                                    />
                                </div>

                                <div className="form-group" >
                                    <input className="form-control"
                                        type="password"
                                        name="password"
                                        id="password"
                                        ref={register({ require: true })}
                                        placeholder={t("headers.Password")}
                                    />
                                </div>

                                <div className="form-group" >
                                    <input className="form-control  "
                                        type="text"
                                        name="address"
                                        id="address"
                                        ref={register({ require: true })}
                                        placeholder={t("headers.Address")}
                                    />
                                </div>

                                <div className="form-group" >
                                    <input className="form-control  "
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        ref={register({ require: true })}
                                        placeholder={t("headers.PhoneNumber")}
                                    />
                                </div>

                                <div>
                                    <button className="btn btn-block btn btn-warning" >{t("headers.SignUp")}</button>
                                </div>
                            </form>
                            <Link to="/" >
                                <div className="register-form-super-container__register-home-button-container" >
                                    <button className="register-form-super-container__register-home-button" > {t("headers.HomePage")} </button>
                                </div>
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}






