import "./registerLayout.css";

export function registerLayout() {
  const div = document.createElement("div");

  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="rg-main">
      <div class="rg-main__container">

        <section class="rg-main__info">
          <h1 class="rg-main__title">Registrarse</h1>
          <p class="rg-main__description">
            Ingresá los siguientes datos para realizar el registro
          </p>
        </section>

        
        <form class="rg-form" id="register-form">
          <div class="rg-form__group">
            <label for="" class="rg-label">NOMBRE</label>
            <input id="name" class="rg-input" type="text">
          </div>

          <div class="rg-form__group">
            <label for="" class="rg-label">EMAIL</label>
            <input id="email" class="rg-input" type="email">
          </div>

          <div class="rg-form__group">
            <label for="" class="rg-label">CONTRASEÑA</label>
            <input id="password" class="rg-input" type="password">
          </div>
          <div class="rg-form__group">
            <label for="" class="rg-label">CONFIRMAR CONTRASEÑA</label>
            <input id="confirmPassword" class="rg-input" type="password">
          </div>

          <div class="rg-count">
            <label class="rg-label">Ya tenes una cuenta?</label>
            <a id="rg-link" href="">Iniciar sesión.</a>
          </div>

          </form>

          <div id="slot-btn" form="register-form"></div>
      </div>
    </main>
  
  `;

  return div;
}
