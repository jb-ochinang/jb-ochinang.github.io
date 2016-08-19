$(document).ready(function () {

	'use strict';

	var img = new Image();
	img.src = '/public/images/bg.png';
	$('header .menu').css('background-image', 'url('+img.src+')');
	
	var toggles = document.querySelectorAll('.hamburger, .eggs');

	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener('click', function (e) {
			e.preventDefault();
			(this.classList.contains('is-active') === true) ? this.classList.remove('is-active'): this.classList.add('is-active');
			$(this).prop('disabled', true);
			setTimeout(function () {
				$('.hamburger').prop('disabled', false);
			}, 600);
			setTimeout(function () {
				$('.eggs').prop('disabled', false);
			}, 400);
		});
	}

	$('.hamburger').click(function () {
		if ($('.menu').hasClass('is-active')) {
			res();
			var timer = setTimeout(function () {
				$('.menu').removeClass('is-active');
			}, 100);
			$('.sec01Content').css({
				'display': 'table-cell;'
			});
		} else {
			res();
			$('.menu').addClass('is-active');
			var timer = setTimeout(function () {
				$('.sec01Content').css({
					'display': 'none'
				});
			}, 500);
		}
	});

	$("a[href='#']").click(function (e) {
		e.preventDefault();
	});

	function res() {
		$('.menu').css({
			'height': $('.sec01').height()
		});
	}

	$(window).on('resize', function () {
		res();
	});

	$('.wrap').animate({
		opacity: 1
	, }, 100);

	var scrollBar = setInterval(function () {
		if ($('body').children('#qLoverlay').length < 1) {
			$('body').css('overflow', 'visible');
			clearInterval(scrollBar);
		}
	}, 1);

});

window.sr = ScrollReveal();
sr.reveal('.caption', {
	origin: 'left',
	distance: '50px',
	duration: 1000,
	opacity: 0,
	reset: true
});

sr.reveal('.table5 .col', {
	origin: 'bottom'
	, distance: '50px'
	, duration: 1000
	, opacity: 0
	, reset: true
}, 50);

sr.reveal('.map', {
	origin: 'bottom',
	distance: '70px',
	duration: 1200,
	opacity: 0,
	scale: '.9',
	mobile: false,
	reset: false
});

sr.reveal('.captain', {
	duration: 1111,
	opacity: 0,
	scale: '.5',
	reset: true
});

sr.reveal('.sec06 .secInner', {
	origin: 'top',
	distance: '50px',
	duration: 1111,
	opacity: 0,
	scale: '.9',
	mobile: false,
	reset: false
});