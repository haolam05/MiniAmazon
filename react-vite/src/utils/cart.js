export const toggleCart = e => {
  e.preventDefault();
  const cart = document.querySelector("#cart-orders");
  const products = document.querySelector("#products");
  if (cart) {
    if (products) {
      products.style.marginRight = cart.classList.contains("hidden") ? "360px" : "0";
    }
    cart.classList.toggle("hidden");
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
    cart.classList.add("hidden");
  }
}
