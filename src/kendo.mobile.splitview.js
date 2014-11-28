(function(f, define){
    define([ "./kendo.mobile.pane" ], f);
})(function(){

var __meta__ = {
    id: "mobile.splitview",
    name: "SplitView",
    category: "mobile",
    description: "The mobile SplitView is a tablet-specific view that consists of two or more mobile Pane widgets.",
    depends: [ "mobile.pane" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        EXPANED_PANE_SHIM = "<div class='km-expanded-pane-shim' />",
        View = ui.View;

    var SplitView = View.extend({
        init: function(element, options) {
            var that = this,
            pane, modalViews;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            $.extend(that, options);

            that._id();

            if (!that.options.$angular) {
                that._layout();
                that._overlay();
            } else {
                that._overlay();
            }

            that._style();

            modalViews = element.children(that._locate("modalview"));

            if (!that.options.$angular) {
                kendo.mobile.init(modalViews);
            } else {
                modalViews.each(function(idx, element) {
                    kendo.compileMobileDirective($(element));
                });
            }

            that.panes = [];
            that._paramsHistory = [];

            if (!that.options.$angular) {
                that.content.children(kendo.roleSelector("pane")).each(function() {
                    pane = kendo.initWidget(this, {}, ui.roles);
                    that.panes.push(pane);
                });
            } else {
                that.element.children(kendo.directiveSelector("pane")).each(function() {
                    pane = kendo.compileMobileDirective($(this));
                    that.panes.push(pane);
                });
            }

            that.expandedPaneShim = $(EXPANED_PANE_SHIM).appendTo(that.element);

            that._shimUserEvents = new kendo.UserEvents(that.expandedPaneShim, {
                tap: function() {
                    that.collapsePanes();
                }
            });
        },

        _locate: function(selectors) {
            return this.options.$angular ? kendo.directiveSelector(selectors) : kendo.roleSelector(selectors);
        },

        options: {
            name: "SplitView",
            style: "horizontal"
        },

        expandPanes: function() {
            this.element.addClass("km-expanded-splitview");
        },

        collapsePanes: function() {
            this.element.removeClass("km-expanded-splitview");
        },

        // Implement view interface
        _layout: function() {
            var that = this,
                element = that.element;

            that.transition = kendo.attrValue(element, "transition");
            kendo.mobile.ui.View.prototype._layout.call(this);
            kendo.mobile.init(this.header.add(this.footer));
            that.element.addClass("km-splitview");
            that.content.addClass("km-split-content");
        },

        _style: function () {
            var style = this.options.style,
                element = this.element,
                styles;

            if (style) {
                styles = style.split(" ");
                $.each(styles, function () {
                    element.addClass("km-split-" + this);
                });
            }
        },

        showStart: function() {
            var that = this;
            that.element.css("display", "");

            if (!that.inited) {
                that.inited = true;
                $.each(that.panes, function() {
                    if (this.options.initial) {
                        this.navigateToInitial();
                    } else {
                        this.navigate("");
                    }
                });
                that.trigger("init", {view: that});
            } else {
                this._invokeNgController();
            }

            that.trigger("show", {view: that});
        }
    });

    ui.plugin(SplitView);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
