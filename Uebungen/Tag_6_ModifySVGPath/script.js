const svg = document.querySelector(".a1");
const path = svg.querySelector("path");

// Definiere die Ausgangs- und End-Werte für viewBox
const originalViewBox = svg.getAttribute("viewBox").split(" ").map(parseFloat);
const targetViewBox = "0 0 874 520".split(" ").map(parseFloat);

// Berechne die Änderungswerte für jede Koordinate
const viewBoxChange = targetViewBox.map(
  (val, index) => val - originalViewBox[index]
);

svg.addEventListener("mouseenter", () => {
  // Führe die Transition für den Pfad aus
  path.style.transition = "d 0.5s";
  path.setAttribute(
    "d",
    "M706.94 0V177H0V520H873.94V0H706.94ZM706.94 353H167V344H706.94V353Z"
  );

  // Starte die Animation der viewBox
  animateViewBox(originalViewBox, targetViewBox, viewBoxChange, 0);
});

svg.addEventListener("mouseleave", () => {
  // Führe die Transition für den Pfad aus
  path.style.transition = "d 0.5s";
  path.setAttribute(
    "d",
    "M706.94 0V177H0V697H873.94V0H706.94ZM706.94 530H167V344H706.94V530Z"
  );

  // Starte die Rückwärtsanimation der viewBox
  animateViewBox(
    targetViewBox,
    originalViewBox,
    viewBoxChange.map((val) => -val),
    0
  );
});

function animateViewBox(start, target, change, progress) {
  if (progress >= 1) return;

  const newViewBox = start.map((val, index) => val + change[index] * progress);
  svg.setAttribute("viewBox", newViewBox.join(" "));

  requestAnimationFrame(() => {
    animateViewBox(start, target, change, progress + 0.05);
  });
}
