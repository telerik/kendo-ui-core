(function ($, undefined) {
   var kendo = window.kendo;

   function parameterMap(options) {
       var result = {};

       if (options.sort) {
            result[this.options.prefix + "orderBy"] = $.map(options.sort, function(sort) {
               return sort.field + "-" + sort.dir;
            }).join("~");
       }

       return result;
   }

   kendo.data.transports["aspnetmvc-ajax"] = {
        read: {
            type: "POST"
        },
        parameterMap: parameterMap,
        prefix: ""
   };

   kendo.data.transports["aspnetmvc-server"] = kendo.data.RemoteTransport.extend({
        init: function(options) {
            kendo.data.RemoteTransport.fn.init.call(this, $.extend(options, { parameterMap: $.proxy(parameterMap, this) } ));
            this.options.prefix = "Grid-";
        },
        read: function(options) {
            var url;
            options = this.setup(options, "read");
            url = options.url;

            url = url + "?" + $.map(options.data, function(value, key) {
                return key + "=" + value;
            }).join("&");

            location.href = url;
        }
   });
})(jQuery);
