kendo_module({
    id: "data.scheduler",
    name: "ASP.NET MVC",
    category: "framework",
    description: "",
    depends: [ "data" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend;

    function wrapDataAccess(originalFunction, timezone) {
        return function(data) {
            data = originalFunction(data);

            convertData(data, "apply",  timezone);

            return data || [];
        };
    }

    function wrapDataSerialization(originalFunction, timezone) {
        return function(data) {

            if (data) {
                if (toString.call(data) !== "[object Array]" && !(data instanceof ObservableArray)) {
                    data = [data];
                }
            }

            convertData(data, "remove",  timezone);

            data = originalFunction(data);

            return data || [];
        };
    }

    function convertData(data, method, timezone) {
        var event,
            idx,
            length;

        data = data || [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            event = data[idx];

            event.start = kendo.timezone[method](event.start, event.startTimezone || event.endTimezone || timezone);
            event.end = kendo.timezone[method](event.end, event.endTimezone || event.startTimezone || timezone);
        }
        return data;
    }

    var SchedulerDataReader = kendo.Class.extend({
        init: function(schema, reader) {
            var timezone = schema.timezone || "Etc/UTC";

            this.reader = reader;

            if (reader.model) {
                this.model = reader.model;
            }

            this.timezone = timezone;
            this.data = wrapDataAccess($.proxy(this.data, this), timezone);
            this.serialize = wrapDataSerialization($.proxy(this.serialize, this), timezone);
        },
        errors: function(data) {
            return this.reader.errors(data);
        },
        parse: function(data) {
            return this.reader.parse(data);
        },
        data: function(data) {
            return this.reader.data(data);
        },
        total: function(data) {
            return this.reader.total(data);
        },
        groups: function(data) {
            return this.reader.groups(data);
        },
        aggregates: function(data) {
            return this.reader.aggregates(data);
        },
        serialize: function(data) {
            return this.reader.serialize(data);
        }
    });

    var SchedulerEvent = kendo.data.Model.define({
        init: function(value) {
            var that = this;

            kendo.data.Model.fn.init.call(that, value);
       }
    });

    var SchedulerDataSource = kendo.data.DataSource.extend({
        init: function(options) {
            kendo.data.DataSource.fn.init.call(this, extend(true, {}, { schema: {
                modelBase: SchedulerEvent, model: {
                    title: { defaultValue: "" }
            } } }, options));

            this.reader = new SchedulerDataReader(this.options.schema, this.reader);
        }
    });

    SchedulerDataSource.create = function(options) {
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data;

        dataSource.data = data;

        if (!(dataSource instanceof SchedulerDataSource) && dataSource instanceof kendo.data.DataSource) {
            throw new Error("Incorrect DataSource type. Only SchedulerDataSource instances are supported");
        }

        return dataSource instanceof SchedulerDataSource ? dataSource : new SchedulerDataSource(dataSource);
    };

    extend(true, kendo.data, {
       SchedulerDataSource: SchedulerDataSource,
       SchedulerDataReader: SchedulerDataReader,
       SchedulerEvent: SchedulerEvent
    });

})(window.kendo.jQuery);
