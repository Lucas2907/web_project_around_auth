import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/currentUserContext";
function App() {
  const [currentUser, setCurrentUser] = useState({
    about: "assas",
    avatar: "https://picsum.photos/1000",
    name: "sds",
    _id: "6bdd2ebff73d2b7d938e3ddd",
  });

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

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
