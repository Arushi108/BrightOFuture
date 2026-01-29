function loadDynamicSIPCalculator() {
  const content = document.getElementById("calculator-content");

  content.innerHTML = `
    <div class="calculator-box">
      <h2>Dynamic SIP + Partial Lumpsum</h2>
      <p class="calc-desc">
        Calculate returns when SIP increases or decreases yearly along with a partial lumpsum.
      </p>

      <div class="sip-grid">

        <div class="sip-group">
          <label>Initial Lumpsum (₹)</label>
          <input type="number" id="lump" value="300000">
        </div>

        <div class="sip-group">
          <label>Starting Monthly SIP (₹)</label>
          <input type="number" id="sip" value="10000">
        </div>

        <div class="sip-group">
          <label>SIP Change Type</label>
          <select id="changeType">
            <option value="percent">Increase by %</option>
            <option value="amount">Increase by ₹</option>
          </select>
        </div>

        <div class="sip-group">
          <label>SIP Change Value</label>
          <input type="number" id="changeValue" value="10">
        </div>

        <div class="sip-group">
          <label>Expected Return (% p.a.)</label>
          <input type="number" id="rate" value="12">
        </div>

        <div class="sip-group">
          <label>Investment Period (Years)</label>
          <input type="number" id="years" value="15">
        </div>

      </div>

      <button onclick="calculateDynamicSIP()">Calculate</button>

      <div class="result-box" id="dynamicResult"></div>
    </div>
  `;
}
function calculateDynamicSIP() {
  let lump = +document.getElementById("lump").value;
  let sip = +document.getElementById("sip").value;
  const type = document.getElementById("changeType").value;
  const change = +document.getElementById("changeValue").value;
  const rate = +document.getElementById("rate").value / 12 / 100;
  const years = +document.getElementById("years").value;

  let totalCorpus = lump;
  let totalInvested = lump;
  let currentSIP = sip;

  for (let y = 1; y <= years; y++) {

    for (let m = 1; m <= 12; m++) {
      totalCorpus = (totalCorpus + currentSIP) * (1 + rate);
      totalInvested += currentSIP;
    }

    // Adjust SIP yearly
    if (type === "percent") {
      currentSIP += currentSIP * (change / 100);
    } else {
      currentSIP += change;
    }
  }

  const gains = totalCorpus - totalInvested;

  let noteClass = "green";
  let message = "Strong wealth creation strategy 🚀";

  if (gains < totalInvested * 0.6) {
    noteClass = "orange";
    message = "Moderate growth. Consider higher SIP increment.";
  }

  if (gains < totalInvested * 0.4) {
    noteClass = "red";
    message = "Returns are low. Review asset allocation.";
  }

  document.getElementById("dynamicResult").innerHTML = `
    <h3>Final Corpus</h3>
    <div class="amount">₹${totalCorpus.toLocaleString("en-IN", {maximumFractionDigits:0})}</div>

    <p>Total Invested: ₹${totalInvested.toLocaleString("en-IN")}</p>
    <p>Wealth Gained: ₹${gains.toLocaleString("en-IN")}</p>

    <p class="note ${noteClass}">${message}</p>
  `;
}
