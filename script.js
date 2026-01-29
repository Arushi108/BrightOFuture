
// const age = document.getElementById("age");
// const retirement = document.getElementById("retirement");
// const ageValue = document.getElementById("ageValue");
// const retireValue = document.getElementById("retireValue");

// const inputs = document.querySelectorAll("input");

// ageValue.innerText = age.value;
// retireValue.innerText = retirement.value;


// inputs.forEach(i => i.addEventListener("input", calculateHLV));

// function formatINR(num) {
//     return num.toLocaleString("en-IN", {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0
//     });
// }

// function calculateHLV() {
//     const a = +age.value;
//     const r = +retirement.value;
//     const income = +incomeInput().value || 0;
//     const savings = +get("savings") || 0;
//     const loans = +get("loans") || 0;
//     const cover = +get("lifeCover") || 0;

//     ageValue.innerText = a;
//     retireValue.innerText = r;

//     if (!income || r <= a) return;

//     const years = r - a;
//     const required = income * years;
//     let gap = required - (savings + cover) + loans;
//     if (gap < 0) gap = 0;

//     const ratio = gap / required;
//     const riskFill = document.getElementById("riskFill");

//     let status, explain;

//     if (ratio === 0) {
//         riskFill.style.width = "20%";
//         riskFill.style.background = "#27ae60";
//         status = "🟢 Financially Secure";
//         explain = "Your existing savings and insurance are sufficient to support your family’s future income needs.";
//     } else if (ratio <= 0.3) {
//         riskFill.style.width = "50%";
//         riskFill.style.background = "#f39c12";
//         status = "🟡 Moderate Risk";
//         explain = "You are partially covered. A small increase in life insurance will strengthen financial stability.";
//     } else {
//         riskFill.style.width = "85%";
//         riskFill.style.background = "#e74c3c";
//         status = "🔴 High Risk";
//         explain = "Your family may face income loss in your absence. Adequate life cover is strongly recommended.";
//     }

//     document.getElementById("result").innerHTML = `
//         <h3>Recommended Life Cover</h3>
//         <div class="amount">${formatINR(gap)}</div>
//         <strong>${status}</strong>
//     `;

//     document.getElementById("explain").innerText = explain;
// }

// function get(id){ return document.getElementById(id).value }
// function incomeInput(){ return document.getElementById("income") }


// function downloadPDF() {
//     html2pdf().from(document.querySelector(".container")).save("HLV_Report.pdf");
// }
let currentCalc = "";

function openCalculator(type) {
  currentCalc = type;
  const inputs = document.getElementById("inputs");
  const title = document.getElementById("calcTitle");
  document.getElementById("result").innerHTML = "";

  if (type === "life") {
    title.innerText = "Human Life Value Calculator";
    inputs.innerHTML = `
      <input id="income" placeholder="Annual Income" />
      <input id="age" placeholder="Current Age" />
      <input id="retire" placeholder="Retirement Age" />
    `;
  }

  if (type === "sip") {
    title.innerText = "SIP Calculator";
    inputs.innerHTML = `
      <input id="monthly" placeholder="Monthly Investment" />
      <input id="rate" placeholder="Expected Return %" />
      <input id="years" placeholder="Years" />
    `;
  }

  if (type === "emi") {
    title.innerText = "EMI Calculator";
    inputs.innerHTML = `
      <input id="loan" placeholder="Loan Amount" />
      <input id="interest" placeholder="Interest %" />
      <input id="tenure" placeholder="Years" />
    `;
  }

  if (type === "retirement") {
    title.innerText = "Retirement Calculator";
    inputs.innerHTML = `
      <input id="current" placeholder="Current Monthly Expense" />
      <input id="years" placeholder="Years to Retire" />
    `;
  }
}

function calculate() {
  let result = "";

  if (currentCalc === "life") {
    let income = +income.value;
    let years = retire.value - age.value;
    result = "Life Value: ₹ " + (income * years);
  }

  if (currentCalc === "sip") {
    let m = +monthly.value;
    let r = rate.value / 100 / 12;
    let n = years.value * 12;
    let fv = m * ((Math.pow(1+r, n)-1)/r) * (1+r);
    result = "Future Value: ₹ " + Math.round(fv);
  }

  if (currentCalc === "emi") {
    let P = loan.value;
    let R = interest.value / 12 / 100;
    let N = tenure.value * 12;
    let emi = (P*R*Math.pow(1+R,N))/(Math.pow(1+R,N)-1);
    result = "Monthly EMI: ₹ " + Math.round(emi);
  }

  if (currentCalc === "retirement") {
    result = "Estimated Retirement Corpus: ₹ " + (current.value * 12 * years.value);
  }

  document.getElementById("result").innerHTML = `<h3>${result}</h3>`;
}
