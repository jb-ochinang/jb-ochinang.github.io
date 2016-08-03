jQuery(document).ready(function($){
	//define store some initial variables
	var	halfWindowH = $(window).height()*0.5,
		halfWindowW = $(window).width()*0.5,
		//define a max rotation value (X and Y axises)
		maxRotationY = 5,
		maxRotationX = 3,
		aspectRatio;

	//detect if hero <img> has been loaded and evaluate its aspect-ratio
	$('.cd-floating-background').find('img').eq(0).load(function() {
		aspectRatio = $(this).width()/$(this).height();
		if( $('html').hasClass('preserve-3d') ) initBackground();
		initParticle();
	}).each(function() {
		//check if image was previously load - if yes, trigger load event
		if(this.complete) $(this).load();
	});

	//detect mouse movement
	$('.sectionInner').each(function(){
		$(this).on('mousemove', function(event){
			var wrapperOffsetTop = $(this).offset().top;
			if( $('html').hasClass('preserve-3d') ) {
				window.requestAnimationFrame(function(){
					moveBackground(event, wrapperOffsetTop);
				});
			}
		}).on('mouseleave', function () {
			if( $('html').hasClass('preserve-3d') ) {
				window.requestAnimationFrame(function(){
					resetBackground();
				});
			}
		});
	});

	//on resize - adjust .sectionInner and .cd-floating-background dimentions and position
	$(window).on('resize', function(){
		if( $('html').hasClass('preserve-3d') ) {
			window.requestAnimationFrame(function(){
				halfWindowH = $(window).height()*0.5,
					halfWindowW = $(window).width()*0.5;
				initBackground();
			});
		} else {
			$('.sectionInner').attr('style', '');
			$('.cd-floating-background').attr('style', '').removeClass('is-absolute');
		}
	});

	function initBackground() {
		var windowW = $(window).width(),
			wrapperHeight = $(window).height(),
			proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
			newImageWidth = Math.ceil(halfWindowW*2.3*proportions),
			newImageHeight = Math.ceil(newImageWidth/aspectRatio),
			newLeft = halfWindowW - newImageWidth/2,
			newTop = (wrapperHeight - newImageHeight)/2;

		//set an height for the .sectionInner
		$('.sectionInner').css({
			'height' : wrapperHeight,
		});

		if(windowW > 1024) {
			//set dimentions and position of the .sectionInner
			$('.cd-floating-background').addClass('is-absolute').css({
				'left' : (windowW - newImageWidth)/2,
				'top' : (wrapperHeight - newImageHeight)/2,
				'width' : newImageWidth,
			});
		} else {
			//set by sir leo
			var imgH = $('.cd-floating-background img').height(),
				imgW = $('.cd-floating-background img').width(),
				secH = $('.sec01 .sectionInner').outerHeight()*1.7,
				targetW = 0;
			
			targetW = (secH * imgW)/imgH;
			$('.cd-floating-background').addClass('is-absolute').css({
				'left' : ($(this).outerWidth()-targetW)/2,
				'top' : ($(this).outerWidth()-secH)/2,
				'width' : targetW+"px",
			});
		}
	}

	function moveBackground(event, topOffset) {
		var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
			yPosition = event.pageY - topOffset,
			rotateX = ((yPosition-halfWindowH)/halfWindowH)*maxRotationX;
		
		if( rotateY > maxRotationY) rotateY = maxRotationY;
		if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
		if( rotateX > maxRotationX) rotateX = maxRotationX;
		if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

		$('.cd-floating-background').css({
			'transition': 'all 0.2s',
			'-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
		});
	}
	
	function resetBackground() {
		$('.cd-floating-background').css({
			'transition': 'all 0.4s',
			'-moz-transform': '',
			'-webkit-transform': '',
			'-ms-transform': '',
			'-o-transform': '',
			'transform': '',
		});
	}
	
	
	function initParticle() {
		particlesJS('particles-js',
					{
			"particles": {
				"number": {
					"value": 600,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#eeeeee"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#ffffff"
					},
					"polygon": {
						"nb_sides": 5
					},
					"image": {
						"src": "img/github.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 1,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 1,
						"opacity_min": 0,
						"sync": false
					}
				},
				"size": {
					"value": 1.5,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 4,
						"size_min": 1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": false,
					"distance": 16.03412060865523,
					"color": "#ffffff",
					"opacity": 0.4,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 1.5,
					"direction": "none",
					"random": true,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 600
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": true,
						"mode": "bubble"
					},
					"onclick": {
						"enable": true,
						"mode": "repulse"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 200,
						"line_linked": {
							"opacity": 1
						}
					},
					"bubble": {
						"distance": 100,
						"size": 0,
						"duration": 2,
						"opacity": .2,
						"speed": 3
					},
					"repulse": {
						"distance": 300,
						"duration": 0.3
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true
		}

		);
	}
});

/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
	https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
	var element = document.createElement('p'),
		html = document.getElementsByTagName('html')[0],
		body = document.getElementsByTagName('body')[0],
		propertys = {
			'webkitTransformStyle':'-webkit-transform-style',
			'MozTransformStyle':'-moz-transform-style',
			'msTransformStyle':'-ms-transform-style',
			'transformStyle':'transform-style'
		};

	body.insertBefore(element, null);

	for (var i in propertys) {
		if (element.style[i] !== undefined) {
			element.style[i] = "preserve-3d";
		}
	}

	var st = window.getComputedStyle(element, null),
		transform = st.getPropertyValue("-webkit-transform-style") ||
		st.getPropertyValue("-moz-transform-style") ||
		st.getPropertyValue("-ms-transform-style") ||
		st.getPropertyValue("transform-style");

	if(transform!=='preserve-3d'){
		html.className += ' no-preserve-3d';
	} else {
		html.className += ' preserve-3d';
	}
	document.body.removeChild(element);
	
})();