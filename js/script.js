'use strict';

//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {	
	const tabs = require('./modules/tabs'),
		  calc = require('./modules/calc'),
		  cards = require('./modules/cards'),
		  modal = require('./modules/modal'),
		  slider = require('./modules/slider'),
		  timer = require('./modules/timer');
		  

	tabs();
	modal();
	timer();
	cards();
	calc();
	slider();
});