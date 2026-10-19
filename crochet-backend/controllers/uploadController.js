import cloudinary from "../config/cloudinary.js";

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No image file provided");
    }

    // Upload the buffer to Cloudinary using a stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "loop-and-bloom/products" },
      (error, result) => {
        if (error) {
          return next(error);
        }
        res.json({ url: result.secure_url });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    next(err);
  }
}