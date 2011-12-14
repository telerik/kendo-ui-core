(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        DataSource = kendo.data.DataSource,
        MobileWidget = ui.MobileWidget,
        ITEM_SELECTOR = ".km-list > li",
        proxy = $.proxy,
        GROUP_TEMPLATE = kendo.template("<li>#= this.headerTemplate(data) #<ul>#= kendo.render(this.template, data.items)#</ul></li>"),
        FUNCTION = "function",
        CLICK = "click";

    function toggleItemActiveClass(e) {
        var item = $(e.currentTarget);
        if ($(e.target).closest("a" + kendo.roleSelector("listview-link"), item)[0]) {
            item.toggleClass("km-state-active", e.type === support.mousedown);
        }
    }

    function enhanceLinkItem(i, item) {
        item = $(item);

        if (!item.parent().contents().not(item)[0]) {
            item.addClass("km-listview-link")
                .attr(kendo.attr("role"), "listview-link");
        }
    }

    /**
    * @name kendo.ui.MobileListView.Description
    * @section The Kendo MobileListView widget is used to display flat or grouped list of items.
    * <p>It can be either used in unbound mode by enhancing an HTML <code>ul</code> element, or bound to a kendo.data.DataSource instance.</p>
    *
    * <h3>Getting Started</h3>
    * <p>The Kendo MobileApplication will automatically initialize the MobileListView for every <code>ul</code> element with <code>role</code> data attribute set to <code>listview</code> present in the views markup.
    * Alternatively, it can be initialized using a jQuery selector. The listview element can contain one or more <code>li</code> elements.</p>
    * @exampleTitle Initialize Kendo MobileListView based on role data attribute.
    * @example
    * <ul data-role="listview">
    *   <li>Foo</li>
    *   <li>Bar</li>
    * </ul>
    *
    * @exampleTitle Initialize Kendo MobileListView using a jQuery selector
    * @example
    * <ul id="listView"></ul>
    * <script>
    * var listView = $("#listView").kendoMobileListView();
    * </script>
    *
    * @section
    * <h3>Inset MobileListView</h3>
    * <p>In iOS, the MobileListView appearance can be changed to <strong>inset</strong>, to achieve an effect similar to iOS grouped tableviews, where the list items are padded from the container, and have rounded corners.
    * This can be accomplished by setting the <code>style</code> data attribute to <code>inset</code>. <strong>Note:</strong> This setting won't affect the appearance of the MobileListView on Android devices.</p>
    *
    * @exampleTitle Create Inset MobileListView
    * @example
    * <ul data-role="listview" data-style="inset">
    *   <li>Foo</li>
    *   <li>Bar</li>
    * </ul>
    *
    * @section
    * <h3>Grouped MobileListView</h3>
    * <p>The MobileListView can display items in groups, with optional headers. This can be achieved by nesting unordered list in items, and setting the <code>type</code> data attribute to <code>group</code>.</p>
    * @exampleTitle Create grouped MobileListView
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
    * The MobileListView can be bound to both local JavaScript arrays and remote data via the
    * Kendo DataSource component. Local JavaScript arrays are appropriate for limited value
    * options, while remote data binding is better for larger data sets.
    * </p>
    *
    * @exampleTitle Bind MobileListView to a local data source.
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
    *     MobileListView leverages Kendo UI high-performance Templates to give you complete control
    *     over item rendering. For a complete overview of Kendo UI Template capabilities and syntax,
    *     please review the <a href="../templates/index.html" title="Kendo UI Template">Kendo UI Template</a> demos and documentation.
    * </p>
    * @exampleTitle Basic item template customization
    * @example
    * <!-- HTML -->
    * <ul id="listview"></ul>
    *
    * <!-- MobileListView initialization -->
    * <script type="text/javascript">
    *     $(document).ready(function() {
    *         $("#listview").kendoMobileListView({
    *             template : "<strong>${data.foo}</strong>",
    *             dataSource: kendo.data.DataSource.create([{foo: "bar"}, {foo: "baz"}])
    *         });
    *     });
    * </script>
    */
    var MobileListView = MobileWidget.extend(/** @lends kendo.ui.MobileListView.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.MobileWidget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {kendo.data.DataSource|Object} [dataSource] Instance of DataSource or the data that the MobileListView will be bound to.
        * @option {String} [type] The type of the control. Can be either <code>flat</code> (default) or <code>group</code>. Determined automatically in databound mode.
        * @option {String} [style] The style of the control. Can be either empty string(""), or <code>inset</code>.
        * @option {String} [template] <${data}> The item template.
        * @option {String} [headerTemplate] <${value}> The header item template (applies for grouped mode).
        */
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that.element
                .delegate(ITEM_SELECTOR, support.mousedown + " " + support.mouseup, toggleItemActiveClass)
                .delegate(ITEM_SELECTOR, support.mouseup, proxy(that._click, that));

            if (options.dataSource) {
                that.dataSource = DataSource.create(options.dataSource).bind("change", $.proxy(that._refresh, that));
                that._template();
                that.dataSource.fetch();
            } else {
                that._style();
            }

            that.bind([
            /**
             * Fires when item is clicked
             * @name kendo.ui.MobileListView#click
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.item The selected list item
             * @param {jQueryObject} e.target The clicked DOM element
             * @param {Object} e.dataItem The corresponding dataItem associated with the item (available in databound mode only).
             * @param {String} e.buttonName The name of the clicked Kendo MobileButton. Specified by setting the <code>name</code> data attribute of the button widget.
             * @param {kendo.ui.MobileButton} e.button The clicked Kendo MobileButton
             *
             * @exampleTitle Handling button clicks
             * @example
             * <ul data-role="listview" id="foo">
             *     <li><a data-role="button" data-name="bar">Bar button</a> | <a data-role="button" data-name="baz">Baz button</a></li>
             * </ul>
             *
             * <script>
             *  $("#foo").data("kendoMobileListView").bind("click", function(e) {
             *      console.log(e.buttonName); // "foo" or "bar"
             *      console.log(e.button); // Kendo MobileButton instance
             *  }
             * </script>
             *
             * @exampleTitle Making dataItem available in events
             * @example
             * <ul id="foo"></ul>
             *
             * <script>
             *  // for the dataItem to be present in the click event, The datasource must have schema definition, specifying the model id field.
             *  $("#foo").kendoMobileListView({
             *     dataSource: new kendo.data.DataSource({
             *          data:   [{id: 1, title: "foo"}, {id: 2, title: "bar"}],
             *          schema: {model: {id: "id"}}
             *     }),
             *
             *     click: function(e) {
             *          console.log(e.dataItem.title);
             *     }
             *  });
             * </script>
             */
            CLICK
            ], options);
        },

        options: {
            name: "MobileListView",
            selector: kendo.roleSelector("listview"),
            type: "flat",
            template: "${data}",
            headerTemplate: "${value}",
            style: ""
        },

        _refresh: function() {
            var that = this,
                dataSource = that.dataSource,
                grouped,
                view = dataSource.view();

            if (dataSource.group()[0]) {
                that.options.type = "group";
                that.element.html(kendo.render(that.groupTemplate, view));
            } else {
                that.element.html(kendo.render(that.template, view));
            }

            kendo.mobile.enhance(that.element);

            that._style();
        },

        _template: function() {
            var that = this,
                template = that.options.template,
                headerTemplate = that.options.headerTemplate,
                model = that.dataSource.options.schema.model,
                modelID = model && model.id,
                dataIDAttribute = "",
                templateProxy = {},
                groupTemplateProxy = {};

            if (typeof modelID === "string") {
                dataIDAttribute = ' data-id="${' + modelID + '}"';
            } else if (typeof modelID === FUNCTION) {
                templateProxy.modelID = modelID;
                dataIDAttribute = ' data-id="${this.modelID(data)}"';
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
            var that = this,
                dataItem,
                item = $(e.currentTarget),
                target = $(e.target),
                button = target.closest("[" + kendo.attr("name") + "]", item),
                buttonName = button.data(kendo.ns + "name"),
                id = item.data("id");

            if (id) {
                dataItem = that.dataSource.get(id).data;
            }

            if (that.trigger(CLICK, {target: target, item: item, dataItem: dataItem, buttonName: buttonName, button: button.data("kendoMobileButton")})) {
                e.preventDefault();
            }
        },

        _style: function() {
            var that = this,
                options = that.options,
                grouped = options.type === "group",
                inset = options.style === "inset";

            that.element.addClass("km-listview")
                .toggleClass("km-list", !grouped)
                .toggleClass("km-listinset", !grouped && inset)
                .toggleClass("km-listgroup", grouped && !inset)
                .toggleClass("km-listgroupinset", grouped && inset)
                .find("a:only-child").each(enhanceLinkItem);

            if (grouped) {
                that.element
                    .children()
                    .children("ul")
                    .addClass("km-list");
            }

            that.element.parents(".km-content").toggleClass("km-insetcontent", inset); // iOS has white background when the list is not inset.
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
