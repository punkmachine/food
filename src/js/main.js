'use strict';

//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
	//! классы
	class MenuCard {
		constructor(title, description, price, img, parent) {
			this.title = title;
			this.description = description;
			this.price = price;
			this.img = img;
			this.parent = document.querySelector(parent);
		}

		render() {
			const element = document.createElement('div');

			element.classList.add('menu__item');
			element.innerHTML = `
				<img src="${this.img}" alt="${this.title}">
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

	//! раздел констант
	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader__items');
	const deadline = '2021-07-15T15:00:00.000Z';
	const modalOpen = document.querySelectorAll('[data-modal-open]'),
		  modalClose = document.querySelector('[data-modal-close]'),
		  modalWindow = document.querySelector('.modal'),
		  modalTimerId = setTimeout(openModalWindow, 10000);

	//! раздел функций
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

	//для подставления нуля в таймер, если там стоят не двухзначные дни\часы.
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
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
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

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

	//! обработчики событий
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

	//назначение на каждую кнопку открытия модалки.
	modalOpen.forEach(function(btn) {
		btn.addEventListener('click', openModalWindow);
	});

	modalClose.addEventListener('click', closeModalWindow);

	modalWindow.addEventListener('click', function(event) {
		if (event.target === modalWindow) {
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

	//! раздел вызова функций и методов классов.
	hideTabContent();
	showTabContent(0);
	setClock('.timer', deadline);

	new MenuCard('Меню "Фитнес"', 
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
		229, 
		'img/tabs/vegy.jpg', 
		'.menu__field .container'
	).render();
	new MenuCard('Меню “Премиум”', 
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		550, 
		'img/tabs/elite.jpg', 
		'.menu__field .container'
	).render();
	new MenuCard('Меню "Постное"', 
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
		430, 
		'img/tabs/post.jpg', 
		'.menu__field .container'
	).render();
});