// UAE Real Estate Analyzer - Real market data based on DLD / consultancy reports 2025-2026

const areasData = [
  { nameAr: "دبي مارينا", nameEn: "Dubai Marina", price: "1,800–2,200", yield: "6.0–7.0%", bestAr: "سكن + إيجار قصير", bestEn: "Lifestyle + short-let", noteAr: "سيولة عالية، عائد جيد للاستوديوهات", noteEn: "High liquidity, good studio yields" },
  { nameAr: "بزنس باي", nameEn: "Business Bay", price: "2,000–2,600", yield: "6.0–8.0%", bestAr: "نمو + إيجار", bestEn: "Growth + income", noteAr: "نمو إيجارات قوي مؤخراً", noteEn: "Strong recent rent growth" },
  { nameAr: "جي في سي (JVC)", nameEn: "Jumeirah Village Circle", price: "1,100–1,500", yield: "7.0–8.8%", bestAr: "عائد مرتفع + دخول منخفض", bestEn: "High yield + entry price", noteAr: "من أعلى أحجام المعاملات", noteEn: "Among highest transaction volumes" },
  { nameAr: "داون تاون دبي", nameEn: "Downtown Dubai", price: "2,700–3,200", yield: "5.0–6.5%", bestAr: "هيبة + تقدير رأسمالي", bestEn: "Prestige + capital growth", noteAr: "أسعار مرتفعة تضغط العائد", noteEn: "Premium pricing compresses yield" },
  { nameAr: "بالم جميرا", nameEn: "Palm Jumeirah", price: "3,500–4,500+", yield: "4.5–5.5%", bestAr: "فاخر + حفظ ثروة", bestEn: "Ultra-luxury / wealth", noteAr: "فيلات وأبراج فاخرة", noteEn: "Villas & branded residences" },
  { nameAr: "دبي ساوث", nameEn: "Dubai South", price: "1,400–1,700", yield: "7.5–8.5%", bestAr: "نمو مستقبلي + مطار", bestEn: "Future growth + airport", noteAr: "منطقة نمو بنية تحتية", noteEn: "Infrastructure growth corridor" },
  { nameAr: "إنترناشونال سيتي", nameEn: "International City", price: "550–800", yield: "8.0–9.0%", bestAr: "أعلى عائد نقدي", bestEn: "Highest cash yield", noteAr: "أسعار دخول منخفضة جداً", noteEn: "Very low entry prices" },
  { nameAr: "دبي هيلز", nameEn: "Dubai Hills Estate", price: "2,200–2,500", yield: "5.5–6.5%", bestAr: "عائلات + جودة حياة", bestEn: "Family + lifestyle", noteAr: "تقدير مستقر", noteEn: "Stable appreciation" }
];

const priceTrend = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026*"],
  data: [873, 845, 1031, 1119, 1394, 1469, 1723, 1680]
};

const yieldByArea = {
  labelsAr: ["إنترناشونال سيتي", "سيليكون أويسيس", "دبي ساوث", "JVC", "بزنس باي", "مارينا", "داون تاون", "بالم"],
  labelsEn: ["Int'l City", "Silicon Oasis", "Dubai South", "JVC", "Business Bay", "Marina", "Downtown", "Palm"],
  data: [8.7, 8.5, 8.1, 7.8, 7.0, 6.5, 5.5, 4.8]
};

let currentLang = "ar";

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.getElementById("langAr").classList.toggle("active", lang === "ar");
  document.getElementById("langEn").classList.toggle("active", lang === "en");
  if (lang === "ar") {
    document.getElementById("langAr").classList.add("bg-amber-500", "text-slate-900");
    document.getElementById("langAr").classList.remove("bg-slate-700");
    document.getElementById("langEn").classList.add("bg-slate-700");
    document.getElementById("langEn").classList.remove("bg-amber-500", "text-slate-900");
  } else {
    document.getElementById("langEn").classList.add("bg-amber-500", "text-slate-900");
    document.getElementById("langEn").classList.remove("bg-slate-700");
    document.getElementById("langAr").classList.add("bg-slate-700");
    document.getElementById("langAr").classList.remove("bg-amber-500", "text-slate-900");
  }

  renderAreasTable();
  updateChartsLang();
}

