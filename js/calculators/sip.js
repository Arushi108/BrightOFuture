function loadSIPCalculator() {
  const container = document.getElementById("calculator-content");

  container.innerHTML = `
    <div class="calc-box">
      <h2>SIP Calculator</h2>
      <p class="calc-desc">
        Calculate returns on your monthly SIP investments.
      </p>

      <div class="inputs">

        <div class="input-group">
          <label>Monthly Investment (₹)</label>
          <input type="number" id="sipAmount"
            min="100" max="500000" step="50" value="5000">
          <small>₹100 – ₹5,00,000</small>
        </div>

        <div class="input-group">
          <label>Expected Return Rate (% p.a)</label>
          <input type="number" id="sipRate"
            min="6" max="18" step="0.5" value="12">
          <small>6% – 18%</small>
        </div>

        <div class="input-group">
          <label>Investment Period (Years)</label>
          <input type="number" id="sipYears"
            min="1" max="40" step="1" value="10">
          <small>1 – 40 years</small>
        </div>

      </div>

      <div class="results">
        <div class="result-card">
          <p>Total Invested</p>
          <h3 id="sipInvested">₹0</h3>
        </div>

        <div class="result-card">
          <p>Total Returns</p>
          <h3 id="sipReturns">₹0</h3>
        </div>

        <div class="result-card highlight">
          <p>Final Value</p>
          <h3 id="sipTotal">₹0</h3>
        </div>
      </div>

      <div id="sipMessage" class="status"></div>
    </div>
  `;

  initSIPLogic();
}
function initSIPLogic() {
  const amountEl = document.getElementById("sipAmount");
  const rateEl = document.getElementById("sipRate");
  const yearsEl = document.getElementById("sipYears");
  const msg = document.getElementById("sipMessage");

  function calculateSIP() {
    const monthlyInvestment = Number(amountEl.value);
    const annualRate = Number(rateEl.value);
    const years = Number(yearsEl.value);

    // ❗ validation (do NOT force values)
    if (
      monthlyInvestment < 100 || monthlyInvestment > 500000 ||
      annualRate < 6 || annualRate > 18 ||
      years < 1 || years > 40
    ) {
      msg.className = "status risk";
      msg.textContent =
        "⚠️ Please enter values within the suggested range.";
      return;
    }

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const invested = monthlyInvestment * months;
    const returns = futureValue - invested;

    document.getElementById("sipInvested").textContent = formatINR(invested);
    document.getElementById("sipReturns").textContent = formatINR(returns);
    document.getElementById("sipTotal").textContent = formatINR(futureValue);

    if (years >= 15) {
      msg.className = "status secure";
      msg.textContent =
        "🟢 Excellent long-term SIP. Power of compounding works best.";
    } else if (years >= 7) {
      msg.className = "status ok";
      msg.textContent =
        "🟡 Decent horizon. Longer duration can improve returns.";
    } else {
      msg.className = "status risk";
      msg.textContent =
        "🔴 SIP benefits are limited for short durations.";
    }
  }

  amountEl.addEventListener("input", calculateSIP);
  rateEl.addEventListener("input", calculateSIP);
  yearsEl.addEventListener("input", calculateSIP);

  calculateSIP();
}
