kendo_module({
    id: "mobile.actionsheet",
    name: "ActionSheet",
    category: "mobile",
    description: "The mobile ActionSheet widget displays a set of choices related to a task the user initiates.",
    depends: [ "mobile.popover", "mobile.shim" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Popup = ui.Popup,
        Widget = ui.Widget,
        OPEN = "open",
        CLOSE = "close",
        COMMAND = "command",
        BUTTONS = "li>a",
        CONTEXT_DATA = "actionsheetContext",
        WRAP = '<div class="km-actionsheet-wrapper" />',
        cancelTemplate = kendo.template('<li class="km-actionsheet-cancel"><a href="\\#">#:cancel#</a></li>');

    var ActionSheet = Widget.extend({
        init: function(element, options) {
            var that = this,
                os = support.mobileOS,
                ShimClass = os && os.tablet ? Popup : Shim;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            if (options.cancelTemplate) {
                cancelTemplate = kendo.template(options.cancelTemplate);
            }

            element
                .addClass("km-actionsheet")
                .append(cancelTemplate({cancel: that.options.cancel}))
                .wrap(WRAP)
                .on("up", BUTTONS, "_click")
                .on("click", BUTTONS, kendo.preventDefault);

            that.wrapper = element.parent();
            that.shim = new ShimClass(that.wrapper, $.extend({modal: os.ios && os.majorVersion < 7}, that.options.popup) );

            kendo.notify(that, ui);

            kendo.onResize($.proxy(this, "_resize"));
        },

        events: [
            OPEN,
            CLOSE,
            COMMAND
        ],

        options: {
            name: "ActionSheet",
            cancel: "Cancel",
            popup: { height: "auto" }
        },

        open: function(target, context) {
            var that = this;
            that.target = $(target);
            that.context = context;
            that.shim.show(target);
        },

        close: function() {
            this.context = this.target = null;
            this.shim.hide();
        },

        openFor: function(target) {
            var that = this,
                context = target.data(CONTEXT_DATA);

            that.open(target, context);
            that.trigger(OPEN, { target: target, context: context });
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.shim.destroy();
        },

        _click: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            var currentTarget = $(e.currentTarget);
            var action = currentTarget.data("action");

            if (action) {
                kendo.getter(action)(window)({
                    target: this.target,
                    context: this.context
                });
            }

            this.trigger(COMMAND, { target: this.target, context: this.context, currentTarget: currentTarget });

            e.preventDefault();
            this.close();
            this.trigger(CLOSE);
        },

        _resize: function() {
            if (support.mobileOS.tablet) {
                this.shim.hide();
            } else { // phone
                if (this.element.is(":visible")) {
                    var positionedElement = this.wrapper.parent(),
                        viewPort = positionedElement.parent();

                    positionedElement.css({
                        top: (viewPort.height() - positionedElement.height()) + "px",
                        width: viewPort.width() + "px"
                    });
                }
            }
        }
    });

    ui.plugin(ActionSheet);
})(window.kendo.jQuery);
