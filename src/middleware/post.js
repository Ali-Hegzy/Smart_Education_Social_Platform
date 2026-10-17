const z = require("zod");

const schema = z.object({
    title: z.string(),
    description: z.string(),
    image_path: z.string(),
});

const checkSchema = (req, res, next) => {
    const check = schema.safeParse(req.body);

    if (!check.success) {
        return res.status(400).json({
            error: "Schema Failed",
            message: check.error.message,
        });
    }

    next();
}

module.exports = { checkSchema };
