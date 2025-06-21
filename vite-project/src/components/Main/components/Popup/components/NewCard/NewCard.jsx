export default function NewCard() {
  return (
    <form
      id="creation-form"
      className="popup__forms popup__forms-creation"
      noValidate=""
    >
      <div className="popup__inputs">
        <div className="popup__inputs-container">
          <input
            className="popup__input"
            type="text"
            id="title"
            name="title"
            placeholder="Título"
            required=""
            minLength={2}
            maxLength={30}
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
            required=""
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
