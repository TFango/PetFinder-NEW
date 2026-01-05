import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import "./dropzone.css"

type DropzoneComponentOptions = {
  element: HTMLElement;
  maxFiles?: number;
  acceptedFiles?: string;
  maxFilesizeMB?: number;
};

export function createDropzoneComponent({
  element,
  maxFiles = 3,
  acceptedFiles = "image/*",
  maxFilesizeMB = 5,
}: DropzoneComponentOptions) {
  if (!element) {
    throw new Error("Dropzone: element is required");
  }

  Dropzone.autoDiscover = false;

  const dz = new Dropzone(element, {
    url: "/", // no se usa
    autoProcessQueue: false,
    maxFiles,
    acceptedFiles,
    maxFilesize: maxFilesizeMB,
    addRemoveLinks: true,
  });

  return {
    getFiles() {
      return dz.files;
    },
    openFileDialog() {
      dz.hiddenFileInput?.click();
    },
    clear() {
      dz.removeAllFiles(true);
    },
    setImageFromUrl(imageUrl: string) {
      const mockFile: any = {
        name: "image",
        size: 123456,
        accepted: true,
      };

      dz.emit("addedfile", mockFile);
      dz.emit("thumbnail", mockFile, imageUrl);
      dz.emit("complete", mockFile);

      dz.files.push(mockFile);
    },
    destroy() {
      dz.destroy();
    },
  };
}
