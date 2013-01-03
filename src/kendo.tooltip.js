kendo_module({
    id: "tooltip",
    name: "Tooltip",
    category: "web",
    description: "",
    depends: [ "core", "popup" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Popup = kendo.ui.Popup,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        proxy = $.proxy,
        isLocalUrl = kendo.isLocalUrl,
        SHOW = "show",
        HIDE = "hide",
        ERROR = "error",
        CONTENTLOAD = "contentLoad",
        KCONTENTFRAME = "k-content-frame",
        TEMPLATE = '<div class="k-widget k-tooltip" style="margin-left:0.5em"><div class="k-tooltip-content"></div>' +
                '#if (callout){ #<div class="k-callout k-callout-#=dir#"></div>#}#' +
            '</div>',
        IFRAMETEMPLATE = kendo.template(
        "<iframe frameborder='0' class='" + KCONTENTFRAME + "' " +
                "src='#= content.url #'>" +
                    "This page requires frames in order to show content" +
        "</iframe>"),
        NS = ".kendoTooltip",
        POSITIONS = {
            below: {
                origin: "bottom center",
                position: "top center"
            },
            over: {
                origin: "top center",
                position: "bottom center"
            },
            left: {
                origin: "center left",
                position: "center right",
                collision: "fit flip"
            },
            right: {
                origin: "center right",
                position: "center left",
                collision: "fit flip"
            },
            center: {
                position: "top center",
                origin: "center center"
            }
        },
        DIRCLASSES = {
            bellow: "n",
            over: "s",
            left: "e",
            right: "w",
            center: "n"
        };

    function restoreTitle(element) {
        while(element.length) {
            restoreTitleAttributeForElement(element);
            element = element.parent();
        }
    }

    function restoreTitleAttributeForElement(element) {
        var title = element.data(kendo.ns + "title");
        if (title) {
            element.attr("title", title);
            element.removeData(kendo.ns + "title");
        }
    }

    function saveTitleAttributeForElement(element) {
        var title = element.attr("title");
        if (title) {
            element.data(kendo.ns + "title", title);
            element.removeAttr("title");
        }
    }

    function saveTitleAttributes(element) {
        while(element.length) {
            saveTitleAttributeForElement(element);
            element = element.parent();
        }
    }

    var Tooltip = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element
                .on("mouseenter" + NS, that.options.filter, proxy(that._mouseenter, that))
                .on("mouseleave" + NS, that.options.filter, proxy(that._mouseleave, that));
        },

        options: {
            name: "Tooltip",
            filter: "",
            content: "",
            showAfter: 100,
            callout: true
        },

        events: [ SHOW, HIDE, CONTENTLOAD, ERROR ],

        _mouseenter: function(e) {
            var that = this;

            clearTimeout(that.timeout);

            that.timeout = setTimeout(function() {
                that.show($(e.currentTarget));
            }, that.options.showAfter);
        },

        _appendContent: function(target) {
            var that = this,
                contentOptions = that.options.content,
                element = that.content,
                showIframe = that.options.iframe,
                iframe;

            if (isPlainObject(contentOptions) && contentOptions.url) {
                if (!("iframe" in that.options)) {
                    showIframe = !isLocalUrl(contentOptions.url);
                }

                if (!showIframe) {
                    element.empty();
                    kendo.ui.progress(element, true);
                    // perform AJAX request
                    that._ajaxRequest(contentOptions);
                } else {
                    element.hide();

                    iframe = element.find("." + KCONTENTFRAME)[0];

                    if (iframe) {
                        // refresh existing iframe
                        iframe.src = contentOptions.url || iframe.src;
                    } else {
                        element.html(IFRAMETEMPLATE({ content: contentOptions }));
                    }

                    element.find("." + KCONTENTFRAME)
                        .unbind("load" + NS)
                        .on("load" + NS, function(){
                            that.trigger(CONTENTLOAD);
                            element.show();
                        });
                }
            } else if (contentOptions && isFunction(contentOptions)) {
                contentOptions = contentOptions({ element: target });
                that.content.html(contentOptions);
            } else {
                that.content.html(contentOptions);
            }
        },

        _ajaxRequest: function(options) {
            var that = this;

            jQuery.ajax(extend({
                type: "GET",
                dataType: "html",
                cache: false,
                error: function (xhr, status) {
                    kendo.ui.progress(that.content, false);

                    that.trigger(ERROR, { status: status, xhr: xhr });
                },
                success: proxy(function (data) {
                    kendo.ui.progress(that.content, false);

                    that.content.html(data);

                    that.trigger(CONTENTLOAD);
                }, that)
            }, options));
        },

        show: function(target) {
            var that = this,
                current = that.target();

            if (!that.popup) {
                that._initPopup();
            }

            if (current && current[0] != target[0]) {
                that.popup.close();
            }

            if (!current || current[0] != target[0]) {
                that._appendContent(target);

                that.popup.options.anchor = target;
            }

            saveTitleAttributes(target);

            that.popup.one("deactivate", function() {
                restoreTitle(target);
            });

            that.popup.open();
        },

        _initPopup: function() {
            var that = this,
                options = that.options,
                wrapper = $(kendo.template(TEMPLATE)({
                    callout: options.callout,
                    dir: DIRCLASSES[options.position]
                }));

            that.popup = new Popup(wrapper, extend({
                open: function() {
                    that.trigger(SHOW);
                },
                close: function() {
                    that.trigger(HIDE);
                }
            }, POSITIONS[options.position]));

            wrapper.css({
                width: options.width,
                height: options.height
            });

            that.content = wrapper.find(".k-tooltip-content");

            wrapper.on("mouseleave" + NS, proxy(that._mouseleave, that));
        },

        _mouseleave: function(e) {
            if (this.popup) {
                var element = $(e.currentTarget),
                    offset = element.offset(),
                    pageX = e.pageX,
                    pageY = e.pageY;

                offset.right = offset.left + element.outerWidth();
                offset.bottom = offset.top + element.outerHeight();

                if (pageX > offset.left && pageX < offset.right && pageY > offset.top && pageY < offset.bottom) {
                    return;
                }

                this.popup.close();
            }
            clearTimeout(this.timeout);
        },

        target: function() {
            if (this.popup) {
                return this.popup.options.anchor;
            }
            return null;
        },

        destroy: function() {
            var popup = this.popup;

            if (popup) {
                popup.element.off(NS);
                popup.destroy();
            }

            this.element.off(NS);

            Widget.fn.destroy.call(this);
        }
    });

    kendo.ui.plugin(Tooltip);
})(window.kendo.jQuery);
