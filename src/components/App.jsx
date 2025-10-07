import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import { register, authorize, checkToken } from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [popupImage, setPopupImage] = useState(null);
  const [popupConfirmation, setPopupConfirmation] = useState(null);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    authorize(userData.email, userData.password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserEmail(userData.email);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Erro no login:", error);
        let message;
        if (error === 400) {
          message = "Um ou mais campos não foram fornecidos";
        } else if (error === 401) {
          message = "o e-mail ou senha fornecido não correspondem";
        } else {
          message = "Ops, algo deu errado! Tente novamente.";
        }
        setIsSuccess(false);
        setTooltipMessage(message);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegister = (userData) => {
    register(userData.email, userData.password)
      .then((data) => {
        setIsSuccess(true);
        setTooltipMessage("Cadastro realizado com sucesso!");
        setIsInfoTooltipOpen(true);
        console.log(data);
        navigate("/signin");
      })
      .catch(() => {
        setIsSuccess(false);
        setTooltipMessage(
          `Email fornecido ja cadastrado, faça login para aceder a plataforma!`
        );
        setIsInfoTooltipOpen(true);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.remove("jwt");
  };

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setLoggedIn(true);
          navigate("/");
          setUserEmail(userData.data.email);
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
          console.log("Token Inválido", error);
        });
    }
  }, [navigate]);

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
      )
      .catch((error) => console.error(error));
    handleClosePopup();
  }

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
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
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
                <Header
                  userEmail={userEmail}
                  path={"/signin"}
                  onSignout={handleSignOut}
                  children={"Sair"}
                />
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
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeInfoTooltip}
        isSuccess={isSuccess}
        message={tooltipMessage}
      />
    </div>
  );
}

export default App;
