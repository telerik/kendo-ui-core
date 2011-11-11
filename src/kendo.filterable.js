(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    function menu(options) {
        var template = '<div class="k-filter-menu k-group">\
                <div class="k-filter-help-text">#=messages.info#</div>\
                <select>\
                     <option>Is Equal To</option>\
                     <option>Is Not Equal To</option>\
                </select>\
                <input class="k-input k-autocomplete" type="text"/>';

        if (options.extra) {
            template +=
            '<select>\
               <option>And</option>\
               <option>Or</option>\
            </select>\
            <select>\
                 <option>Is Equal To</option>\
                 <option>Is Not Equal To</option>\
            </select>\
            <input class="k-input k-autocomplete" type="text"/>';
        }

        template += '<button class="k-button">#=messages.filter#</button><button class="k-button">#=messages.cancel#</button>\
                </div>';

        return $(kendo.template(template)(options));
    }

    var Filterable = Widget.extend({
        init: function(element, options) {
            var that = this, link;

            Widget.fn.init.call(that, element, options);

            link = that.element.addClass("k-filterable").find("k-grid-filter");

            if (!link[0]) {
                link = that.element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter");
            }

            that.menu = menu(that.options);

            that.popup = new ui.Popup(that.menu,{
                anchor: link,
                toggleTarget: link
            });

            that.menu.find("select")
                .kendoDropDownList();
        },

        options: {
            name: "Filterable",
            extra: true,
            messages: {
                info: "Show rows with value that:",
                filter: "Filter",
                cancel: "Cancel"
            }
        }
    });

    kendo.ui.plugin(Filterable);
})(jQuery)
