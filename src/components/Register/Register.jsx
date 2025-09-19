import { React, useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ email, password });
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Inscrever-se</h2>

        <input
          className="auth__input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth__submit" type="submit">
          Inscrever-se
        </button>

        <p className="auth__text">
          Já é um membro?
          <Link to="/signin" className="auth__link">
            Faça o login aqui!
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
