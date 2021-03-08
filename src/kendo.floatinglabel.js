(function (f, define) {
    define(["./kendo.core"], f);
})(function () {

var __meta__ = {// jshint ignore:line
    id: "floatinglabel",
    name: "FloatingLabel",
    category: "framework",
    depends: ["core"],
    hidden: true
};

(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        ui = kendo.ui,
        NS = ".kendoFloatingLabel",
        FLOATINGLABELCONTAINER = "k-floating-label-container",
        EMPTY = "k-state-empty",
        FOCUSED = "k-state-focused",
        STATEDISABLED = "k-state-disabled",
        NOCLICKCLASS = "k-no-click",
        STATEREADONLY = "k-state-readonly",
        proxy = $.proxy;

    var FloatingLabel = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            options = $.extend(true, {}, options);

            that.refresh();
            that._editable({
                readonly: that.options.widget.options.readonly !== undefined ? that.options.widget.options.readonly : false,
                disable: that.options.widget.options.enable !== undefined ? !(that.options.widget.options.enable) : false
            });

            that.element.addClass(FLOATINGLABELCONTAINER);

            kendo.notify(that);
        },

        options: {
            name: 'FloatingLabel',
            widget: null,
            useReadOnlyClass: false
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

        refresh: function () {
            var that = this;
            var element = that.element;

            element
                .removeClass(EMPTY)
                .removeClass(FOCUSED);


            if (!that.options.widget.element.val()) {
                element.addClass(EMPTY);
            }

            if (document.activeElement === that.options.widget.element[0]) {
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

                element.on("focusin" + NS, proxy(that.refresh, that));
                element.on("focusout" + NS, proxy(that.refresh, that));
            } else {
                element
                    .toggleClass(STATEDISABLED, disable)
                    .toggleClass(that.options.useReadOnlyClass ? STATEREADONLY : NOCLICKCLASS, readonly);
            }
        }
    });
    ui.plugin(FloatingLabel);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) { (a3 || a2)(); });
