import { Router } from "express";
import products from "../files/products.json" assert { type: 'json' };



const router = Router();

const generateId = () => {
  let mayorId = 0;

  products.forEach((p) => {
      if (p.id > mayorId) {
          mayorId = p.id;
      }
  });

  return mayorId + 1;
};



router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;

  const product = products.find((p) => p.id === Number(pid));

  if (!product) {
    return res
      .status(400)
      .send({ status: "error", message: "Producto no encontrado" });
  }

  return res.status(200).send({ status: "success", payload: product });
});

router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category } = req.body;

  if (!title || !description || !code || !price || !status ||!stock || !category)  {
      return res.status(400).send({ status: "error", message: "Datos incompletos" });
  }

  
  products.push({ id: generateId(), title, description, code, price, status, stock, category });

  return res.status(201).send({ status: "success", message: "Nuevo producto agregado" });
});


router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, status, stock, category } = req.body;
  const index = products.findIndex((p) => p.id === Number(pid));

  if (index < 0) {
      return res.status(400).send({ status: "error", message: "Usuario no encontrado" });
  }

  if (!title || !description || !code || !price || !status ||!stock || !category) {
      return res.status(400).send({ status: "error", message: "Datos incompletos" });
  }


  products[index] = { id: Number(pid), title, description, code, price, status, stock, category };

  return res.status(200).send({ status: "success", message: "El producto se ha modificado" });
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  const index = products.findIndex((p) => p.id === Number(pid));

  if (index < 0) {
      return res.status(400).send({ status: "error", message: "Producto no encontrado" });
  }

  products.splice(indice, 1);

  return res.status(200).send({ status: "success", message: "El producto se ha eliminado" });
});




export default router;
