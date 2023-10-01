// lista de productos
const product1 = "ASUS ROG Strix NVIDIA GeForce RTX 4070 Ti";
const product2 = "MSI Gaming GeForce RTX 4060 Ti";
const product3 = "Gigabyte GeForce RTX 4080 Gaming";
const product4 = "MSI GeForce RTX 3090 Ti";
const product5 = "ZOTAC Gaming GeForce RTX 3080 Ti";

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
// calcula el precio final basado en la cantidad de cierto producto
const calculateCost = (price, product) => {
  let amount;

  while (true) {
    amount = prompt(
      "Producto seleccionado - " +
        product +
        " - $" +
        price.toLocaleString() +
        "\nElige la cantidad que desear llevar."
    );
    if (amount !== null && !isNaN(amount) && parseInt(amount) > 0) {
      amount = parseInt(amount);
      break;
    } else {
      alert("Ingresa una cantidad válida.");
    }
  }

  return price * amount;
};

const main = (total = 0) => {
  let option;

  // si el total es diferente a 0 es porque ya hemos comprado antes.
  if (total === 0) {
    option = prompt(
      "Bienvenido a Gaming Components.\nAqui podras comprar placas de videos de ultima gama, si deseas comprar alguna, elige alguna de las opciones de la siguiente lista para continuar.\n(si el monto total supera los $10000 USD se aplicará un descuento del 20%)\n\n1. " +
        product1 +
        " - $930.00\n2. " +
        product2 +
        " - $400.00\n3. " +
        product3 +
        " - $1200.00\n4. " +
        product4 +
        " - $1800.00\n5. " +
        product5 +
        " - $1250.00\n\nEscribe SALIR para salir."
    );
  } else {
    option = prompt(
      "Bienvenido de vuelta.\nElige uno de los siguientes productos a comprar de la siguiente lista\n\nMonto total: $" +
        total.toLocaleString() +
        " USD\n\n1. " +
        product1 +
        " - $930.00\n2. " +
        product2 +
        " - $400.00\n3. " +
        product3 +
        " - $1200.00\n4. " +
        product4 +
        " - $1800.00\n5. " +
        product5 +
        " - $1250.00\n\nEscribe SALIR para salir."
    );
  }

  while (option.trim().toUpperCase() !== "SALIR") {
    switch (parseInt(option)) {
      case 1:
        total += calculateCost(930, product1);
        break;
      case 2:
        total += calculateCost(400, product2);
        break;
      case 3:
        total += calculateCost(1200, product3);
        break;
      case 4:
        total += calculateCost(1800, product4);
        break;
      case 5:
        total += calculateCost(1250, product5);
        break;
      default:
        alert("Ingresa una opcion valida.");
        break;
    }

    // prompt diferente en caso de que no hayamos agregado nada al carrito de compra
    if (total > 0) {
      option = prompt(
        "Si quieres seguir agregando productos al carrito de compras puedes elegir.\n(recuerda que si el monto total supera los $10000 USD se aplicará un descuento del 20%)\n\nMonto total: $" +
          total.toLocaleString() +
          "\n\n1. " +
          product1 +
          " - $930.00\n2. " +
          product2 +
          " - $400.00\n3. " +
          product3 +
          " - $1200.00\n4. " +
          product4 +
          " - $1800.00\n5. " +
          product5 +
          " - $1250.00\n\nEscribe SALIR para ver el monto final."
      );
    } else {
      option = prompt(
        "Bienvenido a Gaming Components.\nAqui podras comprar placas de videos de ultima gama, si deseas comprar alguna, elige alguna de las opciones de la siguiente lista para continuar.\n(si el monto total supera los $10000 USD se aplicará un descuento del 20%)\n\n1. " +
          product1 +
          " - $930.00\n2. " +
          product2 +
          " - $400.00\n3. " +
          product3 +
          " - $1200.00\n4. " +
          product4 +
          " - $1800.00\n5. " +
          product5 +
          " - $1250.00\n\nEscribe SALIR para salir."
      );
    }
  }

  // chequea si el monto total es aplicable al descuento
  if (total >= 10000) {
    let final = total - (20 * total) / 100;
    return alert(
      "Tu monto supera los $10000 por lo tanto es aplicable al descuento!\n\nEl monto final quedaría en $" +
        final.toLocaleString() +
        " USD"
    );
  } else {
    let newOption = prompt(
      "Tu monto no supera los $10000 USD, por lo tanto no se le aplicará el descuento.\n\nMonto final: $" +
        total.toLocaleString() +
        " USD" +
        "\n\nCon $" +
        (10000 - total).toLocaleString() +
        " USD mas puedes obtener el 20% de descuento, si quieres continuar comprando ingresa 1, si quieres salir ingresa SALIR"
    );
    while (
      newOption.trim().toUpperCase() !== "SALIR" &&
      parseInt(newOption) !== 1
    ) {
      alert("Opcion no valida.");
      newOption = prompt(
        "Tu monto no supera los $10000 USD, por lo tanto no se le aplicará el descuento.\n\nMonto final: $" +
          total.toLocaleString() +
          " USD" +
          "\n\nCon $" +
          +(10000 - total).toLocaleString() +
          " USD mas puedes obtener el 20% de descuento, si quieres continuar comprando ingresa 1, si quieres salir ingresa SALIR"
      );
    }
    if (parseInt(newOption) === 1) {
      return main(total);
    } else {
      return;
    }
  }
};

main();
