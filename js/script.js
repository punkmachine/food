'use strict';

import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';

//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {	
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
	modal('[data-modal-open]', '.modal');
	timer();
	cards();
	calc();
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
});