export const showMagnifyImage = e => {
  const productDetails = e.target.closest("#product-details");

  if (!productDetails) return

  const len = productDetails.querySelector(".image-len");
  const image = productDetails.querySelector(".product-image img");
  const imageMagnifyContainer = productDetails.querySelector(".product-image-magnify");
  const lenInfo = len.getBoundingClientRect();
  const imageInfo = image.getBoundingClientRect();
  const paddingX = 5;  // 5px horizontal padding of parent container
  const paddingY = 10; // 10px vertical padding of parent container

  len.classList.remove("hidden");
  imageMagnifyContainer.classList.remove("hidden")

  if (image && len) {
    // cursorX = the width between left of screen (viewport) to current cursor position
    // cursorY = the height between top of screen (viewport) to current cursor position
    const [cursorX, cursorY] = [
      e.clientX,
      e.clientY
    ];

    // imageX = the width between left of screen (viewport) to the start of image position (left)
    // imageY = the height between top of screen (viewport) to the start of image position (top)
    const [imageX, imageY] = [
      imageInfo.left,
      imageInfo.top
    ];

    // offsetX = the width between the start of the image from the left side to the cursor position (left)
    // offsetY = the height between the start of the image from the top side to the cursor position (top)
    let [offsetX, offsetY] = [
      cursorX - imageX + paddingX,
      cursorY - imageY + paddingY
    ];

    // imageWidth = width of the image (including border and padding)
    // imageHeight = height of the image (including border and padding)
    const [imageWidth, imageHeight] = [
      imageInfo.width,
      imageInfo.height
    ];

    // prevent len to get out-of-bound
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > imageWidth - lenInfo.width) offsetX = imageWidth - lenInfo.width + paddingX;
    if (offsetY > imageHeight - lenInfo.height) offsetY = imageHeight - lenInfo.height;

    // set len position
    len.style.left = offsetX + "px";
    len.style.top = offsetY + "px";

    // Ratio between len & the container of the magnified image
    const ratioX = imageMagnifyContainer.offsetWidth / len.offsetWidth;
    const ratioY = imageMagnifyContainer.offsetHeight / len.offsetHeight;

    // backgroundImage = set maginified image
    // backgroundSize = zoom magnified image based on ratio calculated above
    // backgroundPosition = position the background image(top left) to the correct position based on the len
    //                    = the maginify container doesn't have padding ---> subtract
    //                    = minus: based on top-left
    imageMagnifyContainer.style.backgroundImage = `url('${image.src}')`;
    imageMagnifyContainer.style.backgroundSize = `${imageWidth * ratioX}px ${imageHeight * ratioY}px`;
    imageMagnifyContainer.style.backgroundPosition = `-${(offsetX - paddingX) * ratioX}px -${(offsetY - paddingY) * ratioY}px`;
  }
}

export const hideMagnifyImage = e => {
  if (!e.target.classList.contains("image-len") && !e.target.classList.contains("product-image-tag")) {
    const len = document.querySelector("#product-details .image-len");
    const imageMagnifyContainer = document.querySelector("#product-details .product-image-magnify");
    if (len) len.classList.add("hidden");
    if (imageMagnifyContainer) imageMagnifyContainer.classList.add("hidden");
  }
}
