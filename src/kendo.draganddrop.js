(function ($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        proxy = $.proxy,
        draggables = {},
        MOUSEENTER = "mouseneter",
        MOUSEUP = "mouseup",
        MOUSEDOWN = "mousedown",
        MOUSEMOVE = "mousemove",
        DRAGSTART = "dragstart",
        KEYDOWN = "keydown",
        MOUSELEAVE = "mouseleave",
        SELECTSTART = "selectstart";

    function bind(element, filter, eventName, handler) {
        if (filter) {
            element.delegate(filter, eventName, handler);
        } else {
            element.bind(eventName, handler);
        }
    }

    function DropTarget(element, options) {
        var that = this;

        Component.apply(that, arguments); 

        that.element.bind(MOUSEENTER, proxy(that._over, that))
                    .bind(MOUSEUP, proxy(that._drop, that))
                    .bind(MOUSELEAVE, proxy(that._out, that));

        that.group = that.options.group;
        that.bind("dragenter dragleave drop".split(" "), that.options);
    }

    DropTarget.prototype = {
        options: {
            group: "default"
        },

        _trigger: function(eventName) {
            var that = this,
                draggable = draggables[that.group];

            if (draggable) {
                that.trigger(eventName, {
                    draggable: draggable
                });
            }
        },

        _over: function() {
            this._trigger("dragenter");
        },

        _out: function(e) {
            this._trigger("dragleave");
        },

        _drop: function(e) {
            this._trigger("drop");
        }
    }

    kendo.ui.plugin("DropTarget", DropTarget, Component);

    function Draggable(element, options) {
        var that = this;

        Component.apply(that, arguments);

        bind(that.element, that.options.filter, MOUSEDOWN, proxy(that._wait, that));

        that.element.bind("dragstart", false);

        that._startProxy = proxy(that._start, that);
        that._destroyProxy = proxy(that._destroy, that);
        that._stopProxy = proxy(that._stop, that);
        that._dragProxy = proxy(that._drag, that);

        that.group = that.options.group;

        that.bind("dragstart drag dragend".split(" "), that.options);
    }

    Draggable.prototype = {
        options: {
            distance: 5,
            group: "default"
        },

        _wait: function (e) {
            var that = this;
            that._startPosition = { x: e.pageX, y: e.pageY };
            that._currentTarget = e.currentTarget;
            $(document).bind(MOUSEMOVE, that._startProxy)
                       .bind(MOUSEUP, that._destroyProxy);
        },

        _start: function(e) {
            var that = this,
                x = that._startPosition.x - e.pageX,
                y = that._startPosition.y - e.pageY,
                distance = Math.sqrt((x * x) + (y * y));

            if (distance >= that.options.distance) {
                draggables[that.group] = that;

                $(document).unbind(MOUSEMOVE, that._startProxy)
                           .unbind(MOUSEUP, that._destroyProxy)
                           .bind(MOUSEUP, that._stopProxy)
                           .bind(KEYDOWN, that._stopProxy)
                           .bind(MOUSEMOVE, that._dragProxy)
                           .bind(SELECTSTART, false);

               that.trigger("dragstart", {
                    currentTarget: that._currentTarget
               });
            }
        },

        _drag: function(e) {
            var that = this;
            that.trigger("drag", {
                currentTarget: that._currentTarget
            });
        },

        _stop: function(e) {
            var that = this;

            if (e.type == MOUSEUP || e.keyCode == 27) {
                that.trigger("dragend", {
                    currentTarget: that._currentTarget
                });
                that._destroy();
            }
        },

        _destroy: function(e) {
            var that = this;

            delete draggables[that.group];
            $(document).unbind(MOUSEUP, that._stopProxy)
                       .unbind(KEYDOWN, that._stopProxy)
                       .unbind(MOUSEMOVE, that._dragProxy)
                       .unbind(MOUSEMOVE, that._startProxy)
                       .unbind(SELECTSTART, false);
        }
    }

    kendo.ui.plugin("Draggable", Draggable, Component);

   })(jQuery, window);
