(function(f, define){
    define([ "./kendo.mobile.view", "./kendo.userevents" ], f);
})(function(){

var __meta__ = {
    id: "mobile.drawer",
    name: "Drawer",
    category: "mobile",
    description: "The Kendo Mobile Drawer widget provides slide to reveal global application toolbox",
    depends: [ "mobile.view", "userevents" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        os = kendo.support.mobileOS,
        Transition = kendo.effects.Transition,
        roleSelector = kendo.roleSelector,
        AXIS = "x",
        ui = mobile.ui,
        SWIPE_TO_OPEN = !(os.ios && os.majorVersion == 7 && !os.appMode),
        BEFORE_SHOW = "beforeShow",
        INIT = "init",
        SHOW = "show",
        HIDE = "hide",
        AFTER_HIDE = "afterHide",
        NULL_VIEW = { enable: $.noop };

    var Drawer = ui.View.extend({
        init: function(element, options) {
            // move the drawer to the top, in order to hide it
            $(element).parent().prepend(element);

            mobile.ui.Widget.fn.init.call(this, element, options);

            if (!this.options.$angular) {
                this._layout();
                this._scroller();
            }

            this._model();

            var pane = this.element.closest(roleSelector("pane")).data("kendoMobilePane"),
                userEvents;

            if (pane) {
                this.pane = pane;
                this.pane.bind("viewShow", function(e) {
                    drawer._viewShow(e);
                });

                this.pane.bind("sameViewRequested", function() {
                    drawer.hide();
                });

                userEvents = this.userEvents = new kendo.UserEvents(pane.element, {
                    filter: roleSelector("view splitview"),
                    allowSelection: true
                });

            } else {
                this.currentView = NULL_VIEW;
                var container = $(this.options.container);

                if (!container) {
                    throw new Error("The drawer needs a container configuration option set.");
                }

                userEvents = this.userEvents = new kendo.UserEvents(container, { allowSelection: true });
                this._attachTransition(container);
            }

            var drawer = this;

            var hide = function(e) {
                if (drawer.visible) {
                    drawer.hide();
                    e.preventDefault();
                }
            };

            if (this.options.swipeToOpen && SWIPE_TO_OPEN) {
                userEvents.bind("press", function(e) { drawer.transition.cancel(); });
                userEvents.bind("start", function(e) { drawer._start(e); });
                userEvents.bind("move", function(e) { drawer._update(e); });
                userEvents.bind("end", function(e) { drawer._end(e); });
                userEvents.bind("tap", hide);
            } else {
                userEvents.bind("press", hide);
            }

            this.leftPositioned = this.options.position === "left";

            this.visible = false;

            this.element.hide().addClass("km-drawer").addClass(this.leftPositioned ? "km-left-drawer" : "km-right-drawer");
            this.trigger(INIT);
        },

        options: {
            name: "Drawer",
            position: "left",
            views: [],
            swipeToOpenViews: [],
            swipeToOpen: true,
            title: "",
            container: null
        },

        events: [
            BEFORE_SHOW,
            HIDE,
            AFTER_HIDE,
            INIT,
            SHOW
        ],

        show: function() {
            if (this._activate()) {
                this._show();
            }
        },

        hide: function() {
            if (!this.currentView) {
                return;
            }

            this.currentView.enable();

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

        destroy: function() {
            ui.View.fn.destroy.call(this);
            this.userEvents.destroy();
        },

        _activate: function() {
            if (this.visible) {
                return true;
            }

            var visibleOnCurrentView = this._currentViewIncludedIn(this.options.views);

            if (!visibleOnCurrentView || this.trigger(BEFORE_SHOW, { view: this })) {
                return false;
            }

            this._setAsCurrent();
            this.element.show();

            this.trigger(SHOW, { view: this });
            this._invokeNgController();
            return true;
        },

        _currentViewIncludedIn: function(views) {
            if (!this.pane || !views.length) {
                return true;
            }

            var view = this.pane.view();
            return $.inArray(view.id.replace('#', ''), views) > -1 || $.inArray(view.element.attr("id"), views) > -1;
        },

        _show: function() {
            this.currentView.enable(false);

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
            if (this.currentView) {
                this.currentView.enable();
            }

            if (this.currentView === e.view) {
                this.hide();
                return;
            }

            this.currentView = e.view;
            this._attachTransition(e.view.element);
        },

        _attachTransition: function(element) {
            var that = this,
                movable = this.movable,
                currentOffset = movable && movable.x;


            if (this.transition) {
                this.transition.cancel();
                this.movable.moveAxis("x", 0);
            }

            movable = this.movable = new kendo.ui.Movable(element);

            this.transition = new Transition({
                axis: AXIS,
                movable: this.movable,
                onEnd: function() {
                    if (movable[AXIS] === 0) {
                        element[0].style.cssText = "";
                        that.element.hide();
                        that.trigger(AFTER_HIDE);
                        that.visible = false;
                    }
                }
            });

            if (currentOffset) {
                element.addClass("k-fx-hidden");
                kendo.animationFrame(function() {
                    element.removeClass("k-fx-hidden");
                    that.movable.moveAxis(AXIS, currentOffset);
                    that.hide();
                });
            }
        },

        _start: function(e) {
            var userEvents = e.sender;

            // ignore non-horizontal swipes
            if (Math.abs(e.x.velocity) < Math.abs(e.y.velocity) || kendo.triggeredByInput(e.event) || !this._currentViewIncludedIn(this.options.swipeToOpenViews)) {
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
            e.event.preventDefault();
            e.event.stopPropagation();
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

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
