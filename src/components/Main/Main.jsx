import pencil from "../../assets/images/pencil.svg";
import plusSign from "../../assets/images/plussign.svg";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Card/ImagePopup/ImagePopup";
import CurrentUserContext from "../../contexts/currentUserContext";

import { useContext, useState } from "react";

export default function Main({
  onOpenPopupImage,
  onOpenPopup,
  onClosePopup,
  popup,
  popupImage,
  cards,
  onCardDelete,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [pencilState, setPencilState] = useState(false);

  const newCardPopup = { title: "New card", children: <NewCard /> };
  const EditProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const EditAvatarPopup = { title: "Change Image", children: <EditAvatar /> };

  function handleCardClick(card) {
    const imagePopup = {
      children: <ImagePopup card={card} onClose={onClosePopup} />,
    };
    onOpenPopupImage(imagePopup);
  }

  function handlePencilState(value) {
    setPencilState(value);
  }

  return (
    <main className="main">
      <section className="profile">
        <div
          onClick={() => {
            onOpenPopup(EditAvatarPopup);
          }}
          className="profile-container"
          onMouseEnter={() => handlePencilState(true)}
          onMouseLeave={() => handlePencilState(false)}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className={
              "profile__image" + (pencilState ? " profile__image-opacity" : "")
            }
          />
          <img
            src={pencil}
            alt="icone de edição"
            className={
              pencilState
                ? "image-profile-pincel-active"
                : "image-profile-pincel"
            }
          />
        </div>
        <div className="profile__feat">
          <h1 className="profile__title">{currentUser.name}</h1>
          <div
            className="profile__border-pincel"
            onClick={() => onOpenPopup(EditProfilePopup)}
          >
            <img
              src={pencil}
              alt="icone de um pincel"
              className="profile__pincel"
            />
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <div
          className="profile__border-plus"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img src={plusSign} alt="icone de adição" className="profile__plus" />
        </div>
      </section>
      <ul className="photos">
        {cards &&
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        ;
      </ul>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      {popupImage && <div>{popupImage.children}</div>}
    </main>
  );
}

Main;
