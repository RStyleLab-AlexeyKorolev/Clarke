(function ($) {

    // *** GLOBAL VARIABLES *** //
    var doc = $(document),
        body = $('body');

    var customJS;

    // *** BODY of js code *** //
    customJS = function () {

        function sliderWidth() {
            var windowWidth = $(window).width(),
                offset = $('.wrapper').offset().left,
                pageOffset = $('.main-wrapper').offset().left;

            $('.hp-slider .grey-bg, .hp-slider .photo-block').width(windowWidth - offset - pageOffset);
        }

        sliderWidth();

        $(window).on('resize', function () {
            sliderWidth();
        });

        var mySwiper = new Swiper('.swiper-container', {
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.hp-slider .count',
                type: 'fraction'
            },
            navigation: {
                nextEl: '.hp-slider-next',
                prevEl: '.hp-slider-prev'
            }
        });

        body.on('click', '.test', function () {
            console.log('start');
        });

    }; // end customJS

    customJS();

})(jQuery);
