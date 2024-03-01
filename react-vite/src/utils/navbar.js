export const addOutline = e => {
  e.target.style.outline = "3px solid orange";
  e.target.nextSibling.style.outline = "3px solid orange";
}

export const removeOutline = e => {
  e.target.style.outline = "none";
  e.target.nextSibling.style.outline = "none";
}

export const getAvatarUrl = url => {
  if (url) return url;
  return "/images/default-avatar.png";
}
