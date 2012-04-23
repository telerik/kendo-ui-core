(function ($) {
    var $t = $.telerik;

    $t.scripts.push("telerik.menu.js");

    $t.menu = function (element, options) {
        this.element = element;
        this.nextItemZIndex = 100;

        $.extend(this, options);

        $('.t-item:not(.t-state-disabled)', element)
            .live('mouseenter', $t.delegate(this, this.mouseenter))
            .live('mouseleave', $t.delegate(this, this.mouseleave))
            .live('click', $t.delegate(this, this.click));

        $('.t-item:not(.t-state-disabled) > .t-link', element)
            .live('mouseenter', $t.hover)
            .live('mouseleave', $t.leave);

        $('.t-item.t-state-disabled', element)
            .live('click', function () { return false; });

        $(document).click($t.delegate(this, this.documentClick));

        $t.bind(this, {
            select: this.onSelect,
            open: this.onOpen,
            close: this.onClose,
            load: this.onLoad
        });
    }

    function getEffectOptions(item) {
        var parent = item.parent();
        return {
            direction: parent.hasClass('t-menu') ? parent.hasClass('t-menu-vertical') ? 'right' : 'bottom' : 'right'
        };
    };

    function contains(parent, child) {
        try {
            return $.contains(parent, child);
        } catch (e) {
            return false;
        }
    }

    $t.menu.prototype = {

        toggle: function (li, enable) {
            $(li).each(function () {
                $(this)
                    .toggleClass('t-state-default', enable)
                    .toggleClass('t-state-disabled', !enable);
            });
        },

        enable: function (li) {
            this.toggle(li, true);
        },

        disable: function (li) {
            this.toggle(li, false);
        },

        open: function ($li) {
            var menu = this;

            $($li).each(function () {
                var $item = $(this);

                clearTimeout($item.data('timer'));

                $item.data('timer', setTimeout(function () {
                    var $ul = $item.find('.t-group:first');
                    if ($ul.length) {
                        $t.fx.play(menu.effects, $ul, getEffectOptions($item));
                        $item.css('z-index', menu.nextItemZIndex++);
                    }
                }, 100));
            });
        },

        close: function ($li) {
            var menu = this;

            $($li).each(function (index, item) {
                var $item = $(item);

                clearTimeout($item.data('timer'));

                $item.data('timer', setTimeout(function () {
                    var $ul = $item.find('.t-group:first');
                    if ($ul.length) {
                        $t.fx.rewind(menu.effects, $ul, getEffectOptions($item), function () {
                            $item.css('zIndex', '');
                            if ($(menu.element).find('.t-group:visible').length == 0)
                                menu.nextItemZIndex = 100;
                        });
                        $ul.find('.t-group').stop(false, true);
                    }
                }, 100));
            });
        },

        mouseenter: function (e, element) {
            var $li = $(element);
            if (!this.openOnClick || this.clicked) {
                if (!contains(element, e.relatedTarget)) {
                    this.triggerEvent('open', $li);
                    this.open($li);

                    var parentItem = $li.parent().closest('.t-item')[0];

                    if (parentItem && !contains(parentItem, e.relatedTarget))
                        this.mouseenter(e, parentItem);
                }
            }

            if (this.openOnClick && this.clicked) {
                this.triggerEvent('close', $li);

                $li.siblings().each($.proxy(function (_, sibling) {
                    this.close($(sibling));
                }, this));
            }
        },

        mouseleave: function (e, element) {
            if (!this.openOnClick && !contains(element, e.relatedTarget)) {
                var $li = $(element);
                this.triggerEvent('close', $li);

                this.close($li);

                var parentItem = $li.parent().closest('.t-item')[0];

                if (parentItem && !contains(parentItem, e.relatedTarget))
                    this.mouseleave(e, parentItem);
            }
        },

        click: function (e, element) {
            e.stopPropagation();

            var $li = $(element);

            if ($li.hasClass('t-state-disabled')) {
                e.preventDefault();
                return; 
            }

            if ($t.trigger(this.element, 'select', { item: $li[0] })) {
                e.preventDefault();
                return;
            }

            if (!$li.parent().hasClass('t-menu') || !this.openOnClick)
                return;

            e.preventDefault();

            this.clicked = true;

            this.triggerEvent('open', $li);

            this.open($li);
        },

        documentClick: function (e, element) {
            if ($.contains(this.element, e.target))
                return;

            if (this.clicked) {
                this.clicked = false;
                $(this.element).children('.t-item').each($.proxy(function (i, item) {
                    this.close($(item));
                }, this));
            }
        },

        hasChildren: function ($li) {
            return $li.find('.t-group:first').length;
        },

        triggerEvent: function (eventName, $li) {
            if (this.hasChildren($li))
                $t.trigger(this.element, eventName, { item: $li[0] });
        }
    }

    $.fn.tMenu = function (options) {
        return $t.create(this, {
            name: 'tMenu',
            init: function (element, options) {
                return new $t.menu(element, options);
            },
            options: options
        });
    };

    // default options
    $.fn.tMenu.defaults = {
        orientation: 'horizontal',
        effects: $t.fx.slide.defaults(),
        openOnClick: false
    };
})(jQuery);