import {postData} from '../services/services';

function modal(triggerSelector, modalSelector) {
	const modalOpen = document.querySelectorAll(triggerSelector),
		  modalWindow = document.querySelector(modalSelector),
		  modalTimerId = setTimeout(openModalWindow, 50000);
	const forms = document.querySelectorAll('form'),
		  messages = {
			  loading: 'icons/spinner.svg',
			  success: 'Спасибо! Скоро свяжемся с вами!',
			  failure: 'Сервер грустит'
		  };
		  
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

	//привязка постов 
	function bindPostData(form) {
		form.addEventListener('submit', function(event) {
			event.preventDefault();

			//создание и добавление элемента с сообщением пользователю
			let statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 10 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			//конструкция данных из форм
			const formData = new FormData(form);

			//Превращение данных в матрицу, потом в объект.
			let json = Object.fromEntries(formData.entries());

			//обработка для заглавной буквы
			json.name = S(`${json.name}`).capitalize().s;

			//превращение данных в json
			json = JSON.stringify(json);

			//обработка промиса
			postData('http://localhost:3000/requests', json)
				.then(function(data) {
					showThanksModal(messages.success);
					statusMessage.remove();
				}).catch(function() {
					showThanksModal(messages.failure);
				}).finally(function() {
					form.reset();
				});
		});
	}

	//показ шаблонов при отправке данных на сервер
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog'),
			  thanksModal = document.createElement('div');

		//скрываем контент в модальном окне.
		prevModalDialog.classList.add('hide');
		openModalWindow();

		//создание нового элемента
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		//помещение элемента на страницу
		document.querySelector('.modal').append(thanksModal);

		//удаление блока с сообщением об отправке по таймеру
		setTimeout(function() {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModalWindow();
		}, 4000);
	}

	//назначение на каждую кнопку открытия модалки.
	modalOpen.forEach(function(btn) {
		btn.addEventListener('click', openModalWindow);
	});

	modalWindow.addEventListener('click', function(event) {
		if (event.target === modalWindow || event.target.getAttribute('data-modal-close') == '') {
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

	//привязка функций к каждой форме
	forms.forEach(function(item) {
		bindPostData(item);
	});
}

export default modal;