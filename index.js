const hourTrack =
  document.querySelector(".hour-track");
const minTrack = document.querySelector(".min-track");
const secTrack = document.querySelector(".sec-track");
const hourArc = document.querySelector(".hour-arc");
const minArc = document.querySelector(".min-arc");
const secArc = document.querySelector(".sec-arc");
const clock = document.querySelector(".clock");
const dial = document.querySelector(".dial");
const time = document.querySelector(".time");
const clockWidth = clock.clientWidth;
const clockHeight = clock.clientHeight;
const trackWidth = 30;
const maxRadius = dial.clientWidth / 2;
const hourConfig = {
  radius: maxRadius,
  maxValue: 12,
  trackColor: "#400818",
  arcColor: "#fe261b",
};
const minConfig = {
  radius: maxRadius - trackWidth - 10,
  maxValue: 60,
  trackColor: "#2d400c",
  arcColor: "#9bff00",
};
const secConfig = {
  radius: maxRadius - trackWidth * 2 - 20,
  maxValue: 60,
  trackColor: "#163d3b",
  arcColor: "#32cbd4",
};
let showSecBlink = false;

function drawArc(
  canvasEle,
  config,
  color,
  currentValue
) {
  canvasEle.width = clockWidth;
  canvasEle.height = clockHeight;
  const ctx = canvasEle.getContext("2d");
  ctx.beginPath();
  const { radius, maxValue } = config;
  const angle =
    (currentValue / maxValue) * 2 * Math.PI;

  ctx.arc(
    clockWidth / 2,
    clockHeight / 2,
    radius,
    0,
    angle
  );
  ctx.strokeStyle = color;
  ctx.lineWidth = trackWidth;
  ctx.lineCap = "round";
  ctx.shadowBlur = 10;
  ctx.shadowColor = color;
  ctx.stroke();
}

function drawTracks() {
  drawArc(
    hourTrack,
    hourConfig,
    hourConfig.trackColor,
    12
  );
  drawArc(
    minTrack,
    minConfig,
    minConfig.trackColor,
    60
  );
  drawArc(
    secTrack,
    secConfig,
    secConfig.trackColor,
    60
  );
}
drawTracks();

function showCurrentTime() {
  const date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let postFix = "am";
  if (hh >= 12) {
    hh = hh - 12;
    postFix = "pm";
  }

  //   Toggle blink every second
  showSecBlink = !showSecBlink;
  const showmm = mm < 10 ? "0" + mm : mm;
  const showhh = hh < 10 ? "0" + hh : hh;
  const blink = showSecBlink ? ":" : "\u00A0";

  time.innerHTML = `<span class="hh">${showhh}</span>
  <span class="blink">${blink}</span>
  <span class="mm">${showmm}</span>
  <span class="postfix">${postFix}</span>`;

  drawArc(
    hourArc,
    hourConfig,
    hourConfig.arcColor,
    hh + mm / 60
  );
  drawArc(
    minArc,
    minConfig,
    minConfig.arcColor,
    mm + ss / 60
  );
  drawArc(secArc, secConfig, secConfig.arcColor, ss);
}

// on page load
showCurrentTime();
// On every second, refresh the time
setInterval(showCurrentTime, 1000);
