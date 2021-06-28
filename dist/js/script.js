/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //После загрузки DOM.

document.addEventListener('DOMContentLoaded', () => {
  //! классы
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
      const element = document.createElement('div'); //если нет классов, которые мы передавали в конструктор, добавить базовый.

      if (this.classes.length === 0) {
        this.classes.push('menu__item');
      } //назначение классов селекторам


      this.classes.forEach(function (className) {
        element.classList.add(className);
      });
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

  } //! раздел констант


  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
  const deadline = '2021-07-15T15:00:00.000Z';
  const modalOpen = document.querySelectorAll('[data-modal-open]'),
        modalWindow = document.querySelector('.modal'),
        modalTimerId = setTimeout(openModalWindow, 100000);
  const forms = document.querySelectorAll('form'),
        messages = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро свяжемся с вами!',
    failure: 'Сервер грустит'
  }; //! раздел функций

  function hideTabContent() {
    tabsContent.forEach(function (tab) {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });
    tabs.forEach(function (tab) {
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
          hours = Math.floor(t / 3600000 % 24),
          minutes = Math.floor(t / 60000 % 60),
          seconds = Math.floor(t / 1000 % 60); //возвращение значений в виде объекта

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  } //для подставления нуля в таймер, если там стоят не двухзначные дни\часы.


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
      const t = getTimeRemaining(endtime); //занесение необходимых значений в объекты на странице

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds); //остановка таймера.

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    } //для того, чтобы убрать мигание даты при загрузке страницы.


    if (time.total > 0) {
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
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModalWindow();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  function postData(form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); //создание и добавление элемента с сообщением пользователю

      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
				display: block;
				margin: 10 auto;
			`;
      form.insertAdjacentElement('afterend', statusMessage); //создание запроса

      const request = new XMLHttpRequest(); //конструкция данных из форм

      const formData = new FormData(form); //пустой объект для formData

      const object = {}; //перенос formdata в ранее созданный пустой объект

      formData.forEach(function (value, key) {
        object[key] = value;
      }); //настройка, куда и как отправить данные

      request.open('POST', 'server.php'); //заголовок отправляемых данных

      request.setRequestHeader('Content-type', 'application/JSON'); //отправка данных

      request.send(JSON.stringify(object));
      request.addEventListener('load', function () {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(messages.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(messages.failure);
        }
      });
    });
  } //показ шаблонов при отправке данных на сервер


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog'),
          thanksModal = document.createElement('div'); //скрываем контент в модальном окне.

    prevModalDialog.classList.add('hide');
    openModalWindow(); //создание нового элемента

    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`; //помещение элемента на страницу

    document.querySelector('.modal').append(thanksModal); //удаление блока с сообщением об отправке по таймеру

    setTimeout(function () {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModalWindow();
    }, 4000);
  } //! обработчики событий


  tabsParent.addEventListener('click', function (event) {
    //для того, чтобы часто не писать полностью.
    const target = event.target; //проверяем клик на нужный элемент

    if (target && target.classList.contains('tabheader__item')) {
      //для каждого таба, если кликаем, и один из перебираемых элементов
      //совпадает с тем, на который кликнули, вызываем функцию скрытия 
      //всех табов и показываем один из них после. 
      tabs.forEach(function (tab, item) {
        if (target == tab) {
          hideTabContent();
          showTabContent(item);
        }
      });
    }
  }); //назначение на каждую кнопку открытия модалки.

  modalOpen.forEach(function (btn) {
    btn.addEventListener('click', openModalWindow);
  });
  modalWindow.addEventListener('click', function (event) {
    if (event.target === modalWindow || event.target.getAttribute('data-modal-close') == '') {
      closeModalWindow();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape' && modalWindow.classList.contains('modal_active')) {
      closeModalWindow();
    }
  }); //при долистывании до конца - показывать модалку.

  window.addEventListener('scroll', showModalByScroll); //! раздел вызова функций и методов классов.

  hideTabContent();
  showTabContent(0);
  setClock('.timer', deadline);
  new MenuCard('Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, 'img/tabs/vegy.jpg').render();
  new MenuCard('Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550, 'img/tabs/elite.jpg').render();
  new MenuCard('Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430, 'img/tabs/post.jpg').render(); //привязка функций к каждой форме

  forms.forEach(function (item) {
    postData(item);
  });
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map