(function($, undefined) {

    // Removing the G flag will cause infinite loop.
    var GradientRegExp = /(?:-\w+?-)?(?:linear|webkit)-gradient\s*?\((?:linear\s*,\s*)?[\s,]*?(.+?,)([^#\(]+?,)?\s*((?:(?:(?:rgba?|color-stop)\(.+?\)|#[\d\w]+)[\s\d\w%]*?[,\s\)]*)+)\)/ig,
        DetailRegExp = /(rgba?\([^\)]+?\)|#[\d\w]+)\s*([\d\.\w%]*)|color-stop\(([\d.]*)[\s,]*(rgba?\([^\)]+?\)|#[\d\w]+)\s*\)/ig,
        StripRegExp = /^\s*|\s*$|,/g;

    window.Gradient = kendo.Observable.extend({
        init: function(cssValue) {
            this.value = this.parseGradient(cssValue);
        },

        parseGradient: function (cssValue) {
            var output = [], counter = -1, matches, details, i, lastPosition, color, position, isStandard;

            while((matches = GradientRegExp.exec(cssValue)) !== null) {
                output[++counter] = {};

                output[counter].start = matches[1].replace(StripRegExp, "");
                output[counter].stops = [];

                if (matches[2]) {
                    output[counter].end = matches[2].replace(StripRegExp, "");
                }

                i = 0;

                while((details = DetailRegExp.exec(matches[3])) !== null) {
                    color = details[1] || details[4];
                    isStandard = typeof details[2] != "undefined";
                    position = isStandard ? details[2] || 0 : details[3] * 100 || 0;
                    lastPosition = isStandard ? details[2] : details[3] * 100;

                    output[counter].stops[i++] = {
                        color: new Color(color),
                        position: position
                    };
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

})(jQuery);
