var data= "IP DEL SERVIDOR"
var qr = qrcode(4, 'M');
qr.addData(data);
qr.make();
var cellsize= 10; //TAMAÑO DE CELDA
document.getElementById('token').innerHTML = qr.createImgTag(cellsize,0);
