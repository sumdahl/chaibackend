import multer from "multer";
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const filename = nanoid(8);
    cb(null, `${file.fieldname}-${filename}`);
  },
});

export const upload = multer({ storage: storage });
