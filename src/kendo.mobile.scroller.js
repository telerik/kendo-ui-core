(function(f, define){
    define([ "./kendo.fx", "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "mobile.scroller",
    name: "Scroller",
    category: "mobile",
    description: "The Kendo Mobile Scroller widget enables touch friendly kinetic scrolling for the contents of a given DOM element.",
    depends: [ "fx", "draganddrop" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        fx = kendo.effects,
        ui = mobile.ui,
        proxy = $.proxy,
        extend = $.extend,
        Widget = ui.Widget,
        Class = kendo.Class,
        Movable = kendo.ui.Movable,
        Pane = kendo.ui.Pane,
        PaneDimensions = kendo.ui.PaneDimensions,
        Transition = fx.Transition,
        Animation = fx.Animation,
        abs = Math.abs,
        SNAPBACK_DURATION = 500,
        SCROLLBAR_OPACITY = 0.7,
        FRICTION = 0.96,
        VELOCITY_MULTIPLIER = 10,
        MAX_VELOCITY = 55,
        OUT_OF_BOUNDS_FRICTION = 0.5,
        ANIMATED_SCROLLER_PRECISION = 5,
        RELEASECLASS = "km-scroller-release",
        REFRESHCLASS = "km-scroller-refresh",
        PULL = "pull",
        CHANGE = "change",
        RESIZE = "resize",
        SCROLL = "scroll",
        MOUSE_WHEEL_ID = 2;

    var ZoomSnapBack = Animation.extend({
        init: function(options) {
            var that = this;
            Animation.fn.init.call(that);
            extend(that, options);

            that.userEvents.bind("gestureend", proxy(that.start, that));
            that.tapCapture.bind("press", proxy(that.cancel, that));
        },

        enabled: function() {
          return this.movable.scale < this.dimensions.minScale;
        },

        done: function() {
            return this.dimensions.minScale - this.movable.scale < 0.01;
        },

        tick: function() {
            var movable = this.movable;
            movable.scaleWith(1.1);
            this.dimensions.rescale(movable.scale);
        },

        onEnd: function() {
            var movable = this.movable;
            movable.scaleTo(this.dimensions.minScale);
            this.dimensions.rescale(movable.scale);
        }
    });

    var DragInertia = Animation.extend({
        init: function(options) {
            var that = this;

            Animation.fn.init.call(that);

            extend(that, options, {
                transition: new Transition({
                    axis: options.axis,
                    movable: options.movable,
                    onEnd: function() { that._end(); }
                })
            });

            that.tapCapture.bind("press", function() { that.cancel(); });
            that.userEvents.bind("end", proxy(that.start, that));
            that.userEvents.bind("gestureend", proxy(that.start, that));
            that.userEvents.bind("tap", proxy(that.onEnd, that));
        },

        onCancel: function() {
            this.transition.cancel();
        },

        freeze: function(location) {
            var that = this;
            that.cancel();
            that._moveTo(location);
        },

        onEnd: function() {
            var that = this;
            if (that.paneAxis.outOfBounds()) {
                that._snapBack();
            } else {
                that._end();
            }
        },

        done: function() {
            return abs(this.velocity) < 1;
        },

        start: function(e) {
            var that = this,
                velocity;

            if (!that.dimension.enabled) { return; }


            if (that.paneAxis.outOfBounds()) {
                that._snapBack();
            } else {
                velocity = e.touch.id === MOUSE_WHEEL_ID ? 0 : e.touch[that.axis].velocity;
                that.velocity = Math.max(Math.min(velocity * that.velocityMultiplier, MAX_VELOCITY), -MAX_VELOCITY);

                that.tapCapture.captureNext();
                Animation.fn.start.call(that);
            }
        },

        tick: function() {
            var that = this,
                dimension = that.dimension,
                friction = that.paneAxis.outOfBounds() ? OUT_OF_BOUNDS_FRICTION : that.friction,
                delta = (that.velocity *= friction),
                location = that.movable[that.axis] + delta;

                if (!that.elastic && dimension.outOfBounds(location)) {
                    location = Math.max(Math.min(location, dimension.max), dimension.min);
                    that.velocity = 0;
                }

            that.movable.moveAxis(that.axis, location);
        },

        _end: function() {
            this.tapCapture.cancelCapture();
            this.end();
        },

        _snapBack: function() {
            var that = this,
                dimension = that.dimension,
                snapBack = that.movable[that.axis] > dimension.max ? dimension.max : dimension.min;
            that._moveTo(snapBack);
        },

        _moveTo: function(location) {
            this.transition.moveTo({ location: location, duration: SNAPBACK_DURATION, ease: Transition.easeOutExpo });
        }
    });

    var AnimatedScroller = Animation.extend({
        init: function(options) {
            var that = this;

            kendo.effects.Animation.fn.init.call(this);

            extend(that, options, {
                origin: {},
                destination: {},
                offset: {}
            });
        },

        tick: function() {
            this._updateCoordinates();
            this.moveTo(this.origin);
        },

        done: function() {
            return abs(this.offset.y) < ANIMATED_SCROLLER_PRECISION && abs(this.offset.x) < ANIMATED_SCROLLER_PRECISION;
        },

        onEnd: function() {
            this.moveTo(this.destination);
            if (this.callback) {
                this.callback.call();
            }
        },

        setCoordinates: function(from, to) {
            this.offset = {};
            this.origin = from;
            this.destination = to;
        },

        setCallback: function(callback) {
            if (callback && kendo.isFunction(callback)) {
                this.callback = callback;
            } else {
                callback = undefined;
            }
        },

        _updateCoordinates: function() {
            this.offset = {
                x: (this.destination.x - this.origin.x) / 4,
                y: (this.destination.y - this.origin.y) / 4
            };

            this.origin = {
                y: this.origin.y + this.offset.y,
                x: this.origin.x + this.offset.x
            };
        }
    });

    var ScrollBar = Class.extend({
        init: function(options) {
            var that = this,
                horizontal = options.axis === "x",
                element = $('<div class="km-touch-scrollbar km-' + (horizontal ? "horizontal" : "vertical") + '-scrollbar" />');

            extend(that, options, {
                element: element,
                elementSize: 0,
                movable: new Movable(element),
                scrollMovable: options.movable,
                alwaysVisible: options.alwaysVisible,
                size: horizontal ? "width" : "height"
            });

            that.scrollMovable.bind(CHANGE, proxy(that.refresh, that));
            that.container.append(element);
            if (options.alwaysVisible) {
                that.show();
            }
        },

        refresh: function() {
            var that = this,
                axis = that.axis,
                dimension = that.dimension,
                paneSize = dimension.size,
                scrollMovable = that.scrollMovable,
                sizeRatio = paneSize / dimension.total,
                position = Math.round(-scrollMovable[axis] * sizeRatio),
                size = Math.round(paneSize * sizeRatio);

                if (sizeRatio >= 1) {
                    this.element.css("display", "none");
                } else {
                    this.element.css("display", "");
                }

                if (position + size > paneSize) {
                    size = paneSize - position;
                } else if (position < 0) {
                    size += position;
                    position = 0;
                }

            if (that.elementSize != size) {
                that.element.css(that.size, size + "px");
                that.elementSize = size;
            }

            that.movable.moveAxis(axis, position);
        },

        show: function() {
            this.element.css({opacity: SCROLLBAR_OPACITY, visibility: "visible"});
        },

        hide: function() {
            if (!this.alwaysVisible) {
                this.element.css({opacity: 0});
            }
        }
    });

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            that._native = that.options.useNative && kendo.support.hasNativeScrolling;
            if (that._native) {
                element.addClass("km-native-scroller")
                    .prepend('<div class="km-scroll-header"/>');

                extend(that, {
                    scrollElement: element,
                    fixedContainer: element.children().first()
                });

                return;
            }

            element
                .css("overflow", "hidden")
                .addClass("km-scroll-wrapper")
                .wrapInner('<div class="km-scroll-container"/>')
                .prepend('<div class="km-scroll-header"/>');

            var inner = element.children().eq(1),

                tapCapture = new kendo.TapCapture(element),

                movable = new Movable(inner),

                dimensions = new PaneDimensions({
                    element: inner,
                    container: element,
                    forcedEnabled: that.options.zoom
                }),

                avoidScrolling = this.options.avoidScrolling,

                userEvents = new kendo.UserEvents(element, {
                    allowSelection: true,
                    preventDragEvent: true,
                    captureUpIfMoved: true,
                    multiTouch: that.options.zoom,
                    start: function(e) {
                        dimensions.refresh();

                        var velocityX = abs(e.x.velocity),
                            velocityY = abs(e.y.velocity),
                            horizontalSwipe  = velocityX * 2 >= velocityY,
                            originatedFromFixedContainer = $.contains(that.fixedContainer[0], e.event.target),
                            verticalSwipe = velocityY * 2 >= velocityX;


                        if (!originatedFromFixedContainer && !avoidScrolling(e) && that.enabled && (dimensions.x.enabled && horizontalSwipe || dimensions.y.enabled && verticalSwipe)) {
                            userEvents.capture();
                        } else {
                            userEvents.cancel();
                        }
                    }
                }),

                pane = new Pane({
                    movable: movable,
                    dimensions: dimensions,
                    userEvents: userEvents,
                    elastic: that.options.elastic
                }),

                zoomSnapBack = new ZoomSnapBack({
                    movable: movable,
                    dimensions: dimensions,
                    userEvents: userEvents,
                    tapCapture: tapCapture
                }),

                animatedScroller = new AnimatedScroller({
                    moveTo: function(coordinates) {
                        that.scrollTo(coordinates.x, coordinates.y);
                    }
                });

            movable.bind(CHANGE, function() {
                that.scrollTop = - movable.y;
                that.scrollLeft = - movable.x;

                that.trigger(SCROLL, {
                    scrollTop: that.scrollTop,
                    scrollLeft: that.scrollLeft
                });
            });

            if (that.options.mousewheelScrolling) {
                element.on("DOMMouseScroll mousewheel",  proxy(this, "_wheelScroll"));
            }

            extend(that, {
                movable: movable,
                dimensions: dimensions,
                zoomSnapBack: zoomSnapBack,
                animatedScroller: animatedScroller,
                userEvents: userEvents,
                pane: pane,
                tapCapture: tapCapture,
                pulled: false,
                enabled: true,
                scrollElement: inner,
                scrollTop: 0,
                scrollLeft: 0,
                fixedContainer: element.children().first()
            });

            that._initAxis("x");
            that._initAxis("y");

            // build closure
            that._wheelEnd = function() {
                that._wheel = false;
                that.userEvents.end(0, that._wheelY);
            };

            dimensions.refresh();

            if (that.options.pullToRefresh) {
                that._initPullToRefresh();
            }
        },

        _wheelScroll: function(e) {
            if (!this._wheel) {
                this._wheel = true;
                this._wheelY = 0;
                this.userEvents.press(0, this._wheelY);
            }

            clearTimeout(this._wheelTimeout);
            this._wheelTimeout = setTimeout(this._wheelEnd, 50);

            var delta = kendo.wheelDeltaY(e);

            if (delta) {
                this._wheelY += delta;
                this.userEvents.move(0, this._wheelY);
            }

            e.preventDefault();
        },

        makeVirtual: function() {
            this.dimensions.y.makeVirtual();
        },

        virtualSize: function(min, max) {
            this.dimensions.y.virtualSize(min, max);
        },

        height: function() {
            return this.dimensions.y.size;
        },

        scrollHeight: function() {
            return this.scrollElement[0].scrollHeight;
        },

        scrollWidth: function() {
            return this.scrollElement[0].scrollWidth;
        },

        options: {
            name: "Scroller",
            zoom: false,
            pullOffset: 140,
            visibleScrollHints: false,
            elastic: true,
            useNative: false,
            mousewheelScrolling: true,
            avoidScrolling: function() { return false; },
            pullToRefresh: false,
            messages: {
                pullTemplate: "Pull to refresh",
                releaseTemplate: "Release to refresh",
                refreshTemplate: "Refreshing"
            }
        },

        events: [
            PULL,
            SCROLL,
            RESIZE
        ],

        _resize: function() {
            if (!this._native) {
                this.contentResized();
            }
        },

        setOptions: function(options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);
            if (options.pullToRefresh) {
                that._initPullToRefresh();
            }
        },

        reset: function() {
            if (this._native) {
                this.scrollElement.scrollTop(0);
            } else {
                this.movable.moveTo({x: 0, y: 0});
                this._scale(1);
            }
        },

        contentResized: function() {
            this.dimensions.refresh();
            if (this.pane.x.outOfBounds()) {
                this.movable.moveAxis("x", this.dimensions.x.min);
            }

            if (this.pane.y.outOfBounds()) {
                this.movable.moveAxis("y", this.dimensions.y.min);
            }
        },

        zoomOut: function() {
            var dimensions = this.dimensions;
            dimensions.refresh();
            this._scale(dimensions.fitScale);
            this.movable.moveTo(dimensions.centerCoordinates());
        },

        enable: function() {
            this.enabled = true;
        },

        disable: function() {
            this.enabled = false;
        },

        scrollTo: function(x, y) {
            if (this._native) {
                this.scrollElement.scrollLeft(abs(x));
                this.scrollElement.scrollTop(abs(y));
            } else {
                this.dimensions.refresh();
                this.movable.moveTo({x: x, y: y});
            }
        },

        animatedScrollTo: function(x, y, callback) {
            var from,
                to;

            if(this._native) {
                this.scrollTo(x, y);
            } else {
                from = { x: this.movable.x, y: this.movable.y };
                to = { x: x, y: y };

                this.animatedScroller.setCoordinates(from, to);
                this.animatedScroller.setCallback(callback);
                this.animatedScroller.start();
            }
        },

        pullHandled: function() {
            var that = this;
            that.refreshHint.removeClass(REFRESHCLASS);
            that.hintContainer.html(that.pullTemplate({}));
            that.yinertia.onEnd();
            that.xinertia.onEnd();
            that.userEvents.cancel();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            if (this.userEvents) {
                this.userEvents.destroy();
            }
        },

        _scale: function(scale) {
            this.dimensions.rescale(scale);
            this.movable.scaleTo(scale);
        },

        _initPullToRefresh: function() {
            var that = this;

            that.dimensions.y.forceEnabled();
            that.pullTemplate = kendo.template(that.options.messages.pullTemplate);
            that.releaseTemplate = kendo.template(that.options.messages.releaseTemplate);
            that.refreshTemplate = kendo.template(that.options.messages.refreshTemplate);

            that.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-loading-left"></span><span class="km-loading-right"></span><span class="km-template">' + that.pullTemplate({}) + '</span></span>');
            that.refreshHint = that.scrollElement.children().first();
            that.hintContainer = that.refreshHint.children(".km-template");

            that.pane.y.bind("change", proxy(that._paneChange, that));
            that.userEvents.bind("end", proxy(that._dragEnd, that));
        },

        _dragEnd: function() {
            var that = this;

            if(!that.pulled) {
                return;
            }

            that.pulled = false;
            that.refreshHint.removeClass(RELEASECLASS).addClass(REFRESHCLASS);
            that.hintContainer.html(that.refreshTemplate({}));
            that.yinertia.freeze(that.options.pullOffset / 2);
            that.trigger("pull");
        },

        _paneChange: function() {
            var that = this;

            if (that.movable.y / OUT_OF_BOUNDS_FRICTION > that.options.pullOffset) {
                if (!that.pulled) {
                    that.pulled = true;
                    that.refreshHint.removeClass(REFRESHCLASS).addClass(RELEASECLASS);
                    that.hintContainer.html(that.releaseTemplate({}));
                }
            } else if (that.pulled) {
                that.pulled = false;
                that.refreshHint.removeClass(RELEASECLASS);
                that.hintContainer.html(that.pullTemplate({}));
            }
        },

        _initAxis: function(axis) {
            var that = this,
                movable = that.movable,
                dimension = that.dimensions[axis],
                tapCapture = that.tapCapture,
                paneAxis = that.pane[axis],
                scrollBar = new ScrollBar({
                    axis: axis,
                    movable: movable,
                    dimension: dimension,
                    container: that.element,
                    alwaysVisible: that.options.visibleScrollHints
                });

            dimension.bind(CHANGE, function() {
                scrollBar.refresh();
            });

            paneAxis.bind(CHANGE, function() {
                scrollBar.show();
            });

            that[axis + "inertia"] = new DragInertia({
                axis: axis,
                paneAxis: paneAxis,
                movable: movable,
                tapCapture: tapCapture,
                userEvents: that.userEvents,
                dimension: dimension,
                elastic: that.options.elastic,
                friction: that.options.friction || FRICTION,
                velocityMultiplier: that.options.velocityMultiplier || VELOCITY_MULTIPLIER,
                end: function() {
                    scrollBar.hide();
                    that.trigger("scrollEnd", {
                        axis: axis,
                        scrollTop: that.scrollTop,
                        scrollLeft: that.scrollLeft
                    });
                }
            });
        }
    });

    ui.plugin(Scroller);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
