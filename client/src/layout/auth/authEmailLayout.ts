import "./authEmailLayout.css";

export function loginLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

   <main class="ah-main">
      <div class="ah-main__container">
        <img src="src/assets/authLogo.svg" alt="" class="ah-main__img-logo" />

        <section class="ah-main__info">
          <h1 class="ah-main__title">Ingresar</h1>
          <p class="ah-main__description">
            Ingresá tu email para continuar.
          </p>
        </section>
        
        <form class="ah-form">
            <label for="" class="ah-label">EMAIL</label>
            <input class="ah-input" type="email">
            <div id="slot-btn"></div>
        </form>

        <section class="ah-email">
          <label class="ah-label-email" for="">Aún no tenes cuenta?</label>
          <a class="ah-link" href="">Registrate.</a>
        </section>

      </div>
    </main>
  `;

  return div;
}
