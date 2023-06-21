import React from "react";
import {useEffect, useState} from 'react';
import "./header.sass";
import {Link, useNavigate} from "react-router-dom";
import img from "./header_logo.svg";
import burger from "./burger.svg";
import close from "./close_300.svg";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';



const Header = ({id, accessToken, isLogged, setUserInfo, login, setAccessToken}) => {
    const [isOpen, setOpen] = useState(false);
    const [isRegistration, setRegistration] = useState(false);
    const [isMobileOpen, setMobileOpen] = useState(false);
    const [userData, setUserData] = useState({
        login: "",
        password: "",
        name: ""
    });
    const navigate = useNavigate();
    
    let btn = isLogged ? <Link to={"/profile/"} className="btn">ЛК</Link> : <button className="btn" onClick={() => setOpen(true)}>Войти</button>;

    const handleLoginChange = (e) => {
        setUserData({
            ...userData,
            login: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setUserData({
            ...userData,
            password: e.target.value
        })
    }

    const handleNameChange = (e) => {
        setUserData({
            ...userData,
            name: e.target.value
        })
    }

    const signIn = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(userData);

        var requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: raw
        };

        let url = isRegistration ? "https://geckon-api.fly.dev/api/v1/auth/signup" : "https://geckon-api.fly.dev/api/v1/auth/signin";

        fetch(url, requestOptions)
                .then(response => response.ok ? response.json() : Promise.reject(response))
                .then(result => {
                    setAccessToken(result.accessToken);
                    localStorage.setItem("geckonRefresh", result.refreshToken);
                    return result.accessToken;
                })
                .then(token => loadUserData(token))
                .then(() => login())
                .then(() => navigate("/profile/")) 
                .then(() => setOpen(false))
                .catch(error => console.log('error', error))
    }

    const loadUserData = (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
        };

        fetch("https://geckon-api.fly.dev/api/v1/person/", requestOptions)
                .then(response => response.json())
                .then(result => setUserInfo(result))
                .catch(error => console.log('error', error));
    }

    let mobileMenuClass = !isMobileOpen ? "" : "menu__mobile_active";

    return(
        <header className="header">
            { document.documentElement.clientWidth <= '954' ? 
            
            <div className={`menu__mobile ${mobileMenuClass}`}>
                <img src={close} alt="close" className="menu__mobile--close" onClick={() => setMobileOpen(!isMobileOpen)}/>
                <ul className="header__menu">
                    <li className="header__menu-item">
                        <Link to="/" onClick={() => setMobileOpen(!isMobileOpen)}>Лента</Link>
                    </li>
                    <li className="header__menu-item">
                        <Link to="/news/" onClick={() => setMobileOpen(!isMobileOpen)}>Новости</Link>
                    </li>
                    <li className="header__menu-item">
                        <Link to="/events/" onClick={() => setMobileOpen(!isMobileOpen)}>Мероприятия</Link>
                    </li>
                    <li className="header__menu-item">
                        <Link to="/discussions/" onClick={() => setMobileOpen(!isMobileOpen)}>Обсуждения</Link>
                    </li>
                </ul>
                {btn}
            </div>
            
            : null}
            <div className="container">
                {document.documentElement.clientWidth > '954' ? 
                
                <div className="header__wrapper">
                    <img src={img} alt="logo" className="header__logo"/>
                    <ul className="header__menu">
                        <li className="header__menu-item">
                            <Link to="/">Лента</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/news/">Новости</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/events/" >Мероприятия</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link to="/discussions/">Обсуждения</Link>
                        </li>
                    </ul>
                    {btn}
                </div>
                
                : 
                
                <div className="header__wrapper">
                    <img src={img} alt="logo" className="header__logo"/>
                    <img src={burger} alt="burger" className="burger" onClick={() => setMobileOpen(!isMobileOpen)}/>
                </div>
                
                }
            </div>
            <Modal 
                open={isOpen} 
                onClose={() => setOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Sheet variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}>
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />

                    <div>
                        <h4 id="modal-title" className="form__title">{isRegistration ? "Зарегистрироваться" : "Войти"}</h4>
                        <form id="modal-desc" onSubmit={(e) => signIn(e)} className="form__wrapper">
                            <input type="email" 
                                className="inpt form-item" 
                                placeholder="Почта" 
                                required
                                value={userData.login} 
                                onChange={(e) => handleLoginChange(e)}/>
                            <input 
                                type="password" 
                                className="inpt form-item" 
                                placeholder="Пароль" 
                                required
                                value={userData.password}
                                onChange={(e) => handlePasswordChange(e)}/>
                            {isRegistration ? 
                            <input 
                                type="text" 
                                className="inpt form-item" 
                                placeholder="Логин" 

                                required
                                value={userData.name}
                                onChange={(e) => handleNameChange(e)}/> : null}
                            {isRegistration ? <div className="form__meta"><h6>Уже есть аккаунт?</h6> <h6 className="modal__link" onClick={() => setRegistration(false)}>Войти</h6></div> : 
                            <div className="form__meta"><h6>Еще нет аккаунта?</h6> <h6 className="modal__link" onClick={() => setRegistration(true)}>Зарегистрироваться</h6></div>}
                            <div className="form__btn">
                                <button className="btn">{isRegistration ? "Зарегистрироваться" : "Войти"}</button>
                            </div>
                        </form>
                    </div>
                </Sheet>
            </Modal>
        </header>
    )
}

export default Header;