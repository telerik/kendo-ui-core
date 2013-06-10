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
                var currentOffset = drawer.movable && drawer.movable.x;

                if (drawer.currentView === e.view) {
                    return;
                }

                drawer.currentView = e.view;
                drawer.movable = new kendo.ui.Movable(e.view.element);
                drawer.transition = new Transition({ axis: "x", movable: drawer.movable });

                if (currentOffset) {
                    drawer.movable.moveAxis('x', currentOffset);
                    setTimeout(function() {
                        drawer.hide();
                    }, 100);
                }
            });

            this.userEvents = new kendo.UserEvents(this.pane.element, {
                filter: kendo.roleSelector('view'),

                move: function(e) { drawer._update(e) },

                end: function(e) { drawer._end(e) },

                tap: function() {
                    if (drawer.visible) {
                        drawer.hide();
                    }
                }
            });

            this.visible = false;
            this.element.addClass("km-drawer").css("display", '');
        },

        show: function() {
            this.currentView.scroller.disable();
            this.visible = true;
            this._moveViewTo(this.element.width());
        },

        hide: function() {
            this.currentView.scroller.enable();
            this.visible = false;
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

        _update: function(e) {
            var movable = this.movable,
                newPosition = movable.x + e.x.delta,
                limitedPosition = Math.min(Math.max(0, newPosition), this.element.width());

            this.movable.moveAxis("x", limitedPosition);
        },

        _end: function(e) {
            var velocity = e.x.velocity,
                movable = this.movable,
                width = movable.element.width(),
                velocityThreshold = 0.8;

            if (velocity > -velocityThreshold && (velocity > velocityThreshold || movable.x > width / 2)) {
                this.show();
            } else {
                this.hide();
            }
        },

        options: {
            name: "Drawer"
        }
    });

    ui.plugin(Drawer);
})(window.kendo.jQuery);
