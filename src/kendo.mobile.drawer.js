kendo_module({
    id: "mobile.drawer",
    name: "Drawer",
    category: "mobile",
    description: "The Kendo Mobile Drawer widget provides slide to reveal global application toolbox",
    depends: [ "mobile.application" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        Transition = kendo.effects.Transition,
        ui = mobile.ui;

    var Drawer = ui.View.extend({
        init: function(element, options) {
            ui.View.fn.init.call(this, element, options);
            this.pane = this.element.closest(kendo.roleSelector("pane")).data("kendoMobilePane");

            var drawer = this;

            this.pane.bind("beforeNavigate", function() {
                if (drawer.currentView) {
                    drawer.hide();
                }
            });

            this.pane.bind("viewShow", function(e) {
                drawer._viewShow(e);
            });

            this.userEvents = new kendo.UserEvents(this.pane.element, {
                filter: kendo.roleSelector('view'),

                start: function(e) { drawer._start(e); },
                move: function(e) { drawer._update(e); },
                end: function(e) { drawer._end(e); },
                tap: function() {
                    if (drawer.visible) {
                        drawer.hide();
                    }
                }
            });

            this.leftPositioned = this.options.position === "left";

            this.visible = false;
            this.element.addClass("km-drawer").addClass(this.leftPositioned ? "km-left-drawer" : "km-right-drawer").css('display', '');
        },

        options: {
            name: "Drawer",
            position: "left"
        },

        activate: function() {
            if (Drawer.last !== this) {
                if (Drawer.last) {
                    Drawer.last.element.css('zIndex', -2);
                }
                this.element.css('zIndex', -1);
            }

            Drawer.last = this;
            Drawer.current = this;
        },

        show: function() {
            this.activate();
            this.currentView.scroller.disable();
            this.visible = true;
            var offset = this.element.width();

            if (!this.leftPositioned) {
                offset = -offset;
            }

            this._moveViewTo(offset);
        },

        hide: function() {
            this.currentView.scroller.enable();
            this.visible = false;
            Drawer.current = null;
            this._moveViewTo(0);
        },

        // Alias in order to support popover/modalview etc. interface
        openFor: function() {
            if (this.visible) {
                this.hide();
            } else {
                this.show();
            }
        },

        _moveViewTo: function(offset) {
            this.userEvents.cancel();
            this.transition.moveTo({ location: offset, duration: 400, ease: Transition.easeOutExpo });
        },

        _viewShow: function(e) {
            var drawer = this,
                currentOffset = this.movable && this.movable.x;

            if (this.currentView === e.view) {
                return;
            }

            this.currentView = e.view;

            this.movable = new kendo.ui.Movable(e.view.element);

            this.transition = new Transition({
                axis: "x",
                movable: this.movable
            });

            if (this.visible) {
                this.movable.moveAxis('x', currentOffset);
                setTimeout(function() {
                    this.hide();
                }, 100);
            }
        },

        _start: function(e) {
            var userEvents = e.sender,
                leftPositioned = this.leftPositioned,
                visible = this.visible,
                canMoveLeft = leftPositioned && visible || !leftPositioned && !Drawer.current,
                canMoveRight = !leftPositioned && visible || leftPositioned && !Drawer.current,
                horizontalSwipe = Math.abs(e.x.velocity) >= Math.abs(e.y.velocity),
                leftSwipe = e.x.velocity < 0;

            if (horizontalSwipe && ((canMoveLeft && leftSwipe) || (canMoveRight && !leftSwipe))) {
                this.activate();
                userEvents.capture();
            } else {
                userEvents.cancel();
            }
        },

        _update: function(e) {
            var movable = this.movable,
                newPosition = movable.x + e.x.delta,
                limitedPosition;


            if (this.leftPositioned) {
                limitedPosition = Math.min(Math.max(0, newPosition), this.element.width());
            } else {
                limitedPosition = Math.max(Math.min(0, newPosition), -this.element.width());
            }

            this.movable.moveAxis("x", limitedPosition);
        },

        _end: function(e) {
            var velocity = e.x.velocity,
                pastHalf = Math.abs(this.movable.x) > this.element.width() / 2,
                velocityThreshold = 0.8,
                shouldShow;

            if (this.leftPositioned) {
                shouldShow = velocity > -velocityThreshold && (velocity > velocityThreshold || pastHalf);
            } else {
                shouldShow = velocity < velocityThreshold && (velocity < -velocityThreshold || pastHalf);
            }

            if(shouldShow) {
                this.show();
            } else {
                this.hide();
            }
        }
    });

    ui.plugin(Drawer);
})(window.kendo.jQuery);
