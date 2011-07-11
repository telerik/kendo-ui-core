(function ($, window) {

    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component,
        events = [ 'select', 'contentLoad', 'error', 'init' ],
        MOUSEENTER = 'mouseenter',
        MOUSELEAVE = 'mouseleave',
        CLICK = 'click',
        CLICKABLEITEMS = '.t-tabstrip-items > .t-item:not(.t-state-disabled)',
        HOVERABLEITEMS = '.t-tabstrip-items > .t-item:not(.t-state-disabled):not(.t-state-active)',
        DISABLEDLINKS = '.t-tabstrip-items > .t-state-disabled .t-link',
        DISABLEDSTATE = 't-state-disabled',
        DEFAULTSTATE = 't-state-default',
        ACTIVESTATE = 't-state-active',
        HOVERSTATE = 't-state-hover',
        TABONTOP = 't-tab-on-top',
        EMPTY = ':empty';

    var TabStrip = Component.extend({
        init: function(element, options) {
            element = $(element);
            var that = this;

            if (options && ('animation' in options) && !options.animation)
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation
            
            Component.fn.init.call(that, element, options);

            options = that.options;

            element
                .delegate(CLICKABLEITEMS, CLICK, $.proxy(that._click, that))
                .delegate(HOVERABLEITEMS, MOUSEENTER + ' ' + MOUSELEAVE, that._toggleHover)
                .delegate(DISABLEDLINKS, CLICK, false);

            that.bind(events, that.options);

            that._updateClasses();

            if (that.options.contentUrls)
                element.find('.t-tabstrip-items > .t-item')
                    .each(function(index, item) {
                        $(item).find('>.t-link').data('ContentUrl', that.options.contentUrls[index]);
                    });

            var selectedItems = element.find('li.' + ACTIVESTATE),
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
                if (item.is('.' + DISABLEDSTATE + ',.' + ACTIVESTATE))
                    return;

                that.activateTab(item);
            });
        },

        enable: function (element) {
            $(element).addClass(DEFAULTSTATE)
                 .removeClass(DISABLEDSTATE);
        },

        disable: function (element) {
            var item = $(element);

            if (!item.hasClass("t-state-active"))
                item.removeClass(DEFAULTSTATE)
                     .removeClass(ACTIVESTATE)
                     .addClass(DISABLEDSTATE);
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

        _updateClasses: function() {
            var that = this;

            that.element.addClass('t-widget t-header t-tabstrip');

            that.tabGroup = that.element.children('ul').addClass('t-tabstrip-items t-reset');

            var items = that.tabGroup
                            .find('li')
                            .addClass('t-item'),
                activeItem = items.filter('.' + ACTIVESTATE).index(),
                activeTab = activeItem >= 0 ? activeItem : undefined,
                tabStripID = that.element.attr('id');

            that.contentElements = that.element.children('div');

            that.contentElements
                .addClass('t-content')
                .eq(activeTab)
                .addClass(ACTIVESTATE)
                .css({ display: 'block' });

            items
                .children('img')
                .addClass('t-image');
            items
                .children('a')
                .addClass('t-link')
                .children('img')
                .addClass('t-image');
            items
                .filter(':not([disabled]):not([class*=t-state-disabled])')
                .addClass(DEFAULTSTATE);
            items
                .filter('li[disabled]')
                .addClass(DISABLEDSTATE)
                .removeAttr('disabled');
            items
                .filter(':not([class*=t-state])')
                .children('a:focus')
                .parent()
                .addClass(ACTIVESTATE);

            items.each(function() {
                var item = $(this);

                if (!item.children('.t-link').length)
                    item
                        .contents()      // exclude groups, real links, templates and empty text nodes
                        .filter(function() { return (!(this.nodeName.toLowerCase() in { a: {}, div: {} }) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                        .wrapAll('<a class="t-link"/>');
            });

            items.each(function(idx) {
                var currentContent = that.contentElements.eq(idx),
                    id = tabStripID + '-' + (idx+1),
                    href = $(this).children('.t-link').attr('href');

                if (!currentContent.length)
                    $('<div id="'+ id +'" class="t-content"></div>').appendTo(that.element);
                else
                    if (!currentContent.attr('id'))
                        currentContent.attr('id', id);
            });

            that.contentElements = that.element.children('div'); // refresh the contents
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _click: function (e) {
            var that = this,
                item = $(e.currentTarget),
                link = item.find('.t-link'),
                href = link.attr('href'),
                content = $(that.getContentElement(item.index()));

            if (item.is('.' + DISABLEDSTATE + ',.' + ACTIVESTATE)) {
                e.preventDefault();
                return;
            }

            if (that.trigger('select', { item: item[0], contentElement: content[0] })) {
                e.preventDefault();
            } else {
                var isAnchor = link.data('ContentUrl') || (href && (href.charAt(href.length - 1) == '#' || href.indexOf('#' + that.element[0].id + '-') != -1));

                if (!href || isAnchor) {
                    e.preventDefault();
                } else {
                    return;
                }

                if (that.activateTab(item)) {
                    e.preventDefault();
                }
            }
        },

        activateTab: function (item) {
            var that = this,
                hasCloseAnimation = that.options.animation.close && 'effects' in that.options.animation.close,
                closeAnimation = hasCloseAnimation ?
                                       that.options.animation.close :
                                       extend( extend({ reverse: true }, that.options.animation.open), { show: false, hide: true }),
                openAnimation = that.options.animation.open,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter('.' + ACTIVESTATE),
                itemIndex = neighbours.index(item);

            // deactivate previously active tab
            if (kendo.size(openAnimation.effects)) {
                oldTab.kendoRemoveClass(ACTIVESTATE, { duration: closeAnimation.duration });
                item.kendoRemoveClass(HOVERSTATE, { duration: closeAnimation.duration });
            } else {
                oldTab.removeClass(ACTIVESTATE);
                item.removeClass(HOVERSTATE);
            }

            // handle content elements
            var contentElements = that.contentElements;

            if (contentElements.length == 0)
                return false;

            var visibleContentElements = contentElements.filter('.' + ACTIVESTATE);

            // find associated content element
            var content = $(that.getContentElement(itemIndex));

            if (content.length == 0) {
                visibleContentElements
                    .removeClass( ACTIVESTATE )
                    .kendoStop(true, true)
                    .kendoAnimate( closeAnimation );
                return false;
            }

            var isAjaxContent = (item.children('.t-link').data('ContentUrl') || false) && content.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeClass(TABONTOP);
                    item
                        .addClass(TABONTOP) // change these directly to bring the tab on top.
                        .css('z-index'); // nudgy nudgy...

                    if (kendo.size(openAnimation.effects)) {
                        oldTab.kendoAddClass(DEFAULTSTATE, { duration: openAnimation.duration });
                        item.kendoAddClass(ACTIVESTATE, { duration: openAnimation.duration });
                    } else {
                        oldTab.addClass(DEFAULTSTATE);
                        item.addClass(ACTIVESTATE);
                    }
                    content
                        .addClass(ACTIVESTATE)
                        .kendoStop(true, true)
                        .kendoAnimate( openAnimation );
                },
                showContent = function() {
                    if (!isAjaxContent)
                        showContentElement();
                    else
                        that.ajaxRequest(item, content, function () {
                            showContentElement();
                        });
                };

            visibleContentElements
                    .removeClass(ACTIVESTATE)
                    .css('height', visibleContentElements.height())
                    .css('height');

            if (visibleContentElements.length)
                visibleContentElements
                    .kendoStop(true, true)
                    .kendoAnimate(extend( {
                        complete: showContent
                   }, closeAnimation ));
            else
                showContent();

            return true;
        },

        getSelectedTabIndex: function () {
            return this.element.find('li.' + ACTIVESTATE).index();
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
                    if (that.trigger('error', { xhr: xhr, status: status }))
                        this.complete();
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
