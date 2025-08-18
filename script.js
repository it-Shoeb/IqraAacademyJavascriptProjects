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

const customerCaptureWebpageNewCustomer = document.getElementById(
  "customerCaptureWebpage-newCustomer"
);

const customerCaptureWebpageExistCustomer = document.getElementById(
  "customerCaptureWebpage-existCustomer"
);

const NameEl = document.querySelector("#customerCaptureWebpageName");
const EmailEl = document.querySelector("#customerCaptureWebpageEmail");
const TypeEl = document.querySelector("#customerCaptureWebpageType");
const AmountEl = document.querySelector("#customerCaptureWebpageAmount");
const amountLabel = document.querySelector(".amountLabel");

let customerCaptureWebpageTableDataForNewCustomer = [];

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

customerCaptureWebpageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (TypeEl.value === "") {
    return alert("please select the customer type");
  }

  if (TypeEl.value === "newcustomer") {
    if (NameEl.value == "") {
      return alert("Name must not be empty...");
    }
    if (EmailEl.value == "") {
      return alert("Email must not be empty...");
    }

    customerCaptureWebpageTableDataForNewCustomer.push({
      [NameEl.name]: NameEl.value,
      [EmailEl.name]: EmailEl.value,
      amount: 0,
    });
  }

  displayNewCustomer(customerCaptureWebpageTableDataForNewCustomer);

  if (TypeEl.value === "exisitingcustomer") {
    if (NameEl.value == "") {
      return alert("Name must not be empty...");
    }
    if (EmailEl.value == "") {
      return alert("Email must not be empty...");
    }
    if (AmountEl.value == "") {
      return alert("Amount must not be empty...");
    }

    customerCaptureWebpageTableDataForExistingCustomer.push({
      [NameEl.name]: NameEl.value,
      [EmailEl.name]: EmailEl.value,
      [AmountEl.name]: AmountEl.value,
    });

    displayExistingCustomer(customerCaptureWebpageTableDataForExistingCustomer);
  }

  NameEl.value = "";
  EmailEl.value = "";
  AmountEl.value = "";
});

customerCaptureWebpageNewCustomer.addEventListener("click", (e) => {
  if (e.target.classList.contains("customerCaptureWebpage-add")) {
    const tr = e.target.closest("tr");
    const currentCustomer = tr.querySelectorAll("td")[0].textContent;

    const index = customerCaptureWebpageTableDataForNewCustomer.findIndex(
      (customer) => {
        return customer.name === currentCustomer;
      }
    );

    customerCaptureWebpageTableDataForExistingCustomer.push(
      customerCaptureWebpageTableDataForNewCustomer[index]
    );

    if (index !== -1) {
      customerCaptureWebpageTableDataForNewCustomer.splice(index, 1);
    }

    displayNewCustomer(customerCaptureWebpageTableDataForNewCustomer);
    displayExistingCustomer(customerCaptureWebpageTableDataForExistingCustomer);
  }
});

customerCaptureWebpageExistCustomer.addEventListener("click", (e) => {
  if (e.target.classList.contains("customerCaptureWebpage-remove")) {
    const tr = e.target.closest("tr");
    const exisitingcCstomerName = tr.querySelectorAll("td")[0].textContent;

    const index = customerCaptureWebpageTableDataForExistingCustomer.findIndex(
      (customer) => {
        return customer.name === exisitingcCstomerName;
      }
    );

    if (index !== -1) {
      customerCaptureWebpageTableDataForExistingCustomer.splice(index, 1);
    }

    displayExistingCustomer(customerCaptureWebpageTableDataForExistingCustomer);
  }
});

function displayNewCustomer(newCustomer) {
  customerCaptureWebpageNewCustomer.innerHTML = newCustomer
    .map(
      (customer) =>
        `<tr>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>
            <button class="customerCaptureWebpage-add">Add</button>
          </td>
        </tr>`
    )
    .join("");
}

function displayExistingCustomer(exisitingcustomer) {
  customerCaptureWebpageExistCustomer.innerHTML = exisitingcustomer
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
}

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

const budgetmanagementsystemformRemove = document.querySelectorAll(
  ".budgetmanagementsystemform-remove"
);

const budgetmanagementsystemRhsTable = document.querySelectorAll(
  ".budgetmanagementsystem-rhs-table"
);

const budgetTable = [];

function budgetmanagementsystemrhstabletbodyInnerHtml(budgetTable) {
  budgetmanagementsystemrhstabletbody.innerHTML = budgetTable
    .map(
      (budget) =>
        `
      <tr>
        <td>${budget.budgetName}</td>
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
}

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
    budgetmanagementsystemformSelectBudget.innerHTML = `
        <option value="">Select Budget</option>`;
  }
});

budgetmanagementsystemformSelectBudget.addEventListener("change", (e) => {
  amount.value = NaN;
  balanceAmount.value = "";

  if (budgetmanagementsystemformSelectBudget.value == "Microsoft 365 License") {
    const [SelectedBudget] = typesOfBudgets.filter((budget) => {
      return budget.budgetName == "Microsoft 365 License";
    });

    budgetAmount.value = SelectedBudget.budgetAmount;
    remainingAmount.value = SelectedBudget.remainingAmount;

    AmountChangeFun();
  } else if (
    budgetmanagementsystemformSelectBudget.value == "Hardware Update"
  ) {
    const [SelectedBudget] = typesOfBudgets.filter((budget) => {
      return budget.budgetName == "Hardware Update";
    });

    budgetAmount.value = SelectedBudget.budgetAmount;
    remainingAmount.value = SelectedBudget.remainingAmount;

    AmountChangeFun();
  } else if (
    budgetmanagementsystemformSelectBudget.value == "Offshore Support"
  ) {
    const [SelectedBudget] = typesOfBudgets.filter((budget) => {
      return budget.budgetName == "Offshore Support";
    });

    budgetAmount.value = SelectedBudget.budgetAmount;
    remainingAmount.value = SelectedBudget.remainingAmount;

    AmountChangeFun();
  }
});

function AmountChangeFun() {
  amount.addEventListener("keyup", (e) => {
    if (
      parseInt(amount.value) > 0 &&
      parseInt(amount.value) <= parseInt(remainingAmount.value)
    ) {
      balanceAmount.value = remainingAmount.value - amount.value;
    } else {
      alert(
        "amount should not above or negative (eg -2000 and remaining value is 5000 and you put 1000) this invalid"
      );
      amount.value = " ";
    }
  });
}

budgetmanagementsystemform.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = e.target[0];
  const budgetName = e.target[1];
  const budgetAmt = e.target[2];
  const remainingAmt = e.target[3];
  const amt = e.target[4];
  const balanceAmt = e.target[5];

  if (subject.value == "") {
    return alert("subject must not be empty");
  }
  if (budgetName.value == "") {
    return alert("budgetName must not be empty");
  }
  if (amt.value == "") {
    return alert("amt must not be empty");
  }

  budgetTable.push({
    subject: subject.value,
    budgetName: budgetName.value,
    budgetAmt: budgetAmt.value,
    remainingAmt: remainingAmt.value,
    amt: amt.value,
    balanceAmt: balanceAmt.value,
  });

  typesOfBudgets.filter((budget) => {
    if (budget.budgetName == budgetName.value) {
      budget.remainingAmount = balanceAmt.value;
    }
  });

  budgetmanagementsystemrhstabletbodyInnerHtml(budgetTable);

  subject.value = "";
  budgetName.value = "";
  budgetAmt.value = "";
  remainingAmt.value = "";
  amt.value = "";
  balanceAmt.value = "";
});

budgetmanagementsystemRhsTable[0].addEventListener("click", (e) => {
  if (e.target.classList.contains("budgetmanagementsystemform-remove")) {
    const tr = e.target.closest("tr");
    const trbudgetName = tr.querySelectorAll("td")[0].textContent;
    const trAmt = tr.querySelectorAll("td")[2].textContent;
    const trReaminAmt = tr.querySelectorAll("td")[3].textContent;

    const index = budgetTable.findIndex((budget) => {
      return budget.balanceAmt === trReaminAmt;
    });

    typesOfBudgets.filter((budget) => {
      if (budget.budgetName === trbudgetName) {
        budget.remainingAmount =
          parseInt(budget.remainingAmount) + parseInt(trAmt);
      }
    });

    if (index !== -1) {
      budgetTable.splice(index, 1);
    }

    console.log(budgetTable);

    budgetmanagementsystemrhstabletbodyInnerHtml(budgetTable);
  }
});

// Task Scheduler

const taskSchedulerContainerLhsForm = document.querySelector(
  ".taskSchedulerContainerLhs-form"
);
const taskSchedulerContainerRhsCardContainer = document.querySelector(
  ".taskSchedulerContainerRhs-cardContainer"
);

const taskSchedulerData = [];

taskSchedulerContainerLhsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target[0];
  const date = e.target[1];
  const prority = e.target[2];

  if (name.value == "") {
    return alert("name must not be empty");
  }
  if (date.value == "") {
    return alert("date must not be empty");
  }
  if (prority.value == "") {
    return alert("prority must not be empty");
  }

  taskSchedulerData.push({
    name: name.value,
    date: date.value,
    prority: prority.value,
  });

  showTaskSchedular(taskSchedulerData);

  name.value = "";
  date.value = "";
  prority.value = "";
});

function showTaskSchedular(task) {
  taskSchedulerContainerRhsCardContainer.innerHTML = task
    .map(
      (task) =>
        `<div class="card ${task.prority}">
          <p>${task.name}</p>
          <span>${task.date}</span>
          <div class="taskSchedulerContainerRhsCardContainer-cta">
            <button
              class="taskSchedulerContainerRhsCardContainerCta-edit"
            >
              Edit
            </button>
            <button
              class="taskSchedulerContainerRhsCardContainerCta-dele"
            >
              Dele
            </button>
          </div>
        </div>`
    )
    .join("");
}

taskSchedulerContainerRhsCardContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  const taskName = card.querySelector("p").textContent;

  const index = taskSchedulerData.findIndex((task) => {
    console.log(task.name === taskName, task.name, taskName);
    return task.name === taskName;
  });

  if (
    e.target.classList.contains(
      "taskSchedulerContainerRhsCardContainerCta-edit"
    )
  ) {
    const inputValue = prompt(
      "Update Task Name",
      card.querySelector("p").textContent
    );
    console.log(inputValue);

    taskSchedulerData[index].name = inputValue;
    showTaskSchedular(taskSchedulerData);
  }
  if (
    e.target.classList.contains(
      "taskSchedulerContainerRhsCardContainerCta-dele"
    )
  ) {
    if (index !== -1) {
      taskSchedulerData.splice(index, 1);
    }
    showTaskSchedular(taskSchedulerData);
  }
});

// web page with a table containing data

const products = [
  { product: "Apple iPhone 15 Pro", price: "999", category: "Electronics" },
  { product: "Nike Air Zoom Pegasus 40", price: "125", category: "Footwear" },
  { product: 'Samsung 55" 4K Smart TV', price: "549", category: "Electronics" },
  { product: "Levi's 501 Original Jeans", price: "69", category: "Clothing" },
  {
    product: "Dyson V15 Detect Vacuum Cleaner",
    price: "699",
    category: "Home Appliances",
  },
  { product: "KitchenAid Stand Mixer", price: "379", category: "Kitchen" },
  {
    product: "ASUS ROG Strix Gaming Laptop",
    price: "1499",
    category: "Computers",
  },
  {
    product: "Ray-Ban Aviator Sunglasses",
    price: "179",
    category: "Accessories",
  },
  { product: "Adidas Essentials Hoodie", price: "55", category: "Clothing" },
  {
    product: "Fitbit Charge 6 Fitness Tracker",
    price: "149",
    category: "Wearables",
  },
];

const webpageWithATableContainingDataContainerTabletbody =
  document.querySelector(
    ".webpageWithATableContainingDataContainerTable-tbody"
  );

const webpageWithATableContainingDataTopInput = document.querySelector(
  ".webpageWithATableContainingDataTop-input"
);

const webpageWithATableContainingDataContainerTableTheadTr =
  document.querySelector(
    ".webpageWithATableContainingDataContainerTable-theadTr"
  );

showwebpagewithatabledata(products);

function showwebpagewithatabledata(products) {
  webpageWithATableContainingDataContainerTabletbody.innerHTML = products
    .map(
      (product) =>
        `
      <tr>
        <td>${product.product}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
      </tr>
    `
    )
    .join("");
}

webpageWithATableContainingDataTopInput.addEventListener("keyup", (e) => {
  const input = e.target.value.toLowerCase();

  const sortedTableData = products.filter(
    (pro) =>
      pro.product.toLowerCase().includes(input) ||
      pro.price.toString().includes(input) ||
      pro.category.toLowerCase().includes(input)
  );

  console.log(sortedTableData);

  showwebpagewithatabledata(sortedTableData);
});

webpageWithATableContainingDataContainerTableTheadTr.addEventListener(
  "click",
  (e) => {
    let sorted;
    if (e.target.textContent == "Product ⇅") {
      if (e.target.classList.contains("ascending")) {
        e.target.classList.remove("ascending");
        sorted = products.sort((a, b) => a.product.localeCompare(b.product));
      } else {
        e.target.classList.add("ascending");
        sorted = products.sort((a, b) => b.product.localeCompare(a.product));
      }
    }

    if (e.target.textContent == "Price ⇅") {
      console.log("Price");
      if (e.target.classList.contains("ascending")) {
        e.target.classList.remove("ascending");
        sorted = products.sort((a, b) => a.price.localeCompare(b.price));
      } else {
        e.target.classList.add("ascending");
        sorted = products.sort((a, b) => b.price.localeCompare(a.price));
      }
    }

    if (e.target.textContent == "Category ⇅") {
      if (e.target.classList.contains("ascending")) {
        e.target.classList.remove("ascending");
        sorted = products.sort((a, b) => a.category.localeCompare(b.category));
      } else {
        e.target.classList.add("ascending");
        sorted = products.sort((a, b) => b.category.localeCompare(a.category));
      }
    }

    console.log(sorted);
    showwebpagewithatabledata(sorted);
  }
);

function sortingFunc() {}

// manage employee records

// Implement search functionality so users can search for employees by name, age, email, or department.

const manageEmployeeRecordsContainerTopForm = document.querySelector(
  ".manageEmployeeRecordsContainerTop-form"
);

const manageEmployeeRecordsContainerBottomTableTbody = document.querySelector(
  ".manageEmployeeRecordsContainerBottomTable-tbody"
);

const manageEmployeeRecordsContainerMiddleInputContainerInput =
  document.querySelector(
    ".manageEmployeeRecordsContainerMiddleInputContainer-input"
  );

const employeeName = document.querySelector(
  ".manageEmployeeRecordsContainerTopForm-name"
);
const employeeAge = document.querySelector(
  ".manageEmployeeRecordsContainerTopForm-age"
);
const employeeEmailEl = document.querySelector(
  ".manageEmployeeRecordsContainerTopForm-email"
);
const employeeDepartment = document.querySelector(
  ".manageEmployeeRecordsContainerTopForm-department"
);

const manageEmployeeRecordsContainerTopFormSubmit = document.querySelector(
  ".manageEmployeeRecordsContainerTopForm-submit"
);

const employeeData = [];

manageEmployeeRecordsContainerTopForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const employeeName = e.target[0];
  const employeeAage = e.target[1];
  const employeeEmail = e.target[2];
  const employeeDepartment = e.target[3];

  // console.log(employeeName, employeeAage, employeeEmail, employeeDepartment);

  // employeeEmailEl.disabled = "false";

  if (manageEmployeeRecordsContainerTopFormSubmit.value === "Add Employee") {
    employeeData.push({
      employeeName: employeeName.value,
      employeeAage: employeeAage.value,
      employeeEmail: employeeEmail.value,
      employeeDepartment: employeeDepartment.value,
    });
  } else {
    const index = employeeData.findIndex((employee) => {
      return employee.employeeEmail == employeeEmail.value;
    });

    employeeData[index].employeeName = employeeName.value;
    employeeData[index].employeeAage = employeeAage.value;
    // employeeData[index].employeeEmail = employeeEmail.value;
    employeeData[index].employeeDepartment = employeeDepartment.value;

    employeeEmailEl.disabled = false;
    manageEmployeeRecordsContainerTopFormSubmit.value = "Add Employee";
  }

  showEmployeeData(employeeData);

  employeeName.value = "";
  employeeAage.value = "";
  employeeEmail.value = "";
  employeeDepartment.value = "";
});

manageEmployeeRecordsContainerMiddleInputContainerInput.addEventListener(
  "keyup",
  (e) => {
    const inputValue = e.target.value.toLowerCase();

    const filteredEmployees = employeeData.filter((employee) => {
      return employee.employeeName.toLowerCase().includes(inputValue);
    });

    console.log(filteredEmployees);
    showEmployeeData(filteredEmployees);
  }
);

showEmployeeData(employeeData);

function showEmployeeData(employeeData) {
  manageEmployeeRecordsContainerBottomTableTbody.innerHTML = employeeData
    .map(
      (employee) =>
        `
        <tr>
          <td>${employee.employeeName}</td>
          <td>${employee.employeeAage}</td>
          <td>${employee.employeeEmail}</td>
          <td>${employee.employeeDepartment}</td>
          <td
            class="manageEmployeeRecordsContainerBottomTableTbody-cta"
          >
            <button class="manageEmployeeRecordsContainerBottomTableTbodyCta-Edit">Edit</button>
            <button class="manageEmployeeRecordsContainerBottomTableTbodyCta-Dele">Dele</button>
          </td>
        </tr>
        `
    )
    .join("");
}

manageEmployeeRecordsContainerBottomTableTbody.addEventListener(
  "click",
  (e) => {
    const tr = e.target.closest("tr");
    const currentemployeeName = tr.querySelectorAll("td")[0].textContent;

    const index = employeeData.findIndex((employee) => {
      return employee.employeeName === currentemployeeName;
    });

    if (
      e.target.classList.contains(
        "manageEmployeeRecordsContainerBottomTableTbodyCta-Edit"
      )
    ) {
      console.log(e.target.classList.contains);

      manageEmployeeRecordsContainerTopFormSubmit.value = "Edit Employee";
      employeeEmailEl.disabled = true;

      const employee = employeeData[index];

      employeeName.value = employee.employeeName;
      employeeAge.value = employee.employeeAage;
      employeeEmailEl.value = employee.employeeEmail;
      employeeDepartment.value = employee.employeeDepartment;
    }

    if (
      e.target.classList.contains(
        "manageEmployeeRecordsContainerBottomTableTbodyCta-Dele"
      )
    ) {
      console.log("manageEmployeeRecordsContainerBottomTableTbodyCta-Dele");
      if (index !== -1) {
        employeeData.splice(index, 1);
      }
      showEmployeeData(employeeData);
    }
  }
);

// web page that displays a list of items

// Calculate the total number of pages based on the number of items and items per page.

const jsItems = [
  // Keywords
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",

  // Built-in Objects
  "Array",
  "Boolean",
  "Date",
  "Error",
  "Function",
  "JSON",
  "Map",
  "Math",
  "Number",
  "Object",
  "Promise",
  "RegExp",
  "Set",
  "String",
  "Symbol",
  "WeakMap",
  "WeakSet",
  "BigInt",
  "Reflect",

  // Global Functions
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "alert",
  "prompt",
  "confirm",
  "setTimeout",
  "setInterval",

  // Browser APIs
  "document",
  "window",
  "navigator",
  "history",
  "localStorage",
  "sessionStorage",
  "fetch",
  "XMLHttpRequest",
  "addEventListener",
  "removeEventListener",

  // Popular Frameworks & Libraries
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "jQuery",
  "Lodash",
  "D3.js",
  "Three.js",
  "Express",
  "Node.js",
  "NestJS",
  "Socket.io",
  "Chart.js",
  "TailwindCSS",
  "Bootstrap",
  "Moment.js",
];

const webpageThatDisplaysAListOfItemsBottomPrev = document.querySelector(
  ".webpageThatDisplaysAListOfItemsBottom-prev"
);
const webpageThatDisplaysAListOfItemsBottomNext = document.querySelector(
  ".webpageThatDisplaysAListOfItemsBottom-next"
);

const webpageThatDisplaysAListOfItemsTopItems = document.querySelector(
  ".webpageThatDisplaysAListOfItemsTop-items"
);

const paginationBarNumberBar = document.querySelector(
  ".paginationBar-numberBar"
);

let totalItems = jsItems.length;
let perPage = 10;
let pageNo = 1;
let totalPages = Math.floor(jsItems.length / perPage);

// console.log(jsItems.slice(startingIndex, endingIndex));

let button = [];

for (i = 1; i <= totalPages; i++) {
  button.push(i);
}

console.log(button);

paginationBarNumberBar.innerHTML = button
  .map(
    (btn) =>
      `
    <button>${btn}</button>
    `
  )
  .join();

paginationMethod(pageNo, perPage);

function paginationMethod(pageNo, perPage) {
  let startingIndex = (pageNo - 1) * perPage;
  let endingIndex = startingIndex + perPage;

  const toShowItemList = jsItems.slice(startingIndex, endingIndex);

  webpageThatDisplaysAListOfItemsTopItems.innerHTML = toShowItemList
    .map(
      (item) =>
        `
        <li>${item.toUpperCase()}</li>  
      `
    )
    .join("");
}

webpageThatDisplaysAListOfItemsBottomNext.addEventListener("click", (e) => {
  console.log(pageNo, totalPages);
  
  if (pageNo < totalPages) {
    pageNo += 1;
    paginationMethod(pageNo, perPage);
  }
});

webpageThatDisplaysAListOfItemsBottomPrev.addEventListener("click", (e) => {
  if (pageNo > 1) {
    pageNo -= 1;
    paginationMethod(pageNo, perPage);
  }
});

paginationBarNumberBar.addEventListener("click", (e) => {
  const btns = e.target;

  pageNo = btns.textContent;
  paginationMethod(btns.textContent, 10);
});

// users can input their expenses

const usersCanInputTheirExpensesContainerTopForm = document.querySelector(
  ".usersCanInputTheirExpensesContainerTop-form"
);

const usersCanInputTheirExpensesContainerMiddleTableTbody =
  document.querySelector(
    ".usersCanInputTheirExpensesContainerMiddleTable-tbody"
  );

const usersCanInputTheirExpensesContainerBottomSummaryContainerSummary =
  document.querySelector(
    ".usersCanInputTheirExpensesContainerBottomSummaryContainer-summary"
  );

const expenseTracker = [];

usersCanInputTheirExpensesContainerTopForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = e.target[0].value;
  const category = e.target[1].value;
  const description = e.target[2].value;

  if (amount == "") {
    alert("amount must not be empty, please fill input field");
    return;
  }
  if (category == "") {
    alert("category must not be empty, please fill input field");
    return;
  }
  if (description == "") {
    alert("description must not be empty, please fill input field");
    return;
  }

  expenseTracker.push({ amount, category, description });

  console.log(expenseTracker);

  updateBudgetItem();
  usersCanInputTheirExpensesContainerBottomSummaryContainerSummary.textContent = `Overall Expense are ${calculateBudget()}`;

  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";
});

function updateBudgetItem() {
  usersCanInputTheirExpensesContainerMiddleTableTbody.innerHTML = expenseTracker
    .map(
      (budget) =>
        `
      <tr>
        <th>${budget.amount}</th>
        <th>${budget.category}</th>
        <th>${budget.description}</th>
      </tr>
      `
    )
    .join("");
}

let calculateBudgetAmount = 0;

function calculateBudget() {
  calculateBudgetAmount = 0;
  expenseTracker.forEach((expense) => {
    calculateBudgetAmount = calculateBudgetAmount + parseInt(expense.amount);
    console.log(calculateBudgetAmount);
  });
  return calculateBudgetAmount;
}

// registration form

const registrationFormCountry = document.querySelector(
  ".registrationForm-country"
);
const registrationFormCurrency = document.querySelector(
  ".registrationForm-currency"
);

const registrationFormName = document.querySelector(".registrationForm-name");
const registrationFormPassword = document.querySelector(
  ".registrationForm-password"
);
const registrationFormNumber = document.querySelector(
  ".registrationForm-number"
);
const registrationFormEmail = document.querySelector(".registrationForm-email");

const registrationForm = document.querySelector(".registrationForm");

const countriesAndCurrencies = [
  { country: "United States", currency: "United States Dollar (USD)" },
  { country: "Canada", currency: "Canadian Dollar (CAD)" },
  { country: "United Kingdom", currency: "Pound Sterling (GBP)" },
  { country: "Japan", currency: "Japanese Yen (JPY)" },
  { country: "China", currency: "Renminbi (Yuan) (CNY)" },
  { country: "India", currency: "Indian Rupee (INR)" },
  { country: "Australia", currency: "Australian Dollar (AUD)" },
  { country: "Brazil", currency: "Brazilian Real (BRL)" },
  { country: "South Africa", currency: "South African Rand (ZAR)" },
  { country: "Russia", currency: "Russian Ruble (RUB)" },
  { country: "Mexico", currency: "Mexican Peso (MXN)" },
  { country: "Saudi Arabia", currency: "Saudi Riyal (SAR)" },
  { country: "Switzerland", currency: "Swiss Franc (CHF)" },
  { country: "South Korea", currency: "South Korean Won (KRW)" },
  { country: "Argentina", currency: "Argentine Peso (ARS)" },
  { country: "Nigeria", currency: "Nigerian Naira (NGN)" },
  { country: "Turkey", currency: "Turkish Lira (TRY)" },
  { country: "United Arab Emirates", currency: "UAE Dirham (AED)" },
  { country: "Singapore", currency: "Singapore Dollar (SGD)" },
  { country: "New Zealand", currency: "New Zealand Dollar (NZD)" },
];

countriesAndCurrencies.forEach((country) => {
  const option = document.createElement("option");
  option.value = country.country;
  option.textContent = country.country;
  registrationFormCountry.append(option);
});

registrationFormCountry.addEventListener("change", (e) => {
  const [currency] = countriesAndCurrencies.filter((country) => {
    if (country.country == registrationFormCountry.value) {
      return country;
    }
  });

  registrationFormCurrency.value = currency.currency;
});

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = e.target[0];
  const password = e.target[1];
  const number = e.target[2];
  const email = e.target[3];
  const country = e.target[4];
  const currency = e.target[5];

  console.log(name.value, password.value, number.value, email.value);

  if (name.value === "") {
    registrationFormName.classList.remove("hidden");
    return;
  } else {
    registrationFormName.classList.add("hidden");
  }

  if (password.value === "") {
    registrationFormPassword.classList.remove("hidden");
    return;
  } else {
    console.log(password.value.length);

    if (password.value.length < 8) {
      registrationFormPassword.classList.remove("hidden");
      registrationFormPassword.textContent =
        "password must be more than 8 chracters";
      return;
    }

    registrationFormPassword.classList.add("hidden");
  }

  if (number.value === "") {
    registrationFormNumber.classList.remove("hidden");
    return;
  } else {
    registrationFormNumber.classList.add("hidden");
  }

  if (email.value === "") {
    registrationFormEmail.classList.remove("hidden");
    return;
  } else {
    registrationFormEmail.classList.add("hidden");
  }

  name.value = "";
  password.value = "";
  number.value = "";
  email.value = "";
  country.value = "";
  currency.value = "";

  alert("Registration Form Submitted");

  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const numerical = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const specialCharacter = ["!", "@", "#", "$", "%", "&"];
});

// OTPGeneration
// customerCaptureWebpage
// budgetmanagementsystem
// taskScheduler
// webpageWithATableContainingData
// manageEmployeeRecords
// webpageThatDisplaysAListOfItems
// usersCanInputTheirExpenses
// registrationForm
