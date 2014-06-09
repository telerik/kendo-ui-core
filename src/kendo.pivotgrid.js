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
        Class = kendo.Class,
        Widget = ui.Widget,
        DataSource = kendo.data.DataSource,
        toString = {}.toString,
        identity = function(o) { return o; },
        map = $.map,
        extend = $.extend,
        CHANGE = "change",
        DIV = "<div/>",
        STATE_EXPANDED = "k-i-arrow-s",
        STATE_COLLAPSED = "k-i-arrow-e",
        LAYOUT_TABLE = '<table class="k-pivot-layout">' +
                            '<tr>' +
                                '<td>' +
                                    '<div class="k-pivot-rowheaders"></div>' +
                                '</td>' +
                                '<td>' +
                                    '<div class="k-pivot-table k-state-default"></div>' +
                                '</td>' +
                            '</tr>' +
                        '</table>';

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

    function accumulateMembers(accumulator, tuples, level) {
        var member;
        var name;
        var parentName;

        for (var idx = 0; idx < tuples.length; idx++) {
            member = tuples[idx].members[level]
            name = member.name;
            parentName = member.parentName || "";

            if (member.children.length > 0) {
                accumulator[name] = true;
                accumulateMembers(accumulator, member.children, level);
            } else if (!(parentName in accumulator)) {
                accumulator[name] = false;
            }
        }
    }

    function descriptorsForAxes(tuples) {
        var result = {};

        if (tuples.length) {
            var members = tuples[0].members || [];
            for (var idx = 0; idx < members.length; idx++) {
                if (!members[idx].measure) {
                    accumulateMembers(result, tuples, idx);
                }
            }
        }

        var descriptors = [];
        for (var k in result) {
            descriptors.push({ name: k, expand: result[k] });
        }

        return descriptors;
    }

    function addMissingPathMembers(members, axis) {
        var tuples = axis.tuples || [];
        var firstTuple = tuples[0];

        if (firstTuple && members.length < firstTuple.members.length) {
            var tupleMembers = firstTuple.members;

            for (var idx = 0; idx < tupleMembers.length; idx++) {
                if (tupleMembers[idx].measure) {
                    continue;
                }

                var found = false;
                for (var j = 0; j < members.length; j++) {
                    if (members[j].name.indexOf(tupleMembers[idx].hierarchy) === 0) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    members.push(tupleMembers[idx]);
                }
            }
        }
    }

    function tupleToDescriptors(tuple) {
        var result = [];
        var members = tuple.members;

        for (var idx = 0; idx < members.length; idx++) {
            if (members[idx].measure) {
                continue;
            }
            result.push({ name: members[idx].name, expand: members[idx].children.length > 0});
        }

        return result;
    }

    function descriptorsForMembers(axis, members, measures) {
        var axis = axis || {};

        addMissingPathMembers(members, axis);

        if (measures.length > 1) {
            members.push({
                name: "Measures",
                measure: true,
                children: normalizeMembers(measures)
            });
        }

        var tupletoSearch = {
            members: members
        };

        if (axis.tuples) {
            var result = findExistingTuple(axis.tuples, tupletoSearch);
            if (result) {
                members = tupleToDescriptors(result.tuple);
            }
        }

        return members;
    }

    var PivotTransport = Class.extend({
        init: function(options, transport) {
            this.transport = transport;
            this.options = transport.options || {};

            if (!this.transport.discover) {
                if ($.isFunction(options.discover)) {
                    this.discover = options.discover;
                }
            }
        },
        read: function(options) {
            return this.transport.read(options);
        },
        update: function(options) {
            return this.transport.update(options);
        },
        create: function(options) {
            return this.transport.create(options);
        },
        destroy: function(options) {
            return this.transport.destroy(options);
        },
        discover: function(options) {
            if (this.transport.discover) {
                return this.transport.discover(options);
            }
            options.success({});
        },
        catalog: function(val) {
            var options = this.options || {};

            if (val === undefined) {
                return (options.connection || {}).catalog;

            }

            connection = options.connection || {};
            connection.catalog = val;

            this.options.connection = connection;
            $.extend(this.transport.options, { connection: connection });
        },
        cube: function(val) {
            var options = this.options || {};

            if (val === undefined) {
                return (options.connection || {}).cube;
            }

            connection = options.connection || {};
            connection.cube = val;

            this.options.connection = connection;
            extend(true, this.transport.options, { connection: connection });
        }
    });

    var PivotDataSource = DataSource.extend({
        init: function(options) {
            DataSource.fn.init.call(this, extend(true, {}, {
                schema: {
                    axes: identity,
                    cubes: identity,
                    catalogs: identity,
                    measures: identity,
                    dimensions: identity,
                    hierarchies: identity,
                    levels: identity
                }
            }, options));

            this.transport = new PivotTransport(this.options.transport || {}, this.transport);

            this._columns = normalizeMembers(this.options.columns);
            this._rows = normalizeMembers(this.options.rows);

            var measures = this.options.measures || [];
            var measuresAxis = "columns";

            if (this.options.measures !== null && toString.call(this.options.measures) === "[object Object]") {
                measures = this.options.measures.values || [];
                measuresAxis = this.options.measures.axis || "columns";
            }

            this._measures = measures || [];
            this._measuresAxis = measuresAxis;

            this._axes = {};
        },

        options: {
            serverSorting: true,
            serverPaging: true,
            serverFiltering: true,
            serverGrouping: true,
            serverAggregates: true
        },

        catalog: function(val) {
            if (val === undefined) {
                return this.transport.catalog();
            }

            this.transport.catalog(val);
            this._mergeState({});// clears current state
            this._axes = {};
            this.data([]);
        },

        cube: function(val) {
            if (val === undefined) {
                return this.transport.cube();
            }

            this.transport.cube(val);
            this._axes = {};
            this._mergeState({});// clears current state
            this.data([]);
        },

        axes: function() {
            return this._axes;
        },

        columns: function(val) {
            if (val === undefined) {
                return this._columns;
            }

            this._clearAxesData = true;
            this.query({
                columns: val,
                rows: this.rowsAxisDescriptors(),
                measures: this.measures()
            });
        },

        rows: function(val) {
            if (val === undefined) {
                return this._rows;
            }

            this._clearAxesData = true;
            this.query({
                columns: this.columnsAxisDescriptors(),
                rows: val,
                measures: this.measures()
            });
        },

        measures: function(val) {
            if (val === undefined) {
                return this._measures;
            }

            this._clearAxesData = true;
            this.query({
                columns: this.columnsAxisDescriptors(),
                rows: this.rowsAxisDescriptors(),
                measures: val
            });
        },

        measuresAxis: function() {
            return this._measuresAxis || "columns";
        },

        _expandPath: function(path, axis) {
            var origin = axis === "columns" ? "columns" : "rows";
            var other = axis === "columns" ? "rows" : "columns";

            var members = normalizeMembers(path);
            var memberToExpand = members[members.length - 1].name;

            members = descriptorsForMembers(this.axes()[origin], members, this.measures());

            for (var idx = 0; idx < members.length; idx++) {
                if (members[idx].name === memberToExpand) {
                    if (members[idx].expand) {
                        return;
                    }
                    members[idx].expand = true;
                } else {
                    members[idx].expand = false;
                }
            }

            var descriptors = {};
            descriptors[origin] = members;
            descriptors[other] = this._descriptorsForAxis(other);

            this._query(descriptors);
        },

        _descriptorsForAxis: function(axis) {
            var axes = this.axes();
            var descriptors = this[axis]() || [];

            if (axes && axes[axis]) {
                descriptors = descriptorsForAxes(axes[axis].tuples || []);
            }
            return descriptors;
        },

        columnsAxisDescriptors: function() {
            return this._descriptorsForAxis("columns");
        },

        rowsAxisDescriptors: function() {
            return this._descriptorsForAxis("rows");
        },

        _process: function (data, e) {
            this._view = data;

            e = e || {};
            e.items = e.items || this._view;

            this.trigger(CHANGE, e);
        },

        _query: function(options) {
            var that = this;

            if (!options) {
                this._clearAxesData = true;
            }

            that.query(extend({}, {
                page: that.page(),
                pageSize: that.pageSize(),
                sort: that.sort(),
                filter: that.filter(),
                group: that.group(),
                aggregate: that.aggregate(),
                columns: this.columnsAxisDescriptors(),
                rows: this.rowsAxisDescriptors(),
                measures: this.measures()
            }, options));
        },

        query: function(options) {
            this.read(this._mergeState(options));
        },

        _mergeState: function(options) {
            options = DataSource.fn._mergeState.call(this, options);

            if (options !== undefined) {
                this._measures = options.measures || [];
                this._columns = options.columns || [];
                this._rows = options.rows || [];

                if (options.columns) {
                  this._columns =  options.columns = normalizeMembers(options.columns);
                }

                if (options.rows) {
                   this._rows = options.rows = normalizeMembers(options.rows);
                }
            }
            return options;
        },

        filter: function(val) {
            if (val === undefined) {
                return this._filter;
            }

            this._clearAxesData = true;
            this._query({ filter: val, page: 1 });
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

            var result = this._mergeAxes(axes, newData);
            this._axes = result.axes;

            return result.data;
        },

        _mergeAxes: function(sourceAxes, data) {
            var measures = this.measures();
            var columnMeasures = rowMeasures = [];
            if (this.measuresAxis() === "columns") {
                if (this.columns().length === 0) {
                    columnMeasures = measures;
                } else if (measures.length > 1) {
                    columnMeasures = measures;
                }
            } else {
                if (this.rows().length === 0) {
                    columnMeasures = measures;
                } else if (measures.length > 1) {
                    rowMeasures = measures;
                }
            }

            var axes = {
                columns: normalizeAxis(this._axes.columns),
                rows: normalizeAxis(this._axes.rows)
            };

            sourceAxes = {
                columns: normalizeAxis(sourceAxes.columns),
                rows: normalizeAxis(sourceAxes.rows)
            };

            var newColumnsLength = sourceAxes.columns.tuples.length;
            var newRowsLength = sourceAxes.rows.tuples.length;
            var oldColumnsLength = membersCount(axes.columns.tuples);

            var tuples = parseSource(sourceAxes.columns.tuples, columnMeasures);
            var mergedColumns = mergeTuples(axes.columns.tuples, tuples);

            tuples = parseSource(sourceAxes.rows.tuples, rowMeasures);
            var mergedRows = mergeTuples(axes.rows.tuples, tuples);

            axes.columns.tuples = mergedColumns.tuple;
            axes.rows.tuples = mergedRows.tuple;

            if (oldColumnsLength !== membersCount(axes.columns.tuples)) {
                //columns are expanded
                var offset = oldColumnsLength + newColumnsLength;
                if (oldColumnsLength) {
                    offset--;
                }
                data = this._mergeColumnData(data, mergedColumns.deep, newRowsLength, newColumnsLength, offset);
            } else {
                //rows are expanded
                data = this._mergeRowData(data, mergedRows.deep, newColumnsLength);
            }

            return {
                axes: axes,
                data: data
            };
        },

        _mergeColumnData: function(newData, columnIndex, rowsLength, columnsLength, offset) {
            var counter, index;
            var data = this.data().toJSON();
            var drop = 0;

            rowsLength = Math.max(rowsLength, 1);
            if (data.length > 0) {
                columnIndex--;
                drop = 1;
            }

            for (counter = 0; counter < rowsLength; counter ++) {
                index = columnIndex + (counter * offset);
                [].splice.apply(data, [index, drop].concat(newData.splice(0, columnsLength)));
            }

            return data;
        },

        _mergeRowData: function(newData, rowIndex, drop) {
            var data = this.data().toJSON();

            if (data.length === 0) {
                drop = 0;
            } else if (drop === 0) {
                drop = 1;
                rowIndex--;
            }

            newData.splice(0, drop);
            [].splice.apply(data, [rowIndex + drop, 0].concat(newData));

            return data;
        },

        _normalizeData: function(data, axes) {
            if (!data.length) {
                return data;
            }

            var columns = (axes.columns || {}).tuples || [];
            var rows = (axes.rows || {}).tuples || [];
            var cell;
            var axesLength = (columns.length || 1) * (rows.length || 1);
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

        discover: function(options, converter) {
            var that = this,
                transport = that.transport;

            return $.Deferred(function(deferred) {
                transport.discover(extend({
                    success: function(response) {
                       response = that.reader.parse(response);

                        if (that._handleCustomErrors(response)) {
                            return;
                        }

                        if (converter) {
                            response = converter(response);
                        }
                        deferred.resolve(response);
                    },
                    error: function(response, status, error) {
                        deferred.reject(response);
                        that.error(response, status, error);
                    }
                }, options));
            }).promise().done(function() {
                that.trigger("schemaChange");
            });
        },

        schemaMeasures: function() {
            var that = this;

            return that.discover({
                data: {
                    command: "schemaMeasures",
                    restrictions: {
                        catalogName: that.transport.catalog(),
                        cubeName: that.transport.cube()
                    }
                }
            }, function(response) {
                return that.reader.measures(response);
            });
        },

        schemaDimensions: function() {
            var that = this;

            return that.discover({
                data: {
                    command: "schemaDimensions",
                    restrictions: {
                        catalogName: that.transport.catalog(),
                        cubeName: that.transport.cube()
                    }
                }
            }, function(response) {
                return that.reader.dimensions(response);
            });
        },

        schemaHierarchies: function(dimensionName) {
            var that = this;

            return that.discover({
                data: {
                    command: "schemaHierarchies",
                    restrictions: {
                        catalogName: that.transport.catalog(),
                        cubeName: that.transport.cube(),
                        dimensionUniqueName: dimensionName
                    }
                }
            }, function(response) {
                return that.reader.hierarchies(response);
            });
        },

        schemaLevels: function(hierarchyName) {
            var that = this;

            return that.discover({
                data: {
                    command: "schemaLevels",
                    restrictions: {
                        catalogName: that.transport.catalog(),
                        cubeName: that.transport.cube(),
                        hierarchyUniqueName: hierarchyName
                    }
                }
            }, function(response) {
                return that.reader.levels(response);
            });
        },

        schemaCubes: function() {
            var that = this;

            return that.discover({
                data: {
                    command: "schemaCubes",
                    restrictions: {
                        catalogName: that.transport.catalog()
                    }
                }
            }, function(response) {
                return that.reader.cubes(response);
            });
        },

        schemaCatalogs: function() {
            var that = this;

            return that.discover({
                data: {
                    command: "schemaCatalogs"
                }
            }, function(response) {
                return that.reader.catalogs(response);
            });
        },

        _params: function(data) {
            if (this._clearAxesData) {
                this._axes = {};
                this._data = this._observe([]);
                this._clearAxesData = false;
            }

            var options = DataSource.fn._params.call(this, data);

            options = extend({
                measures: this.measures(),
                measuresAxis: this.measuresAxis(),
                columns: this.columns(),
                rows: this.rows()
            }, options);

            return options;
        }
    });

    function membersCount(tuples) {
        if (!tuples.length) {
            return 0;
        }

        var queue = tuples.slice();
        var current = queue.shift();
        var idx, length, result = 1;

        while (current) {
            if (current.members) {
                [].push.apply(queue, current.members);
            } else if (current.children) {
                result += current.children.length;
                [].push.apply(queue, current.children);
            }

            current = queue.shift();
        }

        return result;
    }

    function normalizeAxis(axis) {
        if (!axis) {
            axis = {
                tuples: []
            };
        }

        if (!axis.tuples) {
            axis.tuples = [];
        }

        return axis;
    }

    function mergeTuples(target, source) {
        if (!source[0]) {
            return {
                tuple: target,
                deep: 0
            };
        }

        var result = findExistingTuple(target, source[0]);

        if (!result || !result.tuple) {
            return {
                tuple: source,
                deep: 0
            };
        }

        var targetMembers = result.tuple.members;
        for (var idx = 0, len = source.length; idx < len; idx ++) {
            var sourceMembers = source[idx].members;
            for (var memberIdx = 0, memberLen = targetMembers.length; memberIdx < memberLen; memberIdx ++) {
                if (!targetMembers[memberIdx].measure && sourceMembers[memberIdx].children[0]) {
                    targetMembers[memberIdx].children = sourceMembers[memberIdx].children;
                }
            }
        }

        return {
            tuple: target,
            deep: result.deep
        };
    }

    function findExistingTuple(tuples, current) {
        var members = current.members;
        var result;
        for (var i = 0; i < members.length; i ++) {
            result = findTuple(tuples, members[i].name, i);
            if (!result.tuple) {
                return null;
            }
            if (equalMembers(result.tuple.members, members)) {
                return result;
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
        var deep = 0;
        var result;

        for (idx = 0, length = tuples.length; idx < length; idx ++) {
            deep++;
            tuple = tuples[idx];
            member = tuple.members[index];

            if (member.name == name) {
                return {
                    tuple: tuple,
                    deep: deep
                };
            }

            result = findTuple(member.children, name, index);
            deep += result.deep;
            if (result.tuple) {
                result.deep = deep;
                return result;
            }
        }

        //return tuple;
        return {
            tuple: null,
            deep: deep
        };
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
        if (measures.length === 0) {
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

    function trimSameHierarchyChildDescriptors(members) {
        var result = [];

        for (var idx = 0; idx < members.length; idx++) {
            var found = false;
            var name = members[idx].name;

            for (var j = 0; j < members.length; j++) {
                var memberName = members[j].name;
                if (name.indexOf(memberName) === 0 && memberName !== name) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                result.push(members[idx]);
            }
        }

        return result;
    }

    function trimSameHierarchyChildDescriptorsForName(members, memberName) {
        var result = [];

        for (var idx = 0; idx < members.length; idx++) {
            var name = members[idx].name;

            if (memberName == name || !(name.indexOf(memberName) === 0 || memberName.indexOf(name) === 0)) {
                result.push(members[idx]);
            }
        }

        return result;
    }

    function sameHierarchyDescriptors(members) {
        var same = {};

        for (var idx = 0; idx < members.length; idx++) {
            var name = members[idx].name;

            for (var j = 0; j < members.length; j++) {
                var memberName = members[j].name;
                if ((memberName.indexOf(name) === 0 || name.indexOf(memberName) === 0) && memberName !== name) {
                    same[name] = members[idx];
                }
            }
        }

        var result = [];

        for (var key in same) {
            result.push(same[key]);
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

    function removeAllFromDescriptors(descriptors) {
        for (var idx = 0; idx < descriptors.length; idx++) {
            descriptors[idx].name = descriptors[idx].name.replace(/\.\[all\]$/i, "")
        }
        return descriptors;
    }

    function serializeMembers(members, measures) {
        var command = "";

        members = members || [];

        var memberNames = convertMemberDescriptors(trimSameHierarchyChildDescriptors(members));
        var expandedColumns = expandedMembers(members);

        if (memberNames.length > 1 || measures.length > 1) {
            command += crossJoinCommand(memberNames, measures);

            if (expandedColumns.length) {
                var start = 0;
                var idx;
                var j;
                var name;

                var expandedMemberNames = [];
                var sameHierarchyMembers = sameHierarchyDescriptors(members);

                var generatedMembers = [];

                for (idx = 0; idx < expandedColumns.length; idx++) {

                    for (j=start; j < expandedColumns.length; j++) {
                        name = expandedColumns[j].name;

                        var tmpMembers = trimSameHierarchyChildDescriptors(members);

                        if ($.inArray(expandedColumns[j], sameHierarchyMembers) > -1) {
                            tmpMembers = trimSameHierarchyChildDescriptorsForName(members, name);
                        }

                        var tmp = crossJoinCommand(expandMemberDescriptor(tmpMembers, expandedMemberNames.concat(name)), measures);
                        if ($.inArray(tmp, generatedMembers) == -1) {
                            command += ",";
                            command += tmp;
                            generatedMembers.push(tmp);
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

    var filterFunctionFormats = {
        contains: ", InStr({0}.MemberValue,\"{1}\")",
        startswith: ", Left({0}.MemberValue,Len(\"{1}\"))=\"{1}\"",
        endswith: ", Right({0}.MemberValue,Len(\"{1}\"))=\"{1}\""
    }

    function serializeFilters(filter) {
        var command = "";

        var filters = filter.filters;
        for (var idx = 0; idx < filters.length; idx++) {
            if (filters[idx].operator == "in") {
                command += "{";
                command += filters[idx].value;
                command += "}";
            } else {
                command += "Filter("

                var name = filters[idx].field;

                if (name.indexOf("&") == -1) {
                    name += ".[ALL]";
                }

                name += ".Children";

                command += name;
                command += kendo.format(filterFunctionFormats[filters[idx].operator], filters[idx].field, filters[idx].value);
                command += ")";
            }

            if (idx < filters.length - 1) {
                command += ",";
            }
        }

        return command;
    }

    function serializeOptions(parentTagName, options, capitalize) {
        var result = "";

        if (options) {
            result += "<" + parentTagName + ">";
            var value;
            for (var key in options) {
                value = options[key] ;
                if (capitalize) {
                    key = key.replace(/([A-Z]+(?=$|[A-Z][a-z])|[A-Z]?[a-z]+)/g, "$1_").toUpperCase().replace(/_$/, "");
                }
                result += "<" + key + ">" + value + "</" + key + ">";
            }
            result += "</" + parentTagName + ">";
        } else {
            result += "<" + parentTagName + "/>";
        }
        return result;
    }

    var xmlaDiscoverCommands = {
        schemaCubes: "MDSCHEMA_CUBES",
        schemaCatalogs: "DBSCHEMA_CATALOGS",
        schemaMeasures: "MDSCHEMA_MEASURES",
        schemaDimensions: "MDSCHEMA_DIMENSIONS",
        schemaHierarchies: "MDSCHEMA_HIERARCHIES",
        schemaLevels: "MDSCHEMA_LEVELS"
    };

    var convertersMap = {
        read: function(options, type) {
            var command = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><Execute xmlns="urn:schemas-microsoft-com:xml-analysis"><Command><Statement>';

            command += "SELECT NON EMPTY {";

            var columns = removeAllFromDescriptors(options.columns || []);
            var rows = removeAllFromDescriptors(options.rows || []);

            var measures = options.measures || [];
            var measuresRowAxis = options.measuresAxis === "rows";

            if (columns.length) {
                command += serializeMembers(columns, !measuresRowAxis ? measures : []);
            } else if (measures.length && !measuresRowAxis) {
                command += measures.join(",");
            }

            command += "} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS";

            if (rows.length || (measuresRowAxis && measures.length > 1)) {
                command += ", NON EMPTY {";

                if (rows.length) {
                    command += serializeMembers(rows, measuresRowAxis ? measures : []);
                } else {
                    command += measures.join(",");
                }

                command += "} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS";
            }

            if (options.filter) {
                command += " FROM ";
                command += "(SELECT (";
                command += serializeFilters(options.filter);
                command += ") ON 0 FROM [" + options.connection.cube + "])";
            } else {
                command += " FROM [" + options.connection.cube + "]";
            }

            if (measures.length == 1 && columns.length) {
                command += " WHERE (" + measures.join(",") + ")";
            }

            command += '</Statement></Command><Properties><PropertyList><Catalog>' + options.connection.catalog + '</Catalog></PropertyList></Properties></Execute></Body></Envelope>';
            return command.replace(/\&/g, "&amp;");
        },
        discover: function(options, type) {
            options = options || {};

            var command = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><Discover xmlns="urn:schemas-microsoft-com:xml-analysis">';
            command += "<RequestType>" + (xmlaDiscoverCommands[options.command] || options.command) + "</RequestType>";

            command += "<Restrictions>" + serializeOptions("RestrictionList", options.restrictions, true) + "</Restrictions>";

            if (options.connection && options.connection.catalog) {
                options.properties = $.extend({}, {
                    Catalog: options.connection.catalog
                }, options.properties);
            }

            command += "<Properties>" + serializeOptions("PropertyList", options.properties) + "</Properties>";

            command += '</Discover></Body></Envelope>';
            return command;
        }
    };

    var XmlaTransport = kendo.data.RemoteTransport.extend({
        init: function(options) {
            kendo.data.RemoteTransport.call(this, options);

            if ($.isFunction(options.discover)) {
                this.discover = options.discover;
            } else if (typeof options.discover === "string") {
                this.options.discover = {
                    url: options.discover
                };
            } else if (!options.discover) {
                this.options.discover = this.options.read;
            }
        },
        setup: function(options, type) {
            options.data = options.data || {};
            $.extend(true, options.data, { connection: this.options.connection });

            return kendo.data.RemoteTransport.fn.setup.call(this, options, type);
        },
        options: {
            parameterMap: function(options, type) {
                return convertersMap[type](options,type);
            }
        },

        discover: function(options) {
            return $.ajax(this.setup(options, "discover"));
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

    var schemaDataReaderMap = {
        cubes: {
            name: kendo.getter("CUBE_NAME['#text']", true),
            caption: kendo.getter("CUBE_CAPTION['#text']", true),
            description: kendo.getter("DESCRIPTION['#text']", true),
            type: kendo.getter("CUBE_TYPE['#text']", true)
        },
        catalogs: {
            name: kendo.getter("CATALOG_NAME['#text']", true),
            description: kendo.getter("DESCRIPTION['#text']", true)
        },
        measures: {
            name: kendo.getter("MEASURE_NAME['#text']", true),
            caption: kendo.getter("MEASURE_CAPTION['#text']", true),
            uniqueName: kendo.getter("MEASURE_UNIQUE_NAME['#text']", true),
            description: kendo.getter("DESCRIPTION['#text']", true),
            aggregator: kendo.getter("MEASURE_AGGREGATOR['#text']", true),
            groupName: kendo.getter("MEASUREGROUP_NAME['#text']", true),
            displayFolder: kendo.getter("MEASURE_DISPLAY_FOLDER['#text']", true),
            defaultFormat: kendo.getter("DEFAULT_FORMAT_STRING['#text']", true)
        },
        dimensions: {
            name: kendo.getter("DIMENSION_NAME['#text']", true),
            caption: kendo.getter("DIMENSION_CAPTION['#text']", true),
            description: kendo.getter("DESCRIPTION['#text']", true),
            uniqueName: kendo.getter("DIMENSION_UNIQUE_NAME['#text']", true),
            type: kendo.getter("DIMENSION_TYPE['#text']", true)
        },
        hierarchies: {
            name: kendo.getter("HIERARCHY_NAME['#text']", true),
            caption: kendo.getter("HIERARCHY_CAPTION['#text']", true),
            description: kendo.getter("DESCRIPTION['#text']", true),
            uniqueName: kendo.getter("HIERARCHY_UNIQUE_NAME['#text']", true),
            dimensionUniqueName: kendo.getter("DIMENSION_UNIQUE_NAME['#text']", true),
            displayFolder: kendo.getter("HIERARCHY_DISPLAY_FOLDER['#text']", true),
            origin: kendo.getter("HIERARCHY_ORIGIN['#text']", true),
            defaultMember: kendo.getter("DEFAULT_MEMBER['#text']", true)
        },
        levels: {
            name: kendo.getter("LEVEL_NAME['#text']", true),
            caption: kendo.getter("LEVEL_CAPTION['#text']", true),
            description: kendo.getter("DESCRIPTION['#text']", true),
            uniqueName: kendo.getter("LEVEL_UNIQUE_NAME['#text']", true),
            dimensionUniqueName: kendo.getter("DIMENSION_UNIQUE_NAME['#text']", true),
            displayFolder: kendo.getter("LEVEL_DISPLAY_FOLDER['#text']", true),
            orderingProperty: kendo.getter("LEVEL_ORDERING_PROPERTY['#text']", true),
            origin: kendo.getter("LEVEL_ORIGIN['#text']", true),
            hierarchyUniqueName: kendo.getter("HIERARCHY_UNIQUE_NAME['#text']", true)
        }
    };

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
        },
        _mapSchema: function(root, getters) {
            root = kendo.getter("DiscoverResponse.return.root", true)(root);
            var rows = asArray(kendo.getter("row", true)(root));

            var result = [];

            for (var idx = 0; idx < rows.length; idx++) {
                var obj = {};
                for (var key in getters) {
                    obj[key] = getters[key](rows[idx]);
                }
                result.push(obj);
            }

            return result;
        },
        measures: function(root) {
            return this._mapSchema(root, schemaDataReaderMap.measures);
        },
        hierarchies: function(root) {
            return this._mapSchema(root, schemaDataReaderMap.hierarchies);
        },
        levels: function(root) {
            return this._mapSchema(root, schemaDataReaderMap.levels);
        },
        dimensions: function(root) {
            return this._mapSchema(root, schemaDataReaderMap.dimensions);
        },
        cubes: function(root) {
            return this._mapSchema(root, schemaDataReaderMap.cubes);
        },
        catalogs: function(root) {
            return this._mapSchema(root, schemaDataReaderMap.catalogs);
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
            var columnBuilder;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._createLayout();

            that._columnBuilder = columnBuilder = new ColumnBuilder();
            that._rowBuilder = new RowBuilder();

            that._dataSource();

            that.columnsHeader.on("click", "span.k-icon", function() {
                var button = $(this);
                var path = button.attr(kendo.attr("path"));
                var expanded = button.hasClass(STATE_EXPANDED);
                var expandState = columnBuilder.expandState[path];

                columnBuilder.expandState[path] = !expanded;

                button.toggleClass(STATE_EXPANDED, !expanded)
                      .toggleClass(STATE_COLLAPSED, expanded);

                if (!expanded && expandState === undefined) {
                    that.dataSource.expandColumn($.parseJSON(path));
                } else {
                    that.refresh();
                }
            });

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
            var element = $(DIV).addClass("k-pivot-toolbar k-header")
                                .text(this.options.messages.filterFields);

            this.filterFields = element;
        },

        _measureFields: function() {
            this.measureFields = $(DIV).addClass("k-pivot-toolbar k-header")
                                       .text(this.options.messages.measureFields);
        },

        _columnFields: function() {
            this.columnFields = $(DIV).addClass("k-pivot-toolbar k-header")
                                      .text(this.options.messages.columnFields);
        },

        _rowFields: function() {
            this.rowFields = $(DIV).addClass("k-pivot-toolbar k-header")
                                   .text(this.options.messages.rowFields);
        },

        _columnsHeader: function() {
            this.columnsHeader = $('<div class="k-grid-header-wrap" />')
                                    .wrap('<div class="k-grid-header" />');
        },

        _rowsHeader: function() {
            this.rowsHeader = $('<div class="k-grid k-widget k-alt"/>');
        },

        _contentTable: function() {
            this.content = $('<div class="k-grid-content" />');
        },

        _createLayout: function() {
            var that = this;
            var layoutTable = $(LAYOUT_TABLE);
            var leftContainer = layoutTable.find(".k-pivot-rowheaders");
            var rightContainer = layoutTable.find(".k-pivot-table");
            var gridWrapper = $(DIV).addClass("k-grid k-widget");

            that._filterFields();

            that._measureFields();
            that._columnFields();

            that._rowFields();
            that._columnsHeader();

            that._rowsHeader();
            that._contentTable();

            leftContainer.append(that.measureFields);
            leftContainer.append(that.rowFields);
            leftContainer.append(that.rowsHeader);

            gridWrapper.append(that.columnsHeader.parent());
            gridWrapper.append(that.content);

            rightContainer.append(that.columnFields);
            rightContainer.append(gridWrapper);

            that.wrapper.append(that.filterFields);
            that.wrapper.append(layoutTable);

            //VIRTUAL DOM
            that.columnsHeaderTree = new kendo.dom.Tree(that.columnsHeader[0]);
            that.rowsHeaderTree = new kendo.dom.Tree(that.rowsHeader[0]);
            that.contentTree = new kendo.dom.Tree(that.content[0]);
        },

        _resize: function() {
            var contentTable = this.content.children("table");
            var contentWidth = contentTable.width();

            var rows = contentTable[0].rows;
            var columnsLength = rows[0] ? rows[0].children.length : 1;

            var calculatedWidth = columnsLength * 100;
            var minWidth = 100;

            if (contentWidth < calculatedWidth) {
                minWidth = Math.ceil((calculatedWidth / contentWidth) * 100);
            }

            contentTable.add(this.columnsHeader.children("table"))
                        .css("min-width", minWidth + "%");
        },

        refresh: function() {
            var that = this;
            var dataSource = that.dataSource;

            var axes = dataSource.axes();
            var columns = axes.columns || {};
            var tuples = columns.tuples || [];
            var rows = axes.rows || {};

            var data = dataSource.view();

            var columnsTree = that._columnBuilder.build(tuples || []);
            var rowsTree = that._rowBuilder.build(rows.tuples || []);

            that.columnsHeaderTree.render(columnsTree);
            that.rowsHeaderTree.render(rowsTree);
            that.contentTree.render(kendo_content(data, columnsTree, rowsTree));

            that._resize();
        }
    });

    var element = kendo.dom.element;
    var text = kendo.dom.text;

    var ColumnBuilder = Class.extend({
        init: function(options) {
            this._state(null);
            this.expandState = {};
        },

        build: function(tuples) {
            return [
                element("table", null, [this._thead(tuples)])
            ];
        },

        _thead: function(tuples) {
            var root = tuples[0];

            this._state(root);

            if (root) {
                this._buildRows(root, 0);
                this._normalizeRows();
            } else {
                this.rows.push(element("tr", null, kendo_th("")));
            }

            return element("thead", null, this.rows);
        },

        _memberIdx: function(members, parentMember) {
            var index = 0;
            var member = members[index];

            while(member && member.parentName !== parentMember.name) {
                index += 1;
                member = members[index];
            }

            return member ? index : index - 1;
        },

        _normalizeRows: function() {
            this._normalizeRowSpan();
            this._normalizeColSpan();
        },

        _normalizeRowSpan: function() {
            var rows = this.rows;
            var rowsLength = rows.length;
            var rowIdx = 0;
            var row;

            var cellsLength;
            var cellIdx;
            var cells;
            var cell;
            var attrName = kendo.attr("tuple-all");

            for (; rowIdx < rowsLength; rowIdx++) {
                row = rows[rowIdx];

                if (row.rowspan === 1) {
                    continue;
                }

                cells = row.children;

                cellIdx = 0;
                cellsLength = cells.length;

                for (; cellIdx < cellsLength; cellIdx++) {
                    cell = cells[cellIdx];

                    if (cell.attr[attrName]) {
                        cell.attr.rowspan = row.rowspan;
                    }
                }
            }
        },

        _normalizeColSpan: function() {
            var rootMembers = this.rootTuple.members;
            var idx = rootMembers.length - 1;
            var member = rootMembers[idx];

            var map = this.map;
            var row = map[member.name + member.levelNum];
            var colspan = this._rootRowColSpan(row);
            var currentColspan;

            while(idx) {
                idx -= 1;
                member = rootMembers[idx];
                row = map[member.name + member.levelNum];

                if (colspan > 1) {
                    row.children[row.children.length - 1].attr.colspan = colspan;
                }

                colspan = this._rootRowColSpan(row);
            }
        },

        _rootRowColSpan: function (row) {
            var children = row.children;
            var lastIdx = children.length - 1;
            var cell = children[lastIdx];
            var colspan = cell.attr.colspan || 1;

            if (cell.attr.rowspan > 1) {
                colspan += children[lastIdx - 1].attr.colspan;
            }

            return colspan;
        },

        _rowIndex: function(row) {
            var rows = this.rows;
            var length = rows.length;
            var idx = 0;

            for(; idx < length; idx++) {
                if (rows[idx] === row) {
                    break;
                }
            }

            return idx;
        },

        _row: function(tuple, memberIdx, parentMember) {
            var rootName = this.rootTuple.members[memberIdx].name;
            var levelNum = tuple.members[memberIdx].levelNum;
            var rowKey = rootName + levelNum;
            var map = this.map;
            var parentRow;
            var children;

            row = map[rowKey];

            if (!row) {
                row = element("tr", null, []);

                row.parentMember = parentMember;
                row.colspan = 0;
                row.rowspan = 1;

                map[rowKey] = row;
                parentRow = map[rootName + (Number(levelNum) - 1)];

                if (parentRow) {
                    children = parentRow.children;

                    if (children[1] && children[1].attr.class.indexOf("k-alt") === -1) {
                        row.notFirst = true;
                    } else {
                        row.notFirst = parentRow.notFirst;
                    }
                }

                this.rows.splice(this._rowIndex(parentRow) + 1, 0, row);
            } else {
                row.notFirst = false;
            }

            if (!row.parentMember || row.parentMember !== parentMember) {
                row.parentMember = parentMember;
                row.colspan = 0;
            }

            return row;
        },

        _tuplePath: function(tuple, index) {
            var path = [];
            var idx = 0;

            for(; idx <= index; idx++) {
                path.push(tuple.members[idx].name);
            }

            return path;
        },

        _buildRows: function(tuple, memberIdx, parentMember) {
            var members = tuple.members;
            var children;
            var childRow;
            var member;
            var row;

            var allCell;
            var cell;
            var cellAttr;
            var cellChildren = [];
            var path;

            var idx = 0;
            var childrenLength;

            var colspan;

            if (parentMember) {
                memberIdx = this._memberIdx(members, parentMember);
            }

            row = this._row(tuple, memberIdx, parentMember);

            member = members[memberIdx];

            children = member.children;
            childrenLength = children.length

            if (member.hasChildren) {
                path = kendo.stringify(this._tuplePath(tuple, memberIdx));

                if (this.expandState[path] === false) {
                    childrenLength = 0;
                }

                cellAttr = { class: "k-icon " + (childrenLength ? STATE_EXPANDED : STATE_COLLAPSED) };
                cellAttr[kendo.attr("path")] = path;

                cellChildren.push(element("span", cellAttr));
            }

            cellChildren.push(text(member.caption || member.name));
            cell = element("th", { class: "k-header" + (row.notFirst ? " k-first" : "") }, cellChildren);

            row.children.push(cell);
            row.colspan += 1;

            if (childrenLength) {
                allCell = element("th", { class: "k-header k-alt" }, [text(member.caption || member.name)]);
                row.children.push(allCell);

                for (; idx < childrenLength; idx++) {
                    childRow = this._buildRows(children[idx], 0, member);
                }

                colspan = childRow.colspan;
                cell.attr.colspan = colspan;

                row.colspan += colspan;
                row.rowspan = childRow.rowspan + 1;

                if (members[memberIdx + 1]) {
                    var newRow = this._buildRows(tuple, ++memberIdx);

                    allCell.attr.colspan = newRow.colspan;
                    row.colspan += newRow.colspan - 1;
                }
            } else if (members[memberIdx + 1]) {
                childRow = this._buildRows(tuple, ++memberIdx);

                if (childRow.colspan > 1) {
                    cell.attr.colspan = childRow.colspan;
                    row.colspan += childRow.colspan - 1;
                }
            }

            (allCell || cell).attr[kendo.attr("tuple-all")] = true;

            return row;
        },

        _state: function(rootTuple) {
            this.rows = [];
            this.map = {};
            this.rootTuple = rootTuple;
        }
    });

    //row headers
    //
    var RowBuilder = Class.extend({
        init: function(options) {
            this._state(null);
            this.expandState = {};
        },

        build: function(tuples) {
            return [
                element("table", null, [this._thead(tuples)])
            ];
        },

        _thead: function(tuples) {
            var root = tuples[0];

            this._state(root);

            if (root) {
                this._buildRows(root, 0);
                //this._normalizeColSpan();
            } else {
                this.rows.push(element("tr", null, kendo_th("")));
            }

            return element("thead", null, this.rows);
        },

        _normalizeColSpan: function() {
            var members = this.rootTuple.members;
            var length = members.length;
            var map = this.map;
            var idx = 0;
            var cell;
            var name;

            for (; idx < length; idx++) {
                name = members[idx].name;
                cell = (map[name + "all"] || map[name]).children[0];

                if (cell.colspan < this._maxColSpan) {
                    cell.colspan = this._maxColSpan;
                }
            }
        },

        _memberIdx: function(members, parentMember) {
            var index = 0;
            var member = members[index];

            while(member && member.parentName !== parentMember.name) {
                index += 1;
                member = members[index];
            }

            return member ? index : index - 1;
        },

        _rowIndex: function(row) {
            var rows = this.rows;
            var length = rows.length;
            var idx = 0;

            for(; idx < length; idx++) {
                if (rows[idx] === row) {
                    break;
                }
            }

            return idx;
        },

        _tuplePath: function(tuple, index) {
            var path = [];
            var idx = 0;

            for(; idx <= index; idx++) {
                path.push(tuple.members[idx].name);
            }

            return path;
        },

        _buildRows: function(tuple, memberIdx) {
            var rows = this.rows;
            var map = this.map;

            var members = tuple.members;
            var member = members[memberIdx];
            var children = member.children;

            var tuplePath = this._tuplePath(tuple, memberIdx - 1).join("");

            var parentName = tuplePath + (member.parentName || "");
            var row = map[parentName + "all"] || map[parentName];
            var allRow;

            if (!row || row.hasChild) {
                row = element("tr", null);
                row.rowspan = 1;
                rows.push(row);
            } else {
                row.hasChild = true;
            }

            var colspanName = this.rootTuple.members[memberIdx].name + "_colspan";

            if (!row[colspanName]) {
                row[colspanName] = 0;
            }

            map[tuplePath + member.name] = row;

            var childRow;

            var allCell;
            var colspan;

            var cell = element("td", null, [text(member.caption || member.name)]);

            row.children.push(cell);

            colspan = row[colspanName];

            row[colspanName] += 1;

            if (children[0]) {
                row.hasChild = false;

                for (var idx = 0; idx < children.length; idx++) {
                    childRow = this._buildRows(children[idx], memberIdx);

                    //row[colspanName] = childRow[colspanName];

                    if (row !== childRow) {
                        row.rowspan += childRow.rowspan;
                    }
                }

                if (row.rowspan > 1) {
                    cell.attr.rowspan = row.rowspan;
                }

                allCell = element("td", null, [text(member.caption || member.name)]);

                allCell.attr.colspan = row[colspanName] - colspan;

                allRow = element("tr", null, [allCell]);
                allRow.rowspan = 1;
                row.rowspan += 1;

                rows.push(allRow);
                map[tuplePath + member.name + "all"] = allRow; //TODO: Test this!

                if (members[memberIdx + 1]) {
                    childRow = this._buildRows(tuple, memberIdx + 1);

                    allCell.attr.rowspan = childRow.rowspan;
                }

            } else if (members[memberIdx + 1]) {
                row.hasChild = false;
                this._buildRows(tuple, memberIdx + 1);

                (allCell || cell).attr.rowspan = row.rowspan;
            }

            return row;
        },

        _state: function(rootTuple) {
            this.rows = [];
            this.map = {};
            this.mapCells = {};
            this.rootTuple = rootTuple;
            this.rootIndex = 0;
        },

        _rowLength: function(row) {
            var idx = 0;
            var rowLength = 0;
            var children = row.children;
            var length = children.length;

            for (; idx < length; idx++) {
                rowLength += (children[idx].attr.colspan || 1);
            }

            return rowLength;
        }
    });

    function kendo_th(member, attr) {
        return element("th", attr, [text(member.caption || member.name)]);
    }

    function kendo_row_headers(rows) {
        return [ element("table", null, [kendo_row_thead(rows)]) ];
    }

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
                member = {
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
    }

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
