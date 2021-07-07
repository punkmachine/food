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

export {getZero};
export {postData};