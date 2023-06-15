const date_picker = document.querySelector(".date-picker-wrapper");
const selected_date = document.querySelector(".selected-date");
const dates = document.querySelector(".dates-container");
const months_element = document.querySelector(".month .month-item");
const next_month = document.querySelector(".month .next-month");
const prev_month = document.querySelector(".month .prev-month");
const days = document.querySelector(".days-container");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

// adding content to the month element
months_element.textContent = months[month] + " " + year;

// adding content to the selected date element
selected_date.textContent = formatDate(date);
selected_date.dataset.value = selectedDate;

populateDates();

// attaching event listener to date picker element
date_picker.addEventListener("click", toggleDatePicker);

// attaching event listener to next month button
next_month.addEventListener("click", goToNextMonth);

// attaching event listener to previous month button
prev_month.addEventListener("click", goToPrevMonth);


// checks for the element class if it exists in any of the path elements
// return type : bool
function checkClassExist(path, element) {
  for (let i = 0; i < path.length; i++) {
    // console.log(path[i].classList);
    if (path[i].classList && path[i].classList.contains(element)) return true;
  }
  return false;
}

// toggles the date-picker element
// return type : void
function toggleDatePicker(e) {
  console.log(e.composedPath());
  if (!checkClassExist(e.composedPath(), "dates-container")) {
    dates.classList.toggle("active");
  }
}

// goes to the next month
// return type : void
function goToNextMonth() {
    month++;
    // to handle the next year
    if(month > 11) {
        month = 0;
        year++;
    }
    months_element.textContent = months[month] + " " + year;
}

// goes to the previous month
// return type : void
function goToPrevMonth() {
    month--;
    // to handle the previous year
    if(month < 0) {
        month = 11;
        year--;
    }
    months_element.textContent = months[month] + " " + year;
}

// populates the days in the days container
// return type : void
function populateDates() {
    days.innerHTML = "";
    let totalDays ;
    // to handle the leap year
    if(month == 1) {
        if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            totalDays = 29;
        } else {
            totalDays = 28;
        }
    }
    // to handle the months with 30 days
    else if(month == 3 || month == 5 || month == 8 || month == 10) {
        totalDays = 30;
    }
    // to handle the months with 31 days
    else {
        totalDays = 31;
    }
  
    for (let i = 0; i < totalDays; i++) {
      const day_element = document.createElement("div");
      day_element.classList.add("day");
      day_element.textContent = i + 1;
  
      if (
        selectedDay == i + 1 &&
        selectedYear == year &&
        selectedMonth == month
      ) {
        day_element.classList.add("selected");
      }
  
      day_element.addEventListener("click", function () {
        selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
        selectedDay = i + 1;
        selectedMonth = month;
        selectedYear = year;
  
        selected_date.textContent = formatDate(selectedDate);
        selected_date.dataset.value = selectedDate;
  
        populateDates();
      });
  
      days.appendChild(day_element);
    }
  }
  
//   formats the date in the required format
  function formatDate(selectedDate) {
    let day = selectedDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
  
    let month = selectedDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
  
    let year = selectedDate.getFullYear();
  
    return day + " / " + month + " / " + year;
  }