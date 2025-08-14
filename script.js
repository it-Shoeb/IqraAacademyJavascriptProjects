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

let customerCaptureWebpageTableDataForNewCustomer = [];
let customerCaptureWebpageTableDataForExistingCustomer = [];

console.log(
  NameEl.textContent !== "",
  EmailEl.textContent !== "",
  AmountEl.textContent !== ""
);

TypeEl.addEventListener("change", (e) => {
  if (TypeEl.value === "exisitingcustomer") {
    AmountEl.classList.remove("hidden");
    amountLabel.classList.remove("hidden");
  } else {
    AmountEl.classList.add("hidden");
    amountLabel.classList.add("hidden");
  }
});

customerCaptureWebpageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (TypeEl.value === "exisitingcustomer") {
    if (
      NameEl.textContent !== "" &&
      EmailEl.textContent !== "" &&
      AmountEl.textContent !== ""
    ) {
      return alert("Empty Input Field Not Required");
    }
    customerCaptureWebpageTableDataForExistingCustomer.push({
      [NameEl.name]: NameEl.value,
      [EmailEl.name]: EmailEl.value,
      [AmountEl.name]: AmountEl.value,
    });

    customerCaptureWebpageExistCustomer.innerHTML =
      customerCaptureWebpageTableDataForExistingCustomer
        .map(
          (customer) =>
            `
    <tr>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.amount}</td>
        <td>
        <button class="customerCaptureWebpage-remove">Remove</button>
        </td>
        </tr>
    `
        )
        .join("");
  } else {
    if (NameEl.textContent !== "" && EmailEl.textContent !== "") {
      return alert("Empty Input Field Not Required");
    }
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

  NameEl.value = "";
  EmailEl.value = "";
  AmountEl.value = "";

  const customerCaptureWebpageAdd = document.querySelectorAll(
    ".customerCaptureWebpage-add"
  );
  // if (customerCaptureWebpageTableDataForNewCustomer.length) {
  customerCaptureWebpageAdd.forEach((add) => {
    add.addEventListener("click", (e) => {
      const tableRow = add.closest("tr");
      const tableData = tableRow.querySelectorAll("td");

      const name = tableData[0].textContent;
      const email = tableData[1].textContent;
      const amount = 0;

      const filterDate = customerCaptureWebpageTableDataForNewCustomer.filter(
        (customer, index) => {
          if (customer.name == name) {
            console.log("customer", customer, "index", index);

            customerCaptureWebpageTableDataForNewCustomer.splice(index, 1);

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
        }
      );

      customerCaptureWebpageTableDataForExistingCustomer.push({
        name,
        email,
        amount,
      });

      customerCaptureWebpageExistCustomer.innerHTML =
        customerCaptureWebpageTableDataForExistingCustomer.map(
          (customer) =>
            `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.amount}</td>
                <td>
                  <button class="customerCaptureWebpage-remove">Remove</button>
                </td>
            </tr>
            `
        );

      const customerCaptureWebpageRemove = document.querySelectorAll(
        ".customerCaptureWebpage-remove"
      );

      // if (customerCaptureWebpageTableDataForExistingCustomer.length > 0) {
      customerCaptureWebpageRemove.forEach((remove) => {
        remove.addEventListener("click", (e) => {
          const tableRow = remove.closest("tr");
          const tableData = tableRow.querySelectorAll("td");

          console.log(tableRow, tableData);
          const email = tableData[1].textContent;

          const filterdData =
            customerCaptureWebpageTableDataForExistingCustomer.filter(
              (customer, index) => {
                if (customer.email == email) {
                  console.log(customer.email == email, customer.email, email);

                  return customerCaptureWebpageTableDataForExistingCustomer.splice(
                    index,
                    1
                  );
                }
              }
            );

          console.log(customerCaptureWebpageTableDataForExistingCustomer);

          customerCaptureWebpageExistCustomer.innerHTML =
            customerCaptureWebpageTableDataForExistingCustomer.map(
              (customer) =>
                `
              <tr>
                  <td>${customer.name}</td>
                  <td>${customer.email}</td>
                  <td>${customer.amount}</td>
                  <td>
                    <button class="customerCaptureWebpage-remove">Remove</button>
                  </td>
              </tr>
              `
            );
        });
      });
      // }
    });
  });
  // }
});

// budget management system

const budgetmanagementsystemformSelectSubject = document.querySelector(
  ".budgetmanagementsystemform-selectSubject"
);
const budgetmanagementsystemformSelectBudget = document.querySelector(
  ".budgetmanagementsystemform-selectBudget"
);
const budgetmanagementsystemform = document.querySelector(
  ".budgetmanagementsystem-form"
);

