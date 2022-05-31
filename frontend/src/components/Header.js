import React from "react";
import logo from '../images/image__logo.svg';
import { Link, Route, Switch, withRouter } from "react-router-dom";


function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <Switch>
        <Route path="/signin">
          <Link to="signup" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="signin" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__email-container">
            <h2 className="header__email">{props.email}</h2>
            <button className="header__button" onClick={props.onSignOut}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default withRouter(Header);