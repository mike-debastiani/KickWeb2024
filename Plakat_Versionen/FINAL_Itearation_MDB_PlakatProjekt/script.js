let scrolling = true;
let scrollDirection = "down";
const scrollSpeed = 1;
const scrollDelay = 30;

function autoScroll() {
  if (scrolling) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const maxScroll = documentHeight - windowHeight;

    if (scrollDirection === "down") {
      window.scrollBy(0, scrollSpeed);
    } else {
      window.scrollBy(0, -scrollSpeed);
    }

    if (window.scrollY >= maxScroll) {
      scrollDirection = "up";
    } else if (window.scrollY <= 0) {
      scrollDirection = "down";
    }
  }

  setTimeout(autoScroll, scrollDelay);
}

autoScroll();

const paths = document.querySelectorAll("path");

paths.forEach((path) => {
  path.addEventListener("mouseenter", () => {
    scrolling = false;

    const whiteTexts = document.querySelectorAll(".white");
    whiteTexts.forEach((text) => {
      text.style.color = "#FAEC19";
    });
  });

  path.addEventListener("mouseleave", () => {
    scrolling = true;

    const whiteTexts = document.querySelectorAll(".white");
    whiteTexts.forEach((text) => {
      text.style.color = "white";
    });
  });
});
