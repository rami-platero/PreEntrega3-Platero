// Products list
const products = [
  {
    id: 1,
    name: "MSI GeForce RTX 4090 GAMING X TRIO 24G",
    category: "Graphics Card",
    price: 1700,
    image:
      "https://d2r7p0safdzsvt.cloudfront.net/6b72b77b2b7fdb9fc0d7254a2576fa31318fc3fc2415e9a37babba149fb95004",
  },
  {
    id: 2,
    name: "MSI Radeon RX 6650 XT MECH 2X 8G OC",
    category: "Graphics Card",
    price: 235,
    image:
      "https://d2r7p0safdzsvt.cloudfront.net/41ec60029448bf5a0bdd30f2c765f500ca161076601e269e87b2f12c9b375a6e",
  },
  {
    id: 3,
    name: "MSI B450 TOMAHAWK MAX II",
    category: "Motherboard",
    price: 120,
    image:
      "https://d2r7p0safdzsvt.cloudfront.net/8023348e022fd03baad827f4bb1ceb1ddedee7fd56338e37ddbaffbb13694747",
  },
  {
    id: 4,
    name: "Gigabyte Z690 AORUS ULTRA",
    category: "Motherboard",
    price: 250,
    image:
      "https://d2r7p0safdzsvt.cloudfront.net/f0df37e4fdc5a8841986400d36b83557b24d4af32e3d1505f2d6d4dbde780d6d",
  },
  {
    id: 5,
    name: "ASUS ROG Keris Wireless EVA Edition",
    category: "Mouse",
    price: 106,
    image:
      "https://d2r7p0safdzsvt.cloudfront.net/295e811225e866e900cc9f5b75978e468bcf6023a0338d301ce018d7298c277f",
  },
  {
    id: 6,
    name: "ASUS VZ279HEG1R Gaming Monitor – 27 inch Full HD",
    category: "Monitor",
    price: 130,
    image:
      "https://d2r7p0safdzsvt.cloudfront.net/852f26fe04412314126cfa65573737d0720d6b1bf8c07a503a9c176076011fc5",
  },
];

const cart = { products: [], subtotal: 0 };
const $cart = document.getElementById("cart");
const $summary = document.getElementById("summary");
let summaryAppended = false;

// Util - Updates product total
const updateProductTotal = (index) => {
  const item = cart.products[index];
  cart.products[index].total = item.quantity * item.price;
};

// Util - formats price => 1000 to 999,99
const formatPrice = (price) => {
  return `$ ${parseFloat((price - 0.01).toFixed(2)).toLocaleString("en-US")}`;
};

// Util - updates subtotal
const updateSubtotal = () => {
  const total = cart.products.reduce((newTotal, cartProduct) => {
    return (newTotal += cartProduct.total);
  }, 0);
  return (cart.subtotal = total);
};
// Util - updates/saves cart in the localstorage
const saveCart = () => {
  if (cart.products.length) {
    localStorage.setItem("cart", JSON.stringify(cart.products));
  } else {
    localStorage.removeItem("cart");
  }
};

// UI - updates cart item amount
const updateAmount = (id, newQuantity, index) => {
  const $cartItem = $cart.querySelector(`[data-product-id="${id}"]`);
  $cartItem.querySelector(".amount").textContent = newQuantity;
  const formattedPrice = formatPrice(newQuantity * cart.products[index].price);
  $cartItem.querySelector(".product-total-price").textContent = formattedPrice;
};

// UI - sets summary content values
const setSummaryProperties = ($element) => {
  const formattedSubtotal = formatPrice(cart.subtotal);
  $element.querySelector(".subtotal").textContent = formattedSubtotal;
  const discount = cart.subtotal > 10000 ? (cart.subtotal * 20) / 100 : 0;
  const formattedDiscount = `- ${
    discount > 0 ? formatPrice(discount) : `$ 0,00`
  }`;
  $element.querySelector(".discount").textContent = formattedDiscount;
  const formattedTotal = formatPrice(cart.subtotal - discount);
  $element.querySelector(".total").textContent = formattedTotal;
};

// UI - updates summary container content
const updateSummary = () => {
  const $template = document.getElementById("summary-template").content;
  if (!cart.products.length && summaryAppended) {
    clearSummary();
  }
  if (cart.products.length && !summaryAppended) {
    const $fragment = document.createDocumentFragment();

    setSummaryProperties($template);

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
    $summary.appendChild($fragment);
    summaryAppended = true;
  }
  if (cart.products.length && summaryAppended) {
    setSummaryProperties($summary);
  }
};

