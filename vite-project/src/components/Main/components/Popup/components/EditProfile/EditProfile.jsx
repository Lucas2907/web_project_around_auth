export default function EditProfile() {
  return (
    <form
      id="profile-form"
      className="popup__forms popup__forms-profile"
      noValidate=""
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
