(function($, undefined) {
    /**
     * @name kendo.data
     * @namespace
     */

    /**
     * @name kendo.data.DataSource.Description
     *
     * @section The DataSource component is an abstraction for using local (arrays of JavaScript objects) or remote (XML, JSON, JSONP) data.
     * It fully supports the CRUD (Create, Read, Update and Destroy) data operations. The DataSource also provides means to sort, page, filter, group and aggregate (both locally and server side).
     * @exampleTitle Creating a DataSource bound to local data (array of JavaScript objects)
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
    * var localDataSource = new kendo.data.DataSource(movies);
    * @exampleTitle Binding to remote data service (Twitter)
    * @example
    *var dataSource = new kendo.data.DataSource({
    *    transport: {
    *        read: {
    *            url: "http://search.twitter.com/search.json", // the remove service url
    *            dataType: "jsonp", // JSONP (JSON with padding) is required for cross-domain AJAX
    *            data: {
    *                q: "html5" //additional parameters sent to the remote service
    *            }
    *        }
    *    },
    *    schema: { // describe the result format
    *        data: "results" // the data which the data source will be bound to is in the "results" field
    *    }
    *});
    */
    var extend = $.extend,
        proxy = $.proxy,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        isArray = $.isArray,
        grep = $.grep,
        ajax = $.ajax,
        map,
        each = $.each,
        noop = $.noop,
        kendo = window.kendo,
        Observable = kendo.Observable,
        Class = kendo.Class,
        Model = kendo.data.Model,
        ModelSet = kendo.data.ModelSet,
        STRING = "string",
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        MULTIPLE = "multiple",
        SINGLE = "single",
        ERROR = "error",
        REQUESTSTART = "requestStart",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function(o) { return o; },
        getter = kendo.getter,
        stringify = kendo.stringify,
        rgDate = /^\/Date\((.*?)\)\/$/;

    var Comparer = {
        selector: function(field) {
            return isFunction(field) ? field : getter(field);
        },

        asc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                return a > b ? 1 : (a < b ? -1 : 0);
            };
        },

        desc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                return a < b ? 1 : (a > b ? -1 : 0);
            };
        },

        create: function(descriptor) {
            return Comparer[descriptor.dir.toLowerCase()](descriptor.field);
        },

        combine: function(comparers) {
             return function(a, b) {
                 var result = comparers[0](a, b),
                     idx,
                     length;

                 for (idx = 1, length = comparers.length; idx < length; idx ++) {
                     result = result || comparers[idx](a, b);
                 }

                 return result;
             }
        }
    };

    var Filter = {
        create: function(expressions) {
            var idx,
                length,
                expr,
                selector,
                operator,
                desc,
                descriptors = [],
                caseSensitive,
                predicate;

            expressions = expressions || [];
            for(idx = 0, length = expressions.length; idx < length; idx ++) {
                expr = expressions[idx];
                if(typeof expr.value === STRING && !expr.caseSensitive) {
                     caseSensitive = function(value) {
                        return value.toLowerCase();
                     };
                } else {
                    caseSensitive = function(value) {
                        return value;
                    };
                }
                selector = Filter.selector(expr.field, caseSensitive);
                operator = Filter.operator(expr.operator);
                desc = operator(selector, caseSensitive(expr.value));
                descriptors.push(desc);
            }
            predicate = Filter.combine(descriptors);

            return function(data) {
                return Filter.execute(predicate, data);
            };
        },
        selector: function(field, caseSensitive) {
            if (field) {
                if (isFunction(field)) {
                    return field;
                } else {
                    var accessor = getter(field);
                    return function(record) {
                        var value = accessor(record);
                        if (typeof value === "string") {
                            var date = rgDate.exec(value);
                            if (date) {
                                value = new Date(parseInt(date[1]));
                            }
                        }
                        return caseSensitive(value);
                    };
                }
            }
            return function(record) {
                return caseSensitive(record);
            };
        },
        execute: function(predicate, data) {
            var idx,
                length = data.length,
                record,
                result = [];

            for(idx = 0; idx < length; idx ++) {
                record = data[idx];

                if (predicate(record)) {
                    result.push(record);
                }
            }

            return result;
        },
        combine: function(descriptors) {
            return function(record) {
                var result = true,
                    idx = 0,
                    length = descriptors.length;

                while (result && idx < length) {
                    result = descriptors[idx ++](record);
                }

                return result;
            };
        },
        operator: function(operator) {
            if (!operator) {
                return Filter.eq;
            }

            if (isFunction(operator)) {
                return operator;
            }

            operator = operator.toLowerCase();
            operatorStrings = Filter.operatorStrings;
            for (var op in operatorStrings) {
                if ($.inArray(operator, operatorStrings[op]) > -1) {
                    operator = op;
                    break;
                }
            }

            return Filter[operator];
        },
        operatorStrings: {
            "eq": ["eq", "==", "isequalto", "equals", "equalto", "equal"],
            "neq": ["neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "not", "ne"],
            "lt": ["lt", "<", "islessthan", "lessthan", "less"],
            "lte": ["lte", "<=", "islessthanorequalto", "lessthanequal", "le"],
            "gt": ["gt", ">", "isgreaterthan", "greaterthan", "greater"],
            "gte": ["gte", ">=", "isgreaterthanorequalto", "greaterthanequal", "ge"],
            "startswith": ["startswith"],
            "endswith": ["endswith"],
            "contains": ["contains", "substringof"]
        },
        eq: function(selector, value) {
            return function(record){
                var item = selector(record);
                return item > value ? false : (value > item ? false : true);
            };
        },
        neq: function(selector, value) {
            return function(record){
                return selector(record) != value;
            };
        },
        lt: function(selector, value) {
            return function(record){
                return selector(record) < value;
            };
        },
        lte: function(selector, value) {
            return function(record){
                return selector(record) <= value;
            };
        },
        gt: function(selector, value) {
            return function(record){
                return selector(record) > value;
            };
        },
        gte: function(selector, value) {
            return function(record){
                return selector(record) >= value;
            };
        },
        startswith: function(selector, value) {
            return function(record){
                return selector(record).indexOf(value) == 0;
            };
        },
        endswith: function(selector, value) {
            return function(record){
                var item = selector(record);
                return item.lastIndexOf(value) == item.length - 1;
            };
        },
        contains: function(selector, value) {
            return function(record){
                return selector(record).indexOf(value) > -1;
            };
        }
    }

    if (Array.prototype.map !== undefined) {
        map = function (array, callback) {
            return array.map(callback);
        }
    } else {
        map = function (array, callback) {
            var length = array.length, result = new Array(length);

            for (var i = 0; i < length; i++) {
                result[i] = callback(array[i], i, array);
            }

            return result;
        }
    }

    function Query(data) {
        this.data = data || [];
    }

    function expandSort(field, dir) {
        if (field) {
        var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
            descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return grep(descriptors, function(d) { return !!d.dir; });
        }
    }

    function expandFilter(expressions) {
        if (expressions) {
            return expressions = isArray(expressions) ? expressions : [expressions];
        }
    }

    function expandAggregates(expressions) {
        return expressions = isArray(expressions) ? expressions : [expressions];
    }

    function expandGroup(field, dir) {
       var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
           descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(d) { return { field: d.field, dir: d.dir || "asc", aggregates: d.aggregates }; });
    }

    Query.prototype = {
        toArray: function () {
            return this.data;
        },
        range: function(index, count) {
            return new Query(this.data.slice(index, index + count));
        },
        skip: function (count) {
            return new Query(this.data.slice(count));
        },
        take: function (count) {
            return new Query(this.data.slice(0, count));
        },
        select: function (selector) {
            return new Query(map(this.data, selector));
        },
        orderBy: function (selector) {
            var result = this.data.slice(0),
                comparer = isFunction(selector) || !selector ? Comparer.asc(selector) : selector.compare;

            return new Query(result.sort(comparer));
        },
        orderByDescending: function (selector) {
            return new Query(this.data.slice(0).sort(Comparer.desc(selector)));
        },
        sort: function(field, dir) {
            var idx,
                length,
                descriptors = expandSort(field, dir),
                comparers = [];

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(Comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: Comparer.combine(comparers) });
            }

            return this;
        },
        filter: function(expressions) {
            var predicate = Filter.create(expandFilter(expressions));
            return new Query(predicate(this.data));
        },
        group: function(descriptors, allData) {
            descriptors =  expandGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
                result = new Query(that.data),
                descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function(group) {
                    var data = new Query(allData).filter([ { field: group.field, operator: "eq", value: group.value } ]);
                    return {
                        field: group.field,
                        value: group.value,
                        items: descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), data.toArray()).toArray() : group.items,
                        hasSubgroups: descriptors.length > 1,
                        aggregates: data.aggregate(descriptor.aggregates)
                    }
                });
            }
            return result;
        },
        groupBy: function(descriptor) {
            if (isEmptyObject(descriptor) || !this.data.length) {
                return new Query([]);
            }

            var field = descriptor.field,
                sorted = this.sort(field, descriptor.dir || "asc").toArray(),
                accessor = kendo.accessor(field),
                item,
                groupValue = accessor.get(sorted[0], field),
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                },
                currentValue,
                idx,
                len,
                result = [group];

            for(idx = 0, len = sorted.length; idx < len; idx++) {
                item = sorted[idx];
                currentValue = accessor.get(item, field);
                if(groupValue !== currentValue) {
                    groupValue = currentValue;
                    group = {
                        field: field,
                        value: groupValue,
                        items: []
                    };
                    result.push(group);
                }
                group.items.push(item);
            }
            return new Query(result);
        },
        aggregate: function (aggregates) {
            var idx,
                len,
                result = {};

            if (aggregates && aggregates.length) {
                for(idx = 0, len = this.data.length; idx < len; idx++) {
                   calculateAggregate(result, aggregates, this.data[idx], idx, len);
                }
            }
            return result;
        }
    }
    function calculateAggregate(accumulator, aggregates, item, index, length) {
            aggregates = aggregates || [];
            var idx,
                aggr,
                functionName,
                fieldAccumulator,
                len = aggregates.length;

            for (idx = 0; idx < len; idx++) {
                aggr = aggregates[idx];
                functionName = aggr.aggregate;
                var field = aggr.field;
                accumulator[field] = accumulator[field] || {};
                accumulator[field][functionName] = functions[functionName.toLowerCase()](accumulator[field][functionName], item, kendo.accessor(field), index, length);
            }
        }

    var functions = {
        sum: function(accumulator, item, accessor) {
            return accumulator = (accumulator || 0) + accessor.get(item);
        },
        count: function(accumulator, item, accessor) {
            return (accumulator || 0) + 1;
        },
        average: function(accumulator, item, accessor, index, length) {
            accumulator = (accumulator || 0) + accessor.get(item);
            if(index == length - 1) {
                accumulator = accumulator / length;
            }
            return accumulator;
        },
        max: function(accumulator, item, accessor) {
            var accumulator =  (accumulator || 0),
                value = accessor.get(item);
            if(accumulator < value) {
                accumulator = value;
            }
            return accumulator;
        },
        min: function(accumulator, item, accessor) {
            var value = accessor.get(item),
                accumulator = (accumulator || value)
            if(accumulator > value) {
                accumulator = value;
            }
            return accumulator;
        }
    };

    function process(data, options) {
        var query = new Query(data),
            options = options || {},
            group = options.group,
            sort = expandSort(options.sort || []).concat(expandGroup(group || [])),
            total,
            filter = options.filter,
            skip = options.skip,
            take = options.take;

        if (filter) {
            query = query.filter(filter);
            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);
        }

        if (skip !== undefined && take !== undefined) {
            query = query.range(skip, take);
        }

        if (group) {
            query = query.group(group, data);
        }

        return {
            total: total,
            data: query.toArray()
        };
    }

    function calculateAggregates(data, options) {
        var query = new Query(data),
            options = options || {},
            aggregates = options.aggregates,
            filter = options.filter;

        if(filter) {
            query = query.filter(filter);
        }
        return query.aggregate(aggregates);
    }

    var LocalTransport = Class.extend({
        init: function(options) {
            this.data = options.data;
        },

        read: function(options) {
            options.success(this.data);
        },
        update: noop
    });

    var RemoteTransport = Class.extend( {
        init: function(options) {
            var that = this, dialect;

            options = that.options = extend({}, that.options, options);

            each(crud, function(index, type) {
                if (typeof options[type] === STRING) {
                    options[type] = {
                        url: options[type]
                    };
                }
            });

            that.cache = options.cache? Cache.create(options.cache) : {
                find: noop,
                add: noop
            }

            dialect = options.dialect;

            that.dialect = isFunction(dialect) ? dialect : function(options) {
                var result = {};

                each(options, function(option, value) {
                    if (option in dialect) {
                        option = dialect[option];
                        if (isPlainObject(option)) {
                            value = option.value(value);
                            option = option.key;
                        }
                    }

                    result[option] = value;
                });

                return result;
            };
        },

        options: {
            dialect: identity
        },

        create: function(options) {
            return ajax(this.setup(options, CREATE));
        },

        read: function(options) {
            var that = this,
                success,
                error,
                result,
                cache = that.cache;

            options = that.setup(options, READ);

            success = options.success || noop;
            error = options.error || noop;

            result = cache.find(options.data);

            if(result !== undefined) {
                success(result);
            } else {
                options.success = function(result) {
                    cache.add(options.data, result);

                    success(result);
                };

                $.ajax(options);
            }
        },

        update: function(options) {
            return ajax(this.setup(options, UPDATE));
        },

        destroy: function(options) {
            return ajax(this.setup(options, DESTROY));
        },

        setup: function(options, type) {
            options = options || {};

            var that = this,
                operation = that.options[type],
                data = isFunction(operation.data) ? operation.data() : operation.data;

            options = extend(true, {}, operation, options);
            options.data = that.dialect(extend(data, options.data));

            return options;
        }
    });

    Cache.create = function(options) {
        var store = {
            "inmemory": function() { return new Cache(); },
            "localstorage": function() { return new LocalStorageCache(); }
        };

        if (isPlainObject(options) && isFunction(options.find)) {
            return options;
        }

        if (options === true) {
            return new Cache();
        }

        return store[options]();
    }

    function Cache() {
        this._store = {};
    }

    Cache.prototype = /** @ignore */ {
        add: function(key, data) {
            if(key !== undefined) {
                this._store[stringify(key)] = data;
            }
        },
        find: function(key) {
            return this._store[stringify(key)];
        },
        clear: function() {
            this._store = {};
        },
        remove: function(key) {
            delete this._store[stringify(key)];
        }
    }

    function LocalStorageCache() {
        this._store = window.localStorage;
    }

    LocalStorageCache.prototype = {
        add: function(key, data) {
            if (key != undefined) {
                this._store.setItem(stringify(key), stringify(data));
            }
        },
        find: function(key) {
            return $.parseJSON(this._store.getItem(stringify(key)));
        },
        clear: function() {
            this._store.clear();
        },
        remove: function(key) {
            this._store.removeItem(stringify(key));
        }
    }

    var DataReader = Class.extend({
        init: function(schema) {
            var that = this, member, get;

            schema = schema || {};

            for (member in schema) {
                get = schema[member];

                that[member] = typeof get === STRING ? getter(get) : get;
            }

            if (isPlainObject(that.model)) {
                that.model = Model.define(that.model);
            }
        },
        parse: identity,
        data: identity,
        total: function(data) {
            return data.length;
        },
        groups: identity,
        status: function(data) {
            return data.status;
        },
        aggregates: function() {
            return {};
        }
    });


    var DataSource = Observable.extend(/** @lends kendo.data.DataSource.prototype */ {
        /**
         * @constructs
         * @extends kendo.Observable
         * @param {Object} options Configuration options.
         * @option {Array} [data] The data in the DataSource.
         * @option {Boolean} [serverPaging] <false> Determines if paging of the data should be handled on the server.
         * @option {Boolean} [serverSorting] <false> Determines if sorting of the data should be handled on the server.
         * @option {Boolean} [serverGrouping] <false> Determines if grouping of the data should be handled on the server.
         * @option {Boolean} [serverFiltering] <false> Determines if filtering of the data should be handled on the server.
         * @option {Boolean} [serverAggregates] <false> Determines if aggregates should be calculated on the server.
         * @option {Number} [pageSize] <undefined> Sets the number of records which contains a given page of data.
         * @option {Number} [page] <undefined> Sets the index of the displayed page of data.
         * @option {Array|Object} [sort] <undefined> Sets initial sort order
         * _example
         * // sorts data ascending by orderId field
         * sort: { field: "orderId", dir: "asc" }
         *
         * // sorts data ascending by orderId field and then descending by shipmentDate
         * sort: [ { field: "orderId", dir: "asc" }, { field: "shipmentDate", dir: "desc" } ]
         *
         * @option {Array|Object} [filter] <undefined> Sets initial filter
         * _example
         * // returns only data where orderId is equal to 10248
         * filter: { field: "orderId", operation: "eq", value: 10248 }
         *
         * // returns only data where orderId is equal to 10248 and customerName starts with Paul
         * filter: [ { field: "orderId", operation: "eq", value: 10248 }, { field: "customerName", operation: "startswith", value: "Paul" } ]
         *
         * @option {Array|Object} [group] <undefined> Sets initial grouping
         * _example
         * // groups data by orderId field
         * group: { field: "orderId" }
         *
         * // groups data by orderId and customerName fields
         * group: [ { field: "orderId", dir: "desc" }, { field: "customerName", dir: "asc" } ]
         *
         * @option {Array|Object} [aggregates] <undefined> Sets fields on which initial aggregates should be calculated
         * _example
         * // calculates total sum of unitPrice field's values.
         * [{ field: "unitPrice", aggregate: "sum" }]
         *
         * @option {Object} [transport] Sets the object responsible for loading and saving of data.
         *  This can be a remote or local/in-memory data.
         *
         * @option {Object|String} [transport.read] Options for remote read data operation or the URL of the remote service
         * _example
         *  //settings various options for remote data transport
         *  var dataSource = new kendo.data.DataSource({
         *     transport: {
         *        read: {
         *            url: "http://search.twitter.com/search.json", // the remove service URL
         *            dataType: "jsonp", // JSONP (JSON with padding) is required for cross-domain AJAX
         *            data: { //additional parameters sent to the remote service
         *                q: function() {
         *                    return $("#searchFor").val();
         *                }
         *            }
         *        }
         *     }
         *  });
         *
         *  //consuming odata feed without setting additional options
         *  var dataSource = new kendo.data.DataSource({
         *      type: "odata",
         *      transport: {
         *          read: "http://odata.netflix.com/Catalog/Titles"
         *      }
         *  });
         *
         * @option {String} [transport.read.url] The remote service URL
         * @option {String} [transport.read.dataType] The type of data that you're expecting back from the server
         * @option {Object|Function} [transport.read.data] Additional data to be send to the server
         *
         * @option {Function} [transport.dialect] Convert the request parameters from dataSource format to remote service specific format.
         * _example
         *  var dataSource = new kendo.data.DataSource({
         *      transport: {
         *        read: "Catalog/Titles",
         *        dialect: function(options) {
         *           return {
         *              pageIndex: options.page,
         *              size: options.pageSize,
         *              orderBy: convertSort(options.sort)
         *           }
         *        }
         *      }
         *  });
         *
         * @option {Object} [schema] Set the object responsible for describing the raw data format
         * _example
         *  var dataSource = new kendo.data.DataSource({
         *      transport: {
         *        read: "Catalog/Titles",
         *      },
         *      schema: {
         *          data: function(data) {
         *              return data.result;
         *          },
         *          total: function(data) {
         *              return data.totalCount;
         *          },
         *          parse: function(data) {
         *              return data;
         *          }
         *      }
         *  });
         * @option {Function} [schema.parse] Executed before deserialized data is read.
         *  Appropriate for preprocessing of the raw data.
         *
         * @option {Function} [schema.data] Should return the deserialized data.
         * @option {Function} [schema.total] Should return the total number of records.
         * @option {Function} [schema.group] Used instead of data function if remote grouping operation is executed.
         *  Returns the deserialized data.
         **/
        init: function(options) {
            var that = this, id, model, transport;

            options = that.options = extend({}, that.options, options);

            extend(that, {
                _map: {},
                _prefetch: {},
                _data: [],
                _ranges: [],
                _view: [],
                _pageSize: options.pageSize,
                _page: options.page  || (options.pageSize ? 1 : undefined),
                _sort: expandSort(options.sort),
                _filter: expandFilter(options.filter),
                _group: expandGroup(options.group),
                _aggregates: options.aggregates
            });

            Observable.fn.init.call(that);

            transport = options.transport;

            if (transport) {
                transport.read = typeof transport.read === STRING ? { url: transport.read } : transport.read;

                if (options.type) {
                    transport = extend(true, {}, kendo.data.transports[options.type], transport);
                    options.schema = extend(true, {}, kendo.data.schemas[options.type], options.schema);
                }

                that.transport = isFunction(transport.read) ? transport: new RemoteTransport(transport);
            } else {
                that.transport = new LocalTransport({ data: options.data });
            }

            that.reader = new kendo.data.readers[options.schema.type || "json" ](options.schema);

            model = that.reader.model || {};

            id = model.id;

            if (Model && !isEmptyObject(model)) {
                that.modelSet = new ModelSet({
                    model: model,
                    create: function(e) {
                        that.trigger(CREATE, e);
                    },
                    update: function(e) {
                        that.trigger(UPDATE, e);
                    },
                    destroy: function(e) {
                        that.trigger(DESTROY, e);
                    }
                });
            } else {
                that.modelSet = {
                    refresh: noop,
                    select: noop,
                    sync: noop
                };
            }


            if (id) {
                that.find = proxy(that.modelSet.find, that.modelSet);
                that.id = function(record) {
                    return id(record);
                };
            } else {
                that.find = that.at;
            }

            that.bind([ /**
                         * Fires when an error occurs during data retrieval.
                         * @name kendo.data.DataSource#error
                         * @event
                         */
                        ERROR,
                        /**
                         * Fires when data is changed
                         * @name kendo.data.DataSource#change
                         * @event
                         */
                        CHANGE,
                        CREATE, DESTROY, UPDATE, REQUESTSTART], options);
        },

        options: {
            data: [],
            schema: {},
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            serverGrouping: false,
            serverAggregates: false,
            autoSync: false,
            sendAllFields: true,
            batch: {
                mode: MULTIPLE
            }
        },

        model: function(id) {
            return this.modelSet.model(id);
        },

        _idMap: function(data) {
            var that = this, id = that.id, idx, length, map = {};

            if (id) {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    map[id(data[idx])] = idx;
                }
            }

            that._map = map;
        },

        _createdModels: function() {
            return this.modelSet.select(Model.CREATED, function(model) {
                return model.data;
            });
        },

        _updatedModels: function() {
            var that = this,
                sendAllFields = that.options.sendAllFields;

            return that.modelSet.select(Model.UPDATED, function(model) {
                if(sendAllFields) {
                    return model.data;
                }

                return model.changes();
            });
        },

        _destroyedModels: function() {
            var that = this,
                options = that.options;

            return that.modelSet.select(Model.DESTROYED, function(model) {
                var data = {};

                if (options.sendAllFields) {
                    return model.data;
                }

                that.reader.model.id(data, model.id());

                return data;
            });
        },

        sync: function() {
            var that = this,
                updated,
                created,
                destroyed,
                batch = that.options.batch,
                mode,
                transport = that.transport
                promises = that._promises = [];

            updated = that._updatedModels();

            created = that._createdModels();

            destroyed = that._destroyedModels();

            if (batch === false) {
                mode = MULTIPLE;
            }
            else if ((batch.mode || MULTIPLE) === MULTIPLE) {
                mode = SINGLE;
            }

            if (mode) {
                that._send(created, proxy(transport.create, transport), mode);
                that._send(updated, proxy(transport.update, transport), mode);
                that._send(destroyed, proxy(transport.destroy, transport), mode);
            } else {
                that._send({
                        created: created,
                        updated: updated,
                        destroyed: destroyed
                    },
                    proxy(transport.update, transport),
                    SINGLE
                );
            }

            $.when.apply(null, promises).then(function() {
                that.trigger(CHANGE);
            });
        },

        _syncSuccess: function(origData, data) {
            var that = this,
                origValue,
                origId,
                map = that._map,
                reader= that.reader;

            data = reader.parse(data);

            if (!reader.status(data)) {
                return that.error({data: origData});
            }

            data = reader.data(data);

            that.modelSet.clear();
            that.modelSet.merge(origData, data);
        },

        _syncError: function(origData, data) {
            this.error({data: origData});
        },

        _send: function(data, method, mode) {
            var that = this,
                idx,
                length,
                promises = that._promises,
                success = proxy(that._syncSuccess, that, data),
                error = proxy(that._syncError, that, data);

            if(data.length == 0) {
                return;
            }

            if(mode === MULTIPLE) {
                for(idx = 0, length = data.length; idx < length; idx++) {
                    promises.push(
                        method({
                            data: data[idx],
                            success: success,
                            error: error
                        })
                    );
                }
            } else {
                promises.push(
                    method({
                        data: data,
                        success: success,
                        error: error
                    })
                );
            }

            return promises;
        },

        create: function(index, values) {
            return this.modelSet.create(index, values);
        },

        /**
         * Read data from transport
         */
        read: function(additionalData) {
            var that = this,
                options = extend(additionalData, {
                    take: that.take(),
                    skip: that.skip(),
                    page: that.page(),
                    pageSize: that.pageSize(),
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregates: that._aggregates
                });

            that._queueRequest(options, function() {
                that.trigger(REQUESTSTART);
                that._ranges = [];
                that.transport.read({
                    data: options,
                    success: proxy(that.success, that),
                    error: proxy(that.error, that)
                });
            });
        },

        _queueRequest: function(options, callback) {
            var that = this;
            if (!that._requestInProgress) {
                that._requestInProgress = true;
                that._pending = null;
                callback();
            } else {
                that._pending = options;
            }
        },
        _dequeueRequest: function() {
            var that = this;
            that._requestInProgress = false;
            if (that._pending) {
                that.read(that._pending);
            }
        },
        update: function(id, values) {
            this.modelSet.update(id, values);
        },

        destroy: function(id) {
            this.modelSet.destroy(id);
        },

        error: function() {
            this.trigger(ERROR, arguments);
        },

        success: function(data) {
            var that = this,
            options = {},
            result,
            updated = Model ? that._updatedModels() : [],
            hasGroups = that.options.serverGrouping === true && that._group && that._group.length > 0;

            data = that.reader.parse(data);

            that._total = that.reader.total(data);

            if (that._aggregates && that.options.serverAggregates) {
                that._aggregateResult = that.reader.aggregates(data);
            }

            if (hasGroups) {
                data = that.reader.groups(data);
            } else {
                data = that.reader.data(data);
            }

            var start = that._skip || 0,
                end = start + data.length;

            that._ranges.push({ start: start, end: end, data: data });
            that._ranges.sort( function(x, y) { return x.start - y.start; } );

            that._dequeueRequest();
            that._process(data);
        },

        _process: function (data) {
            var that = this,
                options = {},
                result,
                hasGroups = that.options.serverGrouping === true && that._group && that._group.length > 0;

            that._data = data;

            if (that.modelSet) {
                that.modelSet.sync(data);
            }

            if (that.options.serverPaging !== true) {
                options.skip = that._skip;
                options.take = that._take || that._pageSize;

                if(options.skip === undefined && that._page !== undefined && that._pageSize !== undefined) {
                    options.skip = (that._page - 1) * that._pageSize;
                }
            }

            if (that.options.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.options.serverFiltering !== true) {
                options.filter = that._filter;
            }

            if (that.options.serverGrouping !== true) {
                options.group = that._group;
            }

            if (that.options.serverAggregates !== true) {
                options.aggregates = that._aggregates;
                that._aggregateResult = calculateAggregates(data, options);
            }

            result = process(data, options);

            that._view = result.data;

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            that.modelSet.refresh(data);

            that.trigger(CHANGE);
        },

        changes: function(id) {
            return this.modelSet.changes(id);
        },

        hasChanges: function(id) {
            return this.modelSet.hasChanges(id);
        },

        at: function(index) {
            return this._data[index];
        },

        /**
         * Get data return from the transport
         * @returns {Array} Array of items
         */
        data: function(value) {
            if (value !== undefined) {
                this._data = value;
            } else {
                return this._data;
            }
        },

        /**
         * Returns a view of the data with operation such as in-memory sorting, paring, grouping and filtering are applied.
         * To ensure that data is available this method should be use from within change event of the dataSource.
         * @example
         * dataSource.bind("change", function() {
         *   renderView(dataSource.view());
         * });
         * @returns {Array} Array of items
         */
        view: function() {
            return this._view;
        },
        /**
         * Executes a query over the data. Available operations are paging, sorting, filtering, grouping.
         * If data is not available or remote operations are enabled data is requested through the transport,
         * otherwise operations are executed over the available data.
         * @param {Object} [options] Contains the settings for the operations. Note: If setting for previous operation is omitted, this operation is not applied to the resulting view
         * @example
         *
         * //create a view containing at most 20 records, taken from the 5th page and sorted ascending by orderId field.
         * dataSource.query({ page: 5, pageSize: 20, sort: { field: "orderId", dir: "asc" } });
         *
         * // moves the view to the first page returning at most 20 records but without particular ordering.
         * dataSource.query({ page: 1, pageSize: 20 });
         *
         */
        query: function(options) {
            var that = this,
                options = options,
                result,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering || that.options.serverGrouping || that.options.serverAggregates;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregates = options.aggregates;
                that._skip = options.skip;
                that._take = options.take;

                if(that._skip === undefined) {
                    that._skip = that.skip();
                    options.skip = that.skip();
                }

                if(that._take === undefined && that._pageSize !== undefined) {
                    that._take = that._pageSize;
                    options.take = that._take;
                }

                if (options.sort) {
                    that._sort = options.sort = expandSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = expandFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = expandGroup(options.group);
                }
                if (options.aggregates) {
                    that._aggregates = options.aggregates = expandAggregates(options.aggregates);
                }
            }

            if (remote || (that._data === undefined || that._data.length == 0)) {
                that.read(options);
            } else {
                that.trigger(REQUESTSTART);
                result = process(that._data, options);

                if (result.total !== undefined && !that.options.serverFiltering) {
                    that._total = result.total;
                }

                that._view = result.data;
                that._aggregateResult = calculateAggregates(that._data, options);
                that.trigger(CHANGE);
            }
        },

        /**
         * Get current page index or request a page with specified index.
         * @param {Number} [val] <undefined> The index of the page to be retrieved
         * @example
         * dataSource.page(2);
         * @returns {Number} Current page index
         */
        page: function(val) {
            var that = this,
                skip;

            if(val !== undefined) {
                val = Math.max(Math.min(Math.max(val, 1), that.totalPages()), 1);
                that.query({ page: val, pageSize: that.pageSize(), sort: that.sort(), filter: that.filter(), group: that.group(), aggregates: that.aggregate()});
                return;
            }
            skip = that.skip();

            return skip !== undefined ? Math.round((skip || 0) / (that._take || 1)) + 1 : undefined;
        },

        /**
         * Get current pageSize or request a page with specified number of records.
         * @param {Number} [val] <undefined> The of number of records to be retrieved.
         * @example
         * dataSource.pageSiza(25);
         * @returns {Number} Current page size
         */
        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: val, sort: that.sort(), filter: that.filter(), group: that.group(), aggregates: that.aggregate()});
                return;
            }

            return that.take();
        },

        /**
         * Get current sort descriptors or sorts the data.
         * @param {Object|Array} [val] <undefined> Sort options to be applied to the data
         * @example
         * dataSource.sort({ field: "orderId", dir: "desc" });
         * dataSource.sort([ { field: "orderId", dir: "desc" }, { field: "unitPrice", dir: "asc" } ]);
         * @returns {Array} Current sort descriptors
         */
        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: val, filter: that.filter(), group: that.group(), aggregates: that.aggregate()});
                return;
            }

            return this._sort;
        },

        /**
         * Get current filters or filter the data.
         *<p>
         * <i>Supported filter operations/aliases are</i>:
         * <ul>
         * <li><strong>Equal To</strong>: "eq", "==", "isequalto", "equals", "equalto", "equal"</li>
         * <li><strong>Not Equal To</strong>: "neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "not", "ne"</li>
         * <li><strong>Less Then</strong>: "lt", "<", "islessthan", "lessthan", "less"</li>
         * <li><strong>Less Then or Equal To</strong>: "lte", "<=", "islessthanorequalto", "lessthanequal", "le"</li>
         * <li><strong>Greater Then</strong>: "gt", ">", "isgreaterthan", "greaterthan", "greater"</li>
         * <li><strong>Greater Then or Equal To</strong>: "gte", ">=", "isgreaterthanorequalto", "greaterthanequal", "ge"</li>
         * <li><strong>Starts With</strong>: "startswith"</li>
         * <li><strong>Ends With</strong>: "endswith"</li>
         * <li><strong>Contains</strong>: "contains", "substringof"</li>
         * </ul>
         * </p>
         * @param {Object|Array} [val] <undefined> Filter(s) to be applied to the data.
         * @example
         * dataSource.filter({ field: "orderId", operation: "eq", value: 10428 });
         * dataSource.filter([ { field: "orderId", operation: "neq", value: 42 }, { field: "unitPrice", operation: "ge", value: 3.14 } ]);
         * @returns {Array} Current filter descriptors
         */
        filter: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val, group: that.group(), aggregates: that.aggregate() });
                return;
            }

            return that._filter;
        },

        /**
         * Get current group descriptors or group the data.
         * @param {Object|Array} [val] <undefined> Group(s) to be applied to the data.
         * @example
         * dataSource.group({ field: "orderId" });
         * @returns {Array} Current grouping descriptors
         */
        group: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: that.filter(), group: val, aggregates: that.aggregate()  });
                return;
            }

            return that._group;
        },

        /**
         * Get the total number of records
         */
        total: function() {
            return this._total;
        },

        /**
         * Get current aggregate descriptors or applies aggregates to the data.
         * @param {Object|Array} [val] <undefined> Aggregate(s) to be applied to the data.
         * @example
         * dataSource.aggregate({ field: "orderId", aggregate: "sum" });
         * @returns {Array} Current aggregate descriptors
         */
        aggregate: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val, group: that.group(), aggregates: val });
                return;
            }

            return that._aggregates;
        },

        /**
         * Get result of aggregates calculation
         * @returns {Array} Aggregates result
         */
        aggregates: function() {
            return this._aggregateResult;
        },

        /**
         * Get the number of available pages.
         * @returns {Number} Number of available pages.
         */
        totalPages: function() {
            var that = this,
                pageSize = that.pageSize() || that.total();

            return Math.ceil((that.total() || 0) / pageSize);
        },

        inRange: function(skip, take) {
            var that = this,
                end = Math.min(skip + take, (that.totalPages() - 1) * take);

            if (!that.options.serverPaging && that.data.length > 0) {
                return true;
            }

            return that._findRange(skip, end).length > 0;
        },

        range: function(skip, take) {
            skip = skip || 0;
            var that = this,
                pageSkip = (Math.max(Math.floor(skip / take), 0) * take),
                size = Math.min(pageSkip + take, that.total()),
                data;

            data = that._findRange(skip, Math.min(skip + take, that.total()));
            if (data.length) {
                that._skip = pageSkip;

                that._take = take;

                var paging = that.options.serverPaging;
                try {
                    that.options.serverPaging = true;
                    that._process(data);
                } finally {
                    that.options.serverPaging = paging;
                }

                return;
            }

            if (take !== undefined) {

                if (!that._rangeExists(pageSkip, size)) {
                    that.prefetch(pageSkip, take, function() {
                        if (skip > pageSkip && size < that.total()) {
                            that.prefetch(size, take, function() {
                                that.range(skip, take);
                            });
                        } else {
                            that.range(skip, take);
                        }
                    });
                } else if (pageSkip < skip) {
                    that.prefetch(size, take, function() {
                        that.range(skip, take);
                    });
                }
            }
        },

        _currentPage: function() {
            var that = this,
                take = that.take();
            return Math.max(Math.round(that.skip() / take), 0) * take;
        },

        fetchNextPage: function() {
            var that = this,
                take = that.take(),
                skip = Math.max(Math.round(that.skip() / take), 0) * take;

            if (that.page() < that.totalPages()) {
                that.prefetch(skip + take, take);
            }
        },

        fetchPrevPage: function() {
            var that = this,
                take = that.take(),
                skip = Math.max(Math.max(Math.floor(that.skip() / take), 0) * take - take,0);
            that.prefetch(skip, take);
        },

        _findRange: function(start, end) {
            var that = this,
                length,
                ranges = that._ranges,
                range,
                data = [],
                skipIdx,
                takeIdx,
                startIndex,
                endIndex,
                length;

            for (skipIdx = 0, length = ranges.length; skipIdx < length; skipIdx++) {
                range = ranges[skipIdx];
                if (start >= range.start && start <= range.end) {
                    var count = 0;

                    for (takeIdx = skipIdx; takeIdx < length; takeIdx++) {
                        range = ranges[takeIdx];
                        if (range.data.length && start + count >= range.start && count + count <= range.end) {
                            startIndex = 0;
                            if (start + count > range.start) {
                                startIndex = (start + count) - range.start;
                            }
                            endIndex = range.data.length;
                            if (range.end > end) {
                                endIndex = endIndex - (range.end - end);
                            }
                            count += endIndex - startIndex;
                            data = data.concat(range.data.slice(startIndex, endIndex));

                            if (end <= range.end && count == end - start) {
                                return data;
                            }
                        }
                    }
                    break;
                }
            }
            return [];
        },

        skip: function() {
            var that = this;
            return that._skip || (that._page !== undefined ? (that._page  - 1) * (that.take() || 1) : undefined);
        },

        take: function() {
            var that = this;
            return that._take || that._pageSize;
        },

        prefetch: function(skip, take, callback) {
            var that = this,
                range = { start: skip, end: skip + take, data: [] },
                options = {
                    take: take,
                    skip: skip,
                    page: skip / take + 1,
                    pageSize: take,
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregates: that._aggregates
                };

            if (!that._rangeExists(skip, skip + take)) {
                clearTimeout(that._timeout);
                that._timeout = setTimeout(function() {
                    that._ranges.push(range);
                    that._queueRequest(options, function() {
                    that.transport.read({
                        data: options,
                        success: function (data) {
                            that._dequeueRequest();
                            data = that.reader.parse(data);
                            range.data = that.reader.data(data);
                            range.end = range.start + range.data.length;
                            that._ranges.sort( function(x, y) { return x.start - y.start; } );
                            if (callback) {
                                callback();
                            }
                        }
                    })});
                }, 100);
            }
        },

        _rangeExists: function(start, end) {
            var that = this,
                ranges = that._ranges,
                idx,
                length;

            for (idx = 0, length = ranges.length; idx < length; idx++) {
                if (ranges[idx].start == start && ranges[idx].end == end) {
                    return true;
                }
            }
            return false;
        }
    });

    /** @ignore */
    DataSource.create = function(options) {
        options = isArray(options) ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            table = dataSource.table,
            select = dataSource.select;

        if(!data && fields && !dataSource.transport){
            if (table) {
                data = inferTable(table, fields);
            } else if (select) {
                data = inferSelect(select, fields);
            }
        }

        dataSource.data = data;

        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    }

    function inferSelect(select, fields) {
        var options = $(select)[0].children,
            optionIndex,
            optionCount,
            data = [],
            record,
            option;

        for (optionIndex = 0, optionCount = options.length; optionIndex < optionCount; optionIndex++) {
            record = {};
            option = options[optionIndex];

            record[fields[0].field] = option.text;
            record[fields[1].field] = option.value;

            data.push(record);
        }

        return data;
    }

    function inferTable(table, fields) {
        var tbody = $(table)[0].tBodies[0],
        rows = tbody ? tbody.rows : [],
        rowIndex,
        rowCount,
        fieldIndex,
        fieldCount = fields.length,
        data = [],
        cells,
        record,
        cell,
        empty;

        for (rowIndex = 0, rowCount = rows.length; rowIndex < rowCount; rowIndex++) {
            record = {};
            empty = true;
            cells = rows[rowIndex].cells;

            for (fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
                cell = cells[fieldIndex];
                if(cell.nodeName.toLowerCase() !== "th") {
                    empty = false;
                    record[fields[fieldIndex].field] = cell.innerHTML;
                }
            }
            if(!empty) {
                data.push(record);
            }
        }

        return data;
    }

    extend(true, kendo.data, /** @lends kendo.data */ {
        readers: {
            json: DataReader
        },
        Query: Query,
        DataSource: DataSource,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        LocalStorageCache: LocalStorageCache,
        Cache: Cache,
        DataReader: DataReader
    });
})(jQuery);
