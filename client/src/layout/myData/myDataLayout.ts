import "./myDataLayout.css";

export function myDataLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="md-main">
      <div class="md-main__container">

          <h1 class="md-main__title">Mis datos</h1>

          <section class="md-main__buttons">
            <div id="slot-btnData"></div>
            <div id="slot-btnPass"></div>
          </section>
        
        <section class="md-main__logout">
            <p id="email" class="md-main__email"></p>
            <button id="logout" class="md-main__btn-logout">CERRAR SESIÓN</button>
        </section>
      </div>
    </main>
  
  `;
  return div;
}
