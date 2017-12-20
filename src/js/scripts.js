(function ($) {

    // *** GLOBAL VARIABLES *** //
    var doc = $(document),
        body = $('body');

    var customJS;

    // *** BODY of js code *** //
    customJS = function () {

        // homepage slider wrapper size
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

        // homepage slider init
        var mySwiper = new Swiper('.swiper-container', {
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true
            },
            zoom: {
                containerClass: 'inner-photo',
                maxRatio: 2.5
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

        // mobile menu
        body.on('click', '.menu-caller', function () {
            body.toggleClass('mobile-menu');
        });

    }; // end customJS

    customJS();

})(jQuery);
