(function (f, define) {
    define(["./kendo.core"], f);
})(function () {
    var __meta__ = {// jshint ignore:line
        id: "badge",
        name: "Badge",
        category: "web", // suite
        description: "The Badge decorates avatars, navigation menus, or other components in the application when visual notification is needed",
        depends: ["core"] // dependencies
    };
    // START WIDGET DEFINITION - only if it will have a single script file
    (function ($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget,
            ui = kendo.ui,
            PRIMARY = 'k-badge-primary',
            SECONDARY = 'k-badge-secondary',
            INFO = 'k-badge-info',
            SUCCESS = 'k-badge-success',
            WARNING = 'k-badge-warning',
            ERROR = 'k-badge-error',
            OUTLINE = 'k-badge-outline',
            PILL = 'k-badge-pill',
            FUNCTION = "function",
            STRING = "string";

        var Badge = Widget.extend({
            init: function (element, options) {
                var that = this,
                    type;

                Widget.fn.init.call(that, element, options);
                options = $.extend(true, {}, options);
                type = options.type || 'primary';
                that.element = $(element).addClass('k-badge').addClass(that.classPerType[type]);

                if (options.look == 'outline') {
                    that.element.addClass(OUTLINE);
                }

                if (options.appearance != 'rectangle') {
                    that.element.addClass(PILL);
                }

                if (typeof options.visible !== 'undefined' && !options.visible) {
                    that.element.hide();
                }

                that._setInitialValue();

                kendo.notify(that);
            },
            options: {
                name: 'Badge',
                value: '',
                visible: true,
                appearance: 'rectangle',
                template: null,
                type: 'secondary',
                look: null
            },
            classPerType: {
                primary: PRIMARY,
                info: INFO,
                success: SUCCESS,
                warning: WARNING,
                error: ERROR,
                secondary: SECONDARY
            },
            value: function (newValue) {
                var that = this;

                if (!newValue) {
                    return that._value;
                }

                that.element.html(kendo.htmlEncode(that._createContent(newValue)));
                that._value = newValue;
            },
            _createContent: function (value) {
                var template = this.options.template,
                    type = typeof template,
                    html;

                if (type == FUNCTION) {
                    html = template(value);
                } else if (type === STRING) {
                    html = kendo.template(template)({
                        value: value
                    });
                } else {
                    html = value;
                }
                return html;
            },
            _setInitialValue: function () {
                var that = this,
                    value = that.options.value || that.element.html();

                if (!/\S/.test(value)) {
                    value = '';
                }

                that._value = value;
                that.element.html(kendo.htmlEncode(that._createContent(value)));
            },
            hide: function () {
                this.element.hide();
            },
            show: function () {
                this.element.show();
            },
            setOptions: function (newOptions) {
                var that = this;
                that.element.removeClass(function (index, className) {
                    if (className.indexOf('k-') >= 0) {
                        that.element.removeClass(className);
                    }
                });

                that.init(that.element, newOptions);
            }
        });
        ui.plugin(Badge);
    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
});