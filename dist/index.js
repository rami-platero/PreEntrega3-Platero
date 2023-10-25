/* // Inicializar carrito

// lista de productos

// Funcion que dinamicamente muestra distintos prompts en caso de que tengamos un total a pagar
const optionsPrompt = () => {
  if (cart.total > 0) {
    return prompt(
      `¡Bienvenido a Gaming Components!\nNos complace ofrecerte una experiencia excepcional de compra de componentes para juegos. En nuestro catálogo, encontrarás una amplia selección de las últimas y más avanzadas tarjetas gráficas de alta gama.\nDESCUENTO: Si el monto total de tu compra supera los $10000 USD se aplicará un descuento del 20%!\n\nPara continuar selecciona una opción ingresando el número correspondiente en el menu de opciones.\nMonto total: $${cart.total.toLocaleString(
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
const handleShop = () => {
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

// Retorna la lista de productos del carrito en un formato legible
const getCartList = () => {
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

// Retorna un item del carrito en base a la opcion que el usuario eliga
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

// Funcion para acutalizar la cantidad de un item en el carrito
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

// Funcion para quitar item del carrito
const removeItemFromCart = () => {
  const selectedItem = selectCartItem("quitar");
  const index = cart.products.indexOf(
    (product) => product.name === selectedItem.name
  );
  // remove item from cart products array
  cart.products.splice(index, 1);

  return updateCartTotal();
};

// Handler para la opcion del carrito
const handleCart = () => {
  const cartList = getCartList();

  let option;
  if (!cart.products.length) {
    return alert(`Tu carrito de compras esta vacio!`);
  } else {
    option = prompt(
      `Tu carrito de compras\n\n${cartList}\nTotal: $${cart.total.toLocaleString(
        "en-US"
      )}.00\n\nPara realizar cambios en el carrito de compras selecciona una opción ingresando el número correspondiente en el menu de opciones.\n\n1. Actualizar la cantidad de un producto.\n2. Quitar un producto del carrito de compras\nIngresa SALIR para volver al menú principal.`
    );

    while (option.trim().toUpperCase() !== "SALIR") {
      switch (Number(option)) {
        case 1:
          updateItemQuantity();
          return viewCart();
        case 2:
          removeItemFromCart();
          return handleCart();
        default:
          alert("Ingresa una opcion valida.");
          break;
      }
      option = prompt(
        `Tu carrito de compras\n\n${cartList}\nTotal: $${cart.total.toLocaleString(
          "en-US"
        )}.00\n\nPara realizar cambios en el carrito de compras selecciona una opción ingresando el número correspondiente en el menu de opciones.\n\n1. Actualizar la cantidad de un producto.\n2. Quitar un producto del carrito de compras\nIngresa SALIR para volver al menú principal.`
      );
    }
  }
  return;
};

// Renderiza dinamicamente el prompt en base a si somos aplicables al descuento del 20% (retorna true si se realiza el pago)
const pay = (message = "", final = cart.total) => {
  const cartList = getCartList();
  let option;
  option = prompt(
    `${message}\n\nResumen\n${cartList}\nSubtotal: $${cart.total.toLocaleString(
      "en-US"
    )}.00\nTotal: $${final.toLocaleString(
      "en-US"
    )}.00\n\nPara realizar el pago ingresa PAGAR.\nPara volver al menu principal ingresa SALIR`
  );
  while (
    option.trim().toUpperCase() !== "SALIR" &&
    option.trim().toUpperCase() !== "PAGAR"
  ) {
    alert("Ingresa una opcion valida");
    option = prompt(
      `${message}\n\nResumen\n${cartList}\nSubtotal: $${cart.total.toLocaleString(
        "en-US"
      )}.00\nTotal: $${final.toLocaleString(
        "en-US"
      )}.00\n\nPara realizar el pago ingresa PAGAR.\nPara volver al menu principal ingresa SALIR`
    );
  }
  if (option.trim().toUpperCase() === "PAGAR") {
    return true;
  }
  return false;
};

// handler para la opcion de checkout
const handlePayment = () => {
  // chequea si el monto total es aplicable al descuento
  if (cart.total >= 10000) {
    let final = cart.total - (20 * cart.total) / 100;
    return pay(
      "Tu monto supera los $10,000.00 USD por lo tanto es aplicable al descuento!",
      final
    );
  } else {
    return pay(
      "Tu monto no supera los $10,000.00 USD, por lo tanto no se le aplicará el descuento."
    );
  }
};

// Funcion principal
const main = () => {
  let option;
  option = optionsPrompt();

  while (option.trim().toUpperCase() !== "SALIR") {
    switch (Number(option)) {
      case 1:
        handleShop();
        break;
      case 2:
        handleCart();
        break;
      case 3:
        if (cart.total === 0) {
          alert(
            "No puedes continuar con el pago porque no has agregado ningún producto al carrito aún."
          );
        } else {
          if (handlePayment()) {
            // Si retorna true es porque el usuario pagó
            return;
          } else {
            // De lo contrario vuelve al menu principal
            break;
          }
        }
      default:
        alert("Ingresa una opcion valida.");
        break;
    }
    option = optionsPrompt();
  }
}; */

//main();


