import './kendo.html.icon.js';
import * as svgIcons from '@progress/kendo-svg-icons';

var __meta__ = {
    id: "icons",
    name: "Icons",
    category: "web",
    description: "The Icons set provides both FontIcon and SvgIcon components along with the SVG icons collection from @progress/kendo-svg-icons",
    depends: ["core", "html.icon"]
};

(function($, undefined) {
    var kendo = window.kendo,
        html = kendo.html,
        ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend;

    var FontIcon = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            delete options.name;
            that._icon = new html.HTMLFontIcon(element, $.extend({}, options));
            that.element = that.wrapper = that._icon.element;

            kendo.notify(that);
        },
        options: extend({}, html.HTMLFontIcon.fn.options, {
            name: 'FontIcon'
        }),
        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            that._icon = new html.HTMLFontIcon(that.element, $.extend({}, that.options));
        }
    });

    var SvgIcon = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            delete options.name;
            that._icon = new html.HTMLSvgIcon(element, $.extend({}, options));
            that.element = that.wrapper = that._icon.element;

            kendo.notify(that);
        },
        options: extend({}, html.HTMLSvgIcon.fn.options, {
            name: 'SvgIcon'
        }),
        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            if (options.icon) {
                this.element.html('');
            }

            that._icon = new html.HTMLSvgIcon(that.element, $.extend({}, that.options));
        }
    });

    kendo.ui.plugin(FontIcon);
    kendo.ui.plugin(SvgIcon);

    kendo.setDefaults('iconType', 'font');
    kendo.ui.svgIcons = svgIcons;
    kendo.ui.icon = html.renderIcon;
})(window.kendo.jQuery);