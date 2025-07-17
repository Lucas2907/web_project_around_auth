import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/currentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);

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

  const handleUpdateAvatar = (data) => {(async () => {
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

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
