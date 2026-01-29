function loadHLVCalculator() {
  const content = document.getElementById("calculator-content");

  content.innerHTML = `
    <div class="calculator-box hlv-box">
      <h2>Human Life Value (HLV) Calculator</h2>
      <p class="calc-desc">
        Estimate the economic value of your life for financial protection.
      </p>

      <div class="hlv-grid">

        <div class="hlv-group">
          <label>Annual Income (₹)</label>
          <input type="number" id="hlvIncomeInput" value="800000">
          <input type="range" id="hlvIncome" min="100000" max="5000000" step="50000" value="800000">
        </div>

        <div class="hlv-group">
          <label>Annual Expenses (₹)</label>
          <input type="number" id="hlvExpenseInput" value="300000">
          <input type="range" id="hlvExpense" min="50000" max="3000000" step="50000" value="300000">
        </div>

        <div class="hlv-group">
          <label>Working Years Remaining</label>
          <input type="number" id="hlvYearsInput" value="25">
          <input type="range" id="hlvYears" min="1" max="40" value="25">
        </div>

      </div>

      <div class="hlv-result" id="hlvResult"></div>
    </div>
  `;

  initHLVLogic();
}

function initHLVLogic() {
  const income = document.getElementById("hlvIncome");
  const expense = document.getElementById("hlvExpense");
  const years = document.getElementById("hlvYears");

  const iI = document.getElementById("hlvIncomeInput");
  const eI = document.getElementById("hlvExpenseInput");
  const yI = document.getElementById("hlvYearsInput");

  function sync() {
    iI.value = income.value;
    eI.value = expense.value;
    yI.value = years.value;
    calculateHLV();
  }

  [income, expense, years].forEach(el => el.addEventListener("input", sync));
  iI.oninput = () => { income.value = iI.value; sync(); };
  eI.oninput = () => { expense.value = eI.value; sync(); };
  yI.oninput = () => { years.value = yI.value; sync(); };

  calculateHLV();
}

function calculateHLV() {
  const income = +document.getElementById("hlvIncome").value;
  const expense = +document.getElementById("hlvExpense").value;
  const years = +document.getElementById("hlvYears").value;

  const surplus = income - expense;
  const hlv = surplus * years;

  let note = `<p class="note green">Your family is financially well protected.</p>`;
  if (hlv < 5000000) note = `<p class="note red">Protection is critically low.</p>`;
  else if (hlv < 15000000) note = `<p class="note orange">Protection is moderate.</p>`;

  document.getElementById("hlvResult").innerHTML = `
    <div class="amount">₹ ${hlv.toLocaleString("en-IN")}</div>
    <p class="sub">Estimated Human Life Value</p>
    ${note}
  `;
}
