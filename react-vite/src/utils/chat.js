export const toggleChat = e => {
  e.preventDefault();
  const chatWindow = document.querySelector("#customer-service-chat-window");
  const products = document.querySelector("#products");
  if (chatWindow) {
    if (products) {
      if (chatWindow.classList.contains("hidden")) {
        products.style.marginLeft = "360px";
        chatWindow.classList.remove("hidden");
        chatWindow.classList.remove("close");
        chatWindow.classList.add("open");
      } else {
        products.style.marginLeft = "0";
        setTimeout(() => chatWindow.classList.add("hidden"), 400);
        chatWindow.classList.remove("open");
        chatWindow.classList.add("close");
      }
    }
  }
}

export const revealChat = e => {
  e.preventDefault();
  const chatWindow = document.querySelector("#customer-service-chat-window");
  const products = document.querySelector("#products");
  if (chatWindow) {
    if (products) {
      products.style.marginLeft = "360px";
    }
    chatWindow.classList.remove("hidden");
    chatWindow.classList.remove("close");
    chatWindow.classList.add("open");
  }
}

export const closeChat = e => {
  e.preventDefault();
  const chatWindow = document.querySelector("#customer-service-chat-window");
  const products = document.querySelector("#products");
  if (chatWindow) {
    if (products) {
      products.style.marginLeft = "0";
    }
    setTimeout(() => chatWindow.classList.add("hidden"), 400);
    chatWindow.classList.remove("open");
    chatWindow.classList.add("close");
  }
}
