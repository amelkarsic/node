import { validationResult } from "express-validator";

export const errorHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next();
        return;
    }

    res.status(400);
    res.json({ errors: errors.array() });
}