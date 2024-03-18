function daysBetweenDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
  return diffDays;
}

function convertToPersianNumber(input) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const inputStr = input.toString();
  let persianNumber = "";
  for (let i = 0; i < inputStr.length; i++) {
    const digit = inputStr[i];
    if (!isNaN(digit)) {
      persianNumber += persianDigits[parseInt(digit)];
    } else {
      persianNumber += digit;
    }
  }

  return persianNumber;
}

function createIcon(number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
    <text x="5" y="35" font-size="32" fill="#faa61a">${number}</text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function changeIcon(number) {
  const iconPath = createIcon(number);
  chrome.action.setIcon({ path: iconPath });
}

function calculateDistanceToApril25() {
  const today = new Date();
  let april25ThisYear = new Date(today.getFullYear(), 3, 25);
  if (today > april25ThisYear) {
    april25ThisYear = new Date(today.getFullYear() + 1, 3, 25);
  }
  const distance = daysBetweenDates(today, april25ThisYear);
  const persianDistance = convertToPersianNumber(distance);
  document.getElementById("countdown").textContent = `${persianDistance} روز`;
  changeIcon(distance);
}
calculateDistanceToApril25();
