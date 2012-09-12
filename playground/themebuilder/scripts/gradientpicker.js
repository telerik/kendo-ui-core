(function($, undefined) {

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        Class = kendo.Class,
        rotatorGradient = new Gradient("linear-gradient(top, rgba(255,255,255,.7), rgba(255,255,255,0))"),
        proxy = $.proxy,
        ACTIVE_STATE = "km-state-active",

        DragStop = Class.extend({
            init: function (element, stop, parent, index) {
                var that = this;

                that.element = element;
                that.stop = stop;
                that.parent = parent;
                that.index = index;

                that.constrain = element.width();
                that.snapPoint = that.constrain / 100;

                that.point = $("<div class='stop' />").css({
                    backgroundColor: stop.color.get(),
                    left: stop.position + "%" || "1px"
                })
                .prependTo(element);

                that.point
                    .on(kendo.support.mousedown, function () {
                        that.select(this);
                        $(this).trigger(kendo.support.mouseup);
                    }).on(kendo.support.mouseup, function (e) {
                        if (that.stopped) {
                            e.stopImmediatePropagation();
                        }
                    });

                that.point.data("stop", that);

                that.drag = new kendo.UserEvents(that.point, {
                    global: true,
                    stopPropagation: true,
                    tap: function () {
                        that.stopped = false;
                    },
                    start: proxy(that._start, that),
                    move: proxy(that._move, that),
                    end: proxy(that._stop, that)
                });
            },

            updateColor: function(color) {
                this.stop.color.set(color.get());
            },

            select: function(point) {
                point = $(point);

                point
                    .siblings(".k-state-selected")
                    .removeClass("k-state-selected")
                    .end()
                    .addClass("k-state-selected");
            },

            _move: function(e) {
                var that = this, value;
                e.preventDefault();

                value = that._position(limitValue((e.touch.x.client - that.targetOffsetX), 0, that.constrain));
                if (value != that.stop.position) {
                    that.stop.position = value;
                    that.parent._updateConnected(this.element, this.index);
                }
            },

            _position: function(position) {
                var that = this;

                that.position = position;
                that.point.css("left", position + "px");

                return that.position / that.snapPoint;
            },

            _start: function() {
                var that = this;

                that.targetOffsetX = that.element.offset().left;
                that.drag.capture();
                that.element.addClass(ACTIVE_STATE);
            },

            _stop: function(e) {
                var that = this,
                    value = that._position(limitValue((e.touch.x.client - that.targetOffsetX), 0, that.constrain));

                that.stopped = true;
                that.element.removeClass(ACTIVE_STATE);
                that.stop.position = value;
                that.parent._updateConnected(this.element, this.index);
            }
        }),

        GradientPicker = Widget.extend({
            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;

                if (!options.filter) {
                    element.addClass("k-sampler");
                }

                that.bgcolor = new Color(element.css("background-color"));

                that.styleengine = that.element.parents(".device").data("kendoStyleEngine");

                that.popup = new ui.Popup("<div class='k-gradientpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center",
                    open: function () {
                    },
                    close: function () {
                        if (that.styleengine) {
                            var background = { "background-image": that.gradients.get(support.transforms.css) };
                            background = that.styleengine.mixBackground(background, that.element);

                            that.styleengine.update(that.element, background);
                        }
                    }
                });

                that.gradients = new Gradient(element.css("background-image"));

                that._addRotators();
                that.gradientCollection = $("<div class='collection' />").appendTo(that.popup.element);
                that._update();

                if (!options.filter) {
                    $(document.body)
                        .on(kendo.support.mouseup, ".k-sampler", function(e) {
                            if (e.currentTarget == element[0]) {
                                e.preventDefault();
                                that._toggle();
                            }
                        });
                } else {
                    $(element)
                        .on(kendo.support.mouseup, options.filter, function(e) {
                            if (support.matchesSelector.call(e.currentTarget, options.filter)) {
                                e.preventDefault();
                                that.target = $(e.currentTarget);
                                that.popup.options.anchor = that.target;
                                that._toggle();
                            }
                        });
                }

                that.popup.element
                    .addClass("k-list-container");
//                    .on("click", function (e) {
//                        if (!$(e.target).closest(".k-popup").hasClass("k-gradientpick")) { return; }
//
//                        var popup = that.picker.popup;
//
//                        if (popup && !popup.element.data("animating")) {
//                            popup.close();
//                        }
//                    });

                that.picker = that.popup.element
                                .kendoHSLPicker({ filter: ".stop", pick: proxy(that._pick, that) })
                                .data("kendoHSLPicker");
            },

            options: {
                name: "GradientPicker",
                filter: null,
                toggleTarget: null
            },

            open: function (target) {
                if (typeof target != "undefined") {
                    this.target = target;
                }

                this._toggle(true);
            },

            close: function () {
                this._toggle(false);
            },

            _pick: function (e) {
                var target = e.target,
                    index = target.parent().index(".sample");

                target.data("stop").updateColor(e.color);
                this._updateConnected(target.parent(), index);
            },

            _updateConnected: function (element, index) {
                var that = this,
                    filter = that.options.filter,
                    target = !filter ? that.element : that.target,
                    gradient = that.gradients.get(support.transforms.css);

                element.children(".gradient-preview").css("background-image", that.gradients.get(support.transforms.css, index, "left"));
                target.css("background-image", gradient);
                target.attr("data-gradient", gradient);
            },

            _addRotators: function () {
                var that = this;

                $.each( [ "top", "bottom", "right", "left", "top left", "bottom right", "bottom left", "top right" ], function (index, value) {
                    $("<div class='rotator' style='background-image: " + rotatorGradient.setAngle(0, value).get() + "' title='" + value + "' />").appendTo(that.popup.element);
                });

                that.popup.element.on(kendo.support.mouseup, ".rotator", function (e) {
                    var dragStop = that.gradients.value[0].stops[0].dragStop;

                    that.gradients.setAngle(0, e.currentTarget.title);
                    that._updateConnected(dragStop.element, dragStop.index);

                    $(this)
                        .siblings(".k-state-active")
                        .removeClass("k-state-active").end()
                        .addClass("k-state-active");
                });
            },

            _update: function (updateAttr, trigger) {
                var that = this,
                    target = !that.options.filter ? that.element : that.target;

                if (target) {

                    that.popup.element
                        .find("[title=" + that.gradients.getDirection(0) + "]")
                        .siblings(".k-state-active")
                        .removeClass("k-state-active").end()
                        .addClass("k-state-active");

                    that.gradientCollection.empty(); // Do Destroy on Picker/s.
                    that.bgcolor.set(target.css("background-color"));

                    that.gradients.value.forEach(function (currentValue, index) {
                        var sample = currentValue.gradientElement = $("<div class='sample'><div class='gradient-preview'></div></div>");

                        sample
                            .children(".gradient-preview")
                            .css({
                                backgroundColor: that.bgcolor.get(),
                                backgroundImage: that.gradients.get(support.transforms.css, index, "left")
                            })
                            .end()
                            .on(kendo.support.mouseup, ".gradient-preview", function(e) {
                                var newStop = { color: new Color("#000"), position: (e.offsetX || e.originalEvent.layerX) / $(this).outerWidth() * 100 };
                                currentValue.stops.push(newStop);
                                newStop.dragStop = new DragStop(sample, newStop, that, index);
                                that._updateConnected(sample, index);
                                newStop.dragStop.point.trigger(kendo.support.mouseup);
                            })
                            .appendTo(that.gradientCollection);

                        for (var i = currentValue.stops.length-1; i >= 0; i--) {
                            currentValue.stops[i].dragStop = new DragStop(sample, currentValue.stops[i], that, index);
                        }
                    });

                    if (trigger) {
                        that.trigger("pick", { color: that.color, target: target });
                    }
                }
            },

            _toggle: function(open) {
                var that = this, target, options = that.options;

                if (options.filter) {
                    that.target = that.target || that.element.find(options.filter);
                }
                target = !options.filter ? that.element : that.target;

                open = open !== undefined? open : that.options.filter ? true : !that.popup.visible();

                if (open) {
                    that.gradients.set(target.css("background-image"));
                    that._update(true);
                }

                that.popup[open ? "open" : "close"]();
            }

        });

    ui.plugin(GradientPicker);

})(jQuery);
