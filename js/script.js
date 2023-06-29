

const dropList = document.querySelectorAll('form select'),
fromCurrency = document.querySelector('.from select'),
toCurrency = document.querySelector('.to select'),
getButton = document.querySelector('form button');

for(let i = 0; i < dropList.length; i++) {
	for( let currency_code in country_code) {

		//let selected;
		//if(i == 0){
			//selected = currency_code == "USD" ? "selected" : "";
		//}else if(i == 1) {
			//selected = currency_code == "PLN" ? "selected" : "";
		//}
		//console.log(currency_code)
		
		let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "PLN" ? "selected" : "";
		
		let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

		dropList[i].insertAdjacentHTML("beforeend", optionTag);
	}

	dropList[i].addEventListener("change", e => {
		loadFlag(e.target);
	});
}

function loadFlag(element) {
	for( let code in country_code) {
		if(code == element.value) {
			let imgTag = element.parentElement.querySelector("img");
			imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
		}
	}
}

window.addEventListener("load", () => {
	//e.preventDefault();
	getExchangeRate();
});

getButton.addEventListener("click", e => {
	e.preventDefault();
	getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
	let tempCode = fromCurrency.value;
	fromCurrency.value = toCurrency.value;
	toCurrency.value = tempCode;
	loadFlag(fromCurrency);
	loadFlag(toCurrency);
	getExchangeRate();
})

function getExchangeRate() {
	const amount = document.querySelector("form input"); 
	const exchangeRateTxt = document.querySelector("form .exchange-rate");
	let amountVal = amount.value;
	if(amountVal == "" || amountVal == "0") {
		amount.value = "1";
		amountVal = 1;
	}

	exchangeRateTxt.innerText = "Getting exchage rate...";

	let url = `https://v6.exchangerate-api.com/v6/${"09e609fd03786c3dc3f3856f"}/latest/${fromCurrency.value}`;
	fetch(url).then(response => response.json()).then(result => {
		let exchangeRate = result.conversion_rates[toCurrency.value];
		//console.log(result);
		//console.log(exchangeRate);
		let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
		//console.log(totalExchangeRate);
		const exchangeRateTxt = document.querySelector(".exchange-rate");
		exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
		
	}).catch(() => {
		exchangeRateTxt.innerText = "Something went wrong";
	});
}
