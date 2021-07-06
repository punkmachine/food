'use strict';

import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';

//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {	
	tabs();
	modal();
	timer();
	cards();
	calc();
	slider();
});