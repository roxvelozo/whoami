$(function() {

/*var canvas_width = $('#canvas').width();
var canvas_height = $('#canvas').height();

$('#canvas').replaceWith('<canvas width="'+ canvas_width +'" height="'+ canvas_height +'"></canvas>')	*/




	var captureBtn = document.getElementById("captureBtn")

	var lastCapture;

	$("#request #capture").click(function() {
		$("#captureBtn").trigger('click');
	});

 	captureBtn.addEventListener("change", function (evt) {
		var capture = this.files[0];
		var reader;

		//var preLoad = document.createElement("img");

		if (!!capture.type.match(/image.*/)) {

			reader = new FileReader();

			/*
			reader.onloadend = function (e) {
				//lastCapture = e.target.result;

				preLoad.onload = function() {
					var canvas = document.createElement("canvas");
					var MAX_WIDTH = 800;
					var MAX_HEIGHT = 600;
					var width = preLoad.width * 0.25;
					var height = preLoad.height * 0.25;


					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(preLoad, 0, 0, width, height);

					lastCapture = canvas.toDataURL();

					submitRequestImage(lastCapture);
				}

				preLoad.src = e.target.result

			}*/


			reader.onloadend = function(e)
			{
				lastCapture = e.target.result;

			    showCapture(lastCapture);
			}


			reader.readAsDataURL(capture);
		}

	}, false);


	function showCapture(source) {
		$("#previewImg").attr('src', source).css({
			'display': 'inline-block',
			'width': '50%'
		});
	}

});
