const bill = document.querySelector("#bill");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const people = document.querySelector("#people");
const buttons = document.querySelectorAll(".choice-buttons button");
const resetButton = document.querySelector(".reset-button");
const peopleError = document.querySelector(".people-error-message");
const billError = document.querySelector(".bill-error-message");
const custom = document.querySelector(".custom");

bill.addEventListener("focus", () => {
  bill.value = "";
  billError.classList.remove("visible");
  bill.classList.remove("error-outline");
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  custom.value = "";
  custom.classList.remove("error-outline");
});

people.addEventListener("focus", () => {
  people.value = "";
  peopleError.classList.remove("visible");
  people.classList.remove("error-outline");
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  custom.value = "";
  custom.classList.remove("error-outline");
});

custom.addEventListener("focus", () => {
  custom.classList.remove("error-outline");
  custom.value = "";
});

const calculate = () => {
  if (
    people.value > 0 &&
    people.value - Math.floor(people.value) === 0 &&
    bill.value >= 0
  ) {
    tipAmount.innerHTML = `$${(
      (billAmount / peopleAmount) *
      percentage
    ).toFixed(2)}`;
    totalAmount.innerHTML = `$${(
      billAmount / peopleAmount +
      tipAmountTotal
    ).toFixed(2)}`;
  } else if (
    people.value > 0 &&
    people.value - Math.floor(people.value) !== 0 &&
    bill.value >= 0
  ) {
    peopleError.classList.add("visible");
    peopleError.innerHTML = "No Decimals";
    people.classList.add("error-outline");
  } else if (
    people.value > 0 &&
    people.value - Math.floor(people.value) !== 0 &&
    bill.value < 0
  ) {
    bill.classList.add("error-outline");
    billError.classList.add("visible");
    peopleError.classList.add("visible");
    peopleError.innerHTML = "No Decimals";
    people.classList.add("error-outline");
  } else if (people.value > 0 && bill.value < 0) {
    bill.classList.add("error-outline");
    billError.classList.add("visible");
  } else if (people.value <= 0 && bill.value >= 0) {
    peopleError.classList.add("visible");
    peopleError.innerHTML = "Can't be zero";
    people.classList.add("error-outline");
  } else {
    bill.classList.add("error-outline");
    billError.classList.add("visible");
    peopleError.classList.add("visible");
    peopleError.innerHTML = "Can't be zero";
    people.classList.add("error-outline");
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    custom.classList.remove("error-outline");
    custom.value = "";
    percentage = button.value;
    billAmount = bill.value;
    peopleAmount = people.value;
    tipAmountTotal = (billAmount / peopleAmount) * percentage;
    calculate();
  });
});

custom.addEventListener("change", () => {
  percentage = custom.value / 100;
  billAmount = bill.value;
  peopleAmount = people.value;
  tipAmountTotal = (billAmount / peopleAmount) * percentage;
  if (custom.value > 0) {
    calculate();
  } else {
    custom.classList.add("error-outline");
  }
});

resetButton.addEventListener("click", () => {
  tipAmount.innerHTML = "0.00";
  totalAmount.innerHTML = "0.00";
  people.value = "1";
  bill.value = "0.00";
  custom.value = "";
  custom.classList.remove("error-outline");
  peopleError.classList.remove("visible");
  people.classList.remove("error-outline");
  billError.classList.remove("visible");
  bill.classList.remove("error-outline");
});
