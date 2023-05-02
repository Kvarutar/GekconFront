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
                            <Link>Лента</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link>Новости</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link>Мероприятия</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link>Обсуждения</Link>
                        </li>
                    </ul>
                    {btn}
                </div>
            </div>
        </header>
    )
}

export default Header;