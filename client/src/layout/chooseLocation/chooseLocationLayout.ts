import "./chooseLocationLayout.css";

export function chooseLocationLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
    <div id="slot-header"></div>

    <main class="cl-main">
        <div class="cl-main__container">
            <h1 class="cl-main__title">Elegí tu ubicación</h1>
            <div class="cl-main__map" id="map" style="height:300px"></div>
            <div id="slot-btn"></div>
        </div>
    </main>
  `;

  return div;
}
