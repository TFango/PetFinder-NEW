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
        </section>

        <form class="lg-form">
            
            <label for="" class="lg-label">EMAIL</label>
            <input class="lg-input" type="email">
            <div id="slot-btn"></div>
        </form>




      </div>
    </main>
  
  `;

  return div;
}
