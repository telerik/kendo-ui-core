(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        support = kendo.support,
        DataSource = kendo.data.DataSource,
        Widget = ui.Widget,
        ITEM_SELECTOR = ".km-list > li",
        HIGHLIGHT_SELECTOR = ".km-list > li > .km-listview-link, .km-list > li > .km-listview-label",
        HANDLED_INPUTS_SELECTOR = ".km-list > li > .km-listview-label > input",
        proxy = $.proxy,
        GROUP_CLASS = "km-group-title",
        GROUP_WRAPPER = '<div class="' + GROUP_CLASS + '"><span class="km-text"></span></div>',
        GROUP_TEMPLATE = kendo.template('<li><div class="' + GROUP_CLASS + '">#= this.headerTemplate(data) #</div><ul>#= kendo.render(this.template, data.items)#</ul></li>'),
        WRAPPER = '<div class="km-listview-wrapper" />',
        FUNCTION = "function",
        MOUSEDOWN = support.mousedown,
        MOUSEMOVE = support.mousemove,
        MOUSECANCEL = support.mousecancel,
        MOUSEUP = support.mouseup,
        CLICK = "click",
        REQUEST_START = "requestStart";

    function toggleItemActiveClass(e) {
        if (e.which > 1) {
            return;
        }

        var clicked = $(e.currentTarget),
            item = clicked.parent(),
            role = clicked.data(kendo.ns + "role") || "",
            plainItem = (!role.match(/button/)),
            prevented = e.originalEvent && e.originalEvent.defaultPrevented;

        if (plainItem) {
            item.toggleClass("km-state-active", e.type === MOUSEDOWN && !prevented);
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

    function enhanceLinkItem(i, item) {
        item = $(item);

        var parent = item.parent(),
            itemAndDetailButtons = item.add(parent.children("[data-" + kendo.ns + "role=detailbutton]"));

        if (parent.contents().not(itemAndDetailButtons)[0]) {
            return;
        }

        var icon = parent.data(kendo.ns + "icon"),
            iconSpan = $('<span class="km-icon"/>');

        item.addClass("km-listview-link")
            .attr(kendo.attr("role"), "listview-link");

        if (icon) {
            item.prepend(iconSpan);
            iconSpan.addClass("km-" + icon);
        }
    }

    function enhanceCheckBoxItem(i, label) {
        label = $(label);

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
    * Alternatively, it can be initialized using a jQuery selector. The mobile ListView element can contain one or more <code>li</code> elements.</p>
    * @exampleTitle Initialize mobile ListView using a role data attribute
    * @example
    * <ul data-role="listview">
    *   <li>Foo</li>
    *   <li>Bar</li>
    * </ul>
    *
    * @exampleTitle Initialize mobile ListView using a jQuery selector
    * @example
    * <ul id="listView"></ul>
    * <script>
    * var listView = $("#listView").kendoMobileListView();
    * </script>
    *
    * @section
    * <h3>Inset mobile ListView</h3>
    * <p>In iOS, the mobile ListView appearance can be changed to <strong>inset</strong>, to achieve an effect similar to iOS grouped table views,
    * where the list items are padded from the container, and have rounded corners.
    * This can be accomplished by setting the <code>style</code> data attribute to <code>inset</code>.
    * <strong>Note:</strong> This setting won't affect the appearance of the mobile ListView on Android devices.</p>
    *
    * @exampleTitle Create Inset mobile ListView
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
    * Kendo DataSource component. Local JavaScript arrays are appropriate for limited value
    * options, while remote data binding is better for larger data sets.
    * </p>
    *
    * @exampleTitle Bind mobile ListView to a local data source.
    * @example
    * $(document).ready(function() {
    *     $("#listview").kendoMobileListView({
    *         dataSource: kendo.data.DataSource.create(["foo", "bar", "baz"])
    *      });
    * });
    *
    * @section
    * <h3>Customizing Item Templates</h3>
    * <p>
    *     The mobile ListView leverages Kendo UI high-performance Templates to give you complete control
    *     over item rendering. For a complete overview of Kendo UI Template capabilities and syntax,
    *     please review the <a href="../templates/index.html" title="Kendo UI Template">Kendo UI Template</a> demos and documentation.
    * </p>
    * @exampleTitle Basic item template customization
    * @example
    * <ul id="listview"></ul>
    *
    * <script type="text/javascript">
    *     $(document).ready(function() {
    *         $("#listview").kendoMobileListView({
    *             template : "<strong>${data.foo}</strong>",
    *             dataSource: kendo.data.DataSource.create([{foo: "bar"}, {foo: "baz"}])
    *         });
    *     });
    * </script>
    *
    * @section
    * <h3>Item Icons</h3>
    * An icon can be set in two ways - either by adding an <code>img</code> element inside the <code>li</code> element, or by setting an <code>icon</code> data attribute to the <code>li</code> element.
    * if data attribute is used then an <code>a</code> element should be put in the <code>li</code> element. The icon class will be applied to the <code>a</code> element.
    * Kendo mobile comes out of the box with several ready to use icons:
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
    * <p>Additional icons may be added by defining the respective CSS class. If the <code>icon</code> data attribute is set to <code>custom</code>, the item will receive <code>km-custom</code> CSS class.  </p>
    *
    * @exampleTitle Define custom button icon.
    * @example
    * <style>
    * .km-custom {
    *   background-image: url("foo.jpg");
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
        * @option {kendo.data.DataSource|Object} [dataSource] Instance of DataSource or the data that the mobile ListView will be bound to.
        * @option {String}  [type] The type of the control. Can be either <code>flat</code> (default) or <code>group</code>. Determined automatically in databound mode.
        * @option {String}  [style] The style of the control. Can be either empty string(""), or <code>inset</code>.
        * @option {String}  [template] <${data}> The item template.
        * @option {String}  [headerTemplate] <${value}> The header item template (applies for grouped mode).
        * @option {Boolean} [pullToRefresh] <false> If set to true, the listview will reload its data when the user pulls the view over the top limit.
        * @option {Boolean} [appendOnRefresh] <false> Used in combination with pullToRefresh. If set to true, newly loaded data will be appended on top of old data when refershing.
        * @option {String}  [pullTemplate] <"Pull to refresh"> The message template displayed when the user pulls the listView. Applicable only when pullToRefresh is set to true.
        * @option {String}  [releaseTemplate] <"Release to refresh"> The message template indicating that pullToRefresh will occur. Applicable only when pullToRefresh is set to true.
        * @option {String}  [refreshTemplate] <"Refreshing"> The message template displayed during the refresh. Applicable only when pullToRefresh is set to true.
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that.element
                .on([MOUSEDOWN, MOUSEUP, MOUSEMOVE, MOUSECANCEL].join(" "), HIGHLIGHT_SELECTOR, toggleItemActiveClass)
                .on("click", HANDLED_INPUTS_SELECTOR, function (e) { e.preventDefault(); })
                .on(MOUSEUP, ITEM_SELECTOR, proxy(that._click, that));

            that._dataSource();

            if (options.dataSource) {
                that.dataSource.fetch();
            } else {
                that._style();
            }

            that.element.wrap(WRAPPER);
            that.wrapper = that.element.parent();
            if (options.loadMore) {
                that.wrapper.append('<span class="km-scroller-pull"><span class="km-icon"></span><button class="km-load-more">' + options.loadMoreText + '</button></span>');
                that._loadMoreButton = that.wrapper
                                           .children(".km-scroller-pull")
                                           .children(".km-load-more")
                                           .click(function() {
                                               that._pressed = true;
                                               that.dataSource.next();
                                           });
            }

            kendo.notify(that, ui);
        },

        events: [
            /**
             * Fires when item is clicked
             * @name kendo.mobile.ui.ListView#click
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.item The selected list item.
             * @param {jQueryObject} e.target The clicked DOM element.
             * @param {Object} e.dataItem The corresponding dataItem associated with the item (available in databound mode only).
             * Note: The dataItem must be from a non-primitive type (Object).
             * @param {kendo.ui.MobileButton} e.button The clicked Kendo mobile Button.
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
            template: "${data}",
            loadMore: false,
            loadMoreText: "Press to load more",
            pullToRefresh: false,
            appendOnRefresh: false,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing",
            headerTemplate: '<span class="km-text">${value}</span>',
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

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler)
                               .unbind(REQUEST_START, that._showLoadingProxy);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                                        .bind("change", that._refreshHandler);

            if (that._showLoadingProxy && !that.options.pullToRefresh) {
                that.dataSource.bind(REQUEST_START, that._showLoadingProxy);
            }
        },

        viewInit: function(view) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                application = view.application;

            that.scroller = view.scroller;
            that._hideLoadingProxy = proxy(application.hideLoading, application);
            that._showLoadingProxy = proxy(application.showLoading, application);

            if (!options.pullToRefresh) {
                dataSource.bind(REQUEST_START, that._showLoadingProxy);
            }

            if (options.pullToRefresh) {
                that.scroller.setOptions({
                    pullToRefresh: true,
                    pull: function() { dataSource.read(); },
                    pullTemplate: options.pullTemplate,
                    releaseTemplate: options.releaseTemplate,
                    refreshTemplate: options.refreshTemplate
                });
            }
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
                dataSource = that.dataSource,
                element = that.element,
                appendMethod = that.options.appendOnRefresh ? "prepend" : "html",
                contents,
                data,
                item,
                view = dataSource.view();

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

            that._templates();
            that.trigger("dataBinding");

            if (dataSource.group()[0]) {
                that.options.type = "group";
                contents = kendo.render(that.groupTemplate, view);
            } else {
                contents = kendo.render(that.template, view);
            }

            if (that._pressed) {
                that._pressed = false;
                appendMethod = "append";
            }

            element[appendMethod](contents);

            if (that.options.pullToRefresh) {
                that.scroller.pullHandled();
            }

            kendo.mobile.init(element.children());

            if (that._hideLoadingProxy) {
                that._hideLoadingProxy();
            }

            that._style();
            that.trigger("dataBound", { ns: ui });
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
            if (e.which > 1 || (e.originalEvent && e.originalEvent.defaultPrevented)) {
                return;
            }

            var that = this,
                dataItem,
                item = $(e.currentTarget),
                target = $(e.target),
                button = target.closest("[" + kendo.attr("name") + "]", item),
                id = item.attr(kendo.attr("uid"));

            if (id) {
                dataItem = that.dataSource.getByUid(id);
            }

            if (that.trigger(CLICK, {target: target, item: item, dataItem: dataItem, button: button.data("kendoMobileButton")})) {
                e.preventDefault();
            }
        },

        items: function() {
            if (this.options.type === "group") {
                return this.element.find(".km-list").children();
            } else {
                return this.element.children();
            }
        },

        _style: function() {
            var that = this,
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

                element.find(">li").each(function() {
                    var groupHeader = $(this).contents().first();
                    if (!groupHeader.is("ul") && !groupHeader.is("div." + GROUP_CLASS)) {
                        groupHeader.wrap(GROUP_WRAPPER);
                    }
                });
            }

            that.items().find(">a").each(enhanceLinkItem);
            that.items().find(">label").each(enhanceCheckBoxItem);

            element.closest(".km-content").toggleClass("km-insetcontent", inset); // iOS has white background when the list is not inset.
        }
    });

    ui.plugin(ListView);
})(jQuery);
