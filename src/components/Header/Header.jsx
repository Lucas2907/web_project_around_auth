import logo from "../../assets/images/header.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="imagem da logo" className="header__logo" />
      <hr className="header__line" />
    </header>
  );
}


