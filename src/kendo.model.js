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

            that.data = extend(true, {}, data);
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
            if (value === undefined) {
                return data["__id"] || get(data);
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

            that.options = options;
            that._data = options.data || [];
            that._destroyed = [];
            that._transport = options.transport;
            that._models = {};
            that._map();
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
                data,
                destroyed = that._destroyed,
                idx,
                length,
                model,
                models = that._models;

            for (idx in models) {
                model = models[idx];

                if (model.isNew()) {
                    created.push(model);
                } else if (model.hasChanges()) {
                    updated.push(model);
                }
            }

            for (idx = 0, length = created.length; idx < length; idx++) {
                model = created[idx];

                data = model.changes();

                that._transport.create({
                    data: data
                });
            }

            for (idx = 0, length = updated.length; idx < length; idx++) {
                model = updated[idx];

                data = model.changes();

                that.options.model.id(data, model.id());

                that._transport.update({
                    data: data
                });
            }

            for (idx = 0, length = destroyed.length; idx < length; idx++) {
                model = destroyed[idx];

                data = {};

                that.options.model.id(data, model.id());

                that._transport.destroy({
                    data: data
                });
            }
        }
    });

    kendo.data.Model = Model;
    kendo.data.ModelSet = ModelSet;
})(jQuery);
