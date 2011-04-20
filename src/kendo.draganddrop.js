(function ($, window) {
    var kendo = window.kendo, draggables = {};

    function DropTarget(element, options) {
        var that = this;

        kendo.ui.Component.apply(that, arguments); 

        that.element.bind("mouseenter", $.proxy(this._over, this))
                    .bind("mouseup", $.proxy(this._drop, this))
                    .bind("mouseleave", $.proxy(this._out, this));
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

        that.element.mousedown($.proxy(that._wait, that))
            .bind("dragstart", false); 

        this._startProxy = $.proxy(this._start, this);
        this._destroyProxy = $.proxy(this._destroy, this);
        this._stopProxy = $.proxy(this._stop, this);
        this._dragProxy = $.proxy(this._drag, this);
        that.group = that.options.group;
    }

    Draggable.prototype = {
        options: {
            distance: 5,
            group: "default"
        },

        _wait: function (e) {
            this._startPosition = { x: e.pageX, y: e.pageY };
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
            }
        },

        _drag: function(e) {
            console.log("drag");
        },

        _stop: function(e) {
            if (e.type == "mouseup" || e.keyCode == 27) {
                console.log("dragend");
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
