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

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        DataSource = kendo.data.DataSource,
        toString = {}.toString,
        identity = function(o) { return o; },
        map = $.map,
        extend = $.extend,
        CHANGE = "change",
        DIV = "<div/>";

    function normalizeMembers(member) {
        var descriptor = typeof member === "string" ? { name: member, expand: false } : member,
            descriptors = toString.call(descriptor) === "[object Array]" ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(d) {
            if (typeof d === "string") {
                return { name: d, expand: false };
            }
            return { name: d.name, expand: d.expand };
        });
    }

    var PivotDataSource = DataSource.extend({
        init: function(options) {
            DataSource.fn.init.call(this, extend(true, {}, {
                schema: {
                    axes: identity
                }
            }, options));

            this._columns = normalizeMembers(this.options.columns);
            this._rows = normalizeMembers(this.options.rows);
            this._measures = this.options.measures || [];
            this._axes = {};
        },

        axes: function() {
            return this._axes;
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

        expand: function(member) {
            var members = this.columns().concat(this.rows());
            for (var idx = 0; idx < members.length; idx++) {
                if (members[idx].name === member) {
                    members[idx].expand = true;
                    break;
                }
            }
            this.read();
        },

        _readData: function(data) {
            var axes = this.reader.axes(data);
            var newData = this.reader.data(data);

            newData = this._normalizeData(newData, axes);

            this._axes = axes;

            return newData;
        },

        _normalizeData: function(data, axes) {
            var columns = (axes.columns || {}).tuples || [];
            var rows = (axes.rows || {}).tuples || [];
            var cell;
            var axesLength = columns.length * (rows.length || 1);
            var idx, length;

            var result = new Array(axesLength);

            if (data.length === axesLength) {
                return data;
            }

            for (idx = 0, length = result.length; idx < length; idx++) {
                result[idx] = { value: "", fmtValue: "", ordinal: idx };
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
               cell = data[idx];
               result[cell.ordinal] = cell;
            }

            return result;
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

    function expandMemberDescriptors(members) {
        var result = [];
        var name;

        for (var idx = 0; idx < members.length; idx++) {
            var name = members[idx].name;

            if (members[idx].expand && name.indexOf("&") == -1) {
                name += ".[ALL].Children";
            }

            result.push(name);
        }

        return result;
    }

    function crossJoin(names) {
        var result = "CROSSJOIN({";
        var r;
        if (names.length > 2) {
            r = names.pop();
            result += crossJoin(names);
        } else {
            result += names.shift();
            r = names.pop();
        }
        result += "},{";
        result += r;
        result += "})";
        return result;
    }

    var convertersMap = {
        read: function(options, type) {
            var command = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><Execute xmlns="urn:schemas-microsoft-com:xml-analysis"><Command><Statement>';

            command += "SELECT NON EMPTY {";

            var columns = expandMemberDescriptors(options.columns || []);
            var rows = expandMemberDescriptors(options.rows || []);
            var measures = options.measures || [];

            if (columns.length) {
                if (options.columns.length > 1 || measures.length > 1) {
                    var tmp = columns;
                    if (measures.length > 1) {
                        tmp.push("{" + measures.join(",") + "}");
                    }
                    command += crossJoin(tmp);
                } else {
                    command += columns.join(",");
                }
            } else if (measures.length) {
                command += measures.join(",");
            }

            command += "} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS";

            if (rows.length) {
                command += ", NON EMPTY {";

                if (options.rows.length > 1) {
                    command += crossJoin(rows);
                } else {
                    command += rows.join(",");
                }

                command += "} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS";
            }

            command += " FROM [" + options.connection.cube + "]";

            if (measures.length == 1 && options.columns && options.columns.length) {
                command += " WHERE (" + measures.join(",") + ")";
            }

            command += '</Statement></Command><Properties><PropertyList><Catalog>' + options.connection.catalog + '</Catalog></PropertyList></Properties></Execute></Body></Envelope>';
            return command.replace(/\&/g, "&amp;");
        }
    };

    var XmlaTransport = kendo.data.RemoteTransport.extend({
        setup: function(options, type) {
            $.extend(true, options.data, { connection: this.options.connection });

            return kendo.data.RemoteTransport.fn.setup.call(this, options, type);
        },
        options: {
            parameterMap: function(options, type) {
                return convertersMap[type](options,type);
            }
        }
    });

    function asArray(object) {
        if (object == null) {
            return [];
        }

        var type = toString.call(object);
        if (type !== "[object Array]") {
            return [object];
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
                    faultcode: kendo.getter("faultcode['#text']", true)(fault)
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
            };
        },
        data: function(root) {
            root = kendo.getter("ExecuteResponse.return.root", true)(root);

            var cells = asArray(kendo.getter("CellData.Cell", true)(root));

            var result = [];
            var ordinalGetter = kendo.getter("['@CellOrdinal']");
            var valueGetter = kendo.getter("Value['#text']");
            var fmtValueGetter = kendo.getter("FmtValue['#text']");

            for (var idx = 0; idx < cells.length; idx++) {
                result.push({
                    value: valueGetter(cells[idx]),
                    fmtValue: fmtValueGetter(cells[idx]),
                    ordinal: parseInt(ordinalGetter(cells[idx]), 10)
                });
            }

            return result;
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
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._createLayout();

            that._dataSource();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }

            kendo.notify(that);
        },

        events: [],

        options: {
            name: "PivotGrid",
            autoBind: true,
            messages: {
                filterFields: "Drop Filter Fields Here",
                measureFields: "Drop Data Fields Here",
                columnFields: "Drop Column Fields Here",
                rowFields: "Drop Rows Fields Here"
            }
        },

        setDataSource: function() {
            //
        },

        _dataSource: function() {
            var dataSource = this.options.dataSource;

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;

            if (this.dataSource && this._refreshHandler) {
                this.dataSource.unbind("change", this._refreshHandler);
            } else {
                this._refreshHandler = $.proxy(this.refresh, this);
            }

            this.dataSource = kendo.data.PivotDataSource.create(dataSource)
                .bind("change", this._refreshHandler);
        },

        _wrapper: function() {
            this.wrapper = this.element.addClass("k-widget k-pivot");
        },

        _filterFields: function() {
            var element = $(DIV).addClass("k-pivot-filters")
                                .text(this.options.messages.filterFields);

            this.filterFields = element;
        },

        _measureFields: function() {
            this.measureFields = $(DIV).text(this.options.messages.measureFields);
        },

        _columnFields: function() {
            this.columnFields = $(DIV).text(this.options.messages.columnFields);
        },

        _rowFields: function() {
            this.rowFields = $(DIV).text(this.options.messages.rowFields);
        },

        _columnsHeader: function() {
            this.columnsHeader = $('<div class="k-pivot-header" />')
                                    .append('<div class="k-pivot-header-wrap" />');
        },

        _rowsHeader: function() {
            this.rowsHeader = $('<div class="k-pivot-rowheaders"/>');
        },

        _contentTable: function() {
            this.content = $('<div class="k-pivot-content" />');
        },

        _createLayout: function() {
            var that = this;
            var table = $('<table class="k-pivot-layout"/>');

            that._filterFields();

            that._measureFields();
            that._columnFields();

            table.append($("<tr/>")
                            .append($("<td/>").append(that.measureFields))
                            .append($("<td/>").append(that.columnFields))
                        );

            that._rowFields();
            that._columnsHeader();

            that._rowsHeader();
            that._contentTable();

            var pivotTable = $('<div class="k-pivot-table" />')
                                .append(that.columnsHeader)
                                .append(that.content);

            table.append($("<tr/>")
                            .append($("<td/>").append(that.rowFields).append(that.rowsHeader))
                            .append($("<td/>").append(pivotTable))
                        );

            that.wrapper.append(that.filterFields);
            that.wrapper.append(table);

            //VIRTUAL DOM
            that.columnsHeaderTree = new kendo.dom.Tree(that.columnsHeader[0].firstChild);
            that.rowsHeaderTree = new kendo.dom.Tree(that.rowsHeader[0]);
            that.contentTree = new kendo.dom.Tree(that.content[0]);
        },

        refresh: function() {
            var that = this;
            var dataSource = that.dataSource;

            var axes = dataSource.axes();
            var columns = axes.columns || {};
            var tuples = columns.tuples || [];
            var rows = axes.rows || {};

            var data = dataSource.view();

            that.columnsHeaderTree.render(kendo_column_headers(tuples || []));
            that.rowsHeaderTree.render(kendo_row_headers(rows.tuples || []));
            that.contentTree.render(kendo_content(data, tuples.length || 1));
        }
    });

    var element = kendo.dom.element;
    var text = kendo.dom.text;

    //column headers
    function kendo_column_headers(columns) {
        return [ element("table", null, [kendo_columns_thead(columns)]) ];
    };

    function kendo_columns_thead(columns) {
        return element("thead", null, kendo_columns_thead_rows(columns));
    }

    function kendo_columns_thead_rows(columns) {
        var membersLength = columns[0] ? columns[0].members.length : 1;

        var rows = [];

        for (var i = 0; i < membersLength; i++) {
            var cells = [];
            var j = 0;
            var length = columns.length || 1;

            for (; j < length; j++) {
                var column = columns[j];
                var member;

                if (!column) {
                    member = {
                        caption: ""
                    };
                } else {
                    member = columns[j].members[i];
                }

                cells.push(kendo_th(member));
            }

            rows.push(element("tr", null, cells));
        }

        return rows;
    }

    function kendo_th(member) {
        return element("th", null, [text(member.caption)]);
    }

    //row headers
    function kendo_row_headers(rows) {
        return [ element("table", null, [kendo_row_thead(rows)]) ];
    };

    function kendo_row_thead(rows) {
        return element("thead", null, kendo_row_thead_rows(rows));
    }

    function kendo_row_thead_rows(rows) {
        var elements = [];
        var length = rows.length || 1;

        for (var j = 0; j < length; j++) {
            var cells = [];

            var tuple = rows[j];
            var member;

            if (tuple) {
                for (var i = 0; i < tuple.members.length; i++) {
                    member = tuple.members[i];

                    cells.push(kendo_th(member));
                }
            } else {
                var member = {
                    caption: ""
                };

                cells.push(kendo_th(member));
            }

            elements.push(element("tr", null, cells));
        }

        return elements;
    }

    //content
    function kendo_content(data, columnsLength) {
        return [ element("table", null, [kendo_tbody(data, columnsLength)]) ];
    };

    function kendo_tbody(data, columnsLength) {
        return element("tbody", null, kendo_rows(data, columnsLength));
    }

    function kendo_rows(data, columnsLength) {
        var length = Math.ceil((data.length || 1) / columnsLength);
        var rows = [];

        for (var i = 0; i < length; i++) {
            rows.push(kendo_row(data, i, columnsLength));
        }
        return rows;
    }

    function kendo_row(data, rowIndex, columnsLength) {
        //render cells
        var cells = [];

        var start = rowIndex * columnsLength;
        var end = start + columnsLength;
        var dataItem;

        for (; start < end; start++) {
            dataItem = data[start];
            cells.push(element("td", null, [text(dataItem ? dataItem.value : "")]));
        }

        return element("tr", null, cells);
    }

    ui.plugin(PivotGrid);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
