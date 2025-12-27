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

        <form class="rp-form">
            <div class="rp-form__group">
                <label class="label">Nombre</label>
                <input class="input" type="text">
            </div>

            <div id="slot-dropzone" class="dropzone"></div>

            <div id="slot-btn"></div>

            
        
        </form>
    
    </div>
  </main>
  `;

  return div;
}
