import { Router } from "express";
const router = Router();
import { index, store } from "../controllers/post.controller.js";
import { checkSchema, semanticTitleCheck, semanticDescCheck } from "../middleware/post.js";
import { checkAuth } from "../middleware/auth.js";

router.get("/", index);
router.post("/store", [checkAuth, checkSchema, semanticTitleCheck, semanticDescCheck], store);

export default router;
