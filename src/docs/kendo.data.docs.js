(function() {
    /**
    * @name kendo.data
    * @namespace
    */

    /**
    * @name kendo.data.DataSource.Description
    *
    * @section
    *  <p>
    *      The DataSource component is an abstraction for using local (arrays of JavaScript objects) or
    *      remote (XML, JSON, JSONP) data. It fully supports CRUD (Create, Read, Update, Destroy) data
    *      operations and provides both local and server-side support for Sorting, Paging, Filtering, Grouping, and Aggregates.
    *  </p>
    *  <p>
    *      It is a powerful piece of the Kendo UI Framework, dramatically simplifying data binding and data operations.
    *  </p>
    *  <h3>Getting Started</h3>
    *
    * @exampleTitle Creating a DataSource bound to local data
    * @example
    * var movies = [ {
    *       title: "Star Wars: A New Hope",
    *       year: 1977
    *    }, {
    *      title: "Star Wars: The Empire Strikes Back",
    *      year: 1980
    *    }, {
    *      title: "Star Wars: Return of the Jedi",
    *      year: 1983
    *    }
    * ];
    * var localDataSource = new kendo.data.DataSource({data: movies});
    * @exampleTitle Creating a DataSource bound to a remote data service (Twitter)
    * @example
    * var dataSource = new kendo.data.DataSource({
    *     transport: {
    *         read: {
    *             // the remote service url
    *             url: "http://search.twitter.com/search.json",
    *
    *             // JSONP is required for cross-domain AJAX
    *             dataType: "jsonp",
    *
    *             // additional parameters sent to the remote service
    *             data: {
    *                 q: "html5"
    *             }
    *         }
    *     },
    *     // describe the result format
    *     schema: {
    *         // the data which the data source will be bound to is in the "results" field
    *         data: "results"
    *     }
    * });
    * @section
    *  <h3>Binding UI widgets to DataSource</h3>
    *  <p>
    *      Many Kendo UI widgets support data binding, and the Kendo UI DataSource is an ideal
    *      binding source for both local and remote data. A DataSource can be created in-line
    *      with other UI widget configuration settings, or a shared DataSource can be created
    *      to enable multiple UI widgets to bind to the same, observable data collection.
    *  </p>
    * @exampleTitle Creating a local DataSource in-line with UI widget configuration
    * @example
    * $("#chart").kendoChart({
    *     title: {
    *         text: "Employee Sales"
    *     },
    *     dataSource: new kendo.data.DataSource({
    *         data: [
    *         {
    *             employee: "Joe Smith",
    *             sales: 2000
    *         },
    *         {
    *             employee: "Jane Smith",
    *             sales: 2250
    *         },
    *         {
    *             employee: "Will Roberts",
    *             sales: 1550
    *         }]
    *     }),
    *     series: [{
    *         type: "line",
    *         field: "sales",
    *         name: "Sales in Units"
    *     }],
    *     categoryAxis: {
    *         field: "employee"
    *     }
    * });
    * @exampleTitle Creating and binding to a sharable remote DataSource
    * @example
    * var sharableDataSource = new kendo.data.DataSource({
    *     transport: {
    *         read: {
    *             url: "data-service.json",
    *             dataType: "json"
    *         }
    *     }
    * });
    *
    * // Bind two UI widgets to same DataSource
    * $("#chart").kendoChart({
    *     title: {
    *         text: "Employee Sales"
    *     },
    *     dataSource: sharableDataSource,
    *     series: [{
    *         field: "sales",
    *         name: "Sales in Units"
    *     }],
    *     categoryAxis: {
    *         field: "employee"
    *     }
    * });
    *
    * $("#grid").kendoGrid({
    *     dataSource: sharableDataSource,
    *         columns: [
    *         {
    *             field: "employee",
    *             title: "Employee"
    *         },
    *         {
    *             field: "sales",
    *             title: "Sales",
    *             template: '#= kendo.toString(sales, "N0") #'
    *     }]
    * });
    */

    var DataSource = Observable.extend(/** @lends kendo.data.DataSource.prototype */ {
        /**
        * @constructs
        * @extends kendo.Observable
        * @param {Object} options Configuration options.
        * @option {Array} [data] Specifies the local JavaScript object to use for the data source.
        * _example
        * // bind the datasource to a local JavaScript array
        * var orders = [ { orderId: 10248, customerName: "Paul Smith" }, { orderId: 10249, customerName: "Jane Jones" }];
        * var dataSource = new kendo.data.DataSource({
        *      data: orders
        * });
        * @option {Boolean} [serverPaging] <false> Determines if paging of the data should be handled on the server.
        * <p><b>serverPaging</b> must be used in conjunction with the <b>pageSize</b> configuration setting. The following options to the server as part of the query string by default:
        * <div class="details-list">
        *     <dl>
        *         <dt><b>take</b></dt>
        *         <dd>contains the number of records to retreive</dd>
        *         <dt><b>skip</b></dt>
        *         <dd>how many records from the front of the dataset to begin reading</dd>
        *         <dt><b>page</b></dt>
        *         <dd>the index of the current page of data</dd>
        *         <dt><b>pageSize</b></dt>
        *         <dd>the number of records per page</dd>
        *    </dl>
        * </div>
        * <p>It is possible to modify these parameters by using the <b>parameterMap</b> function found on the <b>transport</b> object (see <b>transport</b> in Configuration).</p>
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json"
        *     },
        *     serverPaging: true,
        *     pageSize: 5 // 5 records per page
        * });
        * @option {Boolean} [serverSorting] <false> Determines if sorting of the data should be handled on the server.
        * <p>The <b>serverSorting</b> must be used in conjunction with the <b>sort</b> configuration.  By default, a sort object is sent to the server with the query string in the following form:</p>
        * <ul>
        * <li>sort[0][field]: orderId</li>
        * <li>sort[0][dir]: asc</li>
        * </ul>
        * <p>It is possible to modify these parameters by using the <b>parameterMap</b> function found on the <b>transport</b> object (see <b>transport</b> in Configuration).</p>
        *_example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json"
        *     },
        *     serverSorting: true,
        *     sort: { field: "orderId", dir: "asc" }
        * });
        * @option {Boolean} [serverGrouping] <false> Determines if grouping of the data should be handled on the server.
        * <p>The <b>serverGrouping</b> must be used in conjunction with the <b>group</b> configuration.  By default, a group object is sent to the server with the query string in the following form:</p>
        * <ul>
        * <li>group[0][field]: orderId</li>
        * <li>group[0][dir]: desc</li>
        * </ul>
        * <p>It is possible to modify these parameters by using the <b>parameterMap</b> function found on the <b>transport</b> object (see <b>transport</b> in Configuration).</p>
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json"
        *     },
        *     serverGrouping: true,
        *     sort: { field: "orderId", dir: "asc" } // group by orderId descending
        * });
        * @option {Boolean} [serverFiltering] <false> Determines if filtering of the data should be handled on the server.
        * <p>The <b>serverFiltering</b> must be used in conjunction with the <b>filter</b> configuration.  By default, a filter object is sent to the server with the query string in the following form:</p>
        * <ul>
        * <li>filter[logic]: and</li>
        * <li>filter[filters][0][field]: orderId</li>
        * <li>filter[filters][0][operator]: desc</li>
        * <li>filter[filters][0][value]: 10248</li>
        * </ul>
        * <p>Possible values for <b>operator</b> include:</p>
        * <div class="details-list">
        *     <dl>
        *         <dt><b>Equal To</b></dt>
        *         <dd>"eq", "==", "isequalto", "equals", "equalto", "equal"</dd>
        *         <dt><b>Not Equal To</b></dt>
        *         <dd>"neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "ne"</dd>
        *         <dt><b>Less Then</b></dt>
        *         <dd>"lt", "<", "islessthan", "lessthan", "less"</dd>
        *         <dt><b>Less Then or Equal To</b></dt>
        *         <dd> "lte", "<=", "islessthanorequalto", "lessthanequal", "le"</dd>
        *         <dt><b>Greater Then</b></dt>
        *         <dd> "gt", ">", "isgreaterthan", "greaterthan", "greater"</dd>
        *         <dt><b>Greater Then or Equal To</b></dt>
        *         <dd>"gte", ">=", "isgreaterthanorequalto", "greaterthanequal", "ge"</dd>
        *         <dt><b>Starts With</b></dt>
        *         <dd>"startswith"</dd>
        *         <dt><b>Ends With</b></dt>
        *         <dd>"endswith"</dd>
        *         <dt><b>Contains</b></dt>
        *         <dd>"contains", "substringof"</dd>
        *     </dl>
        * </div>
        * <p>It is possible to modify these parameters by using the <b>parameterMap</b> function found on the <b>transport</b> object (see <b>transport</b> in Configuration).</p>
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json"
        *     },
        *     serverFiltering: true,
        *     filter: { field: "orderId", operator: "eq", value: 10248 } // return only data where orderId equals 10248
        * });
        * @option {Boolean} [serverAggregates] <false> Determines if aggregates should be calculated on the server.
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json"
        *     },
        *     serverAggregates: true,
        *     aggregate: { field: "orderId", operator: "eq", value: 10248 } // return only data where orderId equals 10248
        * });
        * @option {Number} [pageSize] <undefined> Sets the number of records which contains a given page of data.
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     pageSize: 5 // 5 records per page of data
        * });
        * @option {Number} [page] <undefined> Sets the index of the displayed page of data.
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     page: 2 // displays the second page of data in the bound widget
        * });
        * @option {Array | Object} [sort] <undefined> Sets initial sort order
        * _example
        * // sorts data ascending by orderId field
        * sort: { field: "orderId", dir: "asc" }
        *
        * // sorts data ascending by orderId field and then descending by shipmentDate
        * sort: [ { field: "orderId", dir: "asc" }, { field: "shipmentDate", dir: "desc" } ]
        *
        * @option {Array | Object} [filter] <undefined> Sets initial filter
        * _example
        * // returns only data where orderId is equal to 10248
        * filter: { field: "orderId", operator: "eq", value: 10248 }
        *
        * // returns only data where orderId is equal to 10248 and customerName starts with Paul
        * filter: [ { field: "orderId", operator: "eq", value: 10248 },
        *           { field: "customerName", operator: "startswith", value: "Paul" } ]
        *
        * @option {Array | Object} [group] <undefined> Sets initial grouping
        * _example
        * // groups data by orderId field
        * group: { field: "orderId" }
        *
        * // groups data by orderId and customerName fields
        * group: [ { field: "orderId", dir: "desc" }, { field: "customerName", dir: "asc" } ]
        *
        * @option {Array | Object} [aggregate] <undefined> Sets fields on which initial aggregates should be calculated
        * _example
        * // calculates total sum of unitPrice field's values.
        * [{ field: "unitPrice", aggregate: "sum" }]
        *
        * @option {String} [type] Loads transport with preconfigured settings. Currently supports only "odata" (Requires kendo.data.odata.js to be included).
        *
        * @option {Object} [transport] Sets the object responsible for loading and saving of data.
        *  This can be a remote or local/in-memory data.
        *
        * @option {Object | String} [transport.read] Options for remote read data operation, or the URL of the remote service
        * _example
        * // settings various options for remote data transport
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: {
        *             // the remote service URL
        *             url: "http://search.twitter.com/search.json",
        *
        *             // JSONP is required for cross-domain AJAX
        *             dataType: "jsonp",
        *
        *             // additional parameters sent to the remote service
        *             data: {
        *                 q: function() {
        *                     return $("#searchFor").val();
        *                 }
        *             }
        *         }
        *     }
        * });
        *
        *  // consuming odata feed without setting additional options
        *  var dataSource = new kendo.data.DataSource({
        *      type: "odata",
        *      transport: {
        *          read: "http://odata.netflix.com/Catalog/Titles"
        *      }
        *  });
        *
        * @option {String} [transport.read.url] The remote service URL
        * @option {String} [transport.read.dataType] The type of data that you're expecting back from the server
        * @option {Object | Function} [transport.read.data] Additional data to be sent to the server
        *
        * @option {Object | String} [transport.create.url] The remote url to call when creating a new record
        * @option {String} [transport.create.dataType] The type of data that you're expecting back from the server
        * @options {Object | Function} [transport.create.data] Additional data to be sent to the server
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json",
        *         create: {
        *             url: "orders/create.json"
        *         }
        *     }
        * });
        *
        * @option {Object | String} [transport.create] Options for remote create data operation, or the URL of the remote service
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json",
        *         update: {
        *             url: "orders/update.json",
        *             data: {
        *                 orderId: $("#input").val() // sends the value of the input as the orderId
        *             }
        *         }
        *     }
        * });
        * @option {Object | String} [transport.update.url] The remote url to call when updating a record
        * @option {String} [transport.update.dataType] The type of data that you're expecting back from the server
        * @options {Object | Function} [transport.update.data] Additional data to be sent to the server
        *
        * @option {Object | String} [transport.update] Options for remote update operation, or the URL of the remote service
        * _example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json",
        *         destroy: {
        *             url: "orders/create.json",
        *         }
        *     }
        * });
        * @option {Object | String} [transport.destroy] Options for the remote delete data operation, or the URL of the remote service
        * @option {Function} [transport.parameterMap] Convert the request parameters from dataSource format to remote service specific format.
        * _example
        *  var dataSource = new kendo.data.DataSource({
        *      transport: {
        *        read: "Catalog/Titles",
        *        parameterMap: function(options) {
        *           return {
        *              pageIndex: options.page,
        *              size: options.pageSize,
        *              orderBy: convertSort(options.sort)
        *           }
        *        }
        *      }
        *  });
        * @option {Object | String} [transport.destroy.url] The remote url to call when creating a new record
        * @option {String} [transport.destroy.dataType] The type of data that you're expecting back from the server
        * @options {Object | Function} [transport.destroy.data] Additional data to be sent to the server
        *
        * @option {Object} [schema] Set the object responsible for describing the raw data format
        * _example
        *  var dataSource = new kendo.data.DataSource({
        *      transport: {
        *        read: "Catalog/Titles",
        *      },
        *      schema: {
        *          aggregates: function(data) {
        *               // returns aggregates
        *          },
        *          data: function(data) {
        *              return data.result;
        *          },
        *          total: function(data) {
        *              return data.totalCount;
        *          },
        *          parse: function(data) {
        *              return data;
        *          },
        *          type: "jsonp"
        *      }
        *  });
        * @option {String} [schema.type] Specify the type of schema { xml | json }
        * @option {Function} [schema.parse] Executed before deserialized data is read.
        *  Appropriate for preprocessing of the raw data.
        * @option {Function} [schema.data] Returns the deserialized data.
        * @option {Function} [schema.total] Returns the total number of records.
        * @option {Function} [schema.aggregates] Returns the calculated aggregates.
        * @option {Function} [schema.groups] Used instead of data function if remote grouping operation is executed.
        *  Returns the deserialized data.
        * @option {Object} [schema.model] Describes the Model
        * _example
        *    var dataSource = new kendo.data.DataSource({
        *        //..
        *         schema: {
        *             model: {
        *                 id: "ProductID",
        *                 fields: {
        *                      ProductID: {
        *                         //this field will not be editable (default value is true)
        *                         editable: false,
        *                         // a defaultValue will not be assigned (default value is false)
        *                         nullable: true
        *                      },
        *                      ProductName: {
        *                          validation: { //set validation rules
        *                              required: true
        *                          }
        *                      },
        *                      UnitPrice: {
        *                        //data type of the field {Number|String|Boolean|Date} default is String
        *                        type: "number",
        *                        // used when new model is created
        *                        defaultValue: 42,
        *                        validation: {
        *                            required: true,
        *                            min: 1
        *                        }
        *                    }
        *                }
        *            }
        *        }
        *    })
        * @option {Number | String} [schema.model.id] The field use to identify an unique Model instance
        * @option {Object} [schema.model.fields] Describes the model fields and their properties
        **/
        init: function(options) {
        },

        /**
        * Retrieves a Model instance by given id.
        * @param {Number} id The id of the model to be retrieved
        * @returns {Object} Model instance if found
        * @example
        * var order = dataSource.get(1); // retrieves the "order" model item with an id of 1
        */
        get: function(id) {
        },

        /**
        * Retrieves a Model instance by its UID.
        * @param {String} uid The uid of the record to be retrieved
        * @returns {Object} Model instance if found
        */
        getByUid: function(uid) {
        },

        /**
        * Synchronizes changes through the transport. Any pending CRUD operations will be sent to the server.
        * <p>If the DataSource is in <b>batch</b> mode, only one call will be made for each type of operation.
        * Otherwise, the DataSource will send one command per pending item change per change type.
        * @example
        * // we have deleted 2 items and updated 1. If not in batch mode, this will send three commands to the server
        * dataSource.sync();
        */
        sync: function() {
        },

        /**
        * Adds a new Model instance to the DataSource
        * @param  {Object} model Either a Model instance or raw object from which the Model will be created
        * @returns {Object} The Model instance which has been added
        * @example
        * var model = kendo.data.Model.extend({
        *     id: "orderId",
        *     fields: {
        *         name: "customerName",
        *         description: "orderDescription",
        *         address: "customerAddress"
        *     }
        * });
        * // add a new model item to the data source.  If a model has not been declared as above, a new
        * // model instance will be created for you.
        * dataSource.add({ name: "John Smith", description: "Product Description", address: "123 1st Street" });
        */
        add: function(model) {
            return this.insert(this._data.length, model);
        },

        /**
        * Inserts a new Model instance to the DataSource.
        * @param {Number} index Index at which the Model will be inserted
        * @param {Object} model Either a Model instance or raw object from which the Model will be created
        * @example
        * var model = kendo.data.Model.extend({
        *     id: "orderId",
        *     fields: {
        *         name: "customerName",
        *         description: "orderDescription",
        *         address: "customerAddress"
        *     }
        * });
        * // insert a new model item at the very front of the collection
        * dataSource.insert(0, { name: "John Smith", description: "Product Description", address: "123 1st Street" });
        * @returns {Object} The Model instance which has been inserted
        */
        insert: function(index, model) {
        },

        /**
        * Cancel the changes made to the DataSource after the last sync. Any changes currently existing in the model
        * will be discarded.
        * @example
        * // we have updated 2 items and deleted 1. All of those changes will be discarded.
        * dataSource.cancelChanges();
        */
        cancelChanges: function(model) {
        },

        /**
        * Read the data into the DataSource using the transport read definition
        * @example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json";
        *     }
        * });
        * // the datasource will not contain any data until a read is called
        * dataSource.read();
        */
        read: function(data) {
        },

        indexOf: function(model) {
        },

        /**
        * Remove given Model instance from the DataSource.
        * @param {Object} model Model instance to be removed
        * @example
        * // get the model item with an id of 1 from the DataSource
        * var itemToRemove = dataSource.get(1);
        * // remove the item from the DataSource
        * dataSource.remove(itemToRemove);
        */
        remove: function(model) {
        },

        /**
        * Returns the raw data record at the specified index
        * @param {Number} index The zero-based index of the data record
        * @returns {Object}
        * @example
        * // returns the 4th item in the collection
        * var order = dataSource.at(3);
        */
        at: function(index) {
        },

        /**
        * Get data returned from the transport
        * @returns {Array} Array of items
        * @example
        * var data = dataSource.data();
        */
        data: function(value) {
        },

        /**
        * Returns a view of the data with operation such as in-memory sorting, paring, grouping and filtering are applied.
        * To ensure that data is available this method should be use from within change event of the dataSource.
        * @returns {Array} Array of items
        * @example
        * var dataSource = new kendo.data.DataSource({
        *     transport: {
        *         read: "orders.json"
        *     }
        *     change: function(e) {
        *        // create a template instance
        *        var template = kendo.template($("#template").html());
        *        // render a view by passing the data to a template
        *        kendo.render(template, dataSource.view());
        *     }
        * });
        */
        view: function() {
        },

        /**
        * Executes a query over the data. Available operations are paging, sorting, filtering, grouping.
        * If data is not available or remote operations are enabled, data is requested through the transport.
        * Otherwise operations are executed over the available data.
        * @param {Object} [options] Contains the settings for the operations. Note: If setting for previous operation is omitted, this operation is not applied to the resulting view
        * @example
        *
        * // create a view containing at most 20 records, taken from the
        * // 5th page and sorted ascending by orderId field.
        * dataSource.query({ page: 5, pageSize: 20, sort: { field: "orderId", dir: "asc" } });
        *
        * // moves the view to the first page returning at most 20 records
        * // but without particular ordering.
        * dataSource.query({ page: 1, pageSize: 20 });
        *
        */
        query: function(options) {
        },

        /**
        * Fetches data using the current filter/sort/group/paging information.
        * If data is not available or remote operations are enabled data is requested through the transport,
        * otherwise operations are executed over the available data.
        * @example
        * dataSource.fetch();
        */
        fetch: function(callback) {
        },

        /**
        * Get current page index or request a page with specified index.
        * @param {Number} [val] <undefined> The index of the page to be retrieved
        * @example
        * dataSource.page(2);
        * @returns {Number} Current page index
        */
        page: function(val) {
        },

        /**
        * Get current pageSize or request a page with specified number of records.
        * @param {Number} [val] <undefined> The of number of records to be retrieved.
        * @example
        * dataSource.pageSize(25);
        * @returns {Number} Current page size
        */
        pageSize: function(val) {
        },

        /**
        * Get current sort descriptors or sorts the data.
        * @param {Object | Array} [val] <undefined> Sort options to be applied to the data
        * @example
        * dataSource.sort({ field: "orderId", dir: "desc" });
        * dataSource.sort([
        *      { field: "orderId", dir: "desc" },
        *      { field: "unitPrice", dir: "asc" }
        * ]);
        * @returns {Array} Current sort descriptors
        */
        sort: function(val) {
        },

        /**
        * Get current filters or filter the data.
        *<p>
        * <i>Supported filter operators/aliases are</i>:
        * <div class="details-list">
        *     <dl>
        *         <dt><b>Equal To</b></dt>
        *         <dd>"eq", "==", "isequalto", "equals", "equalto", "equal"</dd>
        *         <dt><b>Not Equal To</b></dt>
        *         <dd>"neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "ne"</dd>
        *         <dt><b>Less Then</b></dt>
        *         <dd>"lt", "<", "islessthan", "lessthan", "less"</dd>
        *         <dt><b>Less Then or Equal To</b></dt>
        *         <dd> "lte", "<=", "islessthanorequalto", "lessthanequal", "le"</dd>
        *         <dt><b>Greater Then</b></dt>
        *         <dd> "gt", ">", "isgreaterthan", "greaterthan", "greater"</dd>
        *         <dt><b>Greater Then or Equal To</b></dt>
        *         <dd>"gte", ">=", "isgreaterthanorequalto", "greaterthanequal", "ge"</dd>
        *         <dt><b>Starts With</b></dt>
        *         <dd>"startswith"</dd>
        *         <dt><b>Ends With</b></dt>
        *         <dd>"endswith"</dd>
        *         <dt><b>Contains</b></dt>
        *         <dd>"contains", "substringof"</dd>
        *     </dl>
        * </div>
        * </p>
        * @param {Object|Array} [val] <undefined> Filter(s) to be applied to the data.
        * @example
        * dataSource.filter({ field: "orderId", operator: "eq", value: 10428 });
        * dataSource.filter([
        *      { field: "orderId", operator: "neq", value: 42 },
        *      { field: "unitPrice", operator: "ge", value: 3.14 }
        * ]);
        * @returns {Array} Current filter descriptors
        */
        filter: function(val) {
        },

        /**
        * Get current group descriptors or group the data.
        * @param {Object|Array} [val] <undefined> Group(s) to be applied to the data.
        * @example
        * dataSource.group({ field: "orderId" });
        * @returns {Array} Current grouping descriptors
        */
        group: function(val) {
        },

        /**
        * Get the total number of records
        * @example
        * var total = dataSource.total();
        */
        total: function() {
        },

        /**
        * Get current aggregate descriptors or applies aggregates to the data.
        * @param {Object|Array} [val] <undefined> Aggregate(s) to be applied to the data.
        * @example
        * dataSource.aggregate({ field: "orderId", aggregate: "sum" });
        * @returns {Array} Current aggregate descriptors
        */
        aggregate: function(val) {
        },

        /**
        * Get result of aggregates calculation
        * @returns {Array} Aggregates result
        * @example
        * var aggr = dataSource.aggregates();
        */
        aggregates: function() {
        },

        /**
        * Get the number of available pages.
        * @returns {Number} Number of available pages.
        * @example
        * var pages = dataSource.totalPages();
        */
        totalPages: function() {
        }
    });

    /**
    * Fires when an error occurs during data retrieval.
    * @name kendo.data.DataSource#error
    * @event
    * @example
    * var dataSource = new kendo.data.DataSource({
    *     error: function(e) {
    *         // handle event
    *     }
    * });
    * @exampleTitle To set after initialization
    * @example
    * dataSource.bind("error", function(e) {
    *     // handle event
    * });
    */

    /**
    * Fires when data is changed
    * @name kendo.data.DataSource#change
    * @event
    * @example
    * var dataSource = new kendo.data.DataSource({
    *     change: function(e) {
    *         // handle event
    *     }
    * });
    * @exampleTitle To set after initialization
    * @example
    * dataSource.bind("change", function(e) {
    *     // handle event
    * });
    */
})(jQuery);
