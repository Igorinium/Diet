
//язык
$(document).ready(function () {
	$('.language-icon').click(function (event) {
		$('.language-icon').toggleClass('active');
	});

	$('.language-icon').click(function () {
		let id = document.querySelector('.language-icon__icon.active').getAttribute('id');
		document.querySelector('body').setAttribute('class', id);
	});
	//смена языка
	document.querySelector('.language-icon__list').addEventListener('click', (e) => {
		if (e.target.classList.contains('language-icon__icon')) {
			let activeLang = document.querySelector('.language-icon__icon.active');
			document.querySelector('.language-icon__list').insertBefore(activeLang, document.querySelector('.language-icon__list').children[0]);
			$('.language-icon__icon').removeClass('active');
			document.querySelector('.language-icon').insertBefore(e.target, document.querySelector('.language-icon').children[0]);
			$(e.target).addClass('active');
		}
	});
});

const pageUp = () => {
	let value = parseInt(document.querySelector('.progress-board__item.active').getAttribute('value')) + 1;
	document.querySelector(`.progress-board__item[value="${value}"]`).click();
};
const pageDown = () => {
	let value = parseInt(document.querySelector('.progress-board__item.active').getAttribute('value')) - 1;
	document.querySelector(`.progress-board__item[value="${value}"]`).click();
};
const bmiCalc = (val2, val3) => {
	$('.BMI__fat-info').addClass('active');
	document.querySelector('.BMI__form').style.marginBottom = "10px";
	$('._next-btn').focus();
	let BMI = Math.round(parseInt(val3) / Math.pow((parseInt(val2) / 100), 2) * 10) / 10;
	$('#weight-circle').text(BMI);
	$('.weight-estimate li').removeClass('li-active');
	if (BMI < 18.5) {
		$('.weight-estimate li[id="weight-1"]').addClass('li-active');
	}
	if (BMI >= 18.5 && BMI < 25) {
		$('.weight-estimate li[id="weight-2"]').addClass('li-active');
	}
	if (BMI >= 25 && BMI < 30) {
		$('.weight-estimate li[id="weight-3"]').addClass('li-active');
	}
	if (BMI >= 30 && BMI < 35) {
		$('.weight-estimate li[id="weight-4"]').addClass('li-active');
	}
	if (BMI >= 35 && BMI < 40) {
		$('.weight-estimate li[id="weight-5"]').addClass('li-active');
	}
	if (BMI >= 40) {
		$('.weight-estimate li[id="weight-6"]').addClass('li-active');
	}
};

