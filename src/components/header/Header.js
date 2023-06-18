import React from "react";
import {useEffect, useState} from 'react';
import "./header.sass";
import {Link, useNavigate} from "react-router-dom";
import img from "./header_logo.svg";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';



const Header = ({id, accessToken, isLogged, setUserInfo, login, setAccessToken}) => {
    const [isOpen, setOpen] = useState(false);
    const [userData, setUserData] = useState({
        login: "",
        password: ""
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

        fetch("http://localhost:8080/api/v1/auth/signin", requestOptions)
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

        fetch("http://localhost:8080/api/v1/person/", requestOptions)
                .then(response => response.json())
                .then(result => setUserInfo(result))
                .catch(error => console.log('error', error));
    }

    return(
        <header className="header">
            <div className="container">
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
                                <h4 id="modal-title">Войти</h4>
                                <form id="modal-desc" onSubmit={(e) => signIn(e)}>
                                    <input type="email" 
                                    className="inpt" 
                                    placeholder="Логин" 
                                    required
                                    value={userData.login} 
                                    onChange={(e) => handleLoginChange(e)}/>
                                    <input 
                                    type="password" 
                                    className="inpt" 
                                    placeholder="Пароль" 
                                    required
                                    value={userData.password}
                                    onChange={(e) => handlePasswordChange(e)}/>
                                    <button className="btn">Войти</button>
                                </form>
                            </div>
                        </Sheet>
                    </Modal>
                </div>
            </div>
        </header>
    )
}

export default Header;