$(document).ready(function()
{

	'use strict';

	var toggles = document.querySelectorAll('.hamburger, .eggs');

	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener( 'click', function(e) {
			e.preventDefault();
			(this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
			$(this).prop('disabled', true);
			setTimeout(function(){
				$('.hamburger').prop('disabled', false);
			}, 600);
			setTimeout(function(){
				$('.eggs').prop('disabled', false);
			}, 400);
		});
	}
	
	$( '.hamburger' ).click(function() {
		if($('.menu').hasClass('is-active')) {
			res();
			var timer = setTimeout(function(){
				$('.menu').removeClass('is-active');
			}, 100);
			$('.sec01Content').css({ 'visibility' : 'visible'});
		} else {
			res();
			$('.menu').addClass('is-active');
			var timer = setTimeout(function(){
				$('.sec01Content').css({ 'visibility' : 'hidden'});
			}, 500);
		}
	});
	
	$( 'a' ).click(function(e) {
		e.preventDefault();
	});
	
	function res() {
		$('.menu').css({
			'height' : $('.sec01').height()
		});
	}
	
	$(window).on('resize', function(){
		res();
	});
	
	$('.wrap').animate({
		opacity: 1,
	}, 100);
	
	/*var scrollBar = setInterval(function(){
		console.log('test');
		if($('body').children('#qLoverlay').length < 1) {
			$('body').css('overflow', 'visible');
			clearInterval(scrollBar);
		}
	}, 10);*/
	
	
});