"use strict";

const alphabets = (function (str) {
  for (let i = 97; i < 123; i++) str += String.fromCharCode(i);
  return str;
})("");

const numbers = (function (str) {
  for (let i = 0; i < 10; i++) str += i;
  return str;
})("");

function merge(arr) {
  const alphaArr = alphabets.split("");
  const numArr = numbers.split("");
  const merged = [...numArr, ...alphaArr];
  let iterate = true;
  while (iterate) {
    if (arr.length < merged.length) {
      const rand = Math.floor(Math.random() * merged.length);
      if (!arr.includes(merged[rand])) arr.push(merged[rand]);
    } else iterate = false;
  }
  return arr;
}

const codes = merge([]);

function generatecode() {
  let code = "";
  for (let i = 0; i < 5; i++) {
    const rand = Math.floor(Math.random() * codes.length);
    code += codes[rand];
  }
  return code;
}

this.onload = function () {
  const verificationCodeWrapper = document.querySelector(".verification-code");
  verificationCodeWrapper.children.item(0).textContent = `${generatecode()}`;
};

const userDataFormat = {
  NAME_FORMAT: /^[a-zA-Z\s.]{2,}$/i,
  EMAIL_FORMAT:
    /^[a-z]{1,}(\d+)?@[a-z]{2,}(\.|\d+)?\.[a-z]{3,7}(\.[a-z]{1,5})?$/i,
  PHONE_FORMAT: /^\d{11}$/,
  ADDRESS_FORMAT: /^[a-zA-Z0-9\s,.'-\/]{3,}$/i,
};

const validationFeedback = {
  NAME_ERROR: "Name format is incorrect. Expected alphabets",
  EMAIL: {
    exist: "Email already exist",
    invalid: "Invalid email address. Must be of this format eg: me@yahoo.com",
  },
  PHONE_ERROR: "Invalid phone no. Must be eleven(11) digits long",
  SELECT_ERROR: "Please select an option",
  ADDRESS_ERROR: "Incorrect address format",
  CODE_ERROR: `Doesn't match`,
};

function validateUserFullName() {
  const InputFeed_Node = document.querySelectorAll(".validation-mssg")[0];
  const inputField = document.querySelectorAll(".input")[0];
  const inputVal = inputField.value;

  if (userDataFormat.NAME_FORMAT.test(inputVal)) {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
    InputFeed_Node.children[0].className = "";
    InputFeed_Node.children[0].textContent = "";
    inputField.classList.remove("inputField-error--js");

    return inputVal;
  } else {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
    InputFeed_Node.children[0].className = "mssg-error--js";
    InputFeed_Node.children[0].textContent = `${validationFeedback.NAME_ERROR}`;
    inputField.classList.add("inputField-error--js");

    return null;
  }
}

function validateUserEmail() {
  const InputFeed_Node = document.querySelectorAll(".validation-mssg")[1];
  const inputField = document.querySelectorAll(".input")[1];
  const inputVal = inputField.value;

  if (userDataFormat.EMAIL_FORMAT.test(inputVal)) {
    if (localStorage.getItem("Registered")) {
      let dataExist = !1;
      JSON.parse(localStorage.getItem("Registered"), (key, value) => {
        if (key === "email" && value === inputVal) dataExist = !0;
      });

      if (dataExist) {
        console.log(true);
        InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
        InputFeed_Node.children[0].className = "mssg-error--js";
        InputFeed_Node.children[0].textContent = `${validationFeedback.EMAIL.exist}`;
        inputField.classList.add("inputField-error--js");

        return null;
      } else {
        InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
        InputFeed_Node.children[0].className = "";
        InputFeed_Node.children[0].textContent = "";
        inputField.classList.remove("inputField-error--js");

        return inputVal;
      }
    } else {
      InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
      InputFeed_Node.children[0].className = "";
      InputFeed_Node.children[0].textContent = "";
      inputField.classList.remove("inputField-error--js");

      return inputVal;
    }
  } else {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
    InputFeed_Node.children[0].className = "mssg-error--js";
    InputFeed_Node.children[0].textContent = `${validationFeedback.EMAIL.invalid}`;
    inputField.classList.add("inputField-error--js");

    return null;
  }
}

function validateUserPhone() {
  const InputFeed_Node = document.querySelectorAll(".validation-mssg")[2];
  const inputField = document.querySelectorAll(".input")[2];
  const inputVal = inputField.value;

  if (userDataFormat.PHONE_FORMAT.test(inputVal)) {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
    InputFeed_Node.children[0].className = "";
    InputFeed_Node.children[0].textContent = "";
    inputField.classList.remove("inputField-error--js");

    return inputVal;
  } else {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
    InputFeed_Node.children[0].className = "mssg-error--js";
    InputFeed_Node.children[0].textContent = `${validationFeedback.PHONE_ERROR}`;
    inputField.classList.add("inputField-error--js");

    return null;
  }
}

function validateSelectField() {
  const selectTitle = document.querySelector(".select-title");
  const InputFeed_Node = document.querySelectorAll(".validation-mssg")[3];

  if (selectTitle.classList.contains("placeholder")) {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
    InputFeed_Node.children[0].className = "mssg-error--js";
    InputFeed_Node.children[0].textContent = `${validationFeedback.SELECT_ERROR}`;

    return null;
  } else {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
    InputFeed_Node.children[0].className = "";
    InputFeed_Node.children[0].textContent = "";
    return selectTitle.textContent;
  }
}

function validateUserAddress() {
  const InputFeed_Node = document.querySelectorAll(".validation-mssg")[4];
  const inputField = document.querySelectorAll(".input")[3];
  const inputVal = inputField.value;

  if (userDataFormat.ADDRESS_FORMAT.test(inputVal)) {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
    InputFeed_Node.children[0].className = "";
    InputFeed_Node.children[0].textContent = "";
    inputField.classList.remove("inputField-error--js");

    return inputVal;
  } else {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
    InputFeed_Node.children[0].className = "mssg-error--js";
    InputFeed_Node.children[0].textContent = `${validationFeedback.ADDRESS_ERROR}`;
    inputField.classList.add("inputField-error--js");

    return null;
  }
}

const promoCode = () => !0;

function validateUserCode() {
  const formCode = document.querySelector(
    ".verification-code span"
  ).textContent;
  const InputFeed_Node = document.querySelectorAll(".validation-mssg")[5];
  const inputField = document.querySelectorAll(".input")[5];
  const userCode = inputField.value;

  if (userCode === formCode) {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "false");
    InputFeed_Node.children[0].className = "";
    InputFeed_Node.children[0].textContent = "";
    inputField.classList.remove("inputField-error--js");

    return userCode;
  } else {
    InputFeed_Node.children[0].setAttribute("aria-invalid", "true");
    InputFeed_Node.children[0].className = "mssg-error--js";
    InputFeed_Node.children[0].textContent = `${validationFeedback.CODE_ERROR}`;
    inputField.classList.add("inputField-error--js");

    return null;
  }
}

const defaultSubmitState = document.querySelector(".default-state");
const submit_verifyingState = document.querySelector(".onsend");
const animationContainer = document.querySelector(".circle-box");

function runVerificationAnimation() {
  defaultSubmitState.classList.remove("default-state--js");
  submit_verifyingState.classList.add("onsend--js");
  animationContainer.classList.add("verifying--animation");
}

function stopVerificationAnimation() {
  defaultSubmitState.classList.add("default-state--js");
  submit_verifyingState.classList.remove("onsend--js");
  animationContainer.classList.remove("verifying--animation");
}

function resetAllField() {
  const inputFields = document.querySelectorAll(".input");
  const selectTitle = document.querySelector(".select-title");

  inputFields.forEach((i) => (i.value = ""));
  selectTitle.classList.add("placeholder");
  selectTitle.textContent = "-- Select item --";
}

function submit(e) {
  e.preventDefault();

  const userData = [];
  runVerificationAnimation();

  setTimeout(function () {
    stopVerificationAnimation();

    userData[0] = validateUserFullName();
    userData[1] = validateUserEmail();
    userData[2] = validateUserPhone();
    userData[3] = validateSelectField();
    userData[4] = validateUserAddress();
    userData[5] = promoCode();
    userData[6] = validateUserCode();

    if (userData.includes(null)) {
      userData.splice(0);
    } else {
      const newData = new (function () {
        this.fullname = userData[0];
        this.email = userData[1];
        this.phone = userData[2];
        this.course = userData[3];
        this.address = userData[4];
        this.promoCode = userData[5];
        this.code = userData[6];
      })();
      if (localStorage.getItem("Registered")) {
        const storage = JSON.parse(localStorage.getItem("Registered"));
        storage.push(newData);
        localStorage.setItem("Registered", JSON.stringify(storage));
      } else {
        const storage = [];
        storage.push(newData);
        localStorage.setItem("Registered", JSON.stringify(storage));
      }

      resetAllField();
    }
  }, 4000);
}

const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", submit);

(function () {
  // Drop down initialization for select option list
  const optionListWrapper = document.querySelector(".select-option-list");
  const optionListHeader = document.querySelector(".select--header");
  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (optionListHeader.getAttribute("aria-expanded") == "false") {
      optionListWrapper.classList.add("expand--js");
      const maxHeight = 262;
      let currHeight = 0;
      const interval = setInterval(() => {
        if (currHeight >= maxHeight) clearInterval(interval);
        else currHeight += 6;
        optionListWrapper.style.height = `${currHeight}px`;
      }, 0);

      optionListHeader.classList.add("rejoin--js");
      optionListHeader.setAttribute("aria-expanded", "true");
    } else {
      const minHeight = 0;
      let currHeight = 262;
      const interval = setInterval(() => {
        if (currHeight <= minHeight) {
          clearInterval(interval);
          optionListWrapper.classList.remove("expand--js");
          optionListHeader.classList.remove("rejoin--js");
        } else currHeight -= 6;
        optionListWrapper.style.height = `${currHeight}px`;
      }, 0);

      optionListHeader.setAttribute("aria-expanded", "false");
    }
  };

  optionListHeader.addEventListener("click", toggle);

  //Closing drop box if mouse pointer clicks on any area of the page
  const closeDropBox = () => {
    if (optionListWrapper.classList.contains("expand--js")) {
      optionListWrapper.classList.remove("expand--js");
      optionListHeader.setAttribute("aria-expanded", "false");
    }
  };
  const page = document.querySelector(".container--fluid");
  page.addEventListener("click", closeDropBox);

  // Making option list selectable
  const selectOption = (e) => {
    e.preventDefault();
    const selectTitle = document.querySelector(".select-title");
    const optionList = document.querySelectorAll(".select-option-list a");

    if (e.target.nodeName === "A") {
      optionList.forEach((a) => {
        if (e.target === a) {
          let selected = a.textContent;
          selectTitle.textContent = selected;
          selectTitle.classList.remove("placeholder");
        }
      });
    }
  };

  //Tieing event to parent of option list
  const ul_optionList = document.querySelector(".select-option-list");
  ul_optionList.addEventListener("click", selectOption);
})();
