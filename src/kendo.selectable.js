kendo_module({
    id: "selectable",
    name: "Selectable",
    category: "framework",
    depends: [ "core", "userevents" ],
    advanced: true
});

(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        abs = Math.abs,
        ARIASELECTED = "aria-selected",
        SELECTED = "k-state-selected",
        ACTIVE = "k-state-selecting",
        SELECTABLE = "k-selectable",
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
            var that = this,
                multiple;

            Widget.fn.init.call(that, element, options);

            that._marquee = $("<div class='k-marquee'></div>");
            that._lastActive = null;
            that.element.addClass(SELECTABLE);

            multiple = that.options.multiple;
            that.userEvents = new kendo.UserEvents(that.element, {
                global: true,
                allowSelection: true,
                filter: (!supportEventDelegation ? "." + SELECTABLE + " " : "") + that.options.filter,
                tap: proxy(that._tap, that)
            });

            if (multiple) {
                that.userEvents
                   .bind("start", proxy(that._start, that))
                   .bind("move", proxy(that._move, that))
                   .bind("end", proxy(that._end, that))
                   .bind("select", proxy(that._select, that));
            }
        },

        events: [CHANGE],

        options: {
            name: "Selectable",
            filter: ">*",
            multiple: false
        },

        _tap: function(e) {
            var target = $(e.target),
                that = this,
                ctrlKey = e.event.ctrlKey,
                multiple = that.options.multiple,
                shiftKey = multiple && e.event.shiftKey,
                selected;

            //in case of hierarchy
            if (target.closest("." + SELECTABLE)[0] !== that.element[0]) {
                return;
            }

            selected = target.hasClass(SELECTED);
            if (!multiple || !ctrlKey) {
                that.clear();
            }

            if (shiftKey) {
                that.selectRange(that._firstSelectee(), target);
            } else {
                if (selected && ctrlKey) {
                    that._unselect(target);
                    that._notify(CHANGE);
                } else {
                    that.value(target);
                }

                that._lastActive = that._downTarget = target;
            }
        },

        _start: function(e) {
            var that = this,
                target = $(e.target),
                selected = target.hasClass(SELECTED),
                ctrlKey = e.event.ctrlKey;

            that._downTarget = target;

            //in case of hierarchy
            if (target.closest("." + SELECTABLE)[0] !== that.element[0]) {
                that.userEvents.cancel();
                that._downTarget = null;
                return;
            }

            that._marquee
                .appendTo(document.body)
                .css({
                    left: e.x.client + 1,
                    top: e.y.client + 1,
                    width: 0,
                    height: 0
                });

            if (!ctrlKey) {
                that.clear();
            }

            if (selected) {
                that._selectElement(target, true);
                if (ctrlKey) {
                    target.addClass(UNSELECTING);
                }
            }
        },

        _move: function(e) {
            var that = this,
                position = {
                    left: e.x.startLocation > e.x.location ? e.x.location : e.x.startLocation,
                    top: e.y.startLocation > e.y.location ? e.y.location : e.y.startLocation,
                    width: abs(e.x.initialDelta),
                    height: abs(e.y.initialDelta)
                },
                items = that.element.find(that.options.filter);

            that._marquee.css(position);

            invalidateSelectables(items, that._downTarget[0], position, e.event.ctrlKey);

            e.preventDefault();
        },

        _end: function() {
            var that = this;

            that._marquee.remove();

            that._unselect(that.element
                .find(that.options.filter + "." + UNSELECTING))
                .removeClass(UNSELECTING);

            that.value(that.element.find(that.options.filter + "." + ACTIVE));
            that._lastActive = that._downTarget;
        },

        value: function(val) {
            var that = this,
                selectElement = proxy(that._selectElement, that);

            if(val) {
                val.each(function() {
                    selectElement(this);
                });

                that._notify(CHANGE);
                return;
            }

            return that.element.find(that.options.filter + "." + SELECTED);
        },

        _firstSelectee: function() {
            var that = this,
                selected;

            if(that._lastActive !== null) {
                return that._lastActive;
            }

            selected = that.value();
            return selected.length > 0 ?
                    selected[0] :
                    that.element.find(that.options.filter);
        },

        _selectElement: function(element, preventNotify) {
            var toSelect = $(element),
                isPrevented =  !preventNotify && this._notify("select", { element: element });

            toSelect.removeClass(ACTIVE);
            if(!isPrevented) {
                 toSelect.addClass(SELECTED);

                if (this.options.aria) {
                    toSelect.attr(ARIASELECTED, true);
                }
            }
        },

        _notify: function(name, args) {
            args = args || { };
            return this.trigger(name, args);
        },

        _unselect: function(element) {
            element.removeClass(SELECTED);

            if (this.options.aria) {
                element.attr(ARIASELECTED, false);
            }

            return element;
        },

        _select: function(e) {
            if ($(e.event.target).is("input,a,textarea")) {
                this.userEvents.cancel();
                this._downTarget = null;
            } else {
                e.preventDefault();
            }
        },

        clear: function() {
            var items = this.element.find(this.options.filter + "." + SELECTED);
            this._unselect(items);
        },

        selectRange: function(start, end) {
            var that = this,
                found = false,
                idx,
                length,
                tmp,
                toSelect,
                items = that.element.find(that.options.filter),
                selectElement = proxy(that._selectElement, that);

            start = $(start)[0];
            end = $(end)[0];

            for (idx = 0, length = items.length; idx < length; idx ++) {
                toSelect = items[idx];
                if(found) {
                    selectElement(toSelect);
                    found = toSelect !== end;
                } else if(toSelect === start) {
                    found = start !== end;
                    selectElement(toSelect);
                } else if(toSelect === end) {
                    tmp = start;
                    start = end;
                    end = tmp;
                    found = true;
                    selectElement(toSelect);
                } else {
                    $(toSelect).removeClass(SELECTED);
                }
            }

            that._notify(CHANGE);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);

            that.userEvents.destroy();
        }
    });

    function collision(element, position) {
        var elementPosition = element.offset(),
            right = position.left + position.width,
            bottom = position.top + position.height;

        elementPosition.right = elementPosition.left + element.outerWidth();
        elementPosition.bottom = elementPosition.top + element.outerHeight();

        return !(elementPosition.left > right||
            elementPosition.right < position.left ||
            elementPosition.top > bottom ||
            elementPosition.bottom < position.top);
    }

    function invalidateSelectables(items, target, position, ctrlKey) {
        var idx,
            length,
            toSelect;

        for (idx = 0, length = items.length; idx < length; idx ++) {
            toSelect = items.eq(idx);

            if (collision(toSelect, position)) {
                if(toSelect.hasClass(SELECTED)) {
                    if(ctrlKey && target !== toSelect[0]) {
                        toSelect.removeClass(SELECTED).addClass(UNSELECTING);
                    }
                } else if (!toSelect.hasClass(ACTIVE) && !toSelect.hasClass(UNSELECTING)) {
                    toSelect.addClass(ACTIVE);
                }
            } else {
                if (toSelect.hasClass(ACTIVE)) {
                    toSelect.removeClass(ACTIVE);
                } else if(ctrlKey && toSelect.hasClass(UNSELECTING)) {
                    toSelect.removeClass(UNSELECTING).addClass(SELECTED);
                }
            }
        }
    }

    kendo.ui.plugin(Selectable);

})(window.kendo.jQuery);

