$(document).ready(function () {
	//getParametersFromUrl()
	//console.log(SendMessages)
	//elementTest(1)
	
	//$('#token').append('Token: INK-' + ActualParameters.ipSelected);
	
	var data="link to download"
	var qr = qrcode(4, 'M');
  	qr.addData(data);
	  qr.make();
	 var wd=$(window).height();
  	document.getElementById('token').innerHTML = qr.createImgTag(parseInt(wd/110),0);
});