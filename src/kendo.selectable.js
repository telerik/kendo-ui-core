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

            that.element.addClass(SELECTABLE);

            var multiple = that.options.multiple;
            if (!multiple) {
                that.userEvents = new kendo.UserEvents(that.element, {
                    global: true,
                    allowSelection: true,
                    filter: (!supportEventDelegation ? "." + SELECTABLE + " " : "") + that.options.filter,
                    tap: function(e) {
                        var target = $(e.target),
                            selected;

                        //in case of hierarchy
                        if (target.closest("." + SELECTABLE)[0] !== that.element[0]) {
                            return;
                        }

                        selected = target.hasClass(SELECTED);
                        that.clear();
                        if (selected && e.event.ctrlKey) {
                            that.value($());
                        } else {
                            that.value(target);
                        }
                    }
                });
            } else {
                that.userEvents = new kendo.UserEvents(that.element, {
                    global: true,
                    allowSelection: false,
                    filter: (!supportEventDelegation ? "." + SELECTABLE + " " : "") + that.options.filter,
                    tap: function(e) {
                        //required to select item without drag
                        var target = $(e.target),
                            selected;

                        //in case of hierarchy
                        if (target.closest("." + SELECTABLE)[0] !== that.element[0]) {
                            return;
                        }

                        selected = target.hasClass(SELECTED);
                        if (!e.event.ctrlKey) {
                            that.clear();
                        }

                        if (e.event.shiftKey) {
                            that.selectRange(that._firstSelectee(), target);
                        } else {
                            if (selected && e.event.ctrlKey) {
                                target.removeClass(SELECTED);
                                that.value($());
                            } else {
                                that.value(target);
                            }

                            that._lastActive = that._downTarget = target;
                        }
                    },
                    start: function(e) {
                        that._downTarget = $(e.target);

                        //in case of hierarchy
                        if (that._downTarget.closest("." + SELECTABLE)[0] !== that.element[0]) {
                            that.userEvents.cancel();
                            that._downTarget = null;
                            return;
                        }

                        $("body").append(that._marquee);
                        that._marquee.css({
                            left: e.x.client + 1,
                            top: e.y.client + 1,
                            width: 0,
                            height: 0
                        });

                        var selected = that._downTarget.hasClass(SELECTED);
                        if (!e.event.ctrlKey) {
                            that.clear();
                        }

                        if (selected) {
                            that._downTarget.addClass(SELECTED);
                            if (e.event.ctrlKey) {
                                that._downTarget.addClass(UNSELECTING);
                            }
                        }
                    },
                    move: function(e) {
                        var position = {
                                left: e.x.startLocation > e.x.location ? e.x.location : e.x.startLocation,
                                top: e.y.startLocation > e.y.location ? e.y.location : e.y.startLocation,
                                width: Math.abs(e.x.initialDelta),
                                height: Math.abs(e.y.initialDelta)
                            },
                            selectee,
                            collide,
                            ctrlKey = e.event.ctrlKey;

                        that._marquee.css(position);

                        that.element.find(that.options.filter).each(function () {
                            selectee = $(this);
                            collide = that._collide(selectee, position);

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

                        e.preventDefault();
                    },
                    end: function(e) {
                        that._marquee.remove();

                        that.element
                            .find(options.filter + "." + UNSELECTING)
                            .removeClass(UNSELECTING)
                            .removeClass(SELECTED);

                        that.value(that.element.find(options.filter + "." + ACTIVE));
                        that._lastActive = that._downTarget;
                    }
                });
            }
        },

        events: [CHANGE],

        options: {
            name: "Selectable",
            filter: ">*",
            multiple: false
        },

        _collide: function(element, marqueePos) {
            var pos = element.offset(),
                right =  marqueePos.left +  marqueePos.width,
                bottom =  marqueePos.top +  marqueePos.height,
                selectee = {
                    left: pos.left,
                    top: pos.top,
                    right: pos.left + element.outerWidth(),
                    bottom: pos.top + element.outerHeight()
                };

            return (!(selectee.left > right||
                selectee.right < marqueePos.left ||
                selectee.top > bottom ||
                selectee.bottom < marqueePos.top));
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

            that.userEvents.destroy();
        }
    });

    kendo.ui.plugin(Selectable);

})(window.kendo.jQuery);

