(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "responsive-panel",
    name: "Responsive Panel",
    category: "web",
    description: "The Responsive Panel widget allows a panel of content to be hidden on mobile devices, available through a toggle button.",
    depends: [ "core" ]
};

(function ($, undefined) {
    var proxy = $.proxy;
    var NS = ".kendoResponsivePanel";
    var OPEN = "open";
    var CLOSE = "close";
    var ACTIVATE_EVENTS = "click" + NS +" touchstart" + NS;
    var Widget = kendo.ui.Widget;
    var ResponsivePanel = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._toggleHandler = proxy(this._toggleButtonClick, this);
            this._closeHandler = proxy(this._close, this);

            $(document.documentElement).on(ACTIVATE_EVENTS, ".k-rpanel-toggle", this._toggleHandler);

            this._registerBreakpoint();

            this.element
                .addClass("k-rpanel k-rpanel-" + this.options.orientation);

            this._resizeHandler = proxy(this.resize, this);
            $(window).on("resize" + NS, this._resizeHandler);
        },
        _mediaQuery:
            "@media (max-width: #= breakpoint-1 #px) {" +
                ".k-rpanel-animate.k-rpanel-left," +
                ".k-rpanel-animate.k-rpanel-right {" +
                    "-webkit-transition: -webkit-transform .2s ease-out;" +
                    "-ms-transition: -ms-transform .2s ease-out;" +
                    "transition: transform .2s ease-out;" +
                "} " +
                ".k-rpanel-animate.k-rpanel-top {" +
                    "-webkit-transition: max-height .2s linear;" +
                    "-ms-transition: max-height .2s linear;" +
                    "transition: max-height .2s linear;" +
                "}" +
            "} " +
            "@media (min-width: #= breakpoint #px) {" +
                ".k-rpanel-toggle { display: none; } " +
                ".k-rpanel-left { float: left; } " +
                ".k-rpanel-right { float: right; } " +
                ".k-rpanel-left, .k-rpanel-right {" +
                    "position: relative;" +
                    "-webkit-transform: translateX(0) translateZ(0);" +
                    "-ms-transform: translateX(0) translateZ(0);" +
                    "transform: translateX(0) translateZ(0);" +
                "} " +
                ".k-rpanel-top { max-height: initial; }" +
            "}",
        _registerBreakpoint: function() {
            this._registerStyle(kendo.template(this._mediaQuery)({
                breakpoint: this.options.breakpoint
            }));
        },
        _registerStyle: function(cssText) {
            var head = $("head,body")[0];
            var style = document.createElement('style');

            if (style.styleSheet){
                style.styleSheet.cssText = cssText;
            } else {
                style.appendChild(document.createTextNode(cssText));
            }

            head.appendChild(style);
        },
        options: {
            name: "ResponsivePanel",
            orientation: "left",
            breakpoint: 640,
            autoClose: true
        },
        events: [
            OPEN,
            CLOSE
        ],
        _resize: function() {
            this.element.removeClass("k-rpanel-animate");
        },
        _toggleButtonClick: function() {
            if (this.element.hasClass("k-rpanel-expanded")) {
                this.close();
            } else {
                this.open();
            }
        },
        open: function() {
            if (!this.trigger(OPEN)) {
                this.element.addClass("k-rpanel-animate k-rpanel-expanded");

                if (this.options.autoClose) {
                    $(document.documentElement).on(ACTIVATE_EVENTS, this._closeHandler);
                }
            }
        },
        close: function() {
            if (!this.trigger(CLOSE)) {
                this.element.addClass("k-rpanel-animate").removeClass("k-rpanel-expanded");

                $(document.documentElement).off(ACTIVATE_EVENTS, this._closeHandler);
            }
        },
        _close: function(e) {
            var container = $(e.target).closest(".k-rpanel-toggle,.k-rpanel");

            if (!container.length) {
                this.close();
            }
        },
        destroy: function() {
            Widget.fn.destroy.call(this);

            $(window).off("resize" + NS, this._resizeHandler);
            $(document.documentElement).off(ACTIVATE_EVENTS, this._closeHandler);
        }
    });

    kendo.ui.plugin(ResponsivePanel);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
