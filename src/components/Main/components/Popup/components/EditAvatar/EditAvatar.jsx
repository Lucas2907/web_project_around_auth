export default function EditAvatar() {
  return (
    <form
      id="imageProfile-form"
      className="popup__forms popup__forms-imageProfile"
      noValidate=""
    >
      <div className="popup__inputs-container">
        <input
          className="popup__input popup__input-link"
          type="url"
          id="url"
          name="url"
          placeholder="Link da imagem"
          required=""
        />
        <span className="popup__input-error url-error" />
      </div>
      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
