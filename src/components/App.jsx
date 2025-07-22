import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/currentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [popupImage, setPopupImage] = useState(null);
  const [popupConfirmation, setPopupConfirmation] = useState(null);
  const [cards, setCards] = useState([]);

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
    handleClosePopup();
  }

  //pega info user atual
  useEffect(() => {
    api
      .getInfoUser()
      .then((response) => {
        return !response.ok
          ? Promise.reject("Deu erro no get info user")
          : response.json();
      })
      .then((data) => {
        setCurrentUser(data);
      })

      .catch((error) => {
        console.log(`[GET]- /user-me ${error}`);
      });
  }, []);

  // atualiza info user
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then(() => {
          setCurrentUser({
            name: data.name,
            about: data.about,
            avatar: currentUser.avatar,
            _id: currentUser._id,
          });
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .changeProfileImage(data)
        .then(() => {
          setCurrentUser((oldData) => ({
            ...oldData,
            avatar: data.avatar,
          }));
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleAddPlaceSubmit = (newCard) => {
    (async () => {
      await api
        .createCard(newCard)
        .then((response) => response.json())
        .then((card) => {
          setCards([card, ...cards]);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleOpenPopupImage(popupImage) {
    setPopupImage(popupImage);
  }

  function handleOpenPopupConfirmation(popupConfirmation) {
    setPopupConfirmation(popupConfirmation);
  }

  function handleClosePopup() {
    setPopup(null);
    setPopupImage(null);
    setPopupConfirmation(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
          handleCardDelete,
          popupConfirmation,
          handleClosePopup,
        }}
      >
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onOpenPopupImage={handleOpenPopupImage}
          onOpenPopup={handleOpenPopup}
          onOpenPopupConfirmation={handleOpenPopupConfirmation}
          onClosePopup={handleClosePopup}
          popup={popup}
          popupImage={popupImage}
          popupConfirmation={popupConfirmation}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
