(function(f, define){
    define([ "./kendo.popup" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "list.interactions",
    name: "List Interactions",
    category: "framework",
    depends: [ "popup" ],
    hidden: true
};

/*jshint evil: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        outerWidth = kendo._outerWidth,
        support = kendo.support,
        HIDDENCLASS = "k-hidden",
        WIDTH = "width",
        extend = $.extend,
        proxy = $.proxy,
        browser = support.browser;

        var ListInteractions = kendo.Class.extend({
            init: function(list) {
                this._list = list;
                this._header();
                this._noData();
                this._footer();
            },

            readonly: function(readonly) {
                var list = this._list;

                list._editable({
                    readonly: readonly === undefined ? true : readonly,
                    disable: false
                });
            },

            enable: function(enable) {
                var list = this._list;

                list._editable({
                    readonly: false,
                    disable: !(enable = enable === undefined ? true : enable)
                });
            },

            _clearButton: function() {
                var list = this._list;
                var clearTitle = (list.options.messages && list.options.messages.clear) ? list.options.messages.clear: "clear";

                if(!list._clear){
                    list._clear = $('<span unselectable="on" class="k-icon k-clear-value k-i-close" title="' + clearTitle + '"></span>').attr({
                        "role": "button",
                        "tabIndex": -1
                    });
                }

                if (!list.options.clearButton) {
                    list._clear.remove();
                }
            },

            _hideClear: function() {
                var list = this._list;

                if(list._clear) {
                    list._clear.addClass(HIDDENCLASS);
                }
            },

            _showClear: function() {
                var list = this._list;

                if(list._clear) {
                    list._clear.removeClass(HIDDENCLASS);
                }
            },

            _popup: function() {
                var list = this._list;

                list.popup = new ui.Popup(list.list, extend({}, list.options.popup, {
                    anchor: list.wrapper,
                    open: proxy(list._openHandler, list),
                    close: proxy(list._closeHandler, list),
                    animation: list.options.animation,
                    isRtl: support.isRtl(list.wrapper),
                    autosize :list.options.autoWidth
                }));
            },

            _angularElement: function(element, action) {
                var list = this._list;
                if (!element) {
                    return;
                }

                list.angular(action, function() {
                    return { elements: element };
                });
            },

            _noData: function() {
                var list = this._list;
                var noData = $(list.noData);
                var template = list.options.noDataTemplate;

                list.angular("cleanup", function() { return { elements: noData }; });
                kendo.destroy(noData);
                noData.remove();

                if (!template) {
                    list.noData = null;
                    return;
                }

                list.noData = $('<div class="k-nodata" style="display:none"><div></div></div>').appendTo(list.list);
                list.noDataTemplate = typeof template !== "function" ? kendo.template(template) : template;
            },

            _renderNoData: function() {
                var list = this._list;
                var noData = list.noData;

                if (!noData) {
                    return;
                }

                this._angularElement(noData, "cleanup");
                noData.children(":first").html(list.noDataTemplate({ instance: list }));
                this._angularElement(noData, "compile");
            },

            _footer: function() {
                var list = this._list;
                var footer = $(list.footer);
                var template = list.options.footerTemplate;

                this._angularElement(footer, "cleanup");
                kendo.destroy(footer);
                footer.remove();

                if (!template) {
                    list.footer = null;
                    return;
                }

                list.footer = $('<div class="k-footer"></div>').appendTo(list.list);
                list.footerTemplate = typeof template !== "function" ? kendo.template(template) : template;
            },

            _renderFooter: function() {
                var list = this._list;
                var footer = list.footer;

                if (!footer) {
                    return;
                }

                this._angularElement(footer, "cleanup");
                footer.html(list.footerTemplate({ instance: list }));
                this._angularElement(footer, "compile");
            },

            _header: function() {
                var list = this._list;
                var header = $(list.header);
                var template = list.options.headerTemplate;

                this._angularElement(header, "cleanup");
                kendo.destroy(header);
                header.remove();

                if (!template) {
                    list.header = null;
                    return;
                }

                var headerTemplate = typeof template !== "function" ? kendo.template(template) : template;
                header = $(headerTemplate({}));

                list.header = header[0] ? header : null;
                list.list.prepend(header);

                this._angularElement(list.header, "compile");
            },

            _enable: function() {
                var list = this._list,
                    options = list.options,
                    disabled = list.element.is("[disabled]");

                if (options.enable !== undefined) {
                    options.enabled = options.enable;
                }

                if (!options.enabled || disabled) {
                    this.enable(false);
                } else {
                    this.readonly(list.element.is("[readonly]"));
                }
            },

            _adjustListWidth: function() {
                var that = this._list,
                    list = that.list,
                    width = list[0].style.width,
                    wrapper = that.wrapper,
                    computedStyle, computedWidth;

                if (!list.data(WIDTH) && width) {
                    return;
                }

                computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
                computedWidth = parseFloat(computedStyle  && computedStyle.width) || outerWidth(wrapper);

                if (computedStyle && browser.msie) { // getComputedStyle returns different box in IE.
                    computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
                }

                if (list.css("box-sizing") !== "border-box") {
                    width = computedWidth - (outerWidth(list) - list.width());
                } else {
                    width = computedWidth;
                }

                list.css({
                    fontFamily: wrapper.css("font-family"),
                    width: that.options.autoWidth ? "auto" : width,
                    minWidth: width,
                    whiteSpace: that.options.autoWidth ? "nowrap" : "normal"
                })
                .data(WIDTH, width);

                return true;
            },

            _reset: function() {
                var that = this._list,
                    element = that.element,
                    formId = element.attr("form"),
                    form = formId ? $("#" + formId) : element.closest("form");

                if (form[0]) {
                    that._resetHandler = function() {
                        setTimeout(function() {
                            that.value(that._initial);
                        });
                    };

                    that._form = form.on("reset", that._resetHandler);
                }
            },

            _destroy: function() {
                var that = this._list;

                if (that._form) {
                    that._form.off("reset", that._resetHandler);
                }
            }
        });
        kendo.ui.listInteractions = ListInteractions;
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
