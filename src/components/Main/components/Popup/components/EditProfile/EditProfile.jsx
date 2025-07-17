import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../../contexts/currentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser({ name, about });
  };

  return (
    <form
      id="profile-form"
      className="popup__forms popup__forms-profile"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs">
        <div className="popup__inputs-container">
          <input
            className="popup__input popup__input-name"
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            required=""
            minLength={2}
            maxLength={40}
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error name-error" />
        </div>
        <div className="popup__inputs-container">
          <input
            className="popup__input popup__input-about-me"
            type="text"
            id="aboutme"
            name="about"
            placeholder="Sobre mim"
            required=""
            minLength={2}
            maxLength={200}
            value={about}
            onChange={handleAboutChange}
          />
          <span className="popup__input-error aboutme-error" />
        </div>
      </div>
      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
