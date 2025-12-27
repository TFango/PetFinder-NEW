import { createDropzoneComponent } from "../components/dropzone/dropzone";
import { createHeader } from "../components/header/header";
import { reportPetLayout } from "../layout/reportPet/reportPetLayout";

export function reportPetPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = reportPetLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const slotDropzone = view.querySelector<HTMLDivElement>("#slot-dropzone");
  if (slotDropzone) {
    const startDropzone = createDropzoneComponent({
      element: slotDropzone,
      maxFiles: 1,
      acceptedFiles: "image/*",
      maxFilesizeMB: 5,
    });
  }
}
