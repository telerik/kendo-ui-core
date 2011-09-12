(function ($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        touch = kendo.support.touch,
        Component = ui.Component;

    var View = Component.extend({
        init: function (element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;
            element = that.element;

            that.header = element.children(".k-header");
            that.content = element.children(".k-content");
            that.footer = element.children(".k-footer");

            if (options.hasHeader && !that.header.length)
                that.header = $("<div class='k-header'/>").prependTo(element);

            if (!that.content.length)
                that.content = $("<div class='k-content'/>").appendTo(element);

            if (options.hasFooter && !that.footer.length)
                that.footer = $("<div class='k-footer'/>").appendTo(element);

            that.scroller = that.content.kendoScroller().data("kendoScroller");
            that.container = that.scroller.scrollElement || that.content;

            if (this.onCreate) {
                this.onCreate();
            }
        },

        options: {
            hasHeader: true,
            hasFooter: true
        },

        bind: function(data) {
            this.onBind(data);
        },

        show: function(container) {
            if (this.onShow) {
                this.onShow();
            }

            this.element.appendTo(container);
        },

        hide: function() {
            this.element.remove();
        }
    });

    kendo.ui.plugin("View", View, Component);

})(jQuery);
