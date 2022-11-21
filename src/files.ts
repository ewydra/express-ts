import { Router, Request } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { pipeline } from "stream/promises";
import { createGunzip, createGzip } from "zlib";
import { createReadStream, createWriteStream, ReadStream } from "fs";
import passport from "passport";
import datasource from "./datasource";
import { File } from "./file.entity";

interface FileRequest extends Request {
  source?: ReadStream;
}

export const router = Router();

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const uuid = uuidv4();
    const extension = file.originalname.split(".").at(-1);
    callback(null, `${uuid}.${extension}`);
  },
});
const upload = multer({ storage });

async function do_gzip(input: string, output: string) {
  const gzip = createGzip();
  const source = createReadStream(input);
  const destination = createWriteStream(`uploads/${output}`);
  await pipeline(source, gzip, destination);
}

router.param("fileId", async (req: FileRequest, res, next, id) => {
  const file = await datasource
    .getRepository(File)
    .findOne({ where: { id: req.params.fileId } });

  if (!file) {
    throw new Error("File does not exist");
  }
  const source = createReadStream(`${file.path}.gz`);
  req.source = source;
  next();
});

router.post(
  "/",
  passport.authenticate("jwt"),
  upload.single("file"),
  (req, res) => {
    const { filename, path } = req.file ?? {};
    if (path) {
      do_gzip(path, `${filename}.gz`).catch((err) => {
        console.error("An error occurred:", err);
        process.exitCode = 1;
      });
    }
    res.end();
  }
);

router.get(
  "/:fileId",
  passport.authenticate("jwt"),
  (req: FileRequest, res) => {
    pipeline(req.source!, createGunzip(), res);
  }
);