$(document).ready(function () {
	//переход назад и вперёд
	$('li[id="page_1"] input[type="radio"]').click(function (event) {
		pageUp();
	});
	$('li[id="page_2"] input[type="radio"]').click(function (event) {
		pageUp();
	});
	$('li[id="page_3"] input[type="radio"]').click(function (event) {
		pageUp();
	});
	$('._back-btn').click(function (event) {
		pageDown();
	});
	$('._next-btn').click(function (event) {
		pageUp();
	});

	//расчёт индекса массы тела
	$('#BMI-calc').click(function (e) {
		let val1 = $('.BMI__input[tabindex="1"]').val();
		let val2 = $('.BMI__input[tabindex="2"]').val();
		let val3 = $('.BMI__input[tabindex="3"]').val();
		if (val1.length >= 1 && val2.length >= 1 && val3.length >= 1) {
			bmiCalc(val2, val3);
		}
	});
	$('.BMI__input').keypress(function (e) {

		if (e.keyCode == 13) {
			let val1 = $('.BMI__input[tabindex="1"]').val();
			let val2 = $('.BMI__input[tabindex="2"]').val();
			let val3 = $('.BMI__input[tabindex="3"]').val();
			if (val1.length >= 1 && val2.length >= 1 && val3.length >= 1) {
				bmiCalc(val2, val3);
			}
			else {
				let tab = parseInt($(this).attr('tabindex')) + 1;
				$(`.BMI__input[tabindex="${tab}"]`).focus();
			}
		}
	});
	$('._next-btn').keypress(function (e) {
		if (e.keyCode == 13) {
			$(this).click();
		}
	});
	$('.individual-products__input').keypress(function (e) {
		if (e.keyCode == 13) {
			event.preventDefault();
			let val = $('.individual-products__input').val();
			$(this).val('');
			if (val != '') {
				document.querySelector('.individual-products__list').insertAdjacentHTML('afterbegin', `<li>${val}<img src="img/svg/no.svg" class="individual-products__off"></li>`);
			}
		}
	});
	$('.product-add').click(function (event) {
		let val = $('.individual-products__input').val();
		$('.individual-products__input').val('');
		if (val != '') {
			document.querySelector('.individual-products__list').insertAdjacentHTML('afterbegin', `<li>${val}<img src="img/svg/no.svg" class="individual-products__off"></li>`);
		}
	});
	document.querySelector('.individual-products__list').addEventListener('click', (e) => {

		if (e.target.classList.contains('individual-products__off')) {
			e.target.closest('li').remove();
		}
	})
});
$('label[for="goals-weight__2"]').click(function (event) {
	$('#board-1').addClass('active');
});
$('label[for="goals-weight__1"]').click(function (event) {
	$('#board-1').removeClass('active');
});
$('label[for="goals-fat__2"]').click(function (event) {
	$('#board-2').addClass('active');
});
$('label[for="goals-fat__1"]').click(function (event) {
	$('#board-2').removeClass('active');
});
$("#myRange").change(function () {
	let val = $("#myRange").val();
	val /= 10;
	$("#amount").val(val);
	$('#goals-result-date').html('');
	let goalWeight = $('.goals-weight__input').val();
	let weight = $('input[name="BMI__weight"]').val();
	let days;
	if (weight < goalWeight) {
		days = Math.round(((goalWeight - weight) / val) * 7);
	}
	if (weight >= goalWeight) {
		days = Math.round(((weight - goalWeight) / val) * 7);
	}

	var date = new Date();
	date.setDate(date.getDate() + days);

	var textout = "" + date.getDate();
	var month = date.getMonth();
	if (month == 0) textout += " января";
	if (month == 1) textout += " февраля";
	if (month == 2) textout += " марта";
	if (month == 3) textout += " апреля";
	if (month == 4) textout += " мая";
	if (month == 5) textout += " июня";
	if (month == 6) textout += " июля";
	if (month == 7) textout += " августа";
	if (month == 8) textout += " сентября";
	if (month == 9) textout += " октября";
	if (month == 10) textout += " ноября";
	if (month == 11) textout += " декабря";
	textout += " " + date.getFullYear() + " года";
	$('#goals-result-date').prepend(`Цель будет достигнута ${textout}`);

});
$("input[name='progress']").change(function () {
	$('.progress-board__item').removeClass('active');
	$('.progress-board__pin').removeClass('active');
	let number = document.querySelector('input[name="progress"]:checked').getAttribute('id');
	let index = document.querySelector('input[name="progress"]:checked').getAttribute('value');
	$('.main-pages li').removeClass('active')
	$(`#page_${index}`).addClass('active');
	$(`label[for="${number}"]`).addClass('done');
	$(`label[for="${number}"]`).addClass('active');
	$(`input[id="${number}"]`).addClass('active');
	$(`input[id="${number}"]`).addClass('done');


	//изменение цвета линий в прогресс-борде
	$(document).ready(function () {
		if ($("li[id=page_1]").hasClass('active')) {
			$('.m-progress-board__line').addClass('not-active');
			$('.progress-board__items').addClass('not-active');
		}
		else {
			$('.m-progress-board__line').removeClass('not-active');
			$('.progress-board__items').removeClass('not-active');
		}
	});

});

$('input[name="goal-weight"]').keypress(function (e) {
	if (e.keyCode == 13) {
		event.preventDefault();
		let tab = parseInt($(this).attr('tabindex')) + 1;
		$(`.goals-weight__input[tabindex="${tab}"]`).focus();
	}
});

//процент жира в организме - page-6

