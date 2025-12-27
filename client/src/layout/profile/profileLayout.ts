import "./profileLayout.css";

export function profileLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="p-main">
      <div class="p-main__container">

          <h1 class="p-main__title">Datos personales</h1>

        <form class="p-form">
          <div class="p-form__group">
            <label for="" class="p-label">NOMBRE</label>
            <input id="name" class="p-input" type="text">
          </div>

          <div class="p-form__group">
            <label for="" class="p-label">LOCALIDAD</label>
            <input id="location" class="p-input" type="text">
          </div>

          </form>

          <div id="slot-btn" class="p-btn"></div>
      </div>
    </main>
  `;

  return div;
}
