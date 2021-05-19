(function (f, define) {
    define(["./kendo.core"], f);
})(function () {

var __meta__ = {// jshint ignore:line
    id: "loader",
    name: "Loader",
    category: "web",
    description: "The Loader is a visual indicator of loading data across different parts of the page.",
    depends: ["core"]
};

(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        ui = kendo.ui,

        HIDDEN = 'k-hidden',
        ARIA_LABEL = 'aria-label',
        ARIA_HIDDEN = 'aria-hidden';

    var loaderClasses = {
        loader: "k-widget k-loader",
        canvas: "k-loader-canvas",
        segment: "k-loader-segment"
    };

    var loaderTypes = {
        'pulsing': { className: 'pulsing-2', segments: 2 },
        'infinite-spinner': { className: 'spinner-3', segments: 3 },
        'converging-spinner': { className: 'spinner-4', segments: 4 }
    };

    var Loader = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._render();

            that._appearance();

            kendo.notify(that);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);
        },

        options: {
            name: 'Loader',
            themeColor: "primary",
            sizes: {
                'small': 'sm',
                'medium': 'md',
                'large': 'lg'
            },
            size: 'medium',
            type: "pulsing",
            visible: true,
            messages: {
                "loading": "Loading"
            },
            _classNames: []
        },

        _render: function() {
            var that = this,
                wrapper = that.element,
                type = that.options.type,
                typeData = loaderTypes[type] === undefined ? type : loaderTypes[type],
                segments = [];

            wrapper
                .empty()
                .attr(ARIA_LABEL, that.options.messages.loading);

            if (typeData.segments) {
                for (var i = 0; i < typeData.segments; i += 1) {
                    segments.push($('<span/>').addClass(loaderClasses.segment));
                }
            }

            $("<div>").addClass(loaderClasses.canvas)
                .append(segments)
                .appendTo(wrapper);
        },

        _appearance: function() {
            var that = this;

            that._themeColor = that.options.themeColor;
            that._sizes = that.options.sizes;
            that._size = that.options.size;
            that._type = that.options.type;
            that._visible = that.options.visible;

            that._updateClassNames();
        },

        _updateClassNames: function() {
            var that = this,
                classNames = [loaderClasses.loader],
                keepClassNames = that.options._classNames,
                themeColor = that._themeColor,
                sizes = that._sizes,
                size = that._size,
                type = that._type,
                typeData = loaderTypes[type] === undefined ? type : loaderTypes[type],
                sizeAbbr = sizes[size] === undefined ? size : sizes[size],
                visible = that._visible;

            // Remove all class names
            that.element.removeClass(function(index, className) {
                if (className.indexOf('k-') === 0 && keepClassNames.indexOf(className) === -1) {
                    that.element.removeClass(className);
                }
            });

            // Color
            if (typeof themeColor === 'string' && themeColor !== '' && themeColor !== 'inherit') {
                classNames.push('k-loader-' + themeColor);
            }

            // Size
            if (typeof size === 'string' && size !== '' && sizeAbbr !== '') {
                classNames.push('k-loader-' + sizeAbbr);
            }

            // Type
            if (typeof type === 'string' && type !== '') {
                classNames.push('k-loader-' + ($.isPlainObject(typeData) ? typeData.className : type));
            }

            // Visibility
            if (visible === false) {
                classNames.push(HIDDEN);
            }

            that.element.attr(ARIA_HIDDEN, !visible);

            // Apply classnames
            that.element.addClass(classNames.join(' '));
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            that._render();

            that._appearance();
        },

        themeColor: function(color) {
            var that = this;

            if (arguments.length === 0 || color === undefined) {
                return that._themeColor;
            }

            that._themeColor = color;

            that._updateClassNames();
        },

        hide: function() {
            var that = this;

            that._visible = false;

            that._updateClassNames();
        },

        show: function() {
            var that = this;

            that._visible = true;

            that._updateClassNames();
        }
    });

    ui.plugin(Loader);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
});