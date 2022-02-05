import { getZero } from '../services/services';

function slider({ container, slide, nextArrow, prevArrow, currentCounter }) {
	const slider = document.querySelector(container),
		arraySlide = slider.querySelectorAll(slide),
		arrowSliderNext = slider.querySelector(nextArrow),
		arrowSliderPrev = slider.querySelector(prevArrow),
		currentSlide = slider.querySelector(currentCounter);
	let countSlide = +currentSlide.innerHTML;
	const indicators = document.createElement('ol');
	//массив с точками в тавигации слайдера
	let dots = [];

	function showSlide(index) {
		arraySlide.forEach(function (slide) {
			slide.classList.add('hide');
			slide.classList.remove('show', 'fade');
		});

		arraySlide[index].classList.add('show', 'fade');
		arraySlide[index].classList.remove('hide');
	}

	function arrowOrDotsClick() {
		showSlide(countSlide - 1);

		currentSlide.innerHTML = getZero(countSlide);

		//удаление класса активности у всех точек
		dots.forEach(function (dot) {
			dot.classList.remove('dot_active');
		});

		dots[countSlide - 1].classList.add('dot_active');
	}

	arrowSliderNext.addEventListener('click', function () {
		if (countSlide == arraySlide.length) {
			countSlide = 1;
		} else {
			countSlide += 1;
		}

		arrowOrDotsClick();
	});

	arrowSliderPrev.addEventListener('click', function () {
		if (countSlide == 1) {
			countSlide = +arraySlide.length;
		} else {
			countSlide -= 1;
		}

		arrowOrDotsClick();
	});

	slider.style.position = 'relative';

	//индикаторы слайдера
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	//создание точек индикаторов
	for (let i = 0; i < arraySlide.length; i++) {
		const dot = document.createElement('li');

		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');

		if (i == 0) {
			dot.classList.add('dot_active');
		}

		indicators.append(dot);
		dots.push(dot);
	}

	dots.forEach(function (dot) {
		dot.addEventListener('click', function (event) {
			const slideTo = event.target.getAttribute('data-slide-to');

			countSlide = +slideTo;
			currentSlide.innerHTML = getZero(countSlide);

			arrowOrDotsClick();
		});
	});
}

export default slider;