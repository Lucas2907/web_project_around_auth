import { React, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ email, password });
  };

  return (
    <>
      <Header children={"Entrar"} path={"/signin"} />
      <div className="auth">
        <form className="auth__form" onSubmit={handleSubmit}>
          <h2 className="auth__title">Inscrever-se</h2>
          <div className="auth__inputs">
            <input
              className="auth__input"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              required
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="auth__actions">
            <button className="auth__submit" type="submit">
              Inscrever-se
            </button>
          </div>
        </form>
        <p className="auth__text">
          <Link to="/signin" className="auth__link">
            Já é membro? Faça o login aqui!
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
