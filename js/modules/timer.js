import {getZero} from '../services/services';

function timer() {
	const deadline = '2021-07-16T15:00:00.000Z';
	
	function getTimeRemaining(endtime) {
		//получение разницы между планируемым временем и текущим
		const t = Date.parse(endtime) - Date.parse(new Date()),
			  days = Math.floor(t / 86400000),
			  hours = Math.floor((t / 3600000) % 24),
			  minutes = Math.floor((t / 60000) % 60),
			  seconds = Math.floor((t / 1000) % 60);
		
		//возвращение значений в виде объекта
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
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
			const t = getTimeRemaining(endtime);

			//занесение необходимых значений в объекты на странице
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			//остановка таймера.
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}

		//для того, чтобы убрать мигание даты при загрузке страницы.
		if (time.total > 0 ) {
			updateClock();
		} else {
			clearInterval(timeInterval);
		}
	}

	setClock('.timer', deadline);
}

export default timer;
export {getZero};