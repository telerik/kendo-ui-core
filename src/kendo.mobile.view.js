(function ($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        mobile = kendo.mobile,
        os = kendo.support.mobileOS,
        touch = kendo.support.touch,
        Widget = ui.Widget;

    var View = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            element = that.element;

            that.header = element.children(".k-header");
            that.content = element.children(".k-content");
            that.footer = element.children(".k-footer");

            if (!that.content.length)
                that.content = $("<div class='k-content'/>").appendTo(element);

            that.container = that.content;

            if (options.scroller) {
                that.scroller = that.content.kendoScroller({ showArrows: false }).data("kendoScroller");
                that.container = that.scroller.scrollElement || that.content;
            }

            if (options.formInit) {
                mobile.initForm(that.element, options.previousView);
            }

            $(document).trigger("viewinit", { view: that, mobileOS: os });
        },

        options: {
            title: "",
            formInit: true,
            scroller: true,
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
            var that = this,
                toolbar = $(that.element).find(".k-header>.k-toolbar");

            $(document).trigger("viewshow", { view: that, mobileOS: os });

            if (that.options.title && !toolbar.children(".k-view-title").length)
                toolbar.prepend("<div class='k-view-title'>"+ that.options.title +"</div>");

            if (that.element[0].parentNode !== container)
                that.element.appendTo(container);
        },

        hide: function() {
            $(document).trigger("viewhide", { view: this, mobileOS: os });

            this.element.hide();
        }
    });

    kendo.ui.plugin("View", View, Widget);

})(jQuery);
