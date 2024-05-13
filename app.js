
const sourceAmountInput = document.getElementById("sourceAmount");
const targetAmountInput = document.getElementById("targetAmount");
const sourceCurrencySpan = document.getElementById("sourceCurrency");
const targetCurrencySpan = document.getElementById("targetCurrency");
const sourceExchangeRateSpan = document.getElementById("sourceExchangeRate");
const targetExchangeRateSpan = document.getElementById("targetExchangeRate");

const API_URL = "https://v6.exchangerate-api.com/v6/f042570fb25bb227b790b7fb/latest/";

function fetchExchangeRate(baseCurrency, targetCurrency) {
    fetch(`${API_URL}${baseCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.conversion_rates[targetCurrency];
            const inverseExchangeRate = 1 / exchangeRate;

            sourceExchangeRateSpan.textContent = `1 ${baseCurrency} = ${exchangeRate.toFixed(4)} ${targetCurrency}`;
            targetExchangeRateSpan.textContent = `1 ${targetCurrency} = ${inverseExchangeRate.toFixed(4)} ${baseCurrency}`;

            convertCurrency(exchangeRate);
        })
        .catch(error => console.error("Error fetching exchange rates:", error));
}

function convertCurrency(exchangeRate) {
    const sourceAmount = parseFloat(sourceAmountInput.value);
    const targetAmount = sourceAmount * exchangeRate;
    targetAmountInput.value = targetAmount.toFixed(2);
}


sourceAmountInput.addEventListener("input", function () {
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});

fetchExchangeRate("RUB", "USD");

const firstRUB = document.querySelector(".exchange-first .list-exchange li:nth-child(1)")
firstRUB.addEventListener("click", function () {
    sourceCurrencySpan.textContent = "RUB";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});

const firstUSD = document.querySelector(".exchange-first .list-exchange li:nth-child(2)")
firstUSD.addEventListener("click", function () {
    sourceCurrencySpan.textContent = "USD";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});
document.querySelector(".exchange-first .list-exchange li:nth-child(3)").addEventListener("click", function () {
    sourceCurrencySpan.textContent = "EUR";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});
document.querySelector(".exchange-first .list-exchange li:nth-child(4)").addEventListener("click", function () {
    sourceCurrencySpan.textContent = "GBP";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});





document.querySelector(".exchange-second .list-exchange li:nth-child(1)").addEventListener("click", function () {
    targetCurrencySpan.textContent = "RUB";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});
document.querySelector(".exchange-second .list-exchange li:nth-child(2)").addEventListener("click", function () {
    targetCurrencySpan.textContent = "USD";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});
document.querySelector(".exchange-second .list-exchange li:nth-child(3)").addEventListener("click", function () {
    targetCurrencySpan.textContent = "EUR";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});
document.querySelector(".exchange-second .list-exchange li:nth-child(4)").addEventListener("click", function () {
    targetCurrencySpan.textContent = "GBP";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});


function handleListItemClick(event) {
    const listItems = event.currentTarget.querySelectorAll("li");
    listItems.forEach(item => {
        item.style.backgroundColor = "";
    });
    const clickedItem = event.target.closest("li");
    if (clickedItem) {
        clickedItem.style.backgroundColor = "rgba(131, 58, 224, 1)";
    }
}

const firstListExchange = document.querySelector(".exchange-first .list-exchange");
firstListExchange.addEventListener("click", handleListItemClick);

const secondListExchange = document.querySelector(".exchange-second .list-exchange");
secondListExchange.addEventListener("click", handleListItemClick);
