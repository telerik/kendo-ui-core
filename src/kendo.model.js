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
            var that = this;

            Observable.call(that);

            that.options = options;
            that.data = [];
            that.map = {};
            that.models = {};

            that.bind([CREATE, UPDATE, DESTROY], options);
        },

        model: function(id) {
            var that = this,
                model = id && that.models[id];

            if(!model) {
                model = new that.options.model(that.find(id));
                that.models[model.id()] = model;
                model.bind(CHANGE, function() {
                    that.trigger(UPDATE, { model: model });
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
        },

        merge: function(origData, data) {
            var that = this,
                origValue,
                origId,
                model = that.options.model;

            $.each(data, function(index, value) {
                origValue = origData[index];

                if (origValue) {
                    origId = model.id(origValue);
                    index = that.map[origId];

                    if (index >= 0) {
                        that.data[index] = value;
                    }
                }
            });

            that.refresh(data);
        },

        create: function(index, values) {
            var that = this,
                data = that.data,
                model = that.model();

            if (typeof index !== "number") {
                values = index;
                index = undefined;
            }

            model.set(values);

            index = index !== undefined ? index : data.length;

            data.splice(index, 0, model.data);

            that.refresh(data);

            that.trigger(CREATE, { model: model });

            return model;
        },

        update: function(id, values) {
            var that = this, model = that.model(id);

            if (model) {
                model.set(values);
            }
        },

        destroy: function(id) {
            var that = this, model = that.model(id);

            if (model) {
                that.data.splice(that.map[id], 1);

                model.destroy();

                that.refresh(that.data);

                that.trigger(DESTROY, { model: model });
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
