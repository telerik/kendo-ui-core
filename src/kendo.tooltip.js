(function(f, define){
    define([ "./kendo.core", "./kendo.popup" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "tooltip",
    name: "Tooltip",
    category: "web",
    description: "The Tooltip widget displays a popup hint for a given html element.",
    depends: [ "core", "popup" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Popup = kendo.ui.Popup,
        isFunction = kendo.isFunction,
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
        TEMPLATE = '<div role="tooltip" class="k-widget k-tooltip#if (!autoHide) {# k-tooltip-closable#}#">#if (!autoHide) {# <div class="k-tooltip-button"><a href="\\#" class="k-icon k-i-close">close</a></div> #}#' +
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
            "horizontal": { offset: "top", size: "outerHeight" },
            "vertical": { offset: "left", size: "outerWidth" }
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
            element.attr("title", "");
        }
    }

    function saveTitleAttributes(element) {
        while(element.length && !element.is("body")) {
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

            that._documentKeyDownHandler = proxy(that._documentKeyDown, that);

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
            width: null,
            height: null,
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 0
                },
                close: {
                    effects: "fade:out",
                    duration: 40,
                    hide: true
                }
            }
        },

        events: [ SHOW, HIDE, CONTENTLOAD, ERROR, REQUESTSTART ],

        _mouseenter: function(e) {
            saveTitleAttributes($(e.currentTarget));
        },

        _showOn: function(e) {
            var that = this;

            var currentTarget = $(e.currentTarget);
            if (that.options.showOn && that.options.showOn.match(/click|focus/)) {
                that._show(currentTarget);
            } else {
                clearTimeout(that.timeout);

                that.timeout = setTimeout(function() {
                    that._show(currentTarget);
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

                that.trigger(REQUESTSTART, { options: contentOptions, target: target });

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
                        .off("load" + NS)
                        .on("load" + NS, function(){
                            that.trigger(CONTENTLOAD);
                            element.show();
                        });
                }
            } else if (contentOptions && isFunction(contentOptions)) {
                contentOptions = contentOptions({ sender: this, target: target });
                element.html(contentOptions || "");
            } else {
                element.html(contentOptions);
            }

            that.angular("compile", function(){
                return { elements: element };
            });
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

        _documentKeyDown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                this.hide();
            }
        },

        refresh: function() {
            var that = this,
                popup = that.popup;

            if (popup && popup.options.anchor) {
                that._appendContent(popup.options.anchor);
            }
        },

        hide: function() {
            if (this.popup) {
                this.popup.close();
            }
        },

        show: function(target) {
            target = target || this.element;

            saveTitleAttributes(target);
            this._show(target);
        },

        _show: function(target) {
            var that = this,
                current = that.target();

            if (!that.popup) {
                that._initPopup();
            }

            if (current && current[0] != target[0]) {
                that.popup.close();
                that.popup.element.kendoStop(true, true);// animation can be too long to hide the element before it is shown again
            }

            if (!current || current[0] != target[0]) {
                that._appendContent(target);
                that.popup.options.anchor = target;
            }

            that.popup.one("deactivate", function() {
                restoreTitle(target);
                target.removeAttr(DESCRIBEDBY);

                this.element
                    .removeAttr("id")
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
                copyAnchorStyles: false,
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
                wrapper.on("click" + NS, ".k-tooltip-button", proxy(that._closeButtonClick, that));
            }
        },

        _closeButtonClick: function(e) {
            e.preventDefault();
            this.hide();
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
                arrowBorder = parseInt(that.arrow.css("border-top-width"), 10),
                elementOffset = $(popup.element).offset(),
                cssClass = DIRCLASSES[popup.flipped ? REVERSE[position] : position],
                offsetAmount = anchorOffset[offset] - elementOffset[offset] + ($(anchor)[dimensions.size]() / 2) - arrowBorder;

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

            clearTimeout(this.timeout);

            this.element.off(NS);

            DOCUMENT.off("keydown" + NS, this._documentKeyDownHandler);

            Widget.fn.destroy.call(this);
        }
    });

    kendo.ui.plugin(Tooltip);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
