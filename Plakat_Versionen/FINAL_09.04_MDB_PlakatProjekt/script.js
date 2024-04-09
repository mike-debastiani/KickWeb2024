const body = document.body;
const paths = document.querySelectorAll("path");

paths.forEach((path) => {
  path.addEventListener("mouseover", () => {
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
  });
  path.addEventListener("mouseout", () => {
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
  });
});
