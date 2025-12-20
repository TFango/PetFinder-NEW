import "./homeLayout.css";

export function homeLayout() {
  const div = document.createElement("div");

  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="lb-main">
      <div class="lb-main__container">
        <img src="src/assets/img-home.svg" alt="" class="lb-main__img-logo" />

        <section class="lb-main__info">
          <h1 class="lb-main__title">Pet Finder App</h1>
          <p class="lb-main__description">
            Encontrá y reportá mascotas perdidas cerca de tu ubicación
          </p>
        </section>

        <section class="lb-main__buttons">
            <div id="slot-btnUbi"></div>
            <div id="slot-btnInfo"></div>
        </section>
      </div>
    </main>
  `;

  return div;
}
