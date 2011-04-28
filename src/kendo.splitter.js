(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui;
        extend = $.extend,
        Component = ui.Component,
        splitBarSize = 7,
        pxUnitsRegex = /^\d+px$/i,
        INIT = "init",
        EXPAND = "expand",
        COLLAPSE = "collapse",
        CONTENTLOAD = "contentLoad",
        RESIZE = "resize",
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i;

    function isPercentageSize(size) {
        return percentageUnitsRegex.test(size);
    }

    function isPixelSize(size) {
        return pxUnitsRegex.test(size);
    }

    function isFluid(size) {
        return !isPercentageSize(size) && !isPixelSize(size);
    }

    function panePropertyAccessor(propertyName, triggersResize) {
        return function(pane, value) {
            var paneConfig = $(pane).data("pane");

            if (arguments.length == 1) {
                return paneConfig[propertyName];
            }

            paneConfig[propertyName] = value;

            if (triggersResize) {
                this.element.trigger(RESIZE);
            }
        };
    }

    function Splitter(element, options) {
        var that = this,
            panesConfig,
            splitbarSelector,
            expandCollapseSelector,
            orientation;

        Component.call(that, element, options);

        orientation = that.options.orientation.toLowerCase() != "vertical" ? "horizontal" : "vertical";
        panesConfig = that.options.panes;

        splitbarSelector = ".t-splitbar-draggable-" + orientation;
        expandCollapseSelector = ".t-splitbar .t-icon:not(.t-resize-handle)";

        that.orientation = orientation;
        that.ajaxOptions = that.options.ajaxOptions || that.ajaxOptions;

        that.bind([INIT, EXPAND, COLLAPSE, CONTENTLOAD, RESIZE], that.options);
        that.element.bind(RESIZE, function (e) {
            e.stopPropagation();
            that._resize.call(that, e);

            that.trigger(RESIZE, e);
        });

        var arrowClick = function (arrowType) {
            return function(e) {
                var $target = $(e.target), $pane;

                if ($target.closest(".t-splitter")[0] != element)
                    return;

                if ($target.is(".t-" + arrowType + "-prev")) {
                    $pane = $target.parent().prev();
                } else {
                    $pane = $target.parent().next();
                }

                if (!that.trigger(arrowType, { pane: $pane[0] })) {
                    that[arrowType]($pane[0]);
                }
            };
        };

        that.element
            .addClass("t-widget").addClass("t-splitter")
            .children()
                .addClass("t-pane")
                .each($.proxy(function (index, pane) {
                    var $pane = $(pane);
                    $pane.data("pane", panesConfig ? panesConfig[index] : {})
                         .toggleClass("t-scrollable", panesConfig ? panesConfig[index].scrollable !== false : true);
                    this.ajaxRequest($pane);
                }, this))
            .end()
            .trigger(RESIZE)
            .delegate(splitbarSelector, "mouseenter", function() { $(this).addClass("t-splitbar-" + orientation + "-hover"); })
            .delegate(splitbarSelector, "mouseleave", function() { $(this).removeClass("t-splitbar-" + orientation + "-hover"); })
            .delegate(expandCollapseSelector, "mouseenter", function() { $(this).addClass("t-state-hove")})
            .delegate(expandCollapseSelector, "mouseleave", function() { $(this).addClass("t-state-hove")})
            .delegate(".t-splitbar .t-collapse-next, .t-splitbar .t-collapse-prev", "click", arrowClick("collapse"))
            .delegate(".t-splitbar .t-expand-next, .t-splitbar .t-expand-prev", "click", arrowClick("expand"))
            .delegate(".t-splitbar", "dblclick", function(e) {
                var $target = $(e.target),
                    triggerAction = function(type, $pane) {
                        if (!that.trigger(type, { pane: $pane[0] })) {
                            that[type]($pane[0]);
                        }
                    };

                if ($target.closest(".t-splitter")[0] != element)
                    return;

                var arrow = $target.children(".t-icon:not(.t-resize-handle)");

                if (arrow.length !== 1) {
                    return;
                }
                if (arrow.is(".t-collapse-prev")) {
                    triggerAction("collapse", $target.prev());
                } else if (arrow.is(".t-collapse-next")) {
                    triggerAction("collapse", $target.next());
                } else if (arrow.is(".t-expand-prev")) {
                    triggerAction("expand", $target.prev());
                } else if (arrow.is(".t-expand-next")) {
                    triggerAction("expand", $target.next());
                }
            })
            .parent().closest(".t-splitter")
            .bind(RESIZE, function() {
                that.element.trigger(RESIZE);
            });

        that.resizing = new PaneResizing(this);
    }

    Splitter.prototype = {
        options: {
            orientation: "horizontal"
        },
        ajaxOptions: function($pane, options) {
            var self = this;

            return $.extend({
                type: "POST",
                dataType: "html",
                success: function (data) {
                    $pane.html(data);

                    self.trigger("contentLoad", { pane: $pane[0] });
                }
            }, options);
        },
        ajaxRequest: function(pane, url) {
            var $pane = $(pane),
                paneConfig = $pane.data("pane");

            if (url || paneConfig.contentUrl) {
                $pane.append("<span class='t-icon t-loading t-pane-loading' />");

                $.ajax(this.ajaxOptions($pane, {
                    url: url || paneConfig.contentUrl
                }));
            }
        },
        _resize: function() {
            var $element = this.element,
                panes = $element.children(":not(.t-splitbar)"),
                isHorizontal = this.orientation == "horizontal",
                splitBarsCount = $element.children(".t-splitbar").length,
                sizingProperty = isHorizontal ? "width" : "height",
                totalSize = $element[sizingProperty]();

            if (splitBarsCount === 0) {
                // add splitbars where necessary
                splitBarsCount = panes.length - 1;

                for (var i = 0; i < splitBarsCount; i++) {
                    var $pane = panes.eq(i),
                        previousPane = $pane.data("pane"),
                        nextPane = $pane.next().data("pane");

                    if (!nextPane) {
                        continue;
                    }

                    var isSplitBarDraggable = (previousPane.resizable !== false) && (nextPane.resizable !== false);

                    catIconIf = function(iconType, condition) {
                       return condition ? "<div class='t-icon " + iconType + "' />" : "";
                   };

                    $pane.after("<div class='t-splitbar t-state-default t-splitbar-" + this.orientation +
                            (isSplitBarDraggable && !previousPane.collapsed && !nextPane.collapsed ?  " t-splitbar-draggable-" + this.orientation : "") + 
                        "'>" +
                        catIconIf("t-collapse-prev", previousPane.collapsible && !previousPane.collapsed) +
                        catIconIf("t-expand-prev", previousPane.collapsible && previousPane.collapsed) +
                        catIconIf("t-resize-handle", isSplitBarDraggable) +
                        catIconIf("t-collapse-next", nextPane.collapsible && !nextPane.collapsed) +
                        catIconIf("t-expand-next", nextPane.collapsible && nextPane.collapsed) +
                        "</div>");
                }
            }

            // discard splitbar sizes from total size
            totalSize -= splitBarSize * splitBarsCount;

            var sizedPanesWidth = 0,
                sizedPanesCount = 0,
                freeSizedPanes = $();

            panes.css({ position: "absolute", top: 0 })
                [sizingProperty](function() {
                    var config = $(this).data("pane"), size;

                    if (config.collapsed) {
                        size = 0;
                    } else if (isFluid(config.size)) {
                        freeSizedPanes = freeSizedPanes.add(this);
                        return;
                    } else { // sized in px/%, not collapsed
                        size = parseInt(config.size, 10);

                        if (isPercentageSize(config.size)) {
                            size = Math.floor(size * totalSize / 100);
                        }
                    }

                    sizedPanesCount++;
                    sizedPanesWidth += size;

                    return size;
                });

            totalSize -= sizedPanesWidth;

            var freeSizePanesCount = freeSizedPanes.length,
                freeSizePaneWidth = Math.floor(totalSize / freeSizePanesCount);

            freeSizedPanes
                .slice(0, freeSizePanesCount - 1).css(sizingProperty, freeSizePaneWidth).end()
                .eq(freeSizePanesCount - 1).css(sizingProperty, totalSize - (freeSizePanesCount - 1) * freeSizePaneWidth);

            // arrange panes
            var sum = 0,
                alternateSizingProperty = isHorizontal ? "height" : "width",
                positioningProperty = isHorizontal ? "left" : "top",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight";

            $element.children()
                .css(alternateSizingProperty, $element[alternateSizingProperty]())
                .each(function (i, child) {
                    child.style[positioningProperty] = Math.floor(sum) + "px";
                    sum += child[sizingDomProperty];
                });
        },
        toggle: function(pane, expand) {
            var pane = $(pane),
                previousSplitBar = pane.prev(".t-splitbar"),
                nextSplitBar = pane.next(".t-splitbar"),
                splitbars = previousSplitBar.add(nextSplitBar),
                paneConfig = pane.data("pane");

            if (arguments.length == 1) {
                expand = paneConfig.collapsed === undefined ? false : paneConfig.collapsed;
            }

            splitbars
                .toggleClass("t-splitbar-draggable-" + this.orientation, expand)
                .removeClass("t-splitbar-" + this.orientation + "-hover");

            previousSplitBar
                .find(expand ? ".t-expand-next" : ".t-collapse-next")
                    .toggleClass("t-expand-next", !expand)
                    .toggleClass("t-collapse-next", expand);

            nextSplitBar
                .find(expand ? ".t-expand-prev" : ".t-collapse-prev")
                    .toggleClass("t-expand-prev", !expand)
                    .toggleClass("t-collapse-prev", expand);

            paneConfig.collapsed = !expand;

            this.element.trigger(RESIZE);
        },
        collapse: function(pane) {
            this.toggle(pane, false);
        },
        expand: function(pane) {
            this.toggle(pane, true);
        },
        size: panePropertyAccessor("size", true),
        minSize: panePropertyAccessor("minSize"),
        maxSize: panePropertyAccessor("maxSize")
    };

    ui.plugin("Splitter", Splitter, Component);

    function PaneResizing(splitter) {
        var that = this;

        that.owner = splitter;

        new kendo.ui.Draggable(splitter.element, {
            distance: 0,
            filter: ".t-splitbar-draggable-horizontal, .t-splitbar-draggable-vertical",
            group: splitter.element[0].id,
            dragstart: $.proxy(that.start, that),
            drag: $.proxy(that.drag, that),
            dragend: $.proxy(that.stop, that)
        });
    }

    PaneResizing.prototype = {
        start: function(e) {
            var that = this,
                draggable = $(e.currentTarget),
                splitBar = draggable,
                previousPane = splitBar.prev(), nextPane = splitBar.next(),
                previousPaneConfig = previousPane.data("pane"), nextPaneConfig = nextPane.data("pane"),
                isHorizontal = that.owner.orientation === "horizontal",
                sizingProperty = isHorizontal ? "width" : "height",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight",
                alternateSizingProperty = isHorizontal ? "height" : "width";

            that.positioningProperty = isHorizontal ? "left" : "top";
            that.mousePositioningProperty = isHorizontal ? "pageX" : "pageY";
            that.previousPane = previousPane;
            that.nextPane = nextPane;
            that.initialSplitBarPosition = parseInt(splitBar[0].style[that.positioningProperty]);
            that.initialMousePosition = e[that.mousePositioningProperty];
            that.ghostSplitBar =
                $("<div class='t-ghost-splitbar t-ghost-splitbar-" + that.owner.orientation + " t-state-default' />")
                    .css(alternateSizingProperty, draggable[alternateSizingProperty]())
                    .css(that.positioningProperty, that.initialSplitBarPosition)
                    .appendTo(that.owner.element);

            // set this.minSize and this.maxSize to the lowest and highest values that the ghost splitbar can go to
            // keep in mind the minSize/maxSize of both the previous and next panes
            var prevBoundary = parseInt(previousPane[0].style[that.positioningProperty]),
                nextBoundary = parseInt(nextPane[0].style[that.positioningProperty]) + nextPane[0][sizingDomProperty] - splitBarSize,
                totalSize = that.owner.element.css(sizingProperty),
                toPx = function (value) {
                    var val = parseInt(value, 10);
                    return (isPixelSize(value) ? val : (totalSize * val) / 100) || 0;
                },
                prevMinSize = toPx(previousPaneConfig.minSize),
                prevMaxSize = toPx(previousPaneConfig.maxSize) || nextBoundary - prevBoundary,
                nextMinSize = toPx(nextPaneConfig.minSize),
                nextMaxSize = toPx(nextPaneConfig.maxSize) || nextBoundary - prevBoundary;

            that.maxSize = Math.min(nextBoundary - nextMinSize, prevBoundary + prevMaxSize);
            that.minSize = Math.max(prevBoundary + prevMinSize, nextBoundary - nextMaxSize);

            $(document.body).css("cursor", splitBar.css("cursor"));
        },
        drag: function(e) {
            var position = Math.min(this.maxSize, Math.max(this.minSize, this.initialSplitBarPosition + (e[this.mousePositioningProperty] - this.initialMousePosition)));

            this.ghostSplitBar
                .toggleClass("t-restricted-size-" + this.owner.orientation, position == this.maxSize || position == this.minSize)
                [0].style[this.positioningProperty] = position + "px";
        },
        stop: function(e) {
            if (e.keyCode !== 27) {

                var ghostPosition = parseInt(this.ghostSplitBar[0].style[this.positioningProperty]),
                    isHorizontal = this.owner.orientation === "horizontal",
                    sizingProperty = isHorizontal ? "width" : "height",
                    sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight",
                    previousPaneConfig = this.previousPane.data("pane"),
                    nextPaneConfig = this.nextPane.data("pane"),
                    previousPaneNewSize = ghostPosition - parseInt(this.previousPane[0].style[this.positioningProperty]),
                    nextPaneNewSize = parseInt(this.nextPane[0].style[this.positioningProperty]) + this.nextPane[0][sizingDomProperty] - ghostPosition - splitBarSize,
                    totalSize = this.owner.element[sizingProperty]();

                totalSize -= splitBarSize * this.owner.element.children('.t-splitbar').length;

                var fluidPanesCount = this.owner.element.children(".t-pane").filter(function() { return isFluid($(this).data("pane").size); }).length;

                if (!isFluid(previousPaneConfig.size) || fluidPanesCount > 1) {
                    if (isFluid(previousPaneConfig.size)) {
                        fluidPanesCount--;
                    }

                    previousPaneConfig.size = previousPaneNewSize + "px";
                }

                if (!isFluid(nextPaneConfig.size) || fluidPanesCount > 1) {
                    nextPaneConfig.size = nextPaneNewSize + "px";
                }
            }

            this.ghostSplitBar.remove();

            if (e.keyCode !== 27) {
                this.owner.element.trigger(RESIZE);
            }

            $(document.body).css("cursor", "");

            return false;
        }
    }

})(jQuery, window);
