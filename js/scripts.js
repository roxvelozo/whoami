$(function() {

	var marks = [
		'',
		'',
		''
	]

	var game = {
		showPage: function(pageToShow) {
			// First, lets hide all pages (except pageToShow)
			$(".page").not("#" + pageToShow).hide();
			// Show/Ensure pageToShow is visible
			$("#" + pageToShow).show();
			$("#" + pageToShow).trigger('didShow');
		}
	}

	var score;



	/****
	***** Page Specific Logic
	*****/
	$('#capture').bind('didShow', function(){

	 	$("#captureBtn").trigger('click');

	 	initializeAndSetupPinchAndZoom();

	});
	$('#flip').bind('didShow', function(){

		startCountdown(3,'game');

	});
	$('#game').bind('didShow', function(){

		$("#game .capturedImage").html(''); // Empty it out
		var originalImage = $("#capture .capturedImage img").clone();
		originalImage.appendTo($("#game .capturedImage"));

		score = 0;

		// Choose random mask.

		startCountdown(30,'score');

	});

	/****
	***** General Setup
	*****/

	$("#splash .play-btn").on('click', function() {
		game.showPage('capture');
	});

	$("#capture .retake-btn").on('click', function() {
		$("#captureBtn").trigger('click');
	});

	$("#capture .start-btn").on('click', function() {
		game.showPage('flip');
	});

	$("#game .button").on('click', function() {
		if ($(this).hasClass('correct-btn')) {
			score ++;
			$('#score .score span').html(score);
		}
		// show next random mask
	});

	$("#score .new-btn").on('click', function() {
		game.showPage('capture');
		score = 0;
	});

	$("#score .again-btn").on('click', function() {
		game.showPage('flip');
		score = 0;
	});

	var captureBtn = document.getElementById("captureBtn")
 	captureBtn.addEventListener("change", function (evt) {
		var capture = this.files[0];

		//window/picture picURL
		var windowURL = window.URL || window.webkitURL;
		var picURL = windowURL.createObjectURL(capture);

		//load photo into image object.
		showCapturePreview(picURL);

	}, false);


	function showCapturePreview(source) {
		$(".capturedImage img").attr('src', source).css({
		});

		// Do other logic
		$("#capture .controls").show();

		$("#captureBtn").hide();
	}

	function startCountdown(time, redirect) {
		$('.show-time').html(time);
		var interval = setInterval(function() {
			$('.show-time').html(--time);

			if(time == 0) {
				clearInterval(interval);
				game.showPage(redirect);
			}
		},1000);
	}





	// INITIALIZATION!!
	// Lets start inside of our splash screen.
	game.showPage('splash');






	var pinchAndZoomSetup = false;
	function initializeAndSetupPinchAndZoom() {
		if (pinchAndZoomSetup) return; // Only set it up once!
		pinchAndZoomSetup = true;

		// polyfill
		var reqAnimationFrame = (function () {
		    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
		        window.setTimeout(callback, 1000 / 60);
		    };
		})();

		var screen = $("#capture .capturedImage")[0];
		var el = $("#capture .capturedImage img")[0];

		var START_X = Math.round((screen.offsetWidth - el.offsetWidth) / 2);
		var START_Y = Math.round((screen.offsetHeight - el.offsetHeight) / 2);

		var ticking = false;
		var transform;
		var timer;

		var mc = new Hammer.Manager(el);

		mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

		mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
		mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
		mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

		mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
		mc.add(new Hammer.Tap());

		mc.on("panstart panmove", onPan);
		mc.on("pinchstart pinchmove", onPinch);
		mc.on("swipe", onSwipe);

		function resetElement() {
		    el.className = 'animate';
		    transform = {
		        translate: { x: START_X, y: START_Y },
		        scale: 1,
		        angle: 0,
		        rx: 0,
		        ry: 0,
		        rz: 0
		    };
		    requestElementUpdate();
		}

		function updateElementTransform() {
		    var value = [
		        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
		        'scale(' + transform.scale + ', ' + transform.scale + ')',
		        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
		    ];

		    value = value.join(" ");
		    el.style.webkitTransform = value;
		    el.style.mozTransform = value;
		    el.style.transform = value;
		    ticking = false;
		}

		function requestElementUpdate() {
		    if(!ticking) {
		        reqAnimationFrame(updateElementTransform);
		        ticking = true;
		    }
		}

		function onPan(ev) {
		    el.className = '';
		    transform.translate = {
		        x: START_X + ev.deltaX,
		        y: START_Y + ev.deltaY
		    };

		    requestElementUpdate();
		}

		var initScale = 1;
		function onPinch(ev) {
		    if(ev.type == 'pinchstart') {
		        initScale = transform.scale || 1;
		    }

		    el.className = '';
		    transform.scale = initScale * ev.scale;

		    requestElementUpdate();
		}

		function onSwipe(ev) {
		    var angle = 50;
		    transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
		    transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
		    transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

		    clearTimeout(timer);
		    timer = setTimeout(function () {
		        resetElement();
		    }, 300);

		    requestElementUpdate();
		}

		resetElement();

	}




});
