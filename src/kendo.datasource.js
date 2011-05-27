(function($, undefined) {
    var extend = $.extend,
        proxy = $.proxy,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        noop = $.noop,
        kendo = window.kendo,
        Observable = kendo.Observable,
        Model = kendo.data.Model,
        CHANGE = "change",
        UPDATE = "update",
        CREATE = "create",
        DESTROY = "destroy",
        ERROR = "error",
        stringify = kendo.stringify;


    function process(data, options) {
        var query = new kendo.data.Query(data),
            page = options.page,
            pageSize = options.pageSize,
            sort = options.sort;
            filter = options.filter;

        if(filter) {
            query = query.filter(filter);
        }

        if (sort) {
            query = query.sort(sort);
        }

        if (page !== undefined && pageSize !== undefined) {
            query = query.skip((page - 1) * pageSize)
                         .take(pageSize);
        }

        return query.toArray();
    }

    function LocalTransport(options) {
        this.data = options.data;
    }

    LocalTransport.prototype = {
        read: function(options) {
            options.success(this.data);
        }
    }

    function RemoteTransport(options) {
        var that = this;

        options = that.options = extend({}, that.options, options);

        if (typeof options.read === "string") {
            options.read = {
                url: options.read
            };
        }

        that.cache = options.cache? Cache.create(options.cache) : {
            find: noop,
            add: noop
        }

        that.dialect = options.dialect;
    }

    RemoteTransport.prototype = {
        options: {
            dialect: {
                read: function(data) {
                    return data;
                }
            }
        },
        read: function(options) {
            options = options || {};
            var that = this,
                read = that.options.read,
                data = isFunction(read.data) ? read.data() : read.data,
                success = options.success || noop,
                error = options.error || noop,
                cached;

            options = extend(true, {}, read, options);
            options.data = that.dialect.read(extend(data, options.data));

            cached = that.cache.find(options.data);
            if(cached != undefined) {
                success(cached);
            } else {
                options.success = function(result) {
                    that.cache.add(options.data, result);

                    success(result);
                };
                options.error = function(result) {
                    error(result);
                };

                $.ajax(options);
            }
        }
    }

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

    Cache.prototype = {
        add: function(key, data) {
            if(key != undefined) {
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

    var DataSource = Observable.extend({
        init: function(options) {
            var that = this, id, model, transoprt;

            options = that.options = extend({}, that.options, options);

            extend(that, {
                modified: {},
                _map: {},
                _models: {},
                _data: [],
                _view: [],
                _pageSize: options.pageSize,
                _page: options.page  || (options.pageSize ? 1 : undefined),
                _sort: options.sort,
                _filter: options.filter
            });

            Observable.fn.init.call(that);

            model = options.model;
            transport = options.transport;

            if(!isEmptyObject(model) && !model.id) {
                options.model = model = Model.define(model);
            }

            id = model.id;

            that._reader = extend({
                data: function (data) {
                    return data;
                },
                total: function(data) {
                    return data.length;
                }
            }, options.reader);

            if (transport) {
                that.transport = isFunction(transport.read) ? transport: new RemoteTransport(transport);
            } else {
                that.transport = new LocalTransport({ data: options.data });
            }

            if (id) {
                that.find = function(id) {
                    return that._data[that._map[id]];
                };
                that.id = function(record) {
                    return id(record);
                };
            } else {
                that.find = that.at;
            }

            that.bind([ERROR, CHANGE, CREATE, DESTROY, UPDATE], options);
        },

        options: {
            model: {
                id: function(data) {
                    return data.id;
                }
            },
            data: [],
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            autoSync: false
        },

        model: function(id) {
            var that = this,
                model = that._models[id];

            if(!model) {
                that._models[id] = model = new that.options.model(that.find(id));
                model.bind(CHANGE, proxy(that._change, that, model));
            }

            return model;
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

        _change: function(model) {
           var that = this;

           that.modified[model.id()] = model;
           that.trigger(UPDATE, { model: model });
        },

        read: function() {
            var that = this,
                options = {
                    page: that._page,
                    pageSize: that._pageSize,
                    sort: that._sort,
                    filter: that._filter
                };

            that.transport.read({
                data: options,
                success: proxy(that.success, that),
                error: proxy(that.error, that)
            });
        },

        error: function() {
            this.trigger(ERROR, arguments);
        },

        success: function(data) {
            var that = this,
                options = {};

            that._total = that._reader.total(data);
            data = that._reader.data(data);
            that._data = data;

            if (that.options.serverPaging !== true) {
                options.page = that._page;
                options.pageSize = that._pageSize;
            }

            if (that.options.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.options.serverFiltering !== true) {
                options.filter = that._filter;
            }

            that._view = process(data, options);

            that._idMap(data);

            that.trigger(CHANGE);
        },

        changes: function(id) {
            var that = this,
            result = [];

            if (id === undefined) {
                for (id in that.modified) {
                    result.push(that.changes(id));
                }

                return result;
            } else if (id in that.modified) {
                return that.modified[id].changes();
            }
        },

        hasChanges: function(id) {
            if (id === undefined) {
                return !isEmptyObject(this.modified);
            }

            return id in this.modified;
        },

        create: function(index, values) {
            var that = this,
                data = that._data,
                model = that.model();

            if (typeof index !== "number") {
                values = index;
                index = undefined;
            }

            model.set(values);

            index = index !== undefined ? index : data.length;

            data.splice(index, 0, model.data);

            that._idMap(data);

            that.trigger(CREATE, { model: model });

            return model;
        },

        at: function(index) {
            return this._data[index];
        },

        destroy: function(id) {
            var that = this,
                model = that.model(id);

            if (model) {
                that._data.splice(that._map[id], 1);
                that._idMap(that._data);

                model.state = Model.DESTROYED;

                that.modified[id] = {};

                that.trigger(DESTROY, { model: model });
            }
        },

        data: function(value) {
            if (value !== undefined) {
                this._data = value;
            } else {
                return this._data;
            }
        },

        view: function() {
            return this._view;
        },

        query: function(options) {
            var that = this,
                options = options,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering;

            if(options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;

                if (options.sort) {
                    that._sort = options.sort = kendo.data.Query.expandSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = kendo.data.Query.expandFilter(options.filter);
                }
            }

            if (remote || (that._data === undefined || that._data.length == 0)) {
                that.read(options);
            } else {
                that._view = process(that._data, options);
                that.trigger(CHANGE);
            }
        },
        page: function(val) {
            var that = this;

            if(val !== undefined) {
                val = Math.max(Math.min(Math.max(val, 1), that._totalPages()), 1);
                that.query({ page: val, pageSize: that.pageSize(), sort: that.sort(), filter: that.filter()});
                return;
            }
            return that._page;
        },
        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: val, sort: that.sort(), filter: that.filter()});
                return;
            }

            return that._pageSize;
        },
        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: val, filter: that.filter() });
                return;
            }

            return this._sort;
        },
        filter: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val });
                return;
            }

            return that._filter;
        },
        total: function() {
            return this._total;
        },
        _totalPages: function() {
            var that = this,
                pageSize = that.pageSize() || that.total();

            return Math.ceil((that.total() || 0) / pageSize);
        }
    });

    DataSource.create = function(options) {
        options = $.isArray(options) ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            table = dataSource.table,
            select = dataSource.select;

        if (!data && fields) {
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

    extend(kendo.data, {
        DataSource: DataSource,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        LocalStorageCache: LocalStorageCache,
        Cache: Cache
    });
})(jQuery);
