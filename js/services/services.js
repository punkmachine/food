//для подставления нуля в таймер, если там стоят не двухзначные дни\часы.
function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}

export {getZero};