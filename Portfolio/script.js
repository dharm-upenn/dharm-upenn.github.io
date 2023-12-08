document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
  
    window.addEventListener("scroll", function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
  
      if (st > lastScrollTop) {
        // Scrolling down
        document.querySelectorAll(".left").forEach(function (element) {
          element.style.animation = "righttextscroll infinite 60s linear";
        });
        document.querySelectorAll(".right").forEach(function (element) {
          element.style.animation = "lefttextscroll infinite 60s linear";
        });
      } else {
        // Scrolling up
        document.querySelectorAll(".left").forEach(function (element) {
          element.style.animation = "lefttextscroll infinite 60s linear";
        });
        document.querySelectorAll(".right").forEach(function (element) {
          element.style.animation = "righttextscroll infinite 60s linear";
        });
      }
      lastScrollTop = st <= 0 ? 0 : st;
    });
  });