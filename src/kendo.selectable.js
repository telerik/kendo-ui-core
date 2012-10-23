(function ($, undefined) {
    var kendo = window.kendo,
        touch = kendo.support.touch,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        MOUSEUP = touch? "touchend" : "mouseup",
        MOUSEDOWN = touch? "touchstart" : "mousedown",
        MOUSEMOVE = touch? "touchmove" : "mousemove",
        SELECTED = "k-state-selected",
        ACTIVE = "k-state-selecting",
        SELECTABLE = "k-selectable",
        SELECTSTART = "selectstart",
        DOCUMENT = $(document),
        CHANGE = "change",
        NS = ".kendoSelectable",
        UNSELECTING = "k-state-unselecting",
        supportEventDelegation = false;

        (function($) {
            (function() {
                $('<div class="parent"><span /></div>')
                .on("click", ">*", function() {
                    supportEventDelegation = true;
                })
                .find("span")
                .click();
            })();
        })($);

    var Selectable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._marquee = $("<div class='k-marquee'></div>");
            that._lastActive = null;

            that._moveDelegate = proxy(that._move, that);
            that._upDelegate = proxy(that._up, that);

            that.element.addClass(SELECTABLE);
            that.element.on(MOUSEDOWN + NS, (!supportEventDelegation ? "." + SELECTABLE + " " : "") + that.options.filter, proxy(that._down, that));
        },

        events: [CHANGE],

        options: {
            name: "Selectable",
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

            return (!(selectee.left > marqueePos.right ||
                selectee.right < marqueePos.left ||
                selectee.top > marqueePos.bottom ||
                selectee.bottom < marqueePos.top));
        },
        _position: function(event) {
            var pos = this._originalPosition,
                left = pos.x,
                top = pos.y,
                right = event.pageX,
                bottom = event.pageY,
                tmp;

            if (left > right) {
                tmp = right;
                right = left;
                left = tmp;
            }

            if (top > bottom) {
                tmp = bottom;
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

            if (that._downTarget.closest("." + SELECTABLE)[0] !== that.element[0]) {
                return;
            }

            DOCUMENT
                .unbind(MOUSEUP, that._upDelegate) // more cancel friendly
                .bind(MOUSEUP, that._upDelegate);

            that._originalPosition = {
                x: event.pageX,
                y: event.pageY
            };

            if(!single && $(event.target).is(":not(:input, a)")) {
                DOCUMENT
                    .unbind(MOUSEMOVE, that._moveDelegate)
                    .bind(MOUSEMOVE, that._moveDelegate)
                    .unbind(SELECTSTART, false)
                    .bind(SELECTSTART, false);

                if (!kendo.support.touch) {
                    event.preventDefault();
                }
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

                    if (single && that._downTarget.hasClass(SELECTED)) {
                        that._downTarget.removeClass(ACTIVE);
                    }
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
                .unbind(SELECTSTART, false)
                .unbind(MOUSEMOVE, that._moveDelegate)
                .unbind(MOUSEUP, that._upDelegate);

            if (!single) {
                that._marquee.remove();
            }

            if (kendo.support.touch && single) {
                that._downTarget.addClass(ACTIVE);
            }

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
            var selectee = $(el),
                isPrevented = this.trigger("select", { element: el });

            selectee.removeClass(ACTIVE);
            if(!isPrevented) {
                selectee.addClass(SELECTED);
                if (this.options.aria) {
                    selectee.attr("aria-selected", true);
                }
            }
        },
        clear: function() {
            var that = this;
            that.element
                .find(that.options.filter + "." + SELECTED)
                .removeClass(SELECTED);

            if (that.options.aria) {
                that.element.children("[aria-selected=true]")
                    .attr("aria-selected", false);
            }
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
                    found = this !== end;
                }
                else if(this === start) {
                    found = start !== end;
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
        },
        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);
        }
    });

    kendo.ui.plugin(Selectable);

})(jQuery);
