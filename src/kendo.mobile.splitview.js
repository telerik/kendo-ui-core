(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        View = ui.View;

    var SplitView = View.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            $.extend(that, options);
            that._layout();
            that._style();
            kendo.mobile.init(element.children(kendo.roleSelector("modalview")));

            that.panes = [];
            that.element.children(kendo.roleSelector("pane")).each(function() {
                that.panes.push(kendo.initWidget(this, {}, ui.roles));
            });
        },

        options: {
            name: "SplitView",
            style: "horizontal"
        },

        // Implement view interface
        _layout: function() {
            var that = this,
                element = that.element;

            element.data("kendoView", that).addClass("km-view km-splitview");

            that.transition = kendo.attrValue(element, "transition");
            $.extend(that, { header: [], footer: [], content: element });
        },

        _style: function () {
            var style = this.options.style,
                element = this.element,
                styles;

            if (style) {
                styles = style.split(" ");
                $.each(styles, function () {
                    element.addClass("km-split-" + this);
                });
            }
        },

        showStart: function() {
            var that = this;
            that.element.css("display", "");

            if (!that.inited) {
                that.inited = true;
                $.each(that.panes, function() {
                    this.navigate("");
                });
                that.trigger("init", {view: that});
            }

            that.trigger("show", {view: that});
        }
    });

    ui.plugin(SplitView);
})(window.kendo.jQuery);
