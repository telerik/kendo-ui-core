(function () {

    /** @name kendo.ui.ListView.Description
    * @section
    *  <p>
    *       The ListView is designed to give your the freedom to specify custom type of layout
    *       for the items displayed in the control. It can be bound to local JSON data or to
    *       remote data using the Kendo DataSource component.
    *  </p>
    *  <h3>Getting Started</h3>
    *  @exampleTitle Creating a <b>ListView</b> from existing HTML element
    *  @example
    *   <ul id="listView"></ul>
    *  @exampleTitle Initialize the Kendo Grid
    *  @example
    *   $(document).ready(function(){
    *       $("#listView").kendoListView({
    *           template: "<li>${FirstName} ${LastName}</li>",
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
    *  @section <h3>Configuring ListView Behavior</h3>
    *  Kendo ListView supports paging, selection, navigation, editing. Configuring any of
    *  these ListView behaviors is done using simple boolean configuration options. For
    *  example, the follow snippet shows how to enable all of these behaviors.
    *
    *  @exampleTitle Enabling ListView paging, selection, navigation and editing
    *  @example
    *    $(document).ready(function(){
    *       $("#listView").kendoListView({
    *          pageable: true,
    *          selectable: true,
    *          navigatable: true,
    *          editable: true,
    *          template: "<li>${FirstName}</li>",
    *          editTemplate: '<li><input type="text" data-bind="value:FirstName" name="FirstName" required="required"/></li>'
    *       });
    *   });
    *  @section
    *  By default, paging, selection, navigation and editing are <strong>disabled</strong>.
    */
    var ListViewDocs = /** @lends kendo.ui.ListView.prototype */ {
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
         * $("#listView").kendoListView({
         *      dataSource: sharedDataSource,
         *      template: "<li>${title} ${year}</li>"
         *  });
         * _exampleTitle Bind to a local array
         * _example
         *  $("#listView").kendoListView({
         *      dataSource: {
         *          data: [{title: "Star Wars: A New Hope", year: 1977}, {title: "Star Wars: The Empire Strikes Back", year: 1980}],
         *          template: "<li>${title} ${year}</li>"
         *      }
         *  });
         * @option {Boolean} [navigatable] <false> Indicates whether keyboard navigation is enabled/disabled.
         * _example
         *  $("#listView").kendoListView({
         *      dataSource: {
         *          data: createRandomData(50),
         *      },
         *      template: "<li>${Name} ${BirthDate}</li>",
         *      navigatable: true
         *  });
         * @option {String} [selectable] <false> Indicates whether selection is enabled/disabled. Possible values:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <b>true</b>
         *         </dt>
         *         <dd>
         *              Single item selection.
         *         </dd>
         *         <dt>
         *              <b>"single"</b>
         *         </dt>
         *         <dd>
         *              Single item selection.
         *         </dd>
         *         <dt>
         *              <b>"multiple"</b>
         *         </dt>
         *         <dd>
         *              Multiple item selection.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [autoBind] <true> Indicates whether the list view will call read on the DataSource initially.
         * _example
         *  $("#listView").kendoListView({
         *      dataSource: {
         *          data: createRandomData(50)
         *      },
         *      template: "<li>${Name} ${BirthDate}</li>",
         *      autoBind: false // the list view will not be populated with data until read() is called on the sharedDataSource
         *  });
         * @option {Function} [template] Specifies ListView item template.
         * _example
         *  <script type="text/x-kendo-tmpl" id="template">
         *      <div>
         *        <dl>
         *          <dt>Name</dt> <dd>${Name}</dd>
         *          <dt>Birth Date</dt> <dd>${BirdthDate}</dd>
         *        </dl>
         *      </div>
         *  </script>
         * _example
         *  $("#listView").kendoListView({
         *      dataSource: {
         *          data: createRandomData(50)
         *      },
         *      template: kendo.template($("#template").html())
         *  });
         * @option {Function} [editTemplate] Specifies ListView item template in edit mode.
         * _example
         *  <script type="text/x-kendo-tmpl" id="template">
         *      <div>
         *        <dl>
         *          <dt>Name</dt> <dd>${Name}</dd>
         *          <dt>Age</dt> <dd>${Age}</dd>
         *        </dl>
         *      </div>
         *  </script>
         *
         *  <script type="text/x-kendo-tmpl" id="editTemplate">
         *      <div>
         *        <dl>
         *          <dt>Name</dt>
         *          <dd><input type="text" data-bind="value:Name" name="Name" required="required" /></dd>
         *          <dt>Age</dt>
         *          <dd><input type="text" data-bind="value:Age" data-role="numerictextbox" data-type="number" name="Age" required="required /></dd>
         *        </dl>
         *      </div>
         *  </script>
         * _example
         *  $("#listView").kendoListView({
         *      dataSource: {
         *          data: createRandomData(50)
         *      },
         *      template: kendo.template($("#template").html()),
         *      editTemplate: kendo.template($("#editTemplate").html())
         *  });

         */
        init: function() {
            /**
             * Fires when the list view has received data from the data source.
             * and is about to render it.
             * @name kendo.ui.ListView#dataBound
             * @event
             * @param {Event} e
             * @example
             * function onDataBound(e) {
             *     // handle event
             * }
             */

            /**
             * Fires when the list view selection has changed.
             * @name kendo.ui.ListView#change
             * @event
             * @param {Event} e
             * @example
             *  $("#listView").kendoListView({
             *      change: function(e) {
             *          // handle event
             *      }
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the list view
             *  var listView = $("#listView").data("kendoListView");
             *  // bind to the change event
             *  listView.bind("change", function(e) {
             *      // handle event
             *  }
             */

            /**
             * Fires when the list view enters edit mode.
             * @name kendo.ui.ListView#edit
             * @event
             * @param {Event} e
             * @param {Object} e.item The jQuery element to be edited.
             * @param {Object} e.model The model to be edited.
             * @example
             *  $("#listView").kendoListView({
             *      edit: function(e) {
             *          // handle event
             *  });
             * @exampleTitle To set after initialization
             * @example
             *  // get a reference to the list view
             *  var listView = $("#listView").data("kendoListView");
             *  // bind to the edit event
             *  listView.bind("edit", function(e) {
             *      // handle event
             *  }
             */

            /**
             * Fires before the list view item is removed.
             * @name kendo.ui.ListView#remove
             * @event
             * @param {Event} e
             * @param {Object} e.item The item element to be deleted.
             * @param {Object} e.model The model which to be deleted.
             * @example
             *  $("#listView").kendoListView({
             *      remove: function(e) {
             *          // handle event
             *  });
             *  @exampleTitle To set after initialization
             *  @example
             *  // get a reference to the list view
             *  var listView = $("#listView").data("kendoListView");
             *  // bind to the remove event
             *  listView.bind("remove", function(e) {
             *      // handle event
             *  }
             */
        },

        /**
         * Reloads the data and repaints the list view.
         * @example
         * var listView = $("#listView").data("kendoListView");
         *
         * // refreshes the list view
         * listView.refresh();
         */
        refresh: function() { },

        /**
         * Clears ListView selected items and triggers change event.
         */
        clearSelection: function() { },

        /**
         * Selects the specified ListView item. If called without arguments - returns the selected items.
         * @param {Selector | Array} items Items to select.
         * @example
         * // get a reference to the list view widget
         * var listView = $("#listView").data("kendoListView");
         * // selects first list view item
         * listView.select(listView.element.children().first());
         */
        select: function() { },

        /**
         * Edit specified ListView item. Triggers edit event.
         * @param {Object} item jQuery object containing the item to be edited.
         * @example
         * // get a reference to the list view widget
         * var listView = $("#listView").data("kendoListView");
         * // edit first list view item
         * listView.edit(listView.element.children().first());
        */
        edit: function() {},

        /**
         * Saves edited ListView item. If validation succeeds will call DataSource sync method.
         * @example
         * // get a reference to the list view widget
         * var listView = $("#listView").data("kendoListView");
         * // edit first list view item
         * listView.edit(listView.element.children().first());
         * // save edited item
         * listView.save();
        */
        save: function() {},

        /**
         * Removes specified ListView item. Triggers remove event and if not prevented calls DataSource sync method.
         * @param {Object} item jQuery object containing the item to be removed.
         * @example
         * // get a reference to the list view widget
         * var listView = $("#listView").data("kendoListView");
         * // remove first list view item
         * listView.remove(listView.element.children().first());
        */
        remove: function() {},

        /**
         * Inserts empty item as first item on the current view and prepare it for editing.
         * @example
         * // get a reference to the list view widget
         * var listView = $("#listView").data("kendoListView");
         * // add item
         * listView.add();
        */
        add: function() {},

        /**
         * Cancels changes in currently edited item.
         * @example
         * // get a reference to the list view widget
         * var listView = $("#listView").data("kendoListView");
         * // cancel changes in currently edited item
         * listView.cancel();
        */
        cancel: function() {}
    }

})();
