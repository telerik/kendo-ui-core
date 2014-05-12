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
    var Observable = kendo.Observable;
    var Widget = kendo.ui.Widget;
    var DataSource = kendo.data.DataSource;
    var Query = kendo.data.Query;
    var isArray = $.isArray;
    var proxy = $.proxy;
    var extend = $.extend;
    var map = $.map;
    var NS = ".kendoGantt";
    var CLICK = "click";
    var DIRECTIONS = {
        "down": {
            origin: "bottom center",
            position: "top center"
        },
        "up": {
            origin: "top center",
            position: "bottom center"
        }
    };
    var TOOLBAR_CLASS_NAMES = "k-floatwrap k-header k-gantt-toolbar k-scheduler-toolbar";
    var FOOTER_CLASS_NAMES = "k-floatwrap k-header k-gantt-footer k-scheduler-footer";
    var TIME_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 't')#");
    var DAY_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'ddd M/dd')#");
    var WEEK_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#");
    var MONTH_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'MMM')#");
    var HEADER_TEMPLATE = kendo.template('<div class="#=styles#">' +
            '<ul class="k-reset k-header k-toolbar k-gantt-actions">' +
                '<li class="k-state-default" data-action="#=action.data#"><a href="\\#" class="k-link">#=action.title#</a></li>' +
            '</ul>' +
            '<ul class="k-reset k-header k-toolbar k-gantt-views">' +
                '#for(var view in views){#' +
                    '<li class="k-state-default k-view-#= view.toLowerCase() #" data-#=ns#name="#=view#"><a href="\\#" class="k-link">#=views[view].title#</a></li>' +
                '#}#' +
            '</ul>' +
        '</div>');
    var TASK_DROPDOWN_TEMPLATE = kendo.template('<div class="k-list-container">' +
            '<ul class="k-list k-reset">' +
                '#for(var i = 0, l = actions.length; i < l; i++){#' +
                    '<li class="k-item" data-action="#=actions[i].data#">#=actions[i].text#</span>' +
                '#}#' +
            '</ul>' +
        '</div>');
    var FOOTER_TEMPLATE = kendo.template('<div class="#=styles#">' +
            '<ul class="k-reset k-header k-toolbar k-gantt-actions">' +
                '<li class="k-state-default" data-action="#=action.data#"><a href="\\#" class="k-link">#=action.title#</a></li>' +
            '</ul>' +
        '</div>');

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;

        delete options.remove;
        delete options.edit;
        delete options.add;
        delete options.navigate;

        return options;
    }

    var TaskDropDown = Observable.extend({
        init: function(element, options) {

            Observable.fn.init.call(this);

            this.element = element;
            this.options = extend(true, {}, this.options, options);

            this._popup();
        },

        options: {
            direction: "down"
        },

        _popup: function() {
            var that = this;
            var actions = this.options.messages.actions;

            this.list = $(TASK_DROPDOWN_TEMPLATE({
                actions: [
                    {
                        data: "add",
                        text: actions.addChild
                    },
                    {
                        data: "insert-before",
                        text: actions.insertBefore
                    },
                    {
                        data: "insert-after",
                        text: actions.insetAfter
                    }
                ]
            }));

            this.element.append(this.list);

            this.popup = new kendo.ui.Popup(this.list,
                extend({ anchor: this.element }, DIRECTIONS[this.options.direction])
            );

            this.element.on("click" + NS, "li", function(e) {
                var target = $(this);
                var action = target.attr(kendo.attr("action"));

                e.preventDefault();

                if (action) {
                    that.trigger("command", { type: action });
                } else {
                    that.popup.open();
                }
            });

            this.list.on("click" + NS, "li.k-item", function(e) {
                that.trigger("command", { type: $(this).attr(kendo.attr("action")) });
                that.popup.close();
            });
        },

        destroy: function() {
            this.popup.destroy();
            this.element.off(NS);
            this.list.off(NS);
            this.unbind();
        }
    });

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
            title: { type: "string", defaultValue: "" },
            start: { type: "date", validation: { required: true } },
            end: { type: "date", validation: { required: true } },
            percentComplete: { type: "number", validation: { required: true, min:0, max: 1, step: 0.01 } },
            summary: { type: "boolean" },
            expanded: { type: "boolean", defaultValue: true }
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
            var taskId;

            if (!!task) {
                taskId = task.get("id");

                if (taskId === undefined || taskId === null) {
                    return [];
                }

                filter.value = taskId;
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
            var current;
            var tasks = this.taskChildren(task);

            for (var i = 0, l = tasks.length; i < l; i++) {
                current = tasks[i];
                data.push(current);

                if (current.get("expanded")) {
                    var children = this.taskTree(current);

                    data.push.apply(data, children);
                }
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

            var modelChangeHandler = function(e) {
                var field = e.field;
                var model = e.sender;

                switch (field) {
                    case "start":
                        updateParents(model, field, updateStartCallback);
                        offsetChildren(model, model.get(field).getTime() - oldValue.getTime());
                        break;
                    case "end":
                        updateParents(model, field, updateEndCallback);
                        break;
                    case "percentComplete":
                        updateParents(model, field, updatePercentCompleteCallback);
                        break;
                    case "orderId":
                        that._reorderSiblings(model, oldValue);
                        break;
                }
            };

            var parentChangeHandler = function(e) {
                var model = e.sender;
                that._childRemoved(oldValue, model.get("orderId"));

                model.set("orderId", that.taskSiblings(model).length - 1);

                that._updateSummary(that.taskParent(model));
            };

            if (taksInfo.parentId !== undefined) {
                oldValue = task.get("parentId");

                task.bind("change", parentChangeHandler);

                task.set("parentId", taksInfo.parentId);

                delete taksInfo.parentId;

                task.unbind("change", parentChangeHandler);
            }

            task.bind("change", modelChangeHandler);

            for (var field in taksInfo) {
                oldValue = task.get(field);
                task.set(field, taksInfo[field]);
            }

            task.unbind("change", modelChangeHandler);
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

            this._toolbar();

            this._footer();

            this.timeline.view(this.timeline._selectedViewName);

            this._dataSource();

            this._dropDowns();

            this._list();

            this._dependencies();

            this._resizable();

            if (this.options.autoBind) {
                this.dataSource.fetch();
                this.dependencies.fetch();
            }

            kendo.notify(this);
        },

        events: [
            "dataBinding",
            "dataBound",
            "add",
            "remove",
            "change",
            "navigate",
            "moveStart",
            "move",
            "moveEnd",
            "resizeStart",
            "resize",
            "resizeEnd"
        ],

        options: {
            name: "Gantt",
            autoBind: true,
            selectable: true,
            views: [],
            messages: {
                views: {
                    day: "Day",
                    week: "Week",
                    month: "Month"
                },
                actions: {
                    append: "Add Task",
                    addChild: "Add Child",
                    insertBefore: "Add Above",
                    insetAfter: "Add Below"
                }
            },
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
            hourSpan: 1,
            snap: true
        },

        select: function(value) {
            var list = this.list;

            if (!value) {
                return list.select();
            }

            list.select(value);

            return;
        },

        clearSelection: function() {
            this.list.clearSelection();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            
            if (this.timeline) {
                this.timeline.unbind();
                this.timeline.destroy();
            }

            if (this.list) {
                this.list.unbind();
                this.list.destroy();
            }

            if (this.footerDropDown) {
                this.footerDropDown.destroy();
            }

            if (this.headerDropDown) {
                this.headerDropDown.destroy();
            }

            if (this._resizeDraggable) {
                this._resizeDraggable.destroy();
            }

            this.toolbar.off(NS);

            this.toolbar = null;
            this.footer = null;
        },

        _wrapper: function() {
            var options = this.options;
            var height = options.height;
            var width = options.width;

            this.wrapper = this.element
                            .addClass("k-widget k-gantt")
                            .append("<div class='k-gantt-layout k-gantt-treelist'><div class='k-grid k-widget'></div></div>")
                            .append("<div class='k-splitbar k-state-default k-splitbar-horizontal k-splitbar-draggable-horizontal k-gantt-layout' role='separator'><div class='k-icon k-resize-handle'></div></div>")
                            .append("<div class='k-gantt-layout k-gantt-grid'><div class='k-widget k-gantt-timeline k-grid'></div></div>");

            if (height) {
                this.wrapper.height(height);
            }

            if (width) {
                this.wrapper.width(width);
            }
        },

        _toolbar: function() {
            var that = this;
            var toolbar = $(HEADER_TEMPLATE({
                ns: kendo.ns,
                views: this.timeline.views,
                styles: TOOLBAR_CLASS_NAMES,
                action: {
                    data: "add",
                    title: this.options.messages.actions.append
                }
            }));

            this.wrapper.prepend(toolbar);
            this.toolbar = toolbar;

            toolbar
                .on(CLICK + NS, ".k-gantt-views li", function(e) {
                    e.preventDefault();

                    var name = $(this).attr(kendo.attr("name"));

                    if (!that.trigger("navigate", { view: name })) {
                        that.timeline.view(name);
                        that.refresh();
                    }
                });

            toolbar
                .find(".k-toolbar li")
                .hover(function() {
                    $(this).addClass("k-state-hover");
                }, function() {
                    $(this).removeClass("k-state-hover");
                });
        },

        _footer: function() {
            var footer = $(FOOTER_TEMPLATE({
                styles: FOOTER_CLASS_NAMES,
                action: {
                    data: "add",
                    title: this.options.messages.actions.append
                }
            }));

            this.wrapper.append(footer);
            this.footer = footer;
        },

        _dropDowns: function() {
            var that = this;
            var actionMessages = this.options.messages.actions;
            var dataSource = this.dataSource;
            var timeline = this.timeline;

            var handler = function(e) {
                var type = e.type;
                var orderId;
                var task = new GanttTask();
                var selected = that.dataItem(that.select());
                var parent = dataSource.taskParent(selected);
                var firstSlot = timeline.view()._timeSlots()[0];
                var target = type === "add" ? selected : parent;

                task.set("title", "New task");

                if (target) {
                    task.set("parentId", target.get("id"));
                    task.set("start", target.get("start"));
                    task.set("end", target.get("end"));
                } else {
                    task.set("start", firstSlot.start);
                    task.set("end", firstSlot.end);
                }

                if (that.trigger("add", { task: task })) {
                    return;
                }

                that._preventRefresh = true;

                if (type === "add") {
                    dataSource.add(task);
                } else {
                    orderId = selected.get("orderId");
                    orderId = type === "insert-before" ? orderId : orderId + 1;

                    dataSource.insert(orderId, task);
                }

                that._preventRefresh = false;

                dataSource.sync();
            };

            this.footerDropDown = new TaskDropDown(this.footer.children(".k-gantt-actions").eq(0), {
                messages: {
                    actions: actionMessages
                },
                direction: "up"
            });

            this.headerDropDown = new TaskDropDown(this.toolbar.children(".k-gantt-actions").eq(0), {
                messages: {
                    actions: actionMessages
                }
            });

            this.footerDropDown.bind("command", handler);
            this.headerDropDown.bind("command", handler);
        },

        _list: function() {
            var that = this;
            var toggleButtons = this.element.find(".k-gantt-actions > li");
            var options = extend({}, {
                columns: this.options.columns || [],
                dataSource: this.dataSource,
                selectable: this.options.selectable
            });
            var element = this.wrapper.find(".k-gantt-treelist > .k-grid");

            this.list = new kendo.ui.GanttList(element, options);

            this.list
                .bind("update", function(e) {
                    that.updateTask(e.task, e.updateInfo);
                })
                .bind("change", function() {
                    that.trigger("change");

                    var selection = that.list.select();

                    if (selection.length) {
                        toggleButtons.removeAttr("data-action", "add");
                        that.timeline.select("[data-uid='" + selection.attr("data-uid") + "']");
                    } else {
                        toggleButtons.attr("data-action", "add");
                        that.timeline.clearSelection();
                    }
                });
        },

        _timeline: function() {
            var that = this;
            var options = trimOptions(extend(true, {}, this.options));
            var element = this.wrapper.find(".k-gantt-timeline");

            this.timeline = new kendo.ui.GanttTimeline(element, options);

            this.timeline
                .bind("navigate", function(e) {
                    that.toolbar
                        .find(".k-gantt-views > li")
                        .removeClass("k-state-selected")
                        .end()
                        .find(".k-view-" + e.view.replace(/\./g, "\\.").toLowerCase())
                        .addClass("k-state-selected");
                })
                .bind("moveStart", function(e) {
                    if (that.trigger("moveStart", { task: e.task })) {
                        e.preventDefault();
                    }
                })
                .bind("move", function(e) {
                    var task = e.task;
                    var start = e.start;
                    var end = new Date(start.getTime() + task.duration());

                    if (that.trigger("move", { task: task, start: start, end: end })) {
                        e.preventDefault();
                    }
                })
                .bind("moveEnd", function(e) {
                    var task = e.task;
                    var start = e.start;
                    var end = new Date(start.getTime() + task.duration());
                    
                    if (!that.trigger("moveEnd", { task: task, start: start, end: end })) {
                        that.updateTask(that.dataSource.getByUid(task.uid), {
                            start: start,
                            end: end
                        });
                    }
                })
                .bind("resizeStart", function(e) {
                    if (that.trigger("resizeStart", { task: e.task })) {
                        e.preventDefault();
                    }
                })
                .bind("resize", function(e) {
                    if (that.trigger("resize", { task: e.task, date: e.date })) {
                        e.preventDefault();
                    }
                })
                .bind("resizeEnd", function(e) {
                    var task = e.task;
                    var updateInfo = {};

                    if (e.resizeStart) {
                        updateInfo.start = e.date;
                    } else {
                        updateInfo.end = e.date;
                    }
                    
                    if (!that.trigger("resizeEnd", { task: task, date: e.date })) {
                        that.updateTask(that.dataSource.getByUid(task.uid), updateInfo);
                    }
                })
                .bind("select", function(e) {
                    that.select("[data-uid='" + e.uid + "']");
                })
                .bind("clear", function(e) {
                    that.clearSelection();
                })
                .bind("remove", function(e) {
                    that.removeTask(that.dataSource.getByUid(e.uid));
                });
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

            if (this.dependencies && this._dependencyRefreshHandler) {
                this.dependencies
                    .unbind("change", this._dependencyRefreshHandler)
                    .unbind("error", this._dependencyErrorHandler);
            } else {
                this._dependencyRefreshHandler = proxy(this.refreshDependencies, this);
                this._dependencyErrorHandler = proxy(this._error, this);
            }

            this.dependencies = kendo.data.GanttDependencyDataSource.create(dataSource)
                .bind("change", this._dependencyRefreshHandler)
                .bind("error", this._dependencyErrorHandler);
        },

        dataItem: function(element) {
            if (!element) {
                return null;
            }

            return this.list._modelFromElement(element);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                dataSource.fetch();
            }
        },

        updateTask: function(task, updateInfo) {
            this._preventRefresh = true;

            this.dataSource.update(task, updateInfo);

            this._preventRefresh = false;

            this.dataSource.sync();
        },

        removeTask: function(task) {
            if (!this.trigger("remove", { task: task })) {
                if (this.dataSource.remove(task)) {
                    this.dataSource.sync();
                }
            }
        },

        refresh: function(e) {
            if (this._preventRefresh || this.list.editable) {
                return;
            }

            var dataSource = this.dataSource;
            var taskTree = dataSource.taskTree();

            if (this.trigger("dataBinding")) {
                return;
            }

            this.clearSelection();
            this.list._render(taskTree);
            this.timeline._render(taskTree);
            this.timeline._renderDependencies(this.dependencies.view());

            this.trigger("dataBound");
        },

        refreshDependencies: function(e) {
            this.timeline._renderDependencies(this.dependencies.view());
        },

        _error: function() {

        },

        _resizable: function() {
            var wrapper = this.wrapper;
            var treeListWrapper = wrapper.find(".k-gantt-treelist");
            var timelineWrapper = wrapper.find(".k-gantt-grid");
            var treeListWidth;
            var timelineWidth;
            var timelineScroll;

            wrapper
                .find(".k-splitbar")
                .height(treeListWrapper.height())
                .hover(function(e) {
                        $(this).addClass("k-splitbar-horizontal-hover");
                    },
                    function(e) {
                        $(this).removeClass("k-splitbar-horizontal-hover");
                    });

            this._resizeDraggable = new kendo.ui.Resizable(wrapper, {
                orientation: "horizontal",
                handle: ".k-splitbar"
            });

            this._resizeDraggable
                .bind("start", function(e) {
                    treeListWidth = treeListWrapper.width();
                    timelineWidth = timelineWrapper.width();
                    timelineScroll = timelineWrapper.find(".k-grid-content").scrollLeft();
                })
                .bind("resize", function(e) {
                    var delta = e.x.initialDelta;

                    if (treeListWidth + delta < 0 || timelineWidth - delta < 0) {
                        return;
                    }

                    treeListWrapper.width(treeListWidth + delta);
                    timelineWrapper.width(timelineWidth - delta);
                    timelineWrapper.find(".k-grid-content").scrollLeft(timelineScroll + delta);
                });
        }
    });

    kendo.ui.plugin(Gantt);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
