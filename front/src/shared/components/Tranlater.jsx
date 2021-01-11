import React from 'react';
import flagSpain from '../../assets/flagsIcons/flag-spain-XL.jpg';
import flagUk from '../../assets/flagsIcons/english-flag.png';
import './Translater.scss';
import { useTranslation } from 'react-i18next';
 
export default function Tranlater() {
    const [t, i18n] = useTranslation("global")
    return (
        <div className = "translater-main-container" >
            <div  className = "translater-main-container__img-container" >
                <img onClick={()=> i18n.changeLanguage("es") } className = "translater-main-container__flags-img"  src={ flagSpain } alt="this is a the Spain flag"/>
            </div>
            <div className = "translater-main-container__img-container" >
                <img onClick={()=> i18n.changeLanguage("en") } className = "translater-main-container__flags-img"  src={ flagUk } alt="this is the UK flag"/>
            </div>
        </div>
    )
}
