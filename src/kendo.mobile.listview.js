(function($, undefined) {
    var kendo = window.kendo,
        Node = window.Node,
        mobile = kendo.mobile,
        ui = mobile.ui,
        support = kendo.support,
        DataSource = kendo.data.DataSource,
        Widget = ui.Widget,
        ITEM_SELECTOR = ".km-list > li",
        HIGHLIGHT_SELECTOR = ".km-list > li > .km-listview-link, .km-list > li > .km-listview-label",
        HANDLED_INPUTS_SELECTOR = ".km-list > li > .km-listview-label > input",
        proxy = $.proxy,
        data = kendo.data,
        GROUP_CLASS = "km-group-title",
        ACTIVE_CLASS = "km-state-active",
        GROUP_WRAPPER = '<div class="' + GROUP_CLASS + '"><span class="km-text"></span></div>',
        GROUP_TEMPLATE = kendo.template('<li><div class="' + GROUP_CLASS + '">#= this.headerTemplate(data) #</div><ul>#= kendo.render(this.template, data.items)#</ul></li>'),
        WRAPPER = '<div class="km-listview-wrapper" />',

        MOUSEDOWN = support.mousedown,
        MOUSEMOVE = support.mousemove,
        MOUSECANCEL = support.mousecancel,
        MOUSEUP = support.mouseup,

        CLICK = "click",
        REQUEST_START = "requestStart",
        FUNCTION = "function",

        whitespaceRegExp = /^\s+$/,
        buttonRegExp = /button/;

    function toggleItemActiveClass(e) {
        if (e.which > 1) {
            return;
        }

        var clicked = $(e.currentTarget),
            item = clicked.parent(),
            role = data(clicked, "role") || "",
            plainItem = (!role.match(buttonRegExp)),
            prevented = e.isDefaultPrevented();

        if (plainItem) {
            item.toggleClass(ACTIVE_CLASS, e.type === MOUSEDOWN && !prevented);
        }

        if (clicked.is("label") && e.type === MOUSEUP && !prevented) {
            var input = clicked.find("input"),
                type = input.attr("type"),
                value = !input[0].checked;

            if (type === "radio") {
                value = true;
            }

            input[0].checked = value;
        }
    }

    function whitespace() {
        return this.nodeType === Node.TEXT_NODE && this.nodeValue.match(whitespaceRegExp);
    }

    function addIcon(item, icon) {
        if (icon) {
            item.prepend('<span class="km-icon km-' + icon + '"/>');
        }
    }

    function enhanceItem(item) {
        addIcon(item, data(item, "icon"));
    }

    function enhanceLinkItem(item) {
        var parent = item.parent(),
            itemAndDetailButtons = item.add(parent.children(kendo.roleSelector("detailbutton"))),
            otherNodes = parent.contents().not(itemAndDetailButtons).not(whitespace);

        if (otherNodes.length) {
            return;
        }

        item.addClass("km-listview-link")
            .attr(kendo.attr("role"), "listview-link");

        addIcon(item, data(parent, "icon"));
    }

    function enhanceCheckBoxItem(label) {
        if (!label.children("input[type=checkbox],input[type=radio]").length) {
            return;
        }

        var item = label.parent();

        if (item.contents().not(label).not(function() { return this.nodeType == 3; })[0]) {
            return;
        }

        label.addClass("km-listview-label");
    }

    /**
     * @name kendo.mobile.ui.ListView.Description
     * @section
     * <p>The Kendo Mobile ListView widget is used to display flat or grouped list of items.
     * It can be either used in unbound mode by enhancing an HTML <code>ul</code> element, or bound to a DataSource instance.</p>
     *
     * <h3>Getting Started</h3>
     * <p>The Kendo mobile Application automatically initializes the mobile ListView for every <code>ul</code> element with <code>role</code> data attribute set to
     * <code>listview</code> present in the views' markup.
     * Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View <strong>init event handler</strong>.
     * The mobile ListView element may contain one or more <code>li</code> elements.</p>
     *
     * @exampleTitle Initialize mobile ListView using a role data attribute
     * @example
     * <ul data-role="listview">
     *   <li>Foo</li>
     *   <li>Bar</li>
     * </ul>
     *
     * @exampleTitle Initialize mobile ListView using jQuery plugin syntax
     * @example
     * <div data-role="view" data-init="initListView">
     *  <ul id="listView"></ul>
     * </div>
     *
     * <script>
     * function initListView(e) {
     *  e.view.element.find("#listView").kendoMobileListView();
     * }
     * </script>
     *
     * @section
     * <h3>Inset Mobile ListView</h3>
     * <p>In iOS, the mobile ListView appearance can be changed to <strong>inset</strong>, to achieve an effect similar to iOS grouped table views,
     * where the list items are padded from the container, and have rounded corners.
     * To do so, set the <code>style</code> data attribute to <code>inset</code>.
     * <strong>Note:</strong> This setting won't affect the appearance of the mobile ListView on Android/Blackberry devices.</p>
     *
     * @exampleTitle Create inset mobile ListView
     * @example
     * <ul data-role="listview" data-style="inset">
     *   <li>Foo</li>
     *   <li>Bar</li>
     * </ul>
     *
     * @section
     * <h3>Grouped mobile ListView</h3>
     * <p>The mobile ListView can display items in groups, with optional headers. This can be achieved by nesting unordered lists in items,
     * and setting the widget's element <code>type</code> data attribute to <code>group</code>.</p>
     * @exampleTitle Create grouped mobile ListView
     * @example
     * <ul data-role="listview" data-type="group">
     *     <li>
     *         Foo
     *         <ul>
     *             <li>Bar</li>
     *             <li>Baz</li>
     *         </ul>
     *     </li>
     *     <li>
     *         Bar
     *         <ul>
     *             <li>Bar</li>
     *             <li>Qux</li>
     *         </ul>
     *     </li>
     * </ul>
     *
     * @section
     * <h3>Binding to Data</h3>
     *
     * <p>
     * The mobile ListView can be bound to both local JavaScript arrays and remote data via the
     * <strong>Kendo DataSource component</strong>. Local JavaScript arrays are appropriate for limited value
     * options, while remote data binding is better for larger data sets.
     * </p>
     *
     * @exampleTitle Bind mobile ListView to a local data source.
     * @example
     * function initListView(e) {
     *     e.view.element.find("#listview").kendoMobileListView({
     *         dataSource: kendo.data.DataSource.create(["foo", "bar", "baz"])
     *      });
     * });
     *
     * @section
     * <h3>Customizing Item Templates</h3>
     * <p>
     *     The mobile ListView leverages Kendo UI high-performance Templates to provide complete control
     *     over item rendering. For a complete overview of Kendo UI Template capabilities and syntax,
     *     please review the <a href="http://www.kendoui.com/documentation/framework/templates/" title="Kendo UI Template">Kendo UI Templates</a> documentation.
     * </p>
     *
     * @exampleTitle Basic item template customization
     * @example
     * <ul id="listview"></ul>
     *
     * <script type="text/javascript">
     *     function initListView(e) {
     *         e.view.element.find("#listview").kendoMobileListView({
     *             template : "<strong>#:data.foo#</strong>",
     *             dataSource: kendo.data.DataSource.create([{foo: "bar"}, {foo: "baz"}])
     *         });
     *     });
     * </script>
     *
     * @section
     * <h3>Link Items</h3>
     * <p>The mobile ListView will automatically style items with a single link element inside, adding a details indicator. </p>
     *
     * @exampleTitle ListView with link items
     * @example
     * <ul data-role="listview">
     *   <li><a href="#foo">Foo</a></li>
     *   <li><a href="#bar">Bar</a></li>
     * </ul>
     *
     * @section
     * <h3>Detail Buttons</h3>
     * <p>Mobile ListView integrates with nested DetailButton widgets. These buttons are best suited when the user should be able to execute more than one action on a given row.
     * Detail buttons support 4 default data-styles: <b>contactadd</b>, <b>detaildisclose</b>, <b>rowinsert</b> and <b>rowdelete</b>, along custom icons
     * through the data-icon attribute. One row can contain both regular links and detail buttons.</p>
     *
     * @exampleTitle ListView with Detail Buttons
     * @example
     * <ul data-role="listview" data-style="inset" data-type="group">
     *     <li>
     *         Default button styles
     *         <ul>
     *             <li>Contact Add<a data-role="detailbutton" data-style="contactadd"></a></li>
     *             <li>Detail Disclose<a data-role="detailbutton" data-style="detaildisclose"></a></li>
     *             <li>Row Insert<a data-role="detailbutton" data-style="rowinsert"></a></li>
     *             <li>Row Delete<a data-role="detailbutton" data-style="rowdelete"></a></li>
     *         </ul>
     *     </li>
     *     <li>
     *         Custom icons
     *         <ul>
     *             <li>Battery level<a data-role="detailbutton" data-icon="battery"></a></li>
     *         </ul>
     *     </li>
     *     <li>
     *         Link Items & Detail Buttons
     *         <ul>
     *             <li><a>Row Insert</a><a data-role="detailbutton" data-style="rowinsert"></a></li>
     *             <li><a>Battery Level</a><a data-role="detailbutton" data-icon="battery"></a></li>
     *         </ul>
     *     </li>
     * </ul>
     *
     * @section
     * <h3>Item Icons</h3>
     *
     * <p>An icon can be set in two ways - either by adding an <code>img</code> element inside the <code>li</code> element, or by setting an <code>icon</code> data attribute to the <code>li</code> element.
     * if data attribute is used then an <code>a</code> element should be put in the <code>li</code> element. The icon class will be applied to the <code>a</code> element.
     * Kendo mobile ships with several ready to use icons:</p>
     *
     * <ul id="icon-list">
     *   <li title=".km-about"><span class="km-icon km-about"></span>about</li>
     *   <li title=".km-action"><span class="km-icon km-action"></span>action</li>
     *   <li title=".km-add"><span class="km-icon km-add"></span>add</li>
     *   <li title=".km-bookmarks"><span class="km-icon km-bookmarks"></span>bookmarks</li>
     *   <li title=".km-camera"><span class="km-icon km-camera"></span>camera</li>
     *   <li title=".km-cart"><span class="km-icon km-cart"></span>cart</li>
     *   <li title=".km-compose"><span class="km-icon km-compose"></span>compose</li>
     *   <li title=".km-contacts"><span class="km-icon km-contacts"></span>contacts</li>
     *   <li title=".km-details"><span class="km-icon km-details"></span>details</li>
     *   <li title=".km-downloads"><span class="km-icon km-downloads"></span>downloads</li>
     *   <li title=".km-fastforward"><span class="km-icon km-fastforward"></span>fastforward</li>
     *   <li title=".km-favorites"><span class="km-icon km-favorites"></span>favorites</li>
     *   <li title=".km-featured"><span class="km-icon km-featured"></span>featured</li>
     *   <li title=".km-featured"><span class="km-icon km-toprated"></span>toprated</li>
     *   <li title=".km-globe"><span class="km-icon km-globe"></span>globe</li>
     *   <li title=".km-history"><span class="km-icon km-history"></span>history</li>
     *   <li title=".km-home"><span class="km-icon km-home"></span>home</li>
     *   <li title=".km-info"><span class="km-icon km-info"></span>info</li>
     *   <li title=".km-more"><span class="km-icon km-more"></span>more</li>
     *   <li title=".km-mostrecent"><span class="km-icon km-mostrecent"></span>mostrecent</li>
     *   <li title=".km-mostviewed"><span class="km-icon km-mostviewed"></span>mostviewed</li>
     *   <li title=".km-organize"><span class="km-icon km-organize"></span>organize</li>
     *   <li title=".km-pause"><span class="km-icon km-pause"></span>pause</li>
     *   <li title=".km-play"><span class="km-icon km-play"></span>play</li>
     *   <li title=".km-recents"><span class="km-icon km-recents"></span>recents</li>
     *   <li title=".km-refresh"><span class="km-icon km-refresh"></span>refresh</li>
     *   <li title=".km-reply"><span class="km-icon km-reply"></span>reply</li>
     *   <li title=".km-rewind"><span class="km-icon km-rewind"></span>rewind</li>
     *   <li title=".km-search"><span class="km-icon km-search"></span>search</li>
     *   <li title=".km-settings"><span class="km-icon km-settings"></span>settings</li>
     *   <li title=".km-share"><span class="km-icon km-share"></span>share</li>
     *   <li title=".km-stop"><span class="km-icon km-stop"></span>stop</li>
     *   <li title=".km-trash"><span class="km-icon km-trash"></span>trash</li>
     * </ul>
     *
     * <p>Additional icons may be added by defining the respective CSS class.
     * If the <code>icon</code> data attribute is set to <code>custom</code>, the tab will receive <code>km-custom</code> CSS class.
     *
     * <h3>Creating Custom Icons</h3>
     *
     * <p>In order to create colorizable icons like the default ones in Kendo UI Mobile, specify the icon image as a <b>box mask</b>
     * (either as dataURI or as a separate image). The image should be <b>PNG8</b> or <b>PNG24</b> with alpha channel (<b>PNG8+Alpha</b> is supported by
     * only few graphic editors, so <b>better stick with PNG24</b>). The image color is not important - it will be used as a mask only.</p>
     *
     * <p><strong>Note</strong>: <strong>BlackBerry 7.0</strong> has a bug that renders its masks as background-image, so it is recommended to use white in order to support it. The bug is fixed in <strong>7.1</strong>.</p>
     *
     * @exampleTitle Define custom list item icon
     * @example
     * <style>
     * .km-custom {
     *   -webkit-mask-box-image: url("foo.png");
     * }
     * </style>
     *
     * <ul data-role="listview" data-style="inset">
     *   <li data-icon="custom">
     *      <a>Home</a>
     *   </li>
     *   <li>
     *      Bar
     *   </li>
     * </ul>
     */
    var ListView = Widget.extend(/** @lends kendo.mobile.ui.ListView.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {kendo.data.DataSource | Object} [dataSource] Instance of DataSource or the data that the mobile ListView will be bound to.
         * @option {String}  [type] The type of the control. Can be either <code>flat</code> (default) or group. Determined automatically in databound mode.
         * @option {String}  [style] The style of the control. Can be either empty string(""), or inset.
         * @option {String}  [template] <#:data#> The item template.
         * @option {String}  [headerTemplate] <#:value#> The header item template (applicable when the type is set to group).
         * @option {Boolean}  [fixedHeaders] <false> If set to true, the group headers will persist their position when the user scrolls through the listview. Applicable only when the type is set to group, or when binding to grouped datasource.
         * @option {Boolean} [pullToRefresh] <false> If set to true, the listview will reload its data when the user pulls the view over the top limit.
         * @option {Boolean} [appendOnRefresh] <false> Used in combination with pullToRefresh. If set to true, newly loaded data will be appended on top when refershing.
         * @option {String}  [pullTemplate] <"Pull to refresh"> The message template displayed when the user pulls the listView. Applicable only when pullToRefresh is set to true.
         * @option {String}  [releaseTemplate] <"Release to refresh"> The message template indicating that pullToRefresh will occur. Applicable only when pullToRefresh is set to true.
         * @option {String}  [refreshTemplate] <"Refreshing"> The message template displayed during the refresh. Applicable only when pullToRefresh is set to true.
         * @option {Boolean} [loadMore] <false> If set to true, a button is rendered at the bottom of the listview, which fetch the next page of data when tapped.
         * @option {String}  [loadMoreText] <"Press to load more"> The text of the rendered load-more button (applies only if loadMore is set to true).
         * @option {Boolean} [endlessScroll] <false> If set to true, the listview gets the next page of data when the user scrolls near the bottom of the view.
         * @option {String}  [scrollTreshold] <30> The distance to the bottom in pixels, after which the listview will start fetching the next page. Applicable only when endlessScroll is set to true.
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that.element
                .on([MOUSEDOWN, MOUSEUP, MOUSEMOVE, MOUSECANCEL].join(" "), HIGHLIGHT_SELECTOR, toggleItemActiveClass)
                .on("click", HANDLED_INPUTS_SELECTOR, function (e) { e.preventDefault(); })
                .on(MOUSEUP, ITEM_SELECTOR, proxy(that._click, that));

            that.element.wrap(WRAPPER);
            that.wrapper = that.element.parent();

            that._footer();

            that._dataSource();

            that._bindScroller();

            that._fixHeaders();

            if (options.dataSource) {
                that.dataSource.fetch();
            } else {
                that._style();
            }

            kendo.notify(that, ui);
        },

        events: [
            /**
             * Fires when item is tapped.
             * @name kendo.mobile.ui.ListView#click
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.item The selected list item.
             * @param {jQueryObject} e.target The tapped DOM element.
             * @param {Object} e.dataItem The corresponding dataItem associated with the item (available in databound mode only).
             * Note: The dataItem must be from a non-primitive type (Object).
             * @param {kendo.mobile.ui.Button} e.button The tapped Kendo mobile Button (if present).
             *
             * @exampleTitle Handling button clicks
             * @example
             * <ul data-role="listview" id="foo" data-click="listViewClick">
             *     <li><a data-role="button" data-name="bar">Bar button</a> | <a data-role="button" data-name="baz">Baz button</a></li>
             * </ul>
             *
             * <script>
             *  function listViewClick(e) {
             *      console.log(e.button); // Kendo mobile Button instance
             *  }
             * </script>
             *
             * @exampleTitle Accessing dataItem in event
             * @example
             * <ul id="foo"></ul>
             *
             * <script>
             *  $("#foo").kendoMobileListView({
             *     dataSource: new kendo.data.DataSource({
             *          data:   [{title: "foo"}, {title: "bar"}]
             *     }),
             *
             *     click: function(e) {
             *          console.log(e.dataItem.title);
             *     }
             *  });
             * </script>
             */
            CLICK
        ],

        options: {
            name: "ListView",
            type: "flat",
            fixedHeaders: false,
            template: "#:data#",
            headerTemplate: '<span class="km-text">#:value#</span>',
            appendOnRefresh: false,
            loadMore: false,
            loadMoreText: "Press to load more",
            endlessScroll: false,
            scrollTreshold: 30,
            pullToRefresh: false,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing",
            pullOffset: 140,
            style: ""
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();
            dataSource.fetch();
        },

        /**
         * Repaints the listview (works only in databound mode).
         * @example
         * // get a reference to the mobile listview widget
         * var listView = $("#listView").data("kendoMobileListView");
         * // refreshes the listview
         * listview.refresh();
         */
        refresh: function(e) {
            e = e || {};

            var that = this,
                element = that.element,
                options = that.options,
                dataSource = that.dataSource,
                view = dataSource.view(),
                loading = that.loading,
                appendMethod = loading ? "append" : "html",
                contents,
                data,
                item;

            if (e.action === "itemchange") {
                data = e.items[0];
                item = $(that.template(data));

                element.find("[data-" + kendo.ns + "uid=" + data.uid + "]").replaceWith(item);

                that.trigger("itemChange", {
                    item: item,
                    data: data,
                    ns: ui
                });

                return;
            }

            if (!that.template) {
                that._templates();
            }

            that.trigger("dataBinding");

            if (dataSource.group()[0]) {
                options.type = "group";
                contents = kendo.render(that.groupTemplate, view);
            } else {
                contents = kendo.render(that.template, view);
            }

             if (options.appendOnRefresh) {
                appendMethod = "prepend";
            }

            element[appendMethod](contents);

            if (loading) {
                that.loading = false;

                if (options.loadMore) {
                    that._toggleButton(true);
                } else {
                    that._toggleIcon(false);
                }
            }

            if (options.pullToRefresh) {
                that._scroller().pullHandled();
            }

            mobile.init(element.children());

            that._hideLoading();

            that._shouldFixHeaders();
            that._style();

            that.trigger("dataBound", { ns: ui });
        },

        /**
         * Get the listview DOM element items
         * @returns {jQueryObject} The listview DOM element items
         */
        items: function() {
            if (this.options.type === "group") {
                return this.element.find(".km-list").children();
            } else {
                return this.element.children();
            }
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                showLoading = $.proxy(that._showLoading, that);

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler)
                               .unbind(REQUEST_START, showLoading);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = DataSource.create(options.dataSource)
                                        .bind("change", that._refreshHandler);

            if (!options.pullToRefresh && !options.loadMore && !options.endlessScroll) {
                that.dataSource.bind(REQUEST_START, showLoading);
            }
        },

        _fixHeader: function(e) {
            var i = 0,
                that = this,
                scroller = that._scroller(),
                scrollTop = e.scrollTop,
                headers = that.headers,
                headerPair,
                offset,
                header;

            if (that.fixedHeaders) {
                do {
                    headerPair = headers[i++];
                    if (!headerPair) {
                        header = $("<div />");
                        break;
                    }
                    offset = headerPair.offset;
                    header = headerPair.header;
                } while (offset > scrollTop);

                if (that.currentHeader != i) {
                    scroller.fixedContainer.html(header.clone());
                    that.currentHeader = i;
                }
            }
        },

        _shouldFixHeaders: function() {
            this.fixedHeaders = this.options.type === "group" && this.options.fixedHeaders;
        },

        _cacheHeaders: function() {
            var that = this,
                headers = [];

            if (that.fixedHeaders) {
                that.element.find("." + GROUP_CLASS).each(function(_, header) {
                    header = $(header);
                    headers.unshift({
                        offset: header.position().top,
                        header: header
                    });
                });

                that.headers = headers;
                that._fixHeader({scrollTop: 0});
            }
        },

        _fixHeaders: function() {
            var that = this,
                scroller = that._scroller();

            that._shouldFixHeaders();

            if (scroller) {
                kendo.onResize(function(){
                    that._cacheHeaders();
                });

                scroller.bind("scroll", function(e) {
                    that._fixHeader(e);
                });
            }
        },

        _bindScroller: function() {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                scroller = that._scroller();

            if (!scroller) {
                return;
            }

            if (options.pullToRefresh) {
                scroller.setOptions({
                    pullToRefresh: true,
                    pull: function() { dataSource.read(); },
                    pullTemplate: options.pullTemplate,
                    releaseTemplate: options.releaseTemplate,
                    refreshTemplate: options.refreshTemplate
                });
            }

            if (options.endlessScroll) {
                that._scrollHeight = scroller.element.height();

                scroller.setOptions({
                    resize: function() {
                        that._scrollHeight = scroller.element.height();
                        that._calcTreshold();
                    },
                    scroll: function(e) {
                        if (!that.loading && e.scrollTop + that._scrollHeight > that._treshold) {
                            that.loading = true;
                            that._toggleIcon(true);
                            dataSource.next();
                        }
                    }
                });
            }
        },

        _calcTreshold: function() {
            var that = this,
                scroller = that._scroller();

            if (scroller) {
                that._treshold = scroller.scrollHeight() - that.options.scrollTreshold;
            }
        },

        _templates: function() {
            var that = this,
                template = that.options.template,
                headerTemplate = that.options.headerTemplate,
                dataIDAttribute = "",
                templateProxy = {},
                groupTemplateProxy = {};

            if (that.dataSource.group()[0] || that.dataSource.view()[0] instanceof kendo.data.ObservableObject) {
                dataIDAttribute = ' data-uid="#=uid#"';
            }

            if (typeof template === FUNCTION) {
                templateProxy.template = template;
                template = "#=this.template(data)#";
            }

            groupTemplateProxy.template = that.template = $.proxy(kendo.template("<li" + dataIDAttribute + ">" + template + "</li>"), templateProxy);

            if (typeof headerTemplate === FUNCTION) {
                groupTemplateProxy._headerTemplate = headerTemplate;
                headerTemplate = "#=this._headerTemplate(data)#";
            }

            groupTemplateProxy.headerTemplate = kendo.template(headerTemplate);

            that.groupTemplate = $.proxy(GROUP_TEMPLATE, groupTemplateProxy);
        },

        _click: function(e) {
            if (e.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            var that = this,
                dataItem,
                item = $(e.currentTarget),
                target = $(e.target),
                buttonElement = target.closest(kendo.roleSelector("button", "detailbutton", "backbutton")),
                button = kendo.widgetInstance(buttonElement, ui),
                id = item.attr(kendo.attr("uid"));

            if (id) {
                dataItem = that.dataSource.getByUid(id);
            }

            if (that.trigger(CLICK, {target: target, item: item, dataItem: dataItem, button: button})) {
                e.preventDefault();
            }
        },

        _style: function() {
            var that = this,
                items, i, len, node, nodeName,
                options = that.options,
                grouped = options.type === "group",
                element = that.element,
                inset = options.style === "inset";

            element.addClass("km-listview")
                .toggleClass("km-list", !grouped)
                .toggleClass("km-listinset", !grouped && inset)
                .toggleClass("km-listgroup", grouped && !inset)
                .toggleClass("km-listgroupinset", grouped && inset);

            if (grouped) {
                element
                    .children()
                    .children("ul")
                    .addClass("km-list");

                element.children("li").each(function() {
                    var groupHeader = $(this).contents().first();
                    if (!groupHeader.is("ul") && !groupHeader.is("div." + GROUP_CLASS)) {
                        groupHeader.wrap(GROUP_WRAPPER);
                    }
                });
            }

            that._enhanceItems();

            element.closest(".km-content").toggleClass("km-insetcontent", inset); // iOS has white background when the list is not inset.

            that._cacheHeaders();
        },

        _enhanceItems: function() {
            items = this.items();

            items.each(function() {
                var item = $(this),
                    child,
                    enhanced = false;

                item.children().each(function() {
                    child = $(this);
                    if (child.is("a")) {
                        enhanceLinkItem(child);
                        enhanced = true;
                    } else if (child.is("label")) {
                       enhanceCheckBoxItem(child);
                       enhanced = true;
                    }
                });

                if (!enhanced) {
                    enhanceItem(item);
                }
            });
        },

        _footer: function() {
            var that = this,
                options = that.options,
                loadMore = options.loadMore,
                loadWrapper;

            if (loadMore || options.endlessScroll) {
                that._loadIcon = $('<span style="display:none" class="km-icon"></span>');
                loadWrapper = $('<span class="km-load-more"></span>').append(that._loadIcon);

                if (loadMore) {
                    that._loadButton = $('<button class="km-load km-button">' + options.loadMoreText + '</button>')
                                        .click(function() {
                                           that.loading = true;
                                           that._toggleButton(false);
                                           that.dataSource.next();
                                        });

                    loadWrapper.append(that._loadButton);
                }

                that.wrapper.append(loadWrapper);
            }
        },

        _toggleButton: function(toggle) {
            this._loadButton.toggle(toggle);
            this._toggleIcon(!toggle);
        },

        _toggleIcon: function(toggle) {
            var icon = this._loadIcon;

            if (toggle) {
                icon.css("display", "block");
            } else {
                icon.hide();
            }
        },

        _scroller: function() {
            var that = this, view;

            if (!that._scrollerInstance) {
                view = that.view();
                that._scrollerInstance = view && view.scroller;
            }

            return that._scrollerInstance;
        },

        _showLoading: function() {
            var view = this.view();
            if (view) {
                view.loader.show();
            }
        },

        _hideLoading: function() {
            var view = this.view();
            if (view) {
                view.loader.hide();
            }
        }
    });

    ui.plugin(ListView);
})(jQuery);
