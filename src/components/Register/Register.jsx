import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const xssPattern = /[<>"'();/\\[\]{}=|:]/;
    return emailPattern.test(email) & !xssPattern.test(email);
  }

  function isSafePassword(password) {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/;
    return passwordPattern.test(password);
  }

  useEffect(() => {
    setIsValid(isSafePassword(password) && isValidEmail(email));
  }, [email, password]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
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
            <table className="password__checklist">
              <tbody>
                <tr className="password__container">
                  <td className="password__table">
                    {/[a-z]/.test(password) ? (
                      <div className="check__icon icon" alt="check icon" />
                    ) : (
                      <div className="wrong__icon icon" alt="wrong icon" />
                    )}
                  </td>
                  <td className="password__table">
                    Ao menos uma letra minúscula
                  </td>
                </tr>
                <tr className="password__container">
                  <td className="password__table">
                    {/[A-Z]/.test(password) ? (
                      <div className="check__icon icon" alt="check icon" />
                    ) : (
                      <div className="wrong__icon icon" alt="wrong icon" />
                    )}
                  </td>
                  <td className="password__table">
                    Ao menos uma letra maiúscula
                  </td>
                </tr>
                <tr className="password__container">
                  <td className="password__table">
                    {/\d/.test(password) ? (
                      <div className="check__icon icon" alt="check icon" />
                    ) : (
                      <div className="wrong__icon icon" alt="wrong icon" />
                    )}
                  </td>
                  <td className="password__table">Ao menos um número</td>
                </tr>
                <tr className="password__container">
                  <td className="password__table">
                    {/[$*&@#!]/.test(password) ? (
                      <div className="check__icon icon" alt="check icon" />
                    ) : (
                      <div className="wrong__icon icon" alt="wrong icon" />
                    )}
                  </td>
                  <td className="password__table">
                    Ao menos um símbolo: $ * & @ # !
                  </td>
                </tr>
                <tr className="password__container">
                  <td className="password__table">
                    {password.length >= 8 ? (
                      <div className="check__icon icon" alt="check icon" />
                    ) : (
                      <div className="wrong__icon icon" alt="wrong icon" />
                    )}
                  </td>
                  <td className="password__table">Pelo menos 8 caracteres</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="auth__actions">
            <button
              className={
                "auth__submit " + (isValid ? "" : "auth__submit-disabled")
              }
              type="submit"
              disabled={!isValid}
            >
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
