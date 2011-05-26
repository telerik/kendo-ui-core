(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        type = $.type,
        MODIFIED = "MODIFIED",
        NOTMODIFIED = "NOTMODIFIED",
        INSERTED = "INSERTED",
        DELETED = "DELETED",
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

    function guid() {
        var id = "", i, random;

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                id += "-";
            }
            id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }

        return id;
    }

    var Model = Observable.extend({
        init: function(data) {
            var that = this;

            Observable.fn.init.call(that);

            that.state = NOTMODIFIED;

            that._accessors = {};

            that._modified = false;

            that.data = extend(true, {}, data);
            that.pristine = extend(true, {}, data);

            that.idField =  that.idField || "id";
            if(that.id() === undefined) {
                that.state = INSERTED;
                that.accessor(that.idField).set(that.data, guid());
            }
        },

        accessor: function(field) {
            var that = this;

            return that._accessors[field] = that._accessors[field] || kendo.accessor(field);
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
                that.state = that.isNew() ? INSERTED : MODIFIED;
                that.trigger("change");
            }
        },

        isNew: function() {
            return this.state === INSERTED;
        },

        id: function() {
            var that = this,
                id = that.idField;
            return $.isFunction(id) ? id(that.data) : that.get(id);
        },

        changes: function() {
            var modified = null,
                field,
                that = this,
                data = that.data,
                pristine = that.pristine;

            for (field in data) {
                if (field !== that.idField && !equal(pristine[field], data[field])) {
                    modified = modified || {};
                    modified[field] = data[field];
                }
            }

            return modified;
        }
    });

    Model.define = function(proto) {
        var model = Model.extend(proto),
            id = proto && proto.idField || "id",
            accessor = $.isFunction(id) ? id : kendo.accessor(id).get;

        model.id = function(data) {
            return accessor(data);
        }
        return model;
    }

    kendo.data.Model = Model;
    kendo.data.Model.MODIFIED = MODIFIED;
    kendo.data.Model.NOTMODIFIED = NOTMODIFIED;
    kendo.data.Model.INSERTED = INSERTED;
    kendo.data.Model.DELETED = DELETED;
})(jQuery);
