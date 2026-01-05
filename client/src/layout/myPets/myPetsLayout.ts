import "./myPetsLayout.css";

export function myPetsLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="mp-main">
    <div class="mp-main__container">
        <h1 class="mp-main__title">Mascotas reportadas</h1>
        <section id="pets-list" class="pets-list"></section>
    </div>
  </main>
  `;

  return div;
}
