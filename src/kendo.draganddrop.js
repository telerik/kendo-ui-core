(function(f, define){
    define([ "./kendo.core", "./kendo.userevents" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "draganddrop",
    name: "Drag & drop",
    category: "framework",
    description: "Drag & drop functionality for any DOM element.",
    depends: [ "core", "userevents" ]
};

(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        document = window.document,
        $window = $(window),
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        Observable = kendo.Observable,
        UserEvents = kendo.UserEvents,
        proxy = $.proxy,
        extend = $.extend,
        getOffset = kendo.getOffset,
        draggables = {},
        dropTargets = {},
        dropAreas = {},
        lastDropTarget,
        elementUnderCursor = kendo.elementUnderCursor,
        KEYUP = "keyup",
        CHANGE = "change",

        // Draggable events
        DRAGSTART = "dragstart",
        HOLD = "hold",
        DRAG = "drag",
        DRAGEND = "dragend",
        DRAGCANCEL = "dragcancel",
        HINTDESTROYED = "hintDestroyed",

        // DropTarget events
        DRAGENTER = "dragenter",
        DRAGLEAVE = "dragleave",
        DROP = "drop";

    function contains(parent, child) {
        try {
            return $.contains(parent, child) || parent == child;
        } catch (e) {
            return false;
        }
    }

    function numericCssPropery(element, property) {
        return parseInt(element.css(property), 10) || 0;
    }

    function within(value, range) {
        return Math.min(Math.max(value, range.min), range.max);
    }

    function containerBoundaries(container, element) {
        var offset = getOffset(container),
            outerWidth = kendo._outerWidth,
            outerHeight = kendo._outerHeight,
            minX = offset.left + numericCssPropery(container, "borderLeftWidth") + numericCssPropery(container, "paddingLeft"),
            minY = offset.top + numericCssPropery(container, "borderTopWidth") + numericCssPropery(container, "paddingTop"),
            maxX = minX + container.width() - outerWidth(element, true),
            maxY = minY + container.height() - outerHeight(element, true);

        return {
            x: { min: minX, max: maxX },
            y: { min: minY, max: maxY }
        };
    }

    function checkTarget(target, targets, areas) {
        var theTarget, theFilter, i = 0,
            targetLen = targets && targets.length,
            areaLen = areas && areas.length;

        while (target && target.parentNode) {
            for (i = 0; i < targetLen; i ++) {
                theTarget = targets[i];
                if (theTarget.element[0] === target) {
                    return { target: theTarget, targetElement: target };
                }
            }

            for (i = 0; i < areaLen; i ++) {
                theFilter = areas[i];
                if ($.contains(theFilter.element[0], target) && support.matchesSelector.call(target, theFilter.options.filter)) {
                    return { target: theFilter, targetElement: target };
                }
            }

            target = target.parentNode;
        }

        return undefined;
    }

    var TapCapture = Observable.extend({
        init: function(element, options) {
            var that = this,
                domElement = element[0];

            that.capture = false;

            if (domElement.addEventListener) {
                $.each(kendo.eventMap.down.split(" "), function() {
                    domElement.addEventListener(this, proxy(that._press, that), true);
                });
                $.each(kendo.eventMap.up.split(" "), function() {
                    domElement.addEventListener(this, proxy(that._release, that), true);
                });
            } else {
                $.each(kendo.eventMap.down.split(" "), function() {
                    domElement.attachEvent(this, proxy(that._press, that));
                });
                $.each(kendo.eventMap.up.split(" "), function() {
                    domElement.attachEvent(this, proxy(that._release, that));
                });
            }

            Observable.fn.init.call(that);

            that.bind(["press", "release"], options || {});
        },

        captureNext: function() {
            this.capture = true;
        },

        cancelCapture: function() {
            this.capture = false;
        },

        _press: function(e) {
            var that = this;
            that.trigger("press");
            if (that.capture) {
                e.preventDefault();
            }
        },

        _release: function(e) {
            var that = this;
            that.trigger("release");

            if (that.capture) {
                e.preventDefault();
                that.cancelCapture();
            }
        }
    });

    var PaneDimension = Observable.extend({
        init: function(options) {
            var that = this;
            Observable.fn.init.call(that);

            that.forcedEnabled = false;

            $.extend(that, options);

            that.scale = 1;

            if (that.horizontal) {
                that.measure = "offsetWidth";
                that.scrollSize = "scrollWidth";
                that.axis = "x";
            } else {
                that.measure = "offsetHeight";
                that.scrollSize = "scrollHeight";
                that.axis = "y";
            }
        },

        makeVirtual: function() {
            $.extend(this, {
                virtual: true,
                forcedEnabled: true,
                _virtualMin: 0,
                _virtualMax: 0
            });
        },

        virtualSize: function(min, max) {
            if (this._virtualMin !== min || this._virtualMax !== max) {
                this._virtualMin = min;
                this._virtualMax = max;
                this.update();
            }
        },

        outOfBounds: function(offset) {
            return offset > this.max || offset < this.min;
        },

        forceEnabled: function() {
            this.forcedEnabled = true;
        },

        getSize: function() {
            return this.container[0][this.measure];
        },

        getTotal: function() {
            return this.element[0][this.scrollSize];
        },

        rescale: function(scale) {
            this.scale = scale;
        },

        update: function(silent) {
            var that = this,
                total = that.virtual ? that._virtualMax : that.getTotal(),
                scaledTotal = total * that.scale,
                size = that.getSize();

            if (total === 0 && !that.forcedEnabled) {
                return; // we are not visible.
            }

            that.max = that.virtual ? -that._virtualMin : 0;
            that.size = size;
            that.total = scaledTotal;
            that.min = Math.min(that.max, size - scaledTotal);
            that.minScale = size / total;
            that.centerOffset = (scaledTotal - size) / 2;

            that.enabled = that.forcedEnabled || (scaledTotal > size);

            if (!silent) {
                that.trigger(CHANGE, that);
            }
        }
    });

    var PaneDimensions = Observable.extend({
        init: function(options) {
            var that = this;

            Observable.fn.init.call(that);

            that.x = new PaneDimension(extend({horizontal: true}, options));
            that.y = new PaneDimension(extend({horizontal: false}, options));
            that.container = options.container;
            that.forcedMinScale = options.minScale;
            that.maxScale = options.maxScale || 100;

            that.bind(CHANGE, options);
        },

        rescale: function(newScale) {
            this.x.rescale(newScale);
            this.y.rescale(newScale);
            this.refresh();
        },

        centerCoordinates: function() {
            return { x: Math.min(0, -this.x.centerOffset), y: Math.min(0, -this.y.centerOffset) };
        },

        refresh: function() {
            var that = this;
            that.x.update();
            that.y.update();
            that.enabled = that.x.enabled || that.y.enabled;
            that.minScale = that.forcedMinScale || Math.min(that.x.minScale, that.y.minScale);
            that.fitScale = Math.max(that.x.minScale, that.y.minScale);
            that.trigger(CHANGE);
        }
    });

    var PaneAxis = Observable.extend({
        init: function(options) {
            var that = this;
            extend(that, options);
            Observable.fn.init.call(that);
        },

        outOfBounds: function() {
            return this.dimension.outOfBounds(this.movable[this.axis]);
        },

        dragMove: function(delta) {
            var that = this,
                dimension = that.dimension,
                axis = that.axis,
                movable = that.movable,
                position = movable[axis] + delta;

            if (!dimension.enabled) {
                return;
            }

            if ((position < dimension.min && delta < 0) || (position > dimension.max && delta > 0)) {
                delta *= that.resistance;
            }

            movable.translateAxis(axis, delta);
            that.trigger(CHANGE, that);
        }
    });

    var Pane = Class.extend({

        init: function(options) {
            var that = this,
                x,
                y,
                resistance,
                movable;

            extend(that, {elastic: true}, options);

            resistance = that.elastic ? 0.5 : 0;
            movable = that.movable;

            that.x = x = new PaneAxis({
                axis: "x",
                dimension: that.dimensions.x,
                resistance: resistance,
                movable: movable
            });

            that.y = y = new PaneAxis({
                axis: "y",
                dimension: that.dimensions.y,
                resistance: resistance,
                movable: movable
            });

            that.userEvents.bind(["press", "move", "end", "gesturestart", "gesturechange"], {
                gesturestart: function(e) {
                    that.gesture = e;
                    that.offset = that.dimensions.container.offset();
                },

                press: function(e) {
                    if ($(e.event.target).closest("a").is("[data-navigate-on-press=true]")) {
                        e.sender.cancel();
                    }
                },

                gesturechange: function(e) {
                    var previousGesture = that.gesture,
                        previousCenter = previousGesture.center,

                        center = e.center,

                        scaleDelta = e.distance / previousGesture.distance,

                        minScale = that.dimensions.minScale,
                        maxScale = that.dimensions.maxScale,
                        coordinates;

                    if (movable.scale <= minScale && scaleDelta < 1) {
                        // Resist shrinking. Instead of shrinking from 1 to 0.5, it will shrink to 0.5 + (1 /* minScale */ - 0.5) * 0.8 = 0.9;
                        scaleDelta += (1 - scaleDelta) * 0.8;
                    }

                    if (movable.scale * scaleDelta >= maxScale) {
                        scaleDelta = maxScale / movable.scale;
                    }

                    var offsetX = movable.x + that.offset.left,
                        offsetY = movable.y + that.offset.top;

                    coordinates = {
                        x: (offsetX - previousCenter.x) * scaleDelta + center.x - offsetX,
                        y: (offsetY - previousCenter.y) * scaleDelta + center.y - offsetY
                    };

                    movable.scaleWith(scaleDelta);

                    x.dragMove(coordinates.x);
                    y.dragMove(coordinates.y);

                    that.dimensions.rescale(movable.scale);
                    that.gesture = e;
                    e.preventDefault();
                },

                move: function(e) {
                    if (e.event.target.tagName.match(/textarea|input/i)) {
                        return;
                    }

                    if (x.dimension.enabled || y.dimension.enabled) {
                        x.dragMove(e.x.delta);
                        y.dragMove(e.y.delta);
                        e.preventDefault();
                    } else {
                        e.touch.skip();
                    }
                },

                end: function(e) {
                    e.preventDefault();
                }
            });
        }
    });

    var TRANSFORM_STYLE = support.transitions.prefix + "Transform",
        translate;


    if (support.hasHW3D) {
        translate = function(x, y, scale) {
            return "translate3d(" + x + "px," + y +"px,0) scale(" + scale + ")";
        };
    } else {
        translate = function(x, y, scale) {
            return "translate(" + x + "px," + y +"px) scale(" + scale + ")";
        };
    }

    var Movable = Observable.extend({
        init: function(element) {
            var that = this;

            Observable.fn.init.call(that);

            that.element = $(element);
            that.element[0].style.webkitTransformOrigin = "left top";
            that.x = 0;
            that.y = 0;
            that.scale = 1;
            that._saveCoordinates(translate(that.x, that.y, that.scale));
        },

        translateAxis: function(axis, by) {
            this[axis] += by;
            this.refresh();
        },

        scaleTo: function(scale) {
            this.scale = scale;
            this.refresh();
        },

        scaleWith: function(scaleDelta) {
            this.scale *= scaleDelta;
            this.refresh();
        },

        translate: function(coordinates) {
            this.x += coordinates.x;
            this.y += coordinates.y;
            this.refresh();
        },

        moveAxis: function(axis, value) {
            this[axis] = value;
            this.refresh();
        },

        moveTo: function(coordinates) {
            extend(this, coordinates);
            this.refresh();
        },

        refresh: function() {
            var that = this,
                x = that.x,
                y = that.y,
                newCoordinates;

            if (that.round) {
                x = Math.round(x);
                y = Math.round(y);
            }

            newCoordinates = translate(x, y, that.scale);

            if (newCoordinates != that.coordinates) {
                if (kendo.support.browser.msie && kendo.support.browser.version < 10) {
                    that.element[0].style.position = "absolute";
                    that.element[0].style.left = that.x + "px";
                    that.element[0].style.top = that.y + "px";

                } else {
                    that.element[0].style[TRANSFORM_STYLE] = newCoordinates;
                }
                that._saveCoordinates(newCoordinates);
                that.trigger(CHANGE);
            }
        },

        _saveCoordinates: function(coordinates) {
            this.coordinates = coordinates;
        }
    });

    function destroyDroppable(collection, widget) {
        var groupName = widget.options.group,
        droppables = collection[groupName],
        i;

        Widget.fn.destroy.call(widget);

        if (droppables.length > 1) {
            for (i = 0; i < droppables.length; i++) {
                if (droppables[i] == widget) {
                    droppables.splice(i, 1);
                    break;
                }
            }
        } else {
            droppables.length = 0; // WTF, porting this from the previous destroyGroup
            delete collection[groupName];
        }
    }

    var DropTarget = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            var group = that.options.group;

            if (!(group in dropTargets)) {
                dropTargets[group] = [ that ];
            } else {
                dropTargets[group].push( that );
            }
        },

        events: [
            DRAGENTER,
            DRAGLEAVE,
            DROP
        ],

        options: {
            name: "DropTarget",
            group: "default"
        },

        destroy: function() {
            destroyDroppable(dropTargets, this);
        },

        _trigger: function(eventName, e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                return that.trigger(eventName, extend({}, e.event, {
                           draggable: draggable,
                           dropTarget: e.dropTarget
                       }));
            }
        },

        _over: function(e) {
            this._trigger(DRAGENTER, e);
        },

        _out: function(e) {
            this._trigger(DRAGLEAVE, e);
        },

        _drop: function(e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                draggable.dropped = !that._trigger(DROP, e);
            }
        }
    });

    DropTarget.destroyGroup = function(groupName) {
        var group = dropTargets[groupName] || dropAreas[groupName],
            i;

        if (group) {
            for (i = 0; i < group.length; i++) {
                Widget.fn.destroy.call(group[i]);
            }

            group.length = 0;
            delete dropTargets[groupName];
            delete dropAreas[groupName];
        }
    };

    DropTarget._cache = dropTargets;

    var DropTargetArea = DropTarget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            var group = that.options.group;

            if (!(group in dropAreas)) {
                dropAreas[group] = [ that ];
            } else {
                dropAreas[group].push( that );
            }
        },

        destroy: function() {
            destroyDroppable(dropAreas, this);
        },

        options: {
            name: "DropTargetArea",
            group: "default",
            filter: null
        }
    });

    var Draggable = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._activated = false;

            that.userEvents = new UserEvents(that.element, {
                global: true,
                allowSelection: true,
                filter: that.options.filter,
                threshold: that.options.distance,
                start: proxy(that._start, that),
                hold: proxy(that._hold, that),
                move: proxy(that._drag, that),
                end: proxy(that._end, that),
                cancel: proxy(that._cancel, that),
                select: proxy(that._select, that)
            });

            that._afterEndHandler = proxy(that._afterEnd, that);
            that._captureEscape = proxy(that._captureEscape, that);
        },

        events: [
            HOLD,
            DRAGSTART,
            DRAG,
            DRAGEND,
            DRAGCANCEL,
            HINTDESTROYED
        ],

        options: {
            name: "Draggable",
            distance: ( kendo.support.touch ? 0 : 5),
            group: "default",
            cursorOffset: null,
            axis: null,
            container: null,
            filter: null,
            ignore: null,
            holdToDrag: false,
            autoScroll: false,
            dropped: false
        },

        cancelHold: function() {
            this._activated = false;
        },

        _captureEscape: function(e) {
            var that = this;

            if (e.keyCode === kendo.keys.ESC) {
                that._trigger(DRAGCANCEL, { event: e });
                that.userEvents.cancel();
            }
        },

        _updateHint: function(e) {
            var that = this,
                coordinates,
                options = that.options,
                boundaries = that.boundaries,
                axis = options.axis,
                cursorOffset = that.options.cursorOffset;

            if (cursorOffset) {
               coordinates = { left: e.x.location + cursorOffset.left, top: e.y.location + cursorOffset.top };
            } else {
                that.hintOffset.left += e.x.delta;
                that.hintOffset.top += e.y.delta;
                coordinates = $.extend({}, that.hintOffset);
            }

            if (boundaries) {
                coordinates.top = within(coordinates.top, boundaries.y);
                coordinates.left = within(coordinates.left, boundaries.x);
            }

            if (axis === "x") {
                delete coordinates.top;
            } else if (axis === "y") {
                delete coordinates.left;
            }

            that.hint.css(coordinates);
        },

        _shouldIgnoreTarget: function(target) {
            var ignoreSelector = this.options.ignore;
            return ignoreSelector && $(target).is(ignoreSelector);
        },

        _select: function(e) {
            if (!this._shouldIgnoreTarget(e.event.target)) {
                e.preventDefault();
            }
        },

        _start: function(e) {
            var that = this,
                options = that.options,
                container = options.container ? $(options.container): null,
                hint = options.hint;

            if (this._shouldIgnoreTarget(e.touch.initialTouch) || (options.holdToDrag && !that._activated)) {
                that.userEvents.cancel();
                return;
            }

            that.currentTarget = e.target;
            that.currentTargetOffset = getOffset(that.currentTarget);

            if (hint) {
                if (that.hint) {
                    that.hint.stop(true, true).remove();
                }

                that.hint = kendo.isFunction(hint) ? $(hint.call(that, that.currentTarget)) : hint;

                var offset = getOffset(that.currentTarget);
                that.hintOffset = offset;

                that.hint.css( {
                    position: "absolute",
                    zIndex: 20000, // the Window's z-index is 10000 and can be raised because of z-stacking
                    left: offset.left,
                    top: offset.top
                })
                .appendTo(document.body);

                that.angular("compile", function(){
                    that.hint.removeAttr("ng-repeat");
                    var scopeTarget = $(e.target);

                    while (!scopeTarget.data("$$kendoScope") && scopeTarget.length) {
                        scopeTarget = scopeTarget.parent();
                    }

                    return {
                        elements: that.hint.get(),
                        scopeFrom: scopeTarget.data("$$kendoScope")
                    };
                });
            }

            draggables[options.group] = that;

            that.dropped = false;

            if (container) {
                that.boundaries = containerBoundaries(container, that.hint);
            }

            $(document).on(KEYUP, that._captureEscape);

            if (that._trigger(DRAGSTART, e)) {
                that.userEvents.cancel();
                that._afterEnd();
            }

            that.userEvents.capture();
        },

        _hold: function(e) {
            this.currentTarget = e.target;

            if (this._trigger(HOLD, e)) {
                this.userEvents.cancel();
            } else {
                this._activated = true;
            }
        },

        _drag: function(e) {
            e.preventDefault();

            var cursorElement = this._elementUnderCursor(e);

            if (this.options.autoScroll && this._cursorElement !== cursorElement) {
                this._scrollableParent = findScrollableParent(cursorElement);
                this._cursorElement = cursorElement;
            }

            this._lastEvent = e;
            this._processMovement(e, cursorElement);

            if (this.options.autoScroll) {
                // chrome seems to trigger mousemove when mouse is moved outside of the window (over the Chrome), too.
                if (this._scrollableParent[0]) {
                    var velocity = autoScrollVelocity(e.x.location, e.y.location, scrollableViewPort(this._scrollableParent));


                    this._scrollCompenstation = $.extend({}, this.hintOffset);
                    this._scrollVelocity = velocity;

                    if (velocity.y === 0 && velocity.x === 0) {
                        clearInterval(this._scrollInterval);
                        this._scrollInterval = null;
                    } else if(!this._scrollInterval) {
                        this._scrollInterval = setInterval($.proxy(this, "_autoScroll"), 50);
                    }
                }
            }

            if (this.hint) {
                this._updateHint(e);
            }
        },

        _processMovement: function(e, cursorElement) {
            this._withDropTarget(cursorElement, function(target, targetElement) {
                if (!target) {
                    if (lastDropTarget) {
                        lastDropTarget._trigger(DRAGLEAVE, extend(e, { dropTarget: $(lastDropTarget.targetElement) }));
                        lastDropTarget = null;
                    }
                    return;
                }

                if (lastDropTarget) {
                    if (targetElement === lastDropTarget.targetElement) {
                        return;
                    }

                    lastDropTarget._trigger(DRAGLEAVE, extend(e, { dropTarget: $(lastDropTarget.targetElement) }));
                }

                target._trigger(DRAGENTER, extend(e, { dropTarget: $(targetElement) }));
                lastDropTarget = extend(target, { targetElement: targetElement });
            });

            this._trigger(DRAG, extend(e, { dropTarget: lastDropTarget, elementUnderCursor: cursorElement }));
        },

        _autoScroll: function() {
            var parent = this._scrollableParent[0],
                velocity = this._scrollVelocity,
                compensation = this._scrollCompenstation;

            if (!parent) {
                return;
            }

            var cursorElement = this._elementUnderCursor(this._lastEvent);
            this._processMovement(this._lastEvent, cursorElement);

            var yIsScrollable, xIsScrollable;

            var isRootNode = parent === scrollableRoot()[0];

            if (isRootNode) {
                yIsScrollable = document.body.scrollHeight > $window.height();
                xIsScrollable = document.body.scrollWidth > $window.width();
            } else {
                yIsScrollable = parent.offsetHeight <= parent.scrollHeight;
                xIsScrollable = parent.offsetWidth <= parent.scrollWidth;
            }

            var yDelta = parent.scrollTop + velocity.y;
            var yInBounds = yIsScrollable && yDelta > 0 && yDelta < parent.scrollHeight;

            var xDelta = parent.scrollLeft + velocity.x;
            var xInBounds = xIsScrollable && xDelta > 0 && xDelta < parent.scrollWidth;

            if (yInBounds) {
                parent.scrollTop += velocity.y;
            }

            if (xInBounds) {
                parent.scrollLeft += velocity.x;
            }

            if (this.hint && isRootNode && (xInBounds || yInBounds)) {
                if (yInBounds) {
                    compensation.top += velocity.y;
                }

                if (xInBounds) {
                    compensation.left += velocity.x;
                }

                this.hint.css(compensation);
            }
        },

        _end: function(e) {
            this._withDropTarget(this._elementUnderCursor(e), function(target, targetElement) {
                if (target) {
                    target._drop(extend({}, e, { dropTarget: $(targetElement) }));
                    lastDropTarget = null;
                }
            });

            this._cancel(this._trigger(DRAGEND, e));
        },

        _cancel: function(isDefaultPrevented) {
            var that = this;

            that._scrollableParent = null;
            this._cursorElement = null;
            clearInterval(this._scrollInterval);
            that._activated = false;

            if (that.hint && !that.dropped) {
                setTimeout(function() {
                    that.hint.stop(true, true);

                    if (isDefaultPrevented) {
                        that._afterEndHandler();
                    } else {
                        that.hint.animate(that.currentTargetOffset, "fast", that._afterEndHandler);
                    }
                }, 0);

            } else {
                that._afterEnd();
            }
        },

        _trigger: function(eventName, e) {
            var that = this;

            return that.trigger(
                eventName, extend(
                {},
                e.event,
                {
                    x: e.x,
                    y: e.y,
                    currentTarget: that.currentTarget,
                    initialTarget: e.touch ? e.touch.initialTouch : null,
                    dropTarget: e.dropTarget,
                    elementUnderCursor: e.elementUnderCursor
                }
            ));
        },

        _elementUnderCursor: function(e) {
            var target = elementUnderCursor(e),
                hint = this.hint;

            if (hint && contains(hint[0], target)) {
                hint.hide();
                target = elementUnderCursor(e);
                // IE8 does not return the element in iframe from first attempt
                if (!target) {
                    target = elementUnderCursor(e);
                }
                hint.show();
            }

            return target;
        },

        _withDropTarget: function(element, callback) {
            var result,
                group = this.options.group,
                targets = dropTargets[group],
                areas = dropAreas[group];

            if (targets && targets.length || areas && areas.length) {
                result = checkTarget(element, targets, areas);

                if (result) {
                    callback(result.target, result.targetElement);
                } else {
                    callback();
                }
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that._afterEnd();

            that.userEvents.destroy();

            this._scrollableParent = null;
            this._cursorElement = null;
            clearInterval(this._scrollInterval);

            that.currentTarget = null;
        },

        _afterEnd: function() {
            var that = this;

            if (that.hint) {
                that.hint.remove();
            }

            delete draggables[that.options.group];

            that.trigger("destroy");
            that.trigger(HINTDESTROYED);
            $(document).off(KEYUP, that._captureEscape);
        }
    });

    kendo.ui.plugin(DropTarget);
    kendo.ui.plugin(DropTargetArea);
    kendo.ui.plugin(Draggable);
    kendo.TapCapture = TapCapture;
    kendo.containerBoundaries = containerBoundaries;

    extend(kendo.ui, {
        Pane: Pane,
        PaneDimensions: PaneDimensions,
        Movable: Movable
    });

    function scrollableViewPort(element) {
        var root = scrollableRoot()[0],
            offset,
            top,
            left;

        if (element[0] === root) {
            top = root.scrollTop;
            left = root.scrollLeft;

            return {
                top: top,
                left: left,
                bottom: top + $window.height(),
                right: left + $window.width()
            };
        } else {
            offset = element.offset();
            offset.bottom = offset.top + element.height();
            offset.right =  offset.left + element.width();
            return offset;
        }
    }

    function scrollableRoot() {
        return $(kendo.support.browser.edge || kendo.support.browser.safari ? document.body : document.documentElement);
    }

    function findScrollableParent(element) {
        var root = scrollableRoot();

        if (!element || element === document.body || element === document.documentElement) {
            return root;
        }

        var parent = $(element)[0];

        while (parent && !kendo.isScrollable(parent) && parent !== document.body) {
            parent = parent.parentNode;
        }

        if (parent === document.body) {
            return root;
        }

        return $(parent);
    }

    function autoScrollVelocity(mouseX, mouseY, rect) {
        var velocity = { x: 0, y: 0 };

        var AUTO_SCROLL_AREA = 50;

        if (mouseX - rect.left < AUTO_SCROLL_AREA) {
            velocity.x = -(AUTO_SCROLL_AREA - (mouseX - rect.left));
        } else if (rect.right - mouseX < AUTO_SCROLL_AREA) {
            velocity.x = AUTO_SCROLL_AREA - (rect.right - mouseX);
        }

        if (mouseY - rect.top < AUTO_SCROLL_AREA) {
            velocity.y = -(AUTO_SCROLL_AREA - (mouseY - rect.top));
        } else if (rect.bottom - mouseY < AUTO_SCROLL_AREA) {
            velocity.y = AUTO_SCROLL_AREA - (rect.bottom - mouseY);
        }

        return velocity;
    }

    // export for testing
    kendo.ui.Draggable.utils = {
        autoScrollVelocity: autoScrollVelocity,
        scrollableViewPort: scrollableViewPort,
        findScrollableParent: findScrollableParent
    };

 })(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
