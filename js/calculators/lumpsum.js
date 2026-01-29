function loadLumpsumCalculator() {
  const content = document.getElementById("calculator-content");

  content.innerHTML = `
    <div class="calculator-box lumpsum-box">
      <h2>Lumpsum Calculator</h2>
      <p class="calc-desc">
        Calculate the future value of your one-time investment.
      </p>

      <div class="lumpsum-grid">

        <div class="lumpsum-group">
          <label>Investment Amount (₹)</label>
          <input type="number" id="lsAmountInput" value="500000">
          <input type="range" id="lsAmount" min="10000" max="50000000" step="10000" value="500000">
        </div>

        <div class="lumpsum-group">
          <label>Expected Return Rate (% p.a.)</label>
          <input type="number" id="lsRateInput" value="12" step="0.1">
          <input type="range" id="lsRate" min="1" max="30" step="0.1" value="12">
        </div>

        <div class="lumpsum-group">
          <label>Time Period (Years)</label>
          <input type="number" id="lsYearsInput" value="10">
          <input type="range" id="lsYears" min="1" max="40" value="10">
        </div>

      </div>

      <div class="lumpsum-result" id="lumpsumResult"></div>
    </div>
  `;

  initLumpsumLogic();
}

function initLumpsumLogic() {
  const amt = document.getElementById("lsAmount");
  const rate = document.getElementById("lsRate");
  const years = document.getElementById("lsYears");

  const amtI = document.getElementById("lsAmountInput");
  const rateI = document.getElementById("lsRateInput");
  const yearI = document.getElementById("lsYearsInput");

  function sync() {
    amtI.value = amt.value;
    rateI.value = rate.value;
    yearI.value = years.value;
    calculateLumpsum();
  }

  [amt, rate, years].forEach(el => el.addEventListener("input", sync));

  amtI.oninput = () => { amt.value = amtI.value; sync(); };
  rateI.oninput = () => { rate.value = rateI.value; sync(); };
  yearI.oninput = () => { years.value = yearI.value; sync(); };

  calculateLumpsum();
}

function calculateLumpsum() {
  const P = +document.getElementById("lsAmount").value;
  const r = +document.getElementById("lsRate").value / 100;
  const t = +document.getElementById("lsYears").value;

  const futureValue = P * Math.pow(1 + r, t);
  const gain = futureValue - P;

  document.getElementById("lumpsumResult").innerHTML = `
    <div class="amount">₹ ${futureValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
    <p class="sub">Estimated Future Value</p>

    <div class="lumpsum-bars">
      <div class="bar principal" style="width:${(P / futureValue) * 100}%">
        Invested ₹${P.toLocaleString("en-IN")}
      </div>
      <div class="bar returns" style="width:${(gain / futureValue) * 100}%">
        Gains ₹${gain.toLocaleString("en-IN")}
      </div>
    </div>

    <p class="note green">
      Higher duration & compounding significantly increase returns.
    </p>
  `;
}
