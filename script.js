// header
const toggleSwitch = document.querySelector(".toggle-switch");
const navLinks = document.querySelector(".nav-links");

toggleSwitch.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");

  if (navLinks.classList.contains("hidden")) {
    toggleSwitch.textContent = "Menu";
  } else {
    toggleSwitch.textContent = "Close";
  }

  //   console.log(navLinks.classList.contains("hidden"));
});

// OTP (One-Time Password) generation

let CurrentOTP;

const otpInputField = document.querySelector(".otpInputField");
const getOTP = document.querySelector(".getOTP");
const checkOTP = document.querySelector(".checkOTP");
const timer = document.querySelector(".timer");

let timeleft = 2 * 60; /* turn 2 minutes into 120 seconds */
let timerInterval;

getOTP.addEventListener("click", () => {
  CurrentOTP = Math.floor(1000 + Math.random() * 9000);
  alert(CurrentOTP);
  timeleft = 2 * 60;
  timerInterval = setInterval(() => {
    let minute = Math.floor(timeleft / 60);
    let second = timeleft % 60;

    timer.textContent = `${String(minute).padStart(2, "0")}:${String(
      second
    ).padStart(2, "0")}`;

    console.log(
      `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
    );

    if (timeleft <= 0) {
      clearInterval(timerInterval);
      getOTP.classList.remove("disabled");
      timer.classList.add("hidden");
      CurrentOTP = "";
      alert("time's up");
    }
    timeleft--;
  }, 100);

  getOTP.classList.add("disabled");
  timer.classList.remove("hidden");
});

checkOTP.addEventListener("click", () => {
  if (otpInputField.value && CurrentOTP) {
    if (otpInputField.value == CurrentOTP) {
      clearInterval(timerInterval);
      alert("OTP is Correct, You can Proced");
      getOTP.classList.remove("disabled");
      timer.classList.add("hidden");
      otpInputField.value = "";
    } else {
      alert("Sorry OTP is Wrong, re-enter the OTP");
    }
  } else {
    alert(
      "Input field is empty, please fill the input field or please generate OTP first"
    );
  }
});

// customer capture webpage

const customerCaptureWebpageForm = document.querySelector(
  ".customerCaptureWebpage-form"
);

const NameEl = document.querySelector("#customerCaptureWebpageName");
const EmailEl = document.querySelector("#customerCaptureWebpageEmail");
const TypeEl = document.querySelector("#customerCaptureWebpageType");
const AmountEl = document.querySelector("#customerCaptureWebpageAmount");
const amountLabel = document.querySelector(".amountLabel");

const customerCaptureWebpageNewCustomer = document.getElementById(
  "customerCaptureWebpage-newCustomer"
);
const customerCaptureWebpageExistCustomer = document.getElementById(
  "customerCaptureWebpage-existCustomer"
);

let customerCaptureWebpageTableDataForNewCustomer = [
  //   { name: "Shoeb Shakil Shaikh", email: "admin@example.com" },
  //   { name: "Shoeb Shakil Shaikh", email: "admin@example.com" },
  //   { name: "Shoeb Shakil Shaikh", email: "admin@example.com" },
];
let customerCaptureWebpageTableDataForExistingCustomer = [];

TypeEl.addEventListener("change", (e) => {
  if (TypeEl.value === "exisitingcustomer") {
    AmountEl.classList.remove("hidden");
    amountLabel.classList.remove("hidden");
  } else {
    AmountEl.classList.add("hidden");
    amountLabel.classList.add("hidden");
  }
});

// customerCaptureWebpageAdd.map((add) =>
//   customerCaptureWebpageAdd.addEventListener("click", (e) => {
//     console.log(e);
//   })
// );

const customerCaptureWebpageAdd = document.querySelectorAll(
  ".customerCaptureWebpage-add"
);

const customerCaptureWebpageRemove = document.querySelectorAll(
  ".customerCaptureWebpage-remove"
);

customerCaptureWebpageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   if (NameEl !== "" && EmailEl !== "" && TypeEl !== "" && AmountEl !== "") {
  //     alert("Empty Input Field Not Required");
  //   }

  if (TypeEl.value === "exisitingcustomer") {
    customerCaptureWebpageTableDataForExistingCustomer.push({
      [NameEl.name]: NameEl.value,
      [EmailEl.name]: EmailEl.value,
      [AmountEl.name]: AmountEl.value,
    });

    customerCaptureWebpageExistCustomer.innerHTML =
      customerCaptureWebpageTableDataForExistingCustomer.map(
        (customer) =>
          `
    <tr>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.amount}</td>
        <td><button class="customerCaptureWebpage-remove">Remove</button></td>
    </tr>
    `
      );
  } else {
    customerCaptureWebpageTableDataForNewCustomer.push({
      [NameEl.name]: NameEl.value,
      [EmailEl.name]: EmailEl.value,
    });

    customerCaptureWebpageNewCustomer.innerHTML =
      customerCaptureWebpageTableDataForNewCustomer.map(
        (customer) =>
          `<tr>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>
            <button class="customerCaptureWebpage-add">Add</button>
          </td>
        </tr>`
      );
  }

  console.log(customerCaptureWebpageAdd);

  NameEl.value = "";
  EmailEl.value = "";
  AmountEl.value = "";

  console.log(
    "NewCustomer",
    customerCaptureWebpageTableDataForNewCustomer,
    "ExistingCustomer",
    customerCaptureWebpageTableDataForExistingCustomer
  );
});

// budget management system
// Task Scheduler
// web page with a table containing data
// manage employee records
// web page that displays a list of items
// users can input their expenses
// registration form

// OTPGeneration
// customerCaptureWebpage
// budgetmanagementsystem
// taskScheduler
// webpageWithATableContainingData
// manageEmployeeRecords
// webpageThatDisplaysAListOfItems
// usersCanInputTheirExpenses
// registrationForm
