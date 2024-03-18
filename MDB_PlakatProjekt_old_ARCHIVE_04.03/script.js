init();

function getEvent(event) {
  return event.touches ? event.touches[0] : event;
}

//===========================================================
//			onMouseMove
//===========================================================
function onMouseMove(event) {
  const e = getEvent(event);
  var p1, angle, i, tmp;

  if (!dragging) return;

  (p1 = { x: e.clientX - p0.x, y: e.clientY - p0.y }),
    (angle = {
      x: -p1.y * unit + currentRotateX,
      y: p1.x * unit + currentRotateY,
    });

  for (i = 0; i < faces.length; i++) {
    tmp =
      "rotateX(" +
      angle.x +
      "deg)" +
      " rotateY(" +
      angle.y +
      "deg)" +
      styles[i];
    faces[i].style.transform = p + tmp;
    faces[i].style["-webkit-transform"] = p + tmp;

    tmpX = angle.x;
    tmpY = angle.y;
  }
}

//===========================================================
//			onMouseDown
//===========================================================
function onMouseDown(event) {
  const e = getEvent(event);
  var element;

  onMouseUp(); // disable if dragging

  element = e.target;
  if (!element.classList.contains("face")) return false;

  event.preventDefault();
  window.p0 = { x: e.clientX, y: e.clientY };
  dragging = true;
  return false;
}

//===========================================================
//			onMouseUp
//===========================================================
function onMouseUp(event) {
  var i, tmp, style;

  if (!dragging) return;
  dragging = false;

  for (i = 0; i < faces.length; i++) {
    style = faces[i].style;
    tmp = style.transform || style["-webkit-transform"];

    currentRotateX = tmpX;
    currentRotateY = tmpY;
  }
}

//=====================================================================
//			initializeCube
//=====================================================================
function initializeCube() {
  var i, tmp;

  for (i = 0; i < faces.length; i++) {
    if (i < 4) tmp = "rotateY(" + i * 90 + "deg)";
    if (i >= 4) tmp = "rotateX(" + Math.pow(-1, i) * 90 + "deg)";
    tmp += " translateZ(" + side / 2 + "px)";

    faces[i].style.transform = p + tmp;
    faces[i].style["-webkit-transform"] = p + tmp;
    styles.push(tmp);
    defaultStyles.push(tmp);
  }
}

//=====================================================================
//			init
//=====================================================================
function init() {
  window.addEventListener("mousedown", onMouseDown, false);
  window.addEventListener("mouseup", onMouseUp, false);
  window.addEventListener("mousemove", onMouseMove, false);

  window.addEventListener("touchstart", onMouseDown, false);
  window.addEventListener("touchmove", onMouseUp, false);
  window.addEventListener("touchend", onMouseMove, false);

  window.faces = document.querySelectorAll(".face");
  window.styles = new Array();
  window.defaultStyles = new Array();
  window.style = getComputedStyle(faces[0]);
  window.factor = 3;
  window.side = parseInt(style.width.split("px")[0], 10);
  window.max_amount = factor * side;
  window.unit = 360 / max_amount;
  window.dragging = false;
  window.p = "perspective(80em)";
  window.tmpX = 0;
  window.tmpY = 0;
  window.currentRotateX = 0;
  window.currentRotateY = 0;

  initializeCube();
}
