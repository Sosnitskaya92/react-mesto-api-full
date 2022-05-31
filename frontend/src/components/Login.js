import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  
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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    props.onLoginSubmit(
      {
        email: values.email,
        password: values.password,
      },
      () => {
        setValues({ email: '', password: '' });
      }
    );
  }

  return (
    <div className="login">
      <form className="login__form" name="form__login" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input className="login__input login__input_type_email" type="email" name="email" id="email-input" placeholder="Email"  required minLength="2" maxLength="40" value={values.email || ''} onChange={handleChange} />
        <span className="login__input-error email-input-error"></span>
        <input className="login__input popup__input_type_password" type="password" name="password" id="password-input" placeholder="Пароль"  required minLength="2" maxLength="200" value={values.password || ''} onChange={handleChange} />
        <span className="login__input-error password-input-error"></span>
        <button className="login__enter" type="submit" aria-label="Войти">Войти</button>
      </form>
    </div>
  )
};

export default withRouter(Login);

