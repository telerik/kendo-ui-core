(function($, window) {
    var kendo = window.kendo;

    function List(element, options) {
        var that = this;
        that.element = element;
        that.wrapper = $(element);
        that.options = $.extend({}, that.defaults, options);
        that.dataBind(that.options.data);
    }

    List.prototype = {
        defaults: {
            data: [],
            template: ""
        },
        dataBind: function(data) {
            var that = this,
                idx,
                length,
                html = "",
                template = kendo.template(that.options.template);

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += template(data[idx]);
            }

            // using jQuery.fn.html instead of innerHTML because IE can't set innerHTML of TABLE elements
            that.wrapper.html(html);
        }
    }

    $.fn.kendoList = function(options) {
        $(this).each(function() {
            $(this).data("kendoList", new List(this, options));
        });

        return this;
    }

    kendo.ui.List = List;

})(jQuery, window);
