(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        type = $.type,
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

            that._accessors = {};

            that._modified = false;

            that.data = extend(true, {}, data);
            that.pristine = extend(true, {}, data);

            that.idField =  that.idField || "id";
            if(that.id() === undefined) {
                that._isNew = true;
                that._generateId();
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
                that.trigger("change");
            }
        },

        isNew: function() {
            return this._isNew;
        },

        id: function() {
            var that = this,
                id = that.idField;
            return $.isFunction(id) ? id(that.data) : that.get(id);
        },

        _generateId: function() {
            var that = this,
                id = that.idField;

            return that.set(id, guid());
        },

        modified: function() {
            var modified = null,
                field,
                that = this,
                data = that.data,
                pristine = that.pristine;

            for (field in data) {
                if (!equal(pristine[field], data[field])) {
                    modified = modified || {};
                    modified[field] = data[field];
                }
            }

            return modified;
        }
    });

    Model.define = function(proto) {
       return Model.extend(proto);
    }

    kendo.data.Model = Model;
})(jQuery);
