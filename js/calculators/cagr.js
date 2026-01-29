function loadCAGRCalculator() {
  const c = document.getElementById("calculator-content");

  c.innerHTML = `
  <div class="calc-box cagr-box">
    <h2>CAGR Calculator</h2>

    <label>Initial Investment (₹)</label>
    <input type="number" id="cagrStart" value="100000">

    <label>Final Value (₹)</label>
    <input type="number" id="cagrEnd" value="250000">

    <label>Time Period (Years)</label>
    <input type="number" id="cagrYears" value="5">

    <button onclick="calculateCAGR()">Calculate CAGR</button>

    <div class="result" id="cagrResult"></div>
  </div>`;
}

function calculateCAGR() {
  const start = +cagrStart.value;
  const end = +cagrEnd.value;
  const years = +cagrYears.value;

  if (start <= 0 || end <= 0 || years <= 0) {
    cagrResult.innerHTML = "⚠ Enter valid values";
    return;
  }

  const cagr = ((end / start) ** (1 / years) - 1) * 100;

  cagrResult.innerHTML = `
    <h3>${cagr.toFixed(2)}%</h3>
    <p>Annual Growth Rate</p>`;
}
