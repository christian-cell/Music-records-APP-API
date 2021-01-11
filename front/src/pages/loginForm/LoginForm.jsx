import React from 'react';
import { useForm } from 'react-hook-form';
import './LoginForm.scss';
import { API } from '../../shared/servicios/Api';
import Translater from '../../shared/components/Tranlater';
import { useTranslation } from 'react-i18next';

export default function LoginForm(props) {
    const [t, i18n] = useTranslation("global");

    const { register, handleSubmit } = useForm();

    const onSubmit = formData => {
        API.post('musicRecords/login', formData).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
            props.fnSetIsLogged(true);
            console.log('le diste al boton y te logeaste sin remedio', formData, res.data.token)
            window.location.href = "/onBoarding"
        })
    }
    return (
        <div className="login-main-container" >

            

                {/* <div className="row "  > */}
                    {/* <div className="col-sm-12 col-md-5 col-lg-3 mx-auto my-5  " > */}

                        <div>
                            <div className="login-main-container__translater-container" >
                                <Translater />
                            </div>
                            <div className="header-login-container" >
                                <span>
                                {t("Login.HeaderLogin")} 

                                </span>
                            </div>
                            <div className="login-main-container__form-container" >
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <div className="login-main-container__input-container" >
                                            <input type="text"
                                                placeholder={t("Login.Email")}
                                                id="email"
                                                className="login-main-container__input"
                                                name="email"
                                                ref={register({ required: true })}
                                                // placeholder={t("headers.login-email")}
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <div className="login-main-container__input-container" style={{borderBottom:'1px solid white'}}  >
                                            <input type="text"
                                                placeholder={t("Login.Password")}

                                                className="login-main-container__input"
                                                id="password"
                                                name="password"
                                                ref={register({ required: true })}
                                                // placeholder={t("headers.Password-login")}
                                            />

                                        </div>
                                    </div>
                                    <div className="login-main-container__button-login-container" >
                                        <button className=" btn btn-warning btn-block card-body__login-button" >
                                        {t("Login.Login")} 
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    {/* </div> */}
                {/* </div> */}
            
        </div>
    )
}
