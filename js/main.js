const continer = document.querySelector(".continer"),
  step = document.querySelectorAll(".stepNum"),
  content = document.querySelectorAll(".content"),
  btnBack = document.querySelector(".btnBack"),
  btnNext = document.querySelector(".btnNext"),
  restartBtn = document.querySelector(".restartBtn"),
  personalInfo = document.forms.personalInfoForm,
  plansForm = document.forms.chooserPlanForm,
  addOnsForm = document.forms.addOnsForm,
  finishClalculator = document.querySelector(".finish");
let contentIndex = 0,
  PIFValidNum = [false, false, false],
  whenCalculate = 0,
  yearOrMonth = "mo";

// eventlar
btnNext.addEventListener("click", () => {
  for (let i = 0; i < PIFValidNum.length; i++) {
    if (!PIFValidNum[i]) {
      personalInfo.querySelectorAll("input").forEach((e, i) => {
        validationPIF(e, i);
      });
      return null;
    }
  }
  whenCalculate += 1;
  if (whenCalculate === 3) {
    btnNext.innerText = "Tasdiqlang";
    btnNext.classList.add("confirm");
    calculation();
  }
  if (whenCalculate === 4) {
    getData();
  }
  stepControler("+");
  forMedia(contentIndex);
});

btnBack.addEventListener("click", () => {
  whenCalculate -= 1;
  if (whenCalculate !== 3) {
    btnNext.innerText = "Keyingi qadam";
    btnNext.classList.remove("confirm");
  }
  stepControler("-");
  forMedia(contentIndex);
});

finishClalculator
  .querySelector(".name .change")
  .addEventListener("click", () => {
    whenCalculate = 1;
    content[3].classList.remove("isActive");
    step[3].classList.remove("isActive");
    content[1].classList.add("isActive");
    step[1].classList.add("isActive");
    contentIndex = 1;
  });

personalInfo.querySelectorAll("input").forEach((e, i) => {
  e.addEventListener("change", () => {
    validationPIF(e, i);
  });
});

plansForm.querySelectorAll(".plan").forEach((item, index, array) => {
  item.querySelector("input").addEventListener("input", () => {
    array.forEach((item) => {
      item.classList.remove("isActive");
    });
    plan = item.querySelector(".planInfo span").innerText;
    item.classList.add("isActive");
    item.querySelector("input").checked;
  });
});

plansForm.querySelector(".yearOrMonth input").addEventListener("input", (e) => {
  //plan yilga yoki oyga utkazishga
  if (plansForm.querySelector(".yearOrMonth input").checked === true) {
    yearOrMonth = "yr";
    plansForm.querySelectorAll("button")[0].classList.remove("isActive");
    plansForm.querySelectorAll("button")[1].classList.add("isActive");
    plansForm
      .querySelectorAll(".plan")[0]
      .querySelectorAll("span")[1].innerText = "$90/yr";
    plansForm
      .querySelectorAll(".plan")[1]
      .querySelectorAll("span")[1].innerText = "$120/yr";
    plansForm
      .querySelectorAll(".plan")[2]
      .querySelectorAll("span")[1].innerText = "$150/yr";
    plansForm.querySelectorAll(".plan").forEach((item) => {
      item.querySelectorAll("span")[2].style.display = "inline";
    });
    addOnsForm
      .querySelectorAll(".addOns-item")[0]
      .querySelector(".addOns-price").innerText = "+$10/yr";
    addOnsForm
      .querySelectorAll(".addOns-item")[1]
      .querySelector(".addOns-price").innerText = "+$20/yr";
    addOnsForm
      .querySelectorAll(".addOns-item")[2]
      .querySelector(".addOns-price").innerText = "+$20/yr";
  } else {
    yearOrMonth = "mo";
    plansForm.querySelectorAll("button")[1].classList.remove("isActive");
    plansForm.querySelectorAll("button")[0].classList.add("isActive");
    plansForm
      .querySelectorAll(".plan")[0]
      .querySelectorAll("span")[1].innerText = "$9/mo";
    plansForm
      .querySelectorAll(".plan")[1]
      .querySelectorAll("span")[1].innerText = "$12/mo";
    plansForm
      .querySelectorAll(".plan")[2]
      .querySelectorAll("span")[1].innerText = "$15/mo";
    plansForm.querySelectorAll(".plan").forEach((item) => {
      item.querySelectorAll("span")[2].style.display = "none";
    });
    addOnsForm
      .querySelectorAll(".addOns-item")[0]
      .querySelector(".addOns-price").innerText = "+$1/mo";
    addOnsForm
      .querySelectorAll(".addOns-item")[1]
      .querySelector(".addOns-price").innerText = "+$2/mo";
    addOnsForm
      .querySelectorAll(".addOns-item")[2]
      .querySelector(".addOns-price").innerText = "+$2/mo";
  }
});

addOnsForm.querySelectorAll(".addOns-item").forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.querySelector("input").checked === false) {
      item.querySelector("input").checked = true;
      item.style.borderColor = "#483EFF";
      item.style.backgroundColor = "#F8F9FF";
      // addition[index].style.display = "flex";
    } else {
      item.querySelector("input").checked = false;
      item.style.borderColor = "#D6D9E6";
      item.style.backgroundColor = "#ffffff";
      // addition[index].style.display = "none";
    }
  });
});

restartBtn.addEventListener("click", (e) => {
  localStorage.setItem("theEnd", "");
  window.location.reload();
});

// conteynerni joylashtirish
if (window.innerWidth > 768) {
  continer.style.translate = `0 ${
    document.documentElement.clientHeight / 2 - continer.offsetHeight / 2
  }px`;
}

