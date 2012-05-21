(function ($, undefined) {
   var kendo = window.kendo,
       escapeQuoteRegExp = /'/ig;

   function parameterMap(options) {
       var result = {};

       result[this.options.prefix + "orderBy"] = $.map(options.sort || [], function(sort) {
           return sort.field + "-" + sort.dir;
       }).join("~");

       if (options.page) {
           result[this.options.prefix + "page"] = options.page;
       }

       if (options.pageSize) {
           result[this.options.prefix + "pageSize"] = options.pageSize;
       }

       if (options.group) {
            result[this.options.prefix + "groupBy"] = $.map(options.group, function(group) {
               return group.field + "-" + group.dir;
           }).join("~");
       }

       if (options.filter) {
           result[this.options.prefix + "filter"] = serializeFilter(options.filter);
       } else {
           result[this.options.prefix + "filter"] = "";
       }

       return result;
   }


   function serializeFilter(filter) {
       if (filter.filters) {
           return  $.map(filter.filters, function(f) {
               return serializeFilter(f);
           }).join("~" + filter.logic + "~");
       }
       return filter.field + "~" + filter.operator + "~" + encodeFilterValue(filter.value);
   }

   function encodeFilterValue(value) {
       if (typeof value === "string") {
           return "'" + value.replace(escapeQuoteRegExp, "''") + "'";
       }
       if (value && value.getTime) {
           return "datetime'" + kendo.format("{0:yyyy-MM-ddTHH-mm-ss}", value) + "'";
       }
       return value;
   }

   kendo.data.transports["aspnetmvc-ajax"] = {
        read: {
            type: "POST"
        },
        parameterMap: parameterMap,
        prefix: ""
   };

function translateGroup(group) {
    return {
        value: group.Key,
        field: group.Member,
        hasSubgroups: group.HasSubgroups,
        aggregates: group.Aggregates,
        items: group.HasSubgroups ? $.map(group.Items, translateGroup) : group.Items
    };
}
   kendo.data.schemas["aspnetmvc-ajax"] = {
        groups: function(data) {
            return $.map(this.data(data), translateGroup);
        }
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
