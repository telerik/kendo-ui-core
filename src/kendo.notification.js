(function(f, define){
    define([ "./kendo.core", "./kendo.popup" ], f);
})(function(){

var __meta__ = {
    id: "notification",
    name: "Notification",
    category: "web",
    description: "The Notification widget displays user alerts.",
    depends: [ "core", "popup" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        extend = $.extend,
        setTimeout = window.setTimeout,
        CLICK = "click",
        SHOW = "show",
        HIDE = "hide",
        KNOTIFICATION = "k-notification",
        KICLOSE = ".k-notification-wrap .k-i-close",
        INFO = "info",
        SUCCESS = "success",
        WARNING = "warning",
        ERROR = "error",
        TOP = "top",
        LEFT = "left",
        BOTTOM = "bottom",
        RIGHT = "right",
        UP = "up",
        NS = ".kendoNotification",
        WRAPPER = '<div class="k-widget k-notification"></div>',
        TEMPLATE = '<div class="k-notification-wrap">' +
                '<span class="k-icon k-i-note">#=typeIcon#</span>' +
                '#=content#' +
                '<span class="k-icon k-i-close">Hide</span>' +
            '</div>';

    var Notification = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._compileTemplates(that.options.templates);
            that._guid = "_" + kendo.guid();
            that._compileStacking(that.options.stacking, that.options.position.top);

            kendo.notify(that);
        },

        events: [
            SHOW,
            HIDE
        ],

        options: {
            name: "Notification",
            position: {
                pinned: true,
                top: null,
                left: null,
                bottom: 20,
                right: 20                
            },
            stacking: "default",
            hideOnClick: true,
            button: false,
            allowHideAfter: 0,
            autoHideAfter: 5000,            
            appendTo: null,
            width: null,
            height: null,
            templates: {},
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 300
                },
                close: {
                    effects: "fade:out",
                    duration: 600,
                    hide: true
                }
            }
        },

        _compileTemplates: function(templates) {
            var that = this;
            var kendoTemplate = kendo.template;
            
            that._compiled = {};

            $.each(templates, function(key, value) {
                that._compiled[key] = kendoTemplate(value);
            });

            that._defaultCompiled = kendoTemplate(TEMPLATE);
        },

        _getCompiled: function(type) {
            var that = this;
            var defaultCompiled = that._defaultCompiled;

            return type ? that._compiled[type] || defaultCompiled : defaultCompiled;
        },

        _compileStacking: function(stacking, top) {
            var that = this,
                origin, position;

            switch (stacking) {
                case "down":
                    origin = BOTTOM + " " + LEFT;
                    position = TOP + " " + LEFT;
                break;
                case RIGHT:
                    origin = TOP + " " + RIGHT;
                    position = TOP + " " + LEFT;
                break;
                case LEFT:
                    origin = TOP + " " + LEFT;
                    position = TOP + " " + RIGHT;
                break;
                case UP:
                    origin = TOP + " " + LEFT;
                    position = BOTTOM + " " + LEFT;
                break;
                default:
                    if (top !== null) {
                        origin = BOTTOM + " " + LEFT;
                        position = TOP + " " + LEFT;
                    } else {
                        origin = TOP + " " + LEFT;
                        position = BOTTOM + " " + LEFT;
                    }
                break;
            }

            that._popupOrigin = origin;
            that._popupPosition = position;
        },

        _attachPopupEvents: function(options, popup) {
            var that = this,
                allowHideAfter = options.allowHideAfter,
                attachDelay = !isNaN(allowHideAfter) && allowHideAfter > 0,
                closeIcon;

            function attachClick(target) {
                target.on(CLICK + NS, function() {
                    popup.close();
                });
            }

            if (options.hideOnClick) {
                popup.bind("activate", function(e) {
                    if (attachDelay) {
                        setTimeout(function(){
                            attachClick(popup.element);
                        }, allowHideAfter);
                    } else {
                        attachClick(popup.element);
                    }
                });
            } else if (options.button) {
                closeIcon = popup.element.find(KICLOSE);
                if (attachDelay) {
                    setTimeout(function(){
                        attachClick(closeIcon);
                    }, allowHideAfter);
                } else {
                    attachClick(closeIcon);
                }
            }
        },

        _showPopup: function(wrapper, options) {
            var that = this,
                autoHideAfter = options.autoHideAfter,
                x = options.position.left,
                y = options.position.top,
                allowHideAfter = options.allowHideAfter,
                popup, openPopup, attachClick, closeIcon;
            
            openPopup = $("." + that._guid).last();

            popup = new kendo.ui.Popup(wrapper, {
                anchor: openPopup[0] ? openPopup : document.body,
                origin: that._popupOrigin,
                position: that._popupPosition,
                animation: options.animation,
                modal: true,
                collision: "",
                close: function(e) {
                    that.trigger(HIDE, {element: this.element});
                },
                deactivate: function(e) {
                    e.sender.element.off(NS);
                    e.sender.element.find(KICLOSE).off(NS);
                    e.sender.destroy();
                }
            });

            that._attachPopupEvents(options, popup);

            if (openPopup[0]) {
                popup.open();
            } else {
                if (x === null) {
                    x = $(window).width() - wrapper.width() - options.position.right;
                }

                if (y === null) {
                    y = $(window).height() - wrapper.height() - options.position.bottom;
                }

                popup.open(x, y);
            }

            popup.wrapper.addClass(that._guid).css({margin: 0, padding: 0});

            if (options.position.pinned) {
                popup.wrapper.css("position", "fixed");
                if (openPopup[0]) {
                    that._togglePin(popup.wrapper, true);
                }
            } else if (!openPopup[0]) {
                that._togglePin(popup.wrapper, false);
            }

            if (autoHideAfter > 0) {
                setTimeout(function(){
                    popup.close();
                }, autoHideAfter);
            }
        },

        _togglePin: function(wrapper, pin) {
            var win = $(window),
                sign = pin ? -1 : 1;

            wrapper.css({
                top: parseInt(wrapper.css(TOP), 10) + sign * win.scrollTop(),
                left: parseInt(wrapper.css(LEFT), 10) + sign * win.scrollLeft()
            });
        },

        _attachStaticEvents: function(options, wrapper) {
            var that = this,
                allowHideAfter = options.allowHideAfter,
                attachDelay = !isNaN(allowHideAfter) && allowHideAfter > 0;

            function attachClick(target) {
                target.on(CLICK + NS, proxy(that._hideStatic, that, wrapper));
            }

            if (options.hideOnClick) {
                if (attachDelay) {
                    setTimeout(function(){
                        attachClick(wrapper);
                    }, allowHideAfter);
                } else {
                    attachClick(wrapper);
                }
            } else if (options.button) {
                if (attachDelay) {
                    setTimeout(function(){
                        attachClick(wrapper.find(KICLOSE));
                    }, allowHideAfter);
                } else {
                    attachClick(wrapper.find(KICLOSE));
                }
            }
        },

        _showStatic: function(wrapper, options) {
            var that = this,
                autoHideAfter = options.autoHideAfter,
                animation = options.animation,
                insertionMethod = options.stacking == UP || options.stacking == LEFT ? "prependTo" : "appendTo",
                attachClick;

            wrapper
                .addClass(that._guid)
                [insertionMethod](options.appendTo)
                .hide()
                .kendoAnimate(animation.open);

            that._attachStaticEvents(options, wrapper);

            if (autoHideAfter > 0) {
                setTimeout(function(){
                    that._hideStatic(wrapper);
                }, autoHideAfter);
            }
        },

        _hideStatic: function(wrapper) {
            wrapper.kendoAnimate(extend(this.options.animation.close, { complete: function() {
                wrapper.off(NS);
                wrapper.find(KICLOSE).off(NS);
                wrapper.remove();
            }}));
            this.trigger(HIDE, {element: wrapper});
        },

        show: function(content, type) {
            var that = this,
                options = that.options,
                wrapper = $(WRAPPER),
                args, defaultArgs, popup;

            if (!type) {
                type = INFO;
            }

            if (content !== null && content !== undefined && content !== "") {
                
                if (kendo.isFunction(content)) {
                    content = content();
                }

                defaultArgs = {typeIcon: type, content: ""};

                if ($.isPlainObject(content)) {
                    args = extend(defaultArgs, content);
                } else {
                    args = extend(defaultArgs, {content: content});
                }

                wrapper
                    .addClass(KNOTIFICATION + "-" + type)
                    .toggleClass(KNOTIFICATION + "-button", options.button)
                    .css({width: options.width, height: options.height})
                    .append(that._getCompiled(type)(args));
                
                if ($(options.appendTo)[0]) {
                    that._showStatic(wrapper, options);
                } else {
                    that._showPopup(wrapper, options);
                }

                that.trigger(SHOW, {element: wrapper});
            }

            return that;
        },

        info: function(content) {
            return this.show(content, INFO);
        },

        success: function(content) {
            return this.show(content, SUCCESS);
        },

        warning: function(content) {
            return this.show(content, WARNING);
        },

        error: function(content) {
            return this.show(content, ERROR);
        },

        hide: function() {
            var that = this,
                guidClass = "." + that._guid;

            if (that.options.appendTo) {
                $(guidClass).each(function(idx, element){
                    that._hideStatic($(element));
                });
            } else {
                $(guidClass).children("." + KNOTIFICATION).each(function(idx, element){
                    var popup = $(element).data("kendoPopup");
                    if (popup) {
                        popup.close();
                    }
                });
            }

            return that;
        }
    });

    kendo.ui.plugin(Notification);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });