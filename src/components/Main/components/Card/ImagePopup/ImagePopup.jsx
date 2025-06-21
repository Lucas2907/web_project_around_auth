import plusSign from "../../../../../assets/images/plussign.svg";

export default function ImagePopup(props) {
  const { name, link } = props.card;
  return (
    <div className="popup-sobreposition">
      <div className="popup-image">
        <img className="popup-image__image" src={link} alt={name} />
        <p className="popup-image__text">{name}</p>
        <img
          src={plusSign}
          alt="imagem de um icone de fechar"
          className="popup__close-button popup__close-button_image"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
