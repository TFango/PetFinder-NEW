import "./reportPetLayout.css";

export function reportPetLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="rp-main">
    <div class="rp-main__container">
        <div class="rp-main__info">
            <h1 class="rp-main__title">Reportar mascota</h1>
            <p class="rp-main__description">Ingresá la siguiente información para realizar el reporte de la mascota</p>
        </div>

        <form class="rp-form" id="form">
            <div class="rp-form__group">
                <label class="label">NOMBRE</label>
                <input class="input" type="text" id="name">
            </div>

            <div class="rp-form__group">
            <div id="slot-dropzone" class="dropzone"></div>
            <p class="rp-form__dropzone-description">Agrega una foto de tu mascota</p>
            </div>

            <div id="btn-picture"></div>

            <div class="rp-form__group">
            <div id="slot-map" style="height: 300px;"></div>
            <p class="rp-form__map-description">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</p>
            </div>
          


            <div class="rp-form__group">
            <label class="label">UBICACION</label>
            <input class="input" type="text" id="location-input" readonly>
            </div>

            <div id="btn-report"></div>

            <div id="btn-cancel"></div>
        </form>
    
    </div>
  </main>
  `;

  return div;
}
