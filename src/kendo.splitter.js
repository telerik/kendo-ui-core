(function(f, define){
    define([ "./kendo.resizable" ], f);
})(function(){

var __meta__ = {
    id: "splitter",
    name: "Splitter",
    category: "web",
    description: "The Splitter widget provides an easy way to create a dynamic layout of resizable and collapsible panes.",
    depends: [ "resizable" ]
};

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        extend = $.extend,
        proxy = $.proxy,
        Widget = ui.Widget,
        pxUnitsRegex = /^\d+(\.\d+)?px$/i,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        NS = ".kendoSplitter",
        EXPAND = "expand",
        COLLAPSE = "collapse",
        CONTENTLOAD = "contentLoad",
        ERROR = "error",
        RESIZE = "resize",
        LAYOUTCHANGE = "layoutChange",
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        MOUSEENTER = "mouseenter",
        CLICK = "click",
        PANE = "pane",
        MOUSELEAVE = "mouseleave",
        FOCUSED = "k-state-focused",
        KPANE = "k-" + PANE,
        PANECLASS = "." + KPANE;

    function isPercentageSize(size) {
        return percentageUnitsRegex.test(size);
    }

    function isPixelSize(size) {
        return pxUnitsRegex.test(size) || /^\d+$/.test(size);
    }

    function isFluid(size) {
        return !isPercentageSize(size) && !isPixelSize(size);
    }

    function calculateSize(size, total) {
        var output = parseInt(size, 10);

        if (isPercentageSize(size)) {
            output = Math.floor(output * total / 100);
        }

        return output;
    }

    function panePropertyAccessor(propertyName, triggersResize) {
        return function(pane, value) {
            var paneConfig = this.element.find(pane).data(PANE);

            if (arguments.length == 1) {
                return paneConfig[propertyName];
            }

            paneConfig[propertyName] = value;

            if (triggersResize) {
                var splitter = this.element.data("kendo" + this.options.name);
                splitter.resize(true);
            }
        };
    }

    var Splitter = Widget.extend({
        init: function(element, options) {
            var that = this,
                isHorizontal;

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            isHorizontal = that.options.orientation.toLowerCase() != VERTICAL;
            that.orientation = isHorizontal ? HORIZONTAL : VERTICAL;
            that._dimension = isHorizontal ? "width" : "height";
            that._keys = {
                decrease: isHorizontal ? keys.LEFT : keys.UP,
                increase: isHorizontal ? keys.RIGHT : keys.DOWN
            };

            that._resizeStep = 10;

            that._marker = kendo.guid().substring(0, 8);

            that._initPanes();

            that.resizing = new PaneResizing(that);

            that.element.triggerHandler("init" + NS);
        },
        events: [
            EXPAND,
            COLLAPSE,
            CONTENTLOAD,
            ERROR,
            RESIZE,
            LAYOUTCHANGE
        ],

        _addOverlays: function() {
            this._panes().append("<div class='k-splitter-overlay k-overlay' />");
        },

        _removeOverlays: function() {
            this._panes().children(".k-splitter-overlay").remove();
        },

        _attachEvents: function() {
            var that = this,
                orientation = that.options.orientation;

            // do not use delegated events to increase performance of nested elements
            that.element
                .children(".k-splitbar-draggable-" + orientation)
                    .on("keydown" + NS, proxy(that._keydown, that))
                    .on("mousedown" + NS, function(e) { e.currentTarget.focus(); })
                    .on("focus" + NS, function(e) { $(e.currentTarget).addClass(FOCUSED);  })
                    .on("blur" + NS, function(e) { $(e.currentTarget).removeClass(FOCUSED);
                        if (that.resizing) {
                            that.resizing.end();
                        }
                    })
                    .on(MOUSEENTER + NS, function() { $(this).addClass("k-splitbar-" + that.orientation + "-hover"); })
                    .on(MOUSELEAVE + NS, function() { $(this).removeClass("k-splitbar-" + that.orientation + "-hover"); })
                    .on("mousedown" + NS, proxy(that._addOverlays, that))
                .end()
                .children(".k-splitbar")
                    .on("dblclick" + NS, proxy(that._togglePane, that))
                    .children(".k-collapse-next, .k-collapse-prev").on(CLICK + NS, that._arrowClick(COLLAPSE)).end()
                    .children(".k-expand-next, .k-expand-prev").on(CLICK + NS, that._arrowClick(EXPAND)).end()
                .end();

            $(window)
                .on("resize" + NS + that._marker, proxy(that.resize, that))
                .on("mouseup" + NS + that._marker, proxy(that._removeOverlays, that));
        },

        _detachEvents: function() {
            var that = this;

            that.element
                .children(".k-splitbar-draggable-" + that.orientation).off(NS).end()
                .children(".k-splitbar").off("dblclick" + NS)
                    .children(".k-collapse-next, .k-collapse-prev, .k-expand-next, .k-expand-prev").off(NS);

            $(window).off("resize" + NS + that._marker);
        },

        options: {
            name: "Splitter",
            orientation: HORIZONTAL,
            panes: []
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this._detachEvents();

            if (this.resizing) {
                this.resizing.destroy();
            }

            kendo.destroy(this.element);

            this.wrapper = this.element = null;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                resizing = that.resizing,
                target = $(e.currentTarget),
                navigationKeys = that._keys,
                increase = key === navigationKeys.increase,
                decrease = key === navigationKeys.decrease,
                pane;

            if (increase || decrease) {
                if (e.ctrlKey) {
                    pane = target[decrease ? "next" : "prev"]();

                    if (resizing && resizing.isResizing()) {
                        resizing.end();
                    }

                    if (!pane[that._dimension]()) {
                        that._triggerAction(EXPAND, pane);
                    } else {
                        that._triggerAction(COLLAPSE, target[decrease ? "prev" : "next"]());
                    }
                } else if (resizing) {
                    resizing.move((decrease ? -1 : 1) * that._resizeStep, target);
                }
                e.preventDefault();
            } else if (key === keys.ENTER && resizing) {
                resizing.end();
                e.preventDefault();
            }
        },

        _initPanes: function() {
            var panesConfig = this.options.panes || [];
            var that = this;

            this.element
                .addClass("k-widget").addClass("k-splitter")
                .children()
                    .each(function(i, pane) {
                        if (pane.nodeName.toLowerCase() != "script") {
                            that._initPane(pane, panesConfig[i]);
                        }
                    });

            this.resize();
        },

        _initPane: function(pane, config) {
            pane = $(pane)
                .attr("role", "group")
                .addClass(KPANE);

            pane.data(PANE, config ? config : {})
                .toggleClass("k-scrollable", config ? config.scrollable !== false : true);

            this.ajaxRequest(pane);
        },

        ajaxRequest: function(pane, url, data) {
            var that = this,
                paneConfig;

            pane = that.element.find(pane);
            paneConfig = pane.data(PANE);

            url = url || paneConfig.contentUrl;

            if (url) {
                pane.append("<span class='k-icon k-loading k-pane-loading' />");

                if (kendo.isLocalUrl(url)) {
                    jQuery.ajax({
                        url: url,
                        data: data || {},
                        type: "GET",
                        dataType: "html",
                        success: function (data) {
                            that.angular("cleanup", function(){ return { elements: pane.get() }; });
                            pane.html(data);
                            that.angular("compile", function(){ return { elements: pane.get() }; });

                            that.trigger(CONTENTLOAD, { pane: pane[0] });
                        },
                        error: function (xhr, status) {
                            that.trigger(ERROR, {
                                pane: pane[0],
                                status: status,
                                xhr: xhr
                            });
                        }
                    });
                } else {
                    pane.removeClass("k-scrollable")
                        .html("<iframe src='" + url + "' frameborder='0' class='k-content-frame'>" +
                                "This page requires frames in order to show content" +
                              "</iframe>");
                }
            }
        },

        _triggerAction: function(type, pane) {
            if (!this.trigger(type, { pane: pane[0] })) {
                this[type](pane[0]);
            }
        },

        _togglePane: function(e) {
            var that = this,
                target = $(e.target),
                arrow;

            if (target.closest(".k-splitter")[0] != that.element[0]) {
                return;
            }

            arrow = target.children(".k-icon:not(.k-resize-handle)");

            if (arrow.length !== 1) {
                return;
            }

            if (arrow.is(".k-collapse-prev")) {
                that._triggerAction(COLLAPSE, target.prev());
            } else if (arrow.is(".k-collapse-next")) {
                that._triggerAction(COLLAPSE, target.next());
            } else if (arrow.is(".k-expand-prev")) {
                that._triggerAction(EXPAND, target.prev());
            } else if (arrow.is(".k-expand-next")) {
                that._triggerAction(EXPAND, target.next());
            }
        },
        _arrowClick: function (arrowType) {
            var that = this;

            return function(e) {
                var target = $(e.target),
                    pane;

                if (target.closest(".k-splitter")[0] != that.element[0]) {
                    return;
                }

                if (target.is(".k-" + arrowType + "-prev")) {
                    pane = target.parent().prev();
                } else {
                    pane = target.parent().next();
                }
                that._triggerAction(arrowType, pane);
            };
        },
        _updateSplitBar: function(splitbar, previousPane, nextPane) {
            var catIconIf = function(iconType, condition) {
                   return condition ? "<div class='k-icon " + iconType + "' />" : "";
                },
                orientation = this.orientation,
                draggable = (previousPane.resizable !== false) && (nextPane.resizable !== false),
                prevCollapsible = previousPane.collapsible,
                prevCollapsed = previousPane.collapsed,
                nextCollapsible = nextPane.collapsible,
                nextCollapsed = nextPane.collapsed;

            splitbar.addClass("k-splitbar k-state-default k-splitbar-" + orientation)
                    .attr("role", "separator")
                    .attr("aria-expanded", !(prevCollapsed || nextCollapsed))
                    .removeClass("k-splitbar-" + orientation + "-hover")
                    .toggleClass("k-splitbar-draggable-" + orientation,
                        draggable && !prevCollapsed && !nextCollapsed)
                    .toggleClass("k-splitbar-static-" + orientation,
                        !draggable && !prevCollapsible && !nextCollapsible)
                    .html(
                        catIconIf("k-collapse-prev", prevCollapsible && !prevCollapsed && !nextCollapsed) +
                        catIconIf("k-expand-prev", prevCollapsible && prevCollapsed && !nextCollapsed) +
                        catIconIf("k-resize-handle", draggable) +
                        catIconIf("k-collapse-next", nextCollapsible && !nextCollapsed && !prevCollapsed) +
                        catIconIf("k-expand-next", nextCollapsible && nextCollapsed && !prevCollapsed)
                    );

            if (!draggable && !prevCollapsible && !nextCollapsible) {
                splitbar.removeAttr("tabindex");
            }
        },
        _updateSplitBars: function() {
            var that = this;

            this.element.children(".k-splitbar").each(function() {
                var splitbar = $(this),
                    previousPane = splitbar.prevAll(PANECLASS).first().data(PANE),
                    nextPane = splitbar.nextAll(PANECLASS).first().data(PANE);

                if (!nextPane) {
                    return;
                }

                that._updateSplitBar(splitbar, previousPane, nextPane);
            });
        },
        _removeSplitBars: function() {
            this.element.children(".k-splitbar").remove();
        },
        _panes: function() {
            if (!this.element) {
                return $();
            }
            return this.element.children(PANECLASS);
        },

        _resize: function() {
            var that = this,
                element = that.element,
                panes = element.children(PANECLASS),
                isHorizontal = that.orientation == HORIZONTAL,
                splitBars = element.children(".k-splitbar"),
                splitBarsCount = splitBars.length,
                sizingProperty = isHorizontal ? "width" : "height",
                totalSize = element[sizingProperty]();

            if (splitBarsCount === 0) {
                splitBarsCount = panes.length - 1;
                panes.slice(0, splitBarsCount)
                     .after("<div tabindex='0' class='k-splitbar' data-marker='" + that._marker + "' />");

                that._updateSplitBars();
                splitBars = element.children(".k-splitbar");
            } else {
                that._updateSplitBars();
            }

            // discard splitbar sizes from total size
            splitBars.each(function() {
                totalSize -= this[isHorizontal ? "offsetWidth" : "offsetHeight"];
            });

            var sizedPanesWidth = 0,
                sizedPanesCount = 0,
                freeSizedPanes = $();

            panes.css({ position: "absolute", top: 0 })
                [sizingProperty](function() {
                    var element = $(this),
                        config = element.data(PANE) || {}, size;

                    element.removeClass("k-state-collapsed");
                    if (config.collapsed) {
                        size = config.collapsedSize ? calculateSize(config.collapsedSize, totalSize) : 0;
                        element.css("overflow", "hidden").addClass("k-state-collapsed");
                    } else if (isFluid(config.size)) {
                        freeSizedPanes = freeSizedPanes.add(this);
                        return;
                    } else { // sized in px/%, not collapsed
                        size = calculateSize(config.size, totalSize);
                    }

                    sizedPanesCount++;
                    sizedPanesWidth += size;

                    return size;
                });

            totalSize -= sizedPanesWidth;

            var freeSizePanesCount = freeSizedPanes.length,
                freeSizePaneWidth = Math.floor(totalSize / freeSizePanesCount);

            freeSizedPanes
                .slice(0, freeSizePanesCount - 1)
                    .css(sizingProperty, freeSizePaneWidth)
                .end()
                .eq(freeSizePanesCount - 1)
                    .css(sizingProperty, totalSize - (freeSizePanesCount - 1) * freeSizePaneWidth);

            // arrange panes
            var sum = 0,
                alternateSizingProperty = isHorizontal ? "height" : "width",
                positioningProperty = isHorizontal ? "left" : "top",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight";

            if (freeSizePanesCount === 0) {
                var lastNonCollapsedPane = panes.filter(function() {
                    return !(($(this).data(PANE) || {}).collapsed);
                }).last();

                lastNonCollapsedPane[sizingProperty](totalSize + lastNonCollapsedPane[0][sizingDomProperty]);
            }

            element.children()
                .css(alternateSizingProperty, element[alternateSizingProperty]())
                .each(function (i, child) {
                    if (child.tagName.toLowerCase() != "script") {
                        child.style[positioningProperty] = Math.floor(sum) + "px";
                        sum += child[sizingDomProperty];
                    }
                });

            that._detachEvents();
            that._attachEvents();

            kendo.resize(panes);
            that.trigger(LAYOUTCHANGE);
        },

        toggle: function(pane, expand) {
            var that = this,
                paneConfig;

            pane = that.element.find(pane);
            paneConfig = pane.data(PANE);

            if (!expand && !paneConfig.collapsible) {
                return;
            }

            if (arguments.length == 1) {
                expand = paneConfig.collapsed === undefined ? false : paneConfig.collapsed;
            }

            paneConfig.collapsed = !expand;

            if (paneConfig.collapsed) {
                pane.css("overflow", "hidden");
            } else {
                pane.css("overflow", "");
            }

            that.resize(true);
        },

        collapse: function(pane) {
            this.toggle(pane, false);
        },

        expand: function(pane) {
            this.toggle(pane, true);
        },

        _addPane: function(config, idx, paneElement) {
            var that = this;

            if (paneElement.length) {
                that.options.panes.splice(idx, 0, config);
                that._initPane(paneElement, config);

                that._removeSplitBars();

                that.resize(true);
            }

            return paneElement;
        },

        append: function(config) {
            config = config || {};

            var that = this,
                paneElement = $("<div />").appendTo(that.element);

            return that._addPane(config, that.options.panes.length, paneElement);
        },

        insertBefore: function(config, referencePane) {
            referencePane = $(referencePane);
            config = config || {};

            var that = this,
                idx = that.wrapper.children(".k-pane").index(referencePane),
                paneElement = $("<div />").insertBefore($(referencePane));

            return that._addPane(config, idx, paneElement);
        },

        insertAfter: function(config, referencePane) {
            referencePane = $(referencePane);
            config = config || {};

            var that = this,
                idx = that.wrapper.children(".k-pane").index(referencePane),
                paneElement = $("<div />").insertAfter($(referencePane));

            return that._addPane(config, idx + 1, paneElement);
        },

        remove: function(pane) {
            pane = $(pane);

            var that = this;

            if (pane.length) {
                kendo.destroy(pane);
                pane.each(function(idx, element){
                    that.options.panes.splice(that.wrapper.children(".k-pane").index(element), 1);
                    $(element).remove();
                });

                that._removeSplitBars();

                if (that.options.panes.length) {
                    that.resize(true);
                }
            }

            return that;
        },

        size: panePropertyAccessor("size", true),

        min: panePropertyAccessor("min"),

        max: panePropertyAccessor("max")
    });

    ui.plugin(Splitter);

    var verticalDefaults = {
            sizingProperty: "height",
            sizingDomProperty: "offsetHeight",
            alternateSizingProperty: "width",
            positioningProperty: "top",
            mousePositioningProperty: "pageY"
        };

    var horizontalDefaults = {
            sizingProperty: "width",
            sizingDomProperty: "offsetWidth",
            alternateSizingProperty: "height",
            positioningProperty: "left",
            mousePositioningProperty: "pageX"
        };

    function PaneResizing(splitter) {
        var that = this,
            orientation = splitter.orientation;

        that.owner = splitter;
        that._element = splitter.element;
        that.orientation = orientation;

        extend(that, orientation === HORIZONTAL ? horizontalDefaults : verticalDefaults);

        that._resizable = new kendo.ui.Resizable(splitter.element, {
            orientation: orientation,
            handle: ".k-splitbar-draggable-" + orientation + "[data-marker=" + splitter._marker + "]",
            hint: proxy(that._createHint, that),
            start: proxy(that._start, that),
            max: proxy(that._max, that),
            min: proxy(that._min, that),
            invalidClass:"k-restricted-size-" + orientation,
            resizeend: proxy(that._stop, that)
        });
    }

    PaneResizing.prototype = {
        press: function(target) {
            this._resizable.press(target);
        },

        move: function(delta, target) {
            if (!this.pressed) {
                this.press(target);
                this.pressed = true;
            }

            if (!this._resizable.target) {
                this._resizable.press(target);
            }

            this._resizable.move(delta);
        },

        end: function() {
            this._resizable.end();
            this.pressed = false;
        },

        destroy: function() {
            this._resizable.destroy();
            this._resizable = this._element = this.owner = null;
        },

        isResizing: function() {
            return this._resizable.resizing;
        },

        _createHint: function(handle) {
            var that = this;
            return $("<div class='k-ghost-splitbar k-ghost-splitbar-" + that.orientation + " k-state-default' />")
                        .css(that.alternateSizingProperty, handle[that.alternateSizingProperty]());
        },

        _start: function(e) {
            var that = this,
                splitbar = $(e.currentTarget),
                previousPane = splitbar.prev(),
                nextPane = splitbar.next(),
                previousPaneConfig = previousPane.data(PANE),
                nextPaneConfig = nextPane.data(PANE),
                prevBoundary = parseInt(previousPane[0].style[that.positioningProperty], 10),
                nextBoundary = parseInt(nextPane[0].style[that.positioningProperty], 10) + nextPane[0][that.sizingDomProperty] - splitbar[0][that.sizingDomProperty],
                totalSize = parseInt(that._element.css(that.sizingProperty), 10),
                toPx = function (value) {
                    var val = parseInt(value, 10);
                    return (isPixelSize(value) ? val : (totalSize * val) / 100) || 0;
                },
                prevMinSize = toPx(previousPaneConfig.min),
                prevMaxSize = toPx(previousPaneConfig.max) || nextBoundary - prevBoundary,
                nextMinSize = toPx(nextPaneConfig.min),
                nextMaxSize = toPx(nextPaneConfig.max) || nextBoundary - prevBoundary;

            that.previousPane = previousPane;
            that.nextPane = nextPane;
            that._maxPosition = Math.min(nextBoundary - nextMinSize, prevBoundary + prevMaxSize);
            that._minPosition = Math.max(prevBoundary + prevMinSize, nextBoundary - nextMaxSize);
        },
        _max: function() {
              return this._maxPosition;
        },
        _min: function() {
            return this._minPosition;
        },
        _stop: function(e) {
            var that = this,
                splitbar = $(e.currentTarget),
                owner = that.owner;

            owner._panes().children(".k-splitter-overlay").remove();

            if (e.keyCode !== kendo.keys.ESC) {
                var ghostPosition = e.position,
                    previousPane = splitbar.prev(),
                    nextPane = splitbar.next(),
                    previousPaneConfig = previousPane.data(PANE),
                    nextPaneConfig = nextPane.data(PANE),
                    previousPaneNewSize = ghostPosition - parseInt(previousPane[0].style[that.positioningProperty], 10),
                    nextPaneNewSize = parseInt(nextPane[0].style[that.positioningProperty], 10) + nextPane[0][that.sizingDomProperty] - ghostPosition - splitbar[0][that.sizingDomProperty],
                    fluidPanesCount = that._element.children(PANECLASS).filter(function() { return isFluid($(this).data(PANE).size); }).length;

                if (!isFluid(previousPaneConfig.size) || fluidPanesCount > 1) {
                    if (isFluid(previousPaneConfig.size)) {
                        fluidPanesCount--;
                    }

                    previousPaneConfig.size = previousPaneNewSize + "px";
                }

                if (!isFluid(nextPaneConfig.size) || fluidPanesCount > 1) {
                    nextPaneConfig.size = nextPaneNewSize + "px";
                }

                owner.resize(true);
            }

            return false;
        }
    };

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
