(function ($, window) {
    var kendo = window.kendo, 
        proxy = $.proxy,
        draggables = {}
        MOUSEENTER = "mouseneter",
        MOUSEUP = "mouseup"
        MOUSELEAVE = "mouseleave";

    function bind(element, filter, eventName, handler) {
        if (filter) {
            element.delegate(filter, eventName, handler);
        } else {
            element.bind(eventName, handler);
        }
    }

    function DropTarget(element, options) {
        var that = this;

        kendo.ui.Component.apply(that, arguments); 

        that.element.bind(MOUSEENTER, proxy(that._over, that))
                    .bind(MOUSEUP, proxy(that._drop, that))
                    .bind(MOUSELEAVE, proxy(that._out, that));

        that.group = that.options.group;
    }

    DropTarget.prototype = {
        options: {
            group: "default"
        },
        _over: function(e) {
            if (draggables[this.group])
            console.log("dragenter");
        },
        _out: function(e) {
            if (draggables[this.group])
            console.log("dragleave");
        },
        _drop: function(e) {
            if (draggables[this.group])
            console.log("drop");
        }
    }

    kendo.ui.plugin("DropTarget", DropTarget, kendo.ui.Component);

    function Draggable(element, options) {
        var that = this;

        kendo.ui.Component.apply(that, arguments);

        bind(that.element, that.options.filter, "mousedown", proxy(that._wait, that));

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
            this._startPosition = { x: e.pageX, y: e.pageY };
            this._currentTarget = e.currentTarget;
            $(document).bind( {
                mousemove: this._startProxy,
                mouseup: this._destroyProxy
            });
        },

        _start: function(e) {
            var x = this._startPosition.x - e.pageX, 
                y = this._startPosition.y - e.pageY;

            var distance = Math.sqrt((x * x) + (y * y));

            if (distance >= this.options.distance) {
                draggables[this.group] = this;

                $(document).unbind("mousemove", this._startProxy)
                           .unbind("mouseup", this._destroyProxy)
                           .bind({
                               "mouseup keydown": this._stopProxy,
                               mousemove: this._dragProxy,
                               selectstart: false
                           });

               this.trigger("dragstart", {
                    currentTarget: this._currentTarget
               });
            }
        },

        _drag: function(e) {
            this.trigger("drag", {
                currentTarget: this._currentTarget
            });
        },

        _stop: function(e) {
            if (e.type == "mouseup" || e.keyCode == 27) {
                this.trigger("dragend", {
                    currentTarget: this._currentTarget
                });
                this._destroy();
            }
        },

        _destroy: function(e) {
            delete draggables[this.group];
            $(document).unbind("mouseup keydown", this._stopProxy)
                       .unbind("mousemove", this._dragProxy)
                       .unbind("mousemove", this._startProxy)
                       .unbind("selectstart", false);
        }
    }

    kendo.ui.plugin("Draggable", Draggable, kendo.ui.Component);

   })(jQuery, window);
