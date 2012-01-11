(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        type = $.type,
        getter = kendo.getter,
        setter = kendo.setter,
        accessor = kendo.accessor,
        each = $.each,
        isPlainObject = $.isPlainObject,
        CHANGE = "change",
        ERROR = "error",
        MODELCHANGE = "modelChange",
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        dateRegExp = /^\/Date\((.*?)\)\/$/;

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

    var parsers = {
        "number": function(value) {
            return kendo.parseFloat(value);
        },

        "date": function(value) {
            if (typeof value === "string") {
                var date = dateRegExp.exec(value);
                if (date) {
                    return new Date(parseInt(date[1]));
                }
            }
            return kendo.parseDate(value);
        },

        "boolean": function(value) {
            if (typeof value === "string") {
                return value.toLowerCase() === "true";
            }
            return !!value;
        },

        "string": function(value) {
            return value + "";
        },

        "default": function(value) {
            return value;
        }
    };

    var defaultValues = {
        "string": "",
        "number": 0,
        "date": new Date(),
        "boolean": false,
        "default": ""
    }

    var Model = ObservableObject.extend({
        init: function(data) {
            var that = this;

            data = $.extend({}, that.defaultItem, data);

            ObservableObject.fn.init.call(that, data);

            that.uid = kendo.guid();

            that._accessors = {};

            that._modified = false;

            that.id = that.get(that.idField);
        },

        shouldSerialize: function(field) {
            return ObservableObject.fn.shouldSerialize.call(this, field)
                && field !== "uid"
                && !(this.idField !== "id" && field === "id")
                && field !== "_modified" && field !== "_accessors";
        },

        idField: "id",

        _accessor: function(field) {
            var accessors = this._accessors;

            return accessors[field] = accessors[field] || accessor(field);
        },

        _parse: function(field, value) {
            var that = this,
                parse;

            field = (that.fields || {})[field];
            if (field) {
                parse = field.parse;
                if (!parse && field.type) {
                    parse = parsers[field.type.toLowerCase()];
                }
            }

            return parse ? parse(value) : value;
        },

        editable: function(field) {
            field = (this.fields || {})[field];
            return field ? field.editable !== false : true;
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
                if(!that.editable(field)) {
                    continue;
                }

                accessor = that._accessor(field);

                value = that._parse(field, values[field]);

                if (!equal(value, accessor.get(that))) {
                    accessor.set(that, value);

                    that._modified = modified = true;
                }
            }

            if (modified) {
                that.trigger(CHANGE);
            }
        },

        accept: function(data) {
            var that = this;

            extend(that, data);

            that.id = that.get(that.idField);
            that._modified = false;
        },

        hasChanges: function() {
            return this._modified;
        },

        isNew: function() {
            return this.id === this._defaultId;
        }
    });

    Model.define = function(options) {
        var model,
            proto = extend({}, { defaultItem: {} }, options),
            id = proto.id || "id";

        proto.idField = id;

        if (proto.id) {
            delete proto.id;
        }

        for (var name in proto.fields) {
            var field = proto.fields[name],
                type = field.type || "default",
                value = null;

            name = field.field || name;

            if (!field.nullable) {
                value = proto.defaultItem[name] = field.defaultValue !== undefined ? field.defaultValue : defaultValues[type.toLowerCase()];
            }

            if (options.id === name) {
                proto._defaultId = value;
            }

            proto.defaultItem[name] = value;

            field.parse = field.parse || parsers[type];
        }

        model = Model.extend(proto);

        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }

        return model;
    }

    kendo.data.Model = Model;
})(jQuery);
