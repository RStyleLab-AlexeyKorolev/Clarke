(function ($) {

    // *** GLOBAL VARIABLES *** //
    var doc = $(document),
        body = $('body');

    var customJS;

    // *** BODY of js code *** //
    customJS = function () {

        body.on('click', '.test', function () {
            console.log('start');
        });

    }; // end customJS

    customJS();

})(jQuery);
