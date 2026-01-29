const cards = document.querySelectorAll(".calc-card");
const assistant = document.getElementById("assistant");
const content = document.getElementById("calculator-content");
function formatINR(amount) {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });
}

cards.forEach(card => {
  card.addEventListener("click", () => {

    // Remove active from all
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    // Hide assistant
    assistant.classList.add("hidden");

    // Show calculator panel
    content.classList.remove("hidden");

    // Load calculator UI
    const name = card.innerText;
    loadCalculator(name);
  });
});

function loadCalculator(name) {
  if (name.includes("HLV")) {
    loadHLVCalculator();
  }else if (name.includes("DynamicSIP")) {
    console.log("🔥 DYNAMIC SIP LOADED");
  loadDynamicSIPCalculator();
} else if (name.includes("SIP")) {
    loadSIPCalculator();
  } else if (name.includes("EMI") || name.includes("Loan")) {
    loadEMICalculator(name);
  } else if (name.includes("Lumpsum")) {
  loadLumpsumCalculator();
 } else if (name.includes("CAGR")) {
  loadCAGRCalculator();
} else {
    content.innerHTML = `
      <h2>${name}</h2>
      <p class="calc-desc">Calculator coming next.</p>
    `;
  }
}

const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".calculator-menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

