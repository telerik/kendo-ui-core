(function ($, window) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component,
        events = [ 'open', 'close', 'select', 'init' ],
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

            if (options && ('animation' in options) && !options.animation)
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation
            
            Component.fn.init.call(that, element, options);

            options = that.options;

            that._updateClasses();

            that.nextItemZIndex = 100;

            element.delegate( itemSelector, MOUSEENTER, $.proxy( that._mouseenter , that ) )
                   .delegate( itemSelector, MOUSELEAVE, $.proxy( that._mouseleave , that ) )
                   .delegate( itemSelector, CLICK, $.proxy( that._click , that ) );

            element.delegate( linkSelector, MOUSEENTER + ' ' + MOUSELEAVE, that._toggleHover );

            $(document).click($.proxy( that._documentClick, that ));

            that.bind(events, that.options);
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
                    var ul = item.find('.t-group').filter(':first:hidden');
                    if (ul.length) {
                        var effectOptions = extend(getEffectOptions(item), that.options.animation.open);
                        item.data('effectOptions', effectOptions);
                        var wrap = kendo.wrap(ul).css({ overflow: 'hidden', display: 'block' });
                        ul.kendoStop(true).kendoAnimate(extend( effectOptions, {
                            complete: function () {
                                wrap.css({ overflow: '' });
                            }
                        }));
                        item.css('z-index', that.nextItemZIndex++);
                    }
                }, that.options.hoverDelay));
            });
        },

        close: function (element) {
            var that = this;

            $(element).each(function () {
                var item = $(this);

                clearTimeout(item.data('timer'));

                item.data('timer', setTimeout(function () {
                    var ul = item.find('.t-group').filter(':first:visible');
                    if (ul.length) {
                        var hasCloseAnimation = 'effects' in that.options.animation.close;
                        var wrap = kendo.wrap(ul).css({ overflow: 'hidden' });
                        ul.kendoStop(true).kendoAnimate(extend( hasCloseAnimation ? {} : item.data('effectOptions'), that.options.animation.close, {
                                    reverse: !hasCloseAnimation,
                                    complete: function () {
                                        wrap.css({ display: 'none' });
                                        item.css('zIndex', '');

                                        if (!that.element.find('.t-group:visible').length)
                                            that.nextItemZIndex = 100;
                                    }
                                }));
                    }
                }, that.options.hoverDelay));
            });
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass('t-state-hover', e.type == MOUSEENTER);
        },

        _updateClasses: function() {
            var that = this;

            that.element.addClass('t-widget t-reset t-header t-menu').addClass('t-menu-' + that.options.orientation);

            var items = that.element
                            .find('ul')
                            .addClass('t-group')
                            .end()
                            .find('li')
                            .addClass('t-item');

            items
                .children('img')
                .addClass('t-image');
            items
                .children('a')
                .addClass('t-link')
                .children('img')
                .addClass('t-image');
            items
                .filter(':not([disabled])')
                .addClass('t-state-default');
            items
                .filter('li[disabled]')
                .addClass('t-state-disabled')
                .removeAttr('disabled');
            items
                .children('a:focus')
                .parent()
                .addClass('t-state-active');

            items.each(function() {
                var item = $(this);

                if (!item.children('.t-link').length)
                    item
                        .contents()      // exclude groups, real links, templates and empty text nodes
                        .filter(function() { return (this.nodeName != 'UL' && this.nodeName != 'A' && this.nodeName != 'DIV' && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                        .wrapAll('<span class="t-link"/>');
            });

            items
                .filter(':has(.t-group)')
                .children('.t-link:not(:has([class*=t-arrow]))')
                .each(function () {
                    var item = $(this),
                        parent = item.parent().parent();

                    item.append('<span class="t-icon ' + (parent.hasClass('t-menu-horizontal') ? 't-arrow-down' : 't-arrow-next') + '"></span>');
                });

        },

        _mouseenter: function (e) {
            var that = this;

            var element = $(e.currentTarget);
            if (!that.options.openOnClick || that.clicked) {
                if (!contains(e.currentTarget, e.relatedTarget)) {
                    that._triggerEvent('open', element);
                    that.open(element);
                }
            }

            if (that.options.openOnClick && that.clicked) {
                that._triggerEvent('close', element);

                element.siblings().each($.proxy(function (_, sibling) {
                    that.close(sibling);
                }, that));
            }
        },

        _mouseleave: function (e) {
            var that = this;
            
            if (!that.options.openOnClick && !contains(e.currentTarget, e.relatedTarget)) {
                var element = $(e.currentTarget);
                that.trigger('close', element);

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

            that._triggerEvent('select', element);

            if (!element.parent().hasClass('t-menu') || !that.options.openOnClick)
                return;

            e.preventDefault();

            that.clicked = true;
            that._triggerEvent('open', element);
            that.open(element);
        },

        _documentClick: function (e) {
            var that = this;

            if (contains(that.element, e.target))
                return;

            if (that.clicked) {
                that.clicked = false;
                that.close(that.element.find('.t-item>.t-animation-container:visible').parent());
            }
        },

        _hasChildren: function (element) {
            return element.find('.t-group').filter(':first').length;
        },

        _triggerEvent: function (eventName, element) {
            var that = this;
            
            if (that._hasChildren(element)) {
                that.trigger(eventName, { item: element[0] });
                that.element.trigger(eventName, { item: element[0] });
            }
        }
    });

    // client-side rendering
    extend(Menu, {
        create: function () {
        }
    });

    kendo.ui.plugin("Menu", Menu, Component);

})(jQuery, window);
