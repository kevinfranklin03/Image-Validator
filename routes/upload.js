import express from "express"
import upload from "../middleware/multerConfig.js";
import { uploadLocal } from "../controllers/uploadLocal.js";
import { uploadRandom } from "../controllers/uploadRandom.js";

const router = express.Router();

router.post("/upload-local", upload.single("image") , uploadLocal);
router.post("/upload-random", upload.single("image") , uploadRandom);
export default router;