(function ($) {
    var $t = $.telerik,
        splitBarSize = 7,
        pxUnitsRegex = /^\d+px$/i,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i;

    $t.scripts.push("telerik.splitter.js");

    function isPercentageSize(size) {
        return percentageUnitsRegex.test(size);
    }

    function isPixelSize(size) {
        return pxUnitsRegex.test(size);
    }

    function isFluid(size) {
        return !isPercentageSize(size) && !isPixelSize(size);
    }

    $t.splitter = function (element, options) {
        this.element = element;
        var $element = this.$element = $(element),
            self = this;

        $.extend(this, options);
        
        var orientation = this.orientation.toLowerCase() != "vertical" ? "horizontal" : "vertical",
            panesConfig = this.panes;

        this.orientation = orientation;

        $t.bind(this, {
            load: this.onLoad,
            expand: this.onExpand,
            collapse: this.onCollapse,
            contentLoad: this.onContentLoad,
            resize: function(e) {
                e.stopPropagation();
                
                self.resize.call(self, e);

                if ($.isFunction(self.onResize)) {
                    self.onResize.call(element, e);
                }
            }
        });

        $(window).resize(function() {
            $element.trigger("resize");
        });

        var splitbarSelector = ".t-splitbar-draggable-" + orientation,
            expandCollapseSelector = ".t-splitbar .t-icon:not(.t-resize-handle)";

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

                if (!$t.trigger(element, arrowType, { pane: $pane[0] })) {
                    self[arrowType]($pane[0]);
                }
            };
        };

        $element
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
            .trigger("resize")
            .delegate(splitbarSelector, "mouseenter", function() { $(this).addClass("t-splitbar-" + orientation + "-hover"); })
            .delegate(splitbarSelector, "mouseleave", function() { $(this).removeClass("t-splitbar-" + orientation + "-hover"); })
            .delegate(expandCollapseSelector, "mouseenter", $t.hover)
            .delegate(expandCollapseSelector, "mouseleave", $t.leave)
            .delegate(".t-splitbar .t-collapse-next, .t-splitbar .t-collapse-prev", "click", arrowClick("collapse"))
            .delegate(".t-splitbar .t-expand-next, .t-splitbar .t-expand-prev", "click", arrowClick("expand"))
            .delegate(".t-splitbar", "dblclick", function(e) {
                var $target = $(e.target),
                    triggerAction = function(type, $pane) {
                        if (!$t.trigger(element, type, { pane: $pane[0] })) {
                            self[type]($pane[0]);
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
            .children(".t-pane").children(".t-splitter").trigger("resize").end().end()
            .parent().closest(".t-splitter")
                .bind("resize", function() {
                    $element.trigger("resize");
                });

        this.resizing = new $t.splitter.PaneResizing(this);
    };

    function panePropertyAccessor(propertyName, triggersResize) {
        return function(pane, value) {
            var paneConfig = $(pane).data("pane");

            if (arguments.length == 1) {
                return paneConfig[propertyName];
            }

            paneConfig[propertyName] = value;

            if (triggersResize) {
                this.$element.trigger("resize");
            }
        };
    }

    $t.splitter.prototype = {
        toggle: function(pane, expand) {
            var pane = $(pane),
                previousSplitBar = pane.prev(".t-splitbar"),
                nextSplitBar = pane.next(".t-splitbar"),
                paneConfig = pane.data("pane"),
                prevPaneConfig = pane.prevAll(".t-pane:first").data("pane"),
                nextPaneConfig = pane.nextAll(".t-pane:first").data("pane"),
                orentation = this.orientation,
                hoverClass = "t-splitbar-" + orentation + "-hover",
                draggableClass = "t-splitbar-draggable-" + orentation;

            if (arguments.length == 1) {
                expand = paneConfig.collapsed === undefined ? false : paneConfig.collapsed;
            }

            previousSplitBar
                .toggleClass(draggableClass, expand && paneConfig.resizable !== false && (!prevPaneConfig || prevPaneConfig.resizable !== false))
                .removeClass(hoverClass)
                .find(expand ? ".t-expand-next" : ".t-collapse-next")
                    .toggleClass("t-expand-next", !expand)
                    .toggleClass("t-collapse-next", expand);

            nextSplitBar
                .toggleClass(draggableClass, expand && paneConfig.resizable !== false && (!nextPaneConfig || nextPaneConfig.resizable !== false))
                .removeClass(hoverClass)
                .find(expand ? ".t-expand-prev" : ".t-collapse-prev")
                    .toggleClass("t-expand-prev", !expand)
                    .toggleClass("t-collapse-prev", expand);

            paneConfig.collapsed = !expand;

            this.$element.trigger("resize");
        },
        collapse: function(pane) {
            this.toggle(pane, false);
        },
        expand: function(pane) {
            this.toggle(pane, true);
        },
        size: panePropertyAccessor("size", true),
        minSize: panePropertyAccessor("minSize"),
        maxSize: panePropertyAccessor("maxSize"),
        ajaxOptions: function($pane, options) {
            var self = this;

            return $.extend({
                type: "POST",
                dataType: "html",
                success: function (data) {
                    $pane.html(data);
                    
                    $t.trigger(self.element, "contentLoad", { pane: $pane[0] });
                }
            }, options);
        },
        ajaxRequest: function(pane, url, data) {
            var $pane = $(pane),
                paneConfig = $pane.data("pane");

            if (url || paneConfig.contentUrl) {
                $pane.append("<span class='t-icon t-loading t-pane-loading' />");

                $.ajax(this.ajaxOptions($pane, {
                    url: url || paneConfig.contentUrl,
                    data: data || {}
                }));
            }
        },
        resize: function() {
            var $element = this.$element,
                panes = $element.children(":not(.t-splitbar):not(.t-ghost-splitbar)"),
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

                    var isSplitBarDraggable = (previousPane.resizable !== false) && (nextPane.resizable !== false),
                        splitBarHtml = new $t.stringBuilder();

                    splitBarHtml.catIconIf = function(iconType, condition) {
                        if (condition) {
                            this.cat("<div class='t-icon ").cat(iconType).cat("' />");
                        }

                        return this;
                    };

                    splitBarHtml
                        .cat("<div class='t-splitbar t-state-default t-splitbar-").cat(this.orientation)
                                .catIf(" t-splitbar-draggable-", this.orientation, isSplitBarDraggable && !previousPane.collapsed && !nextPane.collapsed)
                            .cat("'>")
                            .catIconIf("t-collapse-prev", previousPane.collapsible && !previousPane.collapsed)
                            .catIconIf("t-expand-prev", previousPane.collapsible && previousPane.collapsed)
                            .catIconIf("t-resize-handle", isSplitBarDraggable)
                            .catIconIf("t-collapse-next", nextPane.collapsible && !nextPane.collapsed)
                            .catIconIf("t-expand-next", nextPane.collapsible && nextPane.collapsed)
                        .cat("</div>");

                    $pane.after(splitBarHtml.string());
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

                    if (!config["collapsed"] && config["size"] && config.size.indexOf("NaN") != -1) { // resizing issues in iOS
                        return false;
                    } else {
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
                    }
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
        }
    };
    
    $t.splitter.PaneResizing = function(splitter) {
        this.owner = splitter;

        new $t.draggable({
            distance: 0,
            owner: splitter.element,
            selector: ".t-splitbar-draggable-horizontal, .t-splitbar-draggable-vertical",
            scope: splitter.element.id,
            start: $.proxy(this.start, this),
            drag: $.proxy(this.drag, this),
            stop: $.proxy(this.stop, this)
        });
    };

    $t.splitter.PaneResizing.prototype = {
        start: function(e) {
            if ($t.isTouch)
                e.stopImmediatePropagation();

            var splitBar = e.$draggable,
                previousPane = splitBar.prev(), nextPane = splitBar.next(),
                previousPaneConfig = previousPane.data("pane"), nextPaneConfig = nextPane.data("pane"),
                isHorizontal = this.owner.orientation === "horizontal",
                sizingProperty = isHorizontal ? "width" : "height",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight",
                alternateSizingProperty = isHorizontal ? "height" : "width",
                location = $t.touchLocation(e);

            this.positioningProperty = isHorizontal ? "left" : "top";
            this.mousePositioningProperty = isHorizontal ? "x" : "y";
            this.previousPane = previousPane;
            this.nextPane = nextPane;
            this.initialSplitBarPosition = parseInt(splitBar[0].style[this.positioningProperty]);
            this.initialMousePosition = location[this.mousePositioningProperty];
            this.ghostSplitBar =
                $("<div class='t-ghost-splitbar t-ghost-splitbar-" + this.owner.orientation + " t-state-default' />")
                    .css(alternateSizingProperty, e.$draggable[alternateSizingProperty]())
                    .css(this.positioningProperty, this.initialSplitBarPosition)
                    .appendTo(this.owner.$element);

            // set this.minSize and this.maxSize to the lowest and highest values that the ghost splitbar can go to
            // keep in mind the minSize/maxSize of both the previous and next panes
            var prevBoundary = parseInt(previousPane[0].style[this.positioningProperty]),
                nextBoundary = parseInt(nextPane[0].style[this.positioningProperty]) + nextPane[0][sizingDomProperty] - splitBarSize,
                totalSize = this.owner.$element.css(sizingProperty),
                toPx = function (value) {
                    var val = parseInt(value, 10);
                    return (isPixelSize(value) ? val : (totalSize * val) / 100) || 0;
                },
                prevMinSize = toPx(previousPaneConfig.minSize),
                prevMaxSize = toPx(previousPaneConfig.maxSize) || nextBoundary - prevBoundary,
                nextMinSize = toPx(nextPaneConfig.minSize),
                nextMaxSize = toPx(nextPaneConfig.maxSize) || nextBoundary - prevBoundary;

            this.maxSize = Math.min(nextBoundary - nextMinSize, prevBoundary + prevMaxSize);
            this.minSize = Math.max(prevBoundary + prevMinSize, nextBoundary - nextMaxSize);

            $(document.body).css("cursor", splitBar.css("cursor"));
        },
        drag: function(e) {
            if ($t.isTouch)
                e.stopImmediatePropagation();

            var location = $t.touchLocation(e),
                position = Math.min(this.maxSize, Math.max(this.minSize, this.initialSplitBarPosition + (location[this.mousePositioningProperty] - this.initialMousePosition)));

            this.ghostSplitBar
                .toggleClass("t-restricted-size-" + this.owner.orientation, position == this.maxSize || position == this.minSize)
                [0].style[this.positioningProperty] = position + "px";
        },
        stop: function(e) {
            if ($t.isTouch)
                e.stopImmediatePropagation();

            if (e.keyCode !== 27) {

                var ghostPosition = parseInt(this.ghostSplitBar[0].style[this.positioningProperty]),
                    isHorizontal = this.owner.orientation === "horizontal",
                    sizingProperty = isHorizontal ? "width" : "height",
                    sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight",
                    previousPaneConfig = this.previousPane.data("pane"),
                    nextPaneConfig = this.nextPane.data("pane"),
                    previousPaneNewSize = ghostPosition - parseInt(this.previousPane[0].style[this.positioningProperty]),
                    nextPaneNewSize = parseInt(this.nextPane[0].style[this.positioningProperty]) + this.nextPane[0][sizingDomProperty] - ghostPosition - splitBarSize,
                    totalSize = this.owner.$element[sizingProperty](),
                    resized = !$t.isTouch || ($t.isTouch && !isNaN(previousPaneNewSize) && !isNaN(nextPaneNewSize));

                totalSize -= splitBarSize * this.owner.$element.children('.t-splitbar').length;

                var fluidPanesCount = this.owner.$element.children(".t-pane").filter(function() { return isFluid($(this).data("pane").size); }).length;

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

            if (e.keyCode !== 27 && resized) {
                this.owner.$element.trigger("resize");
            }

            $(document.body).css("cursor", "");

            return false;
        }
    };

    $.fn.tSplitter = function (options) {
        return $t.create(this, {
            name: "tSplitter",
            init: function (element, options) {
                return new $t.splitter(element, options);
            },
            options: options
        });
    };

    // default options
    $.fn.tSplitter.defaults = {
        orientation: "horizontal"
    };
})(jQuery);