import "./myPetsLayout.css";
import petImg from "../../assets/pet.png";

export function myPetsLayout() {
  const div = document.createElement("div");
  div.innerHTML = `
  <div id="slot-header"></div>

  <main class="mp-main">
    <div class="mp-main__container">
        <h1 class="mp-main__title">Mascotas reportadas</h1>
    
        <article class="mp-pet__card">
            <img class="mp-pet__card-img" src=${petImg} alt="">

            <div class="mp-pet__card-footer">
                <section class="mp-pet__card-info">
                    <h2 class="mp-pet__card-namePet">Bobby</h2>
                    <p class="mp-pet__card-location">Mar del Plata</p>
                </section>
            
                <div id="slot-btn" class="btn"></div>
            </div>
        </article>
    </div>
  </main>
  `;

  return div;
}
