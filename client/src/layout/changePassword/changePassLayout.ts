import "./changePassLayout.css";

export function changePassLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

    <main class="cp-main">
      <div class="cp-main__container">

        <h1 class="cp-main__title">Contraseña</h1>

        <form class="cp-form" id="password-form">
          <div class="cp-form__group">
            <label for="" class="cp-label">CONTRASEÑA</label>
            <input id="pass" class="cp-input" type="password">
          </div>

          <div class="cp-form__group">
            <label for="" class="cp-label">CONFIRMAR CONTRASEÑA</label>
            <input id="confirmPass" class="cp-input" type="password">
          </div>

          </form>

          <div id="slot-btn" form="password-form" class="cp-btn"></div>
      </div>
    </main>
  `;

  return div;
}
