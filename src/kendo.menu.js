(function ($, window) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component;

    function getEffectOptions(item) {
        var parent = item.parent();
        return {
            direction: parent.hasClass('t-menu') ? parent.hasClass('t-menu-vertical') ? 'right' : 'bottom' : 'right'
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
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;

            this.nextItemZIndex = 100;

            $('.t-item:not(.t-state-disabled)', element)
                .live('mouseenter', kendo.delegate(this, this.mouseenter), true)
                .live('mouseleave', kendo.delegate(this, this.mouseleave), true)
                .live('click', kendo.delegate(this, this.click));

            $('.t-item:not(.t-state-disabled) > .t-link', element)
                .live('mouseenter', kendo.hover)
                .live('mouseleave', kendo.leave);

            $(document).click(kendo.delegate(this, this.documentClick));

            kendo.bind(this, {
                select: this.onSelect,
                open: this.onOpen,
                close: this.onClose,
                load: this.onLoad
            });
        },
        options: {
            orientation: 'horizontal',
            effects: kendo.fx.slide.defaults(),
            openOnClick: false
        },
    
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
                        kendo.fx.play(menu.effects, $ul, getEffectOptions($item));
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
                        kendo.fx.rewind(menu.effects, $ul, getEffectOptions($item), function () {
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

            kendo.trigger(this.element, 'select', { item: $li[0] });

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
                kendo.trigger(this.element, eventName, { item: $li[0] });
        }
    });

    // client-side rendering
    extend(Menu, {
        create: function () {
            var element, options;

            if ($.isPlainObject(arguments[0])) {
                options = arguments[0];
            } else {
                element = arguments[0];
                options = $.extend({
                    html: element.innerHTML
                }, arguments[1]);
            }

            options = $.extend({
                title: "",
                html: "",
                actions: ["Close"]
            }, options);

            var windowHtml = "",
                titleHtml = ""
                contentHtml = "";

            windowHtml += "<div class='t-widget t-window'></div>";

            titleHtml += "<div class='t-window-titlebar t-header'>&nbsp;<span class='t-window-title'>" +
                          options.title + "</span><div class='t-window-actions t-header'>";

            $.map(options.actions, function (command) {
                titleHtml += "<a href='#' class='t-window-action t-link'><span class='t-icon t-" +
                              command.toLowerCase() + "'>" + command + "</span></a>";
            });

            titleHtml += "</div>";

            if (!element) {
                contentHtml = $("<div class='t-window-content t-content'></div>");
            } else {
                contentHtml = $(element);
            }

            if (typeof (options.scrollable) != "undefined" && options.scrollable === false) {
                contentHtml.attr("style", "overflow:hidden;");
            }

            if (options.contentUrl && !isLocalUrl(options.contentUrl)) {
                contentHtml.html("<iframe src='" + options.contentUrl + "' title='" + options.title +
                              "' frameborder='0' style='border:0;width:100%;height:100%;'>This page requires frames in order to show content</iframe>");
            }

            if (element) {
                $(windowHtml).append(titleHtml).append(contentHtml).appendTo(document.body);
            } else {
                windowHtml += "</div>";
                return $(windowHtml).appendTo(document.body).kendoWindow(options);
            }
        }
    });

    kendo.ui.plugin("Menu", Menu, Component);

})(jQuery, window);
