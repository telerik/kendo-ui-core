(function ($, undefined) {
    var kendo = window.kendo,
        keys = kendo.keys,
        touch = kendo.support.touch,
        Component = kendo.ui.Component,
        proxy = $.proxy,
        MOUSEUP = touch? "touchend" : "mouseup",
        MOUSEDOWN = touch? "touchstart" : "mousedown",
        MOUSEMOVE = touch? "touchmove" : "mousemove",
        SELECTED = "t-state-selected",
        ACTIVE = "t-state-selecting",
        SELECTABLE = "t-selectable",
        SELECTSTART = "selectstart",
        DOCUMENT = $(document),
        CHANGE = "change",
        UNSELECTING = "t-state-unselecting";

    var Selectable = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that._marquee = $("<div class='t-marquee'></div>");
            that._lastActive = null;

            that._moveDelegate = proxy(that._move, that);
            that._upDelegate = proxy(that._up, that);

            that.element.addClass(SELECTABLE);
            that.element.delegate("." + SELECTABLE + " " + that.options.filter, MOUSEDOWN, proxy(that._down, that));
            that.bind([CHANGE], that.options);
        },

        options: {
            filter: ">*",
            multiple: false
        },
        _collide: function(element, marqueePos) {
            var pos = element.offset(),
                selectee = {
                    left: pos.left,
                    top: pos.top,
                    right: pos.left + element.outerWidth(),
                    bottom: pos.top + element.outerHeight()
                };
            return (!(selectee.left > marqueePos.right
                || selectee.right < marqueePos.left
                || selectee.top > marqueePos.bottom
                || selectee.bottom < marqueePos.top));
        },
        _position: function(event) {
            var pos = this._originalPosition,
                left = pos.x,
                top = pos.y,
                right = event.pageX,
                bottom = event.pageY;
            if (left > right) {
                var tmp = right;
                right = left;
                left = tmp;
            }
            if (top > bottom) {
                var tmp = bottom;
                bottom = top;
                top = tmp;
            }

            return {
                top: top,
                right: right,
                left: left,
                bottom: bottom
            };
        },
        _down: function (event) {
            var that = this,
                selected,
                ctrlKey = event.ctrlKey,
                shiftKey = event.shiftKey,
                single = !that.options.multiple;
            that._downTarget = $(event.currentTarget);
            that._shiftPressed = shiftKey;
            DOCUMENT
                .unbind(MOUSEUP, that._upDelegate) // more cancel friendly
                .bind(MOUSEUP, that._upDelegate);
            that._originalPosition = {
                x: event.pageX,
                y: event.pageY
            };

            if(!single) {
                DOCUMENT
                    .unbind(MOUSEMOVE, that._moveDelegate)
                    .bind(MOUSEMOVE, that._moveDelegate);
            }

            if (!single) {
                $("body").append(that._marquee);
                that._marquee.css({
                    left: event.clientX + 1,
                    top: event.clientY + 1,
                    width: 0,
                    height: 0
                });
            }

            selected = that._downTarget.hasClass(SELECTED);
            if(single || !(ctrlKey || shiftKey)) {
                that.element
                .find(that.options.filter + "." + SELECTED)
                .not(that._downTarget)
                .removeClass(SELECTED);
            }
            if(ctrlKey) {
                that._lastActive = that._downTarget;
            }

            if(selected && (ctrlKey || shiftKey)) {
                that._downTarget.addClass(SELECTED);
                if(!shiftKey) {
                    that._downTarget.addClass(UNSELECTING);
                }
            }
            else {
                if (!(kendo.support.touch && single)) {
                    that._downTarget.addClass(ACTIVE);
                }
            }
        },
        _move: function (event) {
            var that = this,
                pos = that._position(event),
                ctrlKey = event.ctrlKey,
                selectee, collide;

                that._marquee.css({
                    left: pos.left,
                    top: pos.top,
                    width: pos.right - pos.left,
                    height: pos.bottom - pos.top
                });

            DOCUMENT
                .unbind(SELECTSTART, false)
                .bind(SELECTSTART, false);

            that.element.find(that.options.filter).each(function () {
                selectee = $(this);
                collide = that._collide(selectee, pos);

                if (collide) {
                    if(selectee.hasClass(SELECTED)) {
                        if(that._downTarget[0] !== selectee[0] && ctrlKey) {
                            selectee
                                .removeClass(SELECTED)
                                .addClass(UNSELECTING);
                        }
                    } else if (!selectee.hasClass(ACTIVE) && !selectee.hasClass(UNSELECTING)) {
                        selectee.addClass(ACTIVE);
                    }
                }
                else {
                    if (selectee.hasClass(ACTIVE)) {
                        selectee.removeClass(ACTIVE);
                    }
                    else if(ctrlKey && selectee.hasClass(UNSELECTING)) {
                        selectee
                            .removeClass(UNSELECTING)
                            .addClass(SELECTED);
                    }
                }
            });
        },
        _up: function (event) {
            var that = this,
                options = that.options,
                single = !options.multiple;
            DOCUMENT
                .unbind(MOUSEMOVE, that._moveDelegate)
                .unbind(MOUSEUP, that._upDelegate);
            if (!single) {
                that._marquee.remove();
            }

            if (kendo.support.touch && single)
                that._downTarget.addClass(ACTIVE);

            if(!single && that._shiftPressed === true) {
                that.selectRange(that._firstSelectee(), that._downTarget);
            }
            else {
                that.element
                    .find(options.filter + "." + UNSELECTING)
                    .removeClass(UNSELECTING)
                    .removeClass(SELECTED);

                that.value(that.element.find(options.filter + "." + ACTIVE));
            }
            if(!that._shiftPressed) {
                that._lastActive = that._downTarget;
            }
            that._downTarget = null;
            that._shiftPressed = false;
        },
        value: function(val) {
            var that = this,
            selectElement = proxy(that._selectElement, that);
            if(val) {
                val.each(function() {
                    selectElement(this);
                });

                that.trigger(CHANGE, {});
                return;
            }

            return that.element
                    .find(that.options.filter + "." + SELECTED);
        },
        _firstSelectee: function() {
            var that = this, selected;
            if(that._lastActive !== null) {
                return that._lastActive;
            }

            selected = that.value();
            return selected.length > 0 ?
                    selected[0] :
                    that.element.find(that.options.filter);
        },
        _selectElement: function(el) {
            var selecee = $(el),
                isPrevented = this.trigger("select", { element: el });

            selecee.removeClass(ACTIVE);
            if(!isPrevented) {
                selecee.addClass(SELECTED);
            }
        },
        clear: function() {
            var that = this;
            that.element
                .find(that.options.filter + "." + SELECTED)
                .removeClass(SELECTED);
        },
        selectRange: function(start, end) {
            var that = this,
                found = false,
                selectElement = proxy(that._selectElement, that),
                selectee;
            start = $(start)[0];
            end = $(end)[0];
            that.element.find(that.options.filter).each(function () {
                selectee = $(this);
                if(found) {
                    selectElement(this);
                    found = !(this === end);
                }
                else if(this === start) {
                    found = !(start === end);
                    selectElement(this);
                }
                else if(this === end) {
                    var tmp = start;
                    start = end;
                    end = tmp;
                    found = true;
                    selectElement(this);
                }
                else {
                    selectee.removeClass(SELECTED);
                }
            });
            that.trigger(CHANGE, {});
        }
    });

    kendo.ui.plugin("Selectable", Selectable);

})(jQuery);
