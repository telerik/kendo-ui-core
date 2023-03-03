import "./kendo.html.base.js";

var __meta__ = {
    id: "html.icon",
    name: "Html.Icon",
    category: "web",
    description: "HTML font icon rendering utility for Kendo UI for jQuery.",
    depends: ["html.base"]
};

(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        HTMLBase = kendo.html.HTMLBase;

    var KICON = 'k-icon';
    var KI_PREFFIX = 'k-i-';
    var KSVGICON = 'k-svg-icon';
    var KSVG_PREFFIX = 'k-svg-i-';

    var FLIP_PREFIX = 'k-flip-';
    var FLIP_HORIZONTAL = `${FLIP_PREFIX}h`;
    var FLIP_VERTICAL = `${FLIP_PREFIX}v`;

    var THEME_COLOR_PREFIX = 'k-color-';

    var ICON_TYPES = {
        'svg': (element, options) => new HTMLSvgIcon(element, options),
        'font': (element, options) => new HTMLFontIcon(element, options)
    };

    var FLIP_CLASSES = {
        default: '',
        horizontal: FLIP_HORIZONTAL,
        vertical: FLIP_VERTICAL,
        both: `${FLIP_HORIZONTAL} ${FLIP_VERTICAL}`
    };

    var renderIcon = function(element, options) {
        if (!element || $.isPlainObject(element) || kendo.isString(element)) {
            options = element;
            element = $("<span></span>");
        }

        if (kendo.isString(options)) {
            options = {
                icon: options
            };
        }

        if (!kendo.isPresent(options.type)) {
            options.type = kendo.defaults.iconType ? kendo.defaults.iconType : 'svg';
        }

        if (kendo.isFunction(options.type)) {
            return options.type(element, options);
        }

        if (!kendo.isFunction(ICON_TYPES[options.type])) {
            return null;
        }

        return (ICON_TYPES[options.type](element, options)).html();
    };

    var HTMLBaseIcon = HTMLBase.extend({
        init: function(element, options) {
            var that = this;
            HTMLBase.fn.init.call(that, element, options);
            that._wrapper();
        },
        options: {
            name: 'HTMLIcon',
            size: 'none',
            themeColor: 'none',
            flip: 'default',
            iconClass: '',
            stylingOptions: [ 'size', 'themeColor', 'fill' ]
        },
        _wrapper: function() {
            var that = this;

            that._addClasses();
        },
        _addClasses: function() {
            var that = this,
                options = that.options,
                stylingOptions = options.stylingOptions,
                previouslyAddedClasses = that.wrapper.data("added-classes");

            stylingOptions = stylingOptions.map(function(option) {
                if (option === 'themeColor') {
                    return kendo.cssProperties.getValidClass({
                        widget: options.name,
                        propName: option,
                        value: options[option],
                        prefix: THEME_COLOR_PREFIX
                    });
                }

                if (option === 'fill') {
                    return FLIP_CLASSES[options.flip];
                }

                return kendo.cssProperties.getValidClass({
                    widget: options.name,
                    propName: option,
                    value: options[option],
                    fill: options.fillMode
                });
            });

            if (previouslyAddedClasses) {
                that.wrapper.removeClass(previouslyAddedClasses.filter(x => x !== that._className).join(" "));
            }

            that.wrapper.data("added-classes", stylingOptions.concat([that._className]));
            that.wrapper.addClass(stylingOptions.join(" "));
        }
    });

    var HTMLFontIcon = HTMLBaseIcon.extend({
        init: function(element, options) {
            HTMLBaseIcon.fn.init.call(this, element, options);
        },
        options: extend({}, HTMLBaseIcon.fn.options, {
            name: 'HTMLFontIcon',
            icon: null
        }),
        _wrapper: function() {
            var that = this,
                // Find if there is an existing k-i- class appended to the element.
                currentIconClass = that.element[0].className.split(" ").find(x => x.includes(KI_PREFFIX)),
                className = `${KI_PREFFIX}${that.options.icon}`;

            that._className = className;
            that.wrapper = that.element
                .addClass(KICON)
                .removeClass(currentIconClass) // Remove any existing icons.
                .addClass(className)
                .addClass(that.options.iconClass || '');

            HTMLBaseIcon.fn._wrapper.call(this);
        }
    });

    var HTMLSvgIcon = HTMLBaseIcon.extend({
        init: function(element, options) {
            // Ensure that the inner contents of the wrapping span element are always removed for re-rendering purposes.
            element.empty();
            HTMLBaseIcon.fn.init.call(this, element, options);
        },
        options: extend({}, HTMLBaseIcon.fn.options, {
            name: 'HTMLSVGIcon',
            icon: null
        }),
        _wrapper: function() {
            var that = this,
                icon = that.options.icon,
                iconClass = that.options.iconClass,
                // Find if there is an existing k-svg-i- class appended to the element.
                currentIconClass = that.element[0].className.split(" ").find(x => x.includes(KSVG_PREFFIX)),
                svgElm = $('<svg></svg>'),
                className;

            if (!icon && iconClass) {
                // match k-i-(some-icon-name)
                const regex = /k-i-(\w+(?:-\w+)*)/;
                let iconNameMatch = iconClass.match(regex);
                if (iconNameMatch) {
                    icon = iconNameMatch[1];
                    iconClass = iconClass.replace(iconNameMatch[0], "");
                }
            }

            if (kendo.isString(icon)) {
                // remove k-i- and convert kebab-case-icon to camelCaseIcon
                icon = icon.replace('k-i-', '').replace(/-./g, x=>x[1].toUpperCase());
                icon = kendo.ui.svgIcons[icon] || kendo.ui.svgIcons[`${icon}Icon`];
            }

            className = icon && icon.name ? `${KSVG_PREFFIX}${icon.name}` : '';
            that._className = className;

            that.wrapper = that.element
                .addClass(KSVGICON)
                .removeClass(currentIconClass) // Remove any existing icons.
                .addClass(className)
                .addClass(iconClass || '');

            if ($.isPlainObject(icon)) {
                svgElm.attr('viewBox', icon.viewBox || '')
                    .attr({
                        'viewBox': icon.viewBox || '',
                        'aria-hidden': 'true',
                        'focusable': 'false',
                        'xmlns': 'http://www.w3.org/2000/svg'
                    })
                    .html(icon.content || '');

                that.wrapper.append(svgElm[0].outerHTML);
            }

            HTMLBaseIcon.fn._wrapper.call(this);
        }
    });

    $.extend(kendo.html, {
        renderIcon: renderIcon,
        HTMLFontIcon: HTMLFontIcon,
        HTMLSvgIcon: HTMLSvgIcon,
        getIconRenderer: (type) => ICON_TYPES[type]
    });

    kendo.cssProperties.registerPrefix("HTMLFontIcon", "k-icon-");

    kendo.cssProperties.registerValues("HTMLFontIcon", [{
        prop: "size",
        values: kendo.cssProperties.sizeValues.concat([['xsmall', 'xs'], ['xlarge', 'xl'], ['xxlarge', 'xxl'], ['xxxlarge', 'xxxl']])
    }, {
        prop: "themeColor",
        values: ['primary', 'secondary', 'tertiary', 'inherit', 'info', 'success', 'warning', 'error', 'dark', 'light', 'inverse']
    }]);

    kendo.cssProperties.registerPrefix("HTMLSVGIcon", "k-icon-");

    kendo.cssProperties.registerValues("HTMLSVGIcon", [{
        prop: "size",
        values: kendo.cssProperties.sizeValues.concat([['xsmall', 'xs'], ['xlarge', 'xl'], ['xxlarge', 'xxl'], ['xxxlarge', 'xxxl']])
    }, {
        prop: "themeColor",
        values: ['primary', 'secondary', 'tertiary', 'inherit', 'info', 'success', 'warning', 'error', 'dark', 'light', 'inverse']
    }]);
})(window.kendo.jQuery);

