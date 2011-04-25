(function($, window, undefined) {
    var extend = $.extend,
    kendo = window.kendo,
    stringify = kendo.stringify;

    function idMap(data, id) {
        var idx, length, map = {};

        if (id) {
            for (idx = 0, length = data.length; idx < length; idx++) {
                map[id(data[idx])] = idx;
            }
        }

        return map;
    }

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
        if (options && typeof options.read === "string") {
            options.read = { url: options.read };
        }
        that.cache = options && options.cache && options.cache !== false ? Cache.create(options.cache) : that.defaults.cache;
        options = extend(that.defaults, options);
        that.settings = options;
        that.dialect = options.dialect;
    }

    RemoteTransport.prototype = {
        defaults: {
            dialect: {
                read: function(data) {
                    return data;
                }
            },
            cache: {
                find: $.noop,
                add: $.noop
            }
        },
        read: function(options) {
            options = options || {};
            var that = this,
                read = that.settings.read,
                data = $.isFunction(read.data) ? read.data() : read.data,
                success = options.success || $.noop,
                error = options.error || $.noop,
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

        if($.isPlainObject(options) && $.isFunction(options.find)) {
            return options;
        }

        if(options === true) {
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
            if(key != undefined) {
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

    function DataSource(options) {
        options = options || {};
        var that = extend(this, this.defaults, {
                idMap: {},
                modified: {},
                schema: options.schema,
                serverSorting: options.serverSorting,
                serverPaging: options.serverPaging,
                serverFiltering: options.serverFiltering,
                _data: [],
                _view: [],
                _pageSize: options.pageSize,
                _page: options.page  || (options.pageSize ? 1 : undefined),
                _sort: options.sort,
                _filter: options.filter
            }),
            id = that.schema.id,
            transport = options.transport;

        kendo.Observable.call(that);

        that._reader = extend({
                data: function (data) {
                    return data;
                },
                total: function(data) {
                    return data.length;
                }
            }, options.reader);
        that.transport = transport && $.isFunction(transport.read) ? transport : (options.data? new LocalTransport({ data: options.data }):new RemoteTransport(transport));
        if (id) {
            that.find = function(id) {
                return that._data[that.idMap[id]];
            };
            that.id = function(record) {
                return record[id];
            };
        } else {
            that.find = that.at;
        }
    }

    DataSource.create = function(options) {
        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            table = dataSource.table;

        if (!data && table && fields) {
            data = infer(table, fields);
        }

        dataSource.data = data;

        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    }

    function infer(table, fields) {
        var tbody = $(table)[0].tBodies[0],
            rows = tbody ? tbody.rows : [],
            rowIndex,
            rowCount,
            fieldIndex,
            fieldCount = fields.length,
            data = [],
            cells,
            record;

        for (rowIndex = 0, rowCount = rows.length; rowIndex < rowCount; rowIndex++) {
            record = {};
            cells = rows[rowIndex].cells;

            for (fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
                record[fields[fieldIndex].field] = cells[fieldIndex].innerHTML;
            }

            data.push(record);
        }

        return data;
    }

    extend(DataSource.prototype, new kendo.Observable, {
        defaults: {
            schema: {
                id: "id"
            },
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false
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
                success: $.proxy(that.success, that),
                error: $.proxy(that.error, that)
            });
        },
        error: function() {
            this.trigger("error", arguments);
        },
        success: function(data) {
            var that = this,
                options = {};

            that._total = that._reader.total(data);
            data = that._reader.data(data);
            that._data = data;

            if (that.serverPaging !== true) {
                options.page = that._page;
                options.pageSize = that._pageSize;
            }

            if (that.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.serverFiltering !== true) {
                options.filter = that._filter;
            }

            that._view = process(data, options);

            that.idMap = idMap(data, that.id);

            that.trigger("change");
        },
        update: function(id, values) {
            var that = this,
                modified = that.modified[id],
                record = that.find(id);

            if (record && !$.isEmptyObject(values)) {
                if(!modified) {
                    that.modified[id] = modified = {
                        original: extend(true, {}, record),
                        changes: {}
                    };
                }
                extend(modified.changes, values);
                extend(record, values);

                that.trigger("update", { record: record });
            }
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
                return that.modified[id].changes;
            }
        },

        hasChanges: function(id) {
            if (id === undefined) {
                return !$.isEmptyObject(this.modified);
            }

            return id in this.modified;
        },

        guid: function() {
            var id = "", i, random;

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        },

        create: function(index, values) {
            var that = this,
                data = that._data,
                record = {
                    id: that.guid()
                };

            if (typeof index !== "number") {
                values = index;
                index = undefined;
            }

            $.extend(record, values);

            index = index !== undefined ? index : data.length;

            data.splice(index, 0, record);

            that.idMap = idMap(data, that.id);
            that.modified[record.id] = {};
            that.trigger("create", { record: record, index: index });
            return record;
        },

        at: function(index) {
            return this._data[index];
        },

        destroy: function(id) {
            var that = this,
                record = that.find(id);

            if (record) {
                that._data.splice(that.idMap[id], 1);
                that.idMap = idMap(that._data, that.id);
                that.modified[id] = {};

                that.trigger("destroy", { record: record });
            }
        },
        data: function() {
            return this._data;
        },
        view: function() {
            return this._view;
        },
        query: function(options) {
            var that = this,
                options = options || {},
                remote = that.serverSorting || that.serverPaging || that.serverFiltering;

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

            if (remote || (that._data === undefined || that._data.length == 0)) {
                that.read(options);
            } else {
                that._view = process(that._data, options);
                that.trigger("change");
            }
        },
        page: function(val) {
            var that = this;

            if(val !== undefined) {
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
        }
    });

    extend(kendo.data, {
        DataSource: DataSource,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        LocalStorageCache: LocalStorageCache,
        Cache: Cache
    });
})(jQuery, window);
