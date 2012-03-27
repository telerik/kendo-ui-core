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
     *           <th data-field="title">Title</th>
     *           <th data-field="year">Year</th>
     *       </tr>
     *   </thead>
     *   <tbody>
     *       <tr>
     *           <td>Star Wars: A New Hope</td>
     *           <td>1977</td>
     *       </tr>
     *       <tr>
     *           <td>Star Wars: The Empire Strikes Back</td>
     *           <td>1980</td>
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
     *       $("#grid").kendoGrid({
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
     *
     * @section
     * <h3>Accessing an Existing Grid</h3>
     * <p>
     *  You can reference an existing <b>Grid</b> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>.
     *  Once a reference has been established, you can use the API to control
     *  its behavior.
     * </p>
     *
     * @exampleTitle Accessing an existing Grid instance
     * @example
     * var grid = $("#grid").data("kendoGrid");
     *
     */
    var Grid = Widget.extend(/** @lends kendo.ui.Grid.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {kendo.data.DataSource | Object} [dataSource] Instance of DataSource or Object with DataSource configuration.
         * _exampleTitle Bind to a DataSource instance
         * _example
         * var sharedDataSource = new kendo.data.DataSource({
         *      data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         *      pageSize: 1
         * });
         *
         * $("#grid").kendoGrid({
         *      dataSource: sharedDataSource
         *  });
         * _exampleTitle Bind to a local array
         * _example
         *  $("#grid").kendoGrid({
         *      dataSource: {
         *          data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         *          pageSize: 1
         *      }
         *  });
         * @option {Function} [detailTemplate] Template to be used for rendering the detail rows in the grid.
         * See the <a href="http://demos.kendoui.com/web/grid/detailtemplate.html"><b>Detail Template</b></a> example.
         * @option {Object} [sortable] Defines whether grid columns are sortable.
         * _example
         * $("#grid").kendoGrid({
         *     sortable: true
         * });
         * //
         * // or
         * //
         * $("#grid").kendoGrid({
         *     sortable: {
         *         mode: "multiple", // enables multi-column sorting
         *         allowUnsort: true
         * });
         * @option {String} [sortable.mode] <"single"> Defines sorting mode. Possible values:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <b>"single"</b>
         *         </dt>
         *         <dd>
         *             Defines that only once column can be sorted at a time.
         *         </dd>
         *         <dt>
         *              <b>"multiple"</b>
         *         </dt>
         *         <dd>
         *              Defines that multiple columns can be sorted at a time.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [sortable.allowUnsort] <false>  Defines whether column can have unsorted state.
         * @option {Array} [columns] A collection of column objects or collection of strings that represents the name of the fields.
         * _example
         * var sharedDataSource = new kendo.data.DataSource({
         *      data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         *      pageSize: 1
         * });
         * $("#grid").kendoGrid({
         *     dataSource: sharedDataSource,
         *     columns: [ { title: "Action", command: "destroy" }, // creates a column with delete buttons
         *                { title: "Title", field: "title", width: 200, template: "&lt;h1 id='title'&gt;${ title }&lt;/div&gt;" },
         *                { title: "Year", field: "year", filterable: false, sortable: true, format: "{0:dd/MMMM/yyyy}" } ];
         * });
         * @option {String} [columns.field] The field from the datasource that will be displayed in the column.
         * @option {String} [columns.title] The text that will be displayed in the column header.
         * @option {String} [columns.format] The format that will be applied on the column cells.
         * _example
         *  $("#grid").kendoGrid({
         *      dataSource: {
         *          data: createRandomData(50),
         *          pageSize: 10
         *      },
         *      columns: [
         *          {
         *              field: "BirthDate",
         *              title: "Birth Date",
         *              format: "{0:dd/MMMM/yyyy}"
         *         }
         *      ]
         *   });
         * @option {Boolean} [columns.filterable] <true> Specifies whether given column is filterable.
         * @option {Boolean} [columns.sortable] <true> Specifies whether given column is sortable.
         * @option {Function} [columns.editor] Provides a way to specify custom editor for this column.
         * _example
         * $(".k-grid").kendoGrid({
         *      dataSource: {
         *          data: createRandomData(50)
         *      },
         *      editable: true,
         *      columns: [
         *          {
         *              field: "Name",
         *              editor: function(container, options) {
         *                  // create a KendoUI AutoComplete widget as column editor
         *                   $('&lt;input name="' + options.field + '"/&gt;')
         *                       .appendTo(container)
         *                       .kendoAutoComplete({
         *                           dataTextField: "ProductName",
         *                           dataSource: {
         *                               transport: {
         *                                 //...
         *                               }
         *                           }
         *                       });
         *              }
         *          }
         *      ]
         *   });
         * @option {Object} [columns.editor.container] The container in which the editor must be added.
         * @option {Object} [columns.editor.options] Additional options.
         * @option {String} [columns.editor.options.field] The field for the editor.
         * @option {Object} [columns.editor.options.model] The model for the editor.
         * @option {String} [columns.width] The width of the column.
         * @option {Boolean} [columns.encoded] <true> Specified whether the column content is escaped. Disable encoding if the data contains HTML markup.
         * @option {String} [columns.command] Definition of command column. The supported built-in commands are: "create", "cancel", "save", "destroy".
         * @option {String} [columns.template] The template for column's cells.
         * _example
         *  $("#grid").kendoGrid({
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
         * @option {Array} [toolbar] This is a list of commands for which the corresponding buttons will be rendered.
         * The supported built-in commands are: "create", "cancel", "save", "destroy".
         * _example
         *  $("#grid").kendoGrid({
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
         *      toolbar: [
         *          "create",
         *          { name: "save", text: "Save This Record" },
         *          { name: "cancel", template: '&lt;img src="icons/cancel.png' rel='cancel' /&gt;" }
         *      ],
         *      editable: true
         *   });
         * @option {String} [toolbar.name] The name of the command. One of the predefined or a custom.
         * @option {String} [toolbar.text] The text of the command that will be set on the button.
         * @option {String} [toolbar.template] The template for the command button.
         *
         * @option {Object} [editable] Indicates whether editing is enabled/disabled.
         * _example
         *  $("#grid").kendoGrid({
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
         *      toolbar: [
         *          "create",
         *          { name: "save", text: "Save This Record" },
         *          { name: "cancel", template: "&lt;img src="icons/cancel.png' rel='cancel' /&gt;" }
         *      ],
         *      editable: {
         *          update: "true", // puts the row in edit mode when it is clicked
         *          destroy: "false", // does not remove the row when it is deleted, but marks it for deletion
         *          confirmation: "Are you sure you want to remove this item?"
         *      }
         *  });
         * @option {String} [editable.mode] Indicates which of the available edit modes(incell(default)/inline/popup) will be used
         * @option {Boolean} [editable.update] Indicates whether item should be switched to edit mode on click.
         * @option {Boolean} [editable.destroy] Indicates whether item should be deleted when click on delete button.
         * @option {Boolean} [editable.confirmation] Defines the text that will be used in confirmation box when delete an item.
         * @option {Boolean} [editable.template] Template which will be use during popup editing
         * @option {Boolean} [pageable] <false> Indicates whether paging is enabled/disabled.
         * _example
         *  $("#grid").kendoGrid({
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
         *      ],
         *      pageable: true
         *  });
         * @option {Boolean} [groupable] <false> Indicates whether grouping is enabled/disabled.
         * _example
         *  $("#grid").kendoGrid({
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
         *      ],
         *      groupable: true
         *  });
         * @option {Boolean} [navigatable] <false> Indicates whether keyboard navigation is enabled/disabled.
         * _example
         *  $("#grid").kendoGrid({
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
         *      ],
         *      navigatable: true
         *  });
         * @option {String} [selectable] <undefined> Indicates whether selection is enabled/disabled. Possible values:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <b>"row"</b>
         *         </dt>
         *         <dd>
         *              Single row selection.
         *         </dd>
         *         <dt>
         *              <b>"cell"</b>
         *         </dt>
         *         <dd>
         *              Single cell selection.
         *         </dd>
         *         <dt>
         *              <b>"multiple, row"</b>
         *         </dt>
         *         <dd>
         *              Multiple row selection.
         *         </dd>
         *         <dt>
         *              <b>"multiple, cell"</b>
         *         </dt>
         *         <dd>
         *              Multiple cell selection.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [autoBind] <true> Indicates whether the grid will call read on the DataSource initially.
         * _example
         *  $("#grid").kendoGrid({
         *      dataSource: sharedDataSource,
         *      columns: [
         *          {
         *              field: "Name"
         *          },
         *          {
         *              field: "BirthDate",
         *              title: "Birth Date",
         *              template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #'
         *         }
         *      ],
         *      autoBind: false // the grid will not be populated with data until read() is called on the sharedDataSource
         *  });
         * @option {Boolean | Object} [scrollable] <true> Enable/disable grid scrolling. Possible values:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <b>true</b>
         *         </dt>
         *         <dd>
         *              Enables grid vertical scrolling
         *         </dd>
         *         <dt>
         *              <b>false</b>
         *         </dt>
         *         <dd>
         *              Disables grid vertical scrolling
         *         </dd>
         *         <dt>
         *              <b>{ virtual: false }</b>
         *         </dt>
         *         <dd>
         *              Enables grid vertical scrolling without data virtualization. Same as first option.
         *         </dd>
         *         <dt>
         *              <b>{ virtual: true }</b>
         *         </dt>
         *         <dd>
         *              Enables grid vertical scrolling with data virtualization.
         *         </dd>
         *    </dl>
         * </div>
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
         *  &lt;script&gt;PO details informaiton
         *      $("#grid").kendoGrid({
         *          dataSource: dataSource,
         *          rowTemplate: kendo.template($("#rowTemplate").html()),
         *          height: 200
         *      });
         *  &lt;/script&gt;
         */
        init: function(element, options) {
        },

        events: [
            /**
             * Fires when the grid selection has changed.
             * @name kendo.ui.Grid#change
             * @event
             * @param {Event} e
             * @example
             *  $("#grid").kendoGrid({
             *      change: function(e) {
             *          // handle event
             *      }
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the change event
             *  grid.bind("change", function(e) {
             *      // handle event
             *  }
             */
            CHANGE,
            "dataBinding",
            /**
             * Fires when the grid has received data from the data source.
             * @name kendo.ui.Grid#dataBound
             * @event
             * @param {Event} e
             * @example
             *  $("#grid").kendoGrid({
             *      dataBound: function(e) {
             *          // handle event
             *      }
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the dataBound event
             *  grid.bind("dataBound", function(e) {
             *      // handle event
             *  }
             */
            DATABOUND,
            /**
             * Fires when the grid detail row is expanded.
             * @name kendo.ui.Grid#detailExpand
             * @event
             * @param {Event} e
             * @param {Object} e.masterRow The jQuery element representing master row.
             * @param {Object} e.detailRow The jQuery element representing detail row.
             * @example
             *  $("#grid").kendoGrid({
             *      detailExpand: function(e) {
             *          // handle event
             *      }
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the detailExpand event
             *  grid.bind("detailExpand", function(e) {
             *      // handle event
             *  }
             */
            DETAILEXPAND,
            /**
             * Fires when the grid detail row is collapsed.
             * @name kendo.ui.Grid#detailCollapse
             * @event
             * @param {Event} e
             * @param {Object} e.masterRow The jQuery element representing master row.
             * @param {Object} e.detailRow The jQuery element representing detail row.
             * @example
             *  $("#grid").kendoGrid({
             *      detailCollapse: function(e) {
             *          // handle event
             *      }
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the detailCollapse event
             *  grid.bind("detailCollapse", function(e) {
             *      // handle event
             *  }
             */
            DETAILCOLLAPSE,
            /**
             * Fires when the grid detail is initialized.
             * @name kendo.ui.Grid#detailInit
             * @event
             * @param {Event} e
             * @param {Object} e.masterRow The jQuery element representing master row.
             * @param {Object} e.detailRow The jQuery element representing detail row.
             * @param {Object} e.detailCell The jQuery element representing detail cell.
             * @param {Object} e.data The data for the master row.
             * @example
             *  $("#grid").kendoGrid({
             *      detailInit: function(e) {
             *          // handle event
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the detailInit event
             *  grid.bind("detailInit", function(e) {
             *      // handle event
             *  }
             */
            DETAILINIT,
            /**
             * Fires when the grid enters edit mode.
             * @name kendo.ui.Grid#edit
             * @event
             * @param {Event} e
             * @param {Object} e.container The jQuery element to be edited.
             * @param {Object} e.model The model to be edited.
             * @example
             *  $("#grid").kendoGrid({
             *      edit: function(e) {
             *          // handle event
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the edit event
             *  grid.bind("edit", function(e) {
             *      // handle event
             *  }
             */
            EDIT,
            /**
             * Fires before the grid item is changed.
             * @name kendo.ui.Grid#save
             * @event
             * @param {Event} e
             * @param {Object} e.values The values entered by the user.
             * @param {Object} e.container The jQuery element which is in edit mode.
             * @param {Object} e.model The edited model.
             * @example
             *  $("#grid").kendoGrid({
             *      save: function(e) {
             *          // handle event
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the save event
             *  grid.bind("save", function(e) {
             *      // handle event
             *  }
             */
            SAVE,
            /**
             * Fires before the grid item is removed.
             * @name kendo.ui.Grid#remove
             * @event
             * @param {Event} e
             * @param {Object} e.row The row element to be deleted.
             * @param {Object} e.model The model which to be deleted.
             * @example
             *  $("#grid").kendoGrid({
             *      remove: function(e) {
             *          // handle event
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the remove event
             *  grid.bind("remove", function(e) {
             *      // handle event
             *  }
             */
            REMOVE,
            /**
             * Fires before the grid calls DataSource sync.
             * @name kendo.ui.Grid#saveChanges
             * @event
             * @param {Event} e
             * @example
             *  $("#grid").kendoGrid({
             *      saveChanges: function(e) {
             *          // handle event
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the grid
             *  var grid = $("#grid").data("kendoGrid");
             *  // bind to the saveChanges event
             *  grid.bind("saveChanges", function(e) {
             *      // handle event
             *  }
             */
            SAVECHANGES
        ],

        /**
         * Returns the index of the cell in the grid item skipping group and hierarchy cells.
         * @param {Selector | DOM Element} cell Target cell.
         * @example
         *  // get a reference to the grid widget
         *  var grid = $("#grid").data("kendoGrid");
         *  // get the index of the row
         *  // TODO: add specific function call here
         */
        cellIndex: function(td) {
        },

        /**
         * Puts the specified table cell in edit mode. It requires a jQuery object representing the cell. The editCell method triggers edit event.
         * @param {Selector} cell Cell to be edited.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // edit first table cell
         * grid.editCell(grid.tbody.find(">tr>td:first"));
         */
        editCell: function(cell) {
        },

        /**
         * Closes current edited cell.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // close the cell being edited
         * grid.closeCell();
         */
        closeCell: function() {
        },

        /**
         * Removes the specified row from the grid. The removeRow method triggers remove event.
         * (Note: In inline or popup edit modes the changes will be automatically synced)
         * @param {Selector | DOM Element} row Row to be removed.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // remove first table row
         * grid.removeRow(grid.tbody.find(">tr:first"));
         */
        removeRow: function(row) {
        },

        /**
         * Switches the specified row from the grid into edit mode. The editRow method triggers edit event.
         * @param {Selector | DOM Element} row Row to be edited.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // edit first table row
         * grid.editRow(grid.tbody.find(">tr:first"));
         */
        editRow: function(row) {
        },

        /**
         * Switch the current edited row into display mode and revert changes made to the data
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * grid.cancelRow();
         */
        cancelRow: function() {
        },

        /**
         * Switch the current edited row into dislay mode and save changes made to the data
         * (Note: the changes will be automatically synced)
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * grid.saveRow();
         */
        saveRow: function() {
        },

        /**
         * Cancels any pending changes during. Deleted rows are restored. Inserted rows are removed. Updated rows are restored to their original values.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * grid.cancelChanges();
         */
        cancelChanges: function() {
        },

        /**
         * Calls DataSource sync to submit any pending changes if state is valid. The saveChanges method triggers saveChanges event.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * grid.saveChanges();
         */
        saveChanges: function() {
        },

        /**
         * Adds a new empty table row in edit mode. The addRow method triggers edit event.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * grid.addRow();
         */
        addRow: function() {
        },

        /**
         * Clears currently selected items.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // clear the selection of items in the grid
         * grid.clearSelection();
         */
        clearSelection: function() {
        },

        /**
         * Selects the specified Grid rows/cells. If called without arguments - returns the selected rows/cells.
         * @param {Selector | Array} items Items to select.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // selects first grid item
         * grid.select(grid.tbody.find(">tr:first"));
         */
        select: function(items) {
        },

        /**
         * Returns the data item to which a given table row (tr DOM element) is bound.
         * @param {Selector | DOM Element} tr Target row.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // returns the data item for first row
         * grid.dataItem(grid.tbody.find(">tr:first"));
         */
        dataItem: function(tr) {
        },

        /**
         * Expands specified master row.
         * @param {Selector | DOM Element} row Target master row to expand.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // expands first master row
         * grid.expandRow(grid.tbody.find(">tr.k-master-row:first"));
         */
        expandRow: function(tr) {
        },

        /**
         * Collapses specified master row.
         * @param {Selector | DOM Element} row Target master row to collapse.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // collapses first master row
         * grid.collapseRow(grid.tbody.find(">tr.k-master-row:first"));
         */
        collapseRow: function(tr) {
        },

        /**
         * Collapses specified group.
         * @param {Selector | DOM Element} group Target group item to collapse.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // collapses first group item
         * grid.collapseGroup(grid.tbody.find(">tr.k-grouping-row:first"));
         */
        collapseGroup: function(group) {
        },

        /**
         * Expands specified group.
         * @param {Selector | DOM Element} group Target group item to expand.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // expands first group item
         * grid.expandGroup(grid.tbody.find(">tr.k-grouping-row:first"));
         */
        expandGroup: function(group) {
        },

        /**
         * Reloads the data and repaints the grid.
         * @example
         * // get a reference to the grid widget
         * var grid = $("#grid").data("kendoGrid");
         * // refreshes the grid
         * grid.refresh();
         */
        refresh: function(e) {
        }
   });


