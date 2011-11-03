(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        MobileWidget = ui.MobileWidget;

    var MobileListView = MobileWidget.extend({
        init: function(element, options) {
            var that = this,
                grouped,
                inset;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;
            grouped = options.type === "group";
            inset = options.style === "inset";

            that.element.addClass("k-listview")
                .toggleClass("k-list", !grouped)
                .toggleClass("k-listinset", !grouped && inset)
                .toggleClass("k-listgroup", grouped && !inset)
                .toggleClass("k-listgroupinset", grouped && inset);

            if (grouped) {
                that.element
                    .children()
                    .children("ul")
                    .addClass("k-list");
            }

            if (options.dataSource) {
                that._template();
                that.dataSource = DataSource.create(options.dataSource).bind("change", $.proxy(that.refresh, that));
                that.dataSource.query();
            }
        },

        _template: function() {
            var that = this,
                template = that.options.template;

            if (typeof template === "function") {
                that.template = $.proxy(kendo.template("<li>#=this.tmpl(data)#</li>"), { tmpl: template });
            } else {
                that.template = kendo.template("<li>" + template + "</li>");
            }
        },

        refresh: function() {
            var that = this,
                view = that.dataSource.view();

            that.element.html(kendo.render(that.template, view));
        },

        options: {
            name: "MobileListView",
            type: "flat",
            template: "${data}",
            style: ""
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
