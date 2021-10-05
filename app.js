let pin = localStorage.getItem("pin");

function isOnlyDigits(inputPin) {
  const pinNumber = Number(inputPin);
  if (inputPin !== "" && !isNaN(pinNumber)) {
    return true;
  }

  return false;
}

document.querySelector(".save-pin").addEventListener("click", () => {
  pin = document.querySelector(".input-pin").value;

  const warning = document.querySelector(".warning");
  warning.classList.add("hidden");

  if (!isOnlyDigits(pin)) {
    warning.classList.remove("hidden");
    return;
  }

  localStorage.setItem("pin", pin);

  renderScreen(".enter-pin");
  renderEnterPinScreen();
});

document.querySelector(".reset-pin").addEventListener("click", () => {
  pin = "";
  document.querySelector(".input-pin").value = "";
  localStorage.setItem("pin", "");

  renderScreen(".create-pin");
});

function checkPin() {
  const suggestedPinInputs = document.querySelectorAll(".input-digit");
  let suggestedPin = "";
  for (let input of suggestedPinInputs) {
    suggestedPin += input.value;
  }

  if (suggestedPin === pin) {
    showNotification(true);
    return;
  }

  showNotification(false);
}

function showNotification(isSuccess) {
  const notificationWindow = isSuccess ? document.querySelector(".success-message") : document.querySelector(".failure-message");

  setTimeout(() => {
    notificationWindow.style.display = "flex";
  }, 500);

  setTimeout(() => {
    notificationWindow.style.display = "none";
  }, 2000);
}

document.addEventListener("paste", function (e) {
  if (e.target.classList.contains("input-digit")) {
    var data = e.clipboardData.getData("Text");
    data = data.split("");

    const inputs = document.querySelectorAll(".input-digit");
    const inputsArray = Array.from(inputs);

    if (data.length !== inputs.length) {
      alert("В буфере обмена больше символов чем в пин-коде.");
      return;
    }

    inputsArray.forEach((input, index) => {
      if (data[index] === undefined) {
        return;
      }

      input.value = data[index];
      input.focus();

      if (index === inputs.length - 1) {
        checkPin();
      }
    });
  }
});

function moveFocus(digitInput) {
  const currentValue = digitInput.value;

  const nextInput = digitInput.nextSibling;

  if (currentValue !== "" && nextInput) {
    nextInput.focus();
  }

  if (currentValue !== "" && !nextInput) {
    checkPin();
  }
}

function renderEnterPinScreen() {
  if (pin === "") {
    return;
  }

  const inputContainer = document.querySelector(".input-container");
  inputContainer.innerHTML = "";

  for (let i = 0; i < pin.length; i++) {
    const digitInput = document.createElement("input");

    digitInput.classList.add("input-digit");
    digitInput.setAttribute("maxlength", "1");
    digitInput.setAttribute("tabindex", i + 1);

    inputContainer.appendChild(digitInput);

    digitInput.addEventListener("input", () => moveFocus(digitInput));
  }

  document.querySelectorAll(".input-digit")[0].focus();
}

function renderScreen(className) {
  document.querySelector(".create-pin").style.display = "none";
  document.querySelector(".enter-pin").style.display = "none";
  document.querySelector(".graphic-password").style.display = "none";

  document.querySelector(className).style.display = "flex";
}

if (pin === "") {
  renderScreen(".create-pin");
} else {
  renderEnterPinScreen();
  renderScreen(".enter-pin");
}
