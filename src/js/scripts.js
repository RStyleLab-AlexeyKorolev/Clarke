(function ($) {

    // *** GLOBAL VARIABLES *** //
    var doc = $(document),
        body = $('body');

    var customJS;

    // *** BODY of js code *** //
    customJS = function () {

        // animation on load
        $(window).on('load', function() {
            $('body').removeClass('preload');
        });

        // homepage slider wrapper size
        function sliderWidth() {
            var windowWidth = $(window).width(),
                offset = $('.wrapper').offset().left,
                pageOffset = $('.main-wrapper').offset().left;

            $('.hp-slider .grey-bg, .hp-slider .photo-block').width(windowWidth - offset - pageOffset);
            $('.director-block').width(windowWidth - offset);
        }

        sliderWidth();

        $(window).on('resize', function () {
            sliderWidth();
        });

        // homepage slider init
        if ($('.swiper-container').length) {
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'fade',
                speed: 1000,
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

            mySwiper.on('slideChangeTransitionStart', function () {
                $('.hp-slider .swiper-container').addClass('animation');
            }).on('slideChangeTransitionEnd', function () {
                $('.hp-slider .swiper-container').removeClass('animation');
            });
        }

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
            $(window).scrollTop(0);
        });

        //tabs
        $('.tabs').on('click', 'a', function (e) {
            var self = $(this),
                index = self.parent().index();

            $('.tabs a').removeClass('active');
            self.addClass('active');
            $('.tab-cont').removeClass('active').eq(index).addClass('active');
            e.preventDefault();
        });

        //filters
        $('.filters-block').on('click', '.filter:not(.filled) .filter-el', function (e) {
            var self = $(this),
                initVal = self.find('span').text();

            if (!self.parent().hasClass('active')) {
                $('.filter').removeClass('active');
                self.parent().addClass('active');
            } else {
                self.parent().removeClass('active');
            }
            self.find('span').attr('data-initial', initVal);
            e.stopPropagation();
        });

        $('.filter-dropdown').on('click', 'li', function () {
            var self = $(this),
                val = self.text();

            self.closest('.filter').addClass('filled').find('.filter-el span').text(val);
        });

        $('.filters-block').on('click', '.filter.filled .filter-el i', function () {
            var self = $(this),
                initVal = self.siblings('span').attr('data-initial');

            self.closest('.filter').removeClass('filled').find('.filter-el span').text(initVal);
        });

        body.on('click', function () {
            $('.filter').removeClass('active');
        });

        //inputs
        $('.form-group input, .form-group textarea').on('focus', function () {
            var field = $(this).closest('.form-group');
            field.addClass('filled');
        }).on('blur', function() {
            var field = $(this).closest('.form-group');
            if ($(this).val() === '') {
                field.removeClass('filled');
            }
        });

        //phone validation mask
        $.validator.addMethod('phoneMask', function(phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
        }, 'Please specify a valid phone number');

        //contact form validate
        if ($('#contactForm').length) {
            $('#contactForm').validate({
                errorElement: 'span',
                onfocusout: false,
                rules: {
                    phone: {
                        phoneMask: true
                    }
                }
            });
        }

    }; // end customJS

    customJS();

})(jQuery);
