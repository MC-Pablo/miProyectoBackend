const socket = io();
const productList = document.getElementById("productList");

socket.on("connect", () => {
  console.log("Conectado al Server");
});

socket.on("saludo-respuesta", (data) => {
  console.log(data.message);
});

socket.on("realTimeProducts", (realtimeproducts) => {
  realtimeproducts.forEach((product) => {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "selectedProducts";
    checkbox.value = product.id;
    listItem.appendChild(checkbox);

    const productInfo = document.createElement("span");
    productInfo.textContent = `${product.title} - Precio: ${product.price}`;
    listItem.appendChild(productInfo);

    productList.appendChild(listItem);
  });

  const productForm = document.getElementById("productForm");
  const addToCartButton = document.getElementById("addToCartButton");
  let selectedProducts = [];
  productForm.addEventListener("change", (event) => {
    if (
      event.target.type === "checkbox" &&
      event.target.name === "selectedProducts"
    ) {
      let selectedProducts = Array.from(
        productForm.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);
    }
  });

  addToCartButton.addEventListener("click", () => {
    console.log("Productos agregados al carrito:", selectedProducts);
  });
});

socket.on("disconnect", () => {
  console.log("Se desconecto el server");
});
