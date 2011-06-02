(function ($, window) {

    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component,
        events = [ 'select', 'contentLoad', 'error', 'load' ],
        MOUSEENTER = 'mouseenter',
        MOUSELEAVE = 'mouseleave',
        CLICK = 'click',
        clickableItems = '.t-tabstrip-items > .t-item:not(.t-state-disabled)',
        disabledLinks = '.t-tabstrip-items > .t-state-disabled .t-link',
        disabledClass = 't-state-disabled',
        defaultState = 't-state-default',
        activeState = 't-state-active',
        EMPTY = ':empty';

    var TabStrip = Component.extend({
        init: function(element, options) {
            element = $(element);
            var that = this;
            that.contentElements = element.find('> .t-content');

            Component.fn.init.call(that, element, options);

            options = that.options;

            element
                .delegate(clickableItems, CLICK, $.proxy(that._click, that))
                .delegate(clickableItems, MOUSEENTER + ' ' + MOUSELEAVE, that._toggleHover)
                .delegate(disabledLinks, CLICK, false);

            that.bind(events, that.options);

            if (that.contentUrls)
                element.find('.t-tabstrip-items > .t-item')
                    .each(function(index, item) {
                        $(item).find('.t-link').data('ContentUrl', that.contentUrls[index]);
                    });

            var selectedItems = element.find('li.t-state-active'),
                content = $(that.getContentElement(selectedItems.parent().children().index(selectedItems)));

            if (content.length > 0 && content[0].childNodes.length == 0)
                that.activateTab(selectedItems.eq(0));
        },
        options: {
            animation: {
                open: {
                    effects: 'expandVertical fadeIn',
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200,
                    show: false,
                    hide: true
                }
            },
            expandMode: 'multi'
        },

        select: function (element) {
            var that = this;
            
            $(element).each(function (index, item) {
                item = $(item);
                if (item.is('.t-state-disabled,.t-state-active'))
                    return;

                that.activateTab(item);
            });
        },

        enable: function (element) {
            $(element).addClass(defaultState)
                 .removeClass(disabledClass);
        },

        disable: function (element) {
            $(element).removeClass(defaultState)
                 .removeClass(activeState)
				 .addClass(disabledClass);
        },

        reload: function (element) {
            var that = this;

            $(element).each(function () {
                var item = $(this),
                    contentUrl = item.find('.t-link').data('ContentUrl');

                if (contentUrl) {
                    that.ajaxRequest(item, $(that.getContentElement(item.index())), null, contentUrl);
                }
            });
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass('t-state-hover', e.type == MOUSEENTER);
        },

        _click: function (e) {
            var that = this,
                item = $(e.currentTarget),
                link = item.find('.t-link'),
                href = link.attr('href'),
                content = $(that.getContentElement(item.index()));

            if (item.is('.t-state-disabled,.t-state-active')) {
                e.preventDefault();
                return;
            }

            if (that.trigger('select', { item: item[0], contentElement: content[0] })) {
                e.preventDefault();
            }

            var isAnchor = link.data('ContentUrl') || (href && (href.charAt(href.length - 1) == '#' || href.indexOf('#' + that.element[0].id + '-') != -1));

            if (!href || isAnchor || (content.length > 0 && content[0].childNodes.length == 0))
                e.preventDefault();
            else return;

            if (that.activateTab(item))
                e.preventDefault();
        },

        activateTab: function (item) {
            var that = this,
                hasCloseAnimation = 'effects' in that.options.animation.close,
                closeAnimation = hasCloseAnimation ?
                                       that.options.animation.close :
                                       extend( extend({ reverse: true }, that.options.animation.open), { show: false, hide: true }),
                openAnimation = that.options.animation.open,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter('.t-state-active'),
                itemIndex = neighbours.index(item);

            // deactivate previously active tab
            oldTab.kendoRemoveClass(activeState, { duration: closeAnimation.duration });

            // handle content elements
            var contentElements = that.contentElements;

            if (contentElements.length == 0)
                return false;

            var visibleContentElements = contentElements.filter('.t-state-active');

            // find associated content element
            var content = $(that.getContentElement(itemIndex));

            if (content.length == 0) {
                visibleContentElements
                    .removeClass( activeState )
                    .kendoStop(true, true)
                    .kendoAnimate( closeAnimation );
                return false;
            }

            var isAjaxContent = content.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeClass('t-tab-on-top');
                    item.addClass('t-tab-on-top'); // change these directly to bring the tab on top.
                    item.css('z-index'); // nudgy nudgy...

                    oldTab.kendoAddClass(defaultState, { duration: openAnimation.duration });
                    item.kendoAddClass(activeState, { duration: openAnimation.duration });
                    content
                        .addClass(activeState)
                        .kendoStop(true, true)
                        .kendoAnimate( openAnimation );
                };

            visibleContentElements
                    .removeClass(activeState)
                    .css('height', visibleContentElements.height())
                    .css('height');

            visibleContentElements
                .kendoStop(true, true)
                .kendoAnimate(extend( {
                    complete: function () {
                        if (!isAjaxContent)
                            showContentElement();
                        else
                            that.ajaxRequest(item, content, function () {
                                showContentElement();
                            });
                    }
               }, closeAnimation ));

            return true;
        },

        getSelectedTabIndex: function () {
            return this.element.find('li.t-state-active').index();
        },

        getContentElement: function (itemIndex) {
            if (isNaN(itemIndex - 0)) return;

            var contentElements = this.contentElements,
                idTest = new RegExp('-' + (itemIndex + 1) + '$');

            for (var i = 0, len = contentElements.length; i < len; i++) {
                if (idTest.test(contentElements[i].id)) {
                    return contentElements[i];
                }
            }
        },

        ajaxRequest: function (element, content, complete, url) {
            if (element.find('.t-loading').length)
                return;

            var that = this,
                link = element.find('.t-link'),
                data = {},
                statusIcon = null,
                loadingIconTimeout = setTimeout(function () {
                    statusIcon = $('<span class="t-icon t-loading"></span>').prependTo(link)
                }, 100);

            $.ajax({
                type: 'GET',
                cache: false,
                url: url || link.data('ContentUrl') || link.attr('href'),
                dataType: 'html',
                data: data,

                error: function (xhr, status) {
                    if (that.ajaxError(that.element, 'error', xhr, status))
                        return;
                },

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    if (statusIcon !== null)
                        statusIcon.remove();
                },

                success: function (data, textStatus) {
                    content.html(data);

                    if (complete)
                        complete.call(that, content);

                    that.trigger('contentLoad', { item: element[0], contentElement: content[0] });
                }
            });
        }
    });

    extend(TabStrip, {
        create: function () {
        }
    });

    kendo.ui.plugin("TabStrip", TabStrip, Component);

})(jQuery, window);
