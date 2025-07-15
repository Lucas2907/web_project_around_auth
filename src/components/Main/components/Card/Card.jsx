import { useState } from "react";
import trashIcon from "../../../../assets/images/Trash.svg";
import hearthIcon from "../../../../assets/images/hearth.svg";
import Union from "../../../../assets/images/Union.svg";

export default function Card(props) {
  const { name, link } = props.card;
  const [isLiked, setIsLiked] = useState(false);

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
        alt="a trash  icon"
      />
      <div className="photos__elements">
        <h2 className="photos__elements-text">{name}</h2>
        <img
          onClick={() => setIsLiked(!isLiked)}
          className="photos__like"
          src={!isLiked ? hearthIcon : Union}
          alt=""
        />
      </div>
    </li>
  );
}
