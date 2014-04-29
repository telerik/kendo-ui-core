(function(f, define){
    define([ "./kendo.dom" ], f);
})(function(){

var __meta__ = {
    id: "pivotgrid",
    name: "PivotGrid",
    category: "web",
    description: "The PivotGrid widget is a data summarization tool.",
    depends: [ "dom", "data" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        DataSource = kendo.data.DataSource,
        toString = {}.toString,
        extend = $.extend;

    var PivotDataSource = DataSource.extend({
        init: function(options) {
            DataSource.fn.init.call(this, options);

            this._columns = this.options.columns || [];
            this._rows = this.options.rows || [];
            this._measures = this.options.measures || [];
        },

        columns: function() {
            return this._columns;
        },

        rows: function() {
            return this._rows;
        },

        measures: function() {
            return this._measures;
        },

        _params: function(data) {
            var options = DataSource.fn._params.call(this, data);

            options = extend({
                measures: this.measures(),
                columns: this.columns(),
                rows: this.rows()
            }, options);

            return options;
        }
    });

    PivotDataSource.create = function(options) {
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data;

        dataSource.data = data;

        if (!(dataSource instanceof PivotDataSource) && dataSource instanceof kendo.data.DataSource) {
            throw new Error("Incorrect DataSource type. Only PivotDataSource instances are supported");
        }

        return dataSource instanceof PivotDataSource ? dataSource : new PivotDataSource(dataSource);
    };

    var XmlaTransport = kendo.data.RemoteTransport.extend({
        setup: function(options, type) {
            $.extend(true, options.data, { connection: this.options.connection });

            return kendo.data.RemoteTransport.fn.setup.call(this, options, type);
        }
    });

    function asArray(object) {
        if (object == null) {
            return [];
        }

        var type = toString.call(object);
        if (type !== "[object Array]") {
            return [object]
        }

        return object;
    }

    function translateAxis(axis) {
        var result = { tuples: [] };
        var tuples = asArray(kendo.getter("Tuples.Tuple", true)(axis));
        var captionGetter = kendo.getter("Caption['#text']");
        var unameGetter = kendo.getter("UName['#text']");
        var levelNameGetter = kendo.getter("LName['#text']");
        var levelNumGetter = kendo.getter("LNum['#text']");
        var childrenGetter = kendo.getter("CHILDREN_CARDINALITY['#text']", true);
        var hierarchyGetter = kendo.getter("['Hierarchy']");
        var parentNameGetter = kendo.getter("PARENT_UNIQUE_NAME['#text']", true);

        for (var idx = 0; idx < tuples.length; idx++) {
            var members = [];
            var member = asArray(tuples[idx].Member);
            for (var memberIdx = 0; memberIdx < member.length; memberIdx++) {
                members.push({
                    caption: captionGetter(member[memberIdx]),
                    name: unameGetter(member[memberIdx]),
                    levelName: levelNameGetter(member[memberIdx]),
                    levelNum: levelNumGetter(member[memberIdx]),
                    hasChildren: parseInt(childrenGetter(member[memberIdx]), 10) > 0,
                    parentName: parentNameGetter(member[memberIdx]),
                    hierarchy: hierarchyGetter(member[memberIdx])
                });
            }

            result.tuples.push({ members: members });
        }
        return result;
    }

    var XmlaDataReader = kendo.data.XmlDataReader.extend({
        parse: function(xml) {
            var result = kendo.data.XmlDataReader.fn.parse(xml);
            return kendo.getter("['soap:Envelope']['soap:Body']", true)(result);
        },
        errors: function(root) {
            var fault = kendo.getter("['soap:Fault']", true)(root);
            if (fault) {
                return [{
                    faultstring: kendo.getter("faultstring['#text']", true)(fault),
                    faultcode: kendo.getter("faultcode['#text']", true)(fault),
                }];
            }
            return null;
        },
        axes: function(root) {
            root = kendo.getter("ExecuteResponse.return.root", true)(root);

            var axes = kendo.getter("Axes.Axis", true)(root);
            var columns = translateAxis(axes[0]);
            var rows = {};

            if (axes.length > 2) {
                rows = translateAxis(axes[1]);
            }

            return {
                columns: columns,
                rows: rows
            }
        }
    });

    extend(true, kendo.data, {
       PivotDataSource: PivotDataSource,
       XmlaTransport: XmlaTransport,
       XmlaDataReader: XmlaDataReader,
       transports: {
           xmla: XmlaTransport
       },
       readers: {
           xmla: XmlaDataReader
       }
    });

    var PivotGrid = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._dataSource();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotGrid",
            autoBind: true
        },

        setDataSource: function() {
            //
        },

        _dataSource: function() {
            var dataSource = this.options.dataSource;

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;

            if (this.dataSource && this._refreshHandler) {
                this.dataSource.unbind("change", this._refreshHandler)
            } else {
                this._refreshHandler = $.proxy(this.refresh, this);
            }

            this.dataSource = kendo.data.PivotDataSource.create(dataSource)
                .bind("change", this._refreshHandler)
        },

        refresh: function() {
        }
    });

    ui.plugin(PivotGrid);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
