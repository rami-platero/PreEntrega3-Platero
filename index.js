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

// Funcion para que el usuario ingrese la cantidad a llevar
const getQuantity = (product) => {
  let quantity;

  while (true) {
    quantity = prompt(
      `Producto seleccionado - ${
        product.name
      } - $${product.price.toLocaleString(
        "en-US"
      )}.00\nElige la cantidad que desea llevar.`
    );
    if (quantity !== null && !isNaN(quantity) && parseInt(quantity) > 0) {
      return Number(quantity);
    } else {
      alert("Ingresa una cantidad válida.");
    }
  }
};

// Calcula precio por cantidad y agrega producto al carrito de compras
const addItemToCart = (product) => {
  const cartProduct = product;
  // Chequea si el product ya esta en el carrito
  const alreadyInCart = cart.products.some((cartProduct) => {
    return cartProduct.name === product.name;
  });

  if (alreadyInCart) {
    const quantity = getQuantity(product);
    const index = cart.products.findIndex((p) => p.name === product.name);
    // update old values
    cart.products[index].quantity += quantity;
    cart.products[index].total =
      cart.products[index].price * cart.products[index].quantity;
    // update cart total
    return updateCartTotal();
  } else {
    const quantity = getQuantity(product);
    // set cart properties
    cartProduct.quantity = quantity;
    cartProduct.total = cartProduct.price * quantity;
    // add item to cart
    cart.products.push(cartProduct);
    // update cart total
    return updateCartTotal();
  }
};

// Funcion para agregar productos al carrito
const shop = () => {
  const list = products
    .map((product, index) => {
      return `${index + 1}. ${product.name} - $${product.price.toLocaleString(
        "en-US"
      )}.00\n`;
    })
    .join("");

  let option;
  option = prompt(
    `Catálogo de Productos\n\nIngresa un numero para seleccionar el producto a agregar al carrito de compras.\nEscribe SALIR para volver al menú principal.\n\n${list}`
  );

  while (option.trim().toUpperCase() !== "SALIR") {
    while (
      isNaN(option) ||
      Number(option) > products.length ||
      Number(option) < 1
    ) {
      alert("Ingresa una opcion valida.");
      option = prompt(
        `Catalogo de Productos\n\nIngresa un numero para seleccionar el producto a agregar al carrito de compras.\nEscribe SALIR para volver al menú principal.\n\n${list}`
      );
    }

    return addItemToCart(products[Number(option) - 1]);
  }
  return;
};

const getCartList = () => {
  // Pasa la lista de products a string
  return (cartList = cart.products
    .map((item, index) => {
      return `${index + 1}. ${item.name} (x${
        item.quantity
      }) - $${item.price.toLocaleString(
        "en-US"
      )}.00 c/u - Total: $${item.total.toLocaleString("en-US")}.00\n`;
    })
    .join(""));
};

const selectCartItem = (action) => {
  const cartList = getCartList();
  let option;
  option = prompt(
    `Tu carrito de compras\n\n${cartList}\nElige un producto del carrito a ${action}.`
  );
  while (
    isNaN(option) ||
    Number(option) > cart.products.length ||
    Number(option) < 1
  ) {
    alert("Ingresa una opcion valida.");
    option = prompt(
      `Tu carrito de compras\n\n${cartList}\nElige un producto del carrito a ${action}.`
    );
  }
  return cart.products[option - 1];
};

const updateItemQuantity = () => {
  const selectedItem = selectCartItem("actualizar");

  let quantity;
  quantity = prompt(
    `Producto seleccionado - ${
      selectedItem.name
    } - $${selectedItem.price.toLocaleString(
      "en-US"
    )}.00\nIngresa la nueva cantidad.`
  );
  while (isNaN(quantity) || Number(quantity) < 1) {
    alert("Ingresa una cantidad valida.");
    quantity = prompt(
      `Producto seleccionado - ${
        selectedItem.name
      } - $${selectedItem.price.toLocaleString(
        "en-US"
      )}.00\nIngresa la nueva cantidad.`
    );
  }
  const newQuantity = Number(quantity);
  selectedItem.quantity = newQuantity;
  selectedItem.total = selectedItem.quantity * selectedItem.price;

  // update product
  cart.products = cart.products.map((item) => {
    return item.name === selectedItem.name ? selectedItem : item;
  });
  // update cart total
  return updateCartTotal();
};

const removeItemFromCart = () => {
  const selectedItem = selectCartItem("quitar");
  const index = cart.products.indexOf(
    (product) => product.name === selectedItem.name
  );
  // remove item from cart products array
  cart.products.splice(index, 1);

  return updateCartTotal();
};

const viewCart = () => {
  const cartList = getCartList();

  let option;
  if (!cart.products.length) {
    return alert(`Tu carrito de compras esta vacio!`);
  } else {
    option = prompt(
      `Tu carrito de compras\n\n${cartList}\nTotal: $${cart.total.toLocaleString(
        "en-US"
      )}.00\n\nPara realizar cambios o continuar con el pago selecciona una opción ingresando el número correspondiente en el menu de opciones.\n\n1. Actualizar la cantidad de un producto.\n2. Quitar un producto del carrito de compras\n3. Continuar con el pago\nIngresa SALIR para volver al menú principal.`
    );

    while (option.trim().toUpperCase() !== "SALIR") {
      switch (Number(option)) {
        case 1:
          updateItemQuantity();
          return viewCart();
        case 2:
          removeItemFromCart();
          return viewCart();
        case 3:
          break;

        default:
          alert("Ingresa una opcion valida.");
          break;
      }
      option = prompt(
        `Tu carrito de compras\n\n${cartList}\nTotal: $${cart.total.toLocaleString(
          "en-US"
        )}.00\n\nPara realizar cambios o continuar con el pago selecciona una opción ingresando el número correspondiente en el menu de opciones.\n\n1. Actualizar la cantidad de un producto.\n2. Quitar un producto del carrito de compras\n3. Continuar con el pago\nIngresa SALIR para volver al menú principal.`
      );
    }
  }
  return;
};

const main = () => {
  let option;
  option = optionsPrompt(cart.total);

  while (option.trim().toUpperCase() !== "SALIR") {
    switch (Number(option)) {
      case 1:
        shop();
        break;
      case 2:
        viewCart();
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
