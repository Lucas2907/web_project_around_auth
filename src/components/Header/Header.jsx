import logo from "../../assets/images/header.svg";
import { Link } from "react-router-dom";
export default function Header({ children, path }) {
  return (
    <header className="header">
      <div className="header__elements">
        <img src={logo} alt="imagem da logo" className="header__logo" />
        <Link to={path} className="auth__link">
          {children}
        </Link>
      </div>
      <hr className="header__line" />
    </header>
  );
}