// contentlarni boshqarish
function stepControler(where) {
  content[contentIndex].classList.remove("isActive");
  step[contentIndex].classList.remove("isActive");
  if (where === "+") {
    if (contentIndex === 0) {
      btnBack.classList.remove("isActive");
    }
    contentIndex++;
  } else {
    if (contentIndex === 1) {
      btnBack.classList.add("isActive");
    }
    contentIndex--;
  }
  content[contentIndex].classList.add("isActive");
  if (contentIndex < step.length) {
    step[contentIndex].classList.add("isActive");
  } else {
    btnNext.classList.add("isActive");
    btnBack.classList.add("isActive");
  }
}

// telefonda content pastga tiqilib qolmasligini oldini oladi
function forMedia(i) {
  if (window.innerWidth < 768) {
    continer.querySelector(
      ".contentsInfo"
    ).style.minHeight = `${content[i].offsetHeight}px`;
  }
}
forMedia(contentIndex);

// shaxsiy axborot validatsiyasi(tekshirish malumotlarni)
function validationPIF(idInp, i) {
  if (idInp.value === "") {
    personalInfo.querySelectorAll(".getInfo")[i].classList.add("error");
    idInp.nextElementSibling.innerText = "Bu maydon to‘ldirilishi shart";
    PIFValidNum[i] = false;
    return null;
  } else {
    personalInfo.querySelectorAll(".getInfo")[i].classList.remove("error");
  }
  if (idInp.name === "name") {
    if (/0-9/.test(idInp.value) || /^\d+$/.test(idInp.value)) {
      personalInfo.querySelectorAll(".getInfo")[i].classList.add("error");
      idInp.nextElementSibling.innerText = "Ismni tugri kiriting";
      PIFValidNum[i] = false;
      return null;
    } else if (idInp.value.length < 3) {
      personalInfo.querySelectorAll(".getInfo")[i].classList.add("error");
      idInp.nextElementSibling.innerText = "Ism 3 ta harifdan kam bo'lmasin";
      PIFValidNum[i] = false;
      return null;
    } else {
      personalInfo.querySelectorAll(".getInfo")[i].classList.remove("error");
      PIFValidNum[i] = true;
    }
  } else if (idInp.name === "email") {
    if (!idInp.value.endsWith("@gmail.com")) {
      personalInfo.querySelectorAll(".getInfo")[i].classList.add("error");
      idInp.nextElementSibling.innerText = "Email pochtani tugri kiriting";
      PIFValidNum[i] = false;
      return null;
    } else {
      personalInfo.querySelectorAll(".getInfo")[i].classList.remove("error");
      PIFValidNum[i] = true;
    }
  } else if (idInp.name === "phoneNumber") {
    if (
      (!/a-b/.test(idInp.value) && !/^\d+$/.test(idInp.value)) ||
      idInp.value.length !== 9
    ) {
      personalInfo.querySelectorAll(".getInfo")[i].classList.add("error");
      idInp.nextElementSibling.innerText = "Telefon nomerni tugri kiriting";
      PIFValidNum[i] = false;
      return null;
    } else {
      personalInfo.querySelectorAll(".getInfo")[i].classList.remove("error");
      PIFValidNum[i] = true;
    }
  }
}

// Yakunga hisob kitobga qilish
function calculation() {
  let allPrice = 0;
  plansForm.querySelectorAll(".plan").forEach((el) => {
    if (el.classList[el.classList.length - 1] === "isActive") {
      finishClalculator.querySelector(".name span").innerText =
        el.querySelector(".planInfo span").innerText;
      finishClalculator.querySelector(".price").innerText =
        el.querySelectorAll(".planInfo span")[1].innerText;
      allPrice += parseInt(
        el.querySelectorAll(".planInfo span")[1].innerText.slice(1, -1)
      );
    }
  });
  addOnsForm.querySelectorAll(".addOns-item").forEach((item, index) => {
    if (item.querySelector("input").checked) {
      finishClalculator.querySelectorAll(".addition")[index].style.display =
        "flex";
      finishClalculator
        .querySelectorAll(".addition")
        [index].querySelectorAll("span")[1].innerText =
        item.querySelector(".addOns-price").innerText;
      allPrice += parseInt(
        item.querySelector(".addOns-price").innerText.slice(2, -1)
      );
    }
  });
  finishClalculator.querySelectorAll(
    ".allPrice span"
  )[1].innerText = `$${allPrice}/${yearOrMonth}`;
}

// malumotlarni yigib junatish
function getData() {
  let allData = {};
  let plan = {};
  let addOns = {};
  personalInfo.querySelectorAll("input").forEach((e) => {
    allData[e.name] = e.value;
  });
  plansForm.querySelectorAll("input").forEach((el) => {
    if (el.type === "radio" && el.checked) {
      plan[el.name] = el.value;
    }
    if (el.type === "checkbox") {
      if (el.checked) {
        plan[el.name] = "year";
      } else {
        plan[el.name] = "month";
      }
    }
  });
  addOnsForm.querySelectorAll("input").forEach((ele) => {
    if (ele.checked) {
      addOns[ele.name] = true;
    }
  });
  allData.addOns = addOns;
  allData.plan = plan;
  // setDate(allData);
  console.log(allData);
}

// function setDate(object) {
//   fetch("url", {
//     method: "post",
//     body: JSON.stringify(object),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then(() => {
//       localStorage.setItem("theEnd", true);
//     })
//     .catch(() => {
//       localStorage.setItem("theEnd", "");
//     });
// }

// yakunlash
if (localStorage.getItem("theEnd")) {
  content[0].classList.remove("isActive");
  step[0].classList.remove("isActive");
  content[4].classList.add("isActive");
  btnNext.classList.add("isActive");
}