export const toggleCart = e => {
  e.preventDefault();
  const cart = document.querySelector("#cart-orders");
  const products = document.querySelector("#products");
  if (cart) {
    if (products) {
      if (cart.classList.contains("hidden")) {
        products.style.marginRight = "360px";
        cart.classList.remove("hidden");
        cart.classList.remove("close");
        cart.classList.add("open");
      } else {
        products.style.marginRight = "0";
        setTimeout(() => cart.classList.add("hidden"), 400);
        cart.classList.remove("open");
        cart.classList.add("close");
      }
    }
  }
}

export const revealCart = e => {
  e.preventDefault();
  const cart = document.querySelector("#cart-orders");
  const products = document.querySelector("#products");
  if (cart) {
    if (products) {
      products.style.marginRight = "360px";
    }
    cart.classList.remove("hidden");
    cart.classList.remove("close");
    cart.classList.add("open");
  }
}

export const closeCart = e => {
  e.preventDefault();
  const cart = document.querySelector("#cart-orders");
  const products = document.querySelector("#products");
  if (cart) {
    if (products) {
      products.style.marginRight = "0";
    }
    setTimeout(() => cart.classList.add("hidden"), 400);
    cart.classList.remove("open");
    cart.classList.add("close");
  }
}
