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
  if (e) e.preventDefault();
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

export const scrollToBottomOfChat = endOfChat => {
  const chatMessages = document.querySelector(".chat-messages");
  if (chatMessages && chatMessages.scrollTop + chatMessages.clientHeight === chatMessages.scrollHeight) {
    setTimeout(() => endOfChat.current.scrollIntoView(), 250);
  }
}

export const forceScrollToBottomOfChat = endOfChat => {
  endOfChat.current?.scrollIntoView({ behavior: 'smooth' });
}

export const choosePort = () => {
  return import.meta.env.MODE === 'development' ? 'http://localhost:8000' : 'https://miniamazon.onrender.com';
}

export const sendMessage = async payload => {
  await csrfFetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify({
      ...payload
    })
  });
}

export const setNotification = () => {
  const robotIcon = document.querySelector("#customer-service-chat");
  const chatWindow = document.querySelector("#customer-service-chat-window");
  const robotNotification = document.querySelector("#robot-notification");
  const scrollIcon = document.querySelector(".fa-scroll");
  const scrollNotification = document.querySelector("#scroll-notification");
  const chatMessages = document.querySelector(".chat-messages");
  if (robotIcon && chatWindow && robotNotification) {
    if (chatWindow.classList.contains("close")) {
      robotNotification.classList.remove("hidden");
      robotIcon.addEventListener('click', () => robotNotification.classList.add("hidden"))
    } else if (scrollNotification && scrollIcon && chatMessages) {
      if (chatMessages.scrollTop + chatMessages.clientHeight !== chatMessages.scrollHeight) {
        scrollNotification.classList.remove("hidden");
        scrollIcon.addEventListener('click', () => scrollNotification.classList.add("hidden"));
      }
    }
  }
}

export const showTyping = () => {
  const typing = document.querySelector(".typing");
  if (typing) {
    typing.classList.remove("hidden");
  }
}

export const hideTyping = () => {
  const typing = document.querySelector(".typing");
  if (typing) {
    typing.classList.add("hidden");
  }
}

export const isTyping = () => {
  const typing = document.querySelector(".typing");
  return typing && !typing.classList.contains("hidden");
}
