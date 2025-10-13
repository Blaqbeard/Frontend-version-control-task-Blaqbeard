import "./style.css";
import axios from "axios";
import dayjs from "dayjs";

const app = document.querySelector("#app");

app.innerHTML = `
  <header class="app-header">
    <h1 class="title">Currency Converter</h1>
    <p class="subtitle">Built with npm, Vite, axios and dayjs</p>
  </header>

  <main class="converter">
    <form id="convert-form" class="card glow">
      <div class="amount-row">
        <label for="amount">Amount</label>
        <input id="amount" type="number" step="0.01" min="0" placeholder="100" required />
      </div>
      <div class="select-row">
        <div class="select">
          <label for="from">From</label>
          <select id="from"></select>
        </div>
        <button class="swap" title="Swap" type="button" aria-label="Swap">⟷</button>
        <div class="select">
          <label for="to">To</label>
          <select id="to"></select>
    </div>
  </div>
      <button class="cta" type="submit">Convert</button>
      <p id="result" class="result" aria-live="polite"></p>
      <p id="updated" class="updated"></p>
    </form>

    <section class="info card">
      <h2>Packages Used (npm)</h2>
      <ul>
        <li><strong>axios</strong>: Promise-based HTTP client used here to fetch live exchange rates from <code>exchangerate.host</code>.</li>
        <li><strong>dayjs</strong>: Lightweight date library used to format the "last updated" timestamp.</li>
      </ul>
      <details>
        <summary>How I built this</summary>
        <pre class="code">npm create vite@latest task-5 -- --template vanilla
cd task-5
npm install
npm install axios dayjs
npm run dev</pre>
      </details>
    </section>
  </main>
`;

const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "NGN",
  "GHS",
  "KES",
  "ZAR",
  "INR",
  "CNY",
  "BRL",
  "MXN",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "TRY",
];

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

function populateSelect(select) {
  CURRENCY_CODES.forEach((code) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code;
    select.appendChild(option);
  });
}

populateSelect(fromSelect);
populateSelect(toSelect);
fromSelect.value = "USD";
toSelect.value = "NGN";

document.querySelector(".swap").addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  document.querySelector(".swap").classList.add("spin");
  setTimeout(
    () => document.querySelector(".swap").classList.remove("spin"),
    400
  );
});

const resultEl = document.getElementById("result");
const updatedEl = document.getElementById("updated");

async function convert(event) {
  event?.preventDefault();
  const amount = Number(document.getElementById("amount").value);
  if (!Number.isFinite(amount) || amount <= 0) {
    resultEl.textContent = "Please enter a valid amount greater than 0.";
    resultEl.classList.add("error");
    return;
  }
  resultEl.classList.remove("error");
  resultEl.textContent = "Converting…";
  try {
    const base = fromSelect.value;
    const symbols = toSelect.value;
    // Try primary API (may fail due to intermittent CORS). Fallback to open.er-api.com
    async function fetchRate() {
      try {
        const url1 = `https://api.exchangerate.host/latest?base=${encodeURIComponent(
          base
        )}&symbols=${encodeURIComponent(symbols)}`;
        const { data } = await axios.get(url1, {
          timeout: 10000,
          headers: { Accept: "application/json" },
        });
        const rate1 = data?.rates?.[symbols];
        if (rate1) {
          return {
            rate: rate1,
            dateText: dayjs(data.date).format("MMM D, YYYY"),
          };
        }
        throw new Error("Primary API returned no rate");
      } catch (_) {
        const url2 = `https://open.er-api.com/v6/latest/${encodeURIComponent(
          base
        )}`;
        const { data } = await axios.get(url2, {
          timeout: 10000,
          headers: { Accept: "application/json" },
        });
        const rate2 = data?.rates?.[symbols];
        if (!rate2) throw new Error("Fallback API returned no rate");
        const date =
          typeof data?.time_last_update_utc === "string"
            ? data.time_last_update_utc
            : undefined;
        const dateText = date ? dayjs(date).format("MMM D, YYYY") : "";
        return { rate: rate2, dateText };
      }
    }

    const { rate, dateText } = await fetchRate();
    const converted = amount * rate;
    resultEl.innerHTML = `<span class="amount">${amount.toLocaleString(
      undefined,
      { maximumFractionDigits: 2 }
    )} ${base}</span>
      = <span class="amount highlight">${converted.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })} ${symbols}</span>
      <span class="rate">(rate: ${rate.toFixed(4)})</span>`;
    updatedEl.textContent = dateText ? `Last updated: ${dateText}` : "";
    resultEl.classList.add("pop");
    setTimeout(() => resultEl.classList.remove("pop"), 450);
  } catch (err) {
    resultEl.textContent =
      "Conversion failed. Please check your network and try again.";
    resultEl.classList.add("error");
    updatedEl.textContent = "";
  }
}

document.getElementById("convert-form").addEventListener("submit", convert);

// Run a sample conversion to show content on load
setTimeout(() => {
  document.getElementById("amount").value = "100";
  convert(new Event("submit"));
}, 100);
