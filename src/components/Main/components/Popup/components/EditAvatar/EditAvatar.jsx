import { useContext, useRef, useState } from "react";
import CurrentUserContext from "../../../../../../contexts/currentUserContext";

export default function EditAvatar() {
  const avatar = useRef(null);
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateAvatar } = userContext;
  const [currentValue, setCurrentValue] = useState(currentUser.avatar);

  
  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  const handleInputChange = (evt) => {
    setCurrentValue(evt.target.value);
  };
  return (
    <form
      id="imageProfile-form"
      className="popup__forms popup__forms-imageProfile"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs-container">
        <input
          className="popup__input popup__input-link"
          type="url"
          id="url"
          name="url"
          placeholder="Link da imagem"
          required
          value={currentValue}
          onChange={handleInputChange}
          ref={avatar}
        />
        <span className="popup__input-error url-error" />
      </div>
      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
