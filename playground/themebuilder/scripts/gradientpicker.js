(function($, undefined) {

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        Class = kendo.Class,
        rotatorGradient = new Gradient("linear-gradient(top, #fff, rgba(255,255,255,0))"),
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

                that.picker = that.point.on("click", function (e) {
                    if (that.stopped) {
                        e.stopImmediatePropagation();
                    }
                })
                .kendoHSLPicker({ pick: proxy(that._pick, that) }).data("kendoHSLPicker");

                that.drag = new kendo.Drag(that.point, {
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

            _updateConnected: function () {
                var that = this,
                    filter = that.parent.options.filter,
                    target = !filter ? that.parent.element : that.parent.target;

                that.element.children(".gradient-preview").css("background-image", that.parent.gradients.get(support.transforms.css, that.index, "left"));
                target.css("background-image", that.parent.gradients.get(support.transforms.css));
            },

            _pick: function (e) {
                this.stop.color = e.color;
                this._updateConnected();
            },

            _move: function(e) {
                var that = this, value;
                e.preventDefault();

                value = that._position(limitValue((e.x.client - that.targetOffsetX), 0, that.constrain));
                if (value != that.stop.position) {
                    that.stop.position = value;
                    that._updateConnected();
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
                    value = that._position(limitValue((e.x.client - that.targetOffsetX), 0, that.constrain));

                that.stopped = true;
                that.element.removeClass(ACTIVE_STATE);
                that.stop.position = value;
                that._updateConnected();
            }
        }),

        GradientPicker = Widget.extend({
            init: function (element, options) {
                var that = this, target;

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
                            that.styleengine.update(that.element, { "background-image": that.gradients.get(support.transforms.css) });
                        }
                    }
                });

                that.gradients = new Gradient(element.css("background-image"));
                var value = that.gradients.value;

                that._addRotators();
                that.gradientCollection = $("<div class='collection' />").appendTo(that.popup.element);
                that._update();

                if (!options.filter) {
                    $(document.body)
                        .on({
                            click: function(e) {
                                if (e.currentTarget == element[0]) {
                                    e.preventDefault();
                                    that._toggle();
                                }
                            }
                        }, ".k-sampler");
                } else {
                    $(element)
                        .on("click", options.filter, function(e) {
                            if (support.matchesSelector.call(e.currentTarget, options.filter)) {
                                e.preventDefault();
                                that.target = $(e.currentTarget);
                                that.popup.options.anchor = that.target;
                                that._toggle();
                            }
                        });
                }

                that.popup.element
                    .addClass("k-list-container")
                    .on("click", function (e) {
                        if (!$(e.target).closest(".k-popup").hasClass("k-gradientpick")) { return; }

                        for (var j = 0, valueLen = value.length; j < valueLen; j++) {
                            for (var i = 0, stopsLen = value[j].stops.length; i < stopsLen; i++) {
                                var popup = value[j].stops[i].dragStop.picker.popup;

                                if (!popup.element.data("animating")) {
                                    value[j].stops[i].dragStop.picker.popup.close();
                                }
                            }
                        }
                    });

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

            _addRotators: function () {
                var that = this;
//                rotation = currentValue.rotationElement = $("<div class='rotation-preview'></div>")
//                                                               .appendTo(that.popup.element);

                $.each( [ "top", "bottom", "right", "left", "top left", "bottom right", "bottom left", "top right" ], function (index, value) {
                    $("<div class='rotator ' style='background-image: " + rotatorGradient.setAngle(0, value).get() + "' />").appendTo(that.popup.element);
                });

//                rotation
//                    .css(support.transforms.css + "transform", "rotate(" + -currentValue.angle + "deg)")
//                    .bind("click", function (e) {
//                        that.gradients.setAngle(index, currentValue.angle + 45);
//                        rotation.css(support.transforms.css + "transform", "rotate(" + -currentValue.angle + "deg)");
//                        currentValue.stops[0].dragStop._updateConnected();
//                    });
//
            },

            _update: function (updateAttr, trigger) {
                var that = this,
                    target = !that.options.filter ? that.element : that.target,
                    value = that.gradients.value;

                if (target) {
                    that.gradientCollection.empty(); // Do Destroy on Picker/s.
                    that.bgcolor.set(target.css("background-color"));

                    value.forEach(function (currentValue, index) {
                        var sample = currentValue.gradientElement = $("<div class='sample'><div class='gradient-preview'></div></div><br />");

                        sample
                            .children(".gradient-preview")
                            .css({
                                backgroundColor: that.bgcolor.get(),
                                backgroundImage: that.gradients.get(support.transforms.css, index, "left")
                            })
                            .end()
                            .on("click", ".gradient-preview", function(e) {
                                var newStop = { color: new Color("#000"), position: (e.offsetX || e.originalEvent.layerX) / $(this).outerWidth() * 100 };
                                currentValue.stops.push(newStop);
                                newStop.dragStop = new DragStop(sample, newStop, that, index);
                                newStop.dragStop._updateConnected();
                            })
                            .appendTo(that.gradientCollection);

                        for (var i = 0, stopsLen = currentValue.stops.length; i < stopsLen; i++) {
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