// UI - load products and renders them in the DOM on page reload
const loadProducts = () => {
  const $template = document.getElementById("product-template").content;
  const $container = document.getElementById("products-list");
  const $fragment = document.createDocumentFragment();

  products.forEach((product) => {
    $template.querySelector("img").setAttribute("src", product.image);
    $template.querySelector("img").setAttribute("alt", product.name);
    $template.querySelector(".product-name").textContent = product.name;
    $template.querySelector(".product-price").textContent = product.category;
    $template.querySelector("button").dataset.productId = product.id;
    const formattedPrice = formatPrice(product.price);
    $template.querySelector(".product-category").textContent = formattedPrice;

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $container.appendChild($fragment);
};

// UI - removes summary container from the dom
const clearSummary = () => {
  const $container = document.getElementById("summary-container");
  $container.remove();
  summaryAppended = false;
};

// UI - sets cart is empty message
const setEmptyCartMessage = () => {
  const element = document.createElement("p");
  element.textContent = "Your cart is empty!";
  element.id = "cartMessage";
  $cart.appendChild(element);
};

// UI - checks if cart is empty or not and dynamically renders items or message
const getCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  if (!cartItems) {
    setEmptyCartMessage();
  } else {
    cart.products = cartItems;
    const $template = document.getElementById("cart-template").content;
    const $fragment = document.createDocumentFragment();
    cartItems.forEach((item) => {
      setCartItemProperties(item, $template);
      let $clone = document.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $cart.appendChild($fragment);
  }
  updateSubtotal();
};

// UI - sets cart item content values
const setCartItemProperties = (product, $template) => {
  // set properties
  $template.querySelector(".cart-item").dataset.productId = product.id;
  $template.querySelector("img").setAttribute("src", product.image);
  $template.querySelector("img").setAttribute("alt", product.name);
  $template.querySelector(".product-name").textContent = product.name;
  $template.querySelector(".product-category").textContent = product.category;
  const formattedPrice = formatPrice(product.total);
  $template.querySelector(".product-total-price").textContent = formattedPrice;
  $template.querySelector(".increase").dataset.id = product.id;
  $template.querySelector(".decrease").dataset.id = product.id;
  $template.querySelector(".remove").dataset.id = product.id;
  $template.querySelector(".amount").textContent = product.quantity;
};

// HANDLER - add item to cart
const handleAddItemToCart = (id) => {
  if (!cart.products.length) {
    const message = document.querySelector("#cartMessage");
    message && message.remove();
  }

  const product = products.find((p) => {
    return p.id === Number(id);
  });

  const itemInCart = cart.products.findIndex((cartItem) => {
    return cartItem.id === product.id;
  });

  if (itemInCart === -1) {
    // push new item
    cart.products.push({ ...product, quantity: 1, total: product.price });
    const $fragment = document.createDocumentFragment();
    const $template = document.getElementById("cart-template").content;

    setCartItemProperties(
      { ...product, quantity: 1, total: product.price },
      $template
    );

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
    $cart.appendChild($fragment);
  } else {
    // get quantity
    const newQuantity = cart.products[itemInCart].quantity + 1;
    // update quantity
    cart.products[itemInCart].quantity = newQuantity;
    updateProductTotal(itemInCart);
    updateAmount(product.id, newQuantity, itemInCart);
  }
};

// HANDLER - handle increase / decrease quantity from cart item
const handleQuantity = (type, id) => {
  const cartItemIndex = cart.products.findIndex((item) => {
    return item.id === Number(id);
  });
  const newQuantity =
    type === "INCREASE"
      ? cart.products[cartItemIndex].quantity + 1
      : type === "DECREASE"
      ? cart.products[cartItemIndex].quantity - 1
      : null;

  if (!newQuantity) return;
  if (type === "DECREASE" && newQuantity === 0) return;

  cart.products[cartItemIndex].quantity = newQuantity;
  updateProductTotal(cartItemIndex);
  updateAmount(id, newQuantity, cartItemIndex);

  const $cartItem = $cart.querySelector(`[data-product-id="${Number(id)}"]`);
  $cartItem.querySelector(".amount").textContent = newQuantity;
  const formattedPrice = formatPrice(
    newQuantity * cart.products[cartItemIndex].price
  );
  $cartItem.querySelector(".product-total-price").textContent = formattedPrice;
};

// HANDLER - remove item from cart
const handleRemoveItemFromCart = (id) => {
  const cartItemIndex = cart.products.findIndex((item) => {
    return item.id === Number(id);
  });

  cart.products.splice(cartItemIndex, 1);
  const $cartItem = $cart.querySelector(`[data-product-id="${id}"]`);
  $cartItem.remove();
  if (!cart.products.length) {
    setEmptyCartMessage();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  getCart();
  updateSummary();
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".increase")) {
    handleQuantity("INCREASE", e.target.dataset.id);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
  }
  if (e.target.matches(".decrease")) {
    handleQuantity("DECREASE", e.target.dataset.id);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
  }
  if (e.target.matches(".remove")) {
    handleRemoveItemFromCart(e.target.dataset.id);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
  }
  if (e.target.matches(".add-to-cart")) {
    handleAddItemToCart(e.target.dataset.productId);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
  }
});
