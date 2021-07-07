//для подставления нуля в таймер, если там стоят не двухзначные дни\часы.
function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

//настройка запроса, посыл запроса на сервер и получение ответа
async function postData(url, data) {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	});

	return await res.json();
}

//получение карточек меню
async function getResources(url) {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Не получается обработать fetch ${url}, статус: ${res.status}`);
	}

	return await res.json();
}

export {getZero};
export {postData};
export {getResources};