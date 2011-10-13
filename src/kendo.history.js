(function($, undefined) {
    var location = window.location,
        history = window.history,
        pushStateSupported = window.history && window.history.pushState,
        document = window.document;


    kendo.History = {
        start: function(options) {
            this._pushState = !!options["pushState"] && pushStateSupported;
            this.fragment = "";
        },

        navigate: function(to) {
            if (this.fragment === to || this.fragment === decodeURIComponent(to)) {
                return;
            }

            if (this._pushState) {
                history.pushState({}, document.title, location.protocol + '//' + location.host + to);
                this.fragment = to;
            } else {
                this.fragment = location.hash = to;
            }
        }
    }
})(jQuery);
