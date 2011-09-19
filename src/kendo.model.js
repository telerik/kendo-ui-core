(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        type = $.type,
        getter = kendo.getter,
        setter = kendo.setter,
        accessor = kendo.accessor,
        each = $.each,
        CHANGE = "change",
        Observable = kendo.Observable;

    function equal(x, y) {
        if (x === y) {
            return true;
        }

        var xtype = type(x), ytype = type(y), field;

        if (xtype !== ytype) {
            return false;
        }

        if (xtype === "date") {
            return x.getTime() === y.getTime();
        }

        if (xtype !== "object" && xtype !== "array") {
            return false;
        }

        for (field in x) {
            if (!equal(x[field], y[field])) {
                return false;
            }
        }

        return true;
    }

    var Model = Observable.extend({
        init: function(data) {
            var that = this;

            Observable.fn.init.call(that);

            that._accessors = {};

            that._modified = false;

            that.data = data || {};
            that.pristine = extend(true, {}, data);

            if (that.id() === undefined) {
                that._isNew = true;
                that.data["__id"] = kendo.guid();
            }
        },

        _accessor: function(field) {
            var accessors = this._accessors;

            return accessors[field] = accessors[field] || accessor(field);
        },

        get: function(field) {
            return this._accessor(field).get(this.data);
        },

        set: function(fields, value) {
            var that = this,
                field,
                values = {},
                modified = false,
                accessor;

            if (typeof fields === "string") {
                values[fields] = value;
            } else {
                values = fields;
            }

            for (field in values) {
                accessor = that._accessor(field);

                value = values[field];

                if (!equal(value, accessor.get(that.data))) {
                    accessor.set(that.data, value);
                    that._modified = modified = true;
                }
            }

            if (modified) {
                that.trigger(CHANGE);
            }
        },

        _accept: function(data) {
            var that = this;

            that._isNew = false;
            that._modified = false;

            extend(that.data, data);

            that.pristine = extend(true, {}, that.data);
        },

        hasChanges: function() {
            return this._modified;
        },

        isNew: function() {
            return this._isNew === true;
        },

        changes: function() {
            var modified = null,
                field,
                that = this,
                data = that.data,
                pristine = that.pristine;

            for (field in data) {
                if (field !== "__id" && (that.isNew() || !equal(pristine[field], data[field]))) {
                    modified = modified || {};
                    modified[field] = data[field];
                }
            }

            return modified;
        }
    });

    Model.define = function(options) {
        var model,
            proto = extend({}, options),
            id = proto.id || "id",
            set,
            get;

        if ($.isFunction(id)) {
            get = id;
            set = id;
        } else {
            get = getter(id);
            set = setter(id);
        }

        id = function(data, value) {
            var result;
            if (value === undefined) {
                result = get(data);
                return result !== undefined? result : data["__id"];
            } else {
                set(data, value);
            }
        }

        proto.id = function(value) {
            return id(this.data, value);
        }

        model = Model.extend(proto);
        model.id = id;

        if (proto.fields) {
            model.fields = proto.fields;
        }

        return model;
    }

    var ModelSet = Observable.extend({
        init: function(options) {
            var that = this;

            that.options = options = extend({}, that.options, options);
            that._reader = options.reader;
            that._data = options.data || [];
            that._destroyed = [];
            that._transport = options.transport;
            that._models = {};
            that._map();

            Observable.fn.init.call(that);

            that.bind([CHANGE], options);
        },

        options: {
            batch: false,
            sendAllFields: false,
            autoSync: false
        },

        _map: function() {
            var that = this,
                data = that._data,
                model = that.options.model;

            that._idMap = {};

            for (idx = 0, length = data.length; idx < length; idx++) {
                that._idMap[model.id(data[idx])] = idx;
            }
        },

        data: function(data) {
            var that = this;

            if (data) {
                that._data = data;
                that._models = {};
                that._destroyed = [];
                that._map();
            }
        },

        get: function(id) {
            var that = this,
                data,
                model = that._models[id];

            if (!model) {
                data = that._data[that._idMap[id]];

                if (data) {
                    model = that._models[id] = new that.options.model(data);
                }
            }

            return model;
        },

        add: function(model) {
            var that = this, data;

            if (model instanceof Model) {
                data = model.data;
            } else {
                data = model;
                model = new that.options.model(model);
            }

            that._data.push(data);

            that._map();

            that._models[model.id()] = model;

            if (that.options.autoSync) {
                that.sync();
            }
            return model;
        },

        remove: function(model) {
            var that = this, id = model, idx, length;

            if (model instanceof Model) {
                id = model.id();
            } else {
                model = that.get(id);
            }

            if (model) {
                that._data.splice(that._idMap[id], 1);
                that._map();

                delete that._models[id];

                if (!model.isNew()) {
                    that._destroyed.push(model);
                }

                if (that.options.autoSync) {
                    that.sync();
                }
            }

            return model;
        },

        sync: function() {
            var that = this,
                created = [],
                updated = [],
                destroyed = [],
                data,
                idx,
                length,
                options = that.options,
                sendAllFields = options.sendAllFields,
                model,
                models = that._models;

            for (idx in models) {
                model = models[idx];

                if (model.isNew()) {
                    created.push({
                        model: model,
                        data: model.changes()
                    });
                } else if (model.hasChanges()) {
                    data = sendAllFields ? model.data : model.changes();

                    options.model.id(data, model.id());
                    updated.push({
                        model: model,
                        data: data
                    });
                }
            }

            for (idx = 0, length = that._destroyed.length; idx < length; idx++ ) {
                model = that._destroyed[idx];

                data = sendAllFields ? model.data : {};

                options.model.id(data, model.id());

                destroyed.push({
                    model: model,
                    data: data
                });
            }

            $.when.apply(null, that._send({
                        create: created,
                        update: updated,
                        destroy: destroyed
                    })
                )
                .then(function() {
                    var idx,
                        length;

                    for (idx = 0, length = arguments.length; idx < length; idx++){
                        that._accept(arguments[idx]);
                    }

                    that.trigger(CHANGE);
                });
        },

        _accept: function(result) {
            var that = this,
                models = result.models,
                response = result.response || {},
                idx = 0,
                length;

            response = that._reader.data(that._reader.parse(response));

            if (!$.isArray(response)) {
                response = [response];
            }

            if (result.type === "destroy") {
                that._destroyed = [];
            } else {
                for (idx = 0, length = models.length; idx < length; idx++) {
                    models[idx]._accept(response[idx]);
                }
            }
        },

        _promise: function(data, models, type) {
            var that = this,
                transport = that._transport;

            return $.Deferred(function(deferred) {
                transport[type].call(transport, extend({
                        success: function(response) {
                            deferred.resolve({
                                response: response,
                                models: models,
                                type: type
                            });
                        },
                        error: deferred.reject
                    }, data)
                );
            }).promise();
        },

        _send: function(data) {
            var that = this,
                promises = [],
                order = "create,update,destroy".split(",");

            each(order, function(index, type) {
                var payload = data[type],
                    idx,
                    length;

                if (that.options.batch) {
                    if (payload.length) {
                        promises.push(
                            that._promise( {
                                data: {
                                    models: $.map(payload, function(value) {
                                        return value.data;
                                    })
                                }
                            }, $.map(payload, function(value) {
                                    return value.model;
                            }),  type)
                        );
                    }
                } else {
                    for (idx = 0, length = payload.length; idx < length; idx++) {
                        promises.push(that._promise( { data: payload[idx].data }, [ payload[idx].model ], type));
                    }
                }
            });

            return promises;
        }
    });

    kendo.data.Model = Model;
    kendo.data.ModelSet = ModelSet;
})(jQuery);
