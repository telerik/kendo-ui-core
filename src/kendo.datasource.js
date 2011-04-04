(function($, window, undefined) {
    var extend = $.extend,
        kendo = window.kendo;

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
        this.reader = options.reader || {
            data: function(data) {
                return data;
            }
        };
        this.data = options.data;
    }

    LocalTransport.prototype = {
        read: function() {
            this.success(this.reader.data(this.data));
        }
    }

    function RemoteTransport(options) {
        var that = this;
        if (options && typeof options.read === "string") {
            options.read = { url: options.read };
        }
        options = extend(that.defaults, options);
        that.settings = options;
        that.dialect = options.dialect;
        that.success = $.noop;
        that.reader = options.reader || {
            data: function(data) {
                return data;
            }
        };
    }

    RemoteTransport.prototype = {
        defaults: {
            dialect: {
                read: function(data) {
                    return data;
                }
            }
        },
        read: function(options) {
            var that = this,
                read = that.settings.read,
                data = $.isFunction(read.data) ? read.data() : read.data;

            options = extend(true, read, options);
            options.data = that.dialect.read(extend(data, options.data));
            options.success = function(result) {
                var data = that.reader.data(result);

                that.success(data);
            };
            $.ajax(options);
        }
    }

    function DataSource(options) {
        var that = extend(this, this.defaults, {
                idMap: {},
                modified: {},
                schema: options.schema,
                serverSorting: options.serverSorting,
                serverPaging: options.serverPaging,
                _data: [],
                _view: [],
                _pageSize: options.pageSize,
                _page: options.page,
                _sort: options.sort
            }),
            id = that.schema.id,
            transport = options.transport;

        kendo.core.Observable.call(that);

        that.transport = transport && $.isFunction(transport.read) ? transport : (options.data? new LocalTransport({ data: options.data }):new RemoteTransport(transport));
        that.transport.success = $.proxy(that.success, that);
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

    extend(DataSource.prototype, new kendo.core.Observable, {
        defaults: {
            schema: {
                id: "id"
            },
            serverSorting: false,
            serverPaging: false
        },
        read: function() {
            var that = this,
                options = {
                    page: that._page,
                    pageSize: that._pageSize,
                    sort: that._sort
                };

            this.transport.read({ data: options });
        },
        success: function(data) {
            var that = this,
                options = {};

            that._data = data;

            if (that.serverPaging !== true) {
                options.page = that._page;
                options.pageSize = that._pageSize;
            }

            if (that.serverSorting !== true) {
                options.sort = that._sort;
            }

            that._view = process(data, options);

            that.idMap = idMap(data, that.id);

            that.trigger("kendo:change");
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
                remote = that.serverSorting || that.serverPaging;

            that._pageSize = options.pageSize;
            that._page = options.page;

            if (options.sort) {
                that._sort = options.sort = kendo.data.Query.expandSort(options.sort);
            }

            if (remote) {
                that.read(options);
            } else {
                that._view = process(that._data, options);
                that.trigger("kendo:change");
            }
        },
        page: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: val, pageSize: that.pageSize(), sort: that.sort()});
                return;
            }
            return that._page;
        },
        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: val, sort: that.sort()});
                return;
            }

            return that._pageSize;
        },
        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: val });
                return;
            }

            return this._sort;
        }
    });

    extend(kendo.data, {
        DataSource: DataSource,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport
    });
})(jQuery, window);
