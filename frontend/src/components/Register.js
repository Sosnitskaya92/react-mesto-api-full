import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as Auth from "../utils/Auth";

function Register(props) {

  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegisterSubmit(
      {
        email: values.email,
        password: values.password,
      },
      () =>
        setValues({
          email: '',
          password: '',
        })
    );
  }
  
  return (
    <div className="login">
    <form className="login__form" name="form__login" onSubmit={handleSubmit}>
      <h2 className="login__title">Регистрация</h2>
      <input className="login__input login__input_type_email" type="email" name="email" id="email-input" placeholder="Email"  required minLength="2" maxLength="40" value={values.email || ''} onChange={handleChange} />
      <span className="login__input-error email-input-error"></span>
      <input className="login__input popup__input_type_password" type="password" name="password" id="password-input" placeholder="Пароль"  required minLength="2" maxLength="200" value={values.password || ''} onChange={handleChange} />
      <span className="login__input-error password-input-error"></span>
      <button className="login__enter" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      <Link to="/signin" className="login__link link">Уже зарегистрированы? Войти </Link>
    </form>
  </div>
  );
};

export default withRouter(Register);
