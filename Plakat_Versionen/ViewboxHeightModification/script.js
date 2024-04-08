function animateSVG(
  svgElement,
  originalPath,
  targetPath,
  originalViewBox,
  targetViewBox
) {
  const path = svgElement.querySelector("path");

  const viewBoxChange = targetViewBox.map(
    (val, index) => val - originalViewBox[index]
  );

  svgElement.addEventListener("mouseenter", () => {
    path.style.transition = "d 0.5s";
    path.setAttribute("d", targetPath);

    animateViewBox(
      originalViewBox,
      targetViewBox,
      viewBoxChange,
      0,
      svgElement
    );
  });

  svgElement.addEventListener("mouseleave", () => {
    path.style.transition = "d 0.5s";
    path.setAttribute("d", originalPath);

    animateViewBox(
      targetViewBox,
      originalViewBox,
      viewBoxChange.map((val) => -val),
      0,
      svgElement
    );
  });

  function animateViewBox(start, target, change, progress, svg) {
    if (progress >= 1) return;

    const newViewBox = start.map(
      (val, index) => val + change[index] * progress
    );
    svg.setAttribute("viewBox", newViewBox.join(" "));

    requestAnimationFrame(() => {
      animateViewBox(start, target, change, progress + 0.05, svg);
    });
  }
}

document.querySelectorAll("svg").forEach((svgElement) => {
  const originalPath = svgElement.querySelector("path").getAttribute("d");
  const originalViewBox = svgElement
    .getAttribute("viewBox")
    .split(" ")
    .map(parseFloat);

  let targetPath, targetViewBox;
  switch (svgElement.getAttribute("class")) {
    case "a1":
      targetPath =
        "M706.94 0V177H0V520H873.94V0H706.94ZM706.94 353H167V344H706.94V353Z";
      targetViewBox = [0, 0, 874, 520];
      break;
    case "a2":
      targetPath =
        "M0 0H521.06V167H167V353H873.94V872H354.06V706H706.94V520H0V0Z";
      targetViewBox = [0, 0, 874, 872];
      break;
    case "a3":
      targetPath =
        "M354.06 0H521.06V177.25H873.94V344.33H521.06V529.33H873.94V696.11H521.06V872.44H354.06V695.66H0V529.33H354.5V344.33H0V177.25H353.83L354.06 0Z";
      targetViewBox = [0, 0, 874, 872];
      break;
    case "a4":
      targetPath =
        "M795 0L865 150.603L401.5 353.344L873.94 353.234V520.124H0V353.344L795 0Z";
      targetViewBox = [0, 0, 874, 521];
      break;
    case "b1":
      targetPath =
        "M353.5 0V177H0.0302734V344H353.5V530H0.0302734V697H353.5V874H520.5V697H874.04V530H520.5V344H874.04V177H520.5V0H353.5Z";
      targetViewBox = [0, 0, 874, 874];
      break;
    case "b2":
      targetPath =
        "M0.0302734 0H874.04V167H167.03V175.67H874.04V343H0.0302734V0Z";
      targetViewBox = [0, 0, 874, 343];
      break;
    case "b3":
      targetPath =
        "M0.0302734 0V521.08H167.03V344.19H874.04V0H0.0302734ZM707.04 177.19H167.03V167.08H707.04V177.19Z";
      targetViewBox = [0, 0, 874, 522];
      break;
    case "b4":
      targetPath =
        "M0.0302734 0H874.04V166.67H167.03V353.33H520.5V520.22H167.03V706H874.04V872.89H0.0302734V0Z";
      targetViewBox = [0, 0, 874, 872];
      break;
  }

  animateSVG(
    svgElement,
    originalPath,
    targetPath,
    originalViewBox,
    targetViewBox
  );
});
