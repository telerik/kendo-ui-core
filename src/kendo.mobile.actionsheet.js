(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Widget = ui.Widget,
        BUTTONS = "li>a",
        CONTEXT_DATA = "actionsheetContext",
        WRAP = '<div class="km-actionsheet-wrapper" />',
        cancelTemplate = kendo.template('<li><a href="\\#" class="km-actionsheet-cancel">#:cancel#</a></li>');

    var ActionSheet = Widget.extend(/** @lends kendo.mobile.ui.ActionSheet.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            var that = this,
                wrapper;

            Widget.fn.init.call(that, element, options);

            that.element.wrap(WRAP)
                .append(cancelTemplate({cancel: that.options.cancel}))
                .on(kendo.support.mouseup, BUTTONS, $.proxy(that._click, that));

            wrapper = that.element.parent();

            that.wrapper = wrapper;
            that.shim = new Shim(that.wrapper);
        },

        options: {
            name: "ActionSheet",
            cancel: 'Cancel'
        },

        open: function(target) {
            this.target = $(target);
            this.shim.show();
        },

        close: function() {
            this.shim.hide();
        },

        _click: function(e) {
            var target = this.target;
            if (e.originalEvent && e.originalEvent.defaultPrevented) {
                return;
            }

            var action = $(e.currentTarget).data("action");

            if (action) {
                kendo.getter(action)(window)({
                    target: target,
                    context: target.data(CONTEXT_DATA)
                });
            }

            this.close();
        }
    });

    ui.plugin(ActionSheet);
})(jQuery);
