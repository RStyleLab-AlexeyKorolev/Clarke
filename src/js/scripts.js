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
            loop: true,
            simulateTouch: false,
            zoom: {
                containerClass: 'inner-photo',
                maxRatio: 2,
                toggle: false
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

        // homepage image zoom
        body.on('click', '.hp-slider .loupe', function (e) {
            if (!$(this).closest('.hp-slider').hasClass('pic-zoom')) {
                mySwiper.zoom.in();
                $('.hp-slider').addClass('pic-zoom');
                e.stopPropagation();
            }
        });

        body.on('click', '.hp-slider', function () {
            if ($(this).hasClass('pic-zoom')) {
                mySwiper.zoom.out();
                $('.hp-slider').removeClass('pic-zoom');
            }
        });

        // mobile menu
        body.on('click', '.menu-caller', function () {
            body.toggleClass('mobile-menu');
        });

    }; // end customJS

    customJS();

})(jQuery);
