(function($, undefined) {
    var location = window.location,
        history = window.history,
        checkUrlInterval = 50,
        hashStrip = /^#*/,
        document = window.document;


    var History = kendo.Observable.extend({

        start: function(options) {
            options = options || {};

            var that = this,
                wantsPushState = !!options["pushState"],
                checkUrlProxy = $.proxy(that.checkUrl, that),
                atRoot = location.pathname === that.root;

            that._pushState = wantsPushState && that.pushStateSupported();
            that.fragment = "";
            that.root = options["root"] || "/";


            if (wantsPushState && !that.pushStateSupported() && !atRoot) {
                location.replace(that.root + '#' + that.stripRoot(location.pathname));
                return true;
            } else if (that._pushState && atRoot && location.hash) {
                history.replaceState({}, document.title, that.makePushStateUrl(location.hash.replace(hashStrip, '')));
            }

            if (that._pushState) {
                $(window).bind("popstate", checkUrlProxy);
            } else if ("onhashchange" in window) {
                $(window).bind("hashchange", checkUrlProxy);
            } else {
                setInterval(checkUrlProxy, checkUrlInterval);
            }

            that.checkUrl();
        },

        checkUrl: function() {
            var that = this, current = that.currentLocation();

            if (current != that.fragment) {
               that.navigate(current);
            }
        },

        stripRoot: function(url) {
            var that = this;

            if (url.indexOf(that.root) === 0) {
                return ('/' + url.substr(that.root.length)).replace(/\/\//g, '/');
            } else {
                return url;
            }
        },

        currentLocation: function() {
            var fragment, that = this;

            if (that._pushState) {
                fragment = location.pathname;

                if (location.search) {
                    fragment += location.search;
                }

                return that.stripRoot(fragment);
            } else {
                return location.hash.replace(hashStrip, '') || '/';
            }
        },

        pushStateSupported: function() {
            return window.history && window.history.pushState;
        },

        change: function(callback) {
            this.bind('change', callback);
        },

        makePushStateUrl: function(address) {
            var that = this;

            if (address.indexOf(that.root) != 0) {
                address = (that.root + address).replace(/\/\//g, '/');
            }

            return location.protocol + '//' + location.host + address;
        },

        navigate: function(to) {
            var that = this;

            if (that.fragment === to || that.fragment === decodeURIComponent(to)) {
                return;
            }

            if (that._pushState) {
                history.pushState({}, document.title, that.makePushStateUrl(to));
                that.fragment = to;
            } else {
                that.fragment = location.hash = to;
            }

            that.trigger("change", { location: that.fragment });
        }
    });

    kendo.history = new History();
})(jQuery);
