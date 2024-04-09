const body = document.body;
const paths = document.querySelectorAll("path");
const audio = new Audio("creepyChoir.wav");

let scrollInterval;
let isUserScrolling = false;
let isScrollingDown = true;

// ======================= Hover on path strobe & audio effect =======================

paths.forEach((path) => {
  path.addEventListener("mouseover", () => {
    audio.play();

    body.classList.add("strobe-effect");
    const yellowTexts = document.querySelectorAll(".yellow");
    const blackTexts = document.querySelectorAll(".black");
    yellowTexts.forEach((text) => {
      text.classList.add("yellow-strobe");
    });
    blackTexts.forEach((text) => {
      text.classList.add("black-strobe");
    });
    paths.forEach((otherPath) => {
      if (otherPath !== path) {
        otherPath.classList.add("fill-strobe");
      }
    });

    clearInterval(scrollInterval);
  });
  path.addEventListener("mouseout", () => {
    audio.pause();
    audio.currentTime = 0;

    body.classList.remove("strobe-effect");
    const yellowTexts = document.querySelectorAll(".yellow");
    const blackTexts = document.querySelectorAll(".black");
    yellowTexts.forEach((text) => {
      text.classList.remove("yellow-strobe");
    });
    blackTexts.forEach((text) => {
      text.classList.remove("black-strobe");
    });
    paths.forEach((otherPath) => {
      if (otherPath !== path) {
        otherPath.classList.remove("fill-strobe");
      }
    });

    scrollInterval = setInterval(autoScroll, 80);
  });
});

// ======================= Auto scroll function =======================

function autoScroll() {
  var windowHeight = window.innerHeight;
  var windowScrollTop = window.pageYOffset;

  if (windowScrollTop + windowHeight >= document.body.scrollHeight) {
    isScrollingDown = false;
  } else if (windowScrollTop <= 0) {
    isScrollingDown = true;
  }

  if (isScrollingDown) {
    window.scrollBy(0, 1);
  } else {
    window.scrollBy(0, -1);
  }
}

document.body.addEventListener("scroll", function () {
  isUserScrolling = true;
});

function stopAutoScroll() {
  if (isUserScrolling) {
    clearInterval(scrollInterval);
  }
}

setInterval(stopAutoScroll, 80);
