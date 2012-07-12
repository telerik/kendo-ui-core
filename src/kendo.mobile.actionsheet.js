(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Popup = ui.Popup,
        Widget = ui.Widget,
        OPEN = "open",
        BUTTONS = "li>a",
        CONTEXT_DATA = "actionsheetContext",
        WRAP = '<div class="km-actionsheet-wrapper" />',
        cancelTemplate = kendo.template('<li class="km-actionsheet-cancel"><a href="\\#">#:cancel#</a></li>');

    var ActionSheet = Widget.extend({
        init: function(element, options) {
            var that = this,
                os = kendo.support.mobileOS,
                ShimClass = os.tablet ? Popup : Shim,
                wrapper;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .addClass("km-actionsheet")
                .append(cancelTemplate({cancel: that.options.cancel}))
                .wrap(WRAP)
                .on(kendo.support.mouseup, BUTTONS, $.proxy(that._click, that))
                .on("click", BUTTONS, kendo.preventDefault);

            wrapper = element.parent();

            that.wrapper = wrapper;
            that.shim = new ShimClass(that.wrapper, $.extend({modal: !(os.android || os.meego)}, that.options.popup) );

            kendo.notify(that, ui);
        },

        events: [
            OPEN
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
            that.shim.show();
        },


        close: function() {
            this.context = this.target = null;
            this.shim.hide();
        },

        
        openFor: function(target) {
            var that = this;
            that.target = target;
            that.context = target.data(CONTEXT_DATA);
            that.trigger(OPEN, { target: that.target, context: that.context });
            that.shim.show(target);
        },

        _click: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            var action = $(e.currentTarget).data("action");

            if (action) {
                kendo.getter(action)(window)({
                    target: this.target,
                    context: this.context
                });
            }

            e.preventDefault();
            this.close();
        }
    });

    ui.plugin(ActionSheet);
})(jQuery);
