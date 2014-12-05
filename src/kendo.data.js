(function(f, define){
    define([ "./kendo.core", "./kendo.data.odata", "./kendo.data.xml" ], f);
})(function(){

var __meta__ = {
    id: "data",
    name: "Data source",
    category: "framework",
    description: "Powerful component for using local and remote data.Fully supports CRUD, Sorting, Paging, Filtering, Grouping, and Aggregates.",
    depends: [ "core" ],
    features: [ {
        id: "data-odata",
        name: "OData",
        description: "Support for accessing Open Data Protocol (OData) services.",
        depends: [ "data.odata" ]
    }, {
        id: "data-XML",
        name: "XML",
        description: "Support for binding to XML.",
        depends: [ "data.xml" ]
    } ]
};

/*jshint eqnull: true, loopfunc: true, evil: true */
(function($, undefined) {
    var extend = $.extend,
        proxy = $.proxy,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        isArray = $.isArray,
        grep = $.grep,
        ajax = $.ajax,
        map,
        each = $.each,
        noop = $.noop,
        kendo = window.kendo,
        isFunction = kendo.isFunction,
        Observable = kendo.Observable,
        Class = kendo.Class,
        STRING = "string",
        FUNCTION = "function",
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        SYNC = "sync",
        GET = "get",
        ERROR = "error",
        REQUESTSTART = "requestStart",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function(o) { return o; },
        getter = kendo.getter,
        stringify = kendo.stringify,
        math = Math,
        push = [].push,
        join = [].join,
        pop = [].pop,
        splice = [].splice,
        shift = [].shift,
        slice = [].slice,
        unshift = [].unshift,
        toString = {}.toString,
        stableSort = kendo.support.stableSort,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        newLineRegExp = /(\r+|\n+)/g,
        quoteRegExp = /(?=['\\])/g;

    var ObservableArray = Observable.extend({
        init: function(array, type) {
            var that = this;

            that.type = type || ObservableObject;

            Observable.fn.init.call(that);

            that.length = array.length;

            that.wrapAll(array, that);
        },

        at: function(index) {
            return this[index];
        },

        toJSON: function() {
            var idx, length = this.length, value, json = new Array(length);

            for (idx = 0; idx < length; idx++){
                value = this[idx];

                if (value instanceof ObservableObject) {
                    value = value.toJSON();
                }

                json[idx] = value;
            }

            return json;
        },

        parent: noop,

        wrapAll: function(source, target) {
            var that = this,
                idx,
                length,
                parent = function() {
                    return that;
                };

            target = target || [];

            for (idx = 0, length = source.length; idx < length; idx++) {
                target[idx] = that.wrap(source[idx], parent);
            }

            return target;
        },

        wrap: function(object, parent) {
            var that = this,
                observable;

            if (object !== null && toString.call(object) === "[object Object]") {
                observable = object instanceof that.type || object instanceof Model;

                if (!observable) {
                    object = object instanceof ObservableObject ? object.toJSON() : object;
                    object = new that.type(object);
                }

                object.parent = parent;

                object.bind(CHANGE, function(e) {
                    that.trigger(CHANGE, {
                        field: e.field,
                        node: e.node,
                        index: e.index,
                        items: e.items || [this],
                        action: e.node  ? (e.action || "itemchange") : "itemchange"
                    });
                });
            }

            return object;
        },

        push: function() {
            var index = this.length,
                items = this.wrapAll(arguments),
                result;

            result = push.apply(this, items);

            this.trigger(CHANGE, {
                action: "add",
                index: index,
                items: items
            });

            return result;
        },

        slice: slice,

        sort: [].sort,

        join: join,

        pop: function() {
            var length = this.length, result = pop.apply(this);

            if (length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: length - 1,
                    items:[result]
                });
            }

            return result;
        },

        splice: function(index, howMany, item) {
            var items = this.wrapAll(slice.call(arguments, 2)),
                result, i, len;

            result = splice.apply(this, [index, howMany].concat(items));

            if (result.length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: index,
                    items: result
                });

                for (i = 0, len = result.length; i < len; i++) {
                    if (result[i].children) {
                        result[i].unbind(CHANGE);
                    }
                }
            }

            if (item) {
                this.trigger(CHANGE, {
                    action: "add",
                    index: index,
                    items: items
                });
            }
            return result;
        },

        shift: function() {
            var length = this.length, result = shift.apply(this);

            if (length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: 0,
                    items:[result]
                });
            }

            return result;
        },

        unshift: function() {
            var items = this.wrapAll(arguments),
                result;

            result = unshift.apply(this, items);

            this.trigger(CHANGE, {
                action: "add",
                index: 0,
                items: items
            });

            return result;
        },

        indexOf: function(item) {
            var that = this,
                idx,
                length;

            for (idx = 0, length = that.length; idx < length; idx++) {
                if (that[idx] === item) {
                    return idx;
                }
            }
            return -1;
        },

        forEach: function(callback) {
            var idx = 0,
                length = this.length;

            for (; idx < length; idx++) {
                callback(this[idx], idx, this);
            }
        },

        map: function(callback) {
            var idx = 0,
                result = [],
                length = this.length;

            for (; idx < length; idx++) {
                result[idx] = callback(this[idx], idx, this);
            }

            return result;
        },

        filter: function(callback) {
            var idx = 0,
                result = [],
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    result[result.length] = item;
                }
            }

            return result;
        },

        find: function(callback) {
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    return item;
                }
            }
        },

        every: function(callback) {
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (!callback(item, idx, this)) {
                    return false;
                }
            }

            return true;
        },

        some: function(callback) {
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    return true;
                }
            }

            return false;
        },

        // non-standard collection methods
        remove: function(item) {
            var idx = this.indexOf(item);

            if (idx !== -1) {
                this.splice(idx, 1);
            }
        },

        empty: function() {
            this.splice(0, this.length);
        }
    });

    var LazyObservableArray = ObservableArray.extend({
        init: function(data, type) {
            Observable.fn.init.call(this);

            this.type = type || ObservableObject;

            for (var idx = 0; idx < data.length; idx++) {
                this[idx] = data[idx];
            }

            this.length = idx;
            this._parent = proxy(function() { return this; }, this);
        },
        at: function(index) {
            var item = this[index];

            if (!(item instanceof this.type)) {
                item = this[index] = this.wrap(item, this._parent);
            } else {
                item.parent = this._parent;
            }

            return item;
        }
    });

    function eventHandler(context, type, field, prefix) {
        return function(e) {
            var event = {}, key;

            for (key in e) {
                event[key] = e[key];
            }

            if (prefix) {
                event.field = field + "." + e.field;
            } else {
                event.field = field;
            }

            if (type == CHANGE && context._notifyChange) {
                context._notifyChange(event);
            }

            context.trigger(type, event);
        };
    }

    var ObservableObject = Observable.extend({
        init: function(value) {
            var that = this,
                member,
                field,
                parent = function() {
                    return that;
                };

            Observable.fn.init.call(this);

            for (field in value) {
                member = value[field];

                if (typeof member === "object" && member && !member.getTime && field.charAt(0) != "_") {
                    member = that.wrap(member, field, parent);
                }

                that[field] = member;
            }

            that.uid = kendo.guid();
        },

        shouldSerialize: function(field) {
            return this.hasOwnProperty(field) && field !== "_events" && typeof this[field] !== FUNCTION && field !== "uid";
        },

        forEach: function(f) {
            for (var i in this) {
                if (this.shouldSerialize(i)) {
                    f(this[i], i);
                }
            }
        },

        toJSON: function() {
            var result = {}, value, field;

            for (field in this) {
                if (this.shouldSerialize(field)) {
                    value = this[field];

                    if (value instanceof ObservableObject || value instanceof ObservableArray) {
                        value = value.toJSON();
                    }

                    result[field] = value;
                }
            }

            return result;
        },

        get: function(field) {
            var that = this, result;

            that.trigger(GET, { field: field });

            if (field === "this") {
                result = that;
            } else {
                result = kendo.getter(field, true)(that);
            }

            return result;
        },

        _set: function(field, value) {
            var that = this;
            var composite = field.indexOf(".") >= 0;

            if (composite) {
                var paths = field.split("."),
                    path = "";

                while (paths.length > 1) {
                    path += paths.shift();
                    var obj = kendo.getter(path, true)(that);
                    if (obj instanceof ObservableObject) {
                        obj.set(paths.join("."), value);
                        return composite;
                    }
                    path += ".";
                }
            }

            kendo.setter(field)(that, value);

            return composite;
        },

        set: function(field, value) {
            var that = this,
                composite = field.indexOf(".") >= 0,
                current = kendo.getter(field, true)(that);

            if (current !== value) {

                if (!that.trigger("set", { field: field, value: value })) {
                    if (!composite) {
                        value = that.wrap(value, field, function() { return that; });
                    }
                    if (!that._set(field, value) || field.indexOf("(") >= 0 || field.indexOf("[") >= 0) {
                        that.trigger(CHANGE, { field: field });
                    }
                }
            }
        },

        parent: noop,

        wrap: function(object, field, parent) {
            var that = this,
                type = toString.call(object);

            if (object != null && (type === "[object Object]" || type === "[object Array]")) {
                var isObservableArray = object instanceof ObservableArray;
                var isDataSource = object instanceof DataSource;

                if (type === "[object Object]" && !isDataSource && !isObservableArray) {
                    if (!(object instanceof ObservableObject)) {
                        object = new ObservableObject(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(GET, eventHandler(that, GET, field, true));
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, true));
                    }
                } else if (type === "[object Array]" || isObservableArray || isDataSource) {
                    if (!isObservableArray && !isDataSource) {
                        object = new ObservableArray(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, false));
                    }
                }

                object.parent = parent;
            }

            return object;
        }
    });

    function equal(x, y) {
        if (x === y) {
            return true;
        }

        var xtype = $.type(x), ytype = $.type(y), field;

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
            return kendo.parseDate(value);
        },

        "boolean": function(value) {
            if (typeof value === STRING) {
                return value.toLowerCase() === "true";
            }
            return value != null ? !!value : value;
        },

        "string": function(value) {
            return value != null ? (value + "") : value;
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
    };

    function getFieldByName(obj, name) {
        var field,
            fieldName;

        for (fieldName in obj) {
            field = obj[fieldName];
            if (isPlainObject(field) && field.field && field.field === name) {
                return field;
            } else if (field === name) {
                return field;
            }
        }
        return null;
    }

    var Model = ObservableObject.extend({
        init: function(data) {
            var that = this;

            if (!data || $.isEmptyObject(data)) {
                data = $.extend({}, that.defaults, data);

                if (that._initializers) {
                    for (var idx = 0; idx < that._initializers.length; idx++) {
                         var name = that._initializers[idx];
                         data[name] = that.defaults[name]();
                    }
                }
            }

            ObservableObject.fn.init.call(that, data);

            that.dirty = false;

            if (that.idField) {
                that.id = that.get(that.idField);

                if (that.id === undefined) {
                    that.id = that._defaultId;
                }
            }
        },

        shouldSerialize: function(field) {
            return ObservableObject.fn.shouldSerialize.call(this, field) && field !== "uid" && !(this.idField !== "id" && field === "id") && field !== "dirty" && field !== "_accessors";
        },

        _parse: function(field, value) {
            var that = this,
                fieldName = field,
                fields = (that.fields || {}),
                parse;

            field = fields[field];
            if (!field) {
                field = getFieldByName(fields, fieldName);
            }
            if (field) {
                parse = field.parse;
                if (!parse && field.type) {
                    parse = parsers[field.type.toLowerCase()];
                }
            }

            return parse ? parse(value) : value;
        },

        _notifyChange: function(e) {
            var action = e.action;

            if (action == "add" || action == "remove") {
                this.dirty = true;
            }
        },

        editable: function(field) {
            field = (this.fields || {})[field];
            return field ? field.editable !== false : true;
        },

        set: function(field, value, initiator) {
            var that = this;

            if (that.editable(field)) {
                value = that._parse(field, value);

                if (!equal(value, that.get(field))) {
                    that.dirty = true;
                    ObservableObject.fn.set.call(that, field, value, initiator);
                }
            }
        },

        accept: function(data) {
            var that = this,
                parent = function() { return that; },
                field;

            for (field in data) {
                var value = data[field];

                if (field.charAt(0) != "_") {
                    value = that.wrap(data[field], field, parent);
                }

                that._set(field, value);
            }

            if (that.idField) {
                that.id = that.get(that.idField);
            }

            that.dirty = false;
        },

        isNew: function() {
            return this.id === this._defaultId;
        }
    });

    Model.define = function(base, options) {
        if (options === undefined) {
            options = base;
            base = Model;
        }

        var model,
            proto = extend({ defaults: {} }, options),
            name,
            field,
            type,
            value,
            idx,
            length,
            fields = {},
            originalName,
            id = proto.id,
            functionFields = [];

        if (id) {
            proto.idField = id;
        }

        if (proto.id) {
            delete proto.id;
        }

        if (id) {
            proto.defaults[id] = proto._defaultId = "";
        }

        if (toString.call(proto.fields) === "[object Array]") {
            for (idx = 0, length = proto.fields.length; idx < length; idx++) {
                field = proto.fields[idx];
                if (typeof field === STRING) {
                    fields[field] = {};
                } else if (field.field) {
                    fields[field.field] = field;
                }
            }
            proto.fields = fields;
        }

        for (name in proto.fields) {
            field = proto.fields[name];
            type = field.type || "default";
            value = null;
            originalName = name;

            name = typeof (field.field) === STRING ? field.field : name;

            if (!field.nullable) {
                value = proto.defaults[originalName !== name ? originalName : name] = field.defaultValue !== undefined ? field.defaultValue : defaultValues[type.toLowerCase()];

                if (typeof value === "function") {
                    functionFields.push(name);
                }
            }

            if (options.id === name) {
                proto._defaultId = value;
            }

            proto.defaults[originalName !== name ? originalName : name] = value;

            field.parse = field.parse || parsers[type];
        }

        if (functionFields.length > 0) {
            proto._initializers = functionFields;
        }

        model = base.extend(proto);
        model.define = function(options) {
            return Model.define(model, options);
        };

        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }

        return model;
    };

    var Comparer = {
        selector: function(field) {
            return isFunction(field) ? field : getter(field);
        },

        compare: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                if (a == null && b == null) {
                    return 0;
                }

                if (a == null) {
                    return -1;
                }

                if (b == null) {
                    return 1;
                }

                if (a.localeCompare) {
                    return a.localeCompare(b);
                }

                return a > b ? 1 : (a < b ? -1 : 0);
            };
        },

        create: function(sort) {
            var compare = sort.compare || this.compare(sort.field);

            if (sort.dir == "desc") {
                return function(a, b) {
                    return compare(b, a, true);
                };
            }

            return compare;
        },

        combine: function(comparers) {
            return function(a, b) {
                var result = comparers[0](a, b),
                    idx,
                    length;

                for (idx = 1, length = comparers.length; idx < length; idx ++) {
                    result = result || comparers[idx](a, b);
                }

                return result;
            };
        }
    };

    var StableComparer = extend({}, Comparer, {
        asc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                var valueA = selector(a);
                var valueB = selector(b);

                if (valueA && valueA.getTime && valueB && valueB.getTime) {
                    valueA = valueA.getTime();
                    valueB = valueB.getTime();
                }

                if (valueA === valueB) {
                    return a.__position - b.__position;
                }

                if (valueA == null) {
                    return -1;
                }

                if (valueB == null) {
                    return 1;
                }

                if (valueA.localeCompare) {
                    return valueA.localeCompare(valueB);
                }

                return valueA > valueB ? 1 : -1;
            };
        },

        desc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                var valueA = selector(a);
                var valueB = selector(b);

                if (valueA && valueA.getTime && valueB && valueB.getTime) {
                    valueA = valueA.getTime();
                    valueB = valueB.getTime();
                }

                if (valueA === valueB) {
                    return a.__position - b.__position;
                }

                if (valueA == null) {
                    return 1;
                }

                if (valueB == null) {
                    return -1;
                }

                if (valueB.localeCompare) {
                    return valueB.localeCompare(valueA);
                }

                return valueA < valueB ? 1 : -1;
            };
        },
        create: function(sort) {
           return this[sort.dir](sort.field);
        }
    });

    map = function (array, callback) {
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = callback(array[idx], idx, array);
        }

        return result;
    };

    var operators = (function(){

        function quote(value) {
            return value.replace(quoteRegExp, "\\").replace(newLineRegExp, "");
        }

        function operator(op, a, b, ignore) {
            var date;

            if (b != null) {
                if (typeof b === STRING) {
                    b = quote(b);
                    date = dateRegExp.exec(b);
                    if (date) {
                        b = new Date(+date[1]);
                    } else if (ignore) {
                        b = "'" + b.toLowerCase() + "'";
                        a = "(" + a + " || '').toLowerCase()";
                    } else {
                        b = "'" + b + "'";
                    }
                }

                if (b.getTime) {
                    //b looks like a Date
                    a = "(" + a + "?" + a + ".getTime():" + a + ")";
                    b = b.getTime();
                }
            }

            return a + " " + op + " " + b;
        }

        return {
            eq: function(a, b, ignore) {
                return operator("==", a, b, ignore);
            },
            neq: function(a, b, ignore) {
                return operator("!=", a, b, ignore);
            },
            gt: function(a, b, ignore) {
                return operator(">", a, b, ignore);
            },
            gte: function(a, b, ignore) {
                return operator(">=", a, b, ignore);
            },
            lt: function(a, b, ignore) {
                return operator("<", a, b, ignore);
            },
            lte: function(a, b, ignore) {
                return operator("<=", a, b, ignore);
            },
            startswith: function(a, b, ignore) {
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".lastIndexOf('" + b + "', 0) == 0";
            },
            endswith: function(a, b, ignore) {
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "', " + a + ".length - " + (b || "").length + ") >= 0";
            },
            contains: function(a, b, ignore) {
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "') >= 0";
            },
            doesnotcontain: function(a, b, ignore) {
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "') == -1";
            }
        };
    })();

    function Query(data) {
        this.data = data || [];
    }

    Query.filterExpr = function(expression) {
        var expressions = [],
            logic = { and: " && ", or: " || " },
            idx,
            length,
            filter,
            expr,
            fieldFunctions = [],
            operatorFunctions = [],
            field,
            operator,
            filters = expression.filters;

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            operator = filter.operator;

            if (filter.filters) {
                expr = Query.filterExpr(filter);
                //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
                filter = expr.expression
                .replace(/__o\[(\d+)\]/g, function(match, index) {
                    index = +index;
                    return "__o[" + (operatorFunctions.length + index) + "]";
                })
                .replace(/__f\[(\d+)\]/g, function(match, index) {
                    index = +index;
                    return "__f[" + (fieldFunctions.length + index) + "]";
                });

                operatorFunctions.push.apply(operatorFunctions, expr.operators);
                fieldFunctions.push.apply(fieldFunctions, expr.fields);
            } else {
                if (typeof field === FUNCTION) {
                    expr = "__f[" + fieldFunctions.length +"](d)";
                    fieldFunctions.push(field);
                } else {
                    expr = kendo.expr(field);
                }

                if (typeof operator === FUNCTION) {
                    filter = "__o[" + operatorFunctions.length + "](" + expr + ", " + filter.value + ")";
                    operatorFunctions.push(operator);
                } else {
                    filter = operators[(operator || "eq").toLowerCase()](expr, filter.value, filter.ignoreCase !== undefined? filter.ignoreCase : true);
                }
            }

            expressions.push(filter);
        }

        return  { expression: "(" + expressions.join(logic[expression.logic]) + ")", fields: fieldFunctions, operators: operatorFunctions };
    };

    function normalizeSort(field, dir) {
        if (field) {
            var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
            descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

            return grep(descriptors, function(d) { return !!d.dir; });
        }
    }

    var operatorMap = {
        "==": "eq",
        equals: "eq",
        isequalto: "eq",
        equalto: "eq",
        equal: "eq",
        "!=": "neq",
        ne: "neq",
        notequals: "neq",
        isnotequalto: "neq",
        notequalto: "neq",
        notequal: "neq",
        "<": "lt",
        islessthan: "lt",
        lessthan: "lt",
        less: "lt",
        "<=": "lte",
        le: "lte",
        islessthanorequalto: "lte",
        lessthanequal: "lte",
        ">": "gt",
        isgreaterthan: "gt",
        greaterthan: "gt",
        greater: "gt",
        ">=": "gte",
        isgreaterthanorequalto: "gte",
        greaterthanequal: "gte",
        ge: "gte",
        notsubstringof: "doesnotcontain"
    };

    function normalizeOperator(expression) {
        var idx,
        length,
        filter,
        operator,
        filters = expression.filters;

        if (filters) {
            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                operator = filter.operator;

                if (operator && typeof operator === STRING) {
                    filter.operator = operatorMap[operator.toLowerCase()] || operator;
                }

                normalizeOperator(filter);
            }
        }
    }

    function normalizeFilter(expression) {
        if (expression && !isEmptyObject(expression)) {
            if (isArray(expression) || !expression.filters) {
                expression = {
                    logic: "and",
                    filters: isArray(expression) ? expression : [expression]
                };
            }

            normalizeOperator(expression);

            return expression;
        }
    }

    Query.normalizeFilter = normalizeFilter;

    function normalizeAggregate(expressions) {
        return isArray(expressions) ? expressions : [expressions];
    }

    function normalizeGroup(field, dir) {
        var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
        descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(d) { return { field: d.field, dir: d.dir || "asc", aggregates: d.aggregates }; });
    }

    Query.prototype = {
        toArray: function () {
            return this.data;
        },
        range: function(index, count) {
            return new Query(this.data.slice(index, index + count));
        },
        skip: function (count) {
            return new Query(this.data.slice(count));
        },
        take: function (count) {
            return new Query(this.data.slice(0, count));
        },
        select: function (selector) {
            return new Query(map(this.data, selector));
        },
        order: function(selector, dir) {
            var sort = { dir: dir };

            if (selector) {
                if (selector.compare) {
                    sort.compare = selector.compare;
                } else {
                    sort.field = selector;
                }
            }

            return new Query(this.data.slice(0).sort(Comparer.create(sort)));
        },
        orderBy: function(selector) {
            return this.order(selector, "asc");
        },
        orderByDescending: function(selector) {
            return this.order(selector, "desc");
        },
        sort: function(field, dir, comparer) {
            var idx,
            length,
            descriptors = normalizeSort(field, dir),
            comparers = [];

            comparer = comparer || Comparer;

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: comparer.combine(comparers) });
            }

            return this;
        },

        filter: function(expressions) {
            var idx,
            current,
            length,
            compiled,
            predicate,
            data = this.data,
            fields,
            operators,
            result = [],
            filter;

            expressions = normalizeFilter(expressions);

            if (!expressions || expressions.filters.length === 0) {
                return this;
            }

            compiled = Query.filterExpr(expressions);
            fields = compiled.fields;
            operators = compiled.operators;

            predicate = filter = new Function("d, __f, __o", "return " + compiled.expression);

            if (fields.length || operators.length) {
                filter = function(d) {
                    return predicate(d, fields, operators);
                };
            }


            for (idx = 0, length = data.length; idx < length; idx++) {
                current = data[idx];

                if (filter(current)) {
                    result.push(current);
                }
            }

            return new Query(result);
        },

        group: function(descriptors, allData) {
            descriptors =  normalizeGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
            result = new Query(that.data),
            descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function(group) {
                    var data = new Query(allData).filter([ { field: group.field, operator: "eq", value: group.value, ignoreCase: false } ]);
                    return {
                        field: group.field,
                        value: group.value,
                        items: descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), data.toArray()).toArray() : group.items,
                        hasSubgroups: descriptors.length > 1,
                        aggregates: data.aggregate(descriptor.aggregates)
                    };
                });
            }
            return result;
        },

        groupBy: function(descriptor) {
            if (isEmptyObject(descriptor) || !this.data.length) {
                return new Query([]);
            }

            var field = descriptor.field,
                sorted = this._sortForGrouping(field, descriptor.dir || "asc"),
                accessor = kendo.accessor(field),
                item,
                groupValue = accessor.get(sorted[0], field),
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                },
                currentValue,
                idx,
                len,
                result = [group];

            for(idx = 0, len = sorted.length; idx < len; idx++) {
                item = sorted[idx];
                currentValue = accessor.get(item, field);
                if(!groupValueComparer(groupValue, currentValue)) {
                    groupValue = currentValue;
                    group = {
                        field: field,
                        value: groupValue,
                        items: []
                    };
                    result.push(group);
                }
                group.items.push(item);
            }
            return new Query(result);
        },

        _sortForGrouping: function(field, dir) {
            var idx, length,
                data = this.data;

            if (!stableSort) {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    data[idx].__position = idx;
                }

                data = new Query(data).sort(field, dir, StableComparer).toArray();

                for (idx = 0, length = data.length; idx < length; idx++) {
                    delete data[idx].__position;
                }
                return data;
            }
            return this.sort(field, dir).toArray();
        },

        aggregate: function (aggregates) {
            var idx,
                len,
                result = {},
                state = {};

            if (aggregates && aggregates.length) {
                for(idx = 0, len = this.data.length; idx < len; idx++) {
                    calculateAggregate(result, aggregates, this.data[idx], idx, len, state);
                }
            }
            return result;
        }
    };

    function groupValueComparer(a, b) {
        if (a && a.getTime && b && b.getTime) {
            return a.getTime() === b.getTime();
        }
        return a === b;
    }

    function calculateAggregate(accumulator, aggregates, item, index, length, state) {
        aggregates = aggregates || [];
        var idx,
            aggr,
            functionName,
            len = aggregates.length;

        for (idx = 0; idx < len; idx++) {
            aggr = aggregates[idx];
            functionName = aggr.aggregate;
            var field = aggr.field;
            accumulator[field] = accumulator[field] || {};
            state[field] = state[field] || {};
            state[field][functionName] = state[field][functionName] || {};
            accumulator[field][functionName] = functions[functionName.toLowerCase()](accumulator[field][functionName], item, kendo.accessor(field), index, length, state[field][functionName]);
        }
    }

    var functions = {
        sum: function(accumulator, item, accessor) {
            var value = accessor.get(item);

            if (!isNumber(accumulator)) {
                accumulator = value;
            } else if (isNumber(value)) {
                accumulator += value;
            }

            return accumulator;
        },
        count: function(accumulator) {
            return (accumulator || 0) + 1;
        },
        average: function(accumulator, item, accessor, index, length, state) {
            var value = accessor.get(item);

            if (state.count === undefined) {
                state.count = 0;
            }

            if (!isNumber(accumulator)) {
                accumulator = value;
            } else if (isNumber(value)) {
                accumulator += value;
            }

            if (isNumber(value)) {
                state.count++;
            }

            if(index == length - 1 && isNumber(accumulator)) {
                accumulator = accumulator / state.count;
            }
            return accumulator;
        },
        max: function(accumulator, item, accessor) {
            var value = accessor.get(item);

            if (!isNumber(accumulator) && !isDate(accumulator)) {
                accumulator = value;
            }

            if(accumulator < value && (isNumber(value) || isDate(value))) {
                accumulator = value;
            }
            return accumulator;
        },
        min: function(accumulator, item, accessor) {
            var value = accessor.get(item);

            if (!isNumber(accumulator) && !isDate(accumulator)) {
                accumulator = value;
            }

            if(accumulator > value && (isNumber(value) || isDate(value))) {
                accumulator = value;
            }
            return accumulator;
        }
    };

    function isNumber(val) {
        return typeof val === "number" && !isNaN(val);
    }

    function isDate(val) {
        return val && val.getTime;
    }

    function toJSON(array) {
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = array[idx].toJSON();
        }

        return result;
    }

    Query.process = function(data, options) {
        options = options || {};

        var query = new Query(data),
            group = options.group,
            sort = normalizeGroup(group || []).concat(normalizeSort(options.sort || [])),
            total,
            filterCallback = options.filterCallback,
            filter = options.filter,
            skip = options.skip,
            take = options.take;

        if (filter) {
            query = query.filter(filter);

            if (filterCallback) {
                query = filterCallback(query);
            }

            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);

            if (group) {
                data = query.toArray();
            }
        }

        if (skip !== undefined && take !== undefined) {
            query = query.range(skip, take);
        }

        if (group) {
            query = query.group(group, data);
        }

        return {
            total: total,
            data: query.toArray()
        };
    };

    var LocalTransport = Class.extend({
        init: function(options) {
            this.data = options.data;
        },

        read: function(options) {
            options.success(this.data);
        },
        update: function(options) {
            options.success(options.data);
        },
        create: function(options) {
            options.success(options.data);
        },
        destroy: function(options) {
            options.success(options.data);
        }
    });

    var RemoteTransport = Class.extend( {
        init: function(options) {
            var that = this, parameterMap;

            options = that.options = extend({}, that.options, options);

            each(crud, function(index, type) {
                if (typeof options[type] === STRING) {
                    options[type] = {
                        url: options[type]
                    };
                }
            });

            that.cache = options.cache? Cache.create(options.cache) : {
                find: noop,
                add: noop
            };

            parameterMap = options.parameterMap;

            if (isFunction(options.push)) {
                that.push = options.push;
            }

            if (!that.push) {
                that.push = identity;
            }

            that.parameterMap = isFunction(parameterMap) ? parameterMap : function(options) {
                var result = {};

                each(options, function(option, value) {
                    if (option in parameterMap) {
                        option = parameterMap[option];
                        if (isPlainObject(option)) {
                            value = option.value(value);
                            option = option.key;
                        }
                    }

                    result[option] = value;
                });

                return result;
            };
        },

        options: {
            parameterMap: identity
        },

        create: function(options) {
            return ajax(this.setup(options, CREATE));
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
            return ajax(this.setup(options, UPDATE));
        },

        destroy: function(options) {
            return ajax(this.setup(options, DESTROY));
        },

        setup: function(options, type) {
            options = options || {};

            var that = this,
                parameters,
                operation = that.options[type],
                data = isFunction(operation.data) ? operation.data(options.data) : operation.data;

            options = extend(true, {}, operation, options);
            parameters = extend(true, {}, data, options.data);

            options.data = that.parameterMap(parameters, type);

            if (isFunction(options.url)) {
                options.url = options.url(parameters);
            }

            return options;
        }
    });

    var Cache = Class.extend({
        init: function() {
            this._store = {};
        },
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
    });

    Cache.create = function(options) {
        var store = {
            "inmemory": function() { return new Cache(); }
        };

        if (isPlainObject(options) && isFunction(options.find)) {
            return options;
        }

        if (options === true) {
            return new Cache();
        }

        return store[options]();
    };

    function serializeRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {
        var record,
            getter,
            originalName,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            for (getter in getters) {
                originalName = fieldNames[getter];

                if (originalName && originalName !== getter) {
                    record[originalName] = getters[getter](record);
                    delete record[getter];
                }
            }
        }
    }

    function convertRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {
        var record,
            getter,
            originalName,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            for (getter in getters) {
                record[getter] = modelInstance._parse(getter, getters[getter](record));

                originalName = fieldNames[getter];
                if (originalName && originalName !== getter) {
                    delete record[originalName];
                }
            }
        }
    }

    function convertGroup(data, getters, modelInstance, originalFieldNames, fieldNames) {
        var record,
            idx,
            fieldName,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];

            fieldName = originalFieldNames[record.field];
            if (fieldName && fieldName != record.field) {
                record.field = fieldName;
            }

            record.value = modelInstance._parse(record.field, record.value);

            if (record.hasSubgroups) {
                convertGroup(record.items, getters, modelInstance, originalFieldNames, fieldNames);
            } else {
                convertRecords(record.items, getters, modelInstance, originalFieldNames, fieldNames);
            }
        }
    }

    function wrapDataAccess(originalFunction, model, converter, getters, originalFieldNames, fieldNames) {
        return function(data) {
            data = originalFunction(data);

            if (data && !isEmptyObject(getters)) {
                if (toString.call(data) !== "[object Array]" && !(data instanceof ObservableArray)) {
                    data = [data];
                }

                converter(data, getters, new model(), originalFieldNames, fieldNames);
            }

            return data || [];
        };
    }

    var DataReader = Class.extend({
        init: function(schema) {
            var that = this, member, get, model, base;

            schema = schema || {};

            for (member in schema) {
                get = schema[member];

                that[member] = typeof get === STRING ? getter(get) : get;
            }

            base = schema.modelBase || Model;

            if (isPlainObject(that.model)) {
                that.model = model = base.define(that.model);
            }

            var dataFunction = proxy(that.data, that);

            that._dataAccessFunction = dataFunction;

            if (that.model) {
                var groupsFunction = proxy(that.groups, that),
                    serializeFunction = proxy(that.serialize, that),
                    originalFieldNames = {},
                    getters = {},
                    serializeGetters = {},
                    fieldNames = {},
                    shouldSerialize = false,
                    fieldName;

                model = that.model;

                if (model.fields) {
                    each(model.fields, function(field, value) {
                        var fromName;

                        fieldName = field;

                        if (isPlainObject(value) && value.field) {
                            fieldName = value.field;
                        } else if (typeof value === STRING) {
                            fieldName = value;
                        }

                        if (isPlainObject(value) && value.from) {
                            fromName = value.from;
                        }

                        shouldSerialize = shouldSerialize || (fromName && fromName !== field) || fieldName !== field;

                        getters[field] = getter(fromName || fieldName);
                        serializeGetters[field] = getter(field);
                        originalFieldNames[fromName || fieldName] = field;
                        fieldNames[field] = fromName || fieldName;
                    });

                    if (!schema.serialize && shouldSerialize) {
                        that.serialize = wrapDataAccess(serializeFunction, model, serializeRecords, serializeGetters, originalFieldNames, fieldNames);
                    }
                }

                that._dataAccessFunction = dataFunction;
                that.data = wrapDataAccess(dataFunction, model, convertRecords, getters, originalFieldNames, fieldNames);
                that.groups = wrapDataAccess(groupsFunction, model, convertGroup, getters, originalFieldNames, fieldNames);
            }
        },
        errors: function(data) {
            return data ? data.errors : null;
        },
        parse: identity,
        data: identity,
        total: function(data) {
            return data.length;
        },
        groups: identity,
        aggregates: function() {
            return {};
        },
        serialize: function(data) {
            return data;
        }
    });

    function mergeGroups(target, dest, skip, take) {
        var group,
            idx = 0,
            items;

        while (dest.length && take) {
            group = dest[idx];
            items = group.items;

            var length = items.length;

            if (target && target.field === group.field && target.value === group.value) {
                if (target.hasSubgroups && target.items.length) {
                    mergeGroups(target.items[target.items.length - 1], group.items, skip, take);
                } else {
                    items = items.slice(skip, skip + take);
                    target.items = target.items.concat(items);
                }
                dest.splice(idx--, 1);
            } else if (group.hasSubgroups && items.length) {
                mergeGroups(group, items, skip, take);
            } else {
                items = items.slice(skip, skip + take);
                group.items = items;

                if (!group.items.length) {
                    dest.splice(idx--, 1);
                }
            }

            if (items.length === 0) {
                skip -= length;
            } else {
                skip = 0;
                take -= items.length;
            }

            if (++idx >= dest.length) {
                break;
            }
        }

        if (idx < dest.length) {
            dest.splice(idx, dest.length - idx);
        }
    }

    function flattenGroups(data) {
        var idx,
            result = [],
            length,
            items,
            itemIndex;

        for (idx = 0, length = data.length; idx < length; idx++) {
            var group = data.at(idx);
            if (group.hasSubgroups) {
                result = result.concat(flattenGroups(group.items));
            } else {
                items = group.items;
                for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
                    result.push(items.at(itemIndex));
                }
            }
        }
        return result;
    }

    function wrapGroupItems(data, model) {
        var idx, length, group, items;
        if (model) {
            for (idx = 0, length = data.length; idx < length; idx++) {
                group = data.at(idx);

                if (group.hasSubgroups) {
                    wrapGroupItems(group.items, model);
                } else {
                    group.items = new LazyObservableArray(group.items, model);
                }
            }
        }
    }

    function eachGroupItems(data, func) {
        for (var idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                if (eachGroupItems(data[idx].items, func)) {
                    return true;
                }
            } else if (func(data[idx].items, data[idx])) {
                return true;
            }
        }
    }

    function replaceInRanges(ranges, data, item, observable) {
        for (var idx = 0; idx < ranges.length; idx++) {
            if (ranges[idx].data === data) {
                break;
            }
            if (replaceInRange(ranges[idx].data, item, observable)) {
                break;
            }
        }
    }

    function replaceInRange(items, item, observable) {
        for (var idx = 0, length = items.length; idx < length; idx++) {
            if (items[idx] && items[idx].hasSubgroups) {
                return replaceInRange(items[idx].items, item, observable);
            } else if (items[idx] === item || items[idx] === observable) {
               items[idx] = observable;
               return true;
            }
        }
    }

    function replaceWithObservable(view, data, ranges, type) {
        for (var viewIndex = 0, length = view.length; viewIndex < length; viewIndex++) {
            var item = view[viewIndex];

            if (!item || item instanceof type) {
                continue;
            }

            if (item.hasSubgroups !== undefined) {
                replaceWithObservable(item.items, data, ranges, type);
            } else {
                for (var idx = 0; idx < data.length; idx++) {
                    if (data[idx] === item) {
                        view[viewIndex] = data.at(idx);
                        replaceInRanges(ranges, data, item, view[viewIndex]);
                        break;
                    }
                }
            }
        }
    }

    function removeModel(data, model) {
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            var dataItem = data.at(idx);
            if (dataItem.uid == model.uid) {
                data.splice(idx, 1);
                return dataItem;
            }
        }
    }

    function wrapInEmptyGroup(groups, model) {
        var parent,
            group,
            idx,
            length;

        for (idx = groups.length-1, length = 0; idx >= length; idx--) {
            group = groups[idx];
            parent = {
                value: model.get(group.field),
                field: group.field,
                items: parent ? [parent] : [model],
                hasSubgroups: !!parent,
                aggregates: {}
            };
        }

        return parent;
    }

    function indexOfPristineModel(data, model) {
        if (model) {
            return indexOf(data, function(item) {
                if (item.uid) {
                    return item.uid == model.uid;
                }

                return item[model.idField] === model.id;
            });
        }
        return -1;
    }

    function indexOfModel(data, model) {
        if (model) {
            return indexOf(data, function(item) {
                return item.uid == model.uid;
            });
        }
        return -1;
    }

    function indexOf(data, comparer) {
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (comparer(data[idx])) {
                return idx;
            }
        }

        return -1;
    }

    function fieldNameFromModel(fields, name) {
        if (fields && !isEmptyObject(fields)) {
            var descriptor = fields[name];
            var fieldName;
            if (isPlainObject(descriptor)) {
                fieldName = descriptor.from || descriptor.field || name;
            } else {
                fieldName = fields[name] || name;
            }

            if (isFunction(fieldName)) {
                return name;
            }

            return fieldName;
        }
        return name;
    }

    function convertFilterDescriptorsField(descriptor, model) {
        var idx,
            length,
            target = {};

        for (var field in descriptor) {
            if (field !== "filters") {
                target[field] = descriptor[field];
            }
        }

        if (descriptor.filters) {
            target.filters = [];
            for (idx = 0, length = descriptor.filters.length; idx < length; idx++) {
                target.filters[idx] = convertFilterDescriptorsField(descriptor.filters[idx], model);
            }
        } else {
            target.field = fieldNameFromModel(model.fields, target.field);
        }
        return target;
    }

    function convertDescriptorsField(descriptors, model) {
        var idx,
            length,
            result = [],
            target,
            descriptor;

        for (idx = 0, length = descriptors.length; idx < length; idx ++) {
            target = {};

            descriptor = descriptors[idx];

            for (var field in descriptor) {
                target[field] = descriptor[field];
            }

            target.field = fieldNameFromModel(model.fields, target.field);

            if (target.aggregates && isArray(target.aggregates)) {
                target.aggregates = convertDescriptorsField(target.aggregates, model);
            }
            result.push(target);
        }
        return result;
    }

    var DataSource = Observable.extend({
        init: function(options) {
            var that = this, model, data;

            if (options) {
                data = options.data;
            }

            options = that.options = extend({}, that.options, options);

            that._map = {};
            that._prefetch = {};
            that._data = [];
            that._pristineData = [];
            that._ranges = [];
            that._view = [];
            that._pristineTotal = 0;
            that._destroyed = [];
            that._pageSize = options.pageSize;
            that._page = options.page  || (options.pageSize ? 1 : undefined);
            that._sort = normalizeSort(options.sort);
            that._filter = normalizeFilter(options.filter);
            that._group = normalizeGroup(options.group);
            that._aggregate = options.aggregate;
            that._total = options.total;

            that._shouldDetachObservableParents = true;

            Observable.fn.init.call(that);

            that.transport = Transport.create(options, data);

            if (isFunction(that.transport.push)) {
                that.transport.push({
                    pushCreate: proxy(that._pushCreate, that),
                    pushUpdate: proxy(that._pushUpdate, that),
                    pushDestroy: proxy(that._pushDestroy, that)
                });
            }

            if (options.offlineStorage != null) {
                if (typeof options.offlineStorage == "string") {
                    var key = options.offlineStorage;

                    that._storage = {
                        getItem: function() {
                            return JSON.parse(localStorage.getItem(key));
                        },
                        setItem: function(item) {
                            localStorage.setItem(key, stringify(item));
                        }
                    };
                } else {
                    that._storage = options.offlineStorage;
                }
            }

            that.reader = new kendo.data.readers[options.schema.type || "json" ](options.schema);

            model = that.reader.model || {};

            that._detachObservableParents();

            that._data = that._observe(that._data);
            that._online = true;

            that.bind(["push", ERROR, CHANGE, REQUESTSTART, SYNC, REQUESTEND, PROGRESS], options);
        },

        options: {
            data: null,
            schema: {
               modelBase: Model
            },
            offlineStorage: null,
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            serverGrouping: false,
            serverAggregates: false,
            batch: false
        },

        online: function(value) {
            if (value !== undefined) {
                if (this._online != value) {
                    this._online = value;

                    if (value) {
                        this.sync();
                    }
                }
            } else {
                return this._online;
            }
        },

        offlineData: function(state) {
            if (this.options.offlineStorage == null) {
                return null;
            }

            if (state !== undefined) {
                return this._storage.setItem(state);
            }

            return this._storage.getItem() || {};
        },

        _isServerGrouped: function() {
            var group = this.group() || [];

            return this.options.serverGrouping && group.length;
        },

        _pushCreate: function(result) {
            this._push(result, "pushCreate");
        },

        _pushUpdate: function(result) {
            this._push(result, "pushUpdate");
        },

        _pushDestroy: function(result) {
            this._push(result, "pushDestroy");
        },

        _push: function(result, operation) {
            var data = this._readData(result);

            if (!data) {
                data = result;
            }

            this[operation](data);
        },

        _flatData: function(data, skip) {
            if (data) {
                if (this._isServerGrouped()) {
                    return flattenGroups(data);
                }

                if (!skip) {
                    for (var idx = 0; idx < data.length; idx++) {
                        data.at(idx);
                    }
                }
            }

            return data;
        },

        parent: noop,

        get: function(id) {
            var idx, length, data = this._flatData(this._data);

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].id == id) {
                    return data[idx];
                }
            }
        },

        getByUid: function(id) {
            var idx, length, data = this._flatData(this._data);

            if (!data) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].uid == id) {
                    return data[idx];
                }
            }
        },

        indexOf: function(model) {
            return indexOfModel(this._data, model);
        },

        at: function(index) {
            return this._data.at(index);
        },

        data: function(value) {
            var that = this;
            if (value !== undefined) {
                that._detachObservableParents();
                that._data = this._observe(value);

                that._pristineData = value.slice(0);

                that._storeData();

                that._ranges = [];
                that.trigger("reset");
                that._addRange(that._data);

                that._total = that._data.length;
                that._pristineTotal = that._total;

                that._process(that._data);
            } else {
                if (that._data) {
                    for (var idx = 0; idx < that._data.length; idx++) {
                        that._data.at(idx);
                    }
                }

                return that._data;
            }
        },

        view: function(value) {
            if (value === undefined) {
                return this._view;
            } else {
                this._view = this._observeView(value);
            }
        },

        _observeView: function(data) {
            replaceWithObservable(data, this._data, this._ranges, this.reader.model || ObservableObject);

            return new LazyObservableArray(data, this.reader.model);
        },

        flatView: function() {
            var groups = this.group() || [];

            if (groups.length) {
                return flattenGroups(this._view);
            } else {
                return this._view;
            }
        },

        add: function(model) {
            return this.insert(this._data.length, model);
        },

        _createNewModel: function(model) {
            if (this.reader.model) {
                return new this.reader.model(model);
            }

            if (model instanceof ObservableObject) {
                return model;
            }

            return new ObservableObject(model);
        },

        insert: function(index, model) {
            if (!model) {
                model = index;
                index = 0;
            }

            if (!(model instanceof Model)) {
                model = this._createNewModel(model);
            }

            if (this._isServerGrouped()) {
                this._data.splice(index, 0, wrapInEmptyGroup(this.group(), model));
            } else {
                this._data.splice(index, 0, model);
            }

            return model;
        },

        pushCreate: function(items) {
            if (!isArray(items)) {
                items = [items];
            }

            var pushed = [];
            var autoSync = this.options.autoSync;
            this.options.autoSync = false;

            try {
                for (var idx = 0; idx < items.length; idx ++) {
                    var item = items[idx];

                    var result = this.add(item);

                    pushed.push(result);

                    var pristine = result.toJSON();

                    if (this._isServerGrouped()) {
                        pristine = wrapInEmptyGroup(this.group(), pristine);
                    }

                    this._pristineData.push(pristine);
                }
            } finally {
                this.options.autoSync = autoSync;
            }

            if (pushed.length) {
                this.trigger("push", {
                    type: "create",
                    items: pushed
                });
            }
        },

        pushUpdate: function(items) {
            if (!isArray(items)) {
                items = [items];
            }

            var pushed = [];

            for (var idx = 0; idx < items.length; idx ++) {
                var item = items[idx];
                var model = this._createNewModel(item);

                var target = this.get(model.id);

                if (target) {
                    pushed.push(target);

                    target.accept(item);

                    target.trigger("change");

                    this._updatePristineForModel(target, item);
                } else {
                    this.pushCreate(item);
                }
            }

            if (pushed.length) {
                this.trigger("push", {
                    type: "update",
                    items: pushed
                });
            }
        },

        pushDestroy: function(items) {
            var pushed = this._removeItems(items);

            if (pushed.length) {
                this.trigger("push", {
                    type: "destroy",
                    items: pushed
                });
            }
        },

        _removeItems: function(items) {
            if (!isArray(items)) {
                items = [items];
            }

            var destroyed = [];
            var autoSync = this.options.autoSync;
            this.options.autoSync = false;
            try {
                for (var idx = 0; idx < items.length; idx ++) {
                    var item = items[idx];
                    var model = this._createNewModel(item);
                    var found = false;

                    this._eachItem(this._data, function(items){
                        for (var idx = 0; idx < items.length; idx++) {
                            var item = items.at(idx);
                            if (item.id === model.id) {
                                destroyed.push(item);
                                items.splice(idx, 1);
                                found = true;
                                break;
                            }
                        }
                    });

                    if (found) {
                        this._removePristineForModel(model);
                        this._destroyed.pop();
                    }
                }
            } finally {
                this.options.autoSync = autoSync;
            }

            return destroyed;
        },

        remove: function(model) {
            var result,
                that = this,
                hasGroups = that._isServerGrouped();

            this._eachItem(that._data, function(items) {
                result = removeModel(items, model);
                if (result && hasGroups) {
                    if (!result.isNew || !result.isNew()) {
                        that._destroyed.push(result);
                    }
                    return true;
                }
            });

            this._removeModelFromRanges(model);

            this._updateRangesLength();

            return model;
        },

        sync: function() {
            var that = this,
                idx,
                length,
                created = [],
                updated = [],
                destroyed = that._destroyed,
                data = that._flatData(that._data);
            var promise;

            if (that.online()) {

                if (!that.reader.model) {
                    return;
                }

                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (data[idx].isNew()) {
                        created.push(data[idx]);
                    } else if (data[idx].dirty) {
                        updated.push(data[idx]);
                    }
                }

                var promises = [];
                promises.push.apply(promises, that._send("create", created));
                promises.push.apply(promises, that._send("update", updated));
                promises.push.apply(promises, that._send("destroy", destroyed));

                promise = $.when
                 .apply(null, promises)
                 .then(function() {
                    var idx, length;

                    for (idx = 0, length = arguments.length; idx < length; idx++){
                        that._accept(arguments[idx]);
                    }

                    that._storeData(true);

                    that._change({ action: "sync" });

                    that.trigger(SYNC);
                });
            } else {
                that._storeData(true);

                that._change({ action: "sync" });

                promise = $.Deferred().resolve().promise();
            }

            return promise;
        },

        cancelChanges: function(model) {
            var that = this;

            if (model instanceof kendo.data.Model) {
                that._cancelModel(model);
            } else {
                that._destroyed = [];
                that._detachObservableParents();
                that._data = that._observe(that._pristineData);
                if (that.options.serverPaging) {
                    that._total = that._pristineTotal;
                }
                that._change();
            }
        },

        hasChanges: function() {
            var idx,
                length,
                data = this._data;

            if (this._destroyed.length) {
                return true;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                if ((data[idx].isNew && data[idx].isNew()) || data[idx].dirty) {
                    return true;
                }
            }

            return false;
        },

        _accept: function(result) {
            var that = this,
                models = result.models,
                response = result.response,
                idx = 0,
                serverGroup = that._isServerGrouped(),
                pristine = that._pristineData,
                type = result.type,
                length;

            that.trigger(REQUESTEND, { response: response, type: type });

            if (response && !isEmptyObject(response)) {
                response = that.reader.parse(response);

                if (that._handleCustomErrors(response)) {
                    return;
                }

                response = that.reader.data(response);

                if (!isArray(response)) {
                    response = [response];
                }
            } else {
                response = $.map(models, function(model) { return model.toJSON(); } );
            }

            if (type === "destroy") {
                that._destroyed = [];
            }

            for (idx = 0, length = models.length; idx < length; idx++) {
                if (type !== "destroy") {
                    models[idx].accept(response[idx]);

                    if (type === "create") {
                        pristine.push(serverGroup ? wrapInEmptyGroup(that.group(), models[idx]) : response[idx]);
                    } else if (type === "update") {
                        that._updatePristineForModel(models[idx], response[idx]);
                    }
                } else {
                    that._removePristineForModel(models[idx]);
                }
            }
        },

        _updatePristineForModel: function(model, values) {
            this._executeOnPristineForModel(model, function(index, items) {
                kendo.deepExtend(items[index], values);
            });
        },

        _executeOnPristineForModel: function(model, callback) {
            this._eachPristineItem(
                function(items) {
                    var index = indexOfPristineModel(items, model);
                    if (index > -1) {
                        callback(index, items);
                        return true;
                    }
                });
        },

        _removePristineForModel: function(model) {
            this._executeOnPristineForModel(model, function(index, items) {
                items.splice(index, 1);
            });
        },

        _readData: function(data) {
            var read = !this._isServerGrouped() ? this.reader.data : this.reader.groups;
            return read.call(this.reader, data);
        },

        _eachPristineItem: function(callback) {
            this._eachItem(this._pristineData, callback);
        },

       _eachItem: function(data, callback) {
            if (data && data.length) {
                if (this._isServerGrouped()) {
                    eachGroupItems(data, callback);
                } else {
                    callback(data);
                }
            }
        },

        _pristineForModel: function(model) {
            var pristine,
                idx,
                callback = function(items) {
                    idx = indexOfPristineModel(items, model);
                    if (idx > -1) {
                        pristine = items[idx];
                        return true;
                    }
                };

            this._eachPristineItem(callback);

            return pristine;
        },

        _cancelModel: function(model) {
            var pristine = this._pristineForModel(model);

            this._eachItem(this._data, function(items) {
                var idx = indexOfModel(items, model);
                if (idx >= 0) {
                    if (pristine && (!model.isNew() || pristine.__state__)) {
                        items[idx].accept(pristine);
                    } else {
                        items.splice(idx, 1);
                    }
                }
            });
        },

        _promise: function(data, models, type) {
            var that = this;

            return $.Deferred(function(deferred) {
                that.trigger(REQUESTSTART, { type: type });

                that.transport[type].call(that.transport, extend({
                    success: function(response) {
                        deferred.resolve({
                            response: response,
                            models: models,
                            type: type
                        });
                    },
                    error: function(response, status, error) {
                        deferred.reject(response);
                        that.error(response, status, error);
                    }
                }, data));
            }).promise();
        },

        _send: function(method, data) {
            var that = this,
                idx,
                length,
                promises = [],
                converted = that.reader.serialize(toJSON(data));

            if (that.options.batch) {
                if (data.length) {
                    promises.push(that._promise( { data: { models: converted } }, data , method));
                }
            } else {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    promises.push(that._promise( { data: converted[idx] }, [ data[idx] ], method));
                }
            }

            return promises;
        },

        read: function(data) {
            var that = this, params = that._params(data);
            var deferred = $.Deferred();

            that._queueRequest(params, function() {
                var isPrevented = that.trigger(REQUESTSTART, { type: "read" });
                if (!isPrevented) {
                    that.trigger(PROGRESS);

                    that._ranges = [];
                    that.trigger("reset");
                    if (that.online()) {
                        that.transport.read({
                            data: params,
                            success: function(data) {
                                that.success(data);

                                deferred.resolve();
                            },
                            error: function() {
                                var args = slice.call(arguments);

                                that.error.apply(that, args);

                                deferred.reject.apply(deferred, args);
                            }
                        });
                    } else if (that.options.offlineStorage != null){
                        that.success(that.offlineData());

                        deferred.resolve();
                    }
                } else {
                    that._dequeueRequest();

                    deferred.resolve(isPrevented);
                }
            });

            return deferred.promise();
        },

        _readAggregates: function(data) {
            return this.reader.aggregates(data);
        },

        success: function(data) {
            var that = this,
                options = that.options;

            that.trigger(REQUESTEND, { response: data, type: "read" });

            if (that.online()) {
                data = that.reader.parse(data);

                if (that._handleCustomErrors(data)) {
                    that._dequeueRequest();
                    return;
                }

                that._total = that.reader.total(data);

                if (that._aggregate && options.serverAggregates) {
                    that._aggregateResult = that._readAggregates(data);
                }

                data = that._readData(data);
            } else {
                data = that._readData(data);

                var items = [];

                for (var idx = 0; idx < data.length; idx++) {
                    var item = data[idx];
                    var state = item.__state__;

                    if (state == "destroy") {
                       this._destroyed.push(this._createNewModel(item));
                    } else {
                        items.push(item);
                    }
                }

                data = items;

                that._total = data.length;
            }

            that._pristineTotal = that._total;

            that._pristineData = data.slice(0);

            that._detachObservableParents();

            that._data = that._observe(data);

            if (that.options.offlineStorage != null) {
                that._eachItem(that._data, function(items) {
                    for (var idx = 0; idx < items.length; idx++) {
                        var item = items.at(idx);
                        if (item.__state__ == "update") {
                            item.dirty = true;
                        }
                    }
                });
            }

            that._storeData();

            that._addRange(that._data);

            that._process(that._data);

            that._dequeueRequest();
        },

        _detachObservableParents: function() {
            if (this._data && this._shouldDetachObservableParents) {
                for (var idx = 0; idx < this._data.length; idx++) {
                    if (this._data[idx].parent) {
                        this._data[idx].parent = noop;
                    }
                }
            }
        },

        _storeData: function(updatePristine) {
            var serverGrouping = this._isServerGrouped();
            var model = this.reader.model;

            function items(data) {
                var state = [];

                for (var idx = 0; idx < data.length; idx++) {
                    var dataItem = data.at(idx);
                    var item = dataItem.toJSON();

                    if (serverGrouping && dataItem.items) {
                        item.items = items(dataItem.items);
                    } else {
                        item.uid = dataItem.uid;

                        if (model) {
                            if (dataItem.isNew()) {
                                item.__state__ = "create";
                            } else if (dataItem.dirty) {
                                item.__state__ = "update";
                            }
                        }
                    }
                    state.push(item);
                }

                return state;
            }

            if (this.options.offlineStorage != null) {
                var state = items(this._data);

                for (var idx = 0; idx < this._destroyed.length; idx++) {
                    var item = this._destroyed[idx].toJSON();
                    item.__state__ = "destroy";
                    state.push(item);
                }

                this.offlineData(state);

                if (updatePristine) {
                    this._pristineData = state;
                }
            }
        },

        _addRange: function(data) {
            var that = this,
                start = that._skip || 0,
                end = start + that._flatData(data, true).length;

            that._ranges.push({ start: start, end: end, data: data });
            that._ranges.sort( function(x, y) { return x.start - y.start; } );
        },

        error: function(xhr, status, errorThrown) {
            this._dequeueRequest();
            this.trigger(REQUESTEND, { xhr: xhr, status: status, errorThrown: errorThrown });
            this.trigger(ERROR, { xhr: xhr, status: status, errorThrown: errorThrown });
        },

        _params: function(data) {
            var that = this,
                options =  extend({
                    take: that.take(),
                    skip: that.skip(),
                    page: that.page(),
                    pageSize: that.pageSize(),
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                }, data);

            if (!that.options.serverPaging) {
                delete options.take;
                delete options.skip;
                delete options.page;
                delete options.pageSize;
            }

            if (!that.options.serverGrouping) {
                delete options.group;
            } else if (that.reader.model && options.group) {
                options.group = convertDescriptorsField(options.group, that.reader.model);
            }

            if (!that.options.serverFiltering) {
                delete options.filter;
            } else if (that.reader.model && options.filter) {
               options.filter = convertFilterDescriptorsField(options.filter, that.reader.model);
            }

            if (!that.options.serverSorting) {
                delete options.sort;
            } else if (that.reader.model && options.sort) {
                options.sort = convertDescriptorsField(options.sort, that.reader.model);
            }

            if (!that.options.serverAggregates) {
                delete options.aggregate;
            } else if (that.reader.model && options.aggregate) {
                options.aggregate = convertDescriptorsField(options.aggregate, that.reader.model);
            }

            return options;
        },

        _queueRequest: function(options, callback) {
            var that = this;
            if (!that._requestInProgress) {
                that._requestInProgress = true;
                that._pending = undefined;
                callback();
            } else {
                that._pending = { callback: proxy(callback, that), options: options };
            }
        },

        _dequeueRequest: function() {
            var that = this;
            that._requestInProgress = false;
            if (that._pending) {
                that._queueRequest(that._pending.options, that._pending.callback);
            }
        },

        _handleCustomErrors: function(response) {
            if (this.reader.errors) {
                var errors = this.reader.errors(response);
                if (errors) {
                    this.trigger(ERROR, { xhr: null, status: "customerror", errorThrown: "custom error", errors: errors });
                    return true;
                }
            }
            return false;
        },

        _observe: function(data) {
            var that = this,
                model = that.reader.model,
                wrap = false;

            that._shouldDetachObservableParents = true;

            if (model && data.length) {
                wrap = !(data[0] instanceof model);
            }

            if (data instanceof ObservableArray) {
                that._shouldDetachObservableParents = false;
                if (wrap) {
                    data.type = that.reader.model;
                    data.wrapAll(data, data);
                }
            } else {
                var arrayType = that.pageSize() ? LazyObservableArray : ObservableArray;
                data = new arrayType(data, that.reader.model);
                data.parent = function() { return that.parent(); };
            }

            if (that._isServerGrouped()) {
                wrapGroupItems(data, model);
            }

            if (that._changeHandler && that._data && that._data instanceof ObservableArray) {
                that._data.unbind(CHANGE, that._changeHandler);
            } else {
                that._changeHandler = proxy(that._change, that);
            }

            return data.bind(CHANGE, that._changeHandler);
        },

        _change: function(e) {
            var that = this, idx, length, action = e ? e.action : "";

            if (action === "remove") {
                for (idx = 0, length = e.items.length; idx < length; idx++) {
                    if (!e.items[idx].isNew || !e.items[idx].isNew()) {
                        that._destroyed.push(e.items[idx]);
                    }
                }
            }

            if (that.options.autoSync && (action === "add" || action === "remove" || action === "itemchange")) {
                that.sync();
            } else {
                var total = parseInt(that._total, 10);
                if (!isNumber(that._total)) {
                    total = parseInt(that._pristineTotal, 10);
                }
                if (action === "add") {
                    total += e.items.length;
                } else if (action === "remove") {
                    total -= e.items.length;
                } else if (action !== "itemchange" && action !== "sync" && !that.options.serverPaging) {
                    total = that._pristineTotal;
                } else if (action === "sync") {
                    total = that._pristineTotal = parseInt(that._total, 10);
                }

                that._total = total;

                that._process(that._data, e);
            }
        },

        _calculateAggregates: function (data, options) {
            options = options || {};

            var query = new Query(data),
                aggregates = options.aggregate,
                filter = options.filter;

            if (filter) {
                query = query.filter(filter);
            }

            return query.aggregate(aggregates);
        },

        _process: function (data, e) {
            var that = this,
                options = {},
                result;

            if (that.options.serverPaging !== true) {
                options.skip = that._skip;
                options.take = that._take || that._pageSize;

                if(options.skip === undefined && that._page !== undefined && that._pageSize !== undefined) {
                    options.skip = (that._page - 1) * that._pageSize;
                }
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
                options.aggregate = that._aggregate;
                that._aggregateResult = that._calculateAggregates(data, options);
            }

            result = that._queryProcess(data, options);

            that.view(result.data);

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            e = e || {};

            e.items = e.items || that._view;

            that.trigger(CHANGE, e);
        },

        _queryProcess: function(data, options) {
            return Query.process(data, options);
        },

        _mergeState: function(options) {
            var that = this;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregate = options.aggregate;
                that._skip = options.skip;
                that._take = options.take;

                if(that._skip === undefined) {
                    that._skip = that.skip();
                    options.skip = that.skip();
                }

                if(that._take === undefined && that._pageSize !== undefined) {
                    that._take = that._pageSize;
                    options.take = that._take;
                }

                if (options.sort) {
                    that._sort = options.sort = normalizeSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = normalizeFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = normalizeGroup(options.group);
                }
                if (options.aggregate) {
                    that._aggregate = options.aggregate = normalizeAggregate(options.aggregate);
                }
            }
            return options;
        },

        query: function(options) {
            var result;
            var remote = this.options.serverSorting || this.options.serverPaging || this.options.serverFiltering || this.options.serverGrouping || this.options.serverAggregates;

            if (remote || ((this._data === undefined || this._data.length === 0) && !this._destroyed.length)) {
                return this.read(this._mergeState(options));
            }

            var isPrevented = this.trigger(REQUESTSTART, { type: "read" });
            if (!isPrevented) {
                this.trigger(PROGRESS);

                result = this._queryProcess(this._data, this._mergeState(options));

                if (!this.options.serverFiltering) {
                    if (result.total !== undefined) {
                        this._total = result.total;
                    } else {
                        this._total = this._data.length;
                    }
                }

                this._aggregateResult = this._calculateAggregates(this._data, options);
                this.view(result.data);
                this.trigger(REQUESTEND, { });
                this.trigger(CHANGE, { items: result.data });
            }

            return $.Deferred().resolve(isPrevented).promise();
        },

        fetch: function(callback) {
            var that = this;
            var fn = function(isPrevented) {
                if (isPrevented !== true && isFunction(callback)) {
                    callback.call(that);
                }
            };

            return this._query().then(fn);
        },

        _query: function(options) {
            var that = this;

            return that.query(extend({}, {
                page: that.page(),
                pageSize: that.pageSize(),
                sort: that.sort(),
                filter: that.filter(),
                group: that.group(),
                aggregate: that.aggregate()
            }, options));
        },

        next: function(options) {
            var that = this,
                page = that.page(),
                total = that.total();

            options = options || {};

            if (!page || (total && page + 1 > that.totalPages())) {
                return;
            }

            that._skip = page * that.take();

            page += 1;
            options.page = page;

            that._query(options);

            return page;
        },

        prev: function(options) {
            var that = this,
                page = that.page();

            options = options || {};

            if (!page || page === 1) {
                return;
            }

            that._skip = that._skip - that.take();

            page -= 1;
            options.page = page;

            that._query(options);

            return page;
        },

        page: function(val) {
            var that = this,
            skip;

            if(val !== undefined) {
                val = math.max(math.min(math.max(val, 1), that.totalPages()), 1);
                that._query({ page: val });
                return;
            }
            skip = that.skip();

            return skip !== undefined ? math.round((skip || 0) / (that.take() || 1)) + 1 : undefined;
        },

        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ pageSize: val, page: 1 });
                return;
            }

            return that.take();
        },

        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ sort: val });
                return;
            }

            return that._sort;
        },

        filter: function(val) {
            var that = this;

            if (val === undefined) {
                return that._filter;
            }

            that._query({ filter: val, page: 1 });
        },

        group: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ group: val });
                return;
            }

            return that._group;
        },

        total: function() {
            return parseInt(this._total || 0, 10);
        },

        aggregate: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ aggregate: val });
                return;
            }

            return that._aggregate;
        },

        aggregates: function() {
            return this._aggregateResult;
        },

        totalPages: function() {
            var that = this,
            pageSize = that.pageSize() || that.total();

            return math.ceil((that.total() || 0) / pageSize);
        },

        inRange: function(skip, take) {
            var that = this,
                end = math.min(skip + take, that.total());

            if (!that.options.serverPaging && that._data.length > 0) {
                return true;
            }

            return that._findRange(skip, end).length > 0;
        },

        lastRange: function() {
            var ranges = this._ranges;
            return ranges[ranges.length - 1] || { start: 0, end: 0, data: [] };
        },

        firstItemUid: function() {
            var ranges = this._ranges;
            return ranges.length && ranges[0].data.length && ranges[0].data[0].uid;
        },

        enableRequestsInProgress: function() {
            this._skipRequestsInProgress = false;
        },

        range: function(skip, take) {
            skip = math.min(skip || 0, this.total());

            var that = this,
                pageSkip = math.max(math.floor(skip / take), 0) * take,
                size = math.min(pageSkip + take, that.total()),
                data;

            that._skipRequestsInProgress = false;

            data = that._findRange(skip, math.min(skip + take, that.total()));

            if (data.length) {

                that._skipRequestsInProgress = true;
                that._pending = undefined;

                that._skip = skip > that.skip() ? math.min(size, (that.totalPages() - 1) * that.take()) : pageSkip;

                that._take = take;

                var paging = that.options.serverPaging;
                var sorting = that.options.serverSorting;
                var filtering = that.options.serverFiltering;
                var aggregates = that.options.serverAggregates;
                try {
                    that.options.serverPaging = true;
                    if (!that._isServerGrouped() && !(that.group() && that.group().length)) {
                        that.options.serverSorting = true;
                    }
                    that.options.serverFiltering = true;
                    that.options.serverPaging = true;
                    that.options.serverAggregates = true;

                    if (paging) {
                        that._detachObservableParents();
                        that._data = data = that._observe(data);
                    }
                    that._process(data);
                } finally {
                    that.options.serverPaging = paging;
                    that.options.serverSorting = sorting;
                    that.options.serverFiltering = filtering;
                    that.options.serverAggregates = aggregates;
                }

                return;
            }

            if (take !== undefined) {
                if (!that._rangeExists(pageSkip, size)) {
                    that.prefetch(pageSkip, take, function() {
                        if (skip > pageSkip && size < that.total() && !that._rangeExists(size, math.min(size + take, that.total()))) {
                            that.prefetch(size, take, function() {
                                that.range(skip, take);
                            });
                        } else {
                            that.range(skip, take);
                        }
                    });
                } else if (pageSkip < skip) {
                    that.prefetch(size, take, function() {
                        that.range(skip, take);
                    });
                }
            }
        },

        _findRange: function(start, end) {
            var that = this,
                ranges = that._ranges,
                range,
                data = [],
                skipIdx,
                takeIdx,
                startIndex,
                endIndex,
                rangeData,
                rangeEnd,
                processed,
                options = that.options,
                remote = options.serverSorting || options.serverPaging || options.serverFiltering || options.serverGrouping || options.serverAggregates,
                flatData,
                count,
                length;

            for (skipIdx = 0, length = ranges.length; skipIdx < length; skipIdx++) {
                range = ranges[skipIdx];
                if (start >= range.start && start <= range.end) {
                    count = 0;

                    for (takeIdx = skipIdx; takeIdx < length; takeIdx++) {
                        range = ranges[takeIdx];
                        flatData = that._flatData(range.data, true);

                        if (flatData.length && start + count >= range.start) {
                            rangeData = range.data;
                            rangeEnd = range.end;

                            if (!remote) {
                                var sort = normalizeGroup(that.group() || []).concat(normalizeSort(that.sort() || []));
                                processed = that._queryProcess(range.data, { sort: sort, filter: that.filter() });
                                flatData = rangeData = processed.data;

                                if (processed.total !== undefined) {
                                    rangeEnd = processed.total;
                                }
                            }

                            startIndex = 0;
                            if (start + count > range.start) {
                                startIndex = (start + count) - range.start;
                            }
                            endIndex = flatData.length;
                            if (rangeEnd > end) {
                                endIndex = endIndex - (rangeEnd - end);
                            }
                            count += endIndex - startIndex;
                            data = that._mergeGroups(data, rangeData, startIndex, endIndex);

                            if (end <= range.end && count == end - start) {
                                return data;
                            }
                        }
                    }
                    break;
                }
            }
            return [];
        },

        _mergeGroups: function(data, range, skip, take) {
            if (this._isServerGrouped()) {
                var temp = range.toJSON(),
                    prevGroup;

                if (data.length) {
                    prevGroup = data[data.length - 1];
                }

                mergeGroups(prevGroup, temp, skip, take);

                return data.concat(temp);
            }
            return data.concat(range.slice(skip, take));
        },

        skip: function() {
            var that = this;

            if (that._skip === undefined) {
                return (that._page !== undefined ? (that._page  - 1) * (that.take() || 1) : undefined);
            }
            return that._skip;
        },

        take: function() {
            return this._take || this._pageSize;
        },

        _prefetchSuccessHandler: function (skip, size, callback) {
            var that = this;

            return function(data) {
                var found = false,
                    range = { start: skip, end: size, data: [] },
                    idx,
                    length,
                    temp;

                that._dequeueRequest();

                that.trigger(REQUESTEND, { response: data, type: "read" });

                data = that.reader.parse(data);

                temp = that._readData(data);

                if (temp.length) {
                    for (idx = 0, length = that._ranges.length; idx < length; idx++) {
                        if (that._ranges[idx].start === skip) {
                            found = true;
                            range = that._ranges[idx];
                            break;
                        }
                    }
                    if (!found) {
                        that._ranges.push(range);
                    }
                }

                range.data = that._observe(temp);
                range.end = range.start + that._flatData(range.data, true).length;
                that._ranges.sort( function(x, y) { return x.start - y.start; } );
                that._total = that.reader.total(data);

                if (!that._skipRequestsInProgress) {
                    if (callback && temp.length) {
                        callback();
                    } else {
                        that.trigger(CHANGE, {});
                    }
                }
            };
        },

        prefetch: function(skip, take, callback) {
            var that = this,
                size = math.min(skip + take, that.total()),
                options = {
                    take: take,
                    skip: skip,
                    page: skip / take + 1,
                    pageSize: take,
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                };

            if (!that._rangeExists(skip, size)) {
                clearTimeout(that._timeout);

                that._timeout = setTimeout(function() {
                    that._queueRequest(options, function() {
                        if (!that.trigger(REQUESTSTART, { type: "read" })) {
                            that.transport.read({
                                data: that._params(options),
                                success: that._prefetchSuccessHandler(skip, size, callback)
                            });
                        } else {
                            that._dequeueRequest();
                        }
                    });
                }, 100);
            } else if (callback) {
                callback();
            }
        },

        _rangeExists: function(start, end) {
            var that = this,
                ranges = that._ranges,
                idx,
                length;

            for (idx = 0, length = ranges.length; idx < length; idx++) {
                if (ranges[idx].start <= start && ranges[idx].end >= end) {
                    return true;
                }
            }
            return false;
        },

        _removeModelFromRanges: function(model) {
            var result,
                found,
                range;

            for (var idx = 0, length = this._ranges.length; idx < length; idx++) {
                range = this._ranges[idx];

                this._eachItem(range.data, function(items) {
                    result = removeModel(items, model);
                    if (result) {
                        found = true;
                    }
                });

                if (found) {
                    break;
                }
            }
        },

        _updateRangesLength: function() {
            var startOffset = 0,
                range,
                rangeLength;

            for (var idx = 0, length = this._ranges.length; idx < length; idx++) {
                range = this._ranges[idx];
                range.start = range.start - startOffset;

                rangeLength = this._flatData(range.data, true).length;
                startOffset = range.end - rangeLength;
                range.end = range.start + rangeLength;
            }
        }
    });

    var Transport = {};

    Transport.create = function(options, data) {
        var transport,
            transportOptions = options.transport;

        if (transportOptions) {
            transportOptions.read = typeof transportOptions.read === STRING ? { url: transportOptions.read } : transportOptions.read;

            if (options.type) {
                kendo.data.transports = kendo.data.transports || {};
                kendo.data.schemas = kendo.data.schemas || {};

                if (kendo.data.transports[options.type] && !isPlainObject(kendo.data.transports[options.type])) {
                    transport = new kendo.data.transports[options.type](extend(transportOptions, { data: data }));
                } else {
                    transportOptions = extend(true, {}, kendo.data.transports[options.type], transportOptions);
                }

                options.schema = extend(true, {}, kendo.data.schemas[options.type], options.schema);
            }

            if (!transport) {
                transport = isFunction(transportOptions.read) ? transportOptions : new RemoteTransport(transportOptions);
            }
        } else {
            transport = new LocalTransport({ data: options.data || [] });
        }
        return transport;
    };

    DataSource.create = function(options) {
        if (isArray(options) || options instanceof ObservableArray) {
           options = { data: options };
        }

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            table = dataSource.table,
            select = dataSource.select,
            idx,
            length,
            model = {},
            field;

        if (!data && fields && !dataSource.transport) {
            if (table) {
                data = inferTable(table, fields);
            } else if (select) {
                data = inferSelect(select, fields);
            }
        }

        if (kendo.data.Model && fields && (!dataSource.schema || !dataSource.schema.model)) {
            for (idx = 0, length = fields.length; idx < length; idx++) {
                field = fields[idx];
                if (field.type) {
                    model[field.field] = field;
                }
            }

            if (!isEmptyObject(model)) {
                dataSource.schema = extend(true, dataSource.schema, { model:  { fields: model } });
            }
        }

        dataSource.data = data;
        table = null;
        dataSource.table = null;

        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    };

    function inferSelect(select, fields) {
        var options = $(select)[0].children,
            idx,
            length,
            data = [],
            record,
            firstField = fields[0],
            secondField = fields[1],
            value,
            option;

        for (idx = 0, length = options.length; idx < length; idx++) {
            record = {};
            option = options[idx];

            if (option.disabled) {
                continue;
            }

            record[firstField.field] = option.text;

            value = option.attributes.value;

            if (value && value.specified) {
                value = option.value;
            } else {
                value = option.text;
            }

            record[secondField.field] = value;

            data.push(record);
        }

        return data;
    }

    function inferTable(table, fields) {
        var tbody = $(table)[0].tBodies[0],
        rows = tbody ? tbody.rows : [],
        idx,
        length,
        fieldIndex,
        fieldCount = fields.length,
        data = [],
        cells,
        record,
        cell,
        empty;

        for (idx = 0, length = rows.length; idx < length; idx++) {
            record = {};
            empty = true;
            cells = rows[idx].cells;

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

    var Node = Model.define({
        id: "id",

        init: function(value) {
            var that = this,
                hasChildren = that.hasChildren || value && value.hasChildren,
                childrenField = "items",
                childrenOptions = {};

            kendo.data.Model.fn.init.call(that, value);

            if (typeof that.children === STRING) {
                childrenField = that.children;
            }

            childrenOptions = {
                schema: {
                    data: childrenField,
                    model: {
                        hasChildren: hasChildren,
                        id: that.idField,
                        fields: that.fields
                    }
                }
            };

            if (typeof that.children !== STRING) {
                extend(childrenOptions, that.children);
            }

            childrenOptions.data = value;

            if (!hasChildren) {
                hasChildren = childrenOptions.schema.data;
            }

            if (typeof hasChildren === STRING) {
                hasChildren = kendo.getter(hasChildren);
            }

            if (isFunction(hasChildren)) {
                that.hasChildren = !!hasChildren.call(that, that);
            }

            that._childrenOptions = childrenOptions;

            if (that.hasChildren) {
                that._initChildren();
            }

            that._loaded = !!(value && (value[childrenField] || value._loaded));
        },

        _initChildren: function() {
            var that = this;
            var children, transport, parameterMap;

            if (!(that.children instanceof HierarchicalDataSource)) {
                children = that.children = new HierarchicalDataSource(that._childrenOptions);

                transport = children.transport;
                parameterMap = transport.parameterMap;

                transport.parameterMap = function(data, type) {
                    data[that.idField || "id"] = that.id;

                    if (parameterMap) {
                        data = parameterMap(data, type);
                    }

                    return data;
                };

                children.parent = function(){
                    return that;
                };

                children.bind(CHANGE, function(e){
                    e.node = e.node || that;
                    that.trigger(CHANGE, e);
                });

                children.bind(ERROR, function(e){
                    var collection = that.parent();

                    if (collection) {
                        e.node = e.node || that;
                        collection.trigger(ERROR, e);
                    }
                });

                that._updateChildrenField();
            }
        },

        append: function(model) {
            this._initChildren();
            this.loaded(true);
            this.children.add(model);
        },

        hasChildren: false,

        level: function() {
            var parentNode = this.parentNode(),
                level = 0;

            while (parentNode && parentNode.parentNode) {
                level++;
                parentNode = parentNode.parentNode ? parentNode.parentNode() : null;
            }

            return level;
        },

        _updateChildrenField: function() {
            var fieldName = this._childrenOptions.schema.data;

            this[fieldName || "items"] = this.children.data();
        },

        _childrenLoaded: function() {
            this._loaded = true;

            this._updateChildrenField();
        },

        load: function() {
            var options = {};
            var method = "_query";
            var children;

            if (this.hasChildren) {
                this._initChildren();

                children = this.children;

                options[this.idField || "id"] = this.id;

                if (!this._loaded) {
                    children._data = undefined;
                    method = "read";
                }

                children.one(CHANGE, proxy(this._childrenLoaded, this));
                children[method](options);
            } else {
                this.loaded(true);
            }
        },

        parentNode: function() {
            var array = this.parent();

            return array.parent();
        },

        loaded: function(value) {
            if (value !== undefined) {
                this._loaded = value;
            } else {
                return this._loaded;
            }
        },

        shouldSerialize: function(field) {
            return Model.fn.shouldSerialize.call(this, field) &&
                    field !== "children" &&
                    field !== "_loaded" &&
                    field !== "hasChildren" &&
                    field !== "_childrenOptions";
        }
    });

    function dataMethod(name) {
        return function() {
            var data = this._data,
                result = DataSource.fn[name].apply(this, slice.call(arguments));

            if (this._data != data) {
                this._attachBubbleHandlers();
            }

            return result;
        };
    }

    var HierarchicalDataSource = DataSource.extend({
        init: function(options) {
            var node = Node.define({
                children: options
            });

            DataSource.fn.init.call(this, extend(true, {}, { schema: { modelBase: node, model: node } }, options));

            this._attachBubbleHandlers();
        },

        _attachBubbleHandlers: function() {
            var that = this;

            that._data.bind(ERROR, function(e) {
                that.trigger(ERROR, e);
            });
        },

        remove: function(node){
            var parentNode = node.parentNode(),
                dataSource = this,
                result;

            if (parentNode && parentNode._initChildren) {
                dataSource = parentNode.children;
            }

            result = DataSource.fn.remove.call(dataSource, node);

            if (parentNode && !dataSource.data().length) {
                parentNode.hasChildren = false;
            }

            return result;
        },

        success: dataMethod("success"),

        data: dataMethod("data"),

        insert: function(index, model) {
            var parentNode = this.parent();

            if (parentNode && parentNode._initChildren) {
                parentNode.hasChildren = true;
                parentNode._initChildren();
            }

            return DataSource.fn.insert.call(this, index, model);
        },

        _find: function(method, value) {
            var idx, length, node, data, children;

            node = DataSource.fn[method].call(this, value);

            if (node) {
                return node;
            }

            data = this._flatData(this._data);

            if (!data) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                children = data[idx].children;

                if (!(children instanceof HierarchicalDataSource)) {
                    continue;
                }

                node = children[method](value);

                if (node) {
                    return node;
                }
            }
        },

        get: function(id) {
            return this._find("get", id);
        },

        getByUid: function(uid) {
            return this._find("getByUid", uid);
        }
    });

    function inferList(list, fields) {
        var items = $(list).children(),
            idx,
            length,
            data = [],
            record,
            textField = fields[0].field,
            urlField = fields[1] && fields[1].field,
            spriteCssClassField = fields[2] && fields[2].field,
            imageUrlField = fields[3] && fields[3].field,
            item,
            id,
            textChild,
            className,
            children;

        function elements(collection, tagName) {
            return collection.filter(tagName).add(collection.find(tagName));
        }

        for (idx = 0, length = items.length; idx < length; idx++) {
            record = { _loaded: true };
            item = items.eq(idx);

            textChild = item[0].firstChild;
            children = item.children();
            list = children.filter("ul");
            children = children.filter(":not(ul)");

            id = item.attr("data-id");

            if (id) {
                record.id = id;
            }

            if (textChild) {
                record[textField] = textChild.nodeType == 3 ? textChild.nodeValue : children.text();
            }

            if (urlField) {
                record[urlField] = elements(children, "a").attr("href");
            }

            if (imageUrlField) {
                record[imageUrlField] = elements(children, "img").attr("src");
            }

            if (spriteCssClassField) {
                className = elements(children, ".k-sprite").prop("className");
                record[spriteCssClassField] = className && $.trim(className.replace("k-sprite", ""));
            }

            if (list.length) {
                record.items = inferList(list.eq(0), fields);
            }

            if (item.attr("data-hasChildren") == "true") {
                record.hasChildren = true;
            }

            data.push(record);
        }

        return data;
    }

    HierarchicalDataSource.create = function(options) {
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            list = dataSource.list;

        if (data && data._dataSource) {
            return data._dataSource;
        }

        if (!data && fields && !dataSource.transport) {
            if (list) {
                data = inferList(list, fields);
            }
        }

        dataSource.data = data;

        return dataSource instanceof HierarchicalDataSource ? dataSource : new HierarchicalDataSource(dataSource);
    };

    var Buffer = kendo.Observable.extend({
        init: function(dataSource, viewSize, disablePrefetch) {
            kendo.Observable.fn.init.call(this);

            this._prefetching = false;
            this.dataSource = dataSource;
            this.prefetch = !disablePrefetch;

            var buffer = this;

            dataSource.bind("change", function() {
                buffer._change();
            });

            dataSource.bind("reset", function() {
                buffer._reset();
            });

            this._syncWithDataSource();

            this.setViewSize(viewSize);
        },

        setViewSize: function(viewSize) {
            this.viewSize = viewSize;
            this._recalculate();
        },

        at: function(index)  {
            var pageSize = this.pageSize,
                item,
                itemPresent = true,
                changeTo;

            if (index >= this.total()) {
                this.trigger("endreached", {index: index });
                return;
            }

            if (!this.useRanges) {
               return this.dataSource.view()[index];
            }
            if (this.useRanges) {
                // out of range request
                if (index < this.dataOffset || index >= this.skip + pageSize) {
                    itemPresent = this.range(Math.floor(index / pageSize) * pageSize);
                }

                // prefetch
                if (index === this.prefetchThreshold) {
                    this._prefetch();
                }

                // mid-range jump - prefetchThreshold and nextPageThreshold may be equal, do not change to else if
                if (index === this.midPageThreshold) {
                    this.range(this.nextMidRange, true);
                }
                // next range jump
                else if (index === this.nextPageThreshold) {
                    this.range(this.nextFullRange);
                }
                // pull-back
                else if (index === this.pullBackThreshold) {
                    if (this.offset === this.skip) { // from full range to mid range
                        this.range(this.previousMidRange);
                    } else { // from mid range to full range
                        this.range(this.previousFullRange);
                    }
                }

                if (itemPresent) {
                    return this.dataSource.at(index - this.dataOffset);
                } else {
                    this.trigger("endreached", { index: index });
                    return null;
                }
            }
        },

        indexOf: function(item) {
            return this.dataSource.data().indexOf(item) + this.dataOffset;
        },

        total: function() {
            return parseInt(this.dataSource.total(), 10);
        },

        next: function() {
            var buffer = this,
                pageSize = buffer.pageSize,
                offset = buffer.skip - buffer.viewSize + pageSize,
                pageSkip = math.max(math.floor(offset / pageSize), 0) * pageSize;

            this.offset = offset;
            this.dataSource.prefetch(pageSkip, pageSize, function() {
                buffer._goToRange(offset, true);
            });
        },

        range: function(offset, nextRange) {
            if (this.offset === offset) {
                return true;
            }

            var buffer = this,
                pageSize = this.pageSize,
                pageSkip = math.max(math.floor(offset / pageSize), 0) * pageSize,
                dataSource = this.dataSource;

            if (nextRange) {
                pageSkip += pageSize;
            }

            if (dataSource.inRange(offset, pageSize)) {
                this.offset = offset;
                this._recalculate();
                this._goToRange(offset);
                return true;
            } else if (this.prefetch) {
                dataSource.prefetch(pageSkip, pageSize, function() {
                    buffer.offset = offset;
                    buffer._recalculate();
                    buffer._goToRange(offset, true);
                });
                return false;
            }

            return true;
        },

        syncDataSource: function() {
            var offset = this.offset;
            this.offset = null;
            this.range(offset);
        },

        destroy: function() {
            this.unbind();
        },

        _prefetch: function() {
            var buffer = this,
                pageSize = this.pageSize,
                prefetchOffset = this.skip + pageSize,
                dataSource = this.dataSource;

            if (!dataSource.inRange(prefetchOffset, pageSize) && !this._prefetching && this.prefetch) {
                this._prefetching = true;
                this.trigger("prefetching", { skip: prefetchOffset, take: pageSize });

                dataSource.prefetch(prefetchOffset, pageSize, function() {
                    buffer._prefetching = false;
                    buffer.trigger("prefetched", { skip: prefetchOffset, take: pageSize });
                });
            }
        },

        _goToRange: function(offset, expanding) {
            if (this.offset !== offset) {
                return;
            }

            this.dataOffset = offset;
            this._expanding = expanding;
            this.dataSource.range(offset, this.pageSize);
            this.dataSource.enableRequestsInProgress();
        },

        _reset: function() {
            this._syncPending = true;
        },

        _change: function() {
            var dataSource = this.dataSource;

            this.length = this.useRanges ? dataSource.lastRange().end : dataSource.view().length;

            if (this._syncPending) {
                this._syncWithDataSource();
                this._recalculate();
                this._syncPending = false;
                this.trigger("reset", { offset: this.offset });
            }

            this.trigger("resize");

            if (this._expanding) {
                this.trigger("expand");
            }

            delete this._expanding;
        },

        _syncWithDataSource: function() {
            var dataSource = this.dataSource;

            this._firstItemUid = dataSource.firstItemUid();
            this.dataOffset = this.offset = dataSource.skip() || 0;
            this.pageSize = dataSource.pageSize();
            this.useRanges = dataSource.options.serverPaging;
        },

        _recalculate: function() {
            var pageSize = this.pageSize,
                offset = this.offset,
                viewSize = this.viewSize,
                skip = Math.ceil(offset / pageSize) * pageSize;

            this.skip = skip;
            this.midPageThreshold = skip + pageSize - 1;
            this.nextPageThreshold = skip + viewSize - 1;
            this.prefetchThreshold = skip + Math.floor(pageSize / 3 * 2);
            this.pullBackThreshold = this.offset - 1;

            this.nextMidRange = skip + pageSize - viewSize;
            this.nextFullRange = skip;
            this.previousMidRange = offset - viewSize;
            this.previousFullRange = skip - pageSize;
        }
    });

    var BatchBuffer = kendo.Observable.extend({
        init: function(dataSource, batchSize) {
            var batchBuffer = this;

            kendo.Observable.fn.init.call(batchBuffer);

            this.dataSource = dataSource;
            this.batchSize = batchSize;
            this._total = 0;

            this.buffer = new Buffer(dataSource, batchSize * 3);

            this.buffer.bind({
                "endreached": function (e) {
                    batchBuffer.trigger("endreached", { index: e.index });
                },
                "prefetching": function (e) {
                    batchBuffer.trigger("prefetching", { skip: e.skip, take: e.take });
                },
                "prefetched": function (e) {
                    batchBuffer.trigger("prefetched", { skip: e.skip, take: e.take });
                },
                "reset": function () {
                    batchBuffer._total = 0;
                    batchBuffer.trigger("reset");
                },
                "resize": function () {
                    batchBuffer._total = Math.ceil(this.length / batchBuffer.batchSize);
                    batchBuffer.trigger("resize", { total: batchBuffer.total(), offset: this.offset });
                }
            });
        },

        syncDataSource: function() {
            this.buffer.syncDataSource();
        },

        at: function(index) {
            var buffer = this.buffer,
                skip = index * this.batchSize,
                take = this.batchSize,
                view = [],
                item;

            if (buffer.offset > skip) {
                buffer.at(buffer.offset - 1);
            }

            for (var i = 0; i < take; i++) {
                item = buffer.at(skip + i);

                if (item === undefined) {
                    break;
                }

                view.push(item);
            }

            return view;
        },

        total: function() {
            return this._total;
        },

        destroy: function() {
            this.buffer.destroy();
            this.unbind();
        }
    });

    extend(true, kendo.data, {
        readers: {
            json: DataReader
        },
        Query: Query,
        DataSource: DataSource,
        HierarchicalDataSource: HierarchicalDataSource,
        Node: Node,
        ObservableObject: ObservableObject,
        ObservableArray: ObservableArray,
        LazyObservableArray: LazyObservableArray,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        Cache: Cache,
        DataReader: DataReader,
        Model: Model,
        Buffer: Buffer,
        BatchBuffer: BatchBuffer
    });
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
