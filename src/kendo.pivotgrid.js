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

    function descriptorsForAxes(axes) {
        var tuples = axes.tuples || [];

        var result = {};
        var members;
        var name;

        for (var idx = 0; idx < tuples.length; idx++) {
            members = tuples[idx].members;

            for (var memberIdx = 0; memberIdx < members.length; memberIdx++) {
                name = members[memberIdx].name.replace(/\.\[all\]$/i, "");

                result[name] = members[memberIdx].children.length > 0;
            }
        }

        var descriptors = [];
        for (var k in result) {
            descriptors.push({ name: k, expand: result[k] });
        }

        return descriptors;
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

        _expandPath: function(path, axis) {
            var origin = axis === "columns" ? "columns" : "rows";
            var other = axis === "columns" ? "rows" : "columns";

            var members = normalizeMembers(path);
            members[members.length - 1].expand = true;

            var axis1 = this[origin]();

            if (members.length < axis1.length) {
                for (var idx = 0; idx < axis1.length; idx++) {
                    var found = false;
                    for (var j = 0; j < members.length; j++) {
                        if (members[j].name.indexOf(axis1[idx].name) == 0) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        members.push(axis1[idx]);
                    }
                }
            }

            var axes = this.axes();
            var axis2 = this[other]() || [];

            if (axes && axes[other]) {
                axis2 = descriptorsForAxes(axes[other]);
            }

            var descriptors = {};
            descriptors[origin] = members;
            descriptors[other] = axis2;

            this.read(descriptors);
        },

        expandColumn: function(path) {
            this._expandPath(path, "columns");
        },

        expandRow: function(path) {
            this._expandPath(path, "rows");
        },

        _readData: function(data) {
            var axes = this.reader.axes(data);
            var newData = this.reader.data(data);

            newData = this._normalizeData(newData, axes);

            this._axes = mergeAxes(this._axes, axes, this.measures());

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

    function mergeAxes(target, source, measures) {
        if (!target.columns) {
            target.columns = {
                tuples: []
            };
        }

        if (!source.columns) {
            source.columns = {
                tuples: []
            };
        }

        var result = {
            columns: target.columns,
            rows: source.rows
        };

        var columnTuples = result.columns.tuples;
        var sourceTuples = parseSource(source.columns.tuples || [], measures);
        result.columns.tuples = mergeTuples(columnTuples, sourceTuples);

        if (source.rows) {
            result.rows.tuples = parseSource(source.rows.tuples || [], measures);
        }

        return result;
    }

    function mergeTuples(target, source) {
        if (!source[0]) {
            return target;
        }

        var result = findExistingTuple(target, source[0]);

        if (!result) {
            return source;
        }

        var targetMembers = result.members;
        for (var idx = 0, len = source.length; idx < len; idx ++) {
            var sourceMembers = source[idx].members;
            for (var memberIndex = 0, memberLen = targetMembers.length; memberIndex < memberLen; memberIndex ++) {
                if (!targetMembers[memberIndex].measure) {
                    [].push.apply(targetMembers[memberIndex].children, sourceMembers[memberIndex].children);
                }
            }
        }

        return target;
    }

    function findExistingTuple(tuples, current) {
        var members = current.members;
        var tuple;
        for (var i = 0; i < members.length; i ++) {
            tuple = findTuple(tuples, members[i].name, i);
            if (!tuple) {
                return null;
            }
            if (equalMembers(tuple.members, members)) {
                return tuple;
            }
        }

        return null;
    }

    function equalMembers(first, second) {
        var result = true;
        var length = first.length;
        for (var i = 0; i < length && result; i ++) {
            result = result && (first[i].name == second[i].name);
        }

        return result;
    }

    function findTuple(tuples, name, index) {
        var tuple, member;
        var idx , length;
        for (idx = 0, length = tuples.length; idx < length; idx ++) {
            tuple = tuples[idx];
            member = tuple.members[index];
            if (member.name == name) {
                return tuple;
            }

            tuple = findTuple(member.children, name, index);
            if (tuple) {
                return tuple;
            }
        }

        return tuple;
    }

    function addMembers(members, map) {
        var member, i, len, path = "";
        for (i = 0, len = members.length; i < len; i++) {
            member = members[i];
            path += member.name;
            if (!map[path]) {
                map[path] = member;
            }
        }
    }

    function findParentMember(tuple, map) {
        var members = tuple.members;
        var i, len, member, path = "";
        var parentPath = "";
        var parentMember;

        for (i = 0, len = members.length; i < len; i++) {
            member = members[i];
            if (parentMember) {
                if (map[path + member.name]) {
                    path += member.name;
                    parentMember = map[path];
                    continue;
                } else if (map[path + member.parentName]) {
                    return map[path + member.parentName];
                } else {
                    if (member.parentName) {
                        parentPath += member.parentName;
                    }
                    return map[parentPath];
                }
            }

            path += member.name;
            parentMember = map[member.parentName];

            if (!parentMember) {
                parentMember = map[path];
                if (!parentMember) {
                    return null;
                }
            }

            if (parentMember) {
                parentPath += parentMember.name;
            }
        }

        return parentMember;
    }

    function measurePosition(tuple, measures) {
        if (measures.length < 2) {
            return -1;
        }

        var measure = measures[0];
        var members = tuple.members;
        for (var idx = 0, len = members.length; idx < len; idx ++) {
            if (members[idx].name == measure) {
                return idx;
            }
        }
    }

    function normalizeMeasures(tuple, index) {
        if (index < 0) {
            return;
        }
        var member = {
            name: "Measures",
            measure: true,
            children: [
                tuple.members[index]
            ]
        };
        tuple.members.splice(index, 1, member);
    }

    function parseSource(tuples, measures) {
        if (tuples.length < 1) {
            return [];
        }
        var result = [];
        var map = { };
        var measureIndex = measurePosition(tuples[0], measures);

        for (var i = 0; i < tuples.length; i++) {
            var tuple = tuples[i];
            normalizeMeasures(tuple, measureIndex);
            var parentMember = findParentMember(tuple, map);

            if (parentMember) {
                if (measureIndex < 0 || !parentMember.measure) {
                    parentMember.children.push(tuple);
                } else {
                    parentMember.children.push(tuple.members[measureIndex].children[0]);
                }
            } else {
                result.push(tuple);
            }

            addMembers(tuple.members, map);
        }

        return result;
    }

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

    function transformDescriptors(members, mapFunction) {
        var result = [];

        for (var idx = 0; idx < members.length; idx++) {
            result.push(mapFunction(members[idx]));
        }

        return result;
    }

    function expandMemberDescriptor(members, memberNames) {
        return transformDescriptors(members, function(member) {
            var name = member.name;

            var found = false;

            for (var idx = 0; idx < memberNames.length; idx++) {
                if (name === memberNames[idx]) {
                    found = true;
                    break;
                }
            }

            if (member.expand && found) {
                if (name.indexOf("&") == -1) {
                    name += ".[ALL]";
                }
                name += ".Children";

            } else if (name.indexOf("&") == -1) {
                name += ".[(ALL)].MEMBERS";
            }

            return name;
        });
    }

    function expandDescriptors(members) {
        return transformDescriptors(members, function(member) {
            var name = member.name;

            if (member.expand) {
                if (name.indexOf("&") == -1) {
                    name += ".[ALL]";
                }
                name += ".Children";
            } else if (name.indexOf("&") == -1) {
                name += ".[(ALL)].MEMBERS";
            }
            return name;
        });
    }

    function convertMemberDescriptors(members) {
        return transformDescriptors(members, function(member) {
            var name = member.name;

            if (name.indexOf("&") == -1) {
                name += ".[(ALL)].MEMBERS";
            }

            return name;
        });
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

    function crossJoinCommand(members, measures) {
        var tmp = members;
        if (measures.length > 1) {
            tmp.push("{" + measures.join(",") + "}");
        }
        return crossJoin(tmp);
    }

    function expandedMembers(members) {
        var result = [];

        for (var idx = 0; idx < members.length; idx++) {
            if (members[idx].expand) {
                result.push(members[idx]);
            }
        }

        return result;
    }

    function serializeMembers(members, measures) {
        var command = "";

        members = members || [];

        var memberNames = convertMemberDescriptors(members);
        var expandedColumns = expandedMembers(members);

        if (members.length > 1 || measures.length > 1) {
            command += crossJoinCommand(memberNames, measures);

            if (expandedColumns.length) {
                var start = 0;
                var idx;

                var expandedMemberNames = [];

                for (idx = 0; idx < expandedColumns.length; idx++) {
                    command += ",";

                    for (j=start; j < expandedColumns.length; j++) {
                        command += crossJoinCommand(expandMemberDescriptor(members, expandedMemberNames.concat(expandedColumns[j].name)), measures);
                        if (j < expandedColumns.length - 1) {
                            command += ",";
                        }
                    }
                    start++;
                    expandedMemberNames.push(expandedColumns[idx].name);
                }
            }
        } else {
            if (expandedColumns.length) {
                memberNames = memberNames.concat(expandDescriptors(members));
            }
            command += memberNames.join(",");
        }

        return command;
    }

    var convertersMap = {
        read: function(options, type) {
            var command = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><Execute xmlns="urn:schemas-microsoft-com:xml-analysis"><Command><Statement>';

            command += "SELECT NON EMPTY {";

            var columns = options.columns || [];
            var rows = options.rows || [];

            var measures = options.measures || [];

            if (columns.length) {
                command += serializeMembers(columns, measures);
            } else if (measures.length) {
                command += measures.join(",");
            }

            command += "} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS";

            if (rows.length) {
                command += ", NON EMPTY {";

                command += serializeMembers(rows, []/*, measures*/);

                command += "} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS";
            }

            command += " FROM [" + options.connection.cube + "]";

            if (measures.length == 1 && columns.length) {
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
        var hierarchyGetter = kendo.getter("['@Hierarchy']");
        var parentNameGetter = kendo.getter("PARENT_UNIQUE_NAME['#text']", true);

        for (var idx = 0; idx < tuples.length; idx++) {
            var members = [];
            var member = asArray(tuples[idx].Member);
            for (var memberIdx = 0; memberIdx < member.length; memberIdx++) {
                members.push({
                    children: [],
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

            var columnsTree = kendo_column_headers(tuples || []);
            var rowsTree = kendo_row_headers(rows.tuples || []);

            that.columnsHeaderTree.render(columnsTree);
            that.rowsHeaderTree.render(rowsTree);
            that.contentTree.render(kendo_content(data, columnsTree, rowsTree));
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

    function kendo_columns_thead_rows(columns, parentMember) {
        var cellsCount = 1;
        var rows = [];
        var index = 0;
        var row;

        //TODO: Mark last row of a root tuple
        //TODO: Mark all cells that are ALL

        for (var colIdx = 0, length = columns.length; colIdx < length; colIdx++) {
            var column = columns[colIdx];
            var members = column.members;

            for (var memberIdx = 0, l = members.length; memberIdx < l; memberIdx++) {

                var member = members[memberIdx];
                var childrenTuples = member.children;

                if (!parentMember || member.parentName === parentMember.name) {
                    row = rows[index];

                    if (!row) {
                        row = element("tr", null, []);
                        rows.push(row);
                    }

                    while(cellsCount) {
                        row.children.push(kendo_th(member));
                        cellsCount -= 1;
                    }

                    index += 1;
                }

                if (childrenTuples[0]) {
                    row.children.push(kendo_th(member));

                    var childrenRows = kendo_columns_thead_rows(childrenTuples, member);

                    row.children[0].attr.colspan = maxValue(childrenRows);
                    row.children[1].attr.rowspan = childrenRows.length + 1;

                    rows = rows.concat(childrenRows);

                    index = rows.length;
                    cellsCount = getCellsCount(row);
                } else {
                    cellsCount = 1;
                }
            }

            index = 0;
        }

        return rows;
    }

    function maxValue(rows) {
        var row;
        var count = 1;

        for (var i = 0, length = rows.length; i < length; i++) {
            row = rows[i];

            if (row.children.length > count) {
                count = row.children.length;
            }
        }

        return count;
    }

    function getCellsCount(row) {
        if (!row) {
            return 1;
        }

        var cells = row.children;
        var length = cells.length;
        var idx = 0;
        var cell;

        var count = 0;

        for (; idx < length; idx++) {
            cell = cells[idx];

            count += cell.attr.colspan || 1;
        }

        return count;
    }

    function kendo_th(member) {
        return element("th", null, [text(member.caption || member.name)]);
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
    function kendo_content(data, columnsTree, rowsTree) {
        return [ element("table", null, [kendo_tbody(data, columnsTree, rowsTree)]) ];
    };

    function kendo_tbody(data, columnsTree, rowsTree) {
        return element("tbody", null, kendo_rows(data, columnsTree, rowsTree));
    }

    function kendo_rows(data, columnsTree, rowsTree) {
        var columnRows = columnsTree[0].children[0].children;

        var columnLastRow = columnRows[columnRows.length - 1];

        var columnsLength = columnLastRow ? columnLastRow.children.length : 1;

        var length = Math.ceil((data.length || 1) / columnsLength);
        var rows = [];

        for (var i = 0; i < length; i++) {
            rows.push(kendo_row(data, i, columnLastRow));
        }
        return rows;
    }

    function kendo_row(data, rowIndex, columnLastRow) {
        //render cells
        var cells = [];

        var columns = columnLastRow ? columnLastRow.children : [];
        var columnsLength = columns.length;

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
