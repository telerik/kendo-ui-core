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
        DOCUMENT = $(document),
        isLocalUrl = kendo.isLocalUrl,
        ARIAIDSUFFIX = "_tt_active",
        DESCRIBEDBY = "aria-describedby",
        SHOW = "show",
        HIDE = "hide",
        ERROR = "error",
        CONTENTLOAD = "contentLoad",
        REQUESTSTART = "requestStart",
        KCONTENTFRAME = "k-content-frame",
        TEMPLATE = '<div role="tooltip" class="k-widget k-tooltip" style="margin-left:0.5em">#if (!autoHide) {# <div class="k-tooltip-button"><a href="\\#">close</a></div> #}#' +
                '<div class="k-tooltip-content"></div>' +
                '#if (callout){ #<div class="k-callout k-callout-#=dir#"></div>#}#' +
            '</div>',
        IFRAMETEMPLATE = kendo.template(
        "<iframe frameborder='0' class='" + KCONTENTFRAME + "' " +
                "src='#= content.url #'>" +
                    "This page requires frames in order to show content" +
        "</iframe>"),
        NS = ".kendoTooltip",
        POSITIONS = {
            bottom: {
                origin: "bottom center",
                position: "top center"
            },
            top: {
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
                position: "center center",
                origin: "center center"
            }
        },
        REVERSE = {
            "top": "bottom",
            "bottom": "top",
            "left": "right",
            "right": "left",
            "center": "center"
        },
        DIRCLASSES = {
            bottom: "n",
            top: "s",
            left: "e",
            right: "w",
            center: "n"
        },
        DIMENSIONS = {
            "horizontal": { offset: "top", size: "height" },
            "vertical": { offset: "left", size: "width" }
        },
        DEFAULTCONTENT = function(e) {
            return e.target.data(kendo.ns + "title");
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
            var that = this,
                axis;

            Widget.fn.init.call(that, element, options);

            axis = that.options.position.match(/left|right/) ? "horizontal" : "vertical";

            that.dimensions = DIMENSIONS[axis];

            that._documentKeyDownHandler = proxy(that.hide, that);

            that.element
                .on(that.options.showOn + NS, that.options.filter, proxy(that._showOn, that))
                .on("mouseenter" + NS, that.options.filter, proxy(that._mouseenter, that));

            if (this.options.autoHide) {
                that.element.on("mouseleave" + NS, that.options.filter, proxy(that._mouseleave, that));
            }
        },

        options: {
            name: "Tooltip",
            filter: "",
            content: DEFAULTCONTENT,
            showAfter: 100,
            callout: true,
            position: "bottom",
            showOn: "mouseenter",
            autoHide: true,
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 0
                },
                close: {
                    effects: "fade:out",
                    duration: 100
                }
            }
        },

        events: [ SHOW, HIDE, CONTENTLOAD, ERROR, REQUESTSTART ],

        _mouseenter: function(e) {
            saveTitleAttributes($(e.currentTarget));
        },

        _showOn: function(e) {
            var that = this;

            if (that.options.showOn && that.options.showOn.match(/click|focus/)) {
                that.show($(e.currentTarget));
            } else {
                clearTimeout(that.timeout);

                that.timeout = setTimeout(function() {
                    that.show($(e.currentTarget));
                }, that.options.showAfter);
            }
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

                    contentOptions.data = contentOptions.data || {};
                    that.trigger(REQUESTSTART, { data: contentOptions.data, target: target });

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
                        .off("load" + NS)
                        .on("load" + NS, function(){
                            that.trigger(CONTENTLOAD);
                            element.show();
                        });
                }
            } else if (contentOptions && isFunction(contentOptions)) {
                contentOptions = contentOptions({ target: target });
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

        hide: function() {
            if (this.popup) {
                this.popup.close();
            }
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

            that.popup.one("deactivate", function() {
                restoreTitle(target);
                target.removeAttr(DESCRIBEDBY);

                this.element.removeAttr("id")
                    .attr("aria-hidden", true);

                DOCUMENT.off("keydown" + NS, that._documentKeyDownHandler);
            });

            that.popup.open();
        },

        _initPopup: function() {
            var that = this,
                options = that.options,
                wrapper = $(kendo.template(TEMPLATE)({
                    callout: options.callout && options.position !== "center",
                    dir: DIRCLASSES[options.position],
                    autoHide: options.autoHide
                }));

            that.popup = new Popup(wrapper, extend({
                activate: function() {
                    var anchor = this.options.anchor,
                        ariaId = anchor[0].id || that.element[0].id;

                    if (ariaId) {
                        anchor.attr(DESCRIBEDBY, ariaId + ARIAIDSUFFIX);
                        this.element.attr("id", ariaId + ARIAIDSUFFIX);
                    }

                    if (options.callout) {
                        that._positionCallout();
                    }

                    this.element.removeAttr("aria-hidden");

                    DOCUMENT.on("keydown" + NS, that._documentKeyDownHandler);

                    that.trigger(SHOW);
                },
                close: function() {
                    that.trigger(HIDE);
                },
                animation: options.animation
            }, POSITIONS[options.position]));

            wrapper.css({
                width: options.width,
                height: options.height
            });

            that.content = wrapper.find(".k-tooltip-content");
            that.arrow = wrapper.find(".k-callout");

            if (options.autoHide) {
                wrapper.on("mouseleave" + NS, proxy(that._mouseleave, that));
            } else {
                wrapper.on("click" + NS, ".k-tooltip-button", proxy(that.hide, that));
            }
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
            } else {
                restoreTitle($(e.currentTarget));
            }
            clearTimeout(this.timeout);
        },

        _positionCallout: function() {
            var that = this,
                position = that.options.position,
                dimensions = that.dimensions,
                offset = dimensions.offset,
                popup = that.popup,
                anchor = popup.options.anchor,
                anchorOffset = $(anchor).offset(),
                elementOffset = $(popup.element).offset(),
                cssClass = DIRCLASSES[popup.flipped ? REVERSE[position] : position],
                offsetAmount = anchorOffset[offset] - elementOffset[offset] + ($(anchor)[dimensions.size]() / 2);

           that.arrow
               .removeClass("k-callout-n k-callout-s k-callout-w k-callout-e")
               .addClass("k-callout-" + cssClass)
               .css(offset, offsetAmount);
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

            DOCUMENT.off("keydown" + NS, this._documentKeyDownHandler);

            Widget.fn.destroy.call(this);
        }
    });

    kendo.ui.plugin(Tooltip);
})(window.kendo.jQuery);
