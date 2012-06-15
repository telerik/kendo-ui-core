(function($, undefined) {

    // Removing the G flag will cause infinite loop.
    var GradientRegExp = /(?:-\w+?-)?(?:linear|webkit)-gradient\s*?\((?:linear)?[\s,]*?(.+?,)([^#\(]+?,)?\s*((?:(?:(?:rgba?|color-stop)\(.+?\)|#[\d\w]+)[\s\d\w%]*?[,\s]*)+)\)/ig,
        DetailRegExp = /((?:rgba?|color-stop)\([^\)]+?\)|#[\d\w]+)\s*([\d\.\w%]*)/ig,
        StripRegExp = / |,/g;

    window.Gradient = kendo.Observable.extend({
        init: function(cssValue) {
            this.value = this.parseGradient(cssValue);
        },

        parseGradient: function (cssValue) {
            var output = [], counter = -1, matches, details, i, lastPosition;

            while((matches = GradientRegExp.exec(cssValue)) !== null) {
                output[++counter] = {};

                output[counter].start = matches[1].replace(StripRegExp, "");
                output[counter].stops = [];

                if (matches[2]) {
                    output[counter].end = matches[2].replace(StripRegExp, "");
                }

                i = 0;

                while((details = DetailRegExp.exec(matches[3])) !== null) {
                    output[counter].stops[i++] = {
                        color: new Color(details[1]),
                        position: details[2] || 0
                    };

                    lastPosition = details[2];
                }

                if (output[counter].stops[i-1].position === 0 && lastPosition == "") {
                    output[counter].stops[i-1].position = "100%";
                }
            }

            return output;
        },

        get: function () {

        }
    });

    var test = new Gradient("-webkit-linear-gradient(left, right, #0b47a2, #04b7a2 5%, #0b4a72 98%, #20b47a), -webkit-linear-gradient(top, #0b47a2, #04b7a2 5%, #0b4a72 98%, #20b47a), linear-gradient(top, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0)) #0b47a2;");
    console.log(test.value);

})(jQuery);
