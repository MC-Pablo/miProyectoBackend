import { Router } from "express";

const router = Router();


const products = [];


router.get("/:cid", (req, res) => {
    res.send({ products });
});

router.post("/", (req, res) => {
    const { id, product} = req.body;

    products.push({ id, product });
    res.send({ status: "success" })
});




export default router;







