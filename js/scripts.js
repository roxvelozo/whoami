$(function() {

	var game = {
		showPage: function(pageToShow) {
			// First, lets hide all pages (except pageToShow)
			$(".page").not("#" + pageToShow).hide();
			// Show/Ensure pageToShow is visible
			$("#" + pageToShow).show();
			$("#" + pageToShow).trigger('didShow');
		}
	}



	/** Page Specific Logic **/
	$('#capture').bind('didShow', function(){

	 	$("#captureBtn").trigger('click');

	});
	$('#position').bind('didShow', function(){

	 	alert('position showed!');

	});


	$("#capture .retake-btn").on('click', function() {
		$("#captureBtn").trigger('click');

	});

	$("#capture .continue-btn").on('click', function() {

		// setup position screen
		$("#position .capturedImage img").attr('src',
			$("#capture .capturedImage img").attr('src')
		);

		game.showPage('position');

	});





/*var canvas_width = $('#canvas').width();
var canvas_height = $('#canvas').height();

$('#canvas').replaceWith('<canvas width="'+ canvas_width +'" height="'+ canvas_height +'"></canvas>')	*/




	/** General  Setup **/
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









	// INITIALIZATION!!
	// Lets start inside of our capture screen.
	game.showPage('capture');


});
