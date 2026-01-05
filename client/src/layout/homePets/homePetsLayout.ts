import "./homePetsLayout.css";

export function homePetsLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <div id="slot-header"></div>

    <main class="hp-main">
      <div class="hp-main__container">
        <h1 class="hp-main__title">Mascotas perdidas cerca</h1>

        <section id="pets-list" class="hp-pets__list"></section>
      </div>
    </main>
  `;

  return div;
}
