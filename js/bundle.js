/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	class MenuCard {
		constructor(title, description, price, img, parent = '.menu__field .container', ...classes) {
			this.title = title;
			this.description = description;
			this.price = price;
			this.img = img;
			this.parent = document.querySelector(parent);
			this.classes = classes;
		}

		render() {
			const element = document.createElement('div');

			//если нет классов, которые мы передавали в конструктор, добавить базовый.
			if (this.classes.length === 0) {
				this.classes.push('menu__item');
			}

			//назначение классов селекторам
			this.classes.forEach(function(className) {
				element.classList.add(className);
			});

			element.innerHTML = `
				<img src="${this.img}" alt="${this.title}" title="${this.title}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;

			this.parent.append(element);
		}
	}

	//мой запрос на сервер, для отображения карточек меню
	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/menu')
		.then(function(data) {
			data.forEach(function({title, description, price, img}) {
				new MenuCard(title, description, price, img).render();
			});
		});

	//запрос на сервер для отображения карточек меню с axios
	// axios.get('http://localhost:3000/menu')
	// 	.then(function(data) {
	// 		data.data.forEach(function({title, description, price, img}) {
	// 			new MenuCard(title, description, price, img).render();
	// 		});
	// 	}).catch(function(err) {
	// 		console.log('Да блять нахуй заебал этот ваш аксиос');
	// 	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function modal(triggerSelector, modalSelector) {
	const modalOpen = document.querySelectorAll(triggerSelector),
		  modalWindow = document.querySelector(modalSelector),
		  modalTimerId = setTimeout(openModalWindow, 50000);
	const forms = document.querySelectorAll('form'),
		  messages = {
			  loading: 'icons/spinner.svg',
			  success: 'Спасибо! Скоро свяжемся с вами!',
			  failure: 'Сервер грустит'
		  };
		  
	function closeModalWindow() {
		modalWindow.classList.remove('modal_active');
		document.body.style.overflow = '';
	}

	function openModalWindow() {
		modalWindow.classList.add('modal_active');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function showModalByScroll() {
		//* Без "-1" в конце не работает в Vivaldi из-за нижнего тулбара.
		//* В хроме и мозиле конфликтов из-за этого не возникает.
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1) {
			openModalWindow();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	//привязка постов 
	function bindPostData(form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();

			//создание и добавление элемента с сообщением пользователю
			let statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 10 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			//конструкция данных из форм
			const formData = new FormData(form);

			//Превращение данных в матрицу, потом в объект.
			let json = Object.fromEntries(formData.entries());

			//обработка для заглавной буквы
			json.name = S(`${json.name}`).capitalize().s;

			//превращение данных в json
			json = JSON.stringify(json);

			//обработка промиса
			(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
				.then(function(data) {
					showThanksModal(messages.success);
					statusMessage.remove();
				}).catch(function() {
					showThanksModal(messages.failure);
				}).finally(function() {
					form.reset();
				});
		});
	}

	//показ шаблонов при отправке данных на сервер
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog'),
			  thanksModal = document.createElement('div');

		//скрываем контент в модальном окне.
		prevModalDialog.classList.add('hide');
		openModalWindow();

		//создание нового элемента
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		//помещение элемента на страницу
		document.querySelector('.modal').append(thanksModal);

		//удаление блока с сообщением об отправке по таймеру
		setTimeout(function() {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModalWindow();
		}, 4000);
	}

	//назначение на каждую кнопку открытия модалки.
	modalOpen.forEach(function(btn) {
		btn.addEventListener('click', openModalWindow);
	});

	modalWindow.addEventListener('click', function(event) {
		if (event.target === modalWindow || event.target.getAttribute('data-modal-close') == '') {
			closeModalWindow();
		}
	});

	document.addEventListener('keydown', function(event) {
		if (event.code === 'Escape' && modalWindow.classList.contains('modal_active')) {
			closeModalWindow();
		}
	});

	//при долистывании до конца - показывать модалку.
	window.addEventListener('scroll', showModalByScroll);

	//привязка функций к каждой форме
	forms.forEach(function(item) {
		bindPostData(item);
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function slider({container, slide, nextArrow, prevArrow, currentCounter}) {
	const slider = document.querySelector(container),
		  arraySlide = slider.querySelectorAll(slide),
		  arrowSliderNext = slider.querySelector(nextArrow),
		  arrowSliderPrev = slider.querySelector(prevArrow),
		  currentSlide = slider.querySelector(currentCounter);
	let countSlide = +currentSlide.innerHTML;
	const indicators = document.createElement('ol');
	//массив с точками в тавигации слайдера
	let dots = [];

	function showSlide(index) {
		arraySlide.forEach(function(slide) {
			slide.classList.add('hide');
			slide.classList.remove('show', 'fade');
		});

		arraySlide[index].classList.add('show', 'fade');
		arraySlide[index].classList.remove('hide');
	}

	function arrowOrDotsClick() {
		showSlide(countSlide-1);

		currentSlide.innerHTML = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)(countSlide);

		//удаление класса активности у всех точек
		dots.forEach(function(dot) {
			dot.classList.remove('dot_active');
		});

		dots[countSlide-1].classList.add('dot_active');
	}

	arrowSliderNext.addEventListener('click', function() {
		if (countSlide == arraySlide.length) {
			countSlide = 1;
		} else {
			countSlide += 1;
		}

		arrowOrDotsClick();
	});

	arrowSliderPrev.addEventListener('click', function() {
		if (countSlide == 1) {
			countSlide = +arraySlide.length;
		} else {
			countSlide -= 1;
		}

		arrowOrDotsClick();
	});

	slider.style.position = 'relative';
	
	//индикаторы слайдера
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	//создание точек индикаторов
	for (let i = 0; i < arraySlide.length; i++) {
		const dot = document.createElement('li');

		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		
		if (i == 0) {
			dot.classList.add('dot_active');
		}

		indicators.append(dot);
		dots.push(dot);
	}

	dots.forEach(function(dot) {
		dot.addEventListener('click', function(event) {
			const slideTo = event.target.getAttribute('data-slide-to');

			countSlide = +slideTo;
			currentSlide.innerHTML = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)(countSlide);

			arrowOrDotsClick();
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(selectorTabs, selectorTabsContent, selectorTabsParent) {
	const tabs = document.querySelectorAll(selectorTabs),
		  tabsContent = document.querySelectorAll(selectorTabsContent),
		  tabsParent = document.querySelector(selectorTabsParent);
	
	function hideTabContent() {
		tabsContent.forEach(function(tab) {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});

		tabs.forEach(function(tab) {
			tab.classList.remove('tabheader__item_active');
		});
	}
	
	function showTabContent(number) {
		tabsContent[number].classList.add('show', 'fade');
		tabsContent[number].classList.remove('hide');
		tabs[number].classList.add('tabheader__item_active');
	}

	tabsParent.addEventListener('click', function(event) {
		//для того, чтобы часто не писать полностью.
		const target = event.target;

		//проверяем клик на нужный элемент
		if (target && target.classList.contains('tabheader__item')) {
			//для каждого таба, если кликаем, и один из перебираемых элементов
			//совпадает с тем, на который кликнули, вызываем функцию скрытия 
			//всех табов и показываем один из них после. 
			tabs.forEach(function(tab, item) {
				if (target == tab) {
					hideTabContent();
					showTabContent(item);
				}
			});
		}
	});

	hideTabContent();
	showTabContent(0);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* reexport safe */ _services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function timer() {
	const deadline = '2021-07-16T15:00:00.000Z';
	
	function getTimeRemaining(endtime) {
		//получение разницы между планируемым временем и текущим
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  days = Math.floor(t / 86400000),
			  hours = Math.floor((t / 3600000) % 24),
			  minutes = Math.floor((t / 60000) % 60),
			  seconds = Math.floor((t / 1000) % 60);
		
		//возвращение значений в виде объекта
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(selector, endtime) {
		//получение объектов в которые надо будет запихать разницу
		const timer = document.querySelector(selector),
			  days = timer.querySelector('#days'),
			  hours = timer.querySelector('#hours'),
			  minutes = timer.querySelector('#minutes'),
			  seconds = timer.querySelector('#seconds'),
			  //переменная таймера
			  timeInterval = setInterval(updateClock, 1000),
			  //для проверки актуальности таймера изначально
			  time = getTimeRemaining(endtime);

		function updateClock() {
			const t = getTimeRemaining(endtime);

			//занесение необходимых значений в объекты на странице
			days.innerHTML = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.days);
			hours.innerHTML = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.hours);
			minutes.innerHTML = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.minutes);
			seconds.innerHTML = (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getZero)(t.seconds);

			//остановка таймера.
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}

		//для того, чтобы убрать мигание даты при загрузке страницы.
		if (time.total > 0 ) {
			updateClock();
		} else {
			clearInterval(timeInterval);
		}
	}

	setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getZero": () => (/* binding */ getZero),
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResources": () => (/* binding */ getResources)
/* harmony export */ });
//для подставления нуля в таймер, если там стоят не двухзначные дни\часы.
function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

//настройка запроса, посыл запроса на сервер и получение ответа
async function postData(url, data) {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	});

	return await res.json();
}

//получение карточек меню
async function getResources(url) {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
	}

	return await res.json();
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {	
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items');
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal-open]', '.modal');
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map