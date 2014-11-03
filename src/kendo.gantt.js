(function(f, define){
    define([ "./kendo.data", "./kendo.popup", "./kendo.window", "./kendo.resizable", "./kendo.gantt.list", "./kendo.gantt.timeline", "./kendo.pdf" ], f);
})(function(){

var __meta__ = {
    id: "gantt",
    name: "Gantt",
    category: "web",
    description: "The Gantt component.",
    depends: [ "data", "popup", "resizable", "window", "gantt.list", "gantt.timeline" ]
};

(function($, undefined) {

    var kendo = window.kendo;
    var browser = kendo.support.browser;
    var Observable = kendo.Observable;
    var Widget = kendo.ui.Widget;
    var DataSource = kendo.data.DataSource;
    var Query = kendo.data.Query;
    var isArray = $.isArray;
    var inArray = $.inArray;
    var isFunction = kendo.isFunction;
    var proxy = $.proxy;
    var extend = $.extend;
    var isPlainObject = $.isPlainObject;
    var map = $.map;
    var keys = kendo.keys;
    var NS = ".kendoGantt";
    var TABINDEX = "tabIndex";
    var CLICK = "click";
    var WIDTH = "width";
    var STRING = "string";
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
    var ARIA_DESCENDANT = "aria-activedescendant";
    var ACTIVE_CELL = "gantt_active_cell";
    var ACTIVE_OPTION = "action-option-focused";
    var DOT = ".";
    var TASK_DELETE_CONFIRM = "Are you sure you want to delete this task?";
    var DEPENDENCY_DELETE_CONFIRM = "Are you sure you want to delete this dependency?";
    var BUTTON_TEMPLATE = '<button class="#=styles.button# #=className#" '+
            '#if (action) {#' +
                'data-action="#=action#"' +
            '#}#' + 
        '><span class="#=iconClass#"></span>#=text#</button>';
    var COMMAND_BUTTON_TEMPLATE = '<a class="#=className#" #=attr# href="\\#">#=text#</a>';
    var HEADER_VIEWS_TEMPLATE = kendo.template('<ul class="#=styles.viewsWrapper#">' +
            '#for(var view in views){#' +
                '<li class="#=styles.viewButtonDefault# #=styles.viewButton#-#= view.toLowerCase() #" data-#=ns#name="#=view#"><a href="\\#" class="#=styles.link#">#=views[view].title#</a></li>' +
            '#}#' +
        '</ul>');
    var TASK_DROPDOWN_TEMPLATE = kendo.template('<div class="#=styles.popupWrapper#">' +
            '<ul class="#=styles.popupList#" role="listbox">' +
                '#for(var i = 0, l = actions.length; i < l; i++){#' +
                    '<li class="#=styles.item#" data-action="#=actions[i].data#" role="option">#=actions[i].text#</span>' +
                '#}#' +
            '</ul>' +
        '</div>');
    var FOOTER_TEMPLATE = kendo.template('<div class="#=styles.footerWrapper#">' +
            '<div class="#=styles.actions#">' +
                    '<button class="#=styles.button#" data-action="#=action.data#"><span class="#=styles.iconPlus#"></span>#=action.title#</button>' +
            '</div>' +
        '</div>');

    var DATERANGEEDITOR = function(container, options) {
        var attr = { name: options.field };
        var validationRules = options.model.fields[options.field].validation;

        if (validationRules && isPlainObject(validationRules) && validationRules.message) {
            attr[kendo.attr("dateCompare-msg")] = validationRules.message;
        }

        $('<input type="text" required ' +
                kendo.attr("type") + '="date" ' +
                kendo.attr("role") + '="datetimepicker" ' +
                kendo.attr("bind") + '="value:' +
                options.field +'" ' +
                kendo.attr("validate") + "='true' />")
            .attr(attr)
            .appendTo(container);

        $('<span ' + kendo.attr("for") + '="' + options.field + '" class="k-invalid-msg"/>')
            .hide()
            .appendTo(container);
    };

    var ganttStyles = {
        wrapper: "k-widget k-gantt",
        listWrapper: "k-gantt-layout k-gantt-treelist",
        list: "k-gantt-treelist",
        timelineWrapper: "k-gantt-layout k-gantt-timeline",
        timeline: "k-gantt-timeline",
        splitBarWrapper: "k-splitbar k-state-default k-splitbar-horizontal k-splitbar-draggable-horizontal k-gantt-layout",
        splitBar: "k-splitbar",
        splitBarHover: "k-splitbar-horizontal-hover",
        popupWrapper: "k-list-container",
        popupList: "k-list k-reset",
        resizeHandle: "k-resize-handle",
        icon: "k-icon",
        item: "k-item",
        line: "k-line",
        buttonDelete: "k-gantt-delete",
        buttonCancel: "k-gantt-cancel",
        primary: "k-primary",
        hovered: "k-state-hover",
        selected: "k-state-selected",
        focused: "k-state-focused",
        gridHeader: "k-grid-header",
        gridHeaderWrap: "k-grid-header-wrap",
        gridContent: "k-grid-content",
        popup: {
            form: "k-popup-edit-form",
            editForm: "k-gantt-edit-form",
            formContainer: "k-edit-form-container",
            message: "k-popup-message",
            buttonsContainer: "k-edit-buttons k-state-default",
            button: "k-button",
            editField: "k-edit-field",
            editLabel: "k-edit-label"
        },
        toolbar: {
            headerWrapper: "k-floatwrap k-header k-gantt-toolbar",
            footerWrapper: "k-floatwrap k-header k-gantt-toolbar",
            toolbar: "k-gantt-toolbar",
            views: "k-gantt-views",
            viewsWrapper: "k-reset k-header k-gantt-views",
            actions: "k-gantt-actions",
            button: "k-button k-button-icontext",
            iconPlus: "k-icon k-i-plus",
            iconPdf: "k-icon k-i-pdf",
            viewButtonDefault: "k-state-default",
            viewButton: "k-view",
            link: "k-link",
            pdfButton: "k-gantt-pdf",
            appendButton: "k-gantt-create"
        }
    };

    function selector(uid) {
        return "[" + kendo.attr("uid") + (uid ? "='" + uid + "']" : "]");
    }

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;

        delete options.remove;
        delete options.edit;
        delete options.add;
        delete options.navigate;

        return options;
    }

    function dateCompareValidator(input) {
        if (input.filter("[name=end], [name=start]").length) {
            var field = input.attr("name");
            var picker = kendo.widgetInstance(input, kendo.ui);
            var dates = {};
            var container = input;
            var editable;
            var model;

            while (container !== window && !editable) {
                container = container.parent();

                editable = container.data("kendoEditable");
            }

            model = editable ? editable.options.model : null;

            if (!model) {
                return true;
            }

            dates.start = model.start;
            dates.end = model.end;
            dates[field] = picker ? picker.value() : kendo.parseDate(input.value());

            return dates.start <= dates.end;
        }

        return true;
    }

    function focusTable(table, direct) {
        var wrapper = table.parents('[' + kendo.attr("role") + '="gantt"]');
        var scrollPositions = [];
        var parents = scrollableParents(wrapper);

        table.attr(TABINDEX, 0);

        if (direct) {
            parents.each(function(index, parent) {
                scrollPositions[index] = $(parent).scrollTop();
            });
        }

        try {
            //The setActive method does not cause the document to scroll to the active object in the current page
            table[0].setActive();
        } catch (e) {
            table[0].focus();
        }

        if (direct) {
            parents.each(function(index, parent) {
                $(parent).scrollTop(scrollPositions[index]);
            });
        }
    }

    function scrollableParents(element) {
        return $(element).parentsUntil("body")
                .filter(function(index, element) {
                    var computedStyle = kendo.getComputedStyles(element, ["overflow"]);
                    return computedStyle.overflow != "visible";
                })
                .add(window);
    }

    var defaultCommands = {
        append: {
            text: "Add Task",
            action: "add",
            className: ganttStyles.toolbar.appendButton,
            iconClass: ganttStyles.toolbar.iconPlus
        },
        pdf: {
            text: "Export to PDF",
            className: ganttStyles.toolbar.pdfButton,
            iconClass: ganttStyles.toolbar.iconPdf
        }
    };

    var TaskDropDown = Observable.extend({
        init: function(element, options) {

            Observable.fn.init.call(this);

            this.element = element;
            this.options = extend(true, {}, this.options, options);

            this._popup();
        },

        options: {
            direction: "down",
            navigatable: false
        },

        _current: function(method) {
            var ganttStyles = Gantt.styles;
            var current = this.list
                .find(DOT + ganttStyles.focused);
            var sibling = current[method]();

            if (sibling.length) {
                current
                    .removeClass(ganttStyles.focused)
                    .removeAttr("id");
                sibling
                    .addClass(ganttStyles.focused)
                    .attr("id", ACTIVE_OPTION);

                this.list.find("ul")
                    .removeAttr(ARIA_DESCENDANT)
                    .attr(ARIA_DESCENDANT, ACTIVE_OPTION);
            }
        },

        _popup: function() {
            var that = this;
            var ganttStyles = Gantt.styles;
            var itemSelector = "li" + DOT + ganttStyles.item;
            var actions = this.options.messages.actions;
            var navigatable = this.options.navigatable;

            this.list = $(TASK_DROPDOWN_TEMPLATE({
                styles: ganttStyles,
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
                        text: actions.insertAfter
                    }
                ]
            }));

            this.element.append(this.list);

            this.popup = new kendo.ui.Popup(this.list,
                extend({
                    anchor: this.element,
                    open: function(e) {
                        that._adjustListWidth();
                    },
                    animation: this.options.animation
                }, DIRECTIONS[this.options.direction])
            );

            this.element
                .on(CLICK + NS, DOT + ganttStyles.toolbar.appendButton, function(e) {
                    var target = $(this);
                    var action = target.attr(kendo.attr("action"));

                    e.preventDefault();

                    if (action) {
                        that.trigger("command", { type: action });
                    } else {
                        that.popup.open();

                        if (navigatable) {
                            that.list
                                .find("li:first")
                                .addClass(ganttStyles.focused)
                                .attr("id", ACTIVE_OPTION)
                                .end()
                                .find("ul")
                                .attr({
                                    TABINDEX: 0,
                                    "aria-activedescendant": ACTIVE_OPTION
                                })
                                .focus();
                        }
                    }
                });

            this.list
                .find(itemSelector)
                .hover(function() {
                    $(this).addClass(ganttStyles.hovered);
                }, function() {
                    $(this).removeClass(ganttStyles.hovered);
                })
                .end()
                .on(CLICK + NS, itemSelector, function(e) {
                    that.trigger("command", { type: $(this).attr(kendo.attr("action")) });
                    that.popup.close();
                });

            if (navigatable) {
                this.popup
                    .bind("close", function() {
                        that.list
                            .find(itemSelector)
                            .removeClass(ganttStyles.focused)
                            .end()
                            .find("ul")
                            .attr(TABINDEX, 0);

                        that.element
                            .parents('[' + kendo.attr("role") + '="gantt"]')
                            .find(DOT + ganttStyles.gridContent + " > table:first")
                            .focus();
                    });

                this.list
                    .find("ul")
                    .on("keydown" + NS, function(e) {
                        var key = e.keyCode;

                        switch (key) {
                            case keys.UP:
                                e.preventDefault();
                                that._current("prev");
                                break;
                            case keys.DOWN:
                                e.preventDefault();
                                that._current("next");
                                break;
                            case keys.ENTER:
                                that.list
                                    .find(DOT + ganttStyles.focused)
                                    .click();
                                break;
                            case keys.ESC:
                                e.preventDefault();
                                that.popup.close();
                                break;
                        }
                    });
            }
        },

        _adjustListWidth: function() {
            var list = this.list;
            var width = list[0].style.width;
            var wrapper = this.element;
            var computedStyle;
            var computedWidth;

            if (!list.data(WIDTH) && width) {
                return;
            }

            computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
            computedWidth = computedStyle ? parseFloat(computedStyle.width) : wrapper.outerWidth();

            if (computedStyle && (browser.mozilla || browser.msie)) { // getComputedStyle returns different box in FF and IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            if (list.css("box-sizing") !== "border-box") {
                width = computedWidth - (list.outerWidth() - list.width());
            } else {
                width = computedWidth;
            }

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            })
            .data(WIDTH, width);
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

        dependencies: function(id) {
            var predecessors = this.predecessors(id);
            var successors = this.successors(id);

            predecessors.push.apply(predecessors, successors);

            return predecessors;
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
            start: {
                type: "date", validation: {
                    required: true,
                    dateCompare: dateCompareValidator,
                    message: "Start date should be before or equal to the end date"
                }
            },
            end: {
                type: "date", validation: {
                    required: true,
                    dateCompare: dateCompareValidator,
                    message: "End date should be after or equal to the start date"
                }
            },
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
            var children = this.taskAllChildren(task);

            this._removeItems(children);

            task = DataSource.fn.remove.call(this, task);

            this._childRemoved(parentId, task.get("orderId"));

            return task;
        },

        add: function(task) {
            if (!task) {
                return;
            }

            task = this._toGanttTask(task);

            return this.insert(this.taskSiblings(task).length, task);
        },

        insert: function(index, task) {
            if (!task) {
                return;
            }

            task = this._toGanttTask(task);

            task.set("orderId", index);

            task = DataSource.fn.insert.call(this, index, task);

            this._reorderSiblings(task, this.taskSiblings(task).length - 1);
            this._resolveSummaryFields(this.taskParent(task));

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

        update: function(task, taskInfo) {
            var that = this;
            var oldValue;

            var offsetChildren = function(parentTask, offset) {
                var children = that.taskAllChildren(parentTask);

                for (var i = 0, l = children.length; i < l; i++) {
                    children[i]._offset(offset);
                }
            };

            var modelChangeHandler = function(e) {
                var field = e.field;
                var model = e.sender;

                switch (field) {
                    case "start":
                        that._resolveSummaryStart(that.taskParent(model));

                        offsetChildren(model, model.get(field).getTime() - oldValue.getTime());
                        break;
                    case "end":
                        that._resolveSummaryEnd(that.taskParent(model));
                        break;
                    case "percentComplete":
                        that._resolveSummaryPercentComplete(that.taskParent(model));
                        break;
                    case "orderId":
                        that._reorderSiblings(model, oldValue);
                        break;
                }
            };

            if (taskInfo.parentId !== undefined) {

                oldValue = task.get("parentId");

                if (oldValue !== taskInfo.parentId) {
                    task.set("parentId", taskInfo.parentId);

                    that._childRemoved(oldValue, task.get("orderId"));

                    task.set("orderId", that.taskSiblings(task).length - 1);
                    that._resolveSummaryFields(that.taskParent(task));
                }

                delete taskInfo.parentId;
            }

            task.bind("change", modelChangeHandler);

            for (var field in taskInfo) {
                oldValue = task.get(field);
                task.set(field, taskInfo[field]);
            }

            task.unbind("change", modelChangeHandler);
        },

        _resolveSummaryFields: function(summary) {
            if (!summary) {
                return;
            }

            this._updateSummary(summary);

            if (!this.taskChildren(summary).length) {
                return;
            }

            this._resolveSummaryStart(summary);
            this._resolveSummaryEnd(summary);
            this._resolveSummaryPercentComplete(summary);
        },

        _resolveSummaryStart: function(summary) {
            var that = this;
            var getSummaryStart = function(parentTask) {
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

            this._updateSummaryRecursive(summary, "start", getSummaryStart);
        },

        _resolveSummaryEnd: function(summary) {
            var that = this;
            var getSummaryEnd = function(parentTask) {
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

            this._updateSummaryRecursive(summary, "end", getSummaryEnd);
        },

        _resolveSummaryPercentComplete: function(summary) {
            var that = this;
            var getSummaryPercentComplete = function(parentTask) {
                var children = that.taskChildren(parentTask);
                var percentComplete = new Query(children).aggregate([{
                    field: "percentComplete",
                    aggregate: "average"
                }]);

                return percentComplete.percentComplete.average;
            };

            this._updateSummaryRecursive(summary, "percentComplete", getSummaryPercentComplete);
        },

        _updateSummaryRecursive: function(summary, field, callback) {
            if (!summary) {
                return;
            }

            var value = callback(summary);

            summary.set(field, value);

            var parent = this.taskParent(summary);

            if (parent) {
                this._updateSummaryRecursive(parent, field, callback);
            }
        },

        _childRemoved: function(parentId, index) {
            var parent = parentId === null ? null : this.get(parentId);
            var children = this.taskChildren(parent);

            for (var i = index, l = children.length; i < l; i++) {
                children[i].set("orderId", i);
            }

            this._resolveSummaryFields(parent);
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
        },

        _toGanttTask: function(task) {
            if (!(task instanceof GanttTask)) {
                var taskInfo = task;

                task = this._createNewModel();
                task.accept(taskInfo);
            }

            return task;
        }
    });

    GanttDataSource.create = createDataSource(GanttDataSource, "GanttDataSource");

    extend(true, kendo.data, {
        GanttDataSource: GanttDataSource,
        GanttTask: GanttTask,
        GanttDependencyDataSource: GanttDependencyDataSource,
        GanttDependency: GanttDependency
    });

    var editors = {
        desktop: {
            dateRange: DATERANGEEDITOR
        }
    };

    var Editor = kendo.Observable.extend({
        init: function(element, options) {
            kendo.Observable.fn.init.call(this);

            this.element = element;
            this.options = extend(true, {}, this.options, options);
            this.createButton = this.options.createButton;
        },

        fields: function(editors, model) {
            var messages = this.options.messages.editor;

            var fields = [
                { field: "title", title: messages.title },
                { field: "start", title: messages.start, editor: editors.dateRange },
                { field: "end", title: messages.end, editor: editors.dateRange },
                { field: "percentComplete", title: messages.percentComplete, format: "p0" }
            ];

            return fields;
        },

        _buildEditTemplate: function(model, fields, editableFields) {
            var template = this.options.editable.template;
            var settings = extend({}, kendo.Template, this.options.templateSettings);
            var paramName = settings.paramName;
            var popupStyles = Gantt.styles.popup;
            var html = "";

            if (template) {
                if (typeof template === STRING) {
                    template = window.unescape(template);
                }

                html += (kendo.template(template, settings))(model);
            } else {
                for (var i = 0, length = fields.length; i < length; i++) {
                    var field = fields[i];

                    html += '<div class="' + popupStyles.editLabel + '"><label for="' + field.field + '">' + (field.title || field.field || "") + '</label></div>';

                    if ((!model.editable || model.editable(field.field))) {
                        editableFields.push(field);
                        html += '<div ' + kendo.attr("container-for") + '="' + field.field + '" class="' + popupStyles.editField + '"></div>';
                    } else {
                        var tmpl = "#:";

                        if (field.field) {
                            field = kendo.expr(field.field, paramName);
                            tmpl += field + "==null?'':" + field;
                        } else {
                            tmpl += "''";
                        }

                        tmpl += "#";

                        tmpl = kendo.template(tmpl, settings);

                        html += '<div class="' + popupStyles.editField + '">' + tmpl(model) + '</div>';
                    }
                }
            }

            return html;
        }
    });

    var PopupEditor = Editor.extend({
        destroy: function() {
            this.close();
            this.unbind();
        },

        editTask: function(task) {
            this.editable = this._createPopupEditor(task);
        },

        close: function() {
            var that = this;

            var destroy = function() {
                if (that.editable) {
                    that.editable.destroy();
                    that.editable = null;
                    that.container = null;
                }

                if (that.popup) {
                    that.popup.destroy();
                    that.popup = null;
                }
            };

            if (this.editable && this.container.is(":visible")) {
                this.container.data("kendoWindow").bind("deactivate", destroy).close();
            } else {
                destroy();
            }
        },

        showDialog: function(options) {
            var buttons = options.buttons;
            var popupStyles = Gantt.styles.popup;

            var html = kendo.format('<div class="{0}"><div class="{1}"><p class="{2}">{3}</p><div class="{4}">',
                popupStyles.form, popupStyles.formContainer, popupStyles.message, options.text, popupStyles.buttonsContainer);

            for (var i = 0, length = buttons.length; i < length; i++) {
                html += this.createButton(buttons[i]);
            }

            html += '</div></div></div>';

            var wrapper = this.element;

            if (this.popup) {
                this.popup.destroy();
            }

            var popup = this.popup = $(html).appendTo(wrapper)
                .eq(0)
                .on("click", DOT + popupStyles.button, function(e) {
                    e.preventDefault();

                    popup.close();

                    var buttonIndex = $(e.currentTarget).index();

                    buttons[buttonIndex].click();
                })
                .kendoWindow({
                    modal: true,
                    resizable: false,
                    draggable: false,
                    title: options.title,
                    visible: false,
                    close: function() {
                        this.destroy();
                        wrapper.focus();
                    }
                })
                .getKendoWindow();

            popup.center().open();
        },

        _createPopupEditor: function(task) {
            var that = this;
            var options = {};
            var messages = this.options.messages;
            var popupStyles = Gantt.styles.popup;

            var html = kendo.format('<div {0}="{1}" class="{2} {3}"><div class="{4}">', 
                kendo.attr("uid"), task.uid, popupStyles.form, popupStyles.editForm, popupStyles.formContainer);
            
            var fields = this.fields(editors.desktop, task);
            var editableFields = [];

            html += this._buildEditTemplate(task, fields, editableFields);

            html += '<div class="' + popupStyles.buttonsContainer + '">';
            html += this.createButton({ name: "update", text: messages.save, className: Gantt.styles.primary });
            html += this.createButton({ name: "cancel", text: messages.cancel });
            html += this.createButton({ name: "delete", text: messages.destroy });

            html += '</div></div></div>';

            var container = this.container = $(html).appendTo(this.element)
                .eq(0)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: messages.editor.editorTitle,
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            if (that.trigger("cancel", { container: container, model: task })) {
                                e.preventDefault();
                            }
                        }
                    }
                }, options));

            var editableWidget = container
                .kendoEditable({
                    fields: editableFields,
                    model: task,
                    clearContainer: false,
                    validateOnBlur: true,
                    target: that.options.target
                })
                .data("kendoEditable");

            if (!this.trigger("edit", { container: container, model: task })) {
                container.data("kendoWindow").center().open();

                container.on(CLICK + NS, "a.k-gantt-cancel", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger("cancel", { container: container, model: task });
                });

                container.on(CLICK + NS, "a.k-gantt-update", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var fields = that.fields(editors.desktop, task);
                    var updateInfo = {};
                    var field;

                    for (var i = 0, length = fields.length; i < length; i++) {
                        field = fields[i].field;
                        updateInfo[field] = task.get(field);
                    }

                    that.trigger("save", { container: container, model: task, updateInfo: updateInfo });
                });

                container.on(CLICK + NS, "a.k-gantt-delete", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.trigger("remove", { container: container, model: task });
                });
            } else {
                that.trigger("cancel", { container: container, model: task });
            }

            return editableWidget;
        }
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

            this._adjustDimensions();

            // Prevent extra refresh from setting the view
            this._preventRefresh = true;

            this.view(this.timeline._selectedViewName);

            this._preventRefresh = false;

            this._dataSource();

            this._dropDowns();

            this._list();

            this._dependencies();

            this._resizable();

            this._scrollable();

            this._dataBind();

            this._attachEvents();

            this._createEditor();

            kendo.notify(this);
        },

        events: [
            "dataBinding",
            "dataBound",
            "add",
            "edit",
            "remove",
            "cancel",
            "save",
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
            navigatable: false,
            selectable: true,
            editable: true,
            columns: [],
            views: [],
            dataSource: {},
            dependencies: {},
            messages: {
                save: "Save",
                cancel: "Cancel",
                destroy: "Delete",
                deleteTaskWindowTitle: "Delete task",
                deleteDependencyWindowTitle: "Delete dependency",
                views: {
                    day: "Day",
                    week: "Week",
                    month: "Month"
                },
                actions: {
                    append: "Add Task",
                    addChild: "Add Child",
                    insertBefore: "Add Above",
                    insertAfter: "Add Below"
                },
                editor: {
                    editorTitle: "Task",
                    title: "Title",
                    start: "Start",
                    end: "End",
                    percentComplete: "Complete"
                }
            },
            showWorkHours: true,
            showWorkDays: true,
            workDayStart: new Date(1980, 1, 1, 8, 0, 0),
            workDayEnd: new Date(1980, 1, 1, 17, 0, 0),
            workWeekStart: 1,
            workWeekEnd: 5,
            hourSpan: 1,
            snap: true,
            height: 600,
            listWidth: "30%"
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
            
            if (this.dataSource) {
                this.dataSource.unbind("change", this._refreshHandler);
                this.dataSource.unbind("progress", this._progressHandler);
                this.dataSource.unbind("error", this._errorHandler);
            }

            if (this.dependencies) {
                this.dependencies.unbind("change", this._dependencyRefreshHandler);
                this.dependencies.unbind("error", this._dependencyErrorHandler);
            }

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

            if (this._editor) {
                this._editor.destroy();
            }

            if (this._resizeDraggable) {
                this._resizeDraggable.destroy();
            }

            this.toolbar.off(NS);

            $(window).off("resize" + NS, this._resizeHandler);
            $(this.wrapper).off(NS);

            this.toolbar = null;
            this.footer = null;
        },

        _attachEvents: function() {
            this._resizeHandler = proxy(this.resize, this);
            $(window).on("resize" + NS, this._resizeHandler);
        },

        _wrapper: function() {
            var ganttStyles = Gantt.styles;
            var splitBarHandleClassName = [ganttStyles.icon, ganttStyles.resizeHandle].join(" ");
            var options = this.options;
            var height = options.height;
            var width = options.width;

            this.wrapper = this.element
                            .addClass(ganttStyles.wrapper)
                            .append("<div class='" + ganttStyles.listWrapper + "'><div></div></div>")
                            .append("<div class='" + ganttStyles.splitBarWrapper + "'><div class='" + splitBarHandleClassName + "'></div></div>")
                            .append("<div class='" + ganttStyles.timelineWrapper + "'><div></div></div>");

            this.wrapper.find(DOT + ganttStyles.list).width(options.listWidth);

            if (height) {
                this.wrapper.height(height);
            }

            if (width) {
                this.wrapper.width(width);
            }
        },

        _toolbar: function() {
            var that = this;
            var ganttStyles = Gantt.styles;
            var viewsSelector = DOT + ganttStyles.toolbar.views + " > li";
            var pdfSelector = DOT + ganttStyles.toolbar.pdfButton;
            var hoveredClassName = ganttStyles.hovered;
            var actions = this.options.toolbar;
            var actionsWrap = $("<div class='" + ganttStyles.toolbar.actions + "'>");
            var toolbar;
            var views;

            if (!isFunction(actions)) {
                actions = (typeof actions === STRING ? actions : this._actions(actions));
                actions = proxy(kendo.template(actions), this);
            }

            views = $(HEADER_VIEWS_TEMPLATE({
                ns: kendo.ns,
                views: this.timeline.views,
                styles: ganttStyles.toolbar
            }));

            actionsWrap.append(actions({}));

            toolbar = $("<div class='" + ganttStyles.toolbar.headerWrapper + "'>")
                .append(actionsWrap)
                .append(views);

            this.wrapper.prepend(toolbar);
            this.toolbar = toolbar;

            toolbar
                .on(CLICK + NS, viewsSelector, function(e) {
                    e.preventDefault();

                    var name = $(this).attr(kendo.attr("name"));

                    if (!that.trigger("navigate", { view: name })) {
                        that.view(name);
                    }
                })
                .on(CLICK + NS, pdfSelector, function(e) {
                    that.saveAsPDF();
                });

            this.wrapper
                .find(DOT + ganttStyles.toolbar.toolbar + " li")
                .hover(function() {
                    $(this).addClass(hoveredClassName);
                }, function() {
                    $(this).removeClass(hoveredClassName);
                });
        },

        _actions: function() {
            var options = this.options;
            var actions = options.toolbar;
            var html = "";

            if (!isArray(actions)) {
                if (options.editable) {
                    actions = ["append"];
                } else {
                    return html;
                }
            }

            for (var i = 0, length = actions.length; i < length; i++) {
                html += this._createButton(actions[i]);
            }

            return html;
        },

        _footer: function() {
            if (!this.options.editable) {
                return;
            }

            var footer = $(FOOTER_TEMPLATE({
                styles: Gantt.styles.toolbar,
                action: {
                    data: "add",
                    title: this.options.messages.actions.append
                }
            }));

            this.wrapper.append(footer);
            this.footer = footer;
        },

        _createButton: function(command) {
            var template = command.template || BUTTON_TEMPLATE;
            var messages = this.options.messages.actions;
            var commandName = typeof command === STRING ? command : command.name || command.text;
            var className = defaultCommands[commandName] ? defaultCommands[commandName].className : "";
            var options = { 
                iconClass: "",
                action: "",
                text: commandName,
                className: className,
                styles: Gantt.styles.toolbar
            };

            if (!commandName && !(isPlainObject(command) && command.template))  {
                throw new Error("Custom commands should have name specified");
            }

            options = extend(true, options, defaultCommands[commandName], { text: messages[commandName] });

            if (isPlainObject(command)) {
                if (command.className && inArray(options.className, command.className.split(" ")) < 0) {
                    command.className += " " + options.className;
                }

                options = extend(true, options, command);
            }

            return kendo.template(template)(options);
        },

        _adjustDimensions: function() {
            var element = this.element;
            var ganttStyles = Gantt.styles;
            var listSelector = DOT + ganttStyles.list;
            var timelineSelector = DOT + ganttStyles.timeline;
            var splitBarSelector = DOT + ganttStyles.splitBar;
            var toolbarHeight = this.toolbar.outerHeight();
            var footerHeight = this.footer ? this.footer.outerHeight() : 0;
            var totalHeight = element.height();
            var totalWidth = element.width();
            var splitBarWidth = element.find(splitBarSelector).outerWidth();
            var treeListWidth = element.find(listSelector).outerWidth();

            element
                .children([listSelector, timelineSelector, splitBarSelector].join(","))
                .height(totalHeight - (toolbarHeight + footerHeight))
                .end()
                .children(timelineSelector)
                .width(totalWidth - (splitBarWidth + treeListWidth));
        },

        _scrollTo: function(value) {
            var view = this.timeline.view();
            var attr = kendo.attr("uid");
            var id = typeof value === "string" ? value :
                value.closest("tr" + selector()).attr(attr);
            var scrollTarget = view.content.find(selector(id));

            if (scrollTarget.length !== 0) {
                view._scrollTo(scrollTarget);
            }
        },

        _dropDowns: function() {
            var that = this;
            var actionsSelector = DOT + Gantt.styles.toolbar.actions;
            var actionMessages = this.options.messages.actions;
            var dataSource = this.dataSource;
            var timeline = this.timeline;

            var handler = function(e) {
                var type = e.type;
                var orderId;
                var task = dataSource._createNewModel();
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

                if (type !== "add") {
                    orderId = selected.get("orderId");
                    orderId = type === "insert-before" ? orderId : orderId + 1;
                }

                that._createTask(task, orderId);
            };

            if (!this.options.editable) {
                return;
            }

            this.footerDropDown = new TaskDropDown(this.footer.children(actionsSelector).eq(0), {
                messages: {
                    actions: actionMessages
                },
                direction: "up",
                animation: {
                    open: {
                        effects: "slideIn:up"
                    }
                },
                navigatable: that.options.navigatable
            });

            this.headerDropDown = new TaskDropDown(this.toolbar.children(actionsSelector).eq(0), {
                messages: {
                    actions: actionMessages
                },
                navigatable: that.options.navigatable
            });

            this.footerDropDown.bind("command", handler);
            this.headerDropDown.bind("command", handler);
        },

        _list: function() {
            var that = this;
            var navigatable = that.options.navigatable;
            var ganttStyles = Gantt.styles;
            var listWrapper = this.wrapper.find(DOT + ganttStyles.list);
            var element = listWrapper.find("> div");
            var toggleButtons = this.wrapper.find(DOT + ganttStyles.toolbar.actions + " > button");
            var options = {
                columns: this.options.columns || [],
                dataSource: this.dataSource,
                selectable: this.options.selectable,
                editable: this.options.editable,
                listWidth: listWrapper.outerWidth()
            };
            var restoreFocus = function() {
                if (navigatable) {
                    that._current(that._cachedCurrent);

                    focusTable(that.list.content.find("table"), true);
                }

                delete that._cachedCurrent;
            };

            this.list = new kendo.ui.GanttList(element, options);

            this.list
                .bind("render", function() {
                    that._navigatable();
                 }, true)
                .bind("edit", function(e) {
                    that._cachedCurrent = e.cell;

                    if (that.trigger("edit", { task: e.model, container: e.cell })) {
                        e.preventDefault();
                    }
                })
                .bind("cancel", function(e) {
                    if (that.trigger("cancel", { task: e.model, container: e.cell })) {
                        e.preventDefault();
                    }
                    restoreFocus();
                })
                .bind("update", function(e) {
                    that._updateTask(e.task, e.updateInfo);
                    restoreFocus();
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
            var ganttStyles = Gantt.styles;
            var options = trimOptions(extend(true, {}, this.options));
            var element = this.wrapper.find(DOT + ganttStyles.timeline + " > div");

            this.timeline = new kendo.ui.GanttTimeline(element, options);

            this.timeline
                .bind("navigate", function(e) {
                    that.toolbar
                        .find(DOT + ganttStyles.toolbar.views +" > li")
                        .removeClass(ganttStyles.selected)
                        .end()
                        .find(DOT + ganttStyles.toolbar.viewButton + "-" + e.view.replace(/\./g, "\\.").toLowerCase())
                        .addClass(ganttStyles.selected);

                    that.refresh();
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
                        that._updateTask(that.dataSource.getByUid(task.uid), {
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
                    if (that.trigger("resize", { task: e.task, start: e.start, end: e.end })) {
                        e.preventDefault();
                    }
                })
                .bind("resizeEnd", function(e) {
                    var task = e.task;
                    var updateInfo = {};

                    if (e.resizeStart) {
                        updateInfo.start = e.start;
                    } else {
                        updateInfo.end = e.end;
                    }
                    
                    if (!that.trigger("resizeEnd", { task: task, start: e.start, end: e.end })) {
                        that._updateTask(that.dataSource.getByUid(task.uid), updateInfo);
                    }
                })
                .bind("percentResizeEnd", function(e) {
                    that._updateTask(that.dataSource.getByUid(e.task.uid), { percentComplete: e.percentComplete });
                })
                .bind("dependencyDragEnd", function(e) {
                    var dependency = that.dependencies._createNewModel({
                        type: e.type,
                        predecessorId: e.predecessor.id,
                        successorId: e.successor.id
                    });

                    that._createDependency(dependency);
                })
                .bind("select", function(e) {
                    that.select("[data-uid='" + e.uid + "']");
                })
                .bind("editTask", function(e) {
                    that.editTask(e.uid);
                })
                .bind("clear", function(e) {
                    that.clearSelection();
                })
                .bind("removeTask", function(e) {
                    that.removeTask(that.dataSource.getByUid(e.uid));
                })
                .bind("removeDependency", function(e) {
                    that.removeDependency(that.dependencies.getByUid(e.uid));
                });
        },

        _dataSource: function() {
            var options = this.options;
            var dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (this.dataSource && this._refreshHandler) {
                this.dataSource
                    .unbind("change", this._refreshHandler)
                    .unbind("progress", this._progressHandler)
                    .unbind("error", this._errorHandler);
            } else {
                this._refreshHandler = proxy(this.refresh, this);
                this._progressHandler = proxy(this._requestStart, this);
                this._errorHandler = proxy(this._error, this);
            }

            this.dataSource = kendo.data.GanttDataSource.create(dataSource)
                .bind("change", this._refreshHandler)
                .bind("progress", this._progressHandler)
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

        _createEditor: function(command) {
            var that = this;

            var editor = this._editor = new PopupEditor(this.wrapper, extend({}, this.options, {
                target: this,
                createButton: proxy(this._createPopupButton, this)
            }));

            editor
                .bind("cancel", function(e) {
                    var task = that.dataSource.getByUid(e.model.uid);

                    if (that.trigger("cancel", { container: e.container, task: task })) {
                        e.preventDefault();
                        return;
                    }

                    that.cancelTask();
                })
                .bind("edit", function(e) {
                    var task = that.dataSource.getByUid(e.model.uid);

                    if (that.trigger("edit", { container: e.container, task: task })) {
                        e.preventDefault();
                    }
                })
                .bind("save", function(e) {
                    var task = that.dataSource.getByUid(e.model.uid);

                    that.saveTask(task, e.updateInfo);
                })
                .bind("remove", function(e) {
                    that.removeTask(e.model.uid);
                });

        },

        _createPopupButton: function(command) {
            var commandName = command.name || command.text;
            var options = { 
                className: Gantt.styles.popup.button + " k-gantt-" + (commandName || "").replace(/\s/g, ""),
                text: commandName,
                attr: ""
            };

            if (!commandName && !(isPlainObject(command) && command.template))  {
                throw new Error("Custom commands should have name specified");
            }

            if (isPlainObject(command)) {
                if (command.className) {
                    command.className += " " + options.className;
                }

                options = extend(true, options, command);
            }

            return kendo.template(COMMAND_BUTTON_TEMPLATE)(options);
        },

        view: function(type) {
            return this.timeline.view(type);
        },

        dataItem: function(value) {
            if (!value) {
                return null;
            }

            var list = this.list;
            var element = list.content.find(value);

            return list._modelFromElement(element);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            this.list._setDataSource(this.dataSource);

            if (this.options.autoBind) {
                dataSource.fetch();
            }
        },

        setDependenciesDataSource: function(dependencies) {
            this.options.dependencies = dependencies;

            this._dependencies();

            if (this.options.autoBind) {
                dependencies.fetch();
            }
        },

        items: function() {
            return this.wrapper.children(".k-task");
        },

        cancelTask: function() {
            var editor = this._editor;
            var container = editor.container;

            if (container) {
                editor.close();
            }
        },

        editTask: function(uid) {
            var task = typeof uid === "string" ? this.dataSource.getByUid(uid) : uid;

            if (!task) {
                return;
            }

            var taskCopy = this.dataSource._createNewModel(task.toJSON());
            taskCopy.uid = task.uid;

            this.cancelTask();

            this._editTask(taskCopy);
        },

        _editTask: function(task) {
            this._editor.editTask(task);
        },

        saveTask: function(task, updateInfo) {
            var editor = this._editor;
            var container = editor.container;
            var editable = editor.editable;

            if (container && editable && editable.end()) {
                this._updateTask(task, updateInfo);
            }
        },

        _updateTask: function(task, updateInfo) {
            if (!this.trigger("save", { task: task, values: updateInfo })) {
                this._preventRefresh = true;

                this.dataSource.update(task, updateInfo);

                this._syncDataSource();
            }
        },

        removeTask: function(uid) {
            var that = this;
            var task = typeof uid === "string" ? this.dataSource.getByUid(uid) : uid;

            if (!task) {
                return;
            }

            this._taskConfirm(function(cancel) {
                if (!cancel) {
                    that._removeTask(task);
                }
            }, task);
        },

        _createTask: function(task, index) {
            if (!this.trigger("add", {
                task: task,
                dependency: null
            })) {
                var dataSource = this.dataSource;

                this._preventRefresh = true;

                if (index === undefined) {
                    dataSource.add(task);
                } else {
                    dataSource.insert(index, task);
                }

                this._scrollToUid = task.uid;

                this._syncDataSource();
            }
        },

        _createDependency: function(dependency) {
            if (!this.trigger("add", {
                task: null,
                dependency: dependency
            })) {
                this._preventDependencyRefresh = true;

                this.dependencies.add(dependency);

                this._preventDependencyRefresh = false;

                this.dependencies.sync();
            }
        },

        removeDependency: function(uid) {
            var that = this;
            var dependency = typeof uid === "string" ? this.dependencies.getByUid(uid) : uid;

            if (!dependency) {
                return;
            }

            this._dependencyConfirm(function(cancel) {
                if (!cancel) {
                    that._removeDependency(dependency);
                }
            }, dependency);
        },

        _removeTaskDependencies: function(task, dependencies) {
            this._preventDependencyRefresh = true;

            for (var i = 0, length = dependencies.length; i < length; i++) {
                this.dependencies.remove(dependencies[i]);
            }

            this._preventDependencyRefresh = false;

            this.dependencies.sync();
        },

        _removeTask: function(task) {
            var dependencies = this.dependencies.dependencies(task.id);

            if (!this.trigger("remove", {
                task: task,
                dependencies: dependencies
            })) {
                this._removeTaskDependencies(task, dependencies);

                this._preventRefresh = true;

                if (this.dataSource.remove(task)) {
                    this._syncDataSource();
                }

                this._preventRefresh = false;
            }
        },

        _removeDependency: function(dependency) {
            if (!this.trigger("remove", {
                task: null,
                dependencies: [dependency]
            })) {
                if (this.dependencies.remove(dependency)) {
                    this.dependencies.sync();
                }
            }
        },

        _taskConfirm: function(callback, task) {
            this._confirm(callback, {
                model: task,
                text: TASK_DELETE_CONFIRM,
                title: this.options.messages.deleteTaskWindowTitle
            });
        },

        _dependencyConfirm: function(callback, dependency) {
            this._confirm(callback, {
                model: dependency,
                text: DEPENDENCY_DELETE_CONFIRM,
                title: this.options.messages.deleteDependencyWindowTitle
            });
        },

        _confirm: function(callback, options) {
            var editable = this.options.editable;
            var messages;
            var buttons;

            if (editable === true || editable.confirmation !== false) {
                messages = this.options.messages;
                buttons = [
                    { name: "delete", text: messages.destroy, className: Gantt.styles.primary, click: function() { callback(); } },
                    { name: "cancel", text: messages.cancel, click: function() { callback(true); } }
                ];

                this.showDialog(extend(true, {}, options, { buttons: buttons }));
            } else {
                callback();
            }
        },

        showDialog: function(options) {
            this._editor.showDialog(options);
        },

        refresh: function(e) {
            if (this._preventRefresh || this.list.editable) {
                return;
            }

            this._progress(false);

            var dataSource = this.dataSource;
            var taskTree = dataSource.taskTree();
            var scrollToUid = this._scrollToUid;
            var current;
            var cachedUid;
            var cachedIndex = -1;

            if (this.current) {
                cachedUid = this.current.closest("tr").attr(kendo.attr("uid"));
                cachedIndex = this.current.index();
            }

            if (this.trigger("dataBinding")) {
                return;
            }

            if (this._editor) {
                this._editor.close();
            }

            this.clearSelection();
            this.list._render(taskTree);
            this.timeline._render(taskTree);
            this.timeline._renderDependencies(this.dependencies.view());

            if (scrollToUid) {
                this._scrollTo(scrollToUid);
                this.select(selector(scrollToUid));
            }

            if ((scrollToUid || cachedUid) && cachedIndex >= 0) {
                current = this.list.content
                    .find("tr" + selector((scrollToUid || cachedUid)) + " > td:eq(" + cachedIndex + ")");

                this._current(current);
            }

            this._scrollToUid = null;

            this.trigger("dataBound");
        },

        refreshDependencies: function(e) {
            if (this._preventDependencyRefresh) {
                return;
            }

            if (this.trigger("dataBinding")) {
                return;
            }

            this.timeline._renderDependencies(this.dependencies.view());

            this.trigger("dataBound");
        },

        _syncDataSource: function() {
            this._preventRefresh = false;
            this._requestStart();
            this.dataSource.sync();
        },

        _requestStart: function() {
            this._progress(true);
        },

        _error: function() {
            this._progress(false);
        },

        _progress: function(toggle) {
            kendo.ui.progress(this.element, toggle);
        },

        _resizable: function() {
            var wrapper = this.wrapper;
            var ganttStyles = Gantt.styles;
            var contentSelector = DOT + ganttStyles.gridContent;
            var treeListWrapper = wrapper.find(DOT + ganttStyles.list);
            var timelineWrapper = wrapper.find(DOT + ganttStyles.timeline);
            var treeListWidth;
            var timelineWidth;
            var timelineScroll;

            this._resizeDraggable = wrapper
                .find(DOT + ganttStyles.splitBar)
                .height(treeListWrapper.height())
                .hover(function (e) {
                    $(this).addClass(ganttStyles.splitBarHover);
                }, function (e) {
                    $(this).removeClass(ganttStyles.splitBarHover);
                })
                .end()
                .kendoResizable({
                    orientation: "horizontal",
                    handle: DOT + ganttStyles.splitBar,
                    "start": function (e) {
                        treeListWidth = treeListWrapper.width();
                        timelineWidth = timelineWrapper.width();
                        timelineScroll = timelineWrapper.find(contentSelector).scrollLeft();
                    },
                    "resize": function(e) {
                        var delta = e.x.initialDelta;

                        if (treeListWidth + delta < 0 || timelineWidth - delta < 0) {
                            return;
                        }

                        treeListWrapper.width(treeListWidth + delta);
                        timelineWrapper.width(timelineWidth - delta);
                        timelineWrapper.find(contentSelector).scrollLeft(timelineScroll + delta);
                    }
                }).data("kendoResizable");
        },

        _scrollable: function() {
            var ganttStyles = Gantt.styles;
            var contentSelector = DOT + ganttStyles.gridContent;
            var headerSelector = DOT + ganttStyles.gridHeaderWrap;
            var timelineWrapper = this.timeline.element;
            var treeListWrapper = this.list.element;

            timelineWrapper.find(contentSelector).on("scroll", function(e) {
                timelineWrapper.find(headerSelector).scrollLeft(this.scrollLeft);
                treeListWrapper.find(contentSelector).scrollTop(this.scrollTop);
            });

            treeListWrapper.find(contentSelector)
                .on("scroll", function(e) {
                    treeListWrapper.find(headerSelector).scrollLeft(this.scrollLeft);
                })
                .on("DOMMouseScroll" + NS + " mousewheel" + NS, function(e) {
                    var content = timelineWrapper.find(contentSelector);
                    var scrollTop = content.scrollTop();
                    var delta = kendo.wheelDeltaY(e);

                    if (delta) {
                        e.preventDefault();
                        //In Firefox DOMMouseScroll event cannot be canceled
                        $(e.currentTarget).one("wheel" + NS, false);

                        content.scrollTop(scrollTop + (-delta));
                    }
                });
        },

        _navigatable: function() {
            var that = this;
            var navigatable = this.options.navigatable;
            var editable = this.options.editable;
            var headerTable = this.list.header.find("table");
            var contentTable = this.list.content.find("table");
            var ganttStyles = Gantt.styles;
            var timelineContent = this.timeline.element.find(DOT + ganttStyles.gridContent);
            var tables = headerTable.add(contentTable);
            var attr = selector();
            var cellIndex;
            var expandState = {
                collapse: false,
                expand: true
            };

            var scroll = function(reverse) {
                var width = that.timeline.view()._timeSlots()[0].offsetWidth;
                timelineContent.scrollLeft(timelineContent.scrollLeft() + (reverse ? -width : width));
            };
            var moveVertical = function(method) {
                var parent = that.current.parent("tr" + selector());
                var index = that.current.index();
                var subling = parent[method]();

                if (that.select().length !== 0) {
                    that.clearSelection();
                }

                if (subling.length !== 0) {
                    that._current(subling.children("td:eq(" + index + ")"));
                    that._scrollTo(that.current);
                } else {
                    if (that.current.is("td") && method == "prev") {
                        focusTable(headerTable);
                    } else if (that.current.is("th") && method == "next") {
                        focusTable(contentTable);
                    }
                }
            };
            var moveHorizontal = function(method) {
                var subling = that.current[method]();

                if (subling.length !== 0) {
                    that._current(subling);
                    cellIndex = that.current.index();
                }
            };
            var toggleExpandedState = function(value) {
                var model = that.dataItem(that.current);

                if (model.summary && model.expanded !== value) {
                    model.set("expanded", value);
                }
            };
            var deleteAction = function() {
                if (!that.options.editable || that.list.editable) {
                    return;
                }

                var selectedTask = that.select();
                var uid = kendo.attr("uid");

                if (selectedTask.length) {
                    that.removeTask(selectedTask.attr(uid));
                }
            };

            $(this.wrapper)
                .on("mousedown" + NS, "tr" + attr + ", div" + attr + ":not(" + DOT + ganttStyles.line + ")", function(e) {
                    var currentTarget = $(e.currentTarget);
                    var isInput = $(e.target).is(":button,a,:input,a>.k-icon,textarea,span.k-icon,span.k-link,.k-input,.k-multiselect-wrap");
                    var current;

                    if (e.ctrlKey) {
                        return;
                    }

                    if (navigatable) {
                        if (currentTarget.is("tr")) {
                            current = $(e.target).closest("td");
                        } else {
                            current = that.list
                                .content.find("tr" + selector(currentTarget.attr(kendo.attr("uid"))) + " > td:first");
                        }

                        that._current(current);
                    }

                    if ((navigatable || editable) && !isInput) {
                        setTimeout(function() {
                            focusTable(that.list.content.find("table"), true);
                        }, 2);
                    }
                });

            if (navigatable !== true) {
                contentTable
                    .on("keydown" + NS, function(e) {
                        if (e.keyCode == keys.DELETE) {
                            deleteAction();
                        }
                    });

                return;
            }

            tables
                .on("focus" + NS, function(e) {
                    var selector = this === contentTable.get(0) ? "td" : "th";
                    var table = $(this);
                    var selection = that.select();
                    var current = that.current || $((selection.length ? selection : this))
                        .find(selector + ":eq(" + (cellIndex || 0) + ")");

                    that._current(current);
                })
                .on("blur" + NS, function() {
                    that._current();

                    if (this == headerTable) {
                        $(this).attr(TABINDEX, -1);
                    }
                })
                .on("keydown" + NS, function(e) {
                    var key = e.keyCode;
                    var isCell;

                    if (!that.current) {
                        return;
                    }

                    isCell = that.current.is("td");

                    switch (key) {
                        case keys.RIGHT:
                            e.preventDefault();
                            if (e.altKey) {
                                scroll();
                            } else if (e.ctrlKey) {
                                toggleExpandedState(expandState.expand);
                            } else {
                                moveHorizontal("next");
                            }
                            break;
                        case keys.LEFT:
                            e.preventDefault();
                            if (e.altKey) {
                                scroll(true);
                            } else if (e.ctrlKey) {
                                toggleExpandedState(expandState.collapse);
                            } else {
                                moveHorizontal("prev");
                            }
                            break;
                        case keys.UP:
                            e.preventDefault();
                            moveVertical("prev");
                            break;
                        case keys.DOWN:
                            e.preventDefault();
                            moveVertical("next");
                            break;
                        case keys.SPACEBAR:
                            e.preventDefault();
                            if (isCell) {
                                that.select(that.current.closest("tr"));
                            }
                            break;
                        case keys.ENTER:
                            e.preventDefault();
                            if (isCell) {
                                if (that.options.editable) {
                                    that._cachedCurrent = that.current;
                                    that.list._startEditHandler(that.current);
                                    /* Stop the event propagation so that the list widget won't close its editor immediately */
                                    e.stopPropagation();
                                }
                            } else {
                                /* Sort */
                                that.current
                                    .children("a.k-link")
                                    .click();
                            }
                            break;
                        case keys.ESC:
                            e.stopPropagation();
                            break;
                        case keys.DELETE:
                            if (isCell) {
                                deleteAction();
                            }
                            break;
                        default:
                            if (key >= 49 && key <= 57) {
                                that.view(that.timeline._viewByIndex(key - 49));
                            }
                            break;
                    }
                });
        },

        _current: function(element) {
            var ganttStyles = Gantt.styles;
            var activeElement;

            if (this.current && this.current.length) {
                this.current
                    .removeClass(ganttStyles.focused)
                    .removeAttr("id");
            }

            if (element && element.length) {
                this.current = element
                    .addClass(ganttStyles.focused)
                    .attr("id", ACTIVE_CELL);

                activeElement = $(kendo._activeElement());

                if (activeElement.is("table") && this.wrapper.find(activeElement).length > 0) {
                    activeElement
                        .removeAttr(ARIA_DESCENDANT)
                        .attr(ARIA_DESCENDANT, ACTIVE_CELL);
                }
            } else {
                this.current = null;
            }
        },

        _dataBind: function() {
            var that = this;

            if (that.options.autoBind) {
                this._preventRefresh = true;
                this._preventDependencyRefresh = true;

                var promises = $.map([this.dataSource, this.dependencies], function(dataSource) {
                    return dataSource.fetch();
                });

                $.when.apply(null, promises)
                    .done(function() {
                        that._preventRefresh = false;
                        that._preventDependencyRefresh = false;
                        that.refresh();
                    });
            }
        },

        _resize: function() {
            this._adjustDimensions();
            this.timeline.view()._adjustHeight();
            this.list._adjustHeight();
        }
    });
    
    if (kendo.PDFMixin) {
        kendo.PDFMixin.extend(Gantt.prototype);
    }

    kendo.ui.plugin(Gantt);

    extend(true, Gantt, { styles: ganttStyles });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
