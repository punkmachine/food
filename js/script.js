'use strict';

import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';

//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {	
	try {
		tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
	}
	catch(error) {
		alert('Табы умерли');
	}
	
	try {
		modal('[data-modal-open]', '.modal');
	}
	catch(error) {
		alert('Модалка умерла');
	}

	try {
		timer();
	}
	catch(error) {
		alert('Умер таймер');
	}

	try {
		cards();
	}
	catch(error) {
		alert('Карточки меню умерли');
	}
	
	try {
		calc();
	}
	catch(error) {
		alert('Умер калькулятор');
	}

	try {
		slider({
			container: '.offer__slider',
			slide: '.offer__slide',
			nextArrow: '.offer__slider-next',
			prevArrow: '.offer__slider-prev',
			currentCounter: '#current',
			wrapper: '.offer__slider-wrapper',
			field: '.offer__slider-inner'
		});
	}
	catch(error) {
		alert('Умер слайдер');
	}
});