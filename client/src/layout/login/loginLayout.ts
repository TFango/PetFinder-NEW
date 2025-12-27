import "./loginLayout.css";

export function loginLayout() {
  const div = document.createElement("div");

  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="lg-main">
      <div class="lg-main__container">

        <section class="lg-main__info">
          <h1 class="lg-main__title">Iniciar Sesión</h1>
          <p class="lg-main__description">
            Ingresá los siguientes datos para iniciar sesión
          </p>
          <p class="lg-main__login-error" hidden></p>
        </section>

        
        <form class="lg-form" id="login-form">
          <div class="lg-form__group">
            <label for="" class="lg-label">EMAIL</label>
            <input id="email" class="lg-input" type="email">
          </div>

          <div class="lg-form__group">
            <label for="" class="lg-label">CONTRASEÑA</label>
            <input id="password" class="lg-input" type="password">
          </div>

          <a class="lg-link" href="">Olvidé mi contraseña</a>
          </form>

          <div id="slot-btn" form="login-form" class="lg-btn"></div>
      </div>
    </main>
  
  `;

  return div;
}
