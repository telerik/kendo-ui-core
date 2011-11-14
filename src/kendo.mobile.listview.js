(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        DataSource = kendo.data.DataSource,
        MobileWidget = ui.MobileWidget;


    function toggleItemActiveClass(e) {
        if ($(e.target).is("a")) {
            $(e.currentTarget).toggleClass("km-state-active", e.type === support.mousedown);
        }
    }

    function enhanceLinkItem() {
        var that = $(this);

        if (!that.parent().contents().not(that)[0]) {
            that.addClass("km-listview-link")
                .attr("data-kendo-role", "listview-link");
        }
    }

    var MobileListView = MobileWidget.extend({
        init: function(element, options) {
            var that = this,
                grouped,
                inset;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;
            grouped = options.type === "group";
            inset = options.style === "inset";

            that.element.addClass("km-listview")
                .toggleClass("km-list", !grouped)
                .toggleClass("km-listinset", !grouped && inset)
                .toggleClass("km-listgroup", grouped && !inset)
                .toggleClass("km-listgroupinset", grouped && inset)
                .delegate("li", support.mousedown + " " + support.mouseup, toggleItemActiveClass)
                .find("a:only-child").each(enhanceLinkItem);

            if (grouped) {
                that.element
                    .children()
                    .children("ul")
                    .addClass("km-list");
            }

            if (options.dataSource) {
                that._template();
                that.dataSource = DataSource.create(options.dataSource).bind("change", $.proxy(that.refresh, that));
                that.dataSource.fetch();
            } else {
                that._style();
            }
        },

        _template: function() {
            var that = this,
                groupTemplateProxy,
                template = that.options.template,
                headerTemplate = that.options.headerTemplate;

            if (typeof template === "function") {
                that.template = $.proxy(kendo.template("<li>#=this.tmpl(data)#</li>"), { tmpl: template });
            } else {
                that.template = kendo.template("<li>" + template + "</li>");
            }

            groupTemplateProxy = { template: that.template }

            if (typeof headerTemplate === "function") {
                groupTemplateProxy.headerTemplate = kendo.template("#=this._headerTemplate(data)#");
                groupTemplateProxy._headerTemplate = headerTemplate;
            } else {
                groupTemplateProxy.headerTemplate = kendo.template(headerTemplate);
            }

            that.groupTemplate = $.proxy(kendo.template("<li>#= this.headerTemplate(data) #<ul>#= kendo.render(this.template, data.items)#</ul></li>"), groupTemplateProxy);
        },

        refresh: function() {
            var that = this,
                dataSource = that.dataSource,
                grouped,
                view = dataSource.view();

            if (dataSource.group()[0]) {
                that.options.type = "group";
                that.element.html(kendo.render(that.groupTemplate, view));
            } else {
                that.element.html(kendo.render(that.template, view));
            }

            that._style();
        },

        _style: function() {
            var that = this,
                options = that.options,
                grouped = options.type === "group",
                inset = options.style === "inset";

            that.element.addClass("km-listview")
                .toggleClass("km-list", !grouped)
                .toggleClass("km-listinset", !grouped && inset)
                .toggleClass("km-listgroup", grouped && !inset)
                .toggleClass("km-listgroupinset", grouped && inset)
                .delegate("li", support.mousedown + " " + support.mouseup, toggleItemActiveClass)
                .find("a:only-child").each(enhanceLinkItem);

            if (grouped) {
                that.element
                    .children()
                    .children("ul")
                    .addClass("km-list");
            }
        },

        options: {
            name: "MobileListView",
            selector: "[data-kendo-role=listview]",
            type: "flat",
            template: "${data}",
            headerTemplate: "${value}",
            style: ""
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
