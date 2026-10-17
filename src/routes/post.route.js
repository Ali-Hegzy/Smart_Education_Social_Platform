const express = require("express");
const router = express.Router();
const { index, store } = require("../controllers/post.controller");
const { checkSchema } = require("../middleware/post");
const { checkAuth } = require("../middleware/auth");

router.get("/", index);
router.post("/store", [checkSchema, checkAuth], store);

module.exports = router;
