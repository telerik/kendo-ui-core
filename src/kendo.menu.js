(function ($, window) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component,
        MOUSEENTER = 'mouseenter',
        MOUSELEAVE = 'mouseleave',
        CLICK = 'click',
        itemSelector = '.t-item:not(.t-state-disabled)',
        linkSelector = '.t-item:not(.t-state-disabled) > .t-link';

    function getEffectOptions(item) {
        var parent = item.parent();
        return {
            effects: parent.hasClass('t-menu') ? parent.hasClass('t-menu-vertical') ? 'slideRightIn' : 'slideDownIn' : 'slideRightIn'
        };
    }

    function contains(parent, child) {
        try {
            return $.contains(parent, child);
        } catch (e) {
            return false;
        }
    }

    var Menu = Component.extend({
        init: function(element, options) {
            element = $(element);
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;

            that.nextItemZIndex = 100;

            element.delegate( itemSelector, MOUSEENTER, $.proxy( that._mouseenter , that ) )
                   .delegate( itemSelector, MOUSELEAVE, $.proxy( that._mouseleave , that ) )
                   .delegate( itemSelector, CLICK, $.proxy( that._click , that ) );

            element.delegate( linkSelector, MOUSEENTER, $.proxy( that._toggleHover , that ) )
                   .delegate( linkSelector, MOUSELEAVE, $.proxy( that._toggleHover , that ) );

            $(document).click($.proxy( that._documentClick, that ));

            element.bind({
                select: that.onSelect,
                open: that.onOpen,
                close: that.onClose,
                load: that.onLoad
            });
        },
        options: {
            animation: {
                open: {
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100,
                    show: false, 
                    hide: true
                }
            },
            orientation: 'horizontal',
            openOnClick: false,
            hoverDelay: 100
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass('t-state-hover', e.type == MOUSEENTER);
        },
    
        toggle: function (element, enable) {
            $(element).each(function () {
                $(this)
                    .toggleClass('t-state-default', enable)
                    .toggleClass('t-state-disabled', !enable);
            });
        },

        enable: function (element) {
            this.toggle(element, true);
        },

        disable: function (element) {
            this.toggle(element, false);
        },

        open: function (element) {
            var that = this;

            $(element).each(function () {
                var item = $(this);

                clearTimeout(item.data('timer'));

                item.data('timer', setTimeout(function () {
                    var ul = item.find('.t-group').filter(':first');
                    if (ul.length) {
                        var effectOptions = extend(getEffectOptions(item), that.options.animation.open);
                        item.data('effectOptions', effectOptions);
                        var wrap = that._wrap(ul).css({ overflow: 'hidden', display: 'block' });
                        ul.kendoStop(true).kendoAnimate(extend( effectOptions, {
                            complete: function () {
                                wrap.css({ overflow: '' });
                            }
                        }));
                        item.css('z-index', that.nextItemZIndex++);
                    }
                }, that.options.hoverDelay)); // TODO: make an option
            });
        },

        close: function (element) {
            var that = this;

            $(element).each(function (index, item) {
                item = $(item);

                clearTimeout(item.data('timer'));

                item.data('timer', setTimeout(function () {
                    var ul = item.find('.t-group').filter(':first');
                    if (ul.length) {
                        var hasCloseAnimation = 'effects' in that.options.animation.close;
                        var wrap = that._wrap(ul).css({ overflow: 'hidden' });
                        ul.kendoStop(true).kendoAnimate(extend( hasCloseAnimation ? {} : item.data('effectOptions'), that.options.animation.close, {
                                    reverse: !hasCloseAnimation,
                                    complete: function () {
                                        wrap.css({ display: 'none' });
                                        item.css('zIndex', '');

                                        if (that.element.find('.t-group:visible').length == 0)
                                            that.nextItemZIndex = 100;
                                    }
                                }));
                    }
                }, that.options.hoverDelay));
            });
        },

        _wrap: function (element) {
            if (!element.parent().hasClass('t-animation-container')) {
                var radius = element.css('box-shadow').match(/(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*$/i) || [ 0, 0, 0, 0, 0 ],
                    blur = Math.max((+radius[3]), (+radius[4])),
                    right = (+radius[1]) + blur,
                    bottom = (+radius[2]) + blur;

                element.wrap(
                             $('<div/>')
                             .addClass('t-animation-container')
                             .css({
                                 width: element.outerWidth(),
                                 height: element.outerHeight(),
                                 paddingRight: right,
                                 paddingBottom: bottom
                             }));
            }

            return element.parent();
        },
        
        _mouseenter: function (e) {
            var element = $(e.currentTarget);
            if (!this.openOnClick || this.clicked) {
                if (!contains(e.currentTarget, e.relatedTarget)) {
                    this.triggerEvent('open', element);
                    this.open(element);
                }
            }

            if (this.openOnClick && this.clicked) {
                this.triggerEvent('close', element);

                element.siblings().each($.proxy(function (_, sibling) {
                    this.close($(sibling));
                }, this));
            }
        },

        _mouseleave: function (e) {
            var that = this;
            
            if (!that.openOnClick && !contains(e.currentTarget, e.relatedTarget)) {
                var element = $(e.currentTarget);
                that.triggerEvent('close', element);

                that.close(element);
            }
        },

        _click: function (e) {
            var that = this;
            e.stopPropagation();

            var element = $(e.currentTarget);

            if (element.hasClass('t-state-disabled')) {
                e.preventDefault();
                return; 
            }

            this.element.trigger('select', { item: element[0] });

            if (!element.parent().hasClass('t-menu') || !that.openOnClick)
                return;

            e.preventDefault();

            that.clicked = true;
            that.triggerEvent('open', element);
            that.open(element);
        },

        _documentClick: function (e) {
            var that = this;
            
            if ($.contains(that.element, e.currentTarget))
                return;

            if (that.clicked) {
                that.clicked = false;
                that.element.children('.t-item').each(function (i, item) {
                    that.close($(item));
                });
            }
        },

        hasChildren: function (element) {
            return element.find('.t-group').filter(':first').length;
        },

        triggerEvent: function (eventName, element) {
            if (this.hasChildren(element))
                this.element.trigger(eventName, { item: element[0] });
        }
    });

    // client-side rendering
    extend(Menu, {
        create: function () {
        }
    });

    kendo.ui.plugin("Menu", Menu, Component);

})(jQuery, window);
