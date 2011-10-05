(function($, window, undefined) {
    var data = {
        dataSource: function(options) {
            options = $.extend(true, {}, options, {
                transport: createTransport(options.parameterMap, options.cache, options.jsoncallback),
                schema: options.schema
            });
            return new kendo.data.DataSource(options);
        }
    };

    var createTransport = function(parameterMap, cache, jsoncallback) {
        var read = $.extend({},
            !$.support.cors ? { jsonpCallback: jsoncallback || "jsonFlickrApi", jsonp: false, dataType: "jsonp" } : { dataType: "json" },
            { url: flickr.service, cache: true }
        );
        return {
            read: read,
            cache: cache !== undefined ? cache : "inmemory",
            parameterMap: parameterMap
        };
    }
    window.data = data;
})(jQuery, window);
