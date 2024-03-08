import { csrfFetch } from "../redux/csrf";

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

export const scrollToBottomOfChat = () => {
  const chatWindow = document.querySelector(".chat-messages");
  if (chatWindow && chatWindow.scrollTop + chatWindow.clientHeight === chatWindow.scrollHeight) {
    setTimeout(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 300);
  }
}

export const choosePort = () => {
  return import.meta.env.MODE === 'development' ? 'http://localhost:8000' : 'https://miniamazon.onrender.com';
}

export const sendMessage = async payload => {
  await csrfFetch('/api/messages', {
    // mode: 'no-cors',
    method: 'POST',
    body: JSON.stringify({
      ...payload
    })
  });
}
