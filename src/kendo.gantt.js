(function(f, define){
    define(["./kendo.data", "./kendo.gantt.list", "./kendo.gantt.timeline"], f);
})(function(){

var __meta__ = {
    id: "gantt",
    name: "Gantt",
    category: "web",
    description: "The Gantt component.",
    depends: [ "data", "gantt.list", "gantt.timeline" ]
};

(function($, undefined) {

    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var DataSource = kendo.data.DataSource;
    var Query = kendo.data.Query;
    var isArray = $.isArray;
    var proxy = $.proxy;
    var extend = $.extend;
    var map = $.map;
    var TIME_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 't')#");
    var DAY_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'ddd M/dd')#");
    var WEEK_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#");
    var MONTH_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'MMM')#");

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;

        delete options.remove;
        delete options.edit;
        delete options.add;
        delete options.navigate;

        return options;
    }

    var createDataSource = function(type, name) {
        return function(options) {
            options = isArray(dataSource) ? { data: options } : options;

            var dataSource = options || {};
            var data = dataSource.data;

            dataSource.data = data;

            if (!(dataSource instanceof type) && dataSource instanceof DataSource) {
                throw new Error("Incorrect DataSource type. Only " + name + " instances are supported");
            }

            return dataSource instanceof type ? dataSource : new type(dataSource);
        };
    };

    var GanttDependency = kendo.data.Model.define({
        id: "id",
        fields: {
            id: { type: "number" },
            predecessorId: { type: "number" },
            successorId: { type: "number" },
            type: { type: "number" }
        }
    });

    var GanttDependencyDataSource = DataSource.extend({
        init: function(options) {
            DataSource.fn.init.call(this, extend(true, {}, {
                schema: {
                    modelBase: GanttDependency,
                    model: GanttDependency
                }
            }, options));
        },

        successors: function(id) {
            return this._dependencies("predecessorId", id);
        },

        predecessors: function(id) {
            return this._dependencies("successorId", id);
        },

        _dependencies: function(field, id) {
            var data = this.view();
            var filter = {
                field: field,
                operator: "eq",
                value: id
            };

            data = new Query(data).filter(filter).toArray();

            return data;
        }
    });

    GanttDependencyDataSource.create = createDataSource(GanttDependencyDataSource, "GanttDependencyDataSource");

    var GanttTask = kendo.data.Model.define({

        duration: function() {
            var end = this.end;
            var start = this.start;

            return end - start;
        },

        isMilestone: function() {
            return this.duration() === 0;
        },

        _offset: function(value) {
            var field = ["start", "end"];
            var newValue;

            for (var i = 0; i < field.length; i++) {
                newValue = new Date(this.get(field[i]).getTime() + value);
                this.set(field[i], newValue);
            }
        },

        id: "id",
        fields: {
            id: { type: "number" },
            parentId: { type: "number", defaultValue: null, validation: { required: true } },
            orderId: { type: "number", validation: { required: true } },
            title: { defaultValue: "", type: "string" },
            start: { type: "date", validation: { required: true } },
            end: { type: "date", validation: { required: true } },
            percentComplete: { type: "number" },
            summary: { type: "boolean" }
        }
    });

    var GanttDataSource = DataSource.extend({
        init: function(options) {
            DataSource.fn.init.call(this, extend(true, {}, {
                schema: {
                    modelBase: GanttTask,
                    model: GanttTask
                }
            }, options));
        },

        remove: function(task) {
            var parentId = task.get("parentId");

            task = DataSource.fn.remove.call(this, task);
            
            this._childRemoved(parentId, task.get("orderId"));

            return task;
        },

        add: function(task) {
            return this.insert(this.taskSiblings(task).length, task);
        },

        insert: function(index, task) {
            if (!task) {
                return;
            }

            task.set("orderId", index);

            task = DataSource.fn.insert.call(this, index, task);

            this._reorderSiblings(task, this.taskSiblings(task).length - 1);
            this._updateSummary(this.taskParent(task));

            return task;
        },

        taskChildren: function(task) {
            var data = this.view();
            var filter = {
                field: "parentId",
                operator: "eq",
                value: null
            }; 
            var order = this._sort || {
                field: "orderId",
                dir: "asc"
            };

            if (!!task) {
                filter.value = task.get("id");
            }

            data = new Query(data).filter(filter).sort(order).toArray();

            return data;
        },

        taskAllChildren: function(task) {
            var data = [];
            var that = this;
            var callback = function(task) {
                var tasks = that.taskChildren(task);

                data.push.apply(data, tasks);
                map(tasks, callback);
            };

            if (!!task) {
                callback(task);
            } else {
                data = this.view();
            }

            return data;
        },

        taskSiblings: function(task) {
            if (!task) {
                return null;
            }

            var parent = this.taskParent(task);

            return this.taskChildren(parent);
        },

        taskParent: function(task) {
            if (!task || task.get("parentId") === null) {
                return null;
            }
            return this.get(task.parentId);
        },

        taskLevel: function(task) {
            var level = 0;
            var parent = this.taskParent(task);

            while (parent !== null) {
                level += 1;
                parent = this.taskParent(parent);
            }

            return level;
        },

        taskTree: function(task) {
            var data = [];
            var tasks = this.taskChildren(task);

            for (var i = 0, l = tasks.length; i < l; i++) {
                data.push(tasks[i]);

                var children = this.taskTree(tasks[i]);

                data.push.apply(data, children);
            }

            return data;
        },

        update: function(task, taksInfo) {
            var that = this;
            var oldValue;

            var updateParents = function(task, field, callback) {
                var parent = that.taskParent(task);

                if (!parent) {
                    return;
                }

                var value = callback(parent);

                parent.set(field, value);
                updateParents(parent, field, callback);
            };

            var offsetChildren = function(parentTask, offset) {
                var children = that.taskAllChildren(parentTask);

                for (var i = 0, l = children.length; i < l; i++) {
                    children[i]._offset(offset);
                }
            };

            var updateStartCallback = function(parentTask) {
                var children = that.taskChildren(parentTask);
                var min = children[0].start.getTime();
                var currentMin;

                for (var i = 1, l = children.length; i < l; i++) {
                    currentMin = children[i].start.getTime();
                    if (currentMin < min) {
                        min = currentMin;
                    }
                }

                return new Date(min);
            };

            var updateEndCallback = function(parentTask) {
                var children = that.taskChildren(parentTask);
                var max = children[0].end.getTime();
                var currentMax;

                for (var i = 1, l = children.length; i < l; i++) {
                    currentMax = children[i].end.getTime();
                    if (currentMax > max) {
                        max = currentMax;
                    }
                }

                return new Date(max);
            };

            var updatePercentCompleteCallback = function(parentTask) {
                var children = that.taskChildren(parentTask);
                var percentComplete = new Query(children).aggregate([{
                    field: "percentComplete",
                    aggregate: "average"
                }]);

                return percentComplete[field].average;
            };

            if (taksInfo.parentId !== undefined) {
                oldValue = task.get("parentId");
                task.set("parentId", taksInfo.parentId);

                this._childRemoved(oldValue, task.get("orderId"));

                task.set("orderId", this.taskSiblings(task).length - 1);

                this._updateSummary(this.taskParent(task));

                delete taksInfo.parentId;
            }

            for (var field in taksInfo) {
                oldValue = task.get(field);

                task.set(field, taksInfo[field]);

                switch (field) {
                    case "start":
                        updateParents(task, field, updateStartCallback);
                        offsetChildren(task, task.get(field).getTime() - oldValue.getTime());
                        break;
                    case "end":
                        updateParents(task, field, updateEndCallback);
                        break;
                    case "percentComplete":
                        updateParents(task, field, updatePercentCompleteCallback);
                        break;
                    case "orderId":
                        this._reorderSiblings(task, oldValue);
                        break;
                }
            }
        },

        _range: function() {
            var data = this.view();
            var startOrder = {
                field: "start",
                dir: "asc"
            };
            var endOrder = {
                field: "end",
                dir: "desc"
            };

            if (!data.length) {
                return { start: new Date(), end: new Date() };
            }

            var start = new Query(data).sort(startOrder).toArray()[0].start || new Date();
            var end = new Query(data).sort(endOrder).toArray()[0].end || new Date();

            return {
                start: start,
                end: end
            };
        },

        _childRemoved: function(parentId, index) {
            var parent = parentId === null ? null : this.get(parentId);
            var children = this.taskChildren(parent);

            for (var i = index, l = children.length; i < l; i++) {
                children[i].set("orderId", i);
            }

            this._updateSummary(parent);
        },

        _reorderSiblings: function(task, oldOrderId) {
            var orderId = task.get("orderId");
            var direction = orderId > oldOrderId;
            var startIndex = direction ? oldOrderId : orderId;
            var endIndex = direction ? orderId : oldOrderId;
            var newIndex = direction ? startIndex : startIndex + 1;
            var siblings = this.taskSiblings(task);

            endIndex = Math.min(endIndex, siblings.length - 1);

            for (var i = startIndex; i <= endIndex; i++) {
                if (siblings[i] === task) {
                    continue;
                }

                siblings[i].set("orderId", newIndex);

                newIndex += 1;
            }
        },

        _updateSummary: function(task) {
            if (task !== null) {
                var childCount = this.taskChildren(task).length;

                task.set("summary", childCount > 0);
            }
        }
    });

    GanttDataSource.create = createDataSource(GanttDataSource, "GanttDataSource");

    extend(true, kendo.data, {
        GanttDataSource: GanttDataSource,
        GanttTask: GanttTask,
        GanttDependencyDataSource: GanttDependencyDataSource,
        GanttDependency: GanttDependency
    });

    var Gantt = Widget.extend({
        init: function(element, options) {
            if (isArray(options)) {
                options = { dataSource: options };
            }

            Widget.fn.init.call(this, element, options);

            this._wrapper();

            this._timeline();

            this._dataSource();

            this._list();

            this._dependencies();

            if (this.options.autoBind) {
                this.dataSource.fetch();
                this.dependencies.fetch();
            }

            kendo.notify(this);
        },

        events: [
            "dataBinding",
            "dataBound"
        ],

        options: {
            name: "Gantt",
            autoBind: true,
            views: [],
            timeHeaderTemplate: TIME_HEADER_TEMPLATE,
            dayHeaderTemplate: DAY_HEADER_TEMPLATE,
            weekHeaderTemplate: WEEK_HEADER_TEMPLATE,
            monthHeaderTemplate: MONTH_HEADER_TEMPLATE,
            showWorkHours: true,
            showWorkDays: true,
            workDayStart: new Date(1980, 1, 1, 8, 0, 0),
            workDayEnd: new Date(1980, 1, 1, 17, 0, 0),
            workWeekStart: 1,
            workWeekEnd: 5,
            hourSpan: 1
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.timeline.destroy();

            if (this.list) {
                this.list.destroy();
            }
        },

        _wrapper: function() {
            var options = this.options;
            var height = options.height;
            var width = options.width;

            this.wrapper = this.element
                            .addClass("k-widget k-gantt")
                            .append("<div class='k-gantt-toolbar'>")
                            .append("<div class='k-gantt-layout k-gantt-treelist'><div class='k-grid k-widget'></div></div>")
                            .append("<div class='k-gantt-layout'><div class='k-widget k-gantt-timeline'></div></div>");

            if (height) {
                this.wrapper.height(height);
            }

            if (width) {
                this.wrapper.width(width);
            }
        },

        _list: function () {
            var options = extend({}, { columns: this.options.columns || [], dataSource: this.dataSource });
            var element = this.wrapper.find(".k-gantt-treelist > .k-grid");
            var that = this;

            this.list = new kendo.ui.GanttList(element, options);

            this.list
                .bind("update", function() { that.refresh(); });
        },

        _timeline: function () {
            var options = trimOptions(extend(true, {}, this.options));
            var element = this.wrapper.find(".k-gantt-timeline");

            this.timeline = new kendo.ui.GanttTimeline(element, options);
        },

        _dataSource: function() {
            var options = this.options;
            var dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (this.dataSource && this._refreshHandler) {
                this.dataSource
                    .unbind("change", this._refreshHandler)
                    .unbind("error", this._errorHandler);
            } else {
                this._refreshHandler = proxy(this.refresh, this);
                this._errorHandler = proxy(this._error, this);
            }

            this.dataSource = kendo.data.GanttDataSource.create(dataSource)
                .bind("change", this._refreshHandler)
                .bind("error", this._errorHandler);
        },

        _dependencies: function() {
            var dependencies = this.options.dependencies || {};
            var dataSource = isArray(dependencies) ? { data: dependencies } : dependencies;

            this.dependencies = kendo.data.GanttDependencyDataSource.create(dataSource);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                dataSource.fetch();
            }
        },

        refresh: function(e) {
            if (this._preventRender || this.list.editable) {
                return;
            }

            var dataSource = this.dataSource;
            var taskTree = dataSource.taskTree();

            if (this.trigger("dataBinding")) {
                return;
            }

            this.list._render(taskTree);
            this.timeline._render(taskTree, dataSource._range());
            this.timeline._renderDependencies(this.dependencies.view());

            this.trigger("dataBound");
        },

        _error: function() {

        }
    });

    kendo.ui.plugin(Gantt);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
