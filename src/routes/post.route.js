import { Router } from "express";
const router = Router();
import { index, store } from "../controllers/post.controller.js";
import { checkSchema } from "../middleware/post.js";
import { checkAuth } from "../middleware/auth.js";

router.get("/", index);
router.post("/store", [checkSchema, checkAuth], store);

export default router;
