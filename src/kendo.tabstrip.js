import "./kendo.data.js";
import "./kendo.icons.js";
import "./kendo.html.button.js";
import "./kendo.sortable.js";

export const __meta__ = {
    id: "tabstrip",
    name: "TabStrip",
    category: "web",
    description: "The TabStrip widget displays a collection of tabs with associated tab content.",
    depends: [ "data", "icons", "html.button", "sortable" ],
    features: [ {
        id: "tabstrip-fx",
        name: "Animation",
        description: "Support for animation",
        depends: [ "fx" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        map = $.map,
        each = $.each,
        trim = kendo.trim,
        extend = $.extend,
        isFunction = kendo.isFunction,
        template = kendo.template,
        outerWidth = kendo._outerWidth,
        outerHeight = kendo._outerHeight,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(a|div)$/i,
        excludedNodesRegExp_DOM_DS = /^(a|div|button)$/i,
        NS = ".kendoTabStrip",
        IMG = "img",
        HREF = "href",
        PREV = "prev",
        NEXT = "next",
        SHOW = "show",
        LINK = "k-link",
        LINK_TEXT = "k-link-text",
        LAST = "k-last",
        CLICK = "click",
        ERROR = "error",
        EMPTY = ":empty",
        IMAGE = "k-image",
        FIRST = "k-first",
        SELECT = "select",
        ACTIVATE = "activate",
        CONTENT = "k-tabstrip-content",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        DISABLEDSTATE = "k-disabled",
        ACTIVESTATE = "k-active",
        FOCUSEDSTATE = "k-focus",
        HOVERSTATE = "k-hover",
        DOM_DATASOURCE_EMPTY = "EMPTY_URL",
        NAVIGATABLEITEMS = ".k-item.k-tabstrip-item:not(." + DISABLEDSTATE + ")",
        KEYBOARDNAVIGATABLEITEMS = ".k-item.k-tabstrip-item",
        HOVERABLEITEMS = ".k-tabstrip-items > " + NAVIGATABLEITEMS + ":not(." + ACTIVESTATE + ")",
        DEFAULTDISTANCE = 200,
        ARIA_HIDDEN = "aria-hidden",
        ARIA_CONTROLS = "aria-controls",
        ARIA_DISABLED = "aria-disabled",
        ARIA_SELECTED = "aria-selected",
        ARIA_ORIENTATION = "aria-orientation",
        ARIA_LABELLEDBY = "aria-labelledby",

        templates = {
            content: (data) =>
                `<div class='k-tabstrip-content' ${data.contentAttributes(data)} tabindex='0'>${data.content(data.item)}</div>`,
            textWrapper: ({ tag, item , contentUrl, textAttributes, image, sprite, text }) =>
                `<${tag(item)} class='${LINK}' ${contentUrl(item)} ${textAttributes(item)}>` + `${image(item)}${sprite(item)}` +
                    ((item.icon || item.iconClass) && item.iconPosition === 'before' ? kendo.ui.icon({ icon: item.icon || "none", iconClass: item.iconClass }) : '') +
                        `<span class='${LINK_TEXT}'>${text(item)}</span>` +
                    ((item.icon || item.iconClass) && item.iconPosition === 'after' ? kendo.ui.icon({ icon: item.icon || "none", iconClass: item.iconClass }) : '') +
                `</${tag(item)}>`,
            item: (data) => templates.itemWrapper(data,`${data.textWrapper(data)}`),
            itemWrapper: (data, item) =>
                `<li class='${data.wrapperCssClass(data.group, data.item)}' ${data.itemAttributes(data.item)} role='tab' ${data.item.active ? "aria-selected='true'" : ''}>` +
                    item +
                "</li>",
            image: ({ imageUrl }) => `<img class='k-image' alt='' src='${imageUrl}' />`,
            sprite: ({ spriteCssClass }) => `<span class='k-sprite ${spriteCssClass}'></span>`,
            empty: () => "",
            itemActionsWrapperTemplate: () => `<span class="k-item-actions"></span>`,
            itemActionTemplate: ({ element, icon, iconClass, attributes }) => {
                let resolvedAttributes = attributes ? (attributes.toJSON ? attributes.toJSON() : attributes) : {};
                return kendo.html.renderButton(element || $("<button unselectable='on'></button>").attr(resolvedAttributes), { icon, iconClass, themeColor: "base", fillMode: "flat" });
            },
        },

        rendering = {
            wrapperCssClass: function(group, item) {
                var result = ["k-item", "k-tabstrip-item"],
                    index = item.index;

                const classAttributes = (item.attributes && item.attributes.class) || "";

                if (item.enabled === false) {
                    result.push("k-disabled");
                }

                if (index === 0) {
                    result.push("k-first");
                }

                if (index == group.length - 1) {
                    result.push("k-last");
                }

                classAttributes.split(" ").forEach(function(className) {
                    if (className && !result.includes(className)) {
                        result.push(className);
                    }
                });

                return result.join(" ");
            },
            itemAttributes: function(item) {
                const attributes = item.attributes || {};
                return Object.entries(attributes)
                    .map(([key, value]) => {
                        if (key === "class" || key === "role" || key === "aria-selected") {
                            return "";
                        }
                        return `${kendo.attr(key)}='${kendo.sanitizeAttribute(value)}'`;
                    })
                    .join(" ");
            },
            textAttributes: function(item) {
                return item.url ? " href='" + kendo.sanitizeLink(item.url) + "'" : "";
            },
            text: function(item) {
                return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
            },
            tag: function(item) {
                return item.url ? "a" : "span";
            },
            contentAttributes: function(content) {
                return content.active !== true ? ` ${kendo.attr("style-display")}="none" aria-hidden='true'` : "";
            },
            content: function(item) {
                return item.content ? item.content : item.contentUrl ? "" : "&nbsp;";
            },
            contentUrl: function(item) {
                return item.contentUrl ? kendo.attr("content-url") + '="' + item.contentUrl + '"' : "";
            }
        };

    function updateTabClasses(tabs, options) {
        tabs.children(IMG)
            .addClass(IMAGE);

        tabs.children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);

        tabs.filter("li[disabled]")
            .addClass(DISABLEDSTATE)
            .attr(ARIA_DISABLED, "true")
            .prop("disabled", false);

        tabs.filter(":not([class*=k-state])")
            .children("a")
            .filter(":focus")
            .parent()
            .addClass(ACTIVESTATE);

        tabs.attr("role", "tab");

        tabs.each(function() {
            var item = $(this);
            item.attr(ARIA_SELECTED, item.is("." + ACTIVESTATE));

            const regex = options._enableDOMDataSource ? excludedNodesRegExp_DOM_DS : excludedNodesRegExp;
            if (!item.children("." + LINK).length) {
                item
                    .contents() // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(regex) && !(this.nodeType == 3 && !trim(this.nodeValue))); })
                    .wrapAll("<span UNSELECTABLE='on' class='" + LINK + "'/>")
                    .wrapAll("<span UNSELECTABLE='on' class='" + LINK_TEXT + "'/>");
            }
        });

    }

    function updateFirstLast(tabGroup) {
        const tabs = tabGroup.children(".k-item.k-tabstrip-item");

        tabs.filter(".k-first:not(:first-child)").removeClass(FIRST);
        tabs.filter(".k-last:not(:last-child)").removeClass(LAST);
        tabs.filter(":first-child").addClass(FIRST);
        if (tabs.length > 1) {
            tabs.filter(":last-child").addClass(LAST);
        }
    }

    function scrollButtonHtml(buttonClass, iconClass) {
        return `<span aria-hidden='true' class='k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-tabstrip-${buttonClass}' unselectable='on'>${kendo.ui.icon({ icon: iconClass, iconClass: "k-button-icon" })}</span>`;
    }

    function ajaxXhr() {
        return $.ajaxSettings.xhr();
    }

    var TabStrip = Widget.extend({
        init: function(element, options) {
            var that = this, value;

            Widget.fn.init.call(that, element, options);

            that._animations(that.options);

            options = that.options;

            if (kendo.isPresent(TabStrip._enableDOMDataSource)) {
                options._enableDOMDataSource = TabStrip._enableDOMDataSource;
            }

            that._contentUrls = options.contentUrls || [];

            that._wrapper();
            that._isRtl = kendo.support.isRtl(that.wrapper);

            that._updateClasses();
            that._dataSource();

            that._tabindex(that.tabGroup);
            that.tabGroup.attr("role", "tablist");

            if (options.dataSource || options._enableDOMDataSource) {
                that.dataSource.fetch();
            }

            that._removeAdditionalWrapperClasses();

            that._tabSizes();
            that._tabPosition();
            that._scrollable();
            that._tabAlignment();
            that._sortable();
            that._processContentUrls();
            that._attachEvents();

            if (that.options.value) {
                value = that.options.value;
            }

            that._initialActivate();
            that.value(value);
            kendo.notify(that);


            if (options._enableDOMDataSource && options.contentUrls) {
                that._contentUrls = options.contentUrls.map(function(url) {
                    return url || DOM_DATASOURCE_EMPTY;
                });

                that._updateContentElements(options._enableDOMDataSource);
            }

            if (that._showWatermarkOverlay) {
                that._showWatermarkOverlay(that.element[0]);
            }
        },

        events: [
            SELECT,
            ACTIVATE,
            SHOW,
            ERROR,
            CONTENTLOAD,
            "change",
            "dataBinding",
            "dataBound"
        ],

        options: {
            name: "TabStrip",
            dataEncodedField: "",
            dataTextField: "",
            dataContentField: "",
            dataImageUrlField: "",
            dataUrlField: "",
            dataSpriteCssClass: "",
            dataContentUrlField: "",
            dataIconField: "icon",
            dataIconPositionField: "iconPosition",
            tabPosition: "top",
            tabAlignment: "start",
            size: "medium",
            tabTemplate: null,
            animation: {
                open: {
                    effects: "expand:vertical fadeIn",
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200
                }
            },
            closable: false,
            collapsible: false,
            navigatable: true,
            contentUrls: false,
            applyMinHeight: true,
            scrollable: {
                distance: DEFAULTDISTANCE,
                scrollButtonsPosition: "split",
                scrollButtons: "auto",
            },
            sortable: false,
            _enableDOMDataSource: false,
        },

        setDataSource: function(dataSource) {
            var that = this;

            that.options.dataSource = dataSource;
            that._dataSource();
            that.dataSource.fetch();
        },

        setOptions: function(options) {
            var that = this,
                animation = that.options.animation;

            that._animations(options);

            if (options.contentUrls) {
                that._contentUrls = options.contentUrls;
            }

            options.animation = extend(true, animation, options.animation);

            if (options.navigatable) {
                that.tabGroup.on("keydown" + NS, that._keyDownProxy);
            } else {
                that.tabGroup.off("keydown" + NS, that._keyDownProxy);
            }

            Widget.fn.setOptions.call(that, options);
        },

        activateTab: function(item) {
            if (this.tabGroup.children("[data-animating]").length) { return; }

            item = this.tabGroup.find(item);

            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter("." + ACTIVESTATE),
                itemIndex = neighbours.index(item),
                isAnimationEnabled = animation && "duration" in animation && "effects" in animation;

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { hide: true });
            // deactivate previously active tab
            if (kendo.size(animation.effects)) {
                oldTab.kendoRemoveClass(ACTIVESTATE, { duration: close.duration });
                item.kendoRemoveClass(HOVERSTATE, { duration: close.duration });
            } else {
                oldTab.removeClass(ACTIVESTATE);
                item.removeClass(HOVERSTATE);
            }

            // handle content elements
            var contentAnimators = that.contentAnimators;

            if (that.inRequest) {
                that.xhr.abort();
                that.inRequest = false;
            }

            if (contentAnimators.length === 0) {
                that.tabGroup.find("." + ACTIVESTATE);

                item.addClass(ACTIVESTATE);
                that._current(item, true);

                that.trigger("change");

                if (that._scrollableModeActive) {
                    that._scrollTabsToItem(item);
                }

                return false;
            }

            var visibleContents = contentAnimators.filter("." + ACTIVESTATE),
                contentHolder = that.contentHolder(itemIndex),
                contentElement = contentHolder.closest(".k-tabstrip-content");

            that.tabsHeight = outerHeight(that.tabGroup) +
                              parseInt(that.wrapper.css("border-top-width"), 10) +
                              parseInt(that.wrapper.css("border-bottom-width"), 10);

            if (contentHolder.length === 0) {
                visibleContents
                    .removeClass( ACTIVESTATE )
                    .attr(ARIA_HIDDEN, true)
                    .kendoStop(true, true)
                    .kendoAnimate( close );
                return false;
            }

            item.attr("data-animating", true);

            var isAjaxContent = (item.children("." + LINK).data(CONTENTURL) || that._contentUrls[itemIndex] || false) && contentHolder.is(EMPTY),
                showContentElement = function() {
                    oldTab.attr(ARIA_SELECTED, false);
                    item.attr(ARIA_SELECTED, true);
                    that.tabGroup.attr("aria-activedescendant", item.attr("id"));

                    that._current(item, true);

                    contentElement
                        .addClass(ACTIVESTATE)
                        .removeAttr(ARIA_HIDDEN)
                        .kendoStop(true, true)
                        .kendoAnimate( extend({ init: function() {
                            that.trigger(SHOW, { item: item[0], contentElement: contentHolder[0] });
                            kendo.resize(contentHolder);
                        } }, animation, {
                            complete: function() {
                                // See https://github.com/telerik/kendo-ui-core/issues/6660
                                that.element.css('min-height', oldMinHeight);
                                item.removeAttr("data-animating");

                                that.trigger(ACTIVATE, { item: item[0], contentElement: contentHolder[0] });
                                kendo.resize(contentHolder);
                            }
                        } ) );
                },
                showContent = function() {
                    if (!isAjaxContent) {
                        showContentElement();
                        that.trigger("change");
                    } else {
                        item.removeAttr("data-animating");
                        that.ajaxRequest(item, contentHolder, function() {
                            item.attr("data-animating", true);
                            showContentElement();
                            that.trigger("change");
                        });
                    }

                    if (that._scrollableModeActive) {
                        that._scrollTabsToItem(item);
                    }

                };

            // See https://github.com/telerik/kendo-ui-core/issues/6660
            var oldMinHeight = that.element.css('min-height');

            if (that.options.applyMinHeight) {
                that.element.css('min-height', that.element.outerHeight());
            }

            visibleContents.removeClass(ACTIVESTATE);
            that.tabGroup.find("." + ACTIVESTATE);

            if (kendo.size(animation.effects)) {
                item.kendoAddClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                item.addClass(ACTIVESTATE);
            }

            visibleContents.attr(ARIA_HIDDEN, true);

            if (visibleContents.length) {
                visibleContents
                    .kendoStop(true, true)
                    .kendoAnimate(extend( {
                        complete: showContent
                   }, close ));
            } else {
                showContent();
            }

            return true;
        },

        ajaxRequest: function(element, content, complete, url) {
            element = this.tabGroup.find(element);

            var that = this,
                link = element.find("." + LINK),
                data = {};

            url = url || link.data(CONTENTURL) || that._contentUrls[element.index()] || link.attr(HREF);
            that.inRequest = true;

            var ajaxOptions = {
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                data: data,
                xhr: ajaxXhr,

                error: function(xhr, status) {
                    if (that.trigger("error", { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                complete: function(xhr) {
                    that.inRequest = false;
                },

                success: function(data) {
                    try {
                        kendo.destroy(content);
                        content.html(data);
                    } catch (e) {
                        this.error(this.xhr, "error");
                    }

                    if (complete) {
                        complete.call(that, content);
                    }

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: content[0] });
                }
            };

            if (typeof url === "object") {
                ajaxOptions = $.extend(true, {}, ajaxOptions, url);

                if (isFunction(ajaxOptions.url)) {
                    ajaxOptions.url = ajaxOptions.url();
                }

                if (isFunction(ajaxOptions.data)) {
                    ajaxOptions.data = ajaxOptions.data();
                }
            }

            that.xhr = $.ajax(ajaxOptions);
        },

        append: function(tab) {
            var that = this,
                inserted = that._create(tab);

            each(inserted.tabs, function(idx) {
                var contents = inserted.contents[idx];
                that.tabGroup.append(this);
                if (that.options.tabPosition == "bottom") {
                    that.tabWrapper.before(contents);
                } else {
                    that.wrapper.append(contents);
                }
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();
            that.resize(true);

            return that;
        },

        contentElement: function(itemIndex) {
            if (isNaN(itemIndex - 0)) {
                return undefined;
            }

            var contentElements = this.contentElements && this.contentElements[0] && !kendo.kineticScrollNeeded ? this.contentElements : this.contentAnimators;
            var id = $(this.tabGroup.children()[itemIndex]).attr(ARIA_CONTROLS);

            if (contentElements) {
                for (var i = 0, len = contentElements.length; i < len; i++) {
                    if (contentElements.eq(i).closest(".k-tabstrip-content")[0].id == id) {
                        return contentElements[i];
                    }
                }
            }

            return undefined;
        },

        contentHolder: function(itemIndex) {
            var contentElement = $(this.contentElement(itemIndex)),
                scrollContainer = contentElement.children(".km-scroll-container");

            return kendo.support.touch && scrollContainer[0] ? scrollContainer : contentElement;
        },

        deactivateTab: function(item) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close;
            item = that.tabGroup.find(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { hide: true });

            if (kendo.size(animation.effects)) {
                item.kendoRemoveClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                item.removeClass(ACTIVESTATE);
            }

            item.attr(ARIA_SELECTED, false);
            that.tabGroup.removeAttr("aria-activedescendant");

            that.contentAnimators
                    .filter("." + ACTIVESTATE)
                    .kendoStop(true, true)
                    .kendoAnimate( close )
                    .removeClass(ACTIVESTATE)
                    .attr(ARIA_HIDDEN, true);
        },

        _removeAdditionalWrapperClasses: function() {
            const that = this;

            that.wrapper.removeClass("k-tabstrip-sm k-tabstrip-md k-tabstrip-lg");
            that.tabGroup.removeClass("k-tabstrip-items-start k-tabstrip-items-center k-tabstrip-items-end k-tabstrip-items-justify k-tabstrip-items-stretched");
        },

        destroy: function() {
            var that = this;
            const isHidden = that.options.scrollable && that.options.scrollable.scrollButtons === "hidden";
            Widget.fn.destroy.call(that);

            if (that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            }

            if (that.options.scrollable && isHidden) {
                that.tabGroup.unbind("scroll" + NS);
            }

            that._removeAdditionalWrapperClasses();

            that.wrapper.off(NS);
            that.tabGroup.off(NS);

            if (that._scrollableModeActive && !isHidden) {
                that._scrollPrevButton.off().remove();
                that._scrollNextButton.off().remove();
            }

            kendo.destroy(that.wrapper);
        },

        disable: function(element) {
            this._toggleDisabled(element, false);

            return this;
        },

        enable: function(element, state) {
            this._toggleDisabled(element, state !== false);

            return this;
        },

        insertAfter: function(tab, referenceTab) {
            if ($(tab).is($(referenceTab))) {
                referenceTab = this.tabGroup.find(referenceTab).prev();
            } else {
                referenceTab = this.tabGroup.find(referenceTab);
            }

            var that = this,
                inserted = that._create(tab),
                referenceContent = that.element.find("[id='" + referenceTab.attr(ARIA_CONTROLS) + "']");

            each(inserted.tabs, function(idx) {
                var contents = inserted.contents[idx];
                var fromIndex = inserted.newTabsCreated ? that._contentUrls.length - (inserted.tabs.length - idx) : $(contents).index() - 1;

                referenceTab.after(this);
                referenceContent.after(contents);

                that._moveUrlItem(fromIndex, $(this).index());
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements(inserted.newTabsCreated);
            that.resize(true);

            return that;
        },

        insertBefore: function(tab, referenceTab) {
            if ($(tab).is($(referenceTab))) {
                referenceTab = this.tabGroup.find(referenceTab).next();
            } else {
                referenceTab = this.tabGroup.find(referenceTab);
            }

            var that = this,
                inserted = that._create(tab),
                referenceContent = that.element.find("[id='" + referenceTab.attr(ARIA_CONTROLS) + "']");

            each(inserted.tabs, function(idx) {
                var contents = inserted.contents[idx];
                var fromIndex = inserted.newTabsCreated ? that._contentUrls.length - (inserted.tabs.length - idx) : $(contents).index() - 1;

                referenceTab.before(this);
                referenceContent.before(contents);

                that._moveUrlItem(fromIndex, $(this).index());
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements(inserted.newTabsCreated);
            that.resize(true);

            return that;
        },

        items: function() {
            return this.tabGroup[0].children;
        },

        refresh: function(e) {
            var that = this,
                options = that.options,
                encoded = kendo.getter(options.dataEncodedField),
                text = kendo.getter(options.dataTextField),
                content = kendo.getter(options.dataContentField),
                contentUrl = kendo.getter(options.dataContentUrlField),
                image = kendo.getter(options.dataImageUrlField),
                url = kendo.getter(options.dataUrlField),
                sprite = kendo.getter(options.dataSpriteCssClass),
                icon = kendo.getter(options.dataIconField),
                iconPosition = kendo.getter(options.dataIconPositionField),
                idx,
                tabs = [],
                tab,
                action,
                view = that.dataSource.view(),
                length;

            const enableDOMDataSource = that._enableDataSourceFromDOM;

            e = e || {};
            action = e.action;

            if (action) {
               view = e.items;
            }

            for (idx = 0, length = view.length; idx < length; idx ++) {
                tab = {
                    text: (view[idx] && view[idx].text) || text(view[idx]),
                };

                if (options.tabTemplate) {
                    tab.model = view[idx];
                    tab.template = options.tabTemplate;
                }

                if (options.dataEncodedField) {
                    tab.encoded = encoded(view[idx]);
                }

                if (options.dataContentField) {
                    tab.content = content(view[idx]);
                }

                if (options.dataContentUrlField) {
                    tab.contentUrl = contentUrl(view[idx]);
                }

                if (options.dataUrlField) {
                    tab.url = url(view[idx]);
                }

                if (options.dataImageUrlField) {
                    tab.imageUrl = image(view[idx]);
                }

                if (options.dataSpriteCssClass) {
                    tab.spriteCssClass = sprite(view[idx]);
                }

                if (view[idx].actions) {
                    const actions = typeof view[idx].actions === 'object' ? Array.from(view[idx].actions) : view[idx].actions;
                    tab.actions = actions;
                }

                if (icon(view[idx]) || view[idx].iconClass) {
                    tab.icon = icon(view[idx]);
                    tab.iconClass = view[idx].iconClass;
                    tab.iconPosition = iconPosition(view[idx]) ?? 'before';
                }

                tab.enabled = view[idx].enabled;
                tab.closable = view[idx].closable ?? options.closable;
                tab.attributes = view[idx].attributes;
                if (view[idx].content) {
                    tab.content = view[idx].content;
                }

                tabs[idx] = tab;
            }

            if (e.action == "add") {
                if (e.index < that.tabGroup.children().length) {
                    that.insertBefore(tabs, that.tabGroup.children().eq(e.index));
                } else {
                    that.append(tabs);
                }
            } else if (e.action == "remove") {
                for (idx = 0; idx < view.length; idx++) {
                   that.remove(e.index);
                }
            } else if (e.action == "itemchange") {
                idx = that.dataSource.view().indexOf(view[0]);
                if (e.field === options.dataTextField) {
                    that.tabGroup.children().eq(idx).find(".k-link").text(view[0].get(e.field));
                }

                if (e.field === options.dataUrlField) {
                    that._contentUrls[idx] = view[0].get(e.field);
                }
            } else if (enableDOMDataSource && kendo.isPresent(that.dataSource)) {
                that._wrapExistingDOMItems();
                that._updateContentElements();
                that._enableDataSourceFromDOM = false;
            } else {
                that.trigger("dataBinding");
                that.remove("li");
                that._contentUrls = [];
                that.append(tabs);
                that.trigger("dataBound");
            }
        },

        _wrapExistingDOMItems: function() {
           const that = this;
           const items = that.tabGroup.children("li");
           const dataSource = that.dataSource;
           const dataItems = dataSource.view();

           dataItems.forEach((dataItem, index) => {
                const item = items.eq(index);
                const linkContainer = item.find("." + LINK);
                const tabText = linkContainer.find("." + LINK_TEXT);
                const checkActions = (kendo.isPresent(dataItem.actions) && dataItem.actions.length) || (dataItem.closable) || (!dataItem.closable && that.options.closable);

                if (dataItem.contentUrl) {
                    linkContainer.attr("data-content-url", dataItem.contentUrl);
                }

                if (!that.options.contentUrls) {
                    that._contentUrls.push(dataItem.contentUrl || DOM_DATASOURCE_EMPTY);
                }

                if (dataItem.icon || dataItem.iconClass) {
                    if (dataItem.iconPosition === 'before') {
                        linkContainer.prepend(kendo.ui.icon({ icon: dataItem.icon || "none", iconClass: dataItem.iconClass }));
                    }
                    if (dataItem.iconPosition === 'after') {
                        linkContainer.append(kendo.ui.icon({ icon: dataItem.icon || "none", iconClass: dataItem.iconClass }));
                    }
                }

                let template = "";
                if (dataItem.imageUrl) {
                    template += templates.image({ imageUrl: dataItem.imageUrl });
                }

                if (dataItem.spriteCssClass) {
                    template += templates.sprite({ spriteCssClass: dataItem.spriteCssClass });
                }

                linkContainer.prepend(template);

                if (checkActions) {
                    that._initTabActions(item, dataItem);
                }

                if (dataItem.text) {
                    const text = dataItem.encoded ? kendo.htmlEncode(dataItem.text) : dataItem.text;
                    tabText.text(text);
                }

                if (item.attr("data-content") && !dataItem.contentUrl) {
                    let tabContent = that.contentElements.eq(index);
                    tabContent.text(dataItem.content);
                }

                if (dataItem.hasOwnProperty("enabled")) {
                    dataItem.enabled ? item
                                        .removeClass(DISABLEDSTATE)
                                        .attr(ARIA_DISABLED, true)
                                    : item
                                       .addClass(DISABLEDSTATE)
                                       .removeAttr(ARIA_DISABLED, false);
                }
                else if (item.hasClass(DISABLEDSTATE)) {
                    item.addClass(DISABLEDSTATE)
                        .removeAttr(ARIA_DISABLED, false);
                }
           });
        },

        reload: function(element) {
            element = this.tabGroup.find(element);
            var that = this;
            var contentUrls = that._contentUrls;

            element.each(function() {
                var item = $(this),
                    contentUrl = item.find("." + LINK).data(CONTENTURL) || contentUrls[item.index()],
                    content = that.contentHolder(item.index());

                if (contentUrl) {
                    that.ajaxRequest(item, content, null, contentUrl);
                }
            });

            return that;
        },

        remove: function(elements) {
            var that = this;
            var type = typeof elements;
            var contents;

            if (type === "string") {
                elements = that.tabGroup.find(elements);
            } else if (type === "number") {
                elements = that.tabGroup.children().eq(elements);
            }

            contents = elements.map(function() {
                var idx = $(this).index();
                var content = that.contentElement(idx);

                kendo.destroy(content);
                that._removeUrlItem(idx);

                return content;
            });

            elements.remove();
            contents.empty();
            contents.remove();

            that._updateContentElements();
            that.resize(true);

            return that;
        },

        select: function(element) {
            var that = this;

            if (arguments.length === 0) {
                return that.tabGroup.children("li." + ACTIVESTATE);
            }

            if (!isNaN(element)) {
                element = that.tabGroup.children().get(element);
            }

            element = that.tabGroup.find(element);
            $(element).each(function(index, item) {
                item = $(item);
                if (!item.hasClass(ACTIVESTATE) && !that.trigger(SELECT, { item: item[0], contentElement: that.contentHolder(item.index())[0] })) {
                    that.activateTab(item);
                    that.tabGroup.attr("aria-activedescendant", item.attr("id"));
                }
            });

            return that;
        },

        value: function(value) {
            var that = this;

            if (value !== undefined) {
                if (value != that.value()) {
                   that.tabGroup.children().each(function() {
                        if (kendo.trim($(this).text()) == value) {
                            that.select(this);
                        }
                   });
                }
            } else {
                return that.select().text();
            }
        },

        _initTabActions: function(tab, tabOptions) {
            const that = this;
            const tabElement = $(tab);
            let actions = [];
            let isClosable = tabOptions.closable;

            let closeButtonAttributes = { icon: "x", attributes: { "ref-close-button": true }, action: that._handleClose };

            if (tabOptions.actions) {
                actions = Array.from(tabOptions.actions);
            }

            if (isClosable) {
                actions.push(closeButtonAttributes);
            }

            if (actions?.length) {
                const actionsWrapperTemplate = $(templates.itemActionsWrapperTemplate());
                const existingActionButtons = tabElement.find("button");

                actions.forEach((action, index) => {
                    const isClosableAction = isClosable && index > existingActionButtons.length - 1;

                    if (existingActionButtons.length && !isClosableAction) {
                        action.element = existingActionButtons.eq(index);
                    }

                    const actionTemplate = $(templates.itemActionTemplate(action));

                    if (!existingActionButtons.length) {
                        actionsWrapperTemplate.append(actionTemplate);
                    }

                    if (isClosableAction && existingActionButtons.length) {
                        existingActionButtons.parent().append(actionTemplate);
                    }

                    if (isFunction(action?.action)) {
                        if (!existingActionButtons.length || isClosableAction) {
                            actionTemplate.bind(CLICK, action.action.bind(that));
                        } else {
                            existingActionButtons.eq(index).bind(CLICK, action.action.bind(that));
                        }
                    }
                });

                if (existingActionButtons.length) {
                    existingActionButtons.wrapAll(actionsWrapperTemplate);
                } else {
                    tabElement.append(actionsWrapperTemplate);
                }
            }

            return tabElement[0];
        },

        _handleClose: function(e) {
            const that = this;
            const target = $(e.currentTarget);

            const tab = target.closest('.k-item');

            if (tab.hasClass(ACTIVESTATE)) {

                if (tab.prev().length > 0) {
                    that.activateTab(tab.prev());
                } else {
                    that.activateTab(tab.next());
                }
            }

            that.remove(tab);
        },

        _tabAlignment: function() {
            const that = this;

            let tabAlignment = that.options.tabAlignment;

            if (that._scrollableModeActive) {
                tabAlignment = 'start';
            }

            that.tabGroup.addClass("k-tabstrip-items-" + tabAlignment);

        },

        _active: function() {
            var that = this;
            setTimeout(function() {
                var item = that.tabGroup.children().filter("." + ACTIVESTATE);

                item = item[0] ? item : that._endItem("first");
                if (item[0]) {
                    that._current(item);
                }
            }, 100);
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation
            }
        },

        _appendUrlItem: function(url) {
            this._contentUrls.push(url);
        },

        _attachEvents: function() {
            var that = this,
                options = that.options;

            that.tabGroup
                .on(CLICK + NS, ".k-disabled .k-link", false)
                .on(CLICK + NS, " > " + NAVIGATABLEITEMS, that._itemClick.bind(that));

            that.wrapper.on("focus" + NS, function() { that.tabGroup.trigger("focus"); });

            if (options.scrollable && options.scrollable.scrollButtons === "hidden") {
                that.tabGroup.bind("scroll", function(e) {
                    that._toggleScrollButtons();
                });
            }

            that.tabGroup
                .on(MOUSEENTER + NS + " " + MOUSELEAVE + NS, HOVERABLEITEMS, that._toggleHover)
                .on("focus" + NS, that._active.bind(that))
                .on("blur" + NS, function() { that._current(null); });

            that._keyDownProxy = that._keydown.bind(that);

            if (options.navigatable) {
                that.tabGroup.on("keydown" + NS, that._keyDownProxy);
            }

            $(window).on('resize' + NS, that._resize.bind(that));
        },

        _click: function(item) {
            var that = this,
                link = item.find("." + LINK),
                href = link.attr(HREF),
                collapse = that.options.collapsible,
                index = item.index(),
                contentHolder = that.contentHolder(index),
                prevent, isAnchor,
                neighbours = item.parent().children(),
                oldFocusedTab = neighbours.filter("." + FOCUSEDSTATE);

            if (item.closest(".k-tabstrip")[0] != that.wrapper[0]) {
                return;
            }

            if (item.is("." + DISABLEDSTATE + (!collapse ? ",." + ACTIVESTATE : ""))) {
                oldFocusedTab.removeClass(FOCUSEDSTATE);
                that._focused = item;

                item.addClass(FOCUSEDSTATE);
                that._current(item);

                if (that._scrollableModeActive) {
                    that._scrollTabsToItem(item);
                }
                return true;
            }

            isAnchor = link.data(CONTENTURL) || that._contentUrls[index] || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));
            prevent = !href || isAnchor;

            if (that.tabGroup.children("[data-animating]").length) {
                return prevent;
            }

            if (that.trigger(SELECT, { item: item[0], contentElement: contentHolder[0] })) {
                return true;
            }

            if (prevent === false) {
                return;
            }

            if (collapse && item.is("." + ACTIVESTATE)) {
                that.deactivateTab(item);
                return true;
            }

            if (that.activateTab(item)) {
                that._current(item);
                prevent = true;
            }

            return prevent;
        },

        _create: function(tab) {
            var that = this,
            tabs,
            contents,
            content,
            newTabsCreated = false;

            tab = tab instanceof kendo.data.ObservableArray ? tab.toJSON() : tab;

            if ($.isPlainObject(tab) || Array.isArray(tab)) {
                tab = Array.isArray(tab) ? tab : [tab];
                newTabsCreated = true;

                tabs = map(tab, function(value, idx) {
                    that._appendUrlItem(tab[idx].contentUrl || null);
                    const renderedTabItem = TabStrip.renderItem({
                        group: that.tabGroup,
                        item: extend(value, { index: idx })
                    });

                    value.closable = value.closable ?? that.options.closable;
                    return $(that._initTabActions(renderedTabItem, value));
                });

                contents = map( tab, function(value, idx) {
                            if (typeof value.content == "string" || value.contentUrl) {
                                let tabstripContent = $(TabStrip.renderContent({
                                    item: extend(value, { index: idx })
                                }));

                                kendo.applyStylesFromKendoAttributes(tabstripContent, ["display"]);
                                return tabstripContent;
                            }
                        });
            } else {
                if (typeof tab == "string" && tab[0] != "<") {
                    tabs = that.element.find(tab);
                } else {
                    tabs = $(tab);
                }
                contents = $();
                tabs.each(function() {
                    if (/k-tabstrip-items/.test(this.parentNode.className)) {
                        var element = that.element.find("[id='" + this.getAttribute(ARIA_CONTROLS) + "']");
                        content = element;
                    } else {
                        content = $("<div class='" + CONTENT + "'/>");
                    }

                    contents = contents.add(content);
                });

                updateTabClasses(tabs, that.options);
            }

            return { tabs: tabs, contents: contents, newTabsCreated: newTabsCreated };
        },

        _current: function(candidate, preventFocus) {
            var that = this,
                focused = that._focused;

            if (candidate === undefined) {
                return focused;
            }

            if (focused && candidate && focused[0] === candidate[0]) {
                focused = false;
            }

            if (focused) {
                focused.removeClass(FOCUSEDSTATE);
            }

            if (candidate && !preventFocus) {
                candidate.addClass(FOCUSEDSTATE);
            }

            that._focused = candidate;
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            } else {
                that._refreshHandler = that.refresh.bind(that);
            }
            const dataSource = that.options.dataSource || that._createDataSourceFromDOM();

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                .bind("change", that._refreshHandler);
        },

        _createDataSourceFromDOM: function() {
            const that = this;
            const dataSourceOptions = [];
            const enableDOMDataSource = that.options._enableDOMDataSource;
            const itemOptions = [
                "text",
                "content",
                "icon",
                "iconPosition",
                "iconClass",
                "spriteCssClass",
                "imageUrl",
                "contentUrl",
                "encoded",
                "closable",
                "actions",
                "enabled",
            ];

            const actionOptions = [
                "icon",
                "iconClass",
                "text",
                "action"
            ];

            if (!enableDOMDataSource) {
                return that.options.dataSource;
            }

            const dataItems = that.tabGroup.children("li");
            const contentElements = that.contentElements;

            that._enableDataSourceFromDOM = dataItems.length > 0;
            dataItems.each(function(idx, item) {
                const $item = $(item);
                const actions = $item.find("button");
                const itemData = {};

                itemOptions.forEach(function(option) {
                    let data = $item.data(option);

                    if (option === "text" && !data) {
                        data = $item
                            .find(".k-link-text")
                            .text()
                            .trim();
                    }

                    if (option === "content" && !data) {
                        const content = $(contentElements[idx]);
                        if (content.length) {
                            data = content.html();
                        }
                    }

                    if (option === "closable" && data === undefined) {
                        data = that.options.closable;
                    }

                    if (data !== undefined) {
                        itemData[option] = data;
                    }
                });

                if (itemData.iconPosition === undefined) {
                    itemData.iconPosition = "before";
                }

                if (actions.length) {
                    itemData.actions = [];
                    that._decorateActions(actions, actionOptions, itemData);
                }

                dataSourceOptions.push(itemData);
            });

            return dataSourceOptions;
        },

        _decorateActions: function(actions, actionOptions, itemData) {
            actions.each(function(idx, action) {
                  const $action = $(action);
                  const actionData = {};
                  actionOptions.forEach(function(option) {
                      let data = $action.data(option);

                      if (option === "text" && !data) {
                          data = kendo.htmlEncode($action.text().trim());
                      }

                      if (option === "action" && typeof data === "string") {
                          let fn = window[data];
                          if (typeof fn === "function") {
                              data = fn;
                          }
                      }

                      if (data !== undefined) {
                          actionData[option] = data;
                      }
                  }, this);
                  itemData.actions.push(actionData);
            });
        },

        _elementId: function(element, idx, tab) {
            var elementId = element.attr("id"),
                wrapperId = this.element.attr("id"),
                guid = kendo.guid();

            if (!elementId || elementId.indexOf(wrapperId + "-") > -1) {
                var tabStripID = (wrapperId || guid) + "-";

                if (tab) {
                    tabStripID += "tab-";
                }

                return tabStripID + (idx + 1);
            }

            return elementId;
        },

        _endItem: function(action) {
            return this.tabGroup.children(NAVIGATABLEITEMS)[action]();
        },

        _getItem: function(action) {
            return this.tabGroup.children(KEYBOARDNAVIGATABLEITEMS)[action]();
        },

        _initialActivate: function() {
            var that = this,
                selectedItems = that.tabGroup.children("li." + ACTIVESTATE),
                content = that.contentHolder(selectedItems.index());

            if (selectedItems[0] && content.length > 0 && content[0].childNodes.length === 0) {
                that.activateTab(selectedItems.eq(0));
            }
        },

        _item: function(item, action) {
            var endItem;
            if (action === PREV) {
                endItem = "last";
            } else {
                endItem = "first";
            }

            if (!item) {
                return this._endItem(endItem);
            }

            item = item[action]();

            if (!item[0]) {
                item = this.tabGroup.children(KEYBOARDNAVIGATABLEITEMS)[endItem]();
            }

            if (item.hasClass(DISABLEDSTATE)) {
                item.addClass(FOCUSEDSTATE);
            }
            if (item.hasClass(DISABLEDSTATE) || item.hasClass(ACTIVESTATE)) {
                this._focused = item;
            }

            return item;
        },

        _itemClick: function(e) {
            var that = this,
                tabGroup = that.tabGroup[0];

            if (e.target.closest('.k-item-actions')) {
                return;
            }

            if (tabGroup !== document.activeElement) {
                var msie = kendo.support.browser.msie;
                if (msie) {
                    try {
                        // does not scroll to the active element
                        tabGroup.setActive();
                    } catch (j) {
                        tabGroup.focus();
                    }
                } else {
                    tabGroup.focus();
                }
            }

            if (that._click($(e.currentTarget))) {
                e.preventDefault();
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                current = that._current(),
                rtl = that._isRtl,
                isHorizontal = /top|bottom/.test(that.options.tabPosition),
                action;

            if (e.target != e.currentTarget || !current) {
                return;
            }

            if (key === keys.DOWN && !isHorizontal) {
                action = NEXT;
            } else if (key === keys.UP && !isHorizontal) {
                action = PREV;
            } else if (key === keys.RIGHT && isHorizontal) {
                action = rtl ? PREV : NEXT;
            } else if (key === keys.LEFT && isHorizontal) {
                action = rtl ? NEXT : PREV;
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                that._click(current);
                e.preventDefault();
            } else if (key == keys.HOME) {
                that._click(that._getItem("first"));
                e.preventDefault();
                return;
            } else if (key == keys.END) {
                that._click(that._getItem("last"));
                e.preventDefault();
                return;
            }

            if (action) {
                that._click(that._item(current, action));
                e.preventDefault();
            }
        },

        _moveUrlItem: function(from, to) {
            this._contentUrls.splice(to, 0, this._contentUrls.splice(from, 1)[0]);
        },

        _processContentUrls: function() {
            var that = this;

            if (that._contentUrls.length) {
                that.tabGroup.children(".k-item.k-tabstrip-item")
                    .each(function(index, item) {
                        var url = that._contentUrls[index];

                        if (typeof url === 'string') {
                            $(item).find(">." + LINK).data(CONTENTURL, url);
                        }
                    });
            } else {
                that._contentUrls.length = that.tabGroup.find("li.k-item.k-tabstrip-item").length;
            }
        },

        _removeUrlItem: function(index) {
            this._contentUrls.splice(index, 1);
        },

        _resize: function() {
            this._scrollable();
        },

        _getChildrenWidth: function(element) {
            let width = 0;
            element.children().each(function() {
                width += outerWidth($(this));
            });
            return Math.floor(width);
        },

        _getChildrenHeight: function(element) {
            let height = 0;
            element.children().each(function() {
                height += outerHeight($(this));
            });
            return Math.floor(height);
        },

        _scrollable: function() {
            const that = this,
                options = that.options,
                scrollButtonsPosition = options.scrollable.scrollButtonsPosition,
                scrollButtonsVisibility = options.scrollable.scrollButtons,
                isHorizontal = options.tabPosition == "top" || options.tabPosition == "bottom",
                isHidden = scrollButtonsVisibility === "hidden",
                isVisible = scrollButtonsVisibility === "visible";

            let wrapperOffset,
            tabGroupScroll,
                scrollPrevButton,
                scrollNextButton;

            if (that._scrollableAllowed()) {

                that.wrapper.addClass("k-tabstrip-scrollable");

                wrapperOffset = isHorizontal ? that.wrapper[0].offsetWidth : that.wrapper[0].offsetHeight;
                tabGroupScroll = isHorizontal ? that.tabGroup[0].scrollWidth : that.tabGroup[0].scrollHeight;
                const condition = isHorizontal ? (that._getChildrenWidth(that.tabGroup) > that.tabGroup.outerWidth()) : (that._getChildrenHeight(that.tabGroup) > that.tabGroup.outerHeight());
                const enableScroll = (tabGroupScroll > wrapperOffset) || condition;

                if (enableScroll && !that._scrollableModeActive && isHidden) {
                    that.tabGroup.addClass("k-tabstrip-items-scroll");
                    that.wrapper.addClass("k-tabstrip-scrollable-overlay");

                    that._scrollableModeActive = true;
                    that._toggleScrollButtons();
                } else if ((enableScroll || isVisible) && !that._scrollableModeActive) {
                    that._nowScrollingTabs = false;
                    that._isRtl = kendo.support.isRtl(that.element);
                    const mouseDown = kendo.support.touch ? "touchstart" : "mousedown";
                    const mouseUp = kendo.support.touch ? "touchend" : "mouseup";
                    const browser = kendo.support.browser;
                    const isRtlScrollDirection = that._isRtl && !browser.msie && !browser.edge;
                    const prevIcon = isHorizontal ? "caret-alt-left" : "caret-alt-up";
                    const nextIcon = isHorizontal ? "caret-alt-right" : "caret-alt-down";

                    const scrollLeft = scrollButtonHtml("prev", prevIcon);
                    const scrollRight = scrollButtonHtml("next", nextIcon);

                    switch (scrollButtonsPosition) {
                        case 'split':
                            that.tabWrapper.prepend(scrollLeft);
                            that.tabWrapper.append(scrollRight);
                            break;
                        case 'start':
                            that.tabWrapper.prepend(scrollRight);
                            that.tabWrapper.prepend(scrollLeft);
                            break;
                        case 'end':
                            that.tabWrapper.append(scrollLeft);
                            that.tabWrapper.append(scrollRight);
                            break;
                    }

                    scrollPrevButton = that._scrollPrevButton = that.tabWrapper.children(".k-tabstrip-prev");
                    scrollNextButton = that._scrollNextButton = that.tabWrapper.children(".k-tabstrip-next");

                    scrollPrevButton.on(mouseDown + NS, function() {
                        that._nowScrollingTabs = true;
                        that._scrollTabsByDelta(options.scrollable.distance * (isRtlScrollDirection ? 1 : -1));
                    });

                    scrollNextButton.on(mouseDown + NS, function() {
                        that._nowScrollingTabs = true;
                        that._scrollTabsByDelta(options.scrollable.distance * (isRtlScrollDirection ? -1 : 1));
                    });

                    scrollPrevButton.add(scrollNextButton).on(mouseUp + NS, function() {
                        that._nowScrollingTabs = false;
                    });

                    that._scrollableModeActive = true;

                    that._toggleScrollButtons();
                } else if (that._scrollableModeActive && !enableScroll && !isVisible) {
                    that._scrollableModeActive = false;

                   that._removeScrollableClasses();

                   that._scrollPrevButton && that._scrollPrevButton.off().remove();
                   that._scrollNextButton && that._scrollNextButton.off().remove();
                } else if (!that._scrollableModeActive && !isVisible) {
                    that._removeScrollableClasses();
                } else {
                    that._toggleScrollButtons();
                }
            }
        },

        _removeScrollableClasses: function() {
            const that = this;
            const isHidden = that.options.scrollable.scrollButtons === "hidden";

            that.wrapper.removeClass("k-tabstrip-scrollable");

            if (isHidden) {
                that.wrapper.removeClass("k-tabstrip-scrollable-overlay");
                that.wrapper.removeClass("k-tabstrip-scrollable-start");
                that.wrapper.removeClass("k-tabstrip-scrollable-end");

                that.tabGroup.removeClass("k-tabstrip-items-scroll");
            }
        },

        _scrollableAllowed: function() {
            var options = this.options;

            if (options.scrollable && !options.scrollable.distance) {
                options.scrollable = { distance: DEFAULTDISTANCE };
            }
            return options.scrollable && !isNaN(options.scrollable.distance);
        },

        _scrollTabsToItem: function(item) {
            var that = this,
                tabGroup = that.tabGroup,
                isHorizontal = that.options.tabPosition == "top" || that.options.tabPosition == "bottom",
                currentScrollOffset = isHorizontal ? kendo.scrollLeft(tabGroup) : tabGroup.scrollTop(),
                itemSize = isHorizontal ? outerWidth(item) : outerHeight(item),
                itemOffset = isHorizontal ? (that._isRtl ? item.position().left : item.position().left - tabGroup.children().first().position().left) : item.position().top,
                tabGroupSize = isHorizontal ? tabGroup[0].offsetWidth : tabGroup[0].offsetHeight,
                browser = kendo.support.browser,
                itemPosition;

            if (that._isRtl && isHorizontal && (browser.mozilla || (browser.webkit && browser.version >= 85))) {
                currentScrollOffset = currentScrollOffset * -1;
            }

            if (that._isRtl && isHorizontal) {
                if (itemOffset < 0) {
                    itemPosition = currentScrollOffset + itemOffset - (tabGroupSize - currentScrollOffset);
                } else if (itemOffset + itemSize > tabGroupSize) {
                    itemPosition = currentScrollOffset + itemOffset - itemSize;
                }
            } else {
                if (currentScrollOffset + tabGroupSize < itemOffset + itemSize) {
                    itemPosition = itemOffset + itemSize - tabGroupSize;
                } else if (currentScrollOffset > itemOffset) {
                    itemPosition = itemOffset;
                }
            }

            var animationProps = isHorizontal ? { "scrollLeft": itemPosition } : { "scrollTop": itemPosition };

            tabGroup.finish().animate(animationProps, "fast", "linear", function() {
                that._toggleScrollButtons();
            });
        },

        _scrollTabsByDelta: function(delta) {
            const that = this;
            const tabGroup = that.tabGroup;
            const isHorizontal = that.options.tabPosition == "top" || that.options.tabPosition == "bottom";

            let scrOffset = isHorizontal ? kendo.scrollLeft(tabGroup) : tabGroup.scrollTop();
            const browser = kendo.support.browser;

            if (that._isRtl && isHorizontal && (browser.mozilla || (browser.webkit && browser.version >= 85))) {
                scrOffset = scrOffset * -1;
            }

            var animationProps = isHorizontal ? { "scrollLeft": scrOffset + delta } : { "scrollTop": scrOffset + delta };

            tabGroup.finish().animate(animationProps, "fast", "linear", function() {
                if (that._nowScrollingTabs && !jQuery.fx.off) {
                    that._scrollTabsByDelta(delta);
                } else {
                    that._toggleScrollButtons();
                }
            });
        },

        _sortable: function() {
            var that = this,
            options = that.options,
            position = options.tabPosition,
            isHidden = options.scrollable && options.scrollable.scrollButtons === "hidden",
            axis = position === 'left' || position === 'right' ? 'y' : 'x';

            if (!that.options.sortable) {
                return;
            }

            that.sortable = new kendo.ui.Sortable(that.tabGroup, {
                filter: "li.k-item.k-tabstrip-item",
                axis,
                holdToDrag: isHidden,
                allowTouchActions: isHidden,
                container: that.tabWrapper,
                hint: el => `<div id='hint' class='k-tabstrip k-tabstrip-${position}'>
                                <div class= 'k-tabstrip-items-wrapper k-hstack'>
                                    <ul class='k-tabstrip-items k-reset'>
                                        <li class='k-item k-tabstrip-item k-first k-active'>${el.html()}</li>
                                    </ul>
                                </div>
                            </div>`,
                change: that._sortChange.bind(that),
                start: e => that.activateTab(e.item)
            });

        },

        _sortChange: function(e) {
            var that = this,
                reference = that.tabGroup.children().eq(e.newIndex);

            if (e.oldIndex < e.newIndex) {
                that.insertAfter(e.item, reference);
            } else {
                that.insertBefore(e.item, reference);
            }
        },

        _tabSizes: function() {
            const that = this;
            const tabSize = that.options.size;

            let className;
            switch (tabSize) {
                case "small":
                    className = "k-tabstrip-sm";
                    break;

                case "medium":
                    className = "k-tabstrip-md";
                    break;

                case "large":
                    className = "k-tabstrip-lg";
                    break;
            }

            that.wrapper.addClass(className);
        },

        _tabPosition: function() {
            var that = this,
                tabPosition = that.options.tabPosition;

            that.wrapper.addClass("k-tabstrip-" + tabPosition);

            if (tabPosition == "bottom") {
                that.tabWrapper.appendTo(that.wrapper);
            }

            if (tabPosition === "left" || tabPosition === "right") {
                that.tabGroup.attr(ARIA_ORIENTATION, "vertical");
            }

            that.resize(true);
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _toggleDisabled: function(element, enable) {
            element = this.tabGroup.find(element);
            element.each(function() {
                $(this)
                    .toggleClass(DISABLEDSTATE, !enable)
                    .attr(ARIA_DISABLED, !enable);
            });
        },

        _toggleScrollButtons: function() {
            var that = this,
                ul = that.tabGroup,
                scrollLeft = Math.floor(kendo.scrollLeft(ul)),
                scrollTop = Math.floor(ul.scrollTop()),
                scrollButtonsVisibility = that.options.scrollable.scrollButtons,
                isHorizontal = that.options.tabPosition == "top" || that.options.tabPosition == "bottom";

                const disableNextButton = (isHorizontal ? Math.abs(scrollLeft - (ul[0].scrollWidth - ul[0].offsetWidth)) : Math.abs(scrollTop - (ul[0].scrollHeight - ul[0].offsetHeight))) <= 1;
                const disablePrevButton = (isHorizontal ? scrollLeft : scrollTop) === 0;

                if (scrollButtonsVisibility !== "hidden") {
                    that._scrollPrevButton.toggleClass('k-disabled', disablePrevButton);
                    that._scrollNextButton.toggleClass('k-disabled', disableNextButton);
                } else {
                    that.wrapper.toggleClass("k-tabstrip-scrollable-start", disablePrevButton);
                    that.wrapper.toggleClass("k-tabstrip-scrollable-end", disableNextButton);
                }
        },

        _updateClasses: function() {
            var that = this,
                tabs, activeItem, activeTab;
            var isHorizontal = /top|bottom/.test(that.options.tabPosition);

            that.wrapper.addClass("k-tabstrip");

            if (!that.tabGroup) {
                that.tabGroup = that.wrapper.children("ul");
                that.tabGroup.wrap('<div />');
                that.tabWrapper = that.tabGroup.parent();
            }

            if (!that.tabGroup[0]) {
                that.tabGroup = $("<ul />").prependTo(that.wrapper);
                that.tabGroup.wrap('<div />');
                that.tabWrapper = that.tabGroup.parent();
            }

            that.tabWrapper.addClass('k-tabstrip-items-wrapper');
            that.tabWrapper.addClass(isHorizontal ? 'k-hstack' : 'k-vstack');
            that.tabGroup.addClass('k-tabstrip-items k-reset');

            tabs = that.tabGroup.find("li").addClass("k-item k-tabstrip-item");

            if (tabs.length) {
                activeItem = tabs.filter("." + ACTIVESTATE).index();
                activeTab = activeItem >= 0 ? activeItem : undefined;

                that.tabGroup // Remove empty text nodes
                    .contents()
                    .filter(function() { return (this.nodeType == 3 && !trim(this.nodeValue)); })
                    .remove();
            }

            that.contentElements = that.wrapper.children("div:not(.k-tabstrip-items-wrapper)");

            that.contentElements
                .addClass(CONTENT)
                .eq(activeTab)
                .addClass(ACTIVESTATE)
                .css({ display: "block" });

            if (tabs.length) {
                updateTabClasses(tabs, that.options);
                activeItem = tabs.filter("." + ACTIVESTATE).index();

                that.tabGroup.attr("aria-activedescendant", tabs.eq(activeItem).attr("id"));
                updateFirstLast(that.tabGroup);
                that._updateContentElements(true);
            }
        },

        _updateContentElements: function(isInitialUpdate) {
            var that = this,
                contentUrls = that._contentUrls,
                items = that.tabGroup.children(".k-item.k-tabstrip-item"),
                contentElements = that.wrapper.children("div:not(.k-tabstrip-items-wrapper)"),
                _elementId = that._elementId.bind(that);

            if (contentElements.length && (items.length > contentElements.length)) {
                contentElements.each(function(idx) {
                    // Generate an ID for each content element
                    var contentId = _elementId($(this), idx),
                        item = items.filter("[aria-controls=" + (contentId || 0) + "]")[0],
                        tabId;

                    if (!item && isInitialUpdate) {
                        // On initialization of the widget get the tab by its index
                        item = items[idx];
                    }

                    if (item) {
                        // set the tab aria-controls attribute to the content ID
                        item.setAttribute(ARIA_CONTROLS, contentId);
                        tabId = item.id = _elementId($(item), idx, true);
                        this.setAttribute(ARIA_LABELLEDBY, tabId);
                    }

                    // set the get (possibly existing) ID on the content element
                    this.setAttribute("id", contentId);
                });
            }
            else {
                items.each(function(idx) {
                    var currentContent = contentElements.eq(idx),
                        contentId = _elementId(currentContent, idx),
                        tabId;

                    // set the tab aria-controls attribute to the content ID
                    this.setAttribute(ARIA_CONTROLS, contentId);

                    tabId = this.id = _elementId($(this), idx, true);

                    if (!currentContent.length && contentUrls[idx]) {
                        // Append content element in case contentUrl is used
                        $("<div class='" + CONTENT + "'/>")
                            .appendTo(that.wrapper)
                            .attr("id", contentId);

                        if (contentUrls[idx] == DOM_DATASOURCE_EMPTY) {
                            that._contentUrls[idx] = null;
                        }
                    } else {
                        // set the ID on the content element
                        currentContent.attr("id", contentId);
                    }

                    currentContent.attr("role", "tabpanel");
                    currentContent.attr("tabindex", "0");
                    currentContent.attr(ARIA_LABELLEDBY, tabId);
                    currentContent.filter(":not(." + ACTIVESTATE + ")").attr(ARIA_HIDDEN, true);
                });

                that._removeEmptyUrls();
            }

            if (that.options._enableDOMDataSource && isInitialUpdate) {
                items.each(function(idx) {
                    contentElements = that.wrapper.children("div:not(.k-tabstrip-items-wrapper)");

                    let currentContent = contentElements.eq(idx),
                        contentId = _elementId(currentContent, idx),
                        tabId;

                    // set the tab aria-controls attribute to the content ID
                    this.setAttribute(ARIA_CONTROLS, contentId);

                    if (!currentContent.length && contentUrls[idx]) {
                        $("<div class='" + CONTENT + "'/>")
                            .appendTo(that.wrapper)
                            .attr("id", contentId);

                        if (contentUrls[idx] == DOM_DATASOURCE_EMPTY) {
                            that._contentUrls[idx] = null;
                        }
                    }

                    currentContent.attr("role", "tabpanel");
                    currentContent.attr("tabindex", "0");
                    currentContent.attr(ARIA_LABELLEDBY, tabId);
                    currentContent.filter(":not(." + ACTIVESTATE + ")").attr(ARIA_HIDDEN, true);

                });

                that._removeEmptyUrls();
            }

            that.contentElements = that.contentAnimators = that.wrapper.children("div:not(.k-tabstrip-items-wrapper)"); // refresh the contents

            that.tabsHeight = outerHeight(that.tabGroup) +
                              parseInt(that.wrapper.css("border-top-width"), 10) +
                              parseInt(that.wrapper.css("border-bottom-width"), 10);

            if (kendo.kineticScrollNeeded && kendo.mobile.ui.Scroller) {
                kendo.touchScroller(that.contentElements);
                that.contentElements = that.contentElements.children(".km-scroll-container");
            }
        },

        _removeEmptyUrls: function() {
             let that = this;

             if (that._contentUrls.length) {
                that._contentUrls.forEach(function(url, idx) {
                      that._contentUrls[idx] = url == DOM_DATASOURCE_EMPTY ? null : url;
                });
             }
        },

        _wrapper: function() {
            var that = this;

            if (that.element.is("ul")) {
                that.wrapper = that.element.wrapAll("<div />").parent();
            } else {
                that.wrapper = that.element;
            }
        }
    });

    // client-side rendering
    extend(TabStrip, {
        renderItem: function(options) {
            options = extend({ tabStrip: {}, group: {} }, options);
            var empty = templates.empty,
                item = options.item,
                templateOptions = extend(options, {
                    image: item.imageUrl ? templates.image : empty,
                    sprite: item.spriteCssClass ? templates.sprite : empty,
                    textWrapper: templates.textWrapper,
                    itemActions: templates.itemActionsWrapperTemplate,
                }, rendering);

            if (item.template) {
                return templates.itemWrapper(templateOptions, kendo.template(item.template)(item.model));
            }

            return templates.item(templateOptions);
        },

        renderContent: function(options) {
            return templates.content(extend(options, rendering));
        }
    });

    kendo.ui.plugin(TabStrip);

})(window.kendo.jQuery);
export default kendo;

