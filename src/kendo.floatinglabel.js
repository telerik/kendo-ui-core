import "./kendo.core.js";

var __meta__ = {
    id: "floatinglabel",
    name: "FloatingLabel",
    category: "framework",
    depends: ["core"],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        ui = kendo.ui,
        NS = ".kendoFloatingLabel",
        FLOATINGLABELCONTAINER = "k-floating-label-container",
        EMPTY = "k-empty",
        FOCUSED = "k-focus",
        STATEDISABLED = "k-disabled",
        NOCLICKCLASS = "k-no-click",
        STATEREADONLY = "k-readonly";

    var FloatingLabel = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            options = $.extend(true, {}, options);

            that.widget = that.options.widget;
            that.widgetWrapper = that.widget.wrapper[0];

            that.refresh();
            that._editable({
                readonly: that.options.widget.options.readonly !== undefined ? that.options.widget.options.readonly : false,
                disable: that.options.widget.options.enable !== undefined ? !(that.options.widget.options.enable) : false
            });

            if (that.widgetWrapper.style.width) {
                that.element.css("width", that.widgetWrapper.style.width);
                that.widgetWrapper.style.width = "100%";
            }

            that.element.addClass(FLOATINGLABELCONTAINER);

            kendo.notify(that);
        },

        options: {
            name: 'FloatingLabel',
            widget: null,
            useReadOnlyClass: false,
            floatCheck: ({ element }) => !element.val()
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        refresh: function() {
            var that = this;
            var element = that.element;

            element
                .removeClass(EMPTY)
                .removeClass(FOCUSED);

            if (that.options.floatCheck({ element: that.options.widget.element, floating: that.element })) {
                element.addClass(EMPTY);
            }

            if (document.activeElement === that.options.widget.element[0]
                || (that.options.widget.input && document.activeElement === that.options.widget.input[0])) {

                element.addClass(FOCUSED);
            }
        },

        destroy: function() {
            var that = this;

            that.element.off(NS);
            Widget.fn.destroy.call(that);
        },

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;

            element.off(NS);

            if (!readonly && !disable) {
                element
                    .removeClass(STATEDISABLED)
                    .removeClass(that.options.useReadOnlyClass ? STATEREADONLY : NOCLICKCLASS);

                element.on("focusin" + NS, that.refresh.bind(that));
                element.on("focusout" + NS, that.refresh.bind(that));
            } else {
                element
                    .toggleClass(STATEDISABLED, disable)
                    .toggleClass(that.options.useReadOnlyClass ? STATEREADONLY : NOCLICKCLASS, readonly);
            }
        }
    });
    ui.plugin(FloatingLabel);
})(window.kendo.jQuery);

