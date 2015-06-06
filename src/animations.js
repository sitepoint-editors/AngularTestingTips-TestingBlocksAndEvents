angular.module('animationsApp', ['ngAnimate']).animation('.view-slide-in', function () {
    return {
        enter: function (element, done) {
            element.css({
                opacity: 0.5,
                position: "relative",
                top: "10px",
                left: "20px"
            })
                .animate({
                    top: 0,
                    left: 0,
                    opacity: 1
                }, 500, done);
        },
        leave: function (element, done) {
            element.animate({
                opacity: 0.5,
                top: "10px",
                left: "20px"
            }, 100, done);
        }
    };
});