import avatar from "../../assets/images/Lago-Louise.jpg";
import pencil from "../../assets/images/pencil.svg";
import plusSign from "../../assets/images/plussign.svg";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Card/ImagePopup/ImagePopup";

import { useState } from "react";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

console.log(cards);

export default function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "New card", children: <NewCard /> };
  const EditProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const EditAvatarPopup = { title: "Change Image", children: <EditAvatar /> };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(card) {
    const imagePopup = {
      title: "",
      children: <ImagePopup card={card} onClose={handleClosePopup} />,
    };
    handleOpenPopup(imagePopup);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-container">
          <img
            src={avatar}
            alt="Imagem de uma senhor sorridente, com touca vermelha esboçando um lindo sorriso"
            className="profile__image"
            onClick={() => {
              handleOpenPopup(EditAvatarPopup);
            }}
          />
          <img
            src={pencil}
            alt="icone de edição"
            className="image-profile-pincel"
          />
        </div>
        <div className="profile__feat">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <div
            className="profile__border-pincel"
            onClick={() => handleOpenPopup(EditProfilePopup)}
          >
            <img
              src={pencil}
              alt="icone de um pincel"
              className="profile__pincel"
            />
          </div>
          <p className="profile__text">Explorador</p>
        </div>
        <div
          className="profile__border-plus"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src={plusSign} alt="icone de adição" className="profile__plus" />
        </div>
      </section>
      <ul className="photos">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={handleCardClick} />
        ))}
        ;
      </ul>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

Main;
