(function($, window, undefined) {
    var data = {
        dataSource: function(options) {
            options = $.extend(true, {}, options, {
                transport: createTransport(options.dialect, options.cache, options.jsoncallback),
                reader: options.reader
            });
            return new kendo.data.DataSource(options);
        }
    };

    var createTransport = function(dialect, cache, jsoncallback) {
        var read = $.extend({},
            !$.support.cors ? { jsonpCallback: jsoncallback || "jsonFlickrApi", jsonp: false, dataType: "jsonp" } : { dataType: "json" },
            { url: flickr.service, cache: true }
        );
        return {
            read: read,
            cache: cache !== undefined ? cache : "inmemory",
            dialect: dialect
        };
    }
    window.data = data;
})(jQuery, window);
