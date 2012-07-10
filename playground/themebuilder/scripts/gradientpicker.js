(function($, undefined) {

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        Class = kendo.Class,
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
                .appendTo(element);

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
                var that = this;

                that.element.css("background-image", that.parent.gradients.get(support.transforms.css, that.index));
                that.parent.element.css("background-image", that.parent.gradients.get(support.transforms.css));
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
                var that = this;

                Widget.fn.init.call(that, element, options);
                element = that.element;

                that.styleengine = that.element.parents(".device").data("kendoStyleEngine");

                that.popup = new ui.Popup("<div class='k-gradientpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center",
                    close: function () {
                        that.styleengine.update(that.element, { "background-image": that.gradients.get("-webkit-") });
                    }
                });

                that.gradients = new Gradient(element.css("background-image"));
                var value = that.gradients.value;

                for (var j = 0, valueLen = value.length; j < valueLen; j++) {
                    var sample = value[j].gradientElement = $("<div class='sample' />");

                    sample.css({
                        backgroundColor: element.css("background-color"),
                        backgroundImage: that.gradients.get(support.transforms.css, j)
                    });
                    sample.appendTo(that.popup.element);

                    for (var i = 0, stopsLen = value[j].stops.length; i < stopsLen; i++) {
                        value[j].stops[i].dragStop = new DragStop(sample, value[j].stops[i], that, j);
                    }

                }

                element
                    .bind({
                        click: function(e) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            that._toggle();
                        }
                    });

                that.popup.element.on("click", function (e) {
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
                name: "GradientPicker"
            },

            _toggle: function(open) {
                var that = this, color;
                open = open !== undefined? open : !that.popup.visible();

                that.popup[open ? "open" : "close"]();
            }
        });

    ui.plugin(GradientPicker);

})(jQuery);
