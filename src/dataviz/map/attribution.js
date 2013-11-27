kendo_module({
    id: "dataviz.attribution",
    name: "Attribution",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    advanced: true
});

(function() {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        template = kendo.template,

        dataviz = kendo.dataviz,
        valueOrDefault = dataviz.util.valueOrDefault;

    var Attribution = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);
            this.items = [];
            this.element.addClass("k-widget k-attribution");
        },

        options: {
            name: "Attribution",
            separator: "&nbsp;|&nbsp;",
            itemTemplate: "#= text #"
        },

        filter: function(extent, zoom) {
            this._extent = extent;
            this._zoom = zoom;
            this._render();
        },

        add: function(item) {
            if (item) {
                if (typeof item === "string") {
                    item = { text: item };
                }

                this.items.push(item);
                this._render();
            }
        },

        remove: function(text) {
            var result = [];
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (item.text !== text) {
                    result.push(item);
                }
            }

            this.items = result;

            this._render();
        },

        clear: function() {
            this.items = [];
            this.element.empty();
        },

        _render: function() {
            var result = [];
            this.element.empty();
            var itemTemplate = template(this.options.itemTemplate);

            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                var text = this._itemText(item);
                if (text !== "") {
                    result.push(itemTemplate({
                        text: text
                    }));
                }
            }

            this.element.append(result.join(this.options.separator));
        },

        _itemText: function(item) {
            var text = "";
            var inZoomLevel = this._inZoomLevel(item.minZoom, item.maxZoom);
            var inArea = this._inArea(item.extent);

            if (inZoomLevel && inArea) {
                text += item.text;
            }

            return text;
        },

        _inZoomLevel: function(min, max) {
            var result = true;
            min = valueOrDefault(min, -Number.MAX_VALUE);
            max = valueOrDefault(max, Number.MAX_VALUE);

            result = this._zoom > min && this._zoom < max;

            return result;
        },

        _inArea: function(area) {
            var result = true;

            if (area) {
                result = area.contains(this._extent);
            }

            return result;
        }
    });

    kendo.dataviz.ui.plugin(Attribution);
})(jQuery);
