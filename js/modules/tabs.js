function tabs(selectorTabs, selectorTabsContent, selectorTabsParent) {
	const tabs = document.querySelectorAll(selectorTabs),
		tabsContent = document.querySelectorAll(selectorTabsContent),
		tabsParent = document.querySelector(selectorTabsParent);

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

	tabsParent.addEventListener('click', function (event) {
		//для того, чтобы часто не писать полностью.
		const target = event.target;

		//проверяем клик на нужный элемент
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
	});

	hideTabContent();
	showTabContent(0);
}

export default tabs;