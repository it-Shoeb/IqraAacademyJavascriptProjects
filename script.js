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

const budgetmanagementsystemformRemove = document.querySelectorAll(
  ".budgetmanagementsystemform-remove"
);

const budgetmanagementsystemRhsTable = document.querySelectorAll(
  ".budgetmanagementsystem-rhs-table"
);

const budgetTable = [
  {
    budgetName: "lorem",
    budgetAmt: "lorem",
    amt: "lorem",
    balanceAmt: "lorem",
  },
  {
    budgetName: "ipsum",
    budgetAmt: "ipsum",
    amt: "ipsum",
    balanceAmt: "ipsum",
  },
  {
    budgetName: "dolor",
    budgetAmt: "dolor",
    amt: "dolor",
    balanceAmt: "dolor",
  },
];

//will be removed
  budgetmanagementsystemrhstabletbodyInnerHtml(budgetTable)

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
  amount.addEventListener("keyup", (e) => {
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

  const subject = e.target[0];
  const budgetName = e.target[1];
  const budgetAmt = e.target[2];
  const remainingAmt = e.target[3];
  const amt = e.target[4];
  const balanceAmt = e.target[5];

  budgetTable.push({
    subject: subject.value,
    budgetName: budgetName.value,
    budgetAmt: budgetAmt.value,
    remainingAmt: remainingAmt.value,
    amt: amt.value,
    balanceAmt: balanceAmt.value,
  });

  const a = typesOfBudgets.filter((budget) => {
    if (budget.budgetName == budgetName.value) {
      budget.remainingAmount = balanceAmt.value;
    }
  });

  if (
    !amount.value &&
    budgetmanagementsystemformSelectSubject.value == " " &&
    budgetmanagementsystemformSelectBudget.value == " "
  ) {
    return alert("field should not exmpty");
  }

  budgetmanagementsystemrhstabletbodyInnerHtml(budgetTable);

  subject.value = "";
  budgetName.value = "";
  budgetAmt.value = "";
  remainingAmt.value = "";
  amt.value = "";
  balanceAmt.value = "";
});

// budgetmanagementsystemformRemove.forEach((remove) => {
console.log(budgetmanagementsystemRhsTable);

budgetmanagementsystemRhsTable[0].addEventListener("click", (e) => {
  console.log(e.target.classList.contains("budgetmanagementsystemform-remove"));
  if (e.target.classList.contains("budgetmanagementsystemform-remove")) {
    console.log(e);
    removeBudget(e.target);
  }
});
// });

function removeBudget(remove) {
  const tr = remove.closest("tr");
  const trReaminAmt = tr.querySelectorAll("td")[3].textContent;

  const index = budgetTable.findIndex((budget) => {
    return budget.balanceAmt === trReaminAmt;
  });

  if (index !== -1) {
    budgetTable.splice(index, 1);
  }

  console.log(index);

  budgetmanagementsystemrhstabletbodyInnerHtml(budgetTable);

  // tr.remove();
}

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

  taskSchedulerData.push({
    name: name.value,
    date: date.value,
    prority: prority.value,
  });

  console.log(taskSchedulerData);

  showTaskSchedular(taskSchedulerData);
});

function showTaskSchedular(task) {
  taskSchedulerContainerRhsCardContainer.innerHTML = task
    .map(
      (task) =>
        `<div class="card ${task.prority}">
          <p>${task.name}</p>
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

// web page with a table containing data

const products = [
  { product: "Apple iPhone 15 Pro", price: 999, category: "Electronics" },
  { product: "Nike Air Zoom Pegasus 40", price: 125, category: "Footwear" },
  { product: 'Samsung 55" 4K Smart TV', price: 549, category: "Electronics" },
  { product: "Levi's 501 Original Jeans", price: 69, category: "Clothing" },
  {
    product: "Dyson V15 Detect Vacuum Cleaner",
    price: 699,
    category: "Home Appliances",
  },
  { product: "KitchenAid Stand Mixer", price: 379, category: "Kitchen" },
  {
    product: "ASUS ROG Strix Gaming Laptop",
    price: 1499,
    category: "Computers",
  },
  {
    product: "Ray-Ban Aviator Sunglasses",
    price: 179,
    category: "Accessories",
  },
  { product: "Adidas Essentials Hoodie", price: 55, category: "Clothing" },
  {
    product: "Fitbit Charge 6 Fitness Tracker",
    price: 149,
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

showwebpagewithatabledata(products);
function showwebpagewithatabledata(products) {
  webpageWithATableContainingDataContainerTabletbody.innerHTML = products
    .map(
      (product) =>
        `
      <tr>
        <td>${product.product}</td>
        <td>${product.category}</td>
        <td>${product.price}</td>
      </tr>
    `
    )
    .join("");
  // products.forEach((product) => {
  //   let tr = document.createElement("tr");
  //   let td1 = document.createElement("td");
  //   let td2 = document.createElement("td");
  //   let td3 = document.createElement("td");

  //   td1.textContent = product.product;
  //   td3.textContent = product.price;
  //   td2.textContent = product.category;

  //   tr.append(td1);
  //   tr.append(td2);
  //   tr.append(td3);

  //   webpageWithATableContainingDataContainerTabletbody.append(tr);
  // });
}

webpageWithATableContainingDataTopInput.addEventListener("keyup", (e) => {
  const input = e.target.value.toLowerCase();

  const sortedTableData = products.filter((pro) =>
    pro.product.toLowerCase().includes(input)
  );

  console.log(sortedTableData);

  showwebpagewithatabledata(sortedTableData);
});

showwebpagewithatabledata(products);

// manage employee records

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

const employeeData = [
  {
    employeeName: "Lorem ipsum dolor",
    employeeAage: "adipisicing elit. Similique",
    employeeEmail: "sit amet consectetur",
    employeeDepartment: "tenetur repellat, nemo",
  },
  {
    employeeName: "quia, culpa velit",
    employeeAage: "doloribus numquam mollitia",
    employeeEmail: "itaque hic consequatur atque",
    employeeDepartment: "quisquam, beatae corrupti",
  },

  {
    employeeName: "nobis? Aliquid ipsam",
    employeeAage: "esse porro.",
    employeeEmail: "ipsum dolor, sit",
    employeeDepartment: "amet consectetur adipisicing",
  },
  {
    employeeName: "elit. Similique tenetur",
    employeeAage: "repellat, nemo quia",
    employeeEmail: "culpa velit doloribus",
    employeeDepartment: "numquam mollitia itaque",
  },
  {
    employeeName: "hic consequatur atque",
    employeeAage: "quisquam, beatae corrupti",
    employeeEmail: "nobis? Aliquid",
    employeeDepartment: "ipsam esse porro.",
  },
];

manageEmployeeRecordsContainerTopForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const employeeName = e.target[0];
  const employeeAage = e.target[1];
  const employeeEmail = e.target[2];
  const employeeDepartment = e.target[3];

  employeeData.push({
    employeeName: employeeName.value,
    employeeAage: employeeAage.value,
    employeeEmail: employeeEmail.value,
    employeeDepartment: employeeDepartment.value,
  });

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
            <button>Edit</button>
            <button>Dele</button>
          </td>
        </tr>
        `
    )
    .join("");
}
// web page that displays a list of items

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
  // "else", "enum", "export", "extends", "false", "finally", "for", "function", "if",
  // "import", "in", "instanceof", "let", "new", "null", "return", "super", "switch", "this",
  // "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield",

  // Built-in Objects
  // "Array", "Boolean", "Date", "Error", "Function", "JSON", "Map", "Math", "Number", "Object",
  // "Promise", "RegExp", "Set", "String", "Symbol", "WeakMap", "WeakSet", "BigInt", "Reflect",

  // // Global Functions
  // "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "eval", "isFinite",
  // "isNaN", "parseFloat", "parseInt", "alert", "prompt", "confirm", "setTimeout", "setInterval",

  // // Browser APIs
  // "document", "window", "navigator", "history", "localStorage", "sessionStorage",
  // "fetch", "XMLHttpRequest", "addEventListener", "removeEventListener",

  // // Popular Frameworks & Libraries
  // "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "jQuery", "Lodash", "D3.js", "Three.js",
  // "Express", "Node.js", "NestJS", "Socket.io", "Chart.js", "TailwindCSS", "Bootstrap", "Moment.js"
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

let totalItems = jsItems.length;
let perPage = 1;
let pageNo = 1;
let totalPages = jsItems.length / perPage;

// console.log(jsItems.slice(startingIndex, endingIndex));

paginationMethod(pageNo, perPage);

function paginationMethod(pageNo, perPage) {
  let startingIndex = (pageNo - 1) * perPage;
  let endingIndex = startingIndex + perPage;

  jsItems.slice(startingIndex, endingIndex).forEach((item, index) => {
    // const li = document.createElement("li");
    // li.textContent = `${index + 1}: ${item.toUpperCase()}`;
    // // webpageThatDisplaysAListOfItemsTopItems.append(li);
    webpageThatDisplaysAListOfItemsTopItems.innerHTML = `
      <li>${item.toUpperCase()}</li>
    `;
  });
}

webpageThatDisplaysAListOfItemsBottomNext.addEventListener("click", (e) => {
  if (pageNo <= totalPages) {
    pageNo += 1;
    paginationMethod(pageNo, 1);
    console.log(totalPages, pageNo);
  } else {
    // webpageThatDisplaysAListOfItemsBottomNext.style.disabled;
  }
});

webpageThatDisplaysAListOfItemsBottomPrev.addEventListener("click", (e) => {
  // webpageThatDisplaysAListOfItemsBottomPrev.setAttribute('disabled');
  if (pageNo > 0) {
    pageNo -= 1;
    paginationMethod(pageNo, 1);
  } else {
    webpageThatDisplaysAListOfItemsBottomPrev.disabled;
  }
  console.log(totalPages, pageNo);
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
