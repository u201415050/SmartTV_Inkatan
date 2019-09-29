//CREATE TOKEN TO DOWNLOAD MOBILE APP
$(document).ready(function() {
  let data: string = "link to download";
  var qr = qrcode(4, "M");
  qr.addData(data);
  qr.make();
  let wd: number = $(window).height();
  document.getElementById("token").innerHTML = qr.createImgTag(
    parseInt((wd / 110).toString()),
    0
  );
});
