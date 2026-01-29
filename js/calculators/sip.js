function loadSIPCalculator() {
  const container = document.getElementById("calculator-content");

  container.innerHTML = `
    <div class="calc-box">
      <h2>SIP Calculator</h2>
      <p class="calc-desc">
        Calculate the future value of your monthly SIP investments.
      </p>

      <div class="inputs">

        <div class="input-group">
          <label>Monthly Investment</label>
          <input type="range" id="sipAmount" min="500" max="100000" step="500" value="5000">
          <span id="sipAmountVal">₹5,000</span>
        </div>

        <div class="input-group">
          <label>Expected Return Rate (p.a)</label>
          <input type="range" id="sipRate" min="6" max="18" step="0.5" value="12">
          <span id="sipRateVal">12%</span>
        </div>

        <div class="input-group">
          <label>Investment Period</label>
          <input type="range" id="sipYears" min="1" max="40" value="10">
          <span id="sipYearsVal">10 Years</span>
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

  // 🔑 bind AFTER rendering
  initSIPLogic();
}

function initSIPLogic() {
  const amountEl = document.getElementById("sipAmount");
  const rateEl = document.getElementById("sipRate");
  const yearsEl = document.getElementById("sipYears");

  const amountVal = document.getElementById("sipAmountVal");
  const rateVal = document.getElementById("sipRateVal");
  const yearsVal = document.getElementById("sipYearsVal");

  function calculateSIP() {
    const monthlyInvestment = Number(amountEl.value);
    const annualRate = Number(rateEl.value);
    const years = Number(yearsEl.value);

    amountVal.textContent = formatINR(monthlyInvestment);
    rateVal.textContent = `${annualRate}%`;
    yearsVal.textContent = `${years} Years`;

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    // ICICI SIP Formula
    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const invested = monthlyInvestment * months;
    const returns = futureValue - invested;

    document.getElementById("sipInvested").textContent = formatINR(invested);
    document.getElementById("sipReturns").textContent = formatINR(returns);
    document.getElementById("sipTotal").textContent = formatINR(futureValue);

    const msg = document.getElementById("sipMessage");

    if (years >= 15) {
      msg.className = "status secure";
      msg.textContent =
        "🟢 Long-term SIP investing builds strong wealth through compounding.";
    } else if (years >= 7) {
      msg.className = "status ok";
      msg.textContent =
        "🟡 Good investment horizon. Staying invested longer improves returns.";
    } else {
      msg.className = "status risk";
      msg.textContent =
        "🔴 Short duration reduces SIP benefits. SIPs work best long-term.";
    }
  }

  // Auto-calc on slider move
  amountEl.addEventListener("input", calculateSIP);
  rateEl.addEventListener("input", calculateSIP);
  yearsEl.addEventListener("input", calculateSIP);

  // Initial calculation
  calculateSIP();
}
