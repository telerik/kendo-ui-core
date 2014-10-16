(function(f, define){
    define([ "./kendo.mobile.popover", "./kendo.mobile.shim" ], f);
})(function(){

var __meta__ = {
    id: "mobile.actionsheet",
    name: "ActionSheet",
    category: "mobile",
    description: "The mobile ActionSheet widget displays a set of choices related to a task the user initiates.",
    depends: [ "mobile.popover", "mobile.shim" ]
};

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
                ShimClass,
                tablet,
                type,
                os = support.mobileOS;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            type = options.type;
            element = that.element;

            if (type === "auto") {
                tablet = os && os.tablet;
            } else {
                tablet = type === "tablet";
            }

            ShimClass = tablet ? Popup : Shim;

            if (options.cancelTemplate) {
                cancelTemplate = kendo.template(options.cancelTemplate);
            }

            element
                .addClass("km-actionsheet")
                .append(cancelTemplate({cancel: that.options.cancel}))
                .wrap(WRAP)
                .on("up", BUTTONS, "_click")
                .on("click", BUTTONS, kendo.preventDefault);

            that.view().bind("destroy", function() {
                that.destroy();
            });

            that.wrapper = element.parent().addClass(type ? " km-actionsheet-" + type : "");

            that.shim = new ShimClass(that.wrapper, $.extend({modal: os.ios && os.majorVersion < 7, className: "km-actionsheet-root"}, that.options.popup) );

            that._closeProxy = $.proxy(that, "_close");
            that.shim.bind("hide", that._closeProxy);

            if (tablet) {
                kendo.onResize(that._closeProxy);
            }

            kendo.notify(that, ui);
        },

        events: [
            OPEN,
            CLOSE,
            COMMAND
        ],

        options: {
            name: "ActionSheet",
            cancel: "Cancel",
            type: "auto",
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
            kendo.unbindResize(this._closeProxy);
            this.shim.destroy();
        },

        _click: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            var currentTarget = $(e.currentTarget);
            var action = currentTarget.data("action");

            if (action) {
                var actionData = {
                    target: this.target,
                    context: this.context
                },
                $angular = this.options.$angular;

                if ($angular) {
                    this.element.injector().get("$parse")(action)($angular[0])(actionData);
                } else {
                    kendo.getter(action)(window)(actionData);
                }
            }

            this.trigger(COMMAND, { target: this.target, context: this.context, currentTarget: currentTarget });

            e.preventDefault();
            this._close();
        },

        _close: function(e) {
            if (!this.trigger(CLOSE)) {
                this.close();
            } else {
                e.preventDefault();
            }
        }
    });

    ui.plugin(ActionSheet);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
