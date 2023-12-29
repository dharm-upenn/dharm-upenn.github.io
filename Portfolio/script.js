document.addEventListener('DOMContentLoaded', function () {
  const readingItems = document.querySelectorAll('.reading-item');
  const responseInfo = document.querySelector('.response-info');
  let isHovered = false;
  let timeout;

  readingItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      const readingResponse = responseInfo.querySelector('.reading-response');
      const readingImage = responseInfo.querySelector('.reading-image');

      readingResponse.textContent = this.getAttribute('data-response');
      readingImage.src = this.getAttribute('data-image');
      responseInfo.style.display = 'block';
      isHovered = true;
      clearTimeout(timeout);
    });

    item.addEventListener('mouseleave', function () {
      isHovered = false;
      hideResponseAfterTimeout();
    });

    item.addEventListener('click', function () {
      const readingResponse = responseInfo.querySelector('.reading-response');
      const readingImage = responseInfo.querySelector('.reading-image');

      readingResponse.textContent = this.getAttribute('data-response');
      readingImage.src = this.getAttribute('data-image');
      responseInfo.style.display = 'block';
      isHovered = true;
      clearTimeout(timeout);

      // Hide the response after 30 seconds
      setTimeout(() => {
        isHovered = false;
        hideResponseAfterTimeout();
      }, 30000);
    });
  });

  function hideResponseAfterTimeout() {
    if (!isHovered) {
      timeout = setTimeout(() => {
        responseInfo.style.display = 'none';
      }, 30000);
    }
  }
});
