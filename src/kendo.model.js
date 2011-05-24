(function($) {
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

    var Model = Observable.extend({
        init: function(data) {
            var that = this;

            Observable.fn.init.call(that);

            that._accessors = {};

            that.modified = false;

            that.data = extend(true, {}, data);
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

            that.modified = false;

            for (field in values) {
                accessor = that.accessor(field);

                value = values[field];

                if (!equal(value, accessor.get(that.data))) {
                    accessor.set(that.data, value);
                    that.modified = true;
                }
            }

            if (that.modified) {
                that.trigger("change");
            }
        }
    });

    Model.define = function(proto) {
        return Model.extend(proto);
    }

    kendo.data.Model = Model;
})(jQuery);
