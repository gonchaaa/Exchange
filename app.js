const sourceAmountInput = document.getElementById("sourceAmount");
const targetAmountInput = document.getElementById("targetAmount");
const sourceCurrencySpan = document.getElementById("sourceCurrency");
const targetCurrencySpan = document.getElementById("targetCurrency");
const sourceExchangeRateSpan = document.getElementById("sourceExchangeRate");
const targetExchangeRateSpan = document.getElementById("targetExchangeRate");
const error = document.querySelector('.error')
const errorText = document.createElement('p')

error.append(errorText)

const API_URL = "https://v6.exchangerate-api.com/v6/f042570fb25bb227b790b7fb/latest/";

let currentExchangeRate = 0;
let lastUpdatedInput = null;

function fetchExchangeRate(baseCurrency, targetCurrency) {
    fetch(`${API_URL}${baseCurrency}`)
        .then(response => response.json())
        .then(data => {
            currentExchangeRate = data.conversion_rates[targetCurrency];
            const inverseExchangeRate = 1 / currentExchangeRate;

            sourceExchangeRateSpan.textContent = `1 ${baseCurrency} = ${currentExchangeRate.toFixed(4)} ${targetCurrency}`;
            targetExchangeRateSpan.textContent = `1 ${targetCurrency} = ${inverseExchangeRate.toFixed(4)} ${baseCurrency}`;

            if (lastUpdatedInput === 'first' || lastUpdatedInput === null) {
                convertCurrencyFromSource();
            } else if (lastUpdatedInput === 'second') {
                convertCurrencyFromTarget();
            }
        })
        .catch(error => {
            errorText.textContent = "Internet yoxdur, zəhmət olmasa şəbəkəyə qoşulun"
            errorText.style.color = "red"
            errorText.style.fontSize = "25px"
        });
}

function convertCurrencyFromSource() {
    const sourceAmount = parseFloat(sourceAmountInput.value);
    if (!isNaN(sourceAmount)) {
        const targetAmount = sourceAmount * currentExchangeRate;
        targetAmountInput.value = targetAmount.toFixed(4);
    } else {
        targetAmountInput.value = '';
    }
}

function convertCurrencyFromTarget() {
    const targetAmount = parseFloat(targetAmountInput.value);
    if (!isNaN(targetAmount)) {
        const sourceAmount = targetAmount / currentExchangeRate;
        sourceAmountInput.value = sourceAmount.toFixed(4);
    } else {
        sourceAmountInput.value = '';
    }
}

sourceAmountInput.addEventListener("keyup", function () {
    lastUpdatedInput = 'first';
    convertCurrencyFromSource();
});

targetAmountInput.addEventListener("keyup", function () {
    lastUpdatedInput = 'second';
    convertCurrencyFromTarget();
});

sourceAmountInput.value = 100;

fetchExchangeRate("RUB", "USD");

document.querySelector(".exchange-first .list-exchange li:nth-child(1)").addEventListener("click", function () {
    sourceCurrencySpan.textContent = "RUB";
    fetchExchangeRate(sourceCurrencySpan.textContent, targetCurrencySpan.textContent);
});

document.querySelector(".exchange-first .list-exchange li:nth-child(2)").addEventListener("click", function () {
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
        item.style.color = "";
    });
    const clickedItem = event.target.closest("li");
    if (clickedItem) {
        clickedItem.style.backgroundColor = "rgba(131, 58, 224, 1)";
        clickedItem.style.color = "white";
    }
}

const firstListExchange = document.querySelector(".exchange-first .list-exchange");
firstListExchange.addEventListener("click", handleListItemClick);

const secondListExchange = document.querySelector(".exchange-second .list-exchange");
secondListExchange.addEventListener("click", handleListItemClick);

