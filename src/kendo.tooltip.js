import "./kendo.core.js";
import "./kendo.popup.js";
import "./kendo.fx.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "tooltip",
    name: "Tooltip",
    category: "web",
    description: "The Tooltip widget displays a popup hint for a given html element.",
    depends: [ "core", "popup", "icons" ],
    features: [ {
        id: "tooltip-fx",
        name: "Animation",
        description: "Support for animation",
        depends: [ "fx" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Popup = kendo.ui.Popup,
        isFunction = kendo.isFunction,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        DOCUMENT = $(document),
        isLocalUrl = kendo.isLocalUrl,
        ARIAIDSUFFIX = "_tb_active",
        DESCRIBEDBY = "aria-describedby",
        SHOW = "show",
        HIDE = "hide",
        ERROR = "error",
        CONTENTLOAD = "contentLoad",
        REQUESTSTART = "requestStart",
        KCONTENTFRAME = "k-content-frame",
        TEMPLATE = ({ autoHide, callout, dir }) =>
            `<div role="tooltip" class="k-widget k-tooltip${!autoHide ? ' k-tooltip-closable' : ''}">` +
                '<div class="k-tooltip-content"></div>' +
                (!autoHide ? `<div class="k-tooltip-button">${kendo.ui.icon($('<a href="#" title="Close"></a>'), { icon: "x" })}</div>` : '') +
                (callout ? `<div class="k-callout k-callout-${dir}"></div>` : '') +
            '</div>',
        IFRAMETEMPLATE = kendo.template(({ content }) =>
            `<iframe frameborder='0' class='${KCONTENTFRAME}' src='${content.url}'>` +
                "This page requires frames in order to show content" +
            "</iframe>"
        ),
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
        while (element.length) {
            if (restoreTitleAttributeForElement(element)) {
                break;
            }
            element = element.parent();
        }
    }

    function restoreTitleAttributeForElement(element) {
        var title = element.data(kendo.ns + "title");
        if (title) {
            element.attr("title", title);
            element.removeData(kendo.ns + "title");
            return true;
        }
    }

    function saveTitleAttributeForElement(element) {
        var title = element.attr("title");
        if (title) {
            element.data(kendo.ns + "title", title);
            element.attr("title", "");
            return true;
        }
    }

    function saveTitleAttributes(element) {
        while (element.length && !element.is("body")) {
            if (saveTitleAttributeForElement(element)) {
                break;
            }
            element = element.parent();
        }
    }

    var TooltipBase = Widget.extend({
        init: function(element, options) {
            var that = this,
                axis;

            Widget.fn.init.call(that, element, options);

            axis = that.options.position.match(/left|right/) ? "horizontal" : "vertical";

            that.dimensions = DIMENSIONS[axis];

            if (kendo.support.touch && this._isShownOnMouseEnter()) {
                that.element.on(kendo.support.mousedown + NS, that.options.filter, that._showOn.bind(that));
            }

            that.element.on(that.options.showOn + NS, that.options.filter, that._showOn.bind(that));

            if (that.options.showOn === "click") {
                that.element.on("keydown" + NS, that.options.filter, that._keydown.bind(that));
            }
        },

        options: {
            name: "TooltipBase",
            filter: "",
            offset: 0,
            showAfter: 100,
            hideAfter: 100,
            callout: true,
            position: "bottom",
            showOn: "mouseenter",
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 0
                },
                close: {
                    duration: 40,
                    hide: true
                }
            }
        },

        destroy: function() {
            var popup = this.popup;

            if (popup) {
                popup.element.off(NS);
                popup.destroy();
            }

            clearTimeout(this.timeout);

            Widget.fn.destroy.call(this);
        },

        hide: function() {
            if (this.popup) {
                this.popup.close();
            }
        },

        show: function(target) {
            target = target || this.element;

            this._saveTitle(target);
            this._show(target);
        },

        target: function() {
            if (this.popup) {
                return this.popup.options.anchor;
            }
            return null;
        },

        _keydown: function(e) {
            var currentTarget = $(e.currentTarget);

            if (e.keyCode == kendo.keys.ENTER) {
                this._show(currentTarget);
            }
        },

        _showOn: function(e) {
            var that = this;

            var currentTarget = $(e.currentTarget);
            if (that._isShownOnClick() && !that._isShownOnMouseEnter()) {
                that._show(currentTarget);
            } else if (that._isShownOnFocus()) {
                that._saveTitle(currentTarget);
                that._show(currentTarget);
            } else {
                clearTimeout(that.timeout);

                that.timeout = setTimeout(function() {
                    that._show(currentTarget);
                }, that.options.showAfter);
            }
        },

        _isShownOnFocus: function() {
            return this.options.showOn && this.options.showOn.match(/focus/);
        },

        _isShownOnMouseEnter: function() {
            return this.options.showOn && this.options.showOn.match(/mouseenter/);
        },

        _isShownOnClick: function() {
            return this.options.showOn && this.options.showOn.match(/click/);
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

            that._offset(position, that.options.offset);

            that.arrow
               .removeClass("k-callout-n k-callout-s k-callout-w k-callout-e")
               .addClass("k-callout-" + cssClass)
               .css(offset, offsetAmount);
        },

        _offset: function(position, offsetAmount, arrowWidth) {
            var that = this,
                isTopLeft = position == "top" || position == "left",
                isFlipped = that.popup.flipped,
                direction = (isTopLeft && isFlipped) || (!isTopLeft && !isFlipped) ? 1 : -1,
                marginRule = isTopLeft ? "margin-" + position : "margin-" + REVERSE[position],
                offset = ((arrowWidth || kendo._outerWidth(that.arrow)) / 2) + offsetAmount;

            that.popup.wrapper.css(marginRule, offset * direction + "px");
        },

        _addDescribedBy: function() {
            var that = this,
                anchor = that.popup.options.anchor,
                ariaId = anchor[0].id || that.element[0].id || kendo.guid(),
                describedBy = [];

            if (anchor.attr(DESCRIBEDBY)) {
                describedBy.push(anchor.attr(DESCRIBEDBY));
            }

            if (ariaId) {
                describedBy.push(ariaId + ARIAIDSUFFIX);
                anchor.attr(DESCRIBEDBY, describedBy.join(" "));
                that.popup.element.attr("id", ariaId + ARIAIDSUFFIX);
            }

        },

        _removeDescribedBy: function(target) {
            var tooltipId = this.popup.element.attr("id"),
                currentDescribedBy = target.attr(DESCRIBEDBY),
                arrayAttr, finalArray, finalDescribedbyAttr;

            if (!currentDescribedBy) {
                return;
            }

            arrayAttr = currentDescribedBy.split(" ");

            if (arrayAttr && arrayAttr.length > 0) {
                finalArray = arrayAttr.filter(function(val) {
                    return val !== tooltipId;
                });
            }

            if (finalArray && finalArray.length > 0) {
                finalDescribedbyAttr = finalArray.join(" ");
                target.attr(DESCRIBEDBY, finalDescribedbyAttr);
            } else {
                target.removeAttr(DESCRIBEDBY);
            }
        },

        _openPopup: function() {
            if (!this.popup) {
                return;
            }

            this.popup._hovered = true;
            this.popup.open();
        }
    });
    kendo.ui.plugin(TooltipBase);

    var Tooltip = TooltipBase.extend({
        init: function(element, options) {
            var that = this,
                axis;

            TooltipBase.fn.init.call(that, element, options);

            axis = that.options.position.match(/left|right/) ? "horizontal" : "vertical";

            that.dimensions = DIMENSIONS[axis];

            that._documentKeyDownHandler = that._documentKeyDown.bind(that);

            if (this._isShownOnMouseEnter() || this._isShownOnClick()) {
                that.element.on("mouseenter" + NS, that.options.filter, that._mouseenter.bind(that));
            }

            if (this.options.autoHide && this._isShownOnMouseEnter()) {
                that.element.on("mouseleave" + NS, that.options.filter, that._mouseleave.bind(that));
            }

            if (this.options.autoHide && this._isShownOnFocus()) {
                that.element.on("blur" + NS, that.options.filter, that._blur.bind(that));
            }

            if (kendo.support.touch) {
                that.element.on(kendo.support.mousedown + NS, that.options.filter, that._mouseenter.bind(that));
            }
        },

        options: {
            name: "Tooltip",
            filter: "",
            content: DEFAULTCONTENT,
            showAfter: 100,
            callout: true,
            offset: 0,
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
                    duration: 40,
                    hide: true
                }
            }
        },

        events: [ SHOW, HIDE, CONTENTLOAD, ERROR, REQUESTSTART ],

        _mouseenter: function(e) {
            saveTitleAttributes($(e.currentTarget));
        },

        _saveTitle: function(target) {
            saveTitleAttributes(target);
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
                        .on("load" + NS, function() {
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

            that.angular("compile", function() {
                return { elements: element };
            });
        },

        _ajaxRequest: function(options) {
            var that = this,
                successFn = function(data) {
                    kendo.ui.progress(that.content, false);

                    that.content.html(data);

                    if (kendo._outerHeight(that.popup.element) > kendo._outerHeight(that.popup.wrapper)) {
                        that.popup.wrapper.css("height", kendo._outerHeight(that.popup.element) + "px");
                        that.popup.position();
                        that._positionCallout();
                    }

                    that.trigger(CONTENTLOAD);
                };

            jQuery.ajax(extend({
                type: "GET",
                dataType: "html",
                cache: false,
                error: function(xhr, status) {
                    kendo.ui.progress(that.content, false);

                    that.trigger(ERROR, { status: status, xhr: xhr });
                },
                success: successFn.bind(that)
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

                that._removeDescribedBy(target);

                this.element
                    .removeAttr("id")
                    .attr("aria-hidden", true);

                DOCUMENT.off("keydown" + NS, that._documentKeyDownHandler);
            });

            that._openPopup();
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
                autosize: true,
                activate: function() {
                    that._addDescribedBy();

                    if (options.callout) {
                        that._positionCallout();
                    } else {
                        that._offset(that.options.position, that.options.offset);
                    }

                    this.element.removeAttr("aria-hidden");

                    DOCUMENT.on("keydown" + NS, that._documentKeyDownHandler);

                    that.trigger(SHOW);
                    that.popup._hovered = undefined;
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

            if (options.autoHide && this._isShownOnMouseEnter()) {
                wrapper.on("mouseleave" + NS, that._mouseleave.bind(that));
            } else {
                wrapper.on("click" + NS, ".k-tooltip-button", that._closeButtonClick.bind(that));
            }
        },

        _closeButtonClick: function(e) {
            e.preventDefault();
            this.hide();
        },

        _mouseleave: function(e) {
            var that = this;

            clearTimeout(that.timeout);

            that.timeout = setTimeout(function() {
                that._closePopup(e.currentTarget);
            }, that.options.hideAfter);
        },

        _blur: function(e) {
            this._closePopup(e.currentTarget);
        },

        _closePopup: function(target) {
            if (this.popup && !this.popup._hovered) {
                this.popup.close();
            } else {
                restoreTitle($(target));
            }
        },

        destroy: function() {
            this.element.off(NS);

            DOCUMENT.off("keydown" + NS, this._documentKeyDownHandler);

            TooltipBase.fn.destroy.call(this);
        }
    });

    kendo.ui.plugin(Tooltip);
})(window.kendo.jQuery);

