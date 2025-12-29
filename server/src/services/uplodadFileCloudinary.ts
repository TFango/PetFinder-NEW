import cloudinary from "../lib/cloudinary";

export function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "pets" }, (error, result) => {
        if (error || !result) {
          reject(error);
          return;
        }
        resolve(result.secure_url);
      })
      .end(buffer);
  });
}
