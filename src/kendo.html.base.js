(function(f, define){
    define([
        "./kendo.core"
    ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "html.base",
    name: "Html.Base",
    category: "web",
    description: "",
    depends: ["core"],
    features: []
};

(function ($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class;

    kendo.html = kendo.html || {};

    var HTMLBase = Class.extend({
        init: function (element, options) {
            var that = this;
            that.element = $(element);
            options = options || {};
            delete options.name;
            that._initOptions(options);
        },
        options: {
            stylingOptions: []
        },
        _addClasses: function () {
            var that = this,
                options = that.options,
                stylingOptions = options.stylingOptions;

            stylingOptions = stylingOptions.map(function(option){
                var validFill;

                if (option === "themeColor") {
                    validFill = kendo.cssProperties.getValidClass({
                        widget: options.name,
                        propName: "fillMode",
                        value: options.fillMode
                    });

                    if (!validFill || validFill.length === 0) {
                        return "";
                    }
                }

                return kendo.cssProperties.getValidClass({
                    widget: options.name,
                    propName: option,
                    value: options[option],
                    fill: options.fillMode
                });
            });

            that.wrapper.addClass(stylingOptions.join(" "));
        },
        html: function () {
            var that = this;

            return that.wrapper[0].outerHTML;
        }
    });

    $.extend(kendo.html, {
        HTMLBase: HTMLBase
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
