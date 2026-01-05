import "./reportEmptyLayout.css";

export function reportEmptyLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="re-main">
    <div class="re-main__container">
        <section class="re-main__info">
            <h1 class="re-main__title">Mascotas reportadas</h1>
            <p class="re-main__description">Aún no reportaste mascotas perdidas</p>
        </section>

        <img class="re-main__img" src="src/assets/noPets.png" alt="">

        <div id="slot-btn"></div>
    </div>  
  </main>

  `;

  return div;
}