function renderAreasTable() {
  const tbody = document.getElementById("areasTable");
  tbody.innerHTML = areasData.map(a => `
    <tr class="hover:bg-slate-800/50 transition">
      <td class="px-4 py-3 font-semibold text-amber-300">${currentLang === "ar" ? a.nameAr : a.nameEn}</td>
      <td class="px-4 py-3">${a.price}</td>
      <td class="px-4 py-3 text-emerald-400 font-medium">${a.yield}</td>
      <td class="px-4 py-3">${currentLang === "ar" ? a.bestAr : a.bestEn}</td>
      <td class="px-4 py-3 text-slate-400 text-xs">${currentLang === "ar" ? a.noteAr : a.noteEn}</td>
    </tr>
  `).join("");
}

let priceChart, yieldChart;

function initCharts() {
  const ctx1 = document.getElementById("priceChart").getContext("2d");
  priceChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: priceTrend.labels,
      datasets: [{
        label: currentLang === "ar" ? "متوسط السعر AED/قدم²" : "Avg AED/sqft",
        data: priceTrend.data,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#f59e0b"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: "rgba(148,163,184,0.1)" }, ticks: { color: "#94a3b8" } },
        x: { grid: { display: false }, ticks: { color: "#94a3b8" } }
      }
    }
  });

  const ctx2 = document.getElementById("yieldChart").getContext("2d");
  yieldChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: currentLang === "ar" ? yieldByArea.labelsAr : yieldByArea.labelsEn,
      datasets: [{
        label: currentLang === "ar" ? "عائد %" : "Yield %",
        data: yieldByArea.data,
        backgroundColor: [
          "#10b981", "#34d399", "#6ee7b7", "#a7f3d0",
          "#fbbf24", "#f59e0b", "#d97706", "#b45309"
        ],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 10, grid: { color: "rgba(148,163,184,0.1)" }, ticks: { color: "#94a3b8" } },
        x: { grid: { display: false }, ticks: { color: "#94a3b8", maxRotation: 45 } }
      }
    }
  });
}

function updateChartsLang() {
  if (priceChart) {
    priceChart.data.datasets[0].label = currentLang === "ar" ? "متوسط السعر AED/قدم²" : "Avg AED/sqft";
    priceChart.update();
  }
  if (yieldChart) {
    yieldChart.data.labels = currentLang === "ar" ? yieldByArea.labelsAr : yieldByArea.labelsEn;
    yieldChart.update();
  }
}

function calcYield() {
  const price = parseFloat(document.getElementById("purchasePrice").value) || 0;
  const rent = parseFloat(document.getElementById("annualRent").value) || 0;
  const service = parseFloat(document.getElementById("serviceCharges").value) || 0;
  if (price <= 0) return;

  const gross = (rent / price) * 100;
  const net = ((rent - service) / price) * 100;

  document.getElementById("grossYield").textContent = gross.toFixed(2);
  document.getElementById("netYield").textContent = net.toFixed(2);
  document.getElementById("yieldResult").classList.remove("hidden");
}

function calcCashflow() {
  const price = parseFloat(document.getElementById("purchasePrice").value) || 0;
  const rent = parseFloat(document.getElementById("annualRent").value) || 0;
  const service = parseFloat(document.getElementById("serviceCharges").value) || 0;
  const downPct = parseFloat(document.getElementById("downPct").value) || 20;
  const rate = parseFloat(document.getElementById("interestRate").value) || 4.7;
  const years = parseFloat(document.getElementById("loanYears").value) || 25;

  if (price <= 0) return;

  const loan = price * (1 - downPct / 100);
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  let monthlyPay = 0;
  if (monthlyRate > 0) {
    monthlyPay = loan * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
  } else {
    monthlyPay = loan / n;
  }

  const monthlyRent = rent / 12;
  const monthlyService = service / 12;
  const cash = monthlyRent - monthlyPay - monthlyService;

  document.getElementById("monthlyPay").textContent = "AED " + Math.round(monthlyPay).toLocaleString();
  document.getElementById("monthlyRent").textContent = "AED " + Math.round(monthlyRent).toLocaleString();
  document.getElementById("monthlyCash").textContent = (cash >= 0 ? "+" : "") + "AED " + Math.round(cash).toLocaleString();
  document.getElementById("monthlyCash").className = "font-bold " + (cash >= 0 ? "text-emerald-400" : "text-rose-400");
  document.getElementById("cashResult").classList.remove("hidden");
}

// Init
document.getElementById("langAr").addEventListener("click", () => setLang("ar"));
document.getElementById("langEn").addEventListener("click", () => setLang("en"));

renderAreasTable();
initCharts();
calcYield();