const budgetAmount = document.querySelector(
  ".budgetmanagementsystemform-budgetAmount"
);
const remainingAmount = document.querySelector(
  ".budgetmanagementsystemform-remainingAmount"
);
const amount = document.querySelector(".budgetmanagementsystemform-amount");
const balanceAmount = document.querySelector(
  ".budgetmanagementsystemform-balanceAmount"
);

const budgetmanagementsystemrhstabletbody = document.querySelector(
  ".budgetmanagementsystemrhstable-tbody"
);

const budgetTable = [];

const typesOfBudgets = [
  {
    budgetName: "Microsoft 365 License",
    budgetAmount: 25000,
    remainingAmount: 25000,
  },
  {
    budgetName: "Hardware Update",
    budgetAmount: 5000,
    remainingAmount: 5000,
  },
  {
    budgetName: "Offshore Support",
    budgetAmount: 2000,
    remainingAmount: 2000,
  },
];

budgetmanagementsystemformSelectSubject.addEventListener("change", (e) => {
  if (budgetmanagementsystemformSelectSubject.value !== "") {
    budgetmanagementsystemformSelectBudget.innerHTML = `                
      <option value="">Select Budget</option>
      <option value="Microsoft 365 License">Microsoft 365 License</option>
      <option value="Hardware Update">Hardware Update</option>
      <option value="Offshore Support">Offshore Support</option>`;
  } else {
    // budgetmanagementsystemformSelectBudget.innerHTML = `
    //       <option value="">Select Budget</option>
    // `;
    budgetmanagementsystemformSelectBudget.innerHTML = `                
        <option value="">Select Budget</option>
        <option value="Microsoft 365 License">Microsoft 365 License</option>
        <option value="Hardware Update">Hardware Update</option>
        <option value="Offshore Support">Offshore Support</option>`;
  }
});

function AmountChangeFun() {
  amount.addEventListener("change", (e) => {
    if (
      parseInt(amount.value) > 0 &&
      parseInt(amount.value) <= parseInt(remainingAmount.value)
    ) {
      balanceAmount.value = remainingAmount.value - amount.value;
    } else {
      console.log(
        "amount should not above and negative (eg -2000 and remaining value is 5000 and you 1000) this invalid"
      );
    }
  });
}

budgetmanagementsystemformSelectBudget.addEventListener("change", (e) => {
  amount.value = NaN;
  balanceAmount.value = "";
  if (budgetmanagementsystemformSelectBudget.value == "Microsoft 365 License") {
    console.log("Microsoft 365 License");

    const [SelectedBudget] = typesOfBudgets.filter((budget) => {
      return budget.budgetName == "Microsoft 365 License";
    });

    budgetAmount.value = SelectedBudget.budgetAmount;
    remainingAmount.value = SelectedBudget.remainingAmount;

    AmountChangeFun();
  } else if (
    budgetmanagementsystemformSelectBudget.value == "Hardware Update"
  ) {
    console.log("Hardware Update");

    const [SelectedBudget] = typesOfBudgets.filter((budget) => {
      return budget.budgetName == "Hardware Update";
    });

    budgetAmount.value = SelectedBudget.budgetAmount;
    remainingAmount.value = SelectedBudget.remainingAmount;

    AmountChangeFun();
  } else if (
    budgetmanagementsystemformSelectBudget.value == "Offshore Support"
  ) {
    console.log("Offshore Support");

    const [SelectedBudget] = typesOfBudgets.filter((budget) => {
      return budget.budgetName == "Offshore Support";
    });

    budgetAmount.value = SelectedBudget.budgetAmount;
    remainingAmount.value = SelectedBudget.remainingAmount;

    AmountChangeFun();
  }
});

budgetmanagementsystemform.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = e.target[0].value;
  const budget = e.target[1].value;
  const budgetAmt = e.target[2].value;
  const remainingAmt = e.target[3].value;
  const amt = e.target[4].value;
  const balanceAmt = e.target[5].value;

  budgetTable.push({
    subject,
    budget,
    budgetAmt,
    remainingAmt,
    amt,
    balanceAmt,
  });

  if (
    !amount.value &&
    budgetmanagementsystemformSelectSubject.value == " " &&
    budgetmanagementsystemformSelectBudget.value == " "
  ) {
    return alert("field should not exmpty");
  }

  budgetmanagementsystemrhstabletbody.innerHTML = budgetTable
    .map(
      (budget) =>
        `
    <tr>
      <td>${budget.budget}</td>
      <td>${budget.budgetAmt}</td>
      <td>${budget.amt}</td>
      <td>${budget.balanceAmt}</td>
      <td>
        <button
          class="budgetmanagementsystemform-remove"
          id="budgetmanagementsystemform-remove"
        >
          Remove
        </button>
      </td>
    </tr>
  `
    )
    .join("");
});

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
