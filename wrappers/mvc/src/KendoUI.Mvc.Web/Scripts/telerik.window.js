(function ($, undefined) {

    var $t = $.telerik;
    $t.scripts.push("telerik.window.js");

    function isLocalUrl(url) {
        return url && !(/^([a-z]+:)?\/\//i).test(url);
    }

    function fixIE6Sizing($element) {
        if ($.browser.msie && $.browser.version < 7) {
            $element
                .find('.t-resize-e,.t-resize-w').css('height', $element.height()).end()
                .find('.t-resize-n,.t-resize-s').css('width', $element.width()).end()
                .find('.t-overlay').css({ width: $element.width(), height: $element.height() });
        }
    }

    // zoom animation

    $t.fx.zoom = function (element) {
        this.element = element;
    };

    $t.fx.zoom.prototype = {
        play: function (options, end) {
            var $element = this.element.show();

            var resizeElement = $element.find('> .t-window-content');

            var endValues = {
                width: resizeElement.width(),
                height: resizeElement.height(),
                left: parseInt($element.css('left')) || 0,
                top: parseInt($element.css('top')) || 0
            };

            $element
                .css({
                    left: endValues.left + 20,
                    top: endValues.top + 20
                })
                .animate({
                    left: endValues.left,
                    top: endValues.top
                }, options.openDuration);

            resizeElement
                .css({
                    width: endValues.width - 40,
                    height: endValues.height - 40
                })
                .animate({
                    width: endValues.width,
                    height: endValues.height
                }, options.openDuration, function () {
                    if (end) end();
                });
        },

        rewind: function (options, end) {
            var $element = this.element;

            var resizeElement = $element.find('> .t-window-content');
            var endValues = {
                width: resizeElement.width(),
                height: resizeElement.height(),
                left: parseInt($element.css('left')),
                top: parseInt($element.css('top'))
            };

            resizeElement.animate({
                width: endValues.width - 40,
                height: endValues.height - 40
            }, options.closeDuration);

            $element.animate({
                left: endValues.left + 20,
                top: endValues.top + 20
            }, options.closeDuration, function () {
                $element.css({
                    left: endValues.left,
                    top: endValues.top
                }).hide();

                setTimeout(function () {
                    resizeElement.css({
                        width: endValues.width,
                        height: endValues.height
                    });
                }, 0);

                if (end) end();
            });
        }
    };

    $t.fx.zoom.defaults = function () {
        return { list: [{ name: 'zoom'}], openDuration: 'fast', closeDuration: 'fast' };
    };

    $t.window = function (element, options) {
        this.element = element;
        var $element = $(element),
            normalized = $.extend({}, options);

        delete normalized.title;
        delete normalized.content;

        $.extend(this, normalized);

        if (!$element.is('.t-window')) {
            $element.addClass('t-widget t-window');
            $t.window.create(element, options);
        }

        if (!$element.is('body')) {
            var offset;

            if ($element.is(':visible')) {
                offset = $element.offset();
                $element.css({ top: offset.top, left: offset.left });
            } else {
                $element.css({ visibility: 'hidden', display: '' });
                offset = $element.offset();
                $element.css({ top: offset.top, left: offset.left })
                        .css({ visibility: 'visible', display: 'none' });
            }

            // Collect the src attributes of all iframes and then set them to empty string.
            // This seems to fix this IE9 "feature": http://msdn.microsoft.com/en-us/library/gg622929%28v=VS.85%29.aspx?ppud=4
            var iframeSrcAttributes = $element.find("iframe").map(function(iframe) {
                var src = this.getAttribute("src");
                this.src = "";
                return src;
            });
            
            // Make sure the wrapper is appended to the body only once. IE9+ will throw exceptions if you move iframes in DOM
            $element
                .toggleClass('t-rtl', $element.closest('.t-rtl').length > 0)
                .appendTo(document.body)
                .find("iframe").each(function(index) {
                   // Restore the src attribute of the iframes when they are part of the live DOM tree
                   this.src = iframeSrcAttributes[index];
                });
        }

        this.bringToTop();
        $element.find(".t-window-titlebar").andSelf().bind("mousedown", $.proxy(this.bringToTop, this));

        if (this.modal && $element.is(':visible')) {
            this.overlay(true).css({ opacity: 0.5, zIndex: parseInt($element.css('zIndex'), 10) - 1 });
        }

        var windowActions = '.t-window-titlebar .t-link';

        $element
            .delegate(windowActions, 'mouseenter', $t.hover)
            .delegate(windowActions, 'mouseleave', $t.leave)
            .delegate(windowActions, 'click', $.proxy(this.windowActionHandler, this));
        
        if (this.resizable) {
            $element
                .delegate('.t-window-titlebar', 'dblclick', $.proxy(this.toggleMaximization, this))
                .append($t.window.getResizeHandlesHtml());

            fixIE6Sizing($element);

            (function(wnd) {
                
                function start(e) {
                    var $element = $(wnd.element);

                    wnd.initialCursorPosition = $element.offset();

                    wnd.resizeDirection = /t-resize-([nesw]+)/gi.exec(e.$draggable[0].className)[1];

                    wnd.resizeElement = $element.find('> .t-window-content');

                    wnd.initialSize = {
                        width: wnd.resizeElement.width(),
                        height: wnd.resizeElement.height()
                    };

                    wnd.outlineSize = {
                        left: wnd.resizeElement.outerWidth() - wnd.resizeElement.width()
                            + $element.outerWidth() - $element.width(),
                        top: wnd.resizeElement.outerHeight() - wnd.resizeElement.height()
                            + $element.outerHeight() - $element.height()
                            + $element.find('> .t-window-titlebar').outerHeight()
                    };

                    $('<div class="t-overlay" />').appendTo(wnd.element);

                    $element.find('.t-resize-handle').not(e.$draggable).hide();

                    $(document.body).css('cursor', e.$draggable.css('cursor'));
                }

                function drag(e) {
                    var $element = $(wnd.element);

                    var resizeHandlers = {
                        'e': function () {
                            var location = $t.touchLocation(e),
                                width = location.x - wnd.initialCursorPosition.left - wnd.outlineSize.left;
                            wnd.resizeElement.width((width < wnd.minWidth
                                                        ? wnd.minWidth
                                                        : (wnd.maxWidth && width > wnd.maxWidth)
                                                        ? wnd.maxWidth
                                                        : width));
                        },
                        's': function () {
                            var location = $t.touchLocation(e),
                                height = location.y - wnd.initialCursorPosition.top - wnd.outlineSize.top;
                            wnd.resizeElement
                                    .height((height < wnd.minHeight ? wnd.minHeight
                                            : (wnd.maxHeight && height > wnd.maxHeight) ? wnd.maxHeight
                                            : height));
                        },
                        'w': function () {
                            var location = $t.touchLocation(e),
                                windowRight = wnd.initialCursorPosition.left + wnd.initialSize.width;

                            $element.css('left', location.x > (windowRight - wnd.minWidth) ? windowRight - wnd.minWidth
                                                : location.x < (windowRight - wnd.maxWidth) ? windowRight - wnd.maxWidth
                                                : location.x);

                            var width = windowRight - location.x;
                            wnd.resizeElement.width((width < wnd.minWidth ? wnd.minWidth
                                                    : (wnd.maxWidth && width > wnd.maxWidth) ? wnd.maxWidth
                                                    : width));

                        },
                        'n': function () {
                            var location = $t.touchLocation(e),
                                windowBottom = wnd.initialCursorPosition.top + wnd.initialSize.height;

                            $element.css('top', location.y > (windowBottom - wnd.minHeight) ? windowBottom - wnd.minHeight
                                                : location.y < (windowBottom - wnd.maxHeight) ? windowBottom - wnd.maxHeight
                                                : location.y);

                            var height = windowBottom - location.y;
                            wnd.resizeElement
                                    .height((height < wnd.minHeight ? wnd.minHeight
                                            : (wnd.maxHeight && height > wnd.maxHeight) ? wnd.maxHeight
                                            : height));
                        }
                    };

                    $.each(wnd.resizeDirection.split(""), function () {
                        resizeHandlers[this]();
                    });

                    fixIE6Sizing($element);

                    if ($.browser.msie && parseInt($.browser.version) >= 9) {
                        $element[0].style.cssText = $element[0].style.cssText;
                    }

                    $t.trigger(wnd.element, 'resize');
                }

                function stop(e) {
                    var $element = $(wnd.element);
                    $element
                        .find('.t-overlay').remove().end()
                        .find('.t-resize-handle').not(e.$draggable).show();
                    
                    $(document.body).css('cursor', '');

                    if (e.keyCode == 27) {
                        fixIE6Sizing($element);
                        $element.css(wnd.initialCursorPosition);
                        wnd.resizeElement.css(wnd.initialSize);
                    }
                    
                    return false;
                }

                new $t.draggable({
                    owner: wnd.element,
                    selector: '.t-resize-handle',
                    scope: wnd.element.id + '-resizing',
                    distance: 0,
                    start: start,
                    drag: drag,
                    stop: stop
                });
            })(this);
        }

        if (this.draggable) {
            (function(wnd){
                function start(e) {
                    var $element = $(wnd.element),
                        location = $t.touchLocation(e);

                    wnd.initialWindowPosition = $element.position();
    
                    $t.trigger(element, 'dragStart');

                    wnd.startPosition = {
                        left: location.x - wnd.initialWindowPosition.left,
                        top: location.y - wnd.initialWindowPosition.top
                    };

                    var actionsElement = $element.find(".t-window-actions");
                    if (actionsElement.length > 0) {
                        if (wnd.isRtl == undefined) {
                            wnd.isRtl = $(wnd.element).closest('.t-rtl').length > 0;
                        }
                        wnd.minLeftPosition = actionsElement.outerWidth() + parseInt(actionsElement.css(wnd.isRtl ? "left" : "right"), 10) - $element.outerWidth();
                    } else {
                        wnd.minLeftPosition =  20 - $element.outerWidth(); // at least 20px remain visible
                    }

                    $('.t-resize-handle', wnd.element).hide();

                    $('<div class="t-overlay" />').appendTo(wnd.element);

                    $(document.body).css('cursor', e.$draggable.css('cursor'));
                }
                
                function drag(e) {
                    var location = $t.touchLocation(e),
                        coordinates = {
                        left: Math.max(location.x - wnd.startPosition.left, wnd.minLeftPosition),
                        top: Math.max(location.y - wnd.startPosition.top, 0)
                    };
                    $(wnd.element).css(coordinates);
                }

                function stop(e) {
                    $(wnd.element).find('.t-resize-handle')
                                  .show()
                                  .end()
                                  .find('.t-overlay')
                                  .remove();

                    $(document.body).css('cursor', '');

                    if (e.keyCode == 27)
                        e.$draggable.closest('.t-window').css(wnd.initialWindowPosition);

                    $t.trigger(element, 'dragEnd');

                    return false;
                }

                new $t.draggable({
                    owner: wnd.element,
                    selector: '.t-window-titlebar',
                    scope: wnd.element.id + '-moving',
                    start: start,
                    drag: drag,
                    stop: stop
                })
            })(this);
        }

        $t.bind(this, {
            open: this.onOpen,
            activated: this.onActivate,
            close: this.onClose,
            refresh: this.onRefresh,
            resize: this.onResize,
            error: this.onError,
            load: this.onLoad,
            dragStart: this.onDragStart,
            dragEnd: this.onDragEnd
        });

        $(window).resize($.proxy(this.onDocumentResize, this));

        if (isLocalUrl(this.contentUrl)) {
            this.ajaxRequest();
        }
    };

    $t.window.prototype = {
        overlay: function (visible) {
            var overlay = $('body > .t-overlay'),
                element = this.element;

            if (overlay.length == 0) {
                overlay = $('<div class="t-overlay" />')
                    .toggle(visible)
                    .insertBefore(element);
            } else {
                overlay.insertBefore(element).toggle(visible);
            }

            this.positionOverlay(overlay);

            return overlay;
        },

        positionOverlay: function(overlay) {
            var $doc = $(document);
            if ($.browser.msie && $.browser.version < 7) {
                overlay.css({
                    width: $doc.width() - 21,
                    height: $doc.height(),
                    position: 'absolute'
                });
            } else if ((/ipad/gi).test(navigator.appVersion)) {
                overlay.css({
                    width: $doc.width(),
                    height: $doc.height(),
                    position: 'absolute'
                });
            }
        },

        overlayOnClose: function(isDestroying) {
            var currentWindow = this;
            var openedModalWindows = $('.t-window').filter(function() {
                    var window = $(this);
                    return this !== currentWindow.element && window.is(':visible') && window.data('tWindow').modal;
                });
                        
            var shouldHideOverlay = currentWindow.modal && openedModalWindows.length == 0;

            var overlay = currentWindow.modal ? currentWindow.overlay(true) : $(undefined);

            if (shouldHideOverlay) {
                if (currentWindow.effects.list.length > 0 && currentWindow.effects.list[0].name != 'toggle') {
                    overlay.fadeOut(currentWindow.effects.closeDuration, function() {
                        if (isDestroying) {
                           overlay.remove(); 
                        }
                    });
                } else if (isDestroying) {
                    overlay.remove(); 
                } else {
                    overlay.hide();
                }
            } else if (openedModalWindows.length > 0) {
                var overlayZIndex = parseInt($('.t-overlay').css('zIndex'), 10);
                var maxZIndex = 0;
                var otherWindowOnTop;
                openedModalWindows.each(function(index, element) {
                    var newZIndex = parseInt($(element).css('zIndex'), 10);
                    if (newZIndex >= maxZIndex) {
                        maxZIndex = newZIndex;
                        otherWindowOnTop = $(element);
                    }
                });
                var otherWindow = otherWindowOnTop.data("tWindow");
                otherWindow.overlay(true).css('zIndex', maxZIndex - 1);
            }
        },

        windowActionHandler: function (e) {
            var $target = $(e.target).closest('.t-link').find('.t-icon'),
                contextWindow = this;

            $.each({
                't-close': this.close,
                't-maximize': this.maximize,
                't-restore': this.restore,
                't-refresh': this.refresh
            }, function (commandName, handler) {
                if ($target.hasClass(commandName)) {
                    e.preventDefault();
                    handler.call(contextWindow);
                    return false;
                }
            });
        },

        center: function () {                       
            var $element = $(this.element),
                documentWindow = $(window);

            $element.css({
                left: documentWindow.scrollLeft() + Math.max(0, (documentWindow.width() - $element.width()) / 2),
                top: documentWindow.scrollTop() + Math.max(0, (documentWindow.height() - $element.height()) / 2)
            });

            return this;
        },

        title: function (text) {
            var $title = $('.t-window-titlebar > .t-window-title', this.element);

            if (!text)
                return $title.text();

            $title.text(text);
            return this;
        },

        content: function (html) {
            var $content = $('> .t-window-content', this.element);

            if (!html)
                return $content.html();

            $content.html(html);
            return this;
        },

        bringToTop: function () {
            var zIndex = 0,
                that = this,
                element = that.element,
                allWindows = $(".t-window");

            if (allWindows.filter(":visible").length == 1 && $(element).is(":visible")) {
                return;
            }

            allWindows.each(function() {
                var wnd = $(this);
                var zIndexNew = wnd.css('zIndex');
                if (!isNaN(zIndexNew)) {
                    zIndex = Math.max(parseInt(zIndexNew, 10), zIndex);
                }

                if (this != element && wnd.find(".t-window-content > iframe").length > 0) {
                    wnd.find(".t-window-content").append("<div class='t-overlay' />");
                }
            });

            $(element)
                .css("zIndex", zIndex + 2)
                .find(".t-window-content > .t-overlay").remove();

            return that;
        },

        open: function (e) {
            var $element = $(this.element);

            this.bringToTop();

            if (!$t.trigger(this.element, 'open')) {
                if (this.modal) {
                    var overlay = this.overlay(false).css("zIndex", parseInt($element.css('zIndex'), 10) - 1);

                    if (this.effects.list.length > 0 && this.effects.list[0].name != 'toggle') {
                        overlay.css('opacity', 0).show().animate({ opacity: 0.5 }, this.effects.openDuration);
                    } else {
                        overlay.css('opacity', 0.5).show();
                    }
                }
                
                if (!$element.is(':visible')) {
                    $t.fx.play(this.effects, $element, {}, function() {
                        $t.trigger($element[0], 'activated');
                    });
                }
            }

           if (this.isMaximized) {
               $('html, body').css('overflow', 'hidden');
            }

            return this;
        },

        close: function () {
            var $element = $(this.element);

            if ($element.is(':visible')) {
                if (!$t.trigger(this.element, 'close')) {
                    this.overlayOnClose();
                    $t.fx.rewind(this.effects, $element, null, function () {
                        $element.hide();
                    });
                }
            }

            if (this.isMaximized) {
                $('html, body').css('overflow', '');
            }

            return this;
        },

        toggleMaximization: function (e) {
            if (e && $(e.target).closest('.t-link').length > 0) {
                return;
            }

            this[this.isMaximized ? 'restore' : 'maximize']();
        },

        restore: function () {
            if (!this.isMaximized) {
                return;
            }

            $(this.element)
                .css({
                    position: 'absolute',
                    left: this.restorationSettings.left,
                    top: this.restorationSettings.top
                })
                .find('> .t-window-content')
                    .css({
                        width: this.restorationSettings.width,
                        height: this.restorationSettings.height
                    }).end()
                .find('.t-resize-handle').show().end()
                .find('.t-window-titlebar .t-restore').addClass('t-maximize').removeClass('t-restore');

            $('html, body').css('overflow', '');

            this.isMaximized = false;

            $t.trigger(this.element, 'resize');

            return this;
        },

        maximize: function (e) {
            if (this.isMaximized) {
                return;
            }

            var $element = $(this.element),
                resizeElement = $element.find('> .t-window-content');

            this.restorationSettings = {
                left: $element.position().left,
                top: $element.position().top,
                width: resizeElement.width(),
                height: resizeElement.height()
            };

            $element
                .css({ left: 0, top: 0, position: 'fixed' })
                .find('.t-resize-handle').hide().end()
                .find('.t-window-titlebar .t-maximize').addClass('t-restore').removeClass('t-maximize');

            $('html, body').css('overflow', 'hidden');

            this.isMaximized = true;

            this.onDocumentResize();

            return this;
        },

        onDocumentResize: function () {
            if (!this.isMaximized) {
                return;
            }

            var $element = $(this.element),
                resizeElement = $element.find('> .t-window-content');

            resizeElement
                .css({
                    width: $(window).width()
                        - (resizeElement.outerWidth() - resizeElement.width()
                        + $element.outerWidth() - $element.width()),
                    height: $(window).height()
                        - (resizeElement.outerHeight() - resizeElement.height()
                        + $element.outerHeight() - $element.height()
                        + $element.find('> .t-window-titlebar').outerHeight())
                });

            fixIE6Sizing($element);

            $t.trigger($element, 'resize');
        },

        refresh: function () {
            if (isLocalUrl(this.contentUrl)) {
                this.ajaxRequest();
            } else {
                var iframe = $(this.element).find('> .t-window-content > iframe')[0];
                if (iframe) {
                    iframe.src = iframe.src;
                }
            }

            return this;
        },

        ajaxRequest: function (url, data) {
            var loadingIconTimeout = setTimeout(function () {
                $('.t-refresh', this.element).addClass('t-loading');
            }, 100);

            $.ajax({
                type: 'GET',
                url: url || this.contentUrl,
                dataType: 'html',
                data: data || {},
                cache: false,
                error: $.proxy(function (xhr, status) {
                    if ($t.ajaxError(this.element, 'error', xhr, status))
                        return;
                }, this),

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    $('.t-refresh', this.element).removeClass('t-loading');
                },
                success: $.proxy(function (data, textStatus) {
                    $('.t-window-content', this.element).html(data);

                    $t.trigger(this.element, 'refresh');
                }, this)
            });
        },

        destroy: function () {
            $(this.element).remove();
            this.overlayOnClose(true);
        }
    };

    // client-side rendering
    $.extend($t.window, {
        create: function () {
            var element, options, contentUrl;

            if ($.isPlainObject(arguments[0])) {
                options = arguments[0];
            } else {
                element = arguments[0];
                options = $.extend({
                    html: element.innerHTML
                }, arguments[1]);
            }

            options = $.extend({
                title: '',
                html: '',
                actions: ['Close'],
                visible: true
            }, options);

            contentUrl = options.contentUrl;

            var windowHtml = new $t.stringBuilder()
                .catIf('<div class="t-widget t-window">', !element)
                    .cat('<div class="t-window-titlebar t-header">')
                        .cat('&nbsp;<span class="t-window-title">').cat(options.title).cat('</span>')
                        .cat('<div class="t-window-actions t-header">');

            $.map(options.actions, function (command) {
                windowHtml.cat('<a href="#" class="t-link">')
                        .cat('<span class="t-icon t-').cat(command.toLowerCase()).cat('">')
                            .cat(command)
                        .cat('</span></a>');
            });

            windowHtml.cat('</div></div>')
                .cat('<div class="t-window-content t-content" style="');

            if (options.width) {
                windowHtml.cat('width:').cat(options.width).cat('px;');
            }

            if (options.height) {
                windowHtml.cat('height:').cat(options.height).cat('px;');
            }

            if (typeof (options.scrollable) != typeof(undefined) && options.scrollable === false) {
                windowHtml.cat('overflow:hidden;');
            }

            windowHtml.cat('">')
                    .catIf(options.html, !contentUrl || (contentUrl && isLocalUrl(contentUrl)))
                    .catIf('<iframe src="', contentUrl,
                            '" title="', options.title,
                            '" frameborder="0" style="border:0;width:100%;height:100%;">This page requires frames in order to show content</iframe>',
                        contentUrl && !isLocalUrl(contentUrl))
                    .cat('</div>')
                .catIf('</div>', !element);

            if (element) {
                $(element).css("display", options.visible ? "" : "none").html(windowHtml.string());
            } else {
                delete options.title;
                return $(windowHtml.string()).css("display", options.visible ? "" : "none").appendTo(document.body).eq(0).tWindow(options);
            }
        },

        getResizeHandlesHtml: function () {
            var html = new $t.stringBuilder();

            $.each('n e s w se sw ne nw'.split(' '), function (i, item) {
                html.cat('<div class="t-resize-handle t-resize-').cat(item).catIf(" t-icon", item == "se").cat('"></div>');
            });

            return html.string();
        }
    });

    // jQuery extender
    $.fn.tWindow = function (options) {
        return $t.create(this, {
            name: 'tWindow',
            init: function (element, options) {
                return new $t.window(element, options);
            },
            success: function(component) {
                var element = component.element,
                    $element = $(element);

                if ($element.is(':visible')) {
                    $t.trigger(element, 'open');
                    $t.trigger(element, 'activated');
                }
            },
            options: options
        });
    };

    // default options
    $.fn.tWindow.defaults = {
        effects: { list: [{ name: 'zoom' }, { name: 'property', properties: ['opacity']}], openDuration: 'fast', closeDuration: 'fast' },
        modal: false,
        resizable: true,
        draggable: true,
        minWidth: 50,
        minHeight: 50
    };
})(jQuery);
