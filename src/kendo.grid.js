(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Groupable = kendo.ui.Groupable,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Widget = ui.Widget,
        keys = kendo.keys,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        map = $.map,
        isArray = $.isArray,
        proxy = $.proxy,
        math = Math,
        REQUESTSTART = "requestStart",
        ERROR = "error",
        ROW_SELECTOR = "tbody>tr:not(.k-grouping-row):visible",
        CELL_SELECTOR =  ROW_SELECTOR + ">td:not(.k-group-cell)",
        FIRST_CELL_SELECTOR = CELL_SELECTOR + ":first",
        DETAILINIT = "detailInit",
        CHANGE = "change",
        MODELCHANGE = "modelChange",
        DATABOUND = "dataBound",
        DETAILEXPAND = "detailExpand",
        DETAILCOLLAPSE = "detailCollapse",
        FOCUSED = "k-state-focused",
        FOCUSABLE = "k-focusable",
        SELECTED = "k-state-selected",
        CLICK = "click",
        HEIGHT = "height",
        TABINDEX = "tabIndex",
        FUNCTION = "function",
        STRING = "string";

    var VirtualScrollable =  Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            that.dataSource = options.dataSource;
            that.dataSource.bind(CHANGE, proxy(that.refresh, that));
            that.wrap();
        },

        options: {
            name: "VirtualScrollable",
            itemHeight: $.noop
        },

        wrap: function() {
            var that = this,
                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                scrollbar = kendo.support.scrollbar() + 1,
                element = that.element;

            element.css( {
                width: "auto",
                paddingRight: scrollbar,
                overflow: "hidden"
            });
            that.content = element.children().first();
            that.wrapper = that.content.wrap('<div class="k-virtual-scrollable-wrap"/>')
                                .parent()
                                .bind("DOMMouseScroll", proxy(that._wheelScroll, that))
                                .bind("mousewheel", proxy(that._wheelScroll, that));

            that.verticalScrollbar = $('<div class="k-scrollbar k-scrollbar-vertical" />')
                                        .css({
                                            width: scrollbar
                                        }).appendTo(element)
                                        .bind("scroll", proxy(that._scroll, that));
        },

        _wheelScroll: function(e) {
            var that = this,
                scrollTop = that.verticalScrollbar.scrollTop(),
                originalEvent = e.originalEvent,
                delta;

            e.preventDefault();

            if (originalEvent.wheelDelta) {
                delta = originalEvent.wheelDelta;
            } else if (originalEvent.detail) {
                delta = -originalEvent.detail;
            } else if ($.browser.opera) {
                delta = -originalEvent.wheelDelta;
            }
            that.verticalScrollbar.scrollTop(scrollTop + (-delta));
        },

        _scroll: function(e) {
            var that = this,
                scrollTop = e.currentTarget.scrollTop,
                dataSource = that.dataSource,
                rowHeight = that.itemHeight,
                skip = dataSource.skip() || 0,
                start = that._rangeStart || skip,
                height = that.element.innerHeight(),
                isScrollingUp = !!(that._scrollbarTop && that._scrollbarTop > scrollTop),
                firstItemIndex = math.max(math.floor(scrollTop / rowHeight), 0),
                lastItemIndex = math.max(firstItemIndex + math.floor(height / rowHeight), 0);

            that._scrollTop = scrollTop - (start * rowHeight);
            that._scrollbarTop = scrollTop;

            if (!that._fetch(firstItemIndex, lastItemIndex, isScrollingUp)) {
                that.wrapper[0].scrollTop = that._scrollTop;
            }
        },

        _fetch: function(firstItemIndex, lastItemIndex, scrollingUp) {
            var that = this,
                dataSource = that.dataSource,
                itemHeight = that.itemHeight,
                take = dataSource.take(),
                rangeStart = that._rangeStart || dataSource.skip() || 0,
                currentSkip = math.floor(firstItemIndex / take) * take,
                fetching = false,
                prefetchAt = 0.33;

            if (firstItemIndex < rangeStart) {

                fetching = true;
                rangeStart = math.max(0, lastItemIndex - take);
                that._scrollTop = (firstItemIndex - rangeStart) * itemHeight;
                that._page(rangeStart, take);

            } else if (lastItemIndex >= rangeStart + take && !scrollingUp) {

                fetching = true;
                rangeStart = firstItemIndex;
                that._scrollTop = itemHeight;
                that._page(rangeStart, take);

            } else if (!that._fetching) {

                if (firstItemIndex < (currentSkip + take) - take * prefetchAt && firstItemIndex > take) {
                    dataSource.prefetch(currentSkip - take, take);
                }
                if (lastItemIndex > currentSkip + take * prefetchAt) {
                    dataSource.prefetch(currentSkip + take, take);
                }

            }
            return fetching;
        },

        _page: function(skip, take) {
            var that = this,
                dataSource = that.dataSource;

            clearTimeout(that._timeout);
            that._fetching = true;
            that._rangeStart = skip;

            if (dataSource.inRange(skip, take)) {
                dataSource.range(skip, take);
            } else {
                kendo.ui.progress(that.wrapper, true);
                that._timeout = setTimeout(function() {
                    dataSource.range(skip, take);
                }, 100);
            }
        },

        refresh: function() {
            var that = this,
                html = "",
                maxHeight = 250000,
                dataSource = that.dataSource,
                rangeStart = that._rangeStart,
                scrollbar = kendo.support.scrollbar(),
                wrapperElement = that.wrapper[0],
                totalHeight,
                idx,
                itemHeight;

            kendo.ui.progress(that.wrapper, false);
            clearTimeout(that._timeout);

            itemHeight = that.itemHeight = that.options.itemHeight() || 0;

            var addScrollBarHeight = (wrapperElement.scrollWidth > wrapperElement.offsetWidth) ? scrollbar : 0;

            totalHeight = dataSource.total() * itemHeight + addScrollBarHeight;

            for (idx = 0; idx < math.round(totalHeight / maxHeight); idx++) {
                html += '<div style="width:1px;height:' + maxHeight + 'px"></div>';
            }

            if (totalHeight % maxHeight) {
                html += '<div style="width:1px;height:' + (totalHeight % maxHeight) + 'px"></div>';
            }

            that.verticalScrollbar.html(html);
            wrapperElement.scrollTop = that._scrollTop;

            if (rangeStart && !that._fetching) { // we are rebound from outside local range should be reset
                that._rangeStart = dataSource.skip();
            }
            that._fetching = false;
        }
    });

    function groupCells(count) {
        return new Array(count + 1).join('<td class="k-group-cell"></td>');
    }

    /**
     *  @name kendo.ui.Grid.Description
     *
     *  @section
     *  <p>
     *      The Grid widget displays tabular data and offers rich support interacting with data,
     *      including paging, sorting, grouping, and selection. Grid is a powerful widget with
     *      many configuration options. It can be bound to local JSON data or to remote data
     *      using the Kendo DataSource component.
     *  </p>
     *  <h3>Getting Started</h3>
     *  There are two primary ways to create a Kendo Grid:
     *
     *  <ol>
     *      <li>From an existing HTML table element, defining columns, rows, and data in HTML</li>
     *      <li>From an HTML div element, defining columns and rows with configuration, and binding to data</li>
     *  </ol>
     *
     *  @exampleTitle Creating a <b>Grid</b> from existing HTML Table element
     *  @example
     *  <!-- Define the HTML table, with rows, columns, and data -->
     *  <table id="grid">
     *   <thead>
     *       <tr>
     *           <th data-field="title">Title<th>
     *           <th data-field="year">Year<th>
     *       </tr>
     *   </thead>
     *   <tbody>
     *       <tr>
     *           <td>Star Wars: A New Hope<td>
     *           <td>1977<td>
     *       </tr>
     *       <tr>
     *           <td>Star Wars: The Empire Strikes Back<td>
     *           <td>1980<td>
     *       </tr>
     *   </tbody>
     *  </table>
     *
     *  @exampleTitle Initialize the Kendo Grid
     *  @example
     *   $(document).ready(function(){
     *       $("#grid").kendoGrid();
     *   });
     *
     *  @exampleTitle Creating a <b>Grid</b> from existing HTML Div element
     *  @example
     *  <!-- Define the HTML div that will hold the Grid -->
     *  <div id="grid">
     *  </div>
     *
     *  @exampleTitle Initialize the Kendo Grid and configure columns & data binding
     *  @example
     *    $(document).ready(function(){
     *       $("#grid").kendoGrid({modelSet.get(1)
     *           columns:[
     *               {
     *                   field: "FirstName",
     *                   title: "First Name"
     *               },
     *               {
     *                   field: "LastName",
     *                   title: "Last Name"
     *           }],
     *           dataSource: {
     *               data: [
     *                   {
     *                       FirstName: "Joe",
     *                       LastName: "Smith"
     *                   },
     *                   {
     *                       FirstName: "Jane",
     *                       LastName: "Smith"
     *               }]
     *           }
     *       });
     *   });
     *
     *  @section <h3>Configuring Grid Behavior</h3>
     *  Kendo Grid supports paging, sorting, grouping, and scrolling. Configuring any of
     *  these Grid behaviors is done using simple boolean configuration options. For
     *  example, the follow snippet shows how to enable all of these behaviors.
     *
     *  @exampleTitle Enabling Grid paging, sorting, grouping, and scrolling
     *  @example
     *    $(document).ready(function(){
     *       $("#grid").kendoGrid({
     *          groupable: true,
     *          scrollable: true,
     *          sortable: true,
     *          pageable: true
     *       });
     *   });
     *  @section
     *  By default, paging, grouping, and sorting are <strong>disabled</strong>. Scrolling is enabled by default.
     *
     *  <h3>Performance with Virtual Scrolling</h3>
     *  When binding to large data sets or when using large page sizes, reducing active in-memory
     *  DOM objects is important for performance. Kendo Grid provides built-in UI virtualization
     *  for highly optimized binding to large data sets. Enabling UI virtualization is done via simple configuration.
     *
     *  @exampleTitle Enabling Grid UI virtualization
     *  @example
     *    $(document).ready(function(){
     *       $("#grid").kendoGrid({
     *          scrollable: {
     *              virtual: true
     *          }
     *       });
     *   });
     */
    var Grid = Widget.extend(/** @lends kendo.ui.Grid.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {kendo.data.DataSource|Object} [dataSource] Instance of DataSource or Object with DataSource configuration.
         * _example
         * var sharedDataSource = new kendo.data.DataSource({
         *      data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         *      pageSize: 1
         * });
         *
         * $("#grid").kendoGrid({
         *      dataSource: sharedDataSource
         *  });
         *
         *  //or
         *
         *  $("#grid").kendoGrid({
         *      dataSource: {
         *          data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         *          pageSize: 1
         *      }
         *  });
         * @option {Array} [columns] A collection of column objects or collection of strings that represents the name of the fields.
         * @option {String} [columns.field] The field that will displayed in the column.
         * @option {String} [columns.title] The title that will displayed in the column header.
         * @option {String} [columns.width] The width of the column.
         * @option {String} [columns.template] The template for column's cells.
         * _example
         *  $(".k-grid").kendoGrid({
         *      dataSource: {
         *          data: createRandomData(50),
         *          pageSize: 10
         *      },
         *      columns: [
         *          {
         *              field: "Name"
         *          },
         *          {
         *              field: "BirthDate",
         *              title: "Birth Date",
         *              template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #'
         *         }
         *      ]
         *   });
         * @option {Boolean} [pageable] <false> Indicates whether paging is enabled/disabled.
         * @option {Boolean} [groupable] <false> Indicates whether grouping is enabled/disabled.
         * @option {Boolean} [navigatable] <false> Indicates whether keyboard navigation is enabled/disabled.
         * @option {String} [selectable] <undefined> Indicates whether selection is enabled/disabled. Possible values:
         *    <dl>
         *         <dt>
         *              "row"
         *         </dt>
         *         <dd>
         *              Single row selection.
         *         </dd>
         *         <dt>
         *              "cell"
         *         </dt>
         *         <dd>
         *              Single cell selection.
         *         </dd>
         *         <dt>
         *              "multiple, row"
         *         </dt>
         *         <dd>
         *              Multiple row selection.
         *         </dd>
         *         <dt>
         *              "multiple, cell"
         *         </dt>
         *         <dd>
         *              Multiple cell selection.
         *         </dd>
         *    </dl>
         * @option {Boolean} [autoBind] <false> Indicates whether the grid will call query on DataSource initially.
         * @option {Boolean|Object} [scrollable] <true> Enable/disable grid scrolling. Possible values:
         *    <dl>
         *         <dt>
         *              true
         *         </dt>
         *         <dd>
         *              Enables grid vertical scrolling
         *         </dd>
         *         <dt>
         *              false
         *         </dt>
         *         <dd>
         *              Disables grid vertical scrolling
         *         </dd>
         *         <dt>
         *              { virtual: false }
         *         </dt>
         *         <dd>
         *              Enables grid vertical scrolling without data virtualization. Same as first option.
         *         </dd>
         *         <dt>
         *              { virtual: true }
         *         </dt>
         *         <dd>
         *              Enables grid vertical scrolling with data virtualization.
         *         </dd>
         *    </dl>
         * _example
         *  $("#grid").kendoGrid({
         *      scrollable: {
         *          virtual: true //false
         *      }
         *  });
         * @option {Function} [rowTemplate] Template to be used for rendering the rows in the grid.
         * _example
         *  //template
         *  &lt;script id="rowTemplate" type="text/x-kendo-tmpl"&gt;
         *      &lt;tr&gt;
         *          &lt;td&gt;
         *              &lt;img src="${ BoxArt.SmallUrl }" alt="${ Name }" /&gt;
         *          &lt;/td&gt;
         *          &lt;td&gt;
         *              ${ Name }
         *          &lt;/td&gt;
         *          &lt;td&gt;
         *              ${ AverageRating }
         *          &lt;/td&gt;
         *      &lt;/tr&gt;
         *  &lt;/script&gt;
         *
         *  //grid intialization
         *  &lt;script&gt;
         *      $("#grid").kendoGrid({
         *          dataSource: dataSource,
         *          rowTemplate: kendo.template($("#rowTemplate").html()),
         *          height: 200
         *      });
         *  &lt;/script&gt;
         */
        init: function(element, options) {
            var that = this;

            options = isArray(options) ? { dataSource: options } : options;

            Widget.fn.init.call(that, element, options);

            that._element();

            that._columns(that.options.columns);

            that._dataSource();

            that._tbody();

            that._pageable();

            that._groupable();

            that.bind([
                /**
                 * Fires when the grid selection has changed.
                 * @name kendo.ui.Grid#change
                 * @event
                 * @param {Event} e
                 */
                CHANGE,
                /**
                 * Fires when the grid has received data from the data source.
                 * @name kendo.ui.Grid#dataBound
                 * @event
                 * @param {Event} e
                 */
                DATABOUND,
                /**
                 * Fires when the grid detail row is expanded.
                 * @name kendo.ui.Grid#detailExpand
                 * @event
                 * @param {Event} e
                 */
                DETAILEXPAND,
                /**
                 * Fires when the grid detail row is collapsed.
                 * @name kendo.ui.Grid#detailCollapse
                 * @event
                 * @param {Event} e
                 */
                DETAILCOLLAPSE,
                /**
                 * Fires when the grid detail is initialized.
                 * @name kendo.ui.Grid#detailInit
                 * @event
                 * @param {Event} e
                 */
                DETAILINIT
            ], that.options);

            that._thead();

            that._templates();

            that._navigatable();

            that._selectable();

            that._details();

            that._editable();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        options: {
            name: "Grid",
            columns: [],
            autoBind: true,
            scrollable: true,
            groupable: false,
            dataSource: {}
        },

        _element: function() {
            var that = this,
                table = that.element;

            if (!table.is("table")) {
                table = $("<table />").appendTo(that.element);
            }

            that.table = table.attr("cellspacing", 0);

            that._wrapper();
        },

        cellIndex: function(td) {
            return $(td).parent().find('td:not(.k-group-cell,.k-hierarchy-cell)').index(td);
        },

        _editable: function() {
            var that = this,
                cell,
                column,
                model,
                id;

            if (that.options.editable) {
                that.table.delegate("tr:not(.k-grouping-row) > td:not(.k-hierarchy-cell,.k-detail-cell,.k-group-cell,.k-edit-cell)", "click", function(e) {
                    if($(this).closest("tbody")[0] !== that.tbody[0] || $(e.target).is(":input")) {
                        return;
                    }

                    $(".k-edit-cell").each(function() {
                        cell = $(this);
                        id = cell.closest("tr").data("id");
                        column = that.columns[that.cellIndex(cell)];

                        that._displayCell(cell, column, that.dataSource.get(id).data);
                    });

                    cell = $(this);
                    id = cell.closest("tr").data("id");
                    column = that.columns[that.cellIndex(cell)];
                    model = that.dataSource.get(id);

                    if(!model._readOnly(column.field)) {
                        cell.addClass("k-edit-cell")
                            .kendoEditable({
                                fields: column.field,
                                model: model
                            });
                    }
                });

                $(document).click(function(e) {
                    if (cell && !$.contains(cell[0], e.target) && cell[0] !== e.target && !$(e.target).closest('.k-animation-container').length) {
                        that._displayCell(cell, column, that.dataSource.get(id).data);
                    }
                });
            }
        },

        _displayCell: function(cell, column, dataItem) {
            var that = this,
                state = { storage: {}, count: 0 },
                settings = extend({}, kendo.Template, that.options.templateSettings),
                tmpl = kendo.template(that._cellTmpl(column, state), settings);

            if (state.count > 0) {
                tmpl = proxy(tmpl, state.storage);
            }

            cell.removeClass("k-edit-cell").empty()
                .removeData("kendoEditable")
                .html(tmpl(dataItem));
        },

        _groupable: function() {
            var that = this,
                wrapper = that.wrapper,
                groupable = that.options.groupable;

            if (groupable) {
                if(!wrapper.has("div.k-grouping-header")[0]) {
                    $("<div />").addClass("k-grouping-header").html("&nbsp;").prependTo(wrapper);
                }

                that.groupable = new Groupable(wrapper, {
                    filter: "th:not(.k-group-cell)",
                    groupContainer: "div.k-grouping-header",
                    dataSource: that.dataSource
                });
            }

            that.table.delegate(".k-grouping-row .k-collapse, .k-grouping-row .k-expand", CLICK, function(e) {
                var element = $(this),
                    group = element.closest("tr");

                if(element.hasClass('k-collapse')) {
                    that.collapseGroup(group);
                } else {
                    that.expandGroup(group);
                }
                e.preventDefault();
            });
        },

        _selectable: function() {
            var that = this,
                multi,
                cell,
                selectable = that.options.selectable;

            if (selectable) {
                multi = typeof selectable === STRING && selectable.toLowerCase().indexOf("multiple") > -1;
                cell = typeof selectable === STRING && selectable.toLowerCase().indexOf("cell") > -1;

                that.selectable = new kendo.ui.Selectable(that.table, {
                    filter: cell ? CELL_SELECTOR : ROW_SELECTOR,
                    multiple: multi,
                    change: function() {
                        that.trigger(CHANGE);
                    }
                });

                if (that.options.navigatable) {
                    that.wrapper.keydown(function(e) {
                        if (e.keyCode === keys.SPACEBAR) {
                            e.preventDefault();
                            var current = that.current();
                            current = cell ? current : current.parent();

                            if(multi) {
                                if(!e.ctrlKey) {
                                    that.selectable.clear();
                                } else {
                                    if(current.hasClass(SELECTED)) {
                                        current.removeClass(SELECTED);
                                        current = null;
                                    }
                                }
                            } else {
                                that.selectable.clear();
                            }

                            that.selectable.value(current);
                        }
                    });
                }
            }
        },

        /**
         * Clears currently selected items.
         */
        clearSelection: function() {
            var that = this;
            that.selectable.clear();
            that.trigger(CHANGE);
        },

        /**
         * Selects the specified Grid rows/cells. If called without arguments - returns the selected rows/cells.
         * @param {Selector|Array} items Items to select.
         * @example
         * // selects first grid item
         * grid.select(grid.tbody.find(">tr:first"));
         */
        select: function(items) {
            var that = this,
                selectable = that.selectable;

            items = $(items);
            if(items.length) {
                if(!selectable.options.multiple) {
                    selectable.clear();
                    items = items.first();
                }
                selectable.value(items);
                return;
            }

            return selectable.value();
        },

        current: function(element) {
            var that = this,
                current = that._current;

            if(element !== undefined && element.length) {
                if (!current || current[0] !== element[0]) {
                    element.addClass(FOCUSED);
                    if (current) {
                        current.removeClass(FOCUSED);
                    }
                    that._current = element;
                    that._scrollTo(element.parent()[0]);
                }
            } else {
                return that._current;
            }
        },

        _scrollTo: function(element) {
            if(!element || !this.options.scrollable) {
                return;
            }

            var elementOffsetTop = element.offsetTop,
                container = this.content[0],
                elementOffsetHeight = element.offsetHeight,
                containerScrollTop = container.scrollTop,
                containerOffsetHeight = container.clientHeight,
                bottomDistance = elementOffsetTop + elementOffsetHeight;

            container.scrollTop = containerScrollTop > elementOffsetTop
                                    ? elementOffsetTop
                                    : bottomDistance > (containerScrollTop + containerOffsetHeight)
                                    ? bottomDistance - containerOffsetHeight
                                    : containerScrollTop;
        },

        _navigatable: function() {
            var that = this,
                wrapper = that.wrapper,
                table = that.table.addClass(FOCUSABLE),
                currentProxy = proxy(that.current, that),
                selector = "." + FOCUSABLE + " " + CELL_SELECTOR,
                clickCallback = function(e) {
                    currentProxy($(e.currentTarget));
                    if(e.type == CLICK) {
                        wrapper.focus();
                    }
                };

            if (that.options.navigatable) {
                wrapper.bind({
                    focus: function() {
                        var current = that._current;
                        if(current && current.is(":visible")) {
                            current.addClass(FOCUSED);
                        } else {
                            currentProxy(that.table.find(FIRST_CELL_SELECTOR));
                        }
                    },
                    focusout: function() {
                        if (that._current) {
                            that._current.removeClass(FOCUSED);
                        }
                    },
                    keydown: function(e) {
                        var key = e.keyCode,
                            current = that.current(),
                            dataSource = that.dataSource,
                            pageable = that.options.pageable,
                            handled = false;

                        if (keys.UP === key) {
                            currentProxy(current ? current.parent().prevAll(ROW_SELECTOR).first().children().eq(current.index()) : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (keys.DOWN === key) {
                            currentProxy(current ? current.parent().nextAll(ROW_SELECTOR).first().children().eq(current.index()) : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (keys.LEFT === key) {
                            currentProxy(current ? current.prev(":not(.k-group-cell)") : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (keys.RIGHT === key) {
                            currentProxy(current ? current.next() : table.find(FIRST_CELL_SELECTOR));
                            handled = true;
                        } else if (pageable && keys.PAGEDOWN == key) {
                            that._current = null;
                            dataSource.page(dataSource.page() + 1);
                            handled = true;
                        } else if (pageable && keys.PAGEUP == key) {
                            that._current = null;
                            dataSource.page(dataSource.page() - 1);
                            handled = true;
                        }

                        if(handled) {
                            e.preventDefault();
                        }
                    }
                });

                wrapper.delegate(selector, $.browser.msie ? CLICK : "mousedown", clickCallback);
            }
        },

        _wrapper: function() {
            var that = this,
                table = that.table,
                height = that.options.height || table.css(HEIGHT),
                wrapper = that.element;

            if (!wrapper.is("div")) {
               wrapper = wrapper.wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("k-grid k-widget")
                                  .attr(TABINDEX, math.max(table.attr(TABINDEX) || 0, 0));

            table.removeAttr(TABINDEX);

            if (height && height !== "0px") {
                that.wrapper.css(HEIGHT, height);
                table.css(HEIGHT, "auto");
            }
        },

        _tbody: function() {
            var that = this,
                table = that.table,
                tbody;

            tbody = table.find(">tbody");

            if (!tbody.length) {
                tbody = $("<tbody />").appendTo(table);
            }

            that.tbody = tbody;
        },

        _scrollable: function() {
            var that = this,
                header,
                table,
                options = that.options,
                height = that.wrapper.innerHeight(),
                scrollable = options.scrollable,
                scrollbar = kendo.support.scrollbar();

            if (scrollable) {
                header = that.wrapper.children().filter(".k-grid-header");

                if (!header[0]) {
                    header = $('<div class="k-grid-header" />').insertBefore(that.table);
                }

                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                header.css("padding-right", scrollable.virtual ? scrollbar + 1 : scrollbar);
                table = $('<table cellspacing="0" />');
                table.append(that.thead);
                header.empty().append($('<div class="k-grid-header-wrap" />').append(table));

                that.content = that.table.parent();

                if (that.content.is(".k-virtual-scrollable-wrap")) {
                    that.content = that.content.parent();
                }

                if (!that.content.is(".k-grid-content, .k-virtual-scrollable-wrap")) {
                    that.content = that.table.wrap('<div class="k-grid-content" />').parent();

                    if (scrollable !== true && scrollable.virtual) {
                        new VirtualScrollable(that.content, {
                            dataSource: that.dataSource,
                            itemHeight: proxy(that._averageRowHeight, that)
                        });
                    }
                }

                height -= header.outerHeight();

                if (that.pager) {
                    height -= that.pager.element.outerHeight();
                }

                if(options.groupable) {
                    height -= $(".k-grouping-header").outerHeight();
                }

                that.content.height(height);

                var scrollables = header.find(">.k-grid-header-wrap"); // add footer when implemented

                if (scrollable.virtual) {
                    that.content.find(">.k-virtual-scrollable-wrap").bind('scroll', function () {
                        scrollables.scrollLeft(this.scrollLeft);
                    });
                } else {
                    that.content.bind('scroll', function () {
                        scrollables.scrollLeft(this.scrollLeft);
                    });
                }
            }
        },

        _averageRowHeight: function() {
            var that = this,
                rowHeight = that._rowHeight;

            if (!that._rowHeight) {
                that._rowHeight = rowHeight = that.table.outerHeight() / that.table[0].rows.length;
                that._sum = rowHeight;
                that._measures = 1;

                totalHeight = math.round(that.dataSource.total() * rowHeight);
            }

            var currentRowHeight = that.table.outerHeight() / that.table[0].rows.length;

            if (rowHeight !== currentRowHeight) {
                that._measures ++;
                that._sum += currentRowHeight;
                that._rowHeight = that._sum / that._measures;
            }
            return rowHeight;
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (isPlainObject(dataSource)) {
                extend(dataSource, { table: that.table, fields: that.columns });

                pageable = options.pageable;

                if (isPlainObject(pageable) && pageable.pageSize !== undefined) {
                    dataSource.pageSize = pageable.pageSize;
                }
            }

            that.dataSource = DataSource.create(dataSource)
                                .bind(CHANGE, proxy(that.refresh, that))
                                .bind(REQUESTSTART, proxy(that._requestStart, that))
                                .bind(ERROR, proxy(that._error, that))
                                .bind(MODELCHANGE, proxy(that._modelChange, that));
        },

        _error: function() {
            this._progress(false);
        },
        _requestStart: function() {
            this._progress(true);
        },

        _modelChange: function(model) {
            var that = this,
                row = that.tbody.find("tr[data-id=" + model.id() +"]"),
                changes = model.changes(),
                cell,
                column,
                isAlt = row.hasClass("k-alt");

            if (row.has(".k-edit-cell")) {
                row.find(">td:not(.k-group-cell,.k-hierarchy-cell,.k-edit-cell)").each(function() {
                    cell = $(this);
                    column = that.columns[that.cellIndex(cell)];

                    if (column.field in changes) {
                        that._displayCell(cell, column, model.data);
                    }
                });
            } else {
                row.replaceWith($((isAlt ? that.altRowTemplate : that.rowTemplate)(model.data)));
            }
        },

        _pageable: function() {
            var that = this,
                wrapper,
                pageable = that.options.pageable;

            if (pageable) {
                wrapper = that.wrapper.children("div.k-grid-pager");

                if (!wrapper.length) {
                    wrapper = $('<div class="k-grid-pager"/>').appendTo(that.wrapper);
                }

                if (typeof pageable === "object" && pageable instanceof kendo.ui.Pager) {
                    that.pager = pageable;
                } else {
                    that.pager = new kendo.ui.Pager(wrapper, extend({}, pageable, { dataSource: that.dataSource }));
                }
            }
        },

        _sortable: function() {
            var that = this,
                columns = that.columns,
                sortable = that.options.sortable;

            if (sortable) {
                that.thead
                    .find("th:not(.k-hierarchy-cell)")
                    .each(function(index) {
                        if (columns[index].sortable !== false) {
                            $(this).kendoSortable(extend({}, sortable, { dataSource: that.dataSource }));
                        }
                    })
            }
        },

        _columns: function(columns) {
            var that = this,
                table = that.table,
                encoded,
                cols = table.find("col"),
                dataSource = that.options.dataSource;

            // using HTML5 data attributes as a configuration option e.g. <th data-field="foo">Foo</foo>
            columns = columns.length ? columns : map(table.find("th"), function(th, idx) {
                var th = $(th),
                    sortable = th.data("sortable")
                    field = th.data("field");

                if (!field) {
                   field = th.text().replace(/\s|[^A-z0-9]/g, "");
                }

                return {
                    field: field,
                    sortable: sortable,
                    template: th.data("template"),
                    width: cols.eq(idx).css("width")
                };
            });

            encoded = !(that.table.find("tbody tr").length > 0 && (!dataSource || !dataSource.transport));

            that.columns = map(columns, function(column) {
                column = typeof column === STRING ? { field: column } : column;
                return extend({ encoded: encoded }, column);
            });
        },

        _tmpl: function(rowTemplate, alt) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                idx,
                length = that.columns.length,
                template,
                model = that.dataSource.options.schema.model,
                state = { storage: {}, count: 0 },
                id,
                column,
                type,
                hasDetails = that._hasDetails(),
                className = [],
                groups = that.dataSource.group().length;

            if (!rowTemplate) {
                rowTemplate = "<tr";

                if (alt) {
                    className.push("k-alt");
                }

                if (hasDetails) {
                    className.push("k-master-row");
                }

                if (className.length) {
                    rowTemplate += ' class="' + className.join(" ") + '"';
                }

                if (model) {
                    id = model.id;
                    if (id) {
                        // render the id as data-id attribute
                        type = typeof id;

                        rowTemplate += ' data-id="#=';

                        if (type === STRING) {
                            if (!settings.useWithBlock) {
                                rowTemplate += paramName + ".";
                            }
                            rowTemplate += id;
                        } else if (type === FUNCTION) {
                            state.storage["tmpl" + state.count] = id;
                            rowTemplate += 'this.tmpl' + state.count + "(" + paramName + ")";
                            state.count++;
                        }

                        rowTemplate += '#"';
                    }
                }

                rowTemplate += ">";

                if (groups > 0) {
                    rowTemplate += groupCells(groups);
                }

                if (hasDetails) {
                    rowTemplate += '<td class="k-hierarchy-cell"><a class="k-icon k-plus" href="\\#"></a></td>';
                }

                for (idx = 0; idx < length; idx++) {
                    column = that.columns[idx];
                    template = column.template;
                    type = typeof template;

                    rowTemplate += "<td>";

                    rowTemplate += that._cellTmpl(column, state);

                    rowTemplate += "</td>";
                }

                rowTemplate += "</tr>";
            }

            rowTemplate = kendo.template(rowTemplate, settings);

            if (state.count > 0) {
                return proxy(rowTemplate, state.storage);
            }

            return rowTemplate;
        },

        _cellTmpl: function(column, state) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                template = column.template,
                paramName = settings.paramName,
                html = "",
                type = typeof template;

            if (type === FUNCTION) {
                state.storage["tmpl" + state.count] = template;
                html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                state.count ++;
            } else if (type === STRING) {
                html += template;
            } else {
                html += column.encoded ? "${" : "#=";

                if (!settings.useWithBlock) {
                    html += paramName + ".";
                }

                html += column.field;
                html += column.encoded ? "}" : "#";
            }
            return html;
        },

        _templates: function() {
            var that = this,
                options = that.options;

            that.rowTemplate = that._tmpl(options.rowTemplate);
            that.altRowTemplate = that._tmpl(options.altRowTemplate || options.rowTemplate, true);

            if (that._hasDetails()) {
                that.detailTemplate = that._detailTmpl(options.detailTemplate || "");
            }
        },

        _detailTmpl: function(template) {
            var that = this,
                html = "",
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                templateFunctionStorage = {},
                templateFunctionCount = 0,
                groups = that.dataSource.group().length,
                columns = that.columns.length,
                type = typeof template;

                html += '<tr class="k-detail-row">';
                if (groups > 0) {
                    html += groupCells(groups);
                }
                html += '<td class="k-hierarchy-cell"></td><td class="k-detail-cell"' + (columns ? ' colspan="' + columns + '"' : '') + ">";

            if (type === FUNCTION) {
                templateFunctionStorage["tmpl" + templateFunctionCount] = template;
                html += "#=this.tmpl" + templateFunctionCount + "(" + paramName + ")#";
                templateFunctionCount ++;
            } else {
                html += template;
            }

            html += "</td></tr>";

            html = kendo.template(html, settings);

            if (templateFunctionCount > 0) {
                return proxy(html, templateFunctionStorage);
            }

            return html;
        },

        _hasDetails: function() {
            var that = this;

            return that.options.detailTemplate !== undefined  || (that._events[DETAILINIT] || []).length;
        },

        _details: function() {
            var that = this;

            that.table.delegate(".k-hierarchy-cell .k-plus, .k-hierarchy-cell .k-minus", CLICK, function(e) {
                var button = $(this),
                    expanding = button.hasClass("k-plus"),
                    masterRow = button.closest("tr.k-master-row"),
                    detailRow,
                    detailTemplate = that.detailTemplate,
                    data,
                    hasDetails = that._hasDetails();

                button.toggleClass("k-plus", !expanding)
                    .toggleClass("k-minus", expanding);

                if(hasDetails && !masterRow.next().hasClass("k-detail-row")) {
                    data = that.dataItem(masterRow),
                    $(detailTemplate(data)).insertAfter(masterRow);

                    that.trigger(DETAILINIT, { masterRow: masterRow, detailRow: masterRow.next(), data: data, detailCell: masterRow.next().find(".k-detail-cell") });
                }

                detailRow = masterRow.next();

                that.trigger(expanding ? DETAILEXPAND : DETAILCOLLAPSE, { masterRow: masterRow, detailRow: detailRow});
                detailRow.toggle(expanding);

                e.preventDefault();
                return false;
            });
        },

        dataItem: function(tr) {
            return this._data[this.tbody.find('> tr:not(.k-grouping-row,.k-detail-row)').index($(tr))]
        },

        expandRow: function(tr) {
            $(tr).find('> td .k-plus, > td .k-expand').click();
        },

        collapseRow: function(tr) {
            $(tr).find('> td .k-minus, > td .k-plus').click();
        },

        _thead: function() {
            var that = this,
                columns = that.columns,
                idx,
                length,
                html = "",
                thead = that.table.find("thead"),
                tr,
                th;

            if (!thead.length) {
                thead = $("<thead/>").insertBefore(that.tbody);
            }

            tr = that.table.find("tr").filter(":has(th)");

            if (!tr.length) {
                tr = thead.children().first();
                if(!tr.length) {
                    tr = $("<tr/>");
                }
            }

            if (!tr.children().length) {
                if (that._hasDetails()) {
                    html += '<th class="k-hierarchy-cell">&nbsp;</th>';
                }

                for (idx = 0, length = columns.length; idx < length; idx++) {
                    th = columns[idx];

                    html += "<th data-field='" + th.field + "'>" + (th.title || th.field) + "</th>";
                }

                tr.html(html);
            }

            tr.find("th").addClass("k-header");

            if(!that.options.scrollable) {
                thead.addClass("k-grid-header");
            }

            tr.appendTo(thead);

            that.thead = thead;

            that._sortable();

            that._scrollable();

            that._updateCols();
        },

        _updateCols: function() {
            var that = this,
                table = that.thead.parent().add(that.table),
                colgroup = table.find("colgroup"),
                width,
                cols = map(that.columns, function(column) {
                    width = column.width;
                    if (width && parseInt(width) != 0) {
                        return kendo.format('<col style="width:{0}"/>', width);
                    }

                    return "<col />";
                }),
                groups = that.dataSource.group().length;

            if (that._hasDetails()) {
                cols.splice(0, 0, '<col class="k-hierarchy-col" />');
            }

            if (colgroup.length) {
                colgroup.remove();
            }

            colgroup = $("<colgroup/>").append($(new Array(groups + 1).join('<col class="k-group-col">') + cols.join("")));

            table.prepend(colgroup);
        },

        _autoColumns: function(schema) {
            if (schema) {
                var that = this,
                    field;

                for (field in schema) {
                    that.columns.push({
                        field: field
                    });
                }

                that._thead();

                that._templates();
            }
        },

        _rowsHtml: function(data) {
            var that = this,
                html = "",
                idx,
                length,
                rowTemplate = that.rowTemplate,
                altRowTemplate = that.altRowTemplate;

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altRowTemplate(data[idx]);
                } else {
                    html += rowTemplate(data[idx]);
                }

                that._data.push(data[idx]);
            }

            return html;
        },

        _groupRowHtml: function(group, colspan, level) {
            var that = this,
                html = "",
                idx,
                length,
                groupItems = group.items;

            html +=  '<tr class="k-grouping-row">' + groupCells(level) +
                      '<td colspan="' + colspan + '">' +
                        '<p class="k-reset">' +
                         '<a class="k-icon k-collapse" href="#"></a>' +
                         group.field + ': ' + group.value +'</p></td></tr>';

            if(group.hasSubgroups) {
                for(idx = 0, length = groupItems.length; idx < length; idx++) {
                    html += that._groupRowHtml(groupItems[idx], colspan - 1, level + 1);
                }
            } else {
                html += that._rowsHtml(groupItems);
            }

            return html;
        },

        /**
         * Collapses specified group.
         * @param {Selector|DOMElement} group Target group item to collapse.
         * @example
         * // collapses first group item
         * grid.collapseGroup(grid.tbody.find(">tr.k-grouping-row:first"));
         */
        collapseGroup: function(group) {
            group = $(group).find(".k-icon").addClass("k-expand").removeClass("k-collapse").end();
            var level = group.find(".k-group-cell").length;

            group.nextUntil(function() {
                return $(".k-group-cell", this).length <= level;
            }).hide();
        },

        /**
         * Expands specified group.
         * @param {Selector|DOMElement} group Target group item to expand.
         * @example
         * // expands first group item
         * grid.expandGroup(grid.tbody.find(">tr.k-grouping-row:first"));
         */
        expandGroup: function(group) {
            group = $(group).find(".k-icon").addClass("k-collapse").removeClass("k-expand").end();
            var that = this,
                level = group.find(".k-group-cell").length;

            group.nextAll("tr").each(function () {
                var tr = $(this);
                var offset = tr.find(".k-group-cell").length;
                if (offset <= level)
                    return false;

                if (offset == level + 1) {
                    tr.show();

                    if (tr.hasClass("k-grouping-row") && tr.find(".k-icon").hasClass("k-collapse"))
                        that.expandGroup(tr);
                }
            });
        },

        _updateHeader: function(groups) {
            var that = this,
                cells = that.thead.find("th.k-group-cell"),
                length = cells.length;

            if(groups > length) {
                $(new Array(groups - length + 1).join('<th class="k-group-cell k-header">&nbsp;</th>')).prependTo(that.thead.find("tr"));
            } else if(groups < length) {
                length = length - groups;
                $($.grep(cells, function(item, index) { return length > index } )).remove();
            }
        },

        _firstDataItem: function(data, grouped) {
            if(data && grouped) {
                if(data.hasSubgroups) {
                    data = this._firstDataItem(data.items[0], grouped);
                } else {
                    data = data.items[0];
                }
            }
            return data;
        },

        _progress: function(toggle) {
            var that = this,
                element = that.element.is("table") ? that.element.parent() : (that.content && that.content.length ? that.content : that.element);

            kendo.ui.progress(element, toggle);
        },

        /**
         * Reloads the data and repaints the grid.
         * @example
         * var grid = $("#grid").data("kendoGrid");
         *
         * // refreshes the grid
         * grid.refresh();
         */
        refresh: function() {
            var that = this,
                length,
                idx,
                html = "",
                data = that.dataSource.view(),
                tbody,
                placeholder,
                groups = (that.dataSource.group() || []).length,
                colspan = groups + that.columns.length;

            that._progress(false);

            that._data = [];

            if (!that.columns.length) {
                that._autoColumns(that._firstDataItem(data[0], groups));
                colspan = groups + that.columns.length;
            }

            that._group = groups > 0 || that._group;

            if(that._group) {
                that._templates();
                that._updateCols();
                that._updateHeader(groups);
                that._group = groups > 0;
            }

            if(groups > 0) {

                if (that.detailTemplate) {
                    colspan++;
                }

                for (idx = 0, length = data.length; idx < length; idx++) {
                    html += that._groupRowHtml(data[idx], colspan, 0);
                }
            } else {
                html += that._rowsHtml(data);
            }

            if (tbodySupportsInnerHtml) {
                that.tbody[0].innerHTML = html;
            } else {
                placeholder = document.createElement("div");
                placeholder.innerHTML = "<table><tbody>" + html + "</tbody></table>";
                tbody = placeholder.firstChild.firstChild;
                that.table[0].replaceChild(tbody, that.tbody[0]);
                that.tbody = $(tbody);
            }
            that.trigger(DATABOUND);
       }
   });

   ui.plugin(Grid);
   ui.plugin(VirtualScrollable);
})(jQuery);
