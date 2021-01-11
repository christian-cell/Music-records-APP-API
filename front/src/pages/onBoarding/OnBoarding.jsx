import React, { useState, useEffect } from 'react';
import './OnBoarding.scss';
import { API } from '../../shared/servicios/Api';
import AuthButton from '../../shared/components/AuthButton';
import { Link } from 'react-router-dom';

export default function OnBoarding() {
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'));
    const [datoUsuario, setDatoUsuario] = useState([])
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const id = usuario._id;

    useEffect(() => {

        API.get('musicRecords/' + id).then(res => {
            setDatoUsuario(res.data)
        })
    }, [id])

    console.log(datoUsuario && datoUsuario);

    const onSubmit = e => {
        e.preventDefault();
        // console.log('you pressed the button')
        const imageForm = document.getElementById('profileImageForm');
        const formData = new FormData(imageForm);

        const userToken = localStorage.getItem('token');
        if (!userToken) {
            return (window.location.href = "/")
        }


        API.post('musicRecords/profileImage/' + id, formData).then(res => {
            console.log('your pic was updated successfully')
            window.location.href = "/onBoarding"

        });

    }

    return (
        <div className="c-main-onBoarding-container" >
            {datoUsuario.map((dato, i) =>
                <div>
                    <div className="c-main-onBoarding-container__hola-span-container" >
                        <span className="c-main-onBoarding-container__saludo-span" >Hi {dato.firstName} Let's pick some image</span>
                    </div>
                    <div className="c-main-onBoarding-container__image-container" >
                        <img
                            className="c-main-onBoarding-container__image"
                            src={dato.imagen} alt="this is the user profile pic" />
                    </div>
                    <div className="c-main-onBoarding-container__update-image-form-container" >
                        <form onSubmit={onSubmit} encType="multipart/form-data" id="profileImageForm" >
                            <div className="btnfile">
                                <i className="fas fa-edit"></i>

                                <input className="loadimg" type="file" name="avatar" />
                            </div>

                            <div className="c-main-onBoarding-container__update-image-button-container" >
                                <button className="c-main-onBoarding-container__update-image-button" >UPDATE IMAGE</button>
                            </div>

                        </form>
                    </div>

                </div>
            )}
        </div>
    )
}


{/* <div>
                {datoUsuario&&datoUsuario.map((dato, i) =>
                    <div key={dato._id} >
                        <div>
                            <span> Hola: {dato.firstName} , como estás?</span>
                        </div>
                        <div>
                            <img
                                className="c-main-onBoarding-container__image"
                                src={dato.imagen} alt="this is the user profile pic" />
                        </div>
                        <div>
                            <form onSubmit={onSubmit} encType="multipart/form-data" id="profileImageForm" >
                                <div>
                                    <input type="file" name="avatar" />
                                </div>
                                <div>
                                    <button>update image</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <AuthButton isLogged={isLogged} fnSetIsLogged={setIsLogged} ></AuthButton>
            </div>
            <div>
                <Link to="/records" >
                    <button> Go to Recor </button>
                </Link>
            </div> */}





