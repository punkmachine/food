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
  //! раздел констант
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
  const deadline = '2021-07-02'; //! раздел функций

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
      //занесение необходимых значений в объекты на странице
      days.innerHTML = "00";
      hours.innerHTML = "00";
      minutes.innerHTML = "00";
      seconds.innerHTML = "00"; //остановка таймера.

      clearInterval(timeInterval);
    }
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
  }); //! раздел вызова функций

  hideTabContent();
  showTabContent(0);
  setClock('.timer', deadline);
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map