(function ($) {
    var $t = $.telerik,
        nop = function () { },
        draggables = {},
        droppables = {},
        cues = {},
        lastDropTarget = { owner: [ null ] },
        MOUSEUP = $t.isTouch ? "touchend" : "mouseup",
        MOUSEDOWN = $t.isTouch ? "touchstart" : "mousedown",
        MOUSEMOVE = $t.isTouch ? "touchmove" : "mousemove",
        droppableDefaults = {
            scope: 'default',
            drop: nop,
            over: nop,
            out: nop,
            owner: document.body
        },
        draggableDefaults = {
            distance: 5, /* Dinstance in pixels the mouse should move before dragging should start. */
            cursorAt: { left: 10, top: $t.isTouch ? -40 / $t.zoomLevel() : 10 }, /* The offset of the cursor from the dragging cue. */
            scope: 'default', /* Used to group draggables and droppables. */
            start: nop, /* Called when dragging starts. Return `false` to prevent dragging. */
            drag: nop, /* Called when the mouse is moved during dragging. */
            stop: nop, /* Called when dragging stops. Return `false` to prevent the stop animation. */
            destroy: nop, /* Called when the draggable is destroyed. Used to remove any dragging/dropping cues from DOM. */
            owner: document.body, /* The DOM element to which events are attached. Used with 'selector' and 'delegate'. */
            cue: function () { /* Called to create the dragging cue. Return a jQuery object representing the cue. */
                return $('<span />');
            }
        };

    $t.scripts.push("telerik.draganddrop.js");

    function size(obj) {
        var size = 0, key;
        for (key in obj) {
            obj.hasOwnProperty(key) && size++;
        }

        return size;
    }

    function findTarget(needle, targets) {
        var result = { owner: [ null ] };

        $.each(targets, function() {
            var that = this,
                element = that.owner;

            if (element && $.contains(element, needle)) {
                result = $.extend(result, that);
                result.selector && (result.owner = $(needle).closest(result.selector)[0]);
                return false;
            }
        });

        return result;
    }


    $t.droppable = function (options) {
        $.extend(this, droppableDefaults, options);
        $(this.owner).delegate(this.selector, 'mouseenter', $.proxy(this._over, this))
                    .delegate(this.selector, MOUSEUP, $.proxy(this._drop, this))
                    .delegate(this.selector, 'mouseleave', $.proxy(this._out, this));

        if (!(this.scope in droppables)) {
            droppables[this.scope] = [ this ];
        } else {
            droppables[this.scope].push( this );
        }
    };

    $t.droppable.prototype = {
        _over: function (e) {
            this._raise(e, this.over);
        },
        _out: function (e) {
            this._raise(e, this.out);
        },
        _drop: function (e) {            
            this._raise(e, $.proxy(function (e) {
                this.drop(e);
                e.destroy(e);
            }, this));
        },
        _raise: function (e, callback) {
            var draggable = draggables[this.scope],
                target = $($t.eventCurrentTarget(e)).closest(this.selector);

            if (draggable)
                callback($.extend(e, draggable, { $droppable: target }));
        }
    };

    $t.dragCue = function (html) {
        return $('<div class="t-header t-drag-clue" />')
            .html(html)
            .prepend('<span class="t-icon t-drag-status t-denied" />')
            .appendTo(document.body);
    };

    $t.dragCueStatus = function ($cue, status) {
        $cue.find('.t-drag-status')
            .attr('class', 't-icon t-drag-status')
            .addClass(status);
    };

    $t.draggable = function (options) {
        $.extend(this, draggableDefaults, options);

        $(this.owner).delegate(this.selector, MOUSEDOWN, $.proxy(this._wait, this))
                     .delegate(this.selector, 'dragstart', $t.preventDefault);

        this._startProxy = $.proxy(this._start, this);
        this._destroyProxy = $.proxy(this._destroy, this);
        this._stopProxy = $.proxy(this._stop, this);
        this._dragProxy = $.proxy(this._drag, this);
    };

    $t.draggable.get = function (scope) {
        return draggables[scope];
    };

    $t.draggable.prototype = {
        _raise: function (e, callback) {
            var draggable = draggables[this.scope];
            if (draggable)
                return callback($.extend(e, draggable));
        },

        _startDrag: function (target, position) {
            target = $(target);
            this.$target = target;

            if (position) {
                this._startPosition = position;
            } else {
                var offset = target.offset();
                this._startPosition = { x: offset.left, y: offset.top };
            }

            $(document).bind(MOUSEMOVE + "." + this.scope, this._startProxy)
                .bind(MOUSEUP + "." + this.scope, this._destroyProxy);
        },

        _wait: function (e) {
            if ($t.isTouch)
                e.stopImmediatePropagation();

            this._startDrag(e.currentTarget, $t.touchLocation(e));

            $(document.documentElement).trigger(MOUSEDOWN, e); // manually triggering 'mousedown' because the next statement will prevent that.

            // required to avoid selection in Gecko
            if (!$t.isTouch)
                return false;
        },

        _start: function (e) {
            var location = $t.touchLocation(e),
                x = this._startPosition.x - location.x,
                y = this._startPosition.y - location.y;

            var distance = Math.sqrt((x * x) + (y * y));

            if (distance >= this.distance) {
                if ($t.isTouch) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }

                var $cue = cues[this.selector];

                if (!$cue) {
                    $cue = cues[this.selector] = this.cue({ $draggable: this.$target });
                }

                $(document).unbind("." + this.scope)
                    .bind(MOUSEMOVE + "." + this.scope, this._dragProxy)
                    .bind(MOUSEUP + "." + this.scope, this._stopProxy)
                    .bind("keydown." + this.scope, this._stopProxy)
                    .bind("selectstart." + this.scope, false);

                draggables[this.scope] = {
                    $cue: $cue.css({ position: 'absolute', left: location.x + this.cursorAt.left, top: location.y + this.cursorAt.top }),
                    $draggable: this.$target,
                    destroy: this._destroyProxy
                };

                if (this._raise(e, this.start) === false)
                    this._destroy(e);
            }
        },

        _drag: function (e) {
            if ($t.isTouch)
                e.stopImmediatePropagation();

            var location = $t.touchLocation(e);

            if ($t.isTouch && size(droppables)) {
                var dropTarget = $t.eventTarget(e);

                if (dropTarget) {
                    var droppable = droppables[this.scope],
                        target = findTarget(dropTarget, droppable),
                        element = target.owner,
                        lastTarget = lastDropTarget.owner,
                        difference = lastTarget != element;

                    if (difference) {
                        if (lastTarget != null && "_out" in lastDropTarget) {
                            lastDropTarget._out(e);
                        }

                        if (element && $.contains(element, dropTarget) && "_over" in target) {
                            target._over(e);
                        }

                        lastDropTarget = target;
                    }
                }
            }

            this._raise(e, this.drag);
            draggables[this.scope].$cue.css({ left: location.x + this.cursorAt.left, top: location.y + this.cursorAt.top });
        },

        _stop: function (e) {            
            if ($t.isTouch)
                e.stopImmediatePropagation();

            if (e.type == MOUSEUP || e.keyCode == 27)
                $(document).unbind("." + this.scope);
            
                if ($t.isTouch && size(droppables)) {
                    var dropTarget = $t.eventTarget(e);

                    if (dropTarget) {
                        var droppable = droppables[this.scope],
                            target = findTarget(dropTarget, droppable);

                        if (target.owner && "_drop" in target) {
                            lastDropTarget = { owner: [ null ] };
                            target._drop(e);
                        }
                    }
                }

                if (this._raise(e, this.stop) === false) {
                    this._destroy(e);
                } else {
                    var draggable = draggables[this.scope];
                    if (draggable)
                        draggable.$cue.animate(draggable.$draggable.offset(), 'fast', this._destroyProxy);
                }
        },

        _destroy: function (e) {
            $(document).unbind("." + this.scope);

            this._raise(e, this.destroy);

            draggables[this.scope] = null;
            cues[this.selector] = null;
        }
    }
})(jQuery);
