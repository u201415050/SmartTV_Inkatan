var ImageDelivery = /** @class */ (function () {
    function ImageDelivery() {
    }
    ImageDelivery.prototype.ConvertImage = function (data) {
        var myElement = document.getElementById("image");
        myElement.src = data;
    };
    return ImageDelivery;
}());
