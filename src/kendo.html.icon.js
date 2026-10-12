import "./kendo.html.base.js";
import { iconService } from "./core/services/icon-override.service";

export const __meta__ = {
    id: "html.icon",
    name: "Html.Icon",
    category: "web",
    description: "HTML font icon rendering utility for Kendo UI for jQuery.",
    depends: ["html.base"]
};

(function($, undefined) {
    const kendo = window.kendo,
        extend = $.extend,
        HTMLBase = kendo.html.HTMLBase;

    const KFONTICON = 'k-icon k-font-icon';
    const KI_PREFFIX = 'k-i-';
    const KSVGICON = 'k-icon k-svg-icon';
    const KSVG_PREFFIX = 'k-svg-i-';

    function resolveSVGIconOverride(iconName, element) {
        const result = iconService.resolve(iconName, element);
        if (typeof result === "string") {
            const camelName = result.replace(/-./g, function(x) { return x[1].toUpperCase(); });
            return kendo.ui.svgIcons[camelName] || kendo.ui.svgIcons[camelName + "Icon"] || null;
        }
        return result;
    }

    const FLIP_PREFIX = 'k-flip-';
    const FLIP_HORIZONTAL = `${FLIP_PREFIX}h`;
    const FLIP_VERTICAL = `${FLIP_PREFIX}v`;

    const THEME_COLOR_PREFIX = 'k-color-';

    const ICON_TYPES = {
        'svg': (element, options) => new HTMLSvgIcon(element, options),
        'font': (element, options) => new HTMLFontIcon(element, options)
    };

    const FLIP_CLASSES = {
        default: '',
        horizontal: FLIP_HORIZONTAL,
        vertical: FLIP_VERTICAL,
        both: `${FLIP_HORIZONTAL} ${FLIP_VERTICAL}`
    };

    const VALID_VARIANTS = ['solid', 'outline', 'duotone'];

    const renderIcon = function(element, options) {
        if (!element || $.isPlainObject(element) || kendo.isString(element)) {
            options = element;
            element = $("<span></span>");
        }

        if (kendo.isString(options)) {
            const parts = options.split(':');
            const parsed = { icon: parts[0] };
            if (parts.length > 1 && VALID_VARIANTS.indexOf(parts[1]) > -1) {
                parsed.variant = parts[1];
            }
            options = parsed;
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

    function expandSelfClosingTags(html) {
        const voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;

        return html.replace(
            /<([a-z][a-z0-9:-]*)([^>]*)\/>/gi,
            (_, tag, attrs) =>
            (voidTags.test(tag)
                ? `<${tag}${attrs}/>`
                : `<${tag}${attrs}></${tag}>`)
        );
    }

    const SVG_ALLOWED_ELEMENTS = new Set([
        'circle', 'clippath', 'defs', 'ellipse', 'g', 'line', 'lineargradient',
        'mask', 'path', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'use'
    ]);

    const SVG_ALLOWED_ATTRIBUTES = new Set([
        'class', 'clip-path', 'clip-rule', 'cx', 'cy', 'd', 'fill', 'fill-opacity',
        'fill-rule', 'gradienttransform', 'gradientunits', 'height', 'id', 'mask', 'offset',
        'href', 'opacity', 'points', 'preserveaspectratio', 'r', 'rx', 'ry', 'spreadmethod',
        'stop-color', 'stop-opacity', 'stroke', 'stroke-dasharray', 'stroke-dashoffset',
        'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity',
        'stroke-width', 'transform', 'vector-effect', 'width', 'x', 'x1', 'x2',
        'xlink:href', 'y', 'y1', 'y2'
    ]);

    const SVG_PAINT_ATTRIBUTES = new Set(['fill', 'stroke']);
    const SVG_LOCAL_URL_ATTRIBUTES = new Set(['clip-path', 'href', 'mask', 'xlink:href']);
    const SVG_SAFE_PAINT = /^(none|currentcolor|transparent|context-fill|context-stroke|#[0-9a-f]{3,8}|[a-z]+|rgba?\([0-9.,%\s]+\)|hsla?\([0-9.,%\sdegturnrad]+\))$/i;

    function isLocalSvgReference(value, ids, isUrl) {
        const expression = isUrl ? /^url\(\s*(['"]?)#([\w:.-]+)\1\s*\)$/i : /^#([\w:.-]+)$/;
        const match = String(value).trim().match(expression);

        return !!match && ids.has(match[2] || match[1]);
    }

    function sanitizeSvgContent(html) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        svg.innerHTML = String(html);
        svg.querySelectorAll('*').forEach(element => {
            if (!SVG_ALLOWED_ELEMENTS.has(element.localName.toLowerCase())) {
                element.remove();
                return;
            }

            Array.from(element.attributes).forEach(attribute => {
                if (!SVG_ALLOWED_ATTRIBUTES.has(attribute.name.toLowerCase())) {
                    element.removeAttribute(attribute.name);
                }
            });
        });

            const ids = new Set(Array.from(svg.querySelectorAll('[id]')).map(element => element.id));
            svg.querySelectorAll('*').forEach(element => {
                Array.from(element.attributes).forEach(attribute => {
                    const name = attribute.name.toLowerCase();
                    const isPaint = SVG_PAINT_ATTRIBUTES.has(name);
                    const isLocalUrl = SVG_LOCAL_URL_ATTRIBUTES.has(name);
                    const validPaint = SVG_SAFE_PAINT.test(attribute.value) || isLocalSvgReference(attribute.value, ids, true);

                    if ((isPaint && !validPaint) || (isLocalUrl && !isLocalSvgReference(attribute.value, ids, name === 'clip-path' || name === 'mask'))) {
                        element.removeAttribute(attribute.name);
                    }
                });
            });

        return svg.innerHTML;
    }

    const HTMLBaseIcon = HTMLBase.extend({
        init: function(element, options) {
            const that = this;
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

    const HTMLFontIcon = HTMLBaseIcon.extend({
        init: function(element, options) {
            HTMLBaseIcon.fn.init.call(this, element, options);
        },
        options: extend({}, HTMLBaseIcon.fn.options, {
            name: 'HTMLFontIcon',
            icon: null
        }),
        _wrapper: function() {
            const that = this,
                iconName = typeof that.options.icon === "string" ? that.options.icon.replace(KI_PREFFIX, '') : null,
                resolvedIcon = iconName && iconService.resolve(iconName, that.element[0]),
                // Find if there is an existing k-i- class appended to the element.
                currentIconClass = that.element[0].className.split(" ").find(x => x.includes(KI_PREFFIX)),
                icon = typeof resolvedIcon === "string" ? resolvedIcon : that.options.icon,
                className = icon ? `${icon.startsWith(KI_PREFFIX) ? "" : KI_PREFFIX}${icon}` : "";

            that._className = className;
            that.wrapper = that.element
                .addClass(KFONTICON)
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
            icon: null,
            variant: null
        }),
        _wrapper: function() {
            let that = this,
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
                let iconName = icon.replace('k-i-', '');
                const variantMatch = iconName.match(/-(solid|outline|duotone)$/);

                if (variantMatch) {
                    iconName = iconName.replace(variantMatch[0], '');
                    if (!that.options.variant) {
                        that.options.variant = variantMatch[1];
                    }
                }

                const overrideIcon = resolveSVGIconOverride(iconName, that.element[0]);
                if (overrideIcon) {
                    icon = overrideIcon;
                } else {
                    const camelName = iconName.replace(/-(solid|outline|duotone)/, '').replace(/-./g, x=>x[1].toUpperCase());
                    icon = kendo.ui.svgIcons[camelName] || kendo.ui.svgIcons[`${camelName}Icon`];
                }
            } else if ($.isPlainObject(icon) && icon.name) {
                const overrideIcon = resolveSVGIconOverride(icon.name, that.element[0]);
                if (overrideIcon) {
                    icon = overrideIcon;
                }
            }

            className = icon && icon.name ? `${KSVG_PREFFIX}${icon.name}` : '';
            that._className = className;

            that.wrapper = that.element
                .addClass(KSVGICON)
                .removeClass(currentIconClass) // Remove any existing icons.
                .addClass(className)
                .addClass(iconClass || '')
                .attr('aria-hidden', 'true');

            if ($.isPlainObject(icon)) {
                let svgContent = icon.content || '';
                const svgVariant = that.options.variant;
                if (svgVariant && icon.variants && icon.variants[svgVariant]) {
                    svgContent = icon.variants[svgVariant];

                }

                svgElm.attr('viewBox', icon.viewBox || '')
                    .attr({
                        'viewBox': icon.viewBox || '',
                        'aria-hidden': 'true',
                        'focusable': 'false',
                        'xmlns': 'http://www.w3.org/2000/svg'
                    })
                    .html(sanitizeSvgContent(expandSelfClosingTags(svgContent)));

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
        values: ['primary', 'secondary', 'tertiary', 'inherit', 'info', 'success', 'warning', 'error', 'inverse']
    }]);

    kendo.cssProperties.registerPrefix("HTMLSVGIcon", "k-icon-");

    kendo.cssProperties.registerValues("HTMLSVGIcon", [{
        prop: "size",
        values: kendo.cssProperties.sizeValues.concat([['xsmall', 'xs'], ['xlarge', 'xl'], ['xxlarge', 'xxl'], ['xxxlarge', 'xxxl']])
    }, {
        prop: "themeColor",
        values: ['primary', 'secondary', 'tertiary', 'inherit', 'info', 'success', 'warning', 'error', 'inverse']
    }]);
})(window.kendo.jQuery);
export default kendo;
