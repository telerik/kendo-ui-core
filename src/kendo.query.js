(function($, window) {
    var kendo = window.kendo = window.kendo || {};

    function Query(data) {
        this.data = data;
    }

    Query.prototype = {
        toArray: function () {
            return this.data;
        },
        skip: function (count) {
            return new Query(this.data.slice(count));
        },
        take: function (count) {
            return new Query(this.data.slice(0, count));
        },
        orderBy: function (selector) {
            var result = this.data.slice(0);

            return new Query(result.sort(function (a, b) {
                a = selector(a);
                b = selector(b);

                return a > b ? 1 : (a < b ? -1 : 0);
            }));
        },
        orderByDescending: function (selector) {
            var result = this.data.slice(0);

            return new Query(result.sort(function (a, b) {
                a = selector(a);
                b = selector(b);

                return a < b ? 1 : (a > b ? -1 : 0);
            }));
        }
    }

    kendo.data = kendo.data || {};
    kendo.data.Query = Query;
})(jQuery, window);
