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
        roleSelector = kendo.roleSelector,
        AXIS = "x",
        ui = mobile.ui,

        BEFORE_SHOW = "beforeShow",
        INIT = "init",
        SHOW = "show",
        HIDE = "hide";

    var Drawer = ui.View.extend({
        init: function(element, options) {
            // move the drawer to the top, in order hide it
            $(element).parent().prepend(element);

            mobile.ui.Widget.fn.init.call(this, element, options);

            this._layout();
            this._scroller();
            this._model();

            this.pane = this.element.closest(roleSelector("pane")).data("kendoMobilePane");

            var drawer = this;

            this.pane.bind("viewShow", function(e) {
                drawer._viewShow(e);
            });

            this.pane.bind("sameViewRequested", function() {
                drawer.hide();
            });

            this.userEvents = new kendo.UserEvents(this.pane.element, {
                filter: roleSelector("view"),
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
            this.element.addClass("km-drawer").addClass(this.leftPositioned ? "km-left-drawer" : "km-right-drawer");
        },

        options: {
            name: "Drawer",
            position: "left",
            views: [],
            title: ""
        },

        events: [
            BEFORE_SHOW,
            HIDE,
            INIT,
            SHOW
        ],

        show: function() {
            if (this._activate()) {
                this._show();
            }
        },

        hide: function() {
            this.currentView.scroller.enable();
            this.visible = false;
            Drawer.current = null;
            this._moveViewTo(0);
            this.trigger(HIDE, { view: this });
        },

        // Alias in order to support popover/modalview etc. interface
        openFor: function() {
            if (this.visible) {
                this.hide();
            } else {
                this.show();
            }
        },

        _activate: function() {
            var views = this.options.views,
                visibleOnCurrentView = !views[0] || views.indexOf(this.pane.view().id.replace('#', '')) > -1;

            if (this.trigger(BEFORE_SHOW, { view: this }) || !visibleOnCurrentView) {
                return false;
            }

            this._setAsCurrent();

            this.trigger(SHOW, { view: this });
            return true;
        },

        _show: function() {
            this.currentView.scroller.disable();
            this.visible = true;
            var offset = this.element.width();

            if (!this.leftPositioned) {
                offset = -offset;
            }

            this._moveViewTo(offset);
        },

        _setAsCurrent: function() {
            if (Drawer.last !== this) {
                if (Drawer.last) {
                    Drawer.last.element.hide();
                }
                this.element.show();
            }

            Drawer.last = this;
            Drawer.current = this;
        },

        _moveViewTo: function(offset) {
            this.userEvents.cancel();
            this.transition.moveTo({ location: offset, duration: 400, ease: Transition.easeOutExpo });
        },

        _viewShow: function(e) {
            var currentOffset = this.movable && this.movable.x;

            if (this.currentView === e.view) {
                this.hide();
                return;
            }

            this.currentView = e.view;

            this.movable = new kendo.ui.Movable(e.view.element);

            this.transition = new Transition({ axis: AXIS, movable: this.movable });

            if (currentOffset) {
                this.movable.moveAxis(AXIS, currentOffset);
                this.hide();
            }
        },

        _start: function(e) {
            var userEvents = e.sender;

            // ignore non-horizontal swipes
            if (Math.abs(e.x.velocity) < Math.abs(e.y.velocity)) {
                userEvents.cancel();
                return;
            }

            var leftPositioned = this.leftPositioned,
                visible = this.visible,
                canMoveLeft = leftPositioned && visible || !leftPositioned && !Drawer.current,
                canMoveRight = !leftPositioned && visible || leftPositioned && !Drawer.current,
                leftSwipe = e.x.velocity < 0;

            if ((canMoveLeft && leftSwipe) || (canMoveRight && !leftSwipe)) {
                if (this._activate()) {
                    userEvents.capture();
                    return;
                }
            }

            userEvents.cancel();
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

            this.movable.moveAxis(AXIS, limitedPosition);
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
                this._show();
            } else {
                this.hide();
            }
        }
    });

    ui.plugin(Drawer);
})(window.kendo.jQuery);
