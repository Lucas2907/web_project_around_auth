import trashIcon from "../../../../assets/images/Trash.svg";
import hearthIcon from "../../../../assets/images/hearth.svg";

export default function Card(props) {
  const { name, link } = props.card;

  return (
    <li className="photos__card">
      <img
        className="photos__card-image"
        src={link}
        alt={name}
        onClick={() => props.onCardClick(props.card)}
      />
      <img
        className="photos__delete-icon"
        src={trashIcon}
        alt="a trash can icon"
      />
      <div className="photos__elements">
        <h2 className="photos__elements-text">{name}</h2>
        <img className="photos__like" src={hearthIcon} alt="" />
      </div>
    </li>
  );
}
