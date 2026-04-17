import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ produtos: [] });
});

router.post("/", (req, res) => {
    console.log('PARAMS', req.params);
    console.log('QUERY', req.query);
    console.log('BODY', req.body);
    res.json({ produtos: [] });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ id, name: 'Teclado XYZ', price: 100.00 });
});

export default router;