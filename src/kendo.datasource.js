(function($, undefined) {
    var extend = $.extend,
        proxy = $.proxy,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        each = $.each,
        noop = $.noop,
        kendo = window.kendo,
        Observable = kendo.Observable,
        Class = kendo.Class,
        Model = kendo.data.Model,
        Query = kendo.data.Query,
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        ERROR = "error",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function(o) { return o; },
        stringify = kendo.stringify;


    function process(data, options) {
        var query = new Query(data),
            options = options || {},
            page = options.page,
            pageSize = options.pageSize,
            sort = options.sort,
            group = options.group,
            total,
            filter = options.filter;

        if (filter) {
            query = query.filter(filter);
            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);
        }

        if (page !== undefined && pageSize !== undefined) {
            query = query.skip((page - 1) * pageSize).take(pageSize);
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
            var that = this;

            options = that.options = extend({}, that.options, options);

            each(crud, function(index, type) {
                if (typeof options[type] === "string") {
                    options[type] = {
                        url: options[type]
                    };
                }
            });

            that.cache = options.cache? Cache.create(options.cache) : {
                find: noop,
                add: noop
            }

            that.dialect = options.dialect;
        },

        options: {
            dialect: {
                read: identity,
                update: identity,
                destroy: identity,
                create: identity
            }
        },

        create: function(options) {
            return $.ajax(this.setup(options, CREATE));
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
            return $.ajax(this.setup(options, UPDATE));
        },

        destroy: function(options) {
            return $.ajax(this.setup(options, DESTROY));
        },

        setup: function(options, type) {
            options = options || {};

            var that = this,
                operation = that.options[type],
                data = isFunction(operation.data) ? operation.data() : operation.data;

            options = extend(true, {}, operation, options);
            options.data = that.dialect[type](extend(data, options.data));

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

    Cache.prototype = {
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

    var DataSource = Observable.extend({
        init: function(options) {
            var that = this, id, model, transoprt;

            options = that.options = extend({}, that.options, options);

            extend(that, {
                _map: {},
                _models: {},
                _data: [],
                _view: [],
                _pageSize: options.pageSize,
                _page: options.page  || (options.pageSize ? 1 : undefined),
                _sort: options.sort,
                _filter: options.filter,
                _group: options.group
            });

            Observable.fn.init.call(that);

            model = options.model;
            transport = options.transport;

            if(!isEmptyObject(model) && !model.id) {
                options.model = model = Model.define(model);
            }

            id = model.id;

            that._deserializer = extend({
                data: identity,
                total: function(data) {
                    return data.length;
                },
                status: function(data) {
                    return data.status;
                },
                groups: function(data) {
                    return data;
                },
                aggregates: function(data) {
                    return {};
                }
            }, options.deserializer);

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
            serverGrouping: false,
            serverAggregates: false,
            autoSync: false,
            sendAllFields: true,
            batch: {
                mode: "multiple"
            }
        },

        model: function(id) {
            var that = this,
                model = id && that._models[id];

            if(!model) {
                model = new that.options.model(that.find(id));
                that._models[model.id()] = model;
                model.bind(CHANGE, function() {
                    that.trigger(UPDATE, { model: model });
                });
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

        _byState: function(state, selector) {
            var models = this._models,
                result = [],
                model,
                selector = selector || identity,
                id;

            for (id in models) {
                model = models[id];

                if(model.state === state) {
                    result.push(selector(model));
                }
            }

            return result;
        },

        _createdModels: function() {
            return this._byState(Model.CREATED, function(model) {
                return model.data;
            });
        },

        _updatedModels: function() {
            var that = this,
                sendAllFields = that.options.sendAllFields;
            return  that._byState(Model.UPDATED, function(model) {
                        if(sendAllFields) {
                            return model.data;
                        }

                        return model.changes();
                    });
        },

        _destroyedModels: function() {
            var that = this,
                data,
                sendAllFields = that.options.sendAllFields;
            return that._byState(Model.DESTROYED, function(model) {
                        data = {};
                        if(sendAllFields) {
                            return model.data;
                        }
                        data[model.idField] = model.id();
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

            if(batch === false) {
                mode = "multiple";
            }
            else if ((batch.mode || "multiple") === "multiple") {
                mode = "single";
            }

            if(mode) {
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
                    "single"
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
                models = that._models
                map = that._map,
                deserializer= that._deserializer;

            if(!deserializer.status(data)) {
                return that.error({data: origData});
            }

            $.each(origData, function(index, value) {
                delete models[that.id(value)];
            });

            data = deserializer.data(data);
            $.each(data, function(index, value) {
                origValue = origData[index];
                if(origValue) {
                    origId = that.id(origValue);
                    index = map[origId];

                    if(index >= 0) {
                        that._data[index] = value;
                    }
                }
            });
            that._idMap(that._data);
        },

        _syncError: function(origData, data) {
            this.error({data: origData});
        },

        _send: function(data, method, mode) {
            var that = this,
                idx,
                promises = that._promises,
                success = proxy(that._syncSuccess, that, data),
                error = proxy(that._syncError, that, data);

            if(data.length == 0) {
                return;
            }

            if(mode === "multiple") {
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

        update: function(id, values) {
            var that = this,
            model = that.model(id);

            if (model) {
                model.set(values);
            }
        },

        destroy: function(id) {
            var that = this,
            model = that.model(id);

            if (model) {
                that._data.splice(that._map[id], 1);

                that._idMap(that._data);

                model.destroy();

                that.trigger(DESTROY, { model: model });
            }
        },

        error: function() {
            this.trigger(ERROR, arguments);
        },

        success: function(data) {
            var that = this,
            options = {},
            result,
            updated = Model ? that._updatedModels() : [],
            hasGroups = that.options.serverGrouping === true && that._group && that._group.length > 0,
            models = that._models;

            that._total = that._deserializer.total(data);

            if(hasGroups) {
                data = that._deserializer.groups(data);
            } else {
                data = that._deserializer.data(data);
            }

            that._data = data;

            $.each(updated, function() {
                var updatedId = that.id(this);
                $.each(data, function() {
                    if(updatedId === that.id(this)) {
                        delete models[updatedId];
                    }
                });
            });

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

            if (that.options.serverGrouping !== true) {
                options.group = that._group;
            }

            if (that.options.serverAggregates !== true) {
                options.aggregates = that._aggregates;
                that._aggregateResult = calculateAggregates(data, options);
            } else if (that._aggregates) {
                that._aggregateResult = that._deserializer.aggregates(data);
            }

            result = process(data, options);

            that._view = result.data;

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            that._idMap(data);

            that.trigger(CHANGE);
        },

        changes: function(id) {
            var that = this,
                model = that._models[id];

            if (model && model.state === Model.UPDATED) {
                return model.changes();
            }
        },

        hasChanges: function(id) {
            var that = this,
                state,
                model,
                models = that._models,
                id;

            if (id === undefined) {
                for (id in models) {
                    if (models[id].state !== Model.PRISTINE) {
                        return true;
                    }
                }

                return false;
            }

            model = models[id];

            return !!model && model.state === Model.UPDATED;
        },

        at: function(index) {
            return this._data[index];
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
                result,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering || that.options.serverGrouping || that.options.serverAggregates;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregates = options.aggregates;

                if (options.sort) {
                    that._sort = options.sort = Query.expandSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = Query.expandFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = Query.expandGroup(options.group);
                }
                if (options.aggregates) {
                    that._aggregates = options.aggregates = Query.expandAggregates(options.aggregates);
                }
            }

            if (remote || (that._data === undefined || that._data.length == 0)) {
                that.read(options);
            } else {
                result = process(that._data, options);

                if (result.total !== undefined && !that.options.serverFiltering) {
                    that._total = result.total;
                }

                that._view = result.data;
                that._aggregateResult = calculateAggregates(that._data, options);
                that.trigger(CHANGE);
            }
        },

        page: function(val) {
            var that = this;

            if(val !== undefined) {
                val = Math.max(Math.min(Math.max(val, 1), that._totalPages()), 1);
                that.query({ page: val, pageSize: that.pageSize(), sort: that.sort(), filter: that.filter(), group: that.group(), aggregates: that.aggregate()});
                return;
            }
            return that._page;
        },

        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: val, sort: that.sort(), filter: that.filter(), group: that.group(), aggregates: that.aggregate()});
                return;
            }

            return that._pageSize;
        },

        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: val, filter: that.filter(), group: that.group(), aggregates: that.aggregate()});
                return;
            }

            return this._sort;
        },

        filter: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val, group: that.group(), aggregates: that.aggregate() });
                return;
            }

            return that._filter;
        },

        group: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: that.filter(), group: val, aggregates: that.aggregate()  });
                return;
            }

            return that._group;
        },

        total: function() {
            return this._total;
        },

        aggregate: function(val) {
            var that = this;

            if(val !== undefined) {
                that.query({ page: that.page(), pageSize: that.pageSize(), sort: that.sort(), filter: val, group: that.group(), aggregates: val });
                return;
            }

            return that._aggregates;
        },
        aggregates: function() {
            return this._aggregateResult;
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

        if(fields){
            if (!data) {
                if (table) {
                    data = inferTable(table, fields);
                } else if (select) {
                    data = inferSelect(select, fields);
                }
            } else if (select) {
                rebuildSelect(data, select, fields);
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

    function rebuildSelect(data, select, fields) {
        var getText = kendo.getter(fields[0].field),
            getValue = kendo.getter(fields[1].field),
            length = data.length,
            options = [],
            i = 0;

        for (; i < length; i++) {
           var option = "<option",
               dataItem = data[i],
               text = getText(dataItem),
               value = getValue(dataItem);

           if (value || value === 0) {
               option += " value=" + value;
           }

           option += ">";

           if (text || text === 0) {
               option += text;
           }

           option += "</option>";
           options.push(option);
        }

        select.html(options.join(""));
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
