// Inicializar carrito
const cart = { products: [], total: 0 };
// lista de productos
const products = [
  {
    name: "ASUS ROG Strix NVIDIA GeForce RTX 4070 Ti",
    price: 930,
  },
  {
    name: "MSI Gaming GeForce RTX 4060 Ti",
    price: 400,
  },
  {
    name: "Gigabyte GeForce RTX 4080 Gaming",
    price: 1200,
  },
  {
    name: "MSI GeForce RTX 3090 Ti",
    price: 1800,
  },
  {
    name: "ZOTAC Gaming GeForce RTX 3080 Ti",
    price: 1250,
  },
];

// Funcion que dinamicamente muestra distintos prompts en caso de que tengamos un total a pagar
const optionsPrompt = (total) => {
  if (total > 0) {
    return prompt(
      `¡Bienvenido a Gaming Components!\nNos complace ofrecerte una experiencia excepcional de compra de componentes para juegos. En nuestro catálogo, encontrarás una amplia selección de las últimas y más avanzadas tarjetas gráficas de alta gama.\nDESCUENTO: Si el monto total de tu compra supera los $10000 USD se aplicará un descuento del 20%!\n\nPara continuar selecciona una opción ingresando el número correspondiente en el menu de opciones.\nMonto total: $${total.toLocaleString(
        "en-US"
      )}.00\n\n1. Compra de productos\n2. Mi carrito\n3. Pagar\nEscribe SALIR para salir.`
    );
  } else {
    return prompt(
      `¡Bienvenido a Gaming Components!\nNos complace ofrecerte una experiencia excepcional de compra de componentes para juegos. En nuestro catálogo, encontrarás una amplia selección de las últimas y más avanzadas tarjetas gráficas de alta gama.\nDESCUENTO: Si el monto total de tu compra supera los $10000 USD se aplicará un descuento del 20%!\n\nPara continuar selecciona una opción ingresando el número correspondiente en el menu de opciones.\n\n1. Compra de productos\n2. Mi carrito\n3. Pagar\nEscribe SALIR para salir.`
    );
  }
};

// Actualiza el total del carrito en base a los productos agregados
const updateCartTotal = () => {
  const total = cart.products.reduce((newTotal, cartProduct) => {
    return (newTotal += cartProduct.total);
  }, 0);
  return (cart.total = total);
};

const main = () => {
  let option;
  option = optionsPrompt(cart.total);

  while (option.trim().toUpperCase() !== "SALIR") {
    switch (parseInt(option)) {
      case 1:
        alert("Compra de productos");
        break;
      case 2:
        alert("Carrito de compras");
        break;
      case 3:
        alert("Pagando...");
        break;
      default:
        alert("Ingresa una opcion valida.");
        break;
    }
    option = optionsPrompt(cart.total);
  }
};

main();
