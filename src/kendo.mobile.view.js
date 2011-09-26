(function ($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        mobile = kendo.mobile,
        os = kendo.support.mobileOS,
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

            if (!that.content.length)
                that.content = $("<div class='k-content'/>").appendTo(element);

            that.scroller = that.content.kendoScroller({ showArrows: false }).data("kendoScroller");
            that.container = that.scroller.scrollElement || that.content;

            if (options.formInit) {
                mobile.initForm(that.element, options.previousView);
            }

            $(document).trigger("viewinit", { view: that, mobileOS: os });
        },

        options: {
            formInit: true,
            animation: {
                effects: "slide:left",
                duration: 250,
                divisor: 2
            }
        },

        bind: function(data) {
            this.onBind(data);
        },

        show: function(container) {
            $(document).trigger("viewshow", { view: this, mobileOS: os });

            if (this.element[0].parentNode !== container)
                this.element.appendTo(container);
        },

        hide: function() {
            $(document).trigger("viewhide", { view: this, mobileOS: os });

            this.element.hide();
        }
    });

    kendo.ui.plugin("View", View, Component);

})(jQuery);
