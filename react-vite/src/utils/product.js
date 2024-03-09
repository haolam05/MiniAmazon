export const getPreviewText = name => {
  if (name.length > 50) {
    return name.slice(0, 50) + "...";
  }
  return name;
}

export const getFormattedPrice = price => {
  if (!price.length) return ["0", "00"];
  const parts = price.split(".");

  let part1s = [];
  let curr = ""
  for (let i = parts[0].length - 1; i >= 0; i--) {
    const num = parts[0][i];
    if ("0123456789".includes(num)) {
      curr = num + curr;
    }
    if (curr.length === 3) {
      part1s.splice(0, 0, curr);
      curr = "";
    }
  }
  if (curr.length) part1s.splice(0, 0, curr);

  const part1 = part1s.join(",");
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
