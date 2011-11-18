(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        DataSource = kendo.data.DataSource,
        MobileWidget = ui.MobileWidget,
        ITEM_SELECTOR = ".km-list > li",
        proxy = $.proxy,
        GROUP_TEMPLATE = kendo.template("<li>#= this.headerTemplate(data) #<ul>#= kendo.render(this.template, data.items)#</ul></li>"),
        FUNCTION = "function",
        CLICK = "click";

    function toggleItemActiveClass(e) {
        if ($(e.target).is("a")) {
            $(e.currentTarget).toggleClass("km-state-active", e.type === support.mousedown);
        }
    }

    function enhanceLinkItem(i, item) {
        item = $(item);

        if (!item.parent().contents().not(item)[0]) {
            item.addClass("km-listview-link")
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
                .delegate(ITEM_SELECTOR, support.mousedown + " " + support.mouseup, toggleItemActiveClass)
                .delegate(ITEM_SELECTOR, support.mouseup, proxy(that._click, that))
                .find("a:only-child").each(enhanceLinkItem);

            if (grouped) {
                that.element
                    .children()
                    .children("ul")
                    .addClass("km-list");
            }

            if (options.dataSource) {
                that.dataSource = DataSource.create(options.dataSource).bind("change", $.proxy(that.refresh, that));
                that._template();
                that.dataSource.fetch();
            } else {
                that._style();
            }

            that.bind([CLICK], options);
        },

        options: {
            name: "MobileListView",
            selector: "[data-kendo-role=listview]",
            type: "flat",
            template: "${data}",
            headerTemplate: "${value}",
            style: ""
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

            kendo.mobile.enhance(that.element);

            that._style();
        },

        _template: function() {
            var that = this,
                template = that.options.template,
                headerTemplate = that.options.headerTemplate,
                model = that.dataSource.options.schema.model,
                modelID = model && model.id,
                dataIDAttribute = "",
                templateProxy = {},
                groupTemplateProxy = {};

            if (typeof modelID === "string") {
                dataIDAttribute = ' data-id="${' + modelID + '}"';
            } else if (typeof modelID === FUNCTION) {
                templateProxy.modelID = modelID;
                dataIDAttribute = ' data-id="${this.modelID(data)}"';
            }

            if (typeof template === FUNCTION) {
                templateProxy.template = template;
                template = "#=this.template(data)#";
            }

            groupTemplateProxy.template = that.template = $.proxy(kendo.template("<li" + dataIDAttribute + ">" + template + "</li>"), templateProxy);

            if (typeof headerTemplate === FUNCTION) {
                groupTemplateProxy._headerTemplate = headerTemplate;
                headerTemplate = "#=this._headerTemplate(data)#";
            }

            groupTemplateProxy.headerTemplate = kendo.template(headerTemplate);

            that.groupTemplate = $.proxy(GROUP_TEMPLATE, groupTemplateProxy);
        },

        _click: function(e) {
            var that = this,
                dataItem,
                item = $(e.currentTarget),
                target = $(e.target),
                buttonName = target.closest("[data-kendo-name]", item).data("kendoName"),
                id = item.data("id");

            if (id) {
                dataItem = that.dataSource.get(id).data;
            }

            if (that.trigger(CLICK, {target: target, item: item, dataItem: dataItem, buttonName: buttonName})) {
                e.preventDefault();
            }
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
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
