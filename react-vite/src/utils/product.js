export const getPreviewText = name => {
  if (name.length > 50) {
    return name.slice(0, 50) + "...";
  }
  return name;
}

export const getFormattedPrice = price => {
  if (!price.length) return ["0", "00"];
  const parts = price.split(".");
  const part1 = parts[0];
  const part2 = parts[1] ? (parts[1].length > 2 ? parts[1].slice(0, 2) : parts[1]) : "";
  return [part1, part2.padEnd(2, 0)];
}

export const hideAddToCartBtn = productId => {
  // Button in product list
  const products = document.querySelectorAll(`#product-${productId}`);
  if (products) {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const btn = product.querySelector(".product-btns button.add-to-cart-btn");
      if (btn) btn.classList.add("hidden");
    }
  }

  // Button in product details page
  const btn = document.querySelector("#product-details button.add-to-cart-btn")
  if (btn) btn.classList.add("hidden");
}

export const showAddToCartBtn = productId => {
  const product = document.getElementById(`product-${productId}`);
  if (product) {
    const btn = product.querySelector(".product-btns>button+button");
    if (btn) btn.classList.remove("hidden");
  }
}
