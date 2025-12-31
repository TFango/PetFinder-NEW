import "./editPetLayout.css";

export function editPetLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
   <div id="slot-header"></div>

  <main class="ep-main">
    <div class="ep-main__container">
        <div class="ep-main__info">
            <h1 class="ep-main__title">Editar reporte de mascota</h1>
        </div>

        <form class="ep-form" id="form">
            <div class="ep-form__group">
                <label class="label">NOMBRE</label>
                <input class="input" type="text" id="name">
            </div>

            <div class="ep-form__group">
            <div id="slot-dropzone" class="dropzone"></div>
            <p class="ep-form__dropzone-description">Agrega una foto de tu mascota</p>
            </div>

            <div id="btn-picture"></div>

            <div class="ep-form__group">
            <div class="map" id="slot-map" style="height: 300px;"></div>
            <p class="ep-form__map-description">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</p>
            </div>
          


            <div class="ep-form__group">
            <label class="label">UBICACION</label>
            <input class="input" type="text" id="location-input" readonly>
            </div>

            <div id="btn-save"></div>

            <div id="btn-report"></div>
            
            <div id="btn-cancel"></div>
        </form>
    </div>
  </main>
  `;

  return div;
}
