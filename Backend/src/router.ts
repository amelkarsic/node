import { Router } from 'express';
import { body, checkSchema } from "express-validator";
import { errorHandler } from './middlewares';
import { postUpdateSchema, putUpdateSchema } from './validators/update';
import { deleteProduct, getProduct, getProducts, postProduct } from './handlers/products';
import { getUpdates, postUpdate } from './handlers/update';

const router = Router();

/**
 * Product
 */
router.get("/products", getProducts);

router.get("/product/:id", getProduct);

router.post("/product", [body('name').isString(), errorHandler], postProduct);

router.put("/product/:id", [body('name').isString(), errorHandler], (req, res) => {
});

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/updates", getUpdates);

router.get("/update/:id", (req, res) => { });

router.post("/update", [checkSchema(postUpdateSchema), errorHandler], postUpdate);

router.put("/update/:id", [checkSchema(putUpdateSchema), errorHandler], (req, res) => { });

router.delete("/update/:id", (req, res) => { });

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => { });

router.get("/updatepoint/:id", (req, res) => { });

router.post("/updatepoint", (req, res) => { });

router.put("/updatepoint/:id", (req, res) => { });

router.delete("/updatepoint/:id", (req, res) => { });

export default router;