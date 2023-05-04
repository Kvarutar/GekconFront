import React from "react";
import "./header.sass";
import {Link} from "react-router-dom";
import img from "./header_logo.svg";


const Header = ({isLogged}) => {
    
    let btn = isLogged ? <button className="btn">ЛК</button> : <button className="btn">Войти</button>;

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
                </div>
            </div>
        </header>
    )
}

export default Header;