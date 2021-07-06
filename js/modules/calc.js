function calc() {
	//! КАЛЬКУЛЯТОР.
	let result = document.querySelector('.calculating__result span'),
		sex, ratio, height, mass, age;

	function caltTotal() {
		if (!sex || !height || !mass || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * mass) + (3.1 * height) - (4.3 * age)) * ratio);
		} else if (sex === 'male') {
			result.textContent = Math.round((88.36 + (13.4 * mass) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	function getStaticInformation(parentSelector, activClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);
		
		elements.forEach(function(elem) {
			elem.addEventListener('click', function(event) {
				if (event.target.getAttribute('data-ratio')) {
					ratio = +event.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', event.target.getAttribute('data-ratio'));
				} else {
					sex = event.target.getAttribute('id');
					localStorage.setItem('sex', event.target.getAttribute('id'));
				}
	
				console.log(ratio, sex);
	
				elements.forEach(function(elem) {
					elem.classList.remove(activClass);
				});
	
				event.target.classList.add(activClass);
	
				caltTotal();
			});
		});
	}

	function compareValueInput(value, totalValue) {
		if (+value >= totalValue) {
			return '1px solid red';
		} else {
			return 'none';
		}
	}

	function getDinamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', function() {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				switch (input.getAttribute('id')) {
					case 'height': 
						input.style.border = compareValueInput(input.value, 251);
						break;
					case 'weight':
						input.style.border = compareValueInput(input.value, 451);
						break;
					case 'age':
						input.style.border = compareValueInput(input.value, 122);
						break;
					default: 
						input.style.border = 'none'; 
						break;
				}
			}

			if (input.style.border === 'none') {
				switch (input.getAttribute('id')) {
					case 'height': 
						height = +input.value;
						break;
					case 'weight':
						mass = +input.value;
						break;
					case 'age':
						age = +input.value;
						break;
				}
	
				caltTotal();
			} else {
				result.textContent = '____';
			}
		});
	}

	function initLocalSettings(selector, activClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(function(elem) {
			elem.classList.remove(activClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activClass);
			}
		});
	}

	//установка значений в зависимости от локального хранилища
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = '1.375';
		localStorage.setItem('ratio', 1.375);
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	getStaticInformation('#gender', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
	getDinamicInformation('#height');
	getDinamicInformation('#weight');
	getDinamicInformation('#age');
}

export default calc;