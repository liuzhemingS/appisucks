"use strict";

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth(); // 0..11

const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const isLeapYear = (year) => {
  return (year % 4 == 0 && year % 100 != 0) || (year % 400 === 0);
};

const daysM = (m, y) => {
  if (m === 1) return isLeapYear(y) ? 29 : 28; // febrero
  else if (m === 8 || m === 3 || m === 5 || m === 10) {
    return 30; // sep, abr, jun, nov
  } else {
    return 31;
  }
};

const fistWeekM = (m, y) => {
  // Monday = 0 ... Sunday = 6
  return (new Date(y, m, 1).getDay() + 6) % 7;
};

function clearContainer(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function updateHeader(y, m) {
  const titleEl = document.querySelector(".botones h1");
  if (titleEl) {
    titleEl.textContent = `${monthNames[m]} ${y}`;
  }
}

function renderCalendar() {
  const dM = daysM(currentMonth, currentYear);
  const firstWM = fistWeekM(currentMonth, currentYear);
  const cellContainer = document.getElementById("cellContainer");
  if (!cellContainer) return;

  // Clear previous cells
  clearContainer(cellContainer);

  // Filler cells before day 1
  for (let i = 0; i < firstWM; i++) {
    const cell = document.createElement("div");
    cell.classList.add("eFillerCells");
    cellContainer.appendChild(cell);
  }

  // Day cells 1..dM
  for (let day = 1; day <= dM; day++) {
    const cell = document.createElement("div");
    cell.classList.add("e");
    cell.textContent = String(day);
    cellContainer.appendChild(cell);
  }

  updateHeader(currentYear, currentMonth);
}

function goPrevMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else {
    currentMonth -= 1;
  }
  renderCalendar();
}

function goNextMonth() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear += 1;
  } else {
    currentMonth += 1;
  }
  renderCalendar();
}

function setupNav() {
  const prevBtn = document.getElementById("frontwardE"); // left arrow => previous
  const nextBtn = document.getElementById("backwardE"); // right arrow => next
  if (prevBtn) prevBtn.addEventListener("click", goPrevMonth);
  if (nextBtn) nextBtn.addEventListener("click", goNextMonth);
}

// Initialize
setupNav();
renderCalendar();
