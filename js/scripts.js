const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// select elements
let heightInput = document.getElementById("height");
let weightInput = document.getElementById("weight");

let btnCalcule = document.getElementById("btn-calcule");
let btnClearInputs = document.getElementById("btn-clear-inputs");
let btnBack = document.getElementById("btn-back");

let form = document.getElementById("form");
let resultContainer = document.getElementById("result-container");
let imcTable = document.getElementById("imc-table");

let imcNumber = document.querySelector("#imc-number span");
let imcInfo = document.querySelector("#imc-info span");

// functions
function calculeImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function clearInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.className = "";
  imcInfo.className = "";
}

function createTable(data) {
  data.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("table-data");

    let classification = document.createElement("p");
    classification.innerText = item.classification;

    let info = document.createElement("p");
    info.innerText = item.info;

    let obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function showOrHideResults() {
  form.classList.toggle("modal");
  resultContainer.classList.toggle("modal");
}

function backBtn() {
  form.classList.toggle("modal");
  resultContainer.classList.toggle("modal");
}

// events
btnCalcule.addEventListener("click", (e) => {
  e.preventDefault();

  const height = +heightInput.value.replace(",", ".");
  const weight = +weightInput.value.replace(",", ".");

  const imc = calculeImc(height, weight);
  let info;

  if (heightInput.value === "") {
    alert("Por favor, faltam alguns dados!");
    btnCalcule.disabled();

  } else if (weightInput.value === "") {
    alert("Por favor, faltam alguns dados!");
    btnCalcule.disabled();

  }

  imcNumber.innerText = imc;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  createTable(data);

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
    default:
      break;
  }

  showOrHideResults();
});

btnClearInputs.addEventListener("click", (e) => {
  e.preventDefault();

  clearInputs();
});

btnBack.addEventListener("click", () => {
  location.reload()
  backBtn();
  clearInputs();
});
