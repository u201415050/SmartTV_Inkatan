//CREATE TOKEN TO DOWNLOAD MOBILE APP
$(document).ready(function () {
    var data = "link to download";
    var qr = qrcode(4, "M");
    qr.addData(data);
    qr.make();
    var wd = $(window).height();
    document.getElementById("token").innerHTML = qr.createImgTag(parseInt((wd / 110).toString()), 0);
});
