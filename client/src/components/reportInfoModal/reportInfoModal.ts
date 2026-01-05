import { createButton } from "../button/button";
import "./reportInfoModal.css";

type reportInfoModalProps = {
  petName: string;
  onSubmit: (data: { name: string; phone: string; message: string }) => void;
};

export function createReportInfoModal({
  petName,
  onSubmit,
}: reportInfoModalProps) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="modal">
        <button class="modal-close">✕</button>
        <h2>Reportar info de ${petName}</h2>

            <div class="modal-group">
            
            </div>
            <div class="modal-group"></div>
            <div class="modal-group"></div>
        <label>NOMBRE</label>
        <input id="name" />

        <label>TELÉFONO</label>
        <input id="phone" />

        <label>¿DÓNDE LO VISTE?</label>
        <textarea id="message"></textarea>

        <div id="slot-btn"></div>
    </div>
  `;
  overlay.innerHTML = `
    <div class="modal">
        <button class="modal-close">✕</button>
        <h2 class="modal-title">Reportar info de ${petName}</h2>

            <div class="modal-group">
                <label>NOMBRE</label>
                <input id="name" />
            </div>

            <div class="modal-group">
                <label>TELÉFONO</label>
                <input id="phone" />
            </div>

            <div class="modal-group">
                <label>¿DÓNDE LO VISTE?</label>
                <textarea id="message"></textarea>
            </div>
        <div id="slot-btn" class="modal-btn"></div>
    </div>
  `;

  const close = () => overlay.remove();

  overlay.querySelector(".modal-close")?.addEventListener("click", close);

  const btnSlot = overlay.querySelector<HTMLDivElement>("#slot-btn");
  const btn = createButton(
    {
      text: "Enviar informacion",
      className: "btn--reportPet",
    },
    () => {
      const name = (overlay.querySelector("#name") as HTMLInputElement).value;
      const phone = (overlay.querySelector("#phone") as HTMLInputElement).value;
      const message = (overlay.querySelector("#message") as HTMLTextAreaElement)
        .value;

      onSubmit({ name, phone, message });
      close();
    }
  );

  btnSlot?.appendChild(btn.el);

  return overlay;
}
