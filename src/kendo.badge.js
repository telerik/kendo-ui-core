import "./kendo.core.js";
import "./kendo.icons.js";

export const __meta__ = {
    id: "badge",
    name: "Badge",
    category: "web", // suite
    description: "The Badge decorates avatars, navigation menus, or other components in the application when visual notification is needed",
    depends: ["core", "icons"] // dependencies
};

(function($, undefined) {
    const kendo = window.kendo,
        Widget = kendo.ui.Widget,
        ui = kendo.ui,
        HIDDEN = 'k-hidden',
        iconTemplate = ({ icon }) => kendo.ui.icon($(`<span class='k-badge-icon'></span>`), { icon: icon }),
        textTemplate = ({ text }) => `<span class='k-badge-text'>${text}</span>`;

    const Badge = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._content();

            that._appearance();

            kendo.notify(that);
            Widget.fn.endInit.call(that);
},

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);
        },

        options: {
            name: 'Badge',
            cutoutBorder: false,
            data: {},
            fillMode: undefined,
            icon: '',
            encoded: true,
            max: Infinity,
            position: 'inline',
            align: '',
            rounded: undefined,
            roundings: {
                'small': 'sm',
                'medium': 'md',
                'large': 'lg',
                'full': 'full'
            },
            sizes: {
                'small': 'sm',
                'medium': 'md',
                'large': 'lg'
            },
            size: undefined,
            template: null,
            text: '',
            themeColor: undefined,
            visible: true,
            _classNames: []
        },

        _content: function() {
            var that = this;
            var text = that.options.text;
            var template = that.options.template;
            var data = that.options.data;
            var icon = that.options.icon;

            // Order of precedence
            // 1) template
            // 2) icon
            // 3) text
            // 4) content

            if (template !== null) {
                that._text = text;
                that._template = kendo.template(template).bind(that);
                that.element.html( that._template(data) );

                return;
            }

            if (icon !== '') {
                that.icon(icon);

                if (text !== '') {
                    that.text(text);
                }

                return;
            }

            if (text !== '') {
                that.text(text);

                return;
            }

            that.text(that._text !== undefined ? that._text : that.element.html());
        },

        _appearance: function() {
            var that = this;
            that._themeColor = that.options.themeColor;
            that._shape = that.options.shape;
            that._sizes = that.options.sizes;
            that._size = that.options.size;
            that._fillMode = that.options.fillMode;
            that._rounded = that.options.rounded;
            that._roundings = that.options.roundings;
            that._cutoutBorder = that.options.cutoutBorder;
            that._align = that.options.align;
            that._position = that.options.position;
            that._visible = that.options.visible;

            that._updateClassNames();
        },

        _updateClassNames: function() {
            var that = this;
            var classNames = ['k-badge'];
            var keepClassNames = that.options._classNames;
            var themeColor = that._themeColor;
            var shape = that._shape;
            var sizes = that._sizes;
            var size = that._size;
            var sizeAbbr = sizes[size] === undefined ? size : sizes[size];
            var fillMode = that._fillMode;
            var rounded = that._rounded;
            var roundings = that._roundings;
            var roundedAbbr = roundings[rounded] === undefined ? rounded : roundings[rounded];
            var cutoutBorder = that._cutoutBorder;
            var align = that._align;
            var position = that._position;
            var visible = that._visible;

            // Remove all class names
            that.element.removeClass(function(index, className) {
                if (className.indexOf('k-') === 0 && keepClassNames.indexOf(className) === -1) {
                    that.element.removeClass(className);
                }
            });

            // Fill
            if (typeof fillMode === 'string' && fillMode !== '') {
                classNames.push('k-badge-' + fillMode);
            }

            // Color
            if (typeof themeColor === 'string' && themeColor !== '') {
                classNames.push('k-badge-' + themeColor);
            }

            // Size
            if (typeof size === 'string' && size !== '') {
                classNames.push('k-badge-' + sizeAbbr);
            }

            // Rounded
            if (typeof rounded === 'string' && rounded !== '') {
                classNames.push('k-rounded-' + roundedAbbr);
            }

            // Shape
            if (typeof shape === 'string' && shape !== '') {
                classNames.push('k-badge-' + shape);
            }

            // Cutout border
            if (typeof cutoutBorder === 'boolean' && cutoutBorder === true) {
                classNames.push('k-badge-border-cutout');
            }

            // Position
            if (typeof position === 'string' && position !== '') {
                classNames.push('k-badge-' + position);
            }

            // Align
            if (typeof position === 'string' && position !== '' && position !== 'inline' && typeof align === 'string' && align.split(' ').length == 2) {
                classNames.push('k-' + align.replace(' ', '-'));
            }

            // Visibility
            if (visible === false) {
                classNames.push(HIDDEN);
            }

            // Apply classnames
            that.element.addClass(classNames.join(' '));
        },

        setOptions: function(options) {
            var that = this;

            that.element.removeClass(function(index, className) {
                if (className.indexOf('k-') >= 0) {
                    that.element.removeClass(className);
                }
            });

            Widget.fn.setOptions.call(that, options);

            if (options && options.text === '') {
                that._text = '';
                that.element.children('.k-badge-text').remove();
            }

            if (options && options.icon === '') {
                that._icon = '';
                that.element.children('.k-badge-icon').remove();
            }

            that._content();

            that._appearance();
        },

        text: function(text) {
            var that = this;
            var content;
            var current;

            // handle badge.text()
            if (arguments.length === 0 || text === undefined) {
                return that._text;
            }

            that._text = text;

            content = that._textContent(text);

            if (content === undefined) {
                return;
            }

            current = that.element.children('.k-badge-text');

            if (current.length) {
                current.remove();
            } else if (!that.element.children('.k-badge-icon').length) {
                that.element.empty();
            }

            if (content !== '') {
                that.element.append(content);
            }
        },

        _textContent: function(text) {
            var that = this;
            var max = that.options.max;
            var encoded = that.options.encoded !== false;

            if (text === true || text === false || text === null) {
                return '';
            }

            if (typeof text === 'string') {
                text = encoded === true ? kendo.htmlEncode(text) : text;
                return text === '' ? '' : textTemplate({ text: text });
            }

            if (typeof text === 'number') {
                return textTemplate({ text: text > max ? max + '+' : text });
            }

            if (typeof text === 'object' && 'toString' in text) {
                text = encoded === true ? kendo.htmlEncode(text) : text;
                return textTemplate({ text: text.toString() });
            }
        },

        icon: function(icon) {
            const that = this;
            let content;
            let current;

            if (arguments.length === 0 || icon === undefined) {
                return that._icon;
            }

            const iconIsObject = icon && typeof icon === 'object' && icon.name;
            that._icon = (typeof icon === 'string' || iconIsObject) ? icon : '';

            if (!that._icon) {
                that.element.children('.k-badge-icon').remove();
                return;
            }

            content = iconTemplate({ icon: that._icon });
            current = that.element.children('.k-badge-icon');

            if (current.length) {
                current.replaceWith(content);
            } else if (that.element.children('.k-badge-text').length) {
                that.element.prepend(content);
            } else {
                that.element.html(content);
            }
        },

        themeColor: function(color) {
            var that = this;

            // handle badge.color()
            if (arguments.length === 0 || color === undefined) {
                return that._themeColor;
            }

            that._themeColor = color;
            that._updateClassNames();
        },

        rounded: function(rounded) {
            var that = this;

            // handle badge.shape()
            if (arguments.length === 0 || rounded === undefined) {
                return that._rounded;
            }

            that._rounded = rounded;
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

    ui.plugin(Badge);

    kendo.cssProperties.registerPrefix("Badge", "k-badge-");

    kendo.cssProperties.registerValues("Badge", [{
        prop: "fillMode",
        values: ['solid', 'tint', 'outline']
    }, {
        prop: "themeColor",
        values: ['base', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
    }]);

})(window.kendo.jQuery);
export default kendo;
