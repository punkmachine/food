function cards() {
	//! КАРТОЧКИ МЕНЮ.
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

	//получение карточек меню
	async function getResources(url) {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
		}

		return await res.json();
	}

	//мой запрос на сервер, для отображения карточек меню
	getResources('http://localhost:3000/menu')
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

module.exports = cards;