(function($, undefined) {
    var loc = window.location,
        hist = window.history,
        doc = document;


    kendo.History = {
        start: function(options) {
            this._doPushState = !!options["pushState"];
        },

        navigate: function(location) {
            if (this._doPushState) {
                hist.pushState({}, doc.title, loc.protocol + '//' + loc.host + location);
            } else {
                loc.hash = location;
            }
        }
    }
})(jQuery);
