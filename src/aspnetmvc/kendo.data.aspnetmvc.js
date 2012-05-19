(function ($, undefined) {
   var kendo = window.kendo;

   function parameterMap(options) {
       var result = {};

       if (options.sort) {
           result[this.options.prefix + "orderBy"] = $.map(options.sort, function(sort) {
               return sort.field + "-" + sort.dir;
           }).join("~");
       }

       if (options.page) {
           result[this.options.prefix + "page"] = options.page;
       }

       if (options.group) {
            result[this.options.prefix + "groupBy"] = $.map(options.group, function(group) {
               return group.field + "-" + group.dir;
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
