//Home Page
// JavaScript to set random RGB colors on hover
document.querySelectorAll('.right, .left').forEach(item => {
  item.addEventListener('mouseover', function () {
    if (!this.dataset.originalColor) {
      this.dataset.originalColor = window.getComputedStyle(this).backgroundColor;
    }
    const randomColor = getRandomRGBColor();
    this.style.backgroundColor = randomColor;
    // this.style.color = randomColor;

  });

  item.addEventListener('mouseout', function () {
    this.style.backgroundColor = this.dataset.originalColor || '';
    // this.style.color = this.dataset.originalColor || '';

  });
});

// Function to generate random RGB color
function getRandomRGBColor() {
  const r = 255;
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}



//Project Section
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

      // For the last item, open a different link when clicked
      if (this === readingItems[readingItems.length - 1]) {
        window.location.href = 'codingproj.html'; // Replace with your desired link
      } else {
        // Hide the response after 30 seconds for other items
        setTimeout(() => {
          isHovered = false;
          hideResponseAfterTimeout();
        }, 90000);
      }
    });
  });

  function hideResponseAfterTimeout() {
    if (!isHovered) {
      timeout = setTimeout(() => {
        responseInfo.style.display = 'none';
      }, 90000);
    }
  }
});

// Coding Projects
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

      // Get the unique link for each list item
      const link = this.getAttribute('data-link');
      if (link) {
        // Open the link in a new tab/window
        window.open(link, '_blank');
      } else {
        // Hide the response after 30 seconds for other items
        setTimeout(() => {
          isHovered = false;
          hideResponseAfterTimeout();
        }, 90000);
      }
    });
  });

  function hideResponseAfterTimeout() {
    if (!isHovered) {
      timeout = setTimeout(() => {
        responseInfo.style.display = 'none';
      }, 90000);
    }
  }
});


