'use strict';

//После загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		  tabsContent = document.querySelectorAll('.tabcontent'),
		  tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(function(tab) {
			tab.style.display = 'none';
		});

		tabs.forEach(function(tab) {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(number) {
		tabsContent[number].style.display = 'block';
		tabs[number].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent(0);
});