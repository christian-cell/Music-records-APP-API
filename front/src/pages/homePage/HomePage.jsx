import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import Translater from '../../shared/components/Tranlater';
import { useTranslation } from 'react-i18next';
import Banner from '../../shared/components/Banner';

export default function HomePage() {

    const [t, i18n] = useTranslation("global");

    return (
        <div className="c-main-homePage-container" >
            <div className="c-main-homePage-container__span-container">
                <div >
                    <Banner></Banner>
                </div>
                <div className="c-main-homePage-container__translater-container"
                  >
                    <Translater />
                </div>
            </div>


            <div className="c-main-homePage-container__introducing-container" >
                <span> {t("HomePage.signUpCreateEnjoy")} </span>
            </div>

            <div className="c-main-homePage-container__buttons-super-container" >
                <div className="c-main-homePage-container__link-container" >
                    <Link to="/register" >
                        <div className="c-main-homePage-container__button-create-account-container" >
                            <button className="c-main-homePage-container__create-account-button" >
                                {t("HomePage.createAccount")}
                            </button>
                        </div>
                    </Link>
                </div>
                <div className="c-main-homePage-container__link-container-login" >
                    <Link to="/login" >
                        <div className="c-main-homePage-container__button-create-account-container" >
                            <button className="c-main-homePage-container__create-account-button" >
                                {t("HomePage.signIn")}
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


