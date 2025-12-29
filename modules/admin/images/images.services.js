const path = require('path');
const fs = require('fs');

class ImagesService {
  constructor() {
    this.imagesDir = path.join(__dirname, '..', '..', '..', 'public', 'images');
  }

  async getImagesAll() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.imagesDir, (err, files) => {
        if (err) return reject(err);

        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .map(file => `/images/${file}`);

        resolve(images);
      });
    });
  }

  async saveImage(files) {
    if (!files || !files.image) {
      throw new Error("No file provided");
    }

    const image = files.image;
    const uploadDir = path.join(__dirname, "../../../public/images");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(image.name);
    const fileName = `uploaded_${Date.now()}${fileExt}`;
    const fullPath = path.join(uploadDir, fileName);

    await new Promise((resolve, reject) => {
      image.mv(fullPath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return {
      filename: fileName,
      path: `/images/${fileName}`,
    };
  }
}

// ✅ Export an instance with the methods available
module.exports = new ImagesService();
