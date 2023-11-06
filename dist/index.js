let products = [];
const cart = { products: [], subtotal: 0 };
const $cart = document.getElementById("cart");
const $summary = document.getElementById("summary");
let summaryAppended = false;

// Toastify error
const notifyError = (message) => {
  Toastify({
    text: message,
    position: "left",
    gravity: "bottom",
    style: {
      background: "#ff383f",
    },
  }).showToast();
}

// Toastify Success
const notifySuccess = (message) => {
  Toastify({
    text: message,
    position: "left",
    gravity: "bottom",
    style: {
      background: "#10ba00",
    },
  }).showToast();
}

// Util - Updates product total
const updateProductTotal = (index) => {
  const item = cart.products[index];
  cart.products[index].total = item.quantity * item.price;
};

// Util - formats price => example: 1000 to $ 999,99
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

// Fetches product data from the "data.json" file and calls function to render products
const handleProducts = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    products = data;

    // render products
    renderProducts();
  } catch (error) {
    notifyError("Error: Unable to load products.")
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

// UI - renders products in the dom
const renderProducts = () => {
  if (!products) return
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
}

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
const handleCart = () => {
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
  handleProducts()
  handleCart();
  updateSummary();
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".increase")) {
    handleQuantity("INCREASE", e.target.dataset.id);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
    notifySuccess("Updated quantity.")
  }
  if (e.target.matches(".decrease")) {
    handleQuantity("DECREASE", e.target.dataset.id);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
    notifySuccess("Updated quantity.")
  }
  if (e.target.matches(".remove")) {
    handleRemoveItemFromCart(e.target.dataset.id);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
    notifySuccess("Removed item from cart.")
  }
  if (e.target.matches(".add-to-cart")) {
    handleAddItemToCart(e.target.dataset.productId);
    updateSubtotal();
    updateSummary();
    // update localstorage
    saveCart();
    notifySuccess("Added item to cart.")
  }
});