const fatCalc = (neck, waist) => {
	//находим всё для формулы процента жира
	let gender = $('input[name="gender-button"]:checked').attr('id');
	let height = $('input[name="BMI__height"]').val();
	let fatProcent;
	if (gender == 'male') {
		fatProcent = 10.1 - (0.239 * height) + (0.8 * waist) - (0.5 * neck);
	}
	if (gender == 'female') {
		fatProcent = 19.2 - (0.239 * height) + (0.8 * waist) - (0.5 * neck);
	}

	$('.fat-procent').addClass('active');
	$('._next-btn').focus();

	fatProcent = Math.round(fatProcent * 10) / 10;
	$('#fat-circle').text(fatProcent);
	$('.fat-estimate li').removeClass('li-active');
	if (gender == 'male') {

		if (fatProcent < 8) {
			$('.fat-estimate li[id="fat-estimate__1"]').addClass('li-active');
		}
		if (fatProcent >= 8 && fatProcent < 25) {
			$('.fat-estimate li[id="fat-estimate__2"]').addClass('li-active');
		}
		if (fatProcent >= 25) {
			$('.fat-estimate li[id="fat-estimate__3"]').addClass('li-active');
		}
	}
	if (gender == 'female') {

		if (fatProcent < 21) {
			$('.fat-estimate li[id="fat-estimate__1"]').addClass('li-active');
		}
		if (fatProcent >= 21 && fatProcent < 39) {
			$('.fat-estimate li[id="fat-estimate__2"]').addClass('li-active');
		}
		if (fatProcent >= 39) {
			$('.fat-estimate li[id="fat-estimate__3"]').addClass('li-active');
		}
	}
};

$('#fat-calc').click(function (event) {

	let neck = $('.goals-weight__input[name="neck-size"]').val();
	let waist = $('.goals-weight__input[name="waist-size"]').val();
	let hips = $('.goals-weight__input[name="hips-size"]').val();

	if (neck.length >= 1 && waist.length >= 1 && hips.length >= 1) {
		fatCalc(neck, waist);
	}
});
$('.goals-weight__input').keypress(function (e) {

	if (e.keyCode == 13) {
		let neck = $('.goals-weight__input[name="neck-size"]').val();
		let waist = $('.goals-weight__input[name="waist-size"]').val();
		let hips = $('.goals-weight__input[name="hips-size"]').val();

		if (neck.length >= 1 && waist.length >= 1 && hips.length >= 1) {
			fatCalc(neck, waist);
		}
		else {
			let tab = parseInt($(this).attr('tabindex')) + 1;
			$(`.goals-weight__input[tabindex="${tab}"]`).focus();
		}
	}
});

$('.personal-data__btn').click(function (event) {
	$('#popup').addClass('active');
	var date = new Date();
	var bd = new Date($('input[name="date"]').val().replace(/-/g, '/'));
	var diff = Math.abs(date - bd);
	let age = Math.floor((diff / 31536000000));
	let gender = $('input[name="gender-button"]:checked').attr('id');
	var genderVal;
	if (gender == 'male') {
		$('#parametr-gender').text('мужчина');
		genderVal = 5;
	}
	if (gender == 'female') {
		$('#parametr-gender').text('женщина');
		genderVal = -161;

	}
	var kf;
	let physicalLoad = $('input[name="physical-activity__radio"]:checked').attr('value') * $('input[name="physical-load__radio"]:checked').attr('value');
	if (physicalLoad <= 1) {
		kf = 1.2;
	}
	if (physicalLoad > 1 && physicalLoad <= 3) {
		kf = 1.375;
	}
	if (physicalLoad > 3 && physicalLoad <= 4) {
		kf = 1.55;
	}
	if (physicalLoad > 4 && physicalLoad <= 6) {
		kf = 1.725;
	}
	if (physicalLoad > 6 && physicalLoad <= 8) {
		kf = 1.9;
	}
	var kcal = Math.round(((10 * $('input[name="BMI__weight"]').val()) + (6.25 * $('input[name="BMI__height"]').val()) - (5 * age) + genderVal) * kf);
	var water = Math.round(($('input[name="BMI__weight"]').val() * 0.035) * 10) / 10;
	$('#summary-kcal').text(kcal);
	$('#water-need').text(water + "л");
	$('#parametr-age').text(age);
	$('#parametr-weight').text($('input[name="BMI__weight"]').val());
	$('#parametr-height').text($('input[name="BMI__height"]').val());
	$('#summary__bmi-circle').text($('#weight-circle').text());
	$('.summary__procent-fat-p').text($('#fat-circle').text() + ' %');

	//расчёт калорий
});


// ПОПАП

$('.popup__close').click(function (event) {
	$('#popup').removeClass('active');
});

document.querySelector('.popup__body').addEventListener('click', (e) => {
	if (!e.target.closest('.popup__content')) {
		$('#popup').removeClass('active');
	};
});