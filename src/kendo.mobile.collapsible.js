(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "mobile.collapsible",
    name: "Collapsible",
    category: "mobile",
    description: "The Kendo mobile Collapsible widget provides ability for creating collapsible blocks of content.",
    depends: [ "core", "userevents" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        COLLAPSIBLE = "km-collapsible",
        HEADER = "km-collapsible-header",
        CONTENT = "km-collapsible-content",
        HEADER_WRAPPER = "<div data-role='collapsible-header' class='" + HEADER + "'></div>",
        CONTENT_WRAPPER = "<div data-role='collapsible-content' class='" + CONTENT + "'></div>",

        COLLAPSED = "km-collapsed",
        EXPANDED = "km-expanded",
        ANIMATED = "km-animated",

        //events
        EXAPND = "expand",
        COLLAPSE = "collapse";

    var Collapsible = Widget.extend({
        init: function(element, options) {
            var that = this,
                container = $(element);

            Widget.fn.init.call(that, container, options);

            container.addClass(COLLAPSIBLE);

            that._buildHeader();
            that.content = container.children().not(that.header).wrapAll(CONTENT_WRAPPER).parent();

            that._userEvents = new kendo.UserEvents(that.header, {
                tap: function() { that.toggle(); }
            });

            container.addClass(that.options.collapsed ? COLLAPSED : EXPANDED);

            if (that.options.animation) {
                that.content.addClass(ANIMATED);
                that.content.height(0);
            } else if (that.options.collapsed) {
                that.content.hide();
            }
        },

        events: [
            EXAPND,
            COLLAPSE
        ],

        options: {
            name: "Collapsible",
            collapsed: true,
            collapseIcon: "minus",
            expandIcon: "plus",
            animation: true
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this._userEvents.destroy();
        },

        expand: function(instant) {
            var icon = this.options.collapseIcon,
                ios = kendo.support.mobileOS.ios;

            if (!this.trigger(EXAPND)) {
                if (icon) {
                    this.header.find(".km-icon").removeClass().addClass("km-icon km-" + icon);
                }
                this.element.removeClass(COLLAPSED).addClass(EXPANDED);

                if (this.options.animation && !instant) {
                    if (ios) { this.content.removeClass(ANIMATED); } //required to get the height of the content on iOS
                    this.content.height(this._getContentHeight());
                    if (ios) { this.content.addClass(ANIMATED); }

                    kendo.resize(this.content);
                } else {
                    this.content.show();
                }
            }
        },

        collapse: function(instant) {
            var icon = this.options.expandIcon;

            if (!this.trigger(COLLAPSE)) {
                if (icon) {
                    this.header.find(".km-icon").removeClass().addClass("km-icon km-" + icon);
                }
                this.element.removeClass(EXPANDED).addClass(COLLAPSED);

                if (this.options.animation && !instant) {
                    this.content.height(0);
                } else {
                    this.content.hide();
                }
            }
        },

        toggle: function(instant) {
            if (this.isCollapsed()) {
                this.expand(instant);
            } else {
                this.collapse(instant);
            }
        },

        isCollapsed: function() {
            return this.element.hasClass(COLLAPSED);
        },

        resize: function() {
            if (!this.isCollapsed() && this.options.animation) {
                this.content.height(this._getContentHeight());
            }
        },

        _buildHeader: function() {
            var header = this.element.children(":header").wrapAll(HEADER_WRAPPER),
                iconSpan = $('<span class="km-icon"/>'),
                icon = this.options.collapsed ? this.options.expandIcon : this.options.collapseIcon;

            if (icon) {
                header.prepend(iconSpan);
                iconSpan.addClass("km-" + icon);
            }

            this.header = header.parent();
        },

        _getContentHeight: function() {
            var style = this.content.attr("style"),
                height;

            this.content.css({
                position:   'absolute',
                visibility: 'hidden',
                height: "auto"
            });

            height = this.content.height();

            this.content.attr("style", style ? style : "");

            return height;
        }
    });

    ui.plugin(Collapsible);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
