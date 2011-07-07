(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        type = $.type,
        getter = kendo.getter,
        setter = kendo.setter,
        accessor = kendo.accessor,
        CHANGE = "change",
        UPDATED = "UPDATED",
        PRISTINE = "PRISTINE",
        CREATED = "CREATED",
        DESTROYED = "DESTROYED",
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
                that.data["__id"] = that.guid();
            }
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
            proto = options || {},
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

        return model;
    }

    var ModelSet = kendo.Class.extend({
        init: function(options) {
            this.options = options;
            this.data = [];
            this.map = {};
            this.models = {};
        },

        model: function(id) {
            var that = this,
                model = id && that.models[id];

            if(!model) {
                model = new that.options.model(that.options.find(id));
                that.models[model.id()] = model;
                model.bind(CHANGE, function() {
                    that.options.update({ model: model });
                });
            }

            return model;
        },

        changes: function(id) {
            var that = this,
                model = that.models[id];

            if (model && model.state === UPDATED) {
                return model.changes();
            }
        },

        hasChanges: function(id) {
            var that = this,
                model,
                models = that.models,
                id;

            if (id === undefined) {
                for (id in models) {
                    if (models[id].state !== PRISTINE) {
                        return true;
                    }
                }

                return false;
            }

            model = models[id];

            return !!model && model.state === UPDATED;
        },

        find: function(id) {
            return this.data[this.map[id]];
        },

        refresh: function(data) {
            var that = this, id = that.options.model.id, idx, length, map = {};

            for (idx = 0, length = data.length; idx < length; idx++) {
                map[id(data[idx])] = idx;
            }

            that.map = map;
            that.data = data;
        },

        select: function(state, selector) {
            var models = this.models,
                result = [],
                model,
                selector = selector || function(o) { return o; },
                id;

            for (id in models) {
                model = models[id];

                if(model.state === state) {
                    result.push(selector(model));
                }
            }

            return result;
        },

        sync: function(data) {
            var updated = this.select(UPDATED),
                model = this.options.model,
                models = this.models, id;

            $.each(updated, function() {
                var id = this.id();
                $.each(data, function() {
                    if (id === model.id(this)) {
                        delete models[id];
                    }
                });
            });
        },

        clear: function(data) {
            this.models = {};
        }
    });

    kendo.data.Model = Model;
    kendo.data.ModelSet = ModelSet;
    Model.UPDATED = UPDATED;
    Model.PRISTINE = PRISTINE;
    Model.CREATED = CREATED;
    Model.DESTROYED = DESTROYED;
})(jQuery);
