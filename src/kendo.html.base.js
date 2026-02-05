import "./kendo.core.js";

export const __meta__ = {
    id: "html.base",
    name: "Html.Base",
    category: "web",
    description: "",
    depends: ["core"],
    features: []
};

(function($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class;

    kendo.html = kendo.html || {};

    var HTMLBase = Class.extend({
        init: function(element, options) {
            var that = this;
            that.element = $(element);
            options = options || {};
            delete options.name;
            that._initOptions(options);
        },
        options: {
            stylingOptions: []
        },
        _addClasses: function() {
            var that = this,
                options = that.options,
                stylingOptions = options.stylingOptions,
                previouslyAddedClasses = that.wrapper.data("added-classes");

            stylingOptions = stylingOptions.map(function(option) {
                return kendo.cssProperties.getValidClass({
                    widget: options.name,
                    propName: option,
                    value: options[option]
                });
            });

            if (previouslyAddedClasses) {
                that.wrapper.removeClass(previouslyAddedClasses.join(" "));
            }

            that.wrapper.data("added-classes", stylingOptions);
            that.wrapper.addClass(stylingOptions.join(" "));
        },
        html: function() {
            var that = this;

            return that.wrapper[0].outerHTML;
        }
    });

    $.extend(kendo.html, {
        HTMLBase: HTMLBase
    });

})(window.kendo.jQuery);
export default kendo;

