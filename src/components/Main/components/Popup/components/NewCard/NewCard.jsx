import CurrentUserContext from "../../../../../../contexts/currentUserContext";
import { useContext, useState } from "react";
export default function NewCard() {
  const userContext = useContext(CurrentUserContext);
  const { handleAddPlaceSubmit } = userContext;
  const [localName, setLocalName] = useState();
  const [url, setUrl] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddPlaceSubmit({ name: localName, link: url });
  };

  const handleLocalName = (evt) => {
    setLocalName(evt.target.value);
  };

  const handleUrl = (evt) => {
    setUrl(evt.target.value);
  };

  return (
    <form
      id="creation-form"
      className="popup__forms popup__forms-creation"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs">
        <div className="popup__inputs-container">
          <input
            className="popup__input"
            type="text"
            id="title"
            name="title"
            placeholder="Título"
            required
            minLength={2}
            maxLength={30}
            onChange={handleLocalName}
          />
          <span className="popup__input-error title-error" />
        </div>
        <div className="popup__inputs-container">
          <input
            className="popup__input"
            type="url"
            id="url"
            name="url"
            placeholder="Link da imagem"
            required
            onChange={handleUrl}
          />
          <span className="popup__input-error url-error" />
        </div>
      </div>
      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
