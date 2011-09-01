(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        type = $.type,
        getter = kendo.getter,
        setter = kendo.setter,
        accessor = kendo.accessor,
        each = $.each,

        CHANGE = "change",
        UPDATED = "UPDATED",
        PRISTINE = "PRISTINE",
        CREATED = "CREATED",
        DESTROYED = "DESTROYED",

        CREATE = "create",
        DESTROY = "destroy",
        UPDATE = "update",

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

            that.state = PRISTINE;

            that._accessors = {};

            that._modified = false;

            that.data = extend(true, {}, data);
            that.pristine = extend(true, {}, data);

            if(that.id() === undefined) {
                that.state = CREATED;
                that.data["__id"] = kendo.guid();
            }
        },

        accessor: function(field) {
            var accessors = this._accessors;

            return accessors[field] = accessors[field] || accessor(field);
        },

        get: function(field) {
            var that = this,
                accessor = that.accessor(field);

            return accessor.get(that.data);
        },

        set: function(fields, value) {
            var that = this,
                field,
                values = {},
                accessor;

            if (typeof fields === "string") {
                values[fields] = value;
            } else {
                values = fields;
            }

            that._modified = false;

            for (field in values) {
                accessor = that.accessor(field);

                value = values[field];

                if (!equal(value, accessor.get(that.data))) {
                    accessor.set(that.data, value);
                    that._modified = true;
                }
            }

            if (that._modified) {
                that.state = that.isNew() ? CREATED : UPDATED;
                that.trigger(CHANGE);
            }
        },

        isNew: function() {
            return this.state === CREATED;
        },

        destroy: function() {
            this.state = DESTROYED;
        },

        changes: function() {
            var modified = null,
                field,
                that = this,
                data = that.data,
                pristine = that.pristine;

            for (field in data) {
                if (field !== "__id" && !equal(pristine[field], data[field])) {
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
            var that = this,
                idx,
                length,
                data,
                model;

            that._data = data = options.data || [];
            that._model = model = options.model;
            that._dataMap = {};
            that._modelMap = {};

            for (idx = 0, length = data.length; idx < length; idx++) {
                that._dataMap[model.id(data[idx])] = data[idx];
            }
        },

        get: function(id) {
            var that = this,
                data,
                model = that._modelMap[id];

            if (!model) {
                data = that._dataMap[id];

                if (data) {
                    model = that._modelMap[id] = new that._model(data);
                }
            }

            return model;
        },

        create: function(data) {
            var that = this, model;

            model = new that._model(data);

            that._data.push(data);

            that._modelMap[model.id()] = model;
            that._dataMap[model.id()] = data;

            return model;
        },

        update: function(id, data) {
            var model = this.get(id);

            if (model) {
                model.set(data);
            }

            return model;
        },

        destroy: function(id) {
            var that = this,
                idx,
                length,
                model,
                data = that._dataMap[id];

            if (data) {
                for (idx = 0, length = that._data.length; idx < length; idx++) {
                    if (that._data[idx] === data) {
                        model = that.get(id);

                        delete that._modelMap[id];
                        delete that._dataMap[id];

                        that._data.splice(idx, 1);

                        return model;
                    }
                }
            }
        }
    });

    kendo.data.Model = Model;
    kendo.data.ModelSet = ModelSet;
    Model.UPDATED = UPDATED;
    Model.PRISTINE = PRISTINE;
    Model.CREATED = CREATED;
    Model.DESTROYED = DESTROYED;
})(jQuery);
