function loadEMICalculator(type = "Loan") {
  const content = document.getElementById("calculator-content");

  content.innerHTML = `
    <div class="emi-wrapper">

      <div class="emi-left">
        <h2>${type}</h2>
        <p class="calc-desc">Plan your loan better with clear EMI insights.</p>

        <div class="emi-input">
          <label>Loan Amount (₹)</label>
          <input type="number" id="loanInput" value="2000000">
          <input type="range" id="loanRange" min="100000" max="50000000" step="50000" value="2000000">
        </div>

        <div class="emi-input">
          <label>Interest Rate (% p.a.)</label>
          <input type="number" id="rateInput" step="0.1" value="9">
          <input type="range" id="rateRange" min="5" max="20" step="0.1" value="9">
        </div>

        <div class="emi-input">
          <label>Tenure (Years)</label>
          <input type="number" id="yearInput" value="20">
          <input type="range" id="yearRange" min="1" max="30" value="20">
        </div>

        <div class="emi-note" id="emiNote"></div>
      </div>

      <div class="emi-right">
        <div class="donut" id="donut"></div>

        <div class="emi-stats">
          <div>
            <span>Monthly EMI</span>
            <strong id="emiVal">₹0</strong>
          </div>
          <div>
            <span>Total Interest</span>
            <strong id="interestVal">₹0</strong>
          </div>
          <div>
            <span>Total Payment</span>
            <strong id="totalVal">₹0</strong>
          </div>
        </div>
      </div>

    </div>
  `;

  initEMI();
}

function initEMI() {
  const loanI = loanInput;
  const loanR = loanRange;
  const rateI = rateInput;
  const rateR = rateRange;
  const yearI = yearInput;
  const yearR = yearRange;

  sync(loanI, loanR);
  sync(rateI, rateR);
  sync(yearI, yearR);

  [loanI, rateI, yearI, loanR, rateR, yearR].forEach(el =>
    el.addEventListener("input", calculateEMI)
  );

  calculateEMI();
}

function sync(a, b) {
  a.addEventListener("input", () => b.value = a.value);
  b.addEventListener("input", () => a.value = b.value);
}

function calculateEMI() {
  const P = +loanInput.value;
  const r = +rateInput.value / 12 / 100;
  const n = +yearInput.value * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - P;

  emiVal.innerText = `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  interestVal.innerText = `₹${interest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  totalVal.innerText = `₹${total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const interestPercent = Math.round((interest / total) * 100);
  donut.style.background = `conic-gradient(#ef4444 ${interestPercent}%, #22c55e 0)`;

  if (interestPercent < 30) {
    emiNote.innerHTML = `<span class="green">✔ Healthy loan structure</span>`;
  } else if (interestPercent < 50) {
    emiNote.innerHTML = `<span class="orange">⚠ Interest is considerable</span>`;
  } else {
    emiNote.innerHTML = `<span class="red">✖ You are paying very high interest</span>`;
  }
}
