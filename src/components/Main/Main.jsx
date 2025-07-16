import pencil from "../../assets/images/pencil.svg";
import plusSign from "../../assets/images/plussign.svg";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Card/ImagePopup/ImagePopup";
import api from "../../utils/api";
import CurrentUserContext from "../../contexts/currentUserContext";

import { useEffect, useState, useContext } from "react";

export default function Main() {
  const currentUserInfo = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  //recebe cards inicias
  useEffect(() => {
    api
      .getInitialCards()
      .then((response) => {
        return !response.ok
          ? Promise.reject("Deu erro no Get Cards")
          : response.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(`[GET] - /cards - ${error}`);
      });
  }, []);

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

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    isLiked
      ? await api
          .removeLike(card._id)
          .then((res) => res.json())
          .then((newCard) => {
            setCards((state) => {
              return state.map((currentCard) =>
                currentCard._id === card._id ? newCard : currentCard
              );
            });
          })
          .catch((error) => console.error(error))
      : await api
          .updateLike(card._id)
          .then((res) => res.json())
          .then((newCard) => {
            setCards((state) => {
              return state.map((currentCard) =>
                currentCard._id === card._id ? newCard : currentCard
              );
            });
          })
          .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then((response) => response.json())
      .then(
        setCards(cards.filter((cardDeleted) => cardDeleted._id !== card._id))
      );
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile-container">
          <img
            src={currentUserInfo.avatar}
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
          <h1 className="profile__title">{currentUserInfo.name}</h1>
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
          <p className="profile__text">{currentUserInfo.about}</p>
        </div>
        <div
          className="profile__border-plus"
          onClick={() => handleOpenPopup(newCardPopup)}
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
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
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
