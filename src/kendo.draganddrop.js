(function ($, window) {
    var kendo = window.kendo,
        nop = function () { },
        draggables = {},
        cues = {},
        droppableDefaults = {
            scope: "default",
            drop: nop,
            over: nop,
            out: nop,
            owner: document.body
        },
        draggableDefaults = {
            distance: 5, /* Dinstance in pixels the mouse should move before dragging should start. */
            cursorAt: { left: 10, top: 10 }, /* The offset of the cursor from the dragging cue. */
            scope: "default", /* Used to group draggables and droppables. */
            start: nop, /* Called when dragging starts. Return `false` to prevent dragging. */
            drag: nop, /* Called when the mouse is moved during dragging. */
            stop: nop, /* Called when dragging stops. Return `false` to prevent the stop animation. */
            destroy: nop, /* Called when the draggable is destroyed. Used to remove any dragging/dropping cues from DOM. */
            owner: document.body, /* The DOM element to which events are attached. Used with 'selector' and 'delegate'. */
            cue: function() { /* Called to create the dragging cue. Return a jQuery object representing the cue. */
                return $("<span />");
            }
        };    
    
    kendo.droppable = function (options) {
      
       $.extend(this, droppableDefaults, options);
       $(this.owner).delegate(this.selector, "mouseenter", $.proxy(this._over, this))
                    .delegate(this.selector, "mouseup", $.proxy(this._drop, this))
                    .delegate(this.selector, "mouseleave", $.proxy(this._out, this));
    }
    
    kendo.droppable.prototype = {
        _over: function(e) {
            this._raise(e, this.over);
        },
        _out: function(e) {
            this._raise(e, this.out);
        },
        _drop: function(e) {
            this._raise(e, $.proxy(function(e) {
                this.drop(e);
                e.destroy(e);
            }, this));
        },
        _raise: function(e, callback) {
            var draggable = draggables[this.scope];
            if (draggable) {
                callback($.extend(e, draggable, { droppable: $(e.currentTarget) }));
            }
        }
    }

    kendo.dragCue = function (html) {
        return $("<div class='t-header t-drag-clue' />")
            .html(html)
            .prepend("<span class='t-icon t-drag-status t-denied' />")
            .appendTo(document.body);
    }
    
    kendo.dragCueStatus = function(cue, status) {
        cue.find(".t-drag-status")
           .attr("className", "t-icon t-drag-status")
           .addClass(status);
    }

    kendo.draggable = function (options) {
        $.extend(this, draggableDefaults, options);
        
        $(this.owner).delegate(this.selector, "mousedown", $.proxy(this._wait, this))
                     .delegate(this.selector, "dragstart", function(event){
                         event.preventDefault();
                     });

        this._startProxy = $.proxy(this._start, this);
        this._destroyProxy = $.proxy(this._destroy, this);
        this._stopProxy = $.proxy(this._stop, this);
        this._dragProxy = $.proxy(this._drag, this);
    }
    
    kendo.draggable.get = function(scope) {
        return draggables[scope];
    }
    
    kendo.draggable.prototype = {
        _raise: function(e, callback) {
            var draggable = draggables[this.scope];
            if (draggable)
                return callback($.extend(e, draggable));
        },

        _wait: function (e) {
            this.target = $(e.currentTarget);
            this._startPosition = { x: e.pageX, y: e.pageY };

            $(document).bind( {
                mousemove: this._startProxy,
                mouseup: this._destroyProxy
            });

            $(document.documentElement).trigger("mousedown", e); // manually triggering 'mousedown' because the next statement will prevent that.

            // required to avoid selection in Gecko
            return false;
        },

        _start: function(e) {
            var x = this._startPosition.x - e.pageX, 
                y = this._startPosition.y - e.pageY;

            var distance = Math.sqrt((x * x) + (y * y));
            
            if (distance >= this.distance) {
                var cue = cues[this.selector];
                
                if (!cue) {
                    cue = cues[this.selector] = this.cue({ draggable: this.target });
                    
                    $(document).unbind("mousemove", this._startProxy)
                               .unbind("mouseup", this._destroyProxy)
                               .bind({
                                   "mouseup keydown": this._stopProxy,
                                   mousemove: this._dragProxy,
                                   selectstart: false
                               });
                } 
                    
                draggables[this.scope] = {
                    cue: cue.css({ position: "absolute", left: e.pageX + this.cursorAt.left, top: e.pageY + this.cursorAt.top }),
                    draggable: this.target,
                    destroy: this._destroyProxy
                }

                if (this._raise(e, this.start) === false) {
                    this._destroy(e);
                }
            }
        },

        _drag: function(e) {
            this._raise(e, this.drag);
            draggables[this.scope].cue.css({ left: e.pageX + this.cursorAt.left, top: e.pageY + this.cursorAt.top });
        },

        _stop: function(e) {
            if (e.type == "mouseup" || e.keyCode == 27) {
                if (this._raise(e, this.stop) === false) {
                    this._destroy(e);
                } else {
                    var draggable = draggables[this.scope];
                    draggable.cue.animate(draggable.draggable.offset(), "fast", this._destroyProxy);
                }
            }
        },

        _destroy: function(e) {
            $(document).unbind("mouseup keydown", this._stopProxy)
                       .unbind("mousemove", this._dragProxy)
                       .unbind("mousemove", this._startProxy)
                       .unbind("selectstart", false);
            
            this._raise(e, this.destroy);

            draggables[this.scope] = null;
            cues[this.selector] = null;
        }
    }
})(jQuery, window);
