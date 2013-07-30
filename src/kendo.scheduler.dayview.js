kendo_module({
    id: "scheduler.dayview",
    name: "Scheduler Day View",
    category: "web",
    description: "The Scheduler Day View",
    depends: [ "scheduler.view" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        addDays = kendo.date.addDays,
        setTime = kendo.date.setTime,
        SchedulerView = ui.SchedulerView,
        extend = $.extend,
        proxy = $.proxy,
        getDate = kendo.date.getDate,
        MS_PER_MINUTE = kendo.date.MS_PER_MINUTE,
        MS_PER_DAY = kendo.date.MS_PER_DAY,
        getMilliseconds = kendo.date.getMilliseconds,
        NS = ".kendoMultiDayView";

    var DAY_VIEW_EVENT_TEMPLATE = kendo.template('<div title="(#=kendo.format("{0:t} - {1:t}", start, end)#): #=title.replace(/"/g,"&\\#34;")#">' +
                    '<dl>' +
                        '<dt>#=kendo.format("{0:t} - {1:t}", start, end)#</dt>' +
                        '<dd>${title}</dd>' +
                    '</dl>' +
                '</div>'),
        DAY_VIEW_ALL_DAY_EVENT_TEMPLATE = kendo.template('<div title="(#=kendo.format("{0:t}", start)#): #=title.replace(/"/g,"&\\#34;")#">' +
                    '<dl><dd>${title}</dd></dl>' +
                '</div>'),
        DATA_HEADER_TEMPLATE = kendo.template("<span class='k-link k-nav-day'>#=kendo.toString(date, 'ddd M/dd')#</span>"),
        ALLDAY_EVENT_WRAPPER_STRING = '<div class="k-event" data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                    'style="background-color:#=resources[0].color #"' +
                '#}#' +
                '>' +
                '<span class="k-event-actions">' +
                    '# if(data.tail || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-w"></span>' +
                    '#}#' +
                    '# if(data.id && data.recurrenceId) {#' +
                        '<span class="k-icon k-i-exception"></span>' +
                    '# } else if(data.recurrenceRule || data.recurrenceId) {#' +
                        '<span class="k-icon k-i-refresh"></span>' +
                    '# } #' +
                '</span>' +
                '{0}' +
                '<span class="k-event-actions">' +
                    '#if (showDelete) {#' +
                        '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-si-close"></span></a>' +
                    '#}#' +
                    '# if(data.head || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-e"></span>' +
                    '#}#' +
                '</span>' +
                '#if(resizable && !singleDay && !data.tail && !data.middle){#' +
                '<span class="k-resize-handle k-resize-w"></span>' +
                '#}#' +
                '#if(resizable && !singleDay && !data.head && !data.middle){#' +
                '<span class="k-resize-handle k-resize-e"></span>' +
                '#}#' +
                '</div>',
        EVENT_WRAPPER_STRING = '<div class="k-event" data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                'style="background-color:#=resources[0].color #"' +
                '#}#' +
                '>' +
                 '<span class="k-event-actions">' +
                    '# if(data.id && data.recurrenceId) {#' +
                        '<span class="k-icon k-i-exception"></span>' +
                    '# } else if(data.recurrenceRule || data.recurrenceId) {#' +
                        '<span class="k-icon k-i-refresh"></span>' +
                    '# } #' +
                '</span>' +
                '{0}' +
                '<span class="k-event-actions">' +
                    '#if (showDelete) {#' +
                        '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-si-close"></span></a>' +
                    '#}#' +
                '</span>' +
                '<span class="k-event-top-actions">' +
                    '# if(data.tail || data.middle) {#' +
                    '<span class="k-icon k-i-arrow-n"></span>' +
                    '# } #' +
                '</span>' +
                '<span class="k-event-bottom-actions">' +
                    '# if(data.head || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-s"></span>' +
                    '# } #' +
                '</span>' +
                '# if(resizable && !data.tail && !data.middle) {#' +
                '<span class="k-resize-handle k-resize-n"></span>' +
                '# } #' +
                '# if(resizable && !data.head && !data.middle) {#' +
                    '<span class="k-resize-handle k-resize-s"></span>' +
                '# } #' +
                '</div>';

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        setTime(staticDate, getMilliseconds(date));
        return staticDate;
    }

    function isInDateRange(value, min, max) {
        var msMin = min.getTime(),
            msMax = max.getTime(),
            msValue;

        msValue = value.getTime();

        return msValue >= msMin && msValue <= msMax;
    }

    function isInTimeRange(value, min, max) {
        return value > min && value < max;
    }

    function allDaySlotByPosition(rows, x, y) {
       for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
           for (var slotIndex = 0; slotIndex < rows[rowIndex].slots.length; slotIndex++) {
               var slot = rows[rowIndex].slots[slotIndex];

               if (x >= slot.offsetLeft && x < slot.offsetLeft + slot.clientWidth &&
                   y >= slot.offsetTop && y < slot.offsetTop + slot.clientHeight) {
                   return slot;
               }
           }
       }
    }

    var MultiDayView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that._templates();

            that._editable();

            that.calculateDateRange();

            that._slots();
       },

       _toDaySlot: function(slot) {
            if (!slot.isAllDay) {
                return slot;
            }

            var rowIndex = 0;

            if (this._isVerticallyGrouped()) {
                rowIndex += slot.groupIndex * this._rowCountInGroup();
            }

            return this._columns[slot.columnIndex].slots[rowIndex];
       },

       _toAllDaySlot: function(slot) {
            if (slot.isAllDay) {
                return slot;
            }

            return this._rows[slot.groupIndex].slots[slot.columnIndex];
       },

       _updateResizeHint: function(direction, startSlot, endSlot) {
            var vertical = direction == "south" || direction == "north";
            var container = this.content;
            var format;

            var hintSize = function(slots, startIndex, endIndex, size) {
                var result = 0;

                for (var slotIndex = startIndex; slotIndex < endIndex; slotIndex++) {
                    result += slots[slotIndex][size];
                }

                result += slots[endIndex][size];

                return result;
            };

            this._removeResizeHint();

            if (vertical) {
                startSlot = this._toDaySlot(startSlot);
                endSlot = this._toDaySlot(endSlot);

                var slotGroups = [];

                for (var columnIndex = startSlot.columnIndex; columnIndex <= endSlot.columnIndex; columnIndex++) {
                    var slots = this._columns[columnIndex].slots;
                    var firstIndex = 0;
                    var lastIndex = slots.length - 1;

                    if (this._isVerticallyGrouped()) {
                        firstIndex = startSlot.groupIndex * this._rowCountInGroup();
                        lastIndex = (startSlot.groupIndex + 1) * this._rowCountInGroup() - 1;
                    }

                    var first = slots[firstIndex];
                    var last = slots[lastIndex];

                    if (first.start < startSlot.start) {
                        first = startSlot;
                    }

                    if (last.start > endSlot.start) {
                        last = endSlot;
                    }

                    slotGroups.push( {
                        startSlot: first,
                        endSlot: last
                    });
                }

                for (var groupIndex = 0; groupIndex < slotGroups.length; groupIndex++) {
                    var slotGroup = slotGroups[groupIndex];
                    startSlot = slotGroup.startSlot;
                    endSlot = slotGroup.endSlot;

                    var hint = SchedulerView.fn._createResizeHint.call(this,
                        startSlot.offsetLeft,
                        startSlot.offsetTop,
                        startSlot.offsetWidth,
                        hintSize(this._columns[startSlot.columnIndex].slots, startSlot.index, endSlot.index, "offsetHeight")
                    );

                    hint.appendTo(container);

                    this._resizeHint = this._resizeHint.add(hint);
                }

                format = "t";
            } else {
                startSlot = this._toAllDaySlot(startSlot);
                endSlot = this._toAllDaySlot(endSlot);

                container = this.element.find(".k-scheduler-header-wrap:has(.k-scheduler-header-all-day)");

                if (!container.length) {
                    container = this.content;
                }

                this._resizeHint = SchedulerView.fn._createResizeHint.call(this,
                    startSlot.offsetLeft,
                    startSlot.offsetTop,
                    hintSize(this._rows[0].slots, startSlot.columnIndex, endSlot.columnIndex, "offsetWidth"),
                    startSlot.clientHeight
                );

                this._resizeHint.appendTo(container);

                format = "M/dd";
            }

            this._resizeHint.find(".k-label-top,.k-label-bottom").text("");

            this._resizeHint.first().addClass("k-first").find(".k-label-top").text(kendo.toString(startSlot.start, format));

            this._resizeHint.last().addClass("k-last").find(".k-label-bottom").text(kendo.toString(endSlot.end, format));
        },

        _updateMoveHint: function(event, initialSlot, currentSlot) {
            var isAllDay = event.isAllDay || event.end.getTime() - event.start.getTime() > MS_PER_DAY;
            var slots;
            var groupOffset = currentSlot.groupIndex * this._columnCountInGroup();

            if (isAllDay) {
                currentSlot = this._toAllDaySlot(currentSlot);
                slots = this._rows[currentSlot.index].slots;
            } else {
                currentSlot = this._toDaySlot(currentSlot);
                slots = this._columns[currentSlot.columnIndex].slots;
            }

            var distance = currentSlot.start.getTime() - initialSlot.start.getTime();

            var duration = event.end.getTime() - event.start.getTime();

            var start = new Date(event.start.getTime());

            kendo.date.setTime(start, distance);

            var end = new Date(start.getTime());

            setTime(end, duration);

            var startSlotIndex;
            var endSlotIndex;

            if (isAllDay) {
                startSlotIndex = this._dateSlotIndex(start) + groupOffset;
                endSlotIndex = this._dateSlotIndex(end) + groupOffset;
            } else {
                startSlotIndex = Math.floor(this._timeSlotIndex(start));
                endSlotIndex = Math.ceil(this._timeSlotIndex(end));

                if (this._isVerticallyGrouped()) {
                  startSlotIndex += currentSlot.groupIndex * this._rowCountInGroup();
                  endSlotIndex   += currentSlot.groupIndex * this._rowCountInGroup();
                }
            }

            if (startSlotIndex < 0) {
               startSlotIndex = 0;
            }

            if (endSlotIndex < 0) {
                endSlotIndex = slots.length - 1;
            }

            if (isAllDay && this._isGroupedByDate()) {
                startSlotIndex = endSlotIndex = currentSlot.columnIndex;
            }


            var startSlot = slots[startSlotIndex];

            this._removeMoveHint();

            if (!isAllDay) {
                var endDateSlotIndex = Math.max(0, this._dateSlotIndex(end));

                if (getMilliseconds(end) === 0 || getMilliseconds(end) < getMilliseconds(this.options.startTime)) {
                    endDateSlotIndex = this._dateSlotIndex(start);
                }

                slots = this._columns[endDateSlotIndex + groupOffset].slots;

                endSlotIndex = Math.min(slots.length - 1, endSlotIndex);


                var endSlot = slots[endSlotIndex];

                var slotGroups = [];

                for (var columnIndex = startSlot.columnIndex; columnIndex <= endSlot.columnIndex; columnIndex++) {
                    slots = this._columns[columnIndex].slots;
                    var firstIndex = 0;
                    var lastIndex = slots.length - 1;

                    if (this._isVerticallyGrouped()) {
                        firstIndex = currentSlot.groupIndex * this._rowCountInGroup();
                        lastIndex = (currentSlot.groupIndex + 1) * this._rowCountInGroup() - 1;
                    }

                    var first = slots[firstIndex];
                    var last = slots[lastIndex];

                    if (first.start < startSlot.start) {
                        first = startSlot;
                    }

                    if (last.start > endSlot.start) {
                        last = endSlot;
                    }

                    slotGroups.push( {
                        startSlot: first,
                        endSlot: last
                    });
                }

                for (var groupIndex = 0; groupIndex < slotGroups.length; groupIndex++) {
                    var slotGroup = slotGroups[groupIndex];
                    startSlot = slotGroup.startSlot;
                    endSlot = slotGroup.endSlot;
                    endSlotIndex = endSlot.index;

                    if (this._isVerticallyGrouped()) {
                        if (endSlotIndex == (currentSlot.groupIndex + 1) * this._rowCountInGroup() - 1) {
                            endSlotIndex ++;
                        }
                    } else {
                        if (endSlotIndex == slots.length -1) {
                            endSlotIndex ++;
                        }
                    }

                    var hint = this._createEventElement($.extend({}, event, { start: start, end: end }), true);

                    hint.addClass("k-event-drag-hint");
                    hint.css({
                        left: startSlot.offsetLeft + 2,
                        top: startSlot.offsetTop,
                        width: startSlot.clientWidth * 0.9 - 4,
                        height: this._calculateEventHeight(this._columns[startSlot.columnIndex].slots, startSlot.index, endSlotIndex) - 3
                    });

                    this._moveHint = this._moveHint.add(hint);
                }
            } else {

                if (!event.isAllDay) {
                    endSlotIndex = Math.max(startSlotIndex, endSlotIndex - 1);
                }

                this._moveHint = this._createEventElement($.extend({}, event, { start: start, end: end }), false);
                this._moveHint.addClass("k-event-drag-hint");

                this._moveHint.css({
                    left: startSlot.offsetLeft + 2,
                    top: startSlot.offsetTop,
                    width: this._calculateAllDayEventWidth(slots, startSlotIndex, endSlotIndex) - 4
                });
            }

            var content = this.content;

            if (isAllDay) {
                content = this.element.find(".k-scheduler-header-wrap:has(.k-scheduler-header-all-day)");
                if (!content.length) {
                    content = this.content;
                }
            }

            this._moveHint.appendTo(content);
        },

       _slotByPosition: function(x, y) {
           var slot;
           var offset = this.element.find(".k-scheduler-header-wrap:has(.k-scheduler-header-all-day)").offset();

           if (offset) {
               x -= offset.left;
               y -= offset.top;
           }

           x = Math.ceil(x);
           y = Math.ceil(y);

           slot = allDaySlotByPosition(this._rows, x, y);

           if (slot) {
                return slot;
           }

           if (offset) {
               x += offset.left;
               y += offset.top;
           }

           offset = this.content.offset();

           x -= offset.left;
           y -= offset.top;
           y += this.content[0].scrollTop;
           x += this.content[0].scrollLeft;

           x = Math.ceil(x);
           y = Math.ceil(y);

           if (this._rows.length > 1) {
               slot = allDaySlotByPosition(this._rows, x, y);

               if (slot) {
                    return slot;
               }
           }

           var column;

           for (var columnIndex = 0; columnIndex < this._columns.length; columnIndex++) {
               column = this._columns[columnIndex];

               if (x >= column.offsetLeft && x < column.offsetLeft + column.clientWidth) {
                    break;
               } else {
                    column = null;
               }
           }

           if (column) {
               for (var slotIndex = 0; slotIndex < column.slots.length; slotIndex++) {
                   slot = column.slots[slotIndex];

                   if (y >= slot.offsetTop && y <= slot.offsetTop + slot.clientHeight) {
                       return slot;
                   }
               }
           }
       },

       _slots: function() {
            var tableRows = this.content[0].getElementsByTagName("tr");

            var columnCount = tableRows[0].children.length;
            var columns = [];

            for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                columns.push({
                    slots: [],
                    events: []
                });
            }

            var tableCells;
            var cellIndex;
            var td;
            var range;
            var cell;
            var visibleAllDayRowCount = 0;
            var isVertical = this._groupOrientation() === "vertical";

            var allDaySelector = ".k-scheduler-header-all-day tr";

            if (this._isVerticallyGrouped()) {
               allDaySelector = ".k-scheduler-header-all-day";
            }

            var allDayRows = this.element.find(allDaySelector);

            var allDayRowCount = this._isVerticallyGrouped() ? allDayRows.length : 0;

            for (var rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
                var tr = tableRows[rowIndex];

                if (tr.className && tr.className.indexOf("k-scheduler-header-all-day") > -1) {
                    visibleAllDayRowCount++;
                    continue;
                }

                tableCells = tr.children;

                for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                    td = tableCells[cellIndex];

                    range = this._rangeByIndex(rowIndex - visibleAllDayRowCount, cellIndex, tableRows.length - 1 - allDayRowCount);

                    cell = {
                        offsetTop: td.offsetTop,
                        offsetLeft: td.offsetLeft,
                        clientHeight: td.clientHeight,
                        offsetHeight: td.offsetHeight,
                        clientWidth: td.clientWidth,
                        offsetWidth: td.offsetWidth,
                        element: td,
                        start: range.start,
                        end: range.end
                    };

                    cell.index = columns[cellIndex].slots.length;
                    cell.columnIndex = cellIndex;

                    if (isVertical) {
                        cell.groupIndex = this._groupVerticalIndex(rowIndex - visibleAllDayRowCount);
                    } else {
                        cell.groupIndex = this._groupHorizontalIndex(cellIndex);
                    }

                    columns[cellIndex].slots.push(cell);
                    columns[cellIndex].offsetLeft = cell.offsetLeft;
                    columns[cellIndex].clientWidth = cell.clientWidth;
                }
            }

            this._columns = columns;

            var rows = [];

            var row = { slots: [], events: [] };
            if (!allDayRows.length) {
                rows.push(row);
            } else {
                var rowsInGroup = 0;
                if (this._isVerticallyGrouped()) {
                    rowsInGroup = this._rowCountInGroup();
                }

                for (rowIndex = 0; rowIndex < allDayRows.length; rowIndex++) {
                    row = { slots: [], events: [] };

                    tableCells = allDayRows[rowIndex].children;

                    for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                        td = tableCells[cellIndex];

                        range = this._rangeByIndex(rowIndex, cellIndex, allDayRows.length);

                        cell = {
                            offsetTop: allDayRows.length > 1 ? td.offsetTop : td.parentNode.parentNode.parentNode.offsetTop,
                            offsetLeft: td.offsetLeft,
                            clientHeight: td.clientHeight,
                            offsetHeight: td.offsetHeight,
                            offsetWidth: td.offsetWidth,
                            clientWidth: td.clientWidth,
                            element: td,
                            isAllDay: true,
                            start: range.start,
                            end: range.end,
                            index: rowIndex,
                            columnIndex: cellIndex
                        };

                        if (isVertical) {
                            cell.groupIndex = rowIndex;
                        } else {
                            cell.groupIndex = this._groupHorizontalIndex(cellIndex);
                        }

                        row.slots.push(cell);
                    }
                    rows.push(row);
                }
            }

            this._rows = rows;
       },

       options: {
            name: "MultiDayView",
            selectedDateFormat: "{0:D}",
            allDaySlot: true,
            title: "",
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            minorTickCount: 2,
            majorTick: 60,
            majorTimeHeaderTemplate: "#=kendo.toString(date, 't')#",
            minorTimeHeaderTemplate: "&nbsp;",
            eventTemplate: DAY_VIEW_EVENT_TEMPLATE,
            allDayEventTemplate: DAY_VIEW_ALL_DAY_EVENT_TEMPLATE,
            dateHeaderTemplate: DATA_HEADER_TEMPLATE,
            editable: true,
            messages: {
                allDay: "all day"
            }
        },

        events: ["remove", "add", "edit"],

        _templates: function() {
            var options = this.options,
                settings = extend({}, kendo.Template, options.templateSettings);

            this.eventTemplate = this._eventTmpl(options.eventTemplate, EVENT_WRAPPER_STRING);
            this.allDayEventTemplate = this._eventTmpl(options.allDayEventTemplate, ALLDAY_EVENT_WRAPPER_STRING);

            this.majorTimeHeaderTemplate = kendo.template(options.majorTimeHeaderTemplate, settings);
            this.minorTimeHeaderTemplate = kendo.template(options.minorTimeHeaderTemplate, settings);
            this.dateHeaderTemplate = kendo.template(options.dateHeaderTemplate, settings);
        },

        _editable: function() {
            if (this.options.editable) {
                if (kendo.support.mobileOS) {
                    this._touchEditable();
                } else {
                    this._mouseEditable();
                }
            }
        },

        _mouseEditable: function() {
            var that = this;
            that.element.on("click" + NS, ".k-event a:has(.k-si-close)", function(e) {
                that.trigger("remove", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                e.preventDefault();
            });

            if (that.options.editable.create !== false) {
                that.element.on("dblclick" + NS, ".k-scheduler-content td", function(e) {
                    if (!$(this).parent().hasClass("k-scheduler-header-all-day")) {
                        var slot = that._slotByPosition(e.pageX, e.pageY);

                        var resourceInfo = that._resourceBySlot(slot);

                        that.trigger("add", { eventInfo: extend({ start: slot.start, end: slot.end }, resourceInfo) });

                        e.preventDefault();
                    }
                }).on("dblclick" + NS, ".k-scheduler-header-all-day td", function(e) {
                    var slot = that._slotByPosition(e.pageX, e.pageY);
                    var resourceInfo = that._resourceBySlot(slot);

                    that.trigger("add", { eventInfo: extend({}, { isAllDay: true, start: kendo.date.getDate(slot.start), end: kendo.date.getDate(slot.end) }, resourceInfo) });

                    e.preventDefault();
                });
            }

            if (that.options.editable.update !== false) {
                that.element.on("dblclick" + NS, ".k-event", function(e) {
                    that.trigger("edit", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
                });
            }
        },

        _touchEditable: function() {
            var that = this;

            that._closeUserEvents = new kendo.UserEvents(that.element, {
               filter: ".k-event a:has(.k-si-close)",
               tap: function(e) {
                    that.trigger("remove", { uid: $(e.target).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
               }
            });

            if (that.options.editable.create !== false) {
                that._addUserEvents = new kendo.UserEvents(that.element, {
                    filter:  ".k-scheduler-content td",
                    tap: function(e) {
                        if (!$(e.target).parent().hasClass("k-scheduler-header-all-day")) {
                            var slot = that._slotByPosition(e.x.location, e.y.location);
                            var resourceInfo = that._resourceBySlot(slot);
                            that.trigger("add", { eventInfo: extend({ start: slot.start, end: slot.end }, resourceInfo) });
                            e.preventDefault();
                        }
                    }
                });

                that._allDayUserEvents = new kendo.UserEvents(that.element, {
                    filter: ".k-scheduler-header-all-day td",
                    tap: function(e) {
                        var slot = that._slotByPosition(e.x.location, e.y.location);
                        var resourceInfo = that._resourceBySlot(slot);

                        that.trigger("add", { eventInfo: extend({}, { isAllDay: true, start: kendo.date.getDate(slot.start), end: kendo.date.getDate(slot.end) }, resourceInfo) });

                        e.preventDefault();
                    }
                });
            }

            if (that.options.editable.update !== false) {
                that._editUserEvents = new kendo.UserEvents(that.element, {
                    filter: ".k-event.k-state-selected",
                    tap: function(e) {
                        if ($(e.event.target).closest("a:has(.k-si-close)").length === 0) {
                            that.trigger("edit", { uid: $(e.target).closest(".k-event").attr(kendo.attr("uid")) });
                            e.preventDefault();
                        }
                    }
                });
            }
        },

        _layout: function(dates) {
            var columns = [];
            var rows = [];
            var options = this.options;
            var that = this;

            for (var idx = 0; idx < dates.length; idx++) {
                var column = {};

                column.text = that.dateHeaderTemplate({ date: dates[idx] });

                if (kendo.date.isToday(dates[idx])) {
                    column.className = "k-today";
                }

                columns.push(column);
            }

            if (options.allDaySlot) {
                rows.push( { text: options.messages.allDay, allDay: true });
            }

            this._forTimeRange(options.startTime, options.endTime, function(date, majorTick, middleRow, lastSlotRow) {
                var template = majorTick ? that.majorTimeHeaderTemplate : that.minorTimeHeaderTemplate;

                var row = {
                    text: template({ date: date }),
                    className: lastSlotRow ? "k-slot-cell" : ""
                };

                rows.push(row);
            });

            var resources = this.groupedResources;

            if (resources.length) {
                if (this._groupOrientation() === "vertical") {
                    rows = this._createRowsLayout(resources, rows);
                } else {
                    columns = this._createColumnsLayout(resources, columns);
                }
            }

            return {
                columns: columns,
                rows: rows
            };
        },

        _footer: function() {
            var html = '<div class="k-header k-scheduler-footer">&nbsp;';
            // '<ul class="k-reset k-header k-toolbar"> <li>aaa</li></ul>';

            //TODO: Toolbar command

            html += "</div>";

            this.footer = $(html).appendTo(this.element);
        },

        _forTimeRange: function(min, max, action, after) {
            min = toInvariantTime(min); //convert the date to 1/2/1980 and sets the time
            max = toInvariantTime(max);

            var that = this,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                minorTickCount = that.options.minorTickCount,
                msMajorInterval = that.options.majorTick * MS_PER_MINUTE,
                msInterval = msMajorInterval / minorTickCount || 1,
                start = new Date(+min),
                startDay = start.getDate(),
                msStart,
                idx = 0, length,
                html = "";

            length = MS_PER_DAY / msInterval;

            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                length = ((msMax - msMin) / msInterval);
            }

            length = Math.round(length);

            for (; idx < length; idx++) {
                var majorTickDivider = idx % (msMajorInterval/msInterval),
                    isMajorTickRow = majorTickDivider === 0,
                    isMiddleRow = majorTickDivider < minorTickCount - 1,
                    isLastSlotRow = majorTickDivider === minorTickCount - 1;

                html += action(start, isMajorTickRow, isMiddleRow, isLastSlotRow);

                setTime(start, msInterval, false);
            }

            if (msMax) {
                msStart = getMilliseconds(start);
                if (startDay < start.getDate()) {
                    msStart += MS_PER_DAY;
                }

                if (msStart > msMax) {
                    start = new Date(+max);
                }
            }

            if (after) {
                html += after(start);
            }

            return html;
        },

        _content: function(dates) {
            var that = this;
            var options = that.options;
            var start = options.startTime;
            var end = options.endTime;
            var groupsCount = 1;
            var rowCount = 1;
            var columnCount = dates.length;
            var html = '';
            var resources = this.groupedResources;
            var allDayVerticalGroupRow = "";

            if (resources.length) {
                if (that._groupOrientation() === "vertical") {
                    rowCount = this._rowCountForLevel(this.rowLevels.length - 2);
                    if (options.allDaySlot) {
                        allDayVerticalGroupRow = '<tr class="k-scheduler-header-all-day">' + new Array(dates.length + 1).join("<td>&nbsp;</td>") + '</tr>';
                    }
                } else {
                    groupsCount = this._columnCountForLevel(this.columnLevels.length - 2);

                    if (this._isGroupedByDate()) {
                        groupsCount = this._columnCountForLevel(resources.length);
                        columnCount = 1;
                    }
                }

            }

            html += '<tbody>';

            var appendRow = function(date, majorTick) {
                var content = "",
                    idx,
                    length;

                content = '<tr' + (majorTick ? ' class="k-middle-row"' : "") + '>';

                for (var groupIdx = 0; groupIdx < groupsCount; groupIdx++) {
                    for (idx = 0, length = columnCount; idx < length; idx++) {
                        content += "<td" + (kendo.date.isToday(dates[idx]) ? ' class="k-today"' : "") + ">";
                        content += "&nbsp;</td>";
                    }
                }

                content += "</tr>";

                return content;
            };

            for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                html += allDayVerticalGroupRow;

                html += this._forTimeRange(start, end, appendRow);
            }

            html += '</tbody>';

            this.content.find("table").append(html);
        },

        _render: function(dates) {
            var that = this;

            dates = dates || [];

            this._dates = dates;

            this._startDate = dates[0];

            this._endDate = dates[(dates.length - 1) || 0];

            this.createLayout(this._layout(dates));

            this._content(dates);

            this._footer();

            this.refreshLayout();

            var allDayHeader = this.element.find(".k-scheduler-header-all-day td");
            if (allDayHeader.length) {
                this._allDayHeaderHeight = allDayHeader.first()[0].clientHeight;
            }

            that.datesHeader.on("click" + NS, ".k-nav-day", function(e) {
                var cell = $(e.currentTarget).closest("th");

                that.trigger("navigate", { view: "day", date: that._slotIndexDate(cell.index()) });
            });
        },

        startDate: function() {
            return this._startDate;
        },

        endDate: function() {
            return this._endDate;
        },

        _end: function(isAllDay) {
            var time = getMilliseconds(this.options.endTime) || MS_PER_DAY;

            if (isAllDay) {
                time = 0;
            }

            return new Date(this._endDate.getTime() + time);
        },

        nextDate: function() {
            return kendo.date.nextDay(this.endDate());
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate());
        },

        calculateDateRange: function() {
            this._render([this.options.date]);
        },

        destroy: function() {
            var that = this;

            if (that.datesHeader) {
                that.datesHeader.off(NS);
            }

            if (that.element) {
                that.element.off(NS);
            }

            SchedulerView.fn.destroy.call(this);

            if (that.footer) {
                that.footer.remove();
            }

            if (kendo.support.mobileOS) {
                that._closeUserEvents.destroy();

                if (that.options.editable.create !== false) {
                    that._addUserEvents.destroy();
                    that._allDayUserEvents.destroy();
                }

                if (that.options.editable.update !== false) {
                    that._editUserEvents.destroy();
                }
            }
        },

        selectionByElement: function(cell) {
            var offset = cell.offset();
            return this._slotByPosition(offset.left, offset.top);
        },

        _slotIndexTime: function(index) {
            index = this._adjustSlotIndex(index);
            return getMilliseconds(this.options.startTime) + this._timeSlotInterval() * index;
        },

        _timeSlotInterval: function() {
            var options = this.options;
            return (options.majorTick/options.minorTickCount) * MS_PER_MINUTE;
        },

        _rangeByIndex: function(rowIndex, cellIndex, maxTimeSlotIndex) {
            var slotDate = kendo.date.getDate(this._slotIndexDate(cellIndex));

            var slotEndDate = kendo.date.getDate(slotDate);

            setTime(slotDate, this._slotIndexTime(rowIndex));

            maxTimeSlotIndex = this._adjustSlotIndex(maxTimeSlotIndex);
            if (this._adjustSlotIndex(rowIndex) >= maxTimeSlotIndex) {
                setTime(slotEndDate, getMilliseconds(this.options.endTime));
                if (kendo.date.getDate(slotEndDate).getTime() === slotEndDate.getTime()) {
                    slotEndDate = kendo.date.nextDay(slotEndDate);
                }
            } else {
                setTime(slotEndDate, this._slotIndexTime(rowIndex + 1));
            }

            return {
                start: slotDate,
                end: slotEndDate
            };
        },

        _slotIndexDate: function(index) {
            var idx;
            var length;
            var slots = this._dates || [];
            var startTime = getMilliseconds(new Date(+this.options.startTime));
            var endTime = getMilliseconds(new Date(+this.options.endTime));
            var slotStart;

            if (startTime >= endTime) {
                endTime += MS_PER_DAY;
            }

            var resources = this.groupedResources;
            var isVertical = this._groupOrientation() === "vertical";

            if (resources.length && !isVertical) {
                index = this._adjustColumnIndex(index);
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = new Date(+slots[idx]);
                setTime(slotStart, startTime);

                if (index === idx) {
                    return slotStart;
                }
            }
            return null;
        },

        _adjustSlotIndex: function(index) {
            if (this._isVerticallyGrouped()) {
                var rowCount = this._rowCountInGroup();
                return index - (rowCount*Math.floor(index/rowCount));
            }
            return index;
        },

        _groupHorizontalIndex: function(cellIndex) {
            if (this.groupedResources.length) {
                return Math.floor(cellIndex/this._columnCountInGroup());
            }
            return 0;
        },

        _groupVerticalIndex: function(rowIndex) {
            if (this.groupedResources.length) {
                return Math.floor(rowIndex/this._rowCountInGroup());
            }
            return 0;
        },

        _adjustColumnIndex: function(index) {
            var columnCount = this._columnCountInGroup();

            if (this._isGroupedByDate()) {
                return Math.floor(index/columnCount);
            }

            return index - columnCount*Math.floor(index/columnCount);
        },

        _columnCountInGroup: function() {
            var resources = this.groupedResources;

            if (!resources.length) {
                return 0;
            }

            if (this._isGroupedByDate()) {
                return this._columnCountForLevel(resources.length)/this._columnCountForLevel(0);
            }

            return this._columnOffsetForResource(resources.length);
        },

        _rowCountInGroup: function() {
            var resources = this.groupedResources;

            if (!resources.length) {
                return 0;
            }

            var allDaySlotOffset = this.options.allDaySlot ? this._rowCountForLevel(resources.length - 1) : 0;

            return (this._rowCountForLevel(resources.length) - allDaySlotOffset) / this._rowCountForLevel(resources.length - 1);
        },

        _timeSlotIndex: function(date) {
            var options = this.options;
            var eventStartTime = getMilliseconds(date);
            var startTime = getMilliseconds(options.startTime);
            var timeSlotInterval = ((options.majorTick/options.minorTickCount) * MS_PER_MINUTE);

            return (eventStartTime - startTime) / (timeSlotInterval);
        },

        _dateSlotIndex: function(date, overlaps) {
            var idx;
            var length;
            var slots = this._dates || [];
            var slotStart;
            var slotEnd;
            var offset = 1;

            if (this._isGroupedByDate()) {
                offset = this._columnCountInGroup();
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = kendo.date.getDate(slots[idx]);
                slotEnd = new Date(kendo.date.getDate(slots[idx]).getTime() + MS_PER_DAY - (overlaps ? 0 : 1));

                if (isInDateRange(date, slotStart, slotEnd)) {
                    return idx * offset;
                }
            }
            return -1;
        },

        _calculateAllDayEventWidth: function(slots, startIndex, endIndex) {
            var result = 0;
            var width = startIndex !== endIndex ? "offsetWidth" : "clientWidth";

            for (var idx = 0, length = slots.length; idx < length; idx++) {
                if (idx >= startIndex && idx <= endIndex) {
                    result += slots[idx][width];
                }
            }

            return result;
        },

        _calculateEventHeight: function(slots, startIndex, endIndex) {
            var result = 0,
                idx,
                length;

            if (startIndex === endIndex) {
                endIndex += 1;
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                if (idx >= startIndex && idx < endIndex) {
                    result += slots[idx].offsetHeight;
                }
            }

            return result;
        },

        _positionAllDayEvent: function(row, element, startIndex, endIndex) {
            var dateSlot = row.slots[startIndex];
            var slotWidth = this._calculateAllDayEventWidth(row.slots, startIndex, endIndex);
            var allDayEvents = SchedulerView.collidingHorizontallyEvents(row.events, startIndex, endIndex);
            var currentColumnCount = this._headerColumnCount || 0;
            var leftOffset = 2;
            var rightOffset = startIndex !== endIndex ? 5 : 4;
            var eventHeight = this._allDayHeaderHeight;

            element
                .css({
                    left: dateSlot.offsetLeft + leftOffset,
                    width: slotWidth - rightOffset
                });

            row.events.push({ start: startIndex, end: endIndex, element: element });

            allDayEvents.push({ start: startIndex, end: endIndex, element: element });

            var rows = SchedulerView.createRows(allDayEvents);

            if (rows.length && rows.length > currentColumnCount) {
                this._updateAllDayHeaderHeight(eventHeight * rows.length + eventHeight);
                this._headerColumnCount = rows.length;
            }

            var top = dateSlot.offsetTop;

            for (var idx = 0, length = rows.length; idx < length; idx++) {
                var rowEvents = rows[idx].events;

                for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                    $(rowEvents[j].element).css({
                        top: top + idx * eventHeight
                    });
                }
            }
        },

        _arrangeColumns: function(element, dateSlotIndex, dateSlot) {
            var columns,
                slotWidth = dateSlot.clientWidth,
                eventRightOffset = slotWidth * 0.10,
                columnEvents,
                eventElements =  dateSlot.events,
                slotEvents = SchedulerView.collidingEvents(eventElements, element.start, element.end);

            dateSlot.events.push(element);

            slotEvents.push(element);

            columns = SchedulerView.createColumns(slotEvents);

            var columnWidth = (slotWidth - eventRightOffset) / columns.length;

            for (var idx = 0, length = columns.length; idx < length; idx++) {
                columnEvents = columns[idx].events;

                for (var j = 0, eventLength = columnEvents.length; j < eventLength; j++) {
                    $(columnEvents[j].element).css({
                        width: columnWidth - 4,
                        left: dateSlot.offsetLeft + idx * columnWidth + 2
                    });
                }
            }
        },

        _positionEvent: function(event, element, dateSlotIndex, timeResouceOffset) {
            var dateSlot = this._columns[dateSlotIndex];
            var maxSlotCount = this._isVerticallyGrouped() ? this._rowCountInGroup() : dateSlot.slots.length;
            var startIndex = Math.floor(this._timeSlotIndex(event.startTime || event.start)) + timeResouceOffset;
            var endIndex = Math.ceil(this._timeSlotIndex(event.endTime || event.end));
            var bottomOffset = 4;

            if ((startIndex > 0 || startIndex < 0) && endIndex <= 0) {
                endIndex = maxSlotCount;
            }

            if (startIndex < 0 ) {
                startIndex = 0;
            }

            if (endIndex > maxSlotCount) {
                endIndex = maxSlotCount;
            }

            endIndex += timeResouceOffset;

            var timeSlot = dateSlot.slots[Math.floor(startIndex)];

            element.css({
                height: this._calculateEventHeight(dateSlot.slots, startIndex, endIndex) - bottomOffset,
                top: timeSlot.offsetTop
            });

            this._arrangeColumns( { element: element, start: startIndex, end: endIndex }, dateSlotIndex, dateSlot);
       },

       _eventTmpl: function(template, wrapper) {
           var options = this.options,
               settings = extend({}, kendo.Template, options.templateSettings),
               paramName = settings.paramName,
               html = "",
               type = typeof template,
               state = { storage: {}, count: 0 };

            if (type === "function") {
                state.storage["tmpl" + state.count] = template;
                html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                state.count ++;
            } else if (type === "string") {
                html += template;
            }

            var tmpl = kendo.template(kendo.format(wrapper, html), settings);

            if (state.count > 0) {
                tmpl = proxy(tmpl, state.storage);
            }
            return tmpl;
       },

       _createEventElement: function(event, isOneDayEvent, head, tail) {
            var template = isOneDayEvent ? this.eventTemplate : this.allDayEventTemplate;
            var options = this.options;
            var editable = options.editable;
            var showDelete = editable && editable.destroy !== false;
            var resizable = editable && editable.resize !== false;
            var startDate = getDate(this.startDate());
            var endDate = getDate(this.endDate());
            var startTime = getMilliseconds(options.startTime);
            var endTime = getMilliseconds(options.endTime);
            var eventStartTime = getMilliseconds(event.startTime || event.start);
            var eventEndTime = getMilliseconds(event.endTime || event.end);
            var middle;

            if (startTime >= endTime) {
                endTime = getMilliseconds(new Date(options.endTime.getTime() + MS_PER_DAY - 1));
            }

            if (!isOneDayEvent && !event.isAllDay) {
                endDate = new Date(endDate.getTime() + MS_PER_DAY);
            }

            var eventEndDate = event.end;

            if (event.isAllDay) {
                eventEndDate = getDate(event.end);
            }

            if ((!isInDateRange(getDate(event.start), startDate, endDate) &&
                !isInDateRange(eventEndDate, startDate, endDate)) ||
                (isOneDayEvent && eventStartTime < startTime && eventEndTime > endTime)) {

                middle = true;
            } else if (getDate(event.start) < startDate || (isOneDayEvent && eventStartTime < startTime)) {
                tail = true;
            } else if ((eventEndDate > endDate && !isOneDayEvent) || (isOneDayEvent && eventEndTime > endTime)) {
                head = true;
            }

            return $(template(extend({}, {
                ns: kendo.ns,
                resizable: resizable,
                showDelete: showDelete,
                middle: middle,
                head: head,
                tail: tail,
                singleDay: this._dates.length == 1 || this._isGroupedByDate(),
                resources: this.eventResources(event)
            }, event, {
                start: event.startTime || event.start,
                end: event.endTime || event.end
            })));
        },

        _isInTimeSlot: function(event) {
            var slotStartTime = this.options.startTime,
                slotEndTime = this.options.endTime,
                startTime = event.startTime || event.start,
                endTime = event.endTime || event.end;

            if (getMilliseconds(slotEndTime) === getMilliseconds(kendo.date.getDate(slotEndTime))) {
                slotEndTime = kendo.date.getDate(slotEndTime);
                setTime(slotEndTime, MS_PER_DAY - 1);
            }

            if (getMilliseconds(endTime) === getMilliseconds(kendo.date.getDate(endTime)) && endTime.getTime() > startTime.getTime()) {
                endTime = kendo.date.getDate(endTime);
                setTime(endTime, MS_PER_DAY - 1);
            }

            endTime = getMilliseconds(endTime);
            startTime = getMilliseconds(startTime);
            slotEndTime = getMilliseconds(slotEndTime);
            slotStartTime = getMilliseconds(slotStartTime);

            if(slotStartTime === startTime && startTime === endTime) {
                return true;
            }

            return isInTimeRange(startTime, slotStartTime, slotEndTime) ||
                isInTimeRange(endTime, slotStartTime, slotEndTime) ||
                isInTimeRange(slotStartTime, startTime, endTime) ||
                isInTimeRange(slotEndTime, startTime, endTime);
        },

        _isInDateSlot: function(event) {
            var slotStart = this.startDate(),
                slotEnd = new Date(this.endDate().getTime() + MS_PER_DAY - 1);

            return isInDateRange(event.start, slotStart, slotEnd) ||
                isInDateRange(event.end, slotStart, slotEnd) ||
                isInDateRange(slotStart, event.start, event.end) ||
                isInDateRange(slotEnd, event.start, event.end);
        },

        _updateAllDayHeaderHeight: function(height) {
            var allDaySlots = this.element.find(".k-scheduler-header-all-day td");

            if (allDaySlots.length) {
                var offset = height - allDaySlots[0].clientHeight;

                allDaySlots.parent()
                    .add(this.element.find(".k-scheduler-times-all-day").parent())
                    .height(height);

                var daySlotIndex = 0;
                var slots;
                var cellIndex;

                for (var rowIndex = 0; rowIndex < this._rows.length; rowIndex++) {
                    slots = this._rows[rowIndex].slots;

                    for (cellIndex = 0; cellIndex < slots.length; cellIndex++) {
                        slots[cellIndex].clientHeight = allDaySlots[daySlotIndex++].clientHeight;
                    }
                }

                this._updateSlotsPosition(offset);
            }
        },

        _updateSlotsPosition: function(offset) {
            if (offset && this._isVerticallyGrouped()) {
                var slots;
                var events;
                var cellIndex;
                var eventIndex;
                var event;

                var groupRowCount = this._rowCountInGroup();

                for (var columnIndex = 0; columnIndex < this._columns.length; columnIndex++) {
                    slots = this._columns[columnIndex].slots;
                    events = this._columns[columnIndex].events;

                    for (cellIndex = 0; cellIndex < slots.length; cellIndex++) {
                        slots[cellIndex].offsetTop = slots[cellIndex].offsetTop + offset*Math.ceil(cellIndex/groupRowCount || 1);
                    }

                    for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                        event = events[eventIndex];
                        event.element.css("top", event.element[0].offsetTop + offset*Math.ceil(event.start/groupRowCount || 1));
                    }
                }

                for (var rowIndex = 0; rowIndex < this._rows.length; rowIndex++) {
                    events = this._rows[rowIndex].events;
                    slots = this._rows[rowIndex].slots;

                    for (cellIndex = 0; cellIndex < slots.length; cellIndex++) {
                        slots[cellIndex].offsetTop = slots[cellIndex].offsetTop + offset*rowIndex;
                    }

                    for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                        event = events[eventIndex];
                        var top = event.element[0].offsetTop;
                        if (top) {
                            event.element.css("top", top + offset*rowIndex);
                        }
                    }
                }
            }
        },

        _renderEvents: function(events, resourceOffset, groupIdx) {
            var allDayEventContainer = this.datesHeader.find(".k-scheduler-header-wrap");
            var timeOffset = 0;
            var dateOffset = 0;
            var event;

            var idx;
            var length;
            var isVertical = this._groupOrientation() === "vertical";

            if (this.groupedResources.length) {
                if (isVertical) {
                    timeOffset = resourceOffset;
                    allDayEventContainer = this.content;
                } else {
                    dateOffset = resourceOffset;
                }
            }

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {

                    var dateSlotIndex = this._dateSlotIndex(event.start);
                    var endDateSlotIndex = this._dateSlotIndex(event.end, !event.isAllDay);
                    var isMultiDayEvent = event.isAllDay || event.end.getTime() - event.start.getTime() >= MS_PER_DAY;
                    var container = isMultiDayEvent ? allDayEventContainer : this.content;
                    var element;

                    if (!isMultiDayEvent) {

                        if (this._isInTimeSlot(event)) {

                            if (dateSlotIndex === -1 && endDateSlotIndex > -1) {
                                dateSlotIndex = endDateSlotIndex;
                            }

                            for (var columnIndex = dateSlotIndex; columnIndex <= endDateSlotIndex; columnIndex++) {
                                var start = event.start;
                                var end = event.end;
                                var head = false;
                                var tail = false;

                                if (columnIndex > dateSlotIndex) {
                                    start = kendo.date.getDate(end);

                                    kendo.date.setTime(start, getMilliseconds(this.options.startTime));

                                    if (end < start) {
                                       start = kendo.date.addDays(start, -1);
                                    }

                                    tail = true;
                                }

                                if (columnIndex < endDateSlotIndex) {
                                   end = kendo.date.getDate(start);

                                   kendo.date.setTime(end, getMilliseconds(this.options.endTime));

                                   if (end < start) {
                                       end = kendo.date.addDays(end, 1);
                                   }

                                   head = true;
                                }

                                var occurrence = extend({}, event, { start: start, end: end });

                                if (this._isInTimeSlot(occurrence)) {
                                    element = this._createEventElement(event, !isMultiDayEvent, head, tail);

                                    this._positionEvent(occurrence, element, columnIndex + dateOffset, timeOffset);

                                    element.appendTo(container);
                                }
                            }
                        }

                   } else if (this.options.allDaySlot) {
                       if (dateSlotIndex < 0) {
                           dateSlotIndex = 0;
                       }

                       if (endDateSlotIndex < 0) {
                           endDateSlotIndex = (this.groupedResources.length && !isVertical ? this._columnCountInGroup() : this._rows[0].slots.length) - 1;
                       }

                       element = this._createEventElement(event, !isMultiDayEvent);
                       this._positionAllDayEvent(this._rows[groupIdx], element, dateSlotIndex + dateOffset, endDateSlotIndex + dateOffset);

                       element.appendTo(container);
                    }
                }
            }
        },

        render: function(events) {
            this._headerColumnCount = 0;

            this._slots();

            this.element.find(".k-event").remove();

            this._updateAllDayHeaderHeight(this._allDayHeaderHeight);

            events = new kendo.data.Query(events)
                .sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }])
                .toArray();

            var resources = this.groupedResources;

            if (resources.length) {
                var initialLevel = 1;

                if (this._isGroupedByDate()) {
                    if (!this._isVerticallyGrouped()) {
                        this.columnLevels.push(new Array(this._columnCountForLevel(this.columnLevels.length - 1)));
                        initialLevel = 2;
                    }
                }

                this._renderGroups(events, resources, 0, initialLevel);
            } else {
                this._renderEvents(events, 0, 0);
            }

            this.refreshLayout();
            this.trigger("activate");
        },

        _resourceBySlot: function(slot) {
            var resources = this.groupedResources;
            var result = {};
            var isVertical = this._isVerticallyGrouped();

            if (resources.length) {
                var index = isVertical ? slot.index : slot.columnIndex;

                if (slot.isAllDay && isVertical) {
                    index *= this._rowCountInGroup();
                }

                var offset = 0;

                if (this._isGroupedByDate()) {
                    offset = 1; // skip the date header in the levels calculation
                    //offset the index as we are not the first header
                    index -= Math.floor(index/this._columnCountInGroup())*this._columnCountInGroup();
                }

                for (var idx = 0, length = resources.length; idx < length; idx++) {
                    var resource = resources[idx];

                    var columnCount;
                    if (isVertical) {
                        var allDaySlotOffset = this.options.allDaySlot ? this._rowCountForLevel(resources.length - 1) : 0;
                        columnCount = (this._rowCountForLevel(resources.length) - allDaySlotOffset) / this._rowCountForLevel(idx);
                    } else {
                        columnCount = this._columnCountForLevel(resources.length) / this._columnCountForLevel(idx + offset);
                    }

                    var groupIndex = Math.floor(index/columnCount);

                    index -= groupIndex*columnCount;

                    var value = resourceValue(resource, resource.dataSource.at(groupIndex));

                    if (resource.multiple) {
                        value = [value];
                    }

                    var setter = kendo.setter(resource.field);
                    setter(result, value);
                }
            }

            return result;
        },

        _renderGroups: function(events, resources, offset, columnLevel) {
            var resource = resources[0];
            var offsetCount;
            var isVertical = this._groupOrientation() === "vertical";

            if (isVertical) {
                var allDaySlotOffset = resources.length === 1 && this.options.allDaySlot ? this._rowCountForLevel(columnLevel - 1) : 0;
                offsetCount = (this._rowCountForLevel(columnLevel) - allDaySlotOffset) / this._rowCountForLevel(columnLevel - 1);
            } else {
                offsetCount = this._columnOffsetForResource(columnLevel);
            }

            if (resource) {
                var view = resource.dataSource.view();

                for (var itemIdx = 0; itemIdx < view.length; itemIdx++) {
                    var value = resourceValue(resource, view[itemIdx]);

                    var tmp = new kendo.data.Query(events).filter({ field: resource.field, operator: SchedulerView.groupEqFilter, value: value }).toArray();

                    if (resources.length > 1) {
                        this._renderGroups(tmp, resources.slice(1), offsetCount * itemIdx, columnLevel + 1);
                    } else {
                        this._renderEvents(this._splitAllDayEvents(tmp), offsetCount * (itemIdx + offset), isVertical ? itemIdx + offset : 0);
                    }
                }
            }
        },

        _splitAllDayEvents: function(events) {
            if (this._isGroupedByDate()) {
                var result = [];

                for (var idx = 0; idx < events.length; idx++) {
                    var event = events[idx];
                    var start = kendo.date.getDate(event.start);
                    var end = event.end;

                    var eventDurationInDays = Math.ceil((end - start) / kendo.date.MS_PER_DAY);

                    if (eventDurationInDays === 1 && kendo.date.getDate(end).getTime() !== kendo.date.getDate(start).getTime()) {
                        eventDurationInDays += 1;
                    }

                    var task = extend({}, event);
                    result.push(task);

                    if (eventDurationInDays > 1) {
                        task.end = kendo.date.getDate(start);
                        task.isAllDay = true;

                        for (var day = 1; day < eventDurationInDays; day++) {
                            start = kendo.date.getDate(kendo.date.nextDay(task.end));
                            task = extend({}, event);
                            task.start = start;

                            task.isAllDay = true;
                            task.end = kendo.date.getDate(start);

                            result.push(task);
                        }
                    }
                }
                return result;
            }
            return events;
        },

        _columnOffsetForResource: function(index) {
            return this._columnCountForLevel(index) / this._columnCountForLevel(index - 1);
        },

        _columnCountForLevel: function(level) {
            var columnLevel = this.columnLevels[level];
            return columnLevel ? columnLevel.length : 0;
        },

        _rowCountForLevel: function(level) {
            var rowLevel = this.rowLevels[level];
            return rowLevel ? rowLevel.length : 0;
        },

        _selectionOffset: function() {
            return this._dates.length;
        },

        normalizeSelection: function(selection) {
            var columns = this._columns,
                columnIndex = this._dateSlotIndex(selection.start),
                slotIndex = this._timeSlotIndex(selection.start),
                slot;

            if (columnIndex < 0 || columnIndex >= columns.length) {
                columnIndex = 0;
            }

            slot = this._columns[columnIndex].slots;

            if (slotIndex < 0) {
                slotIndex = 0;
            } else if (slotIndex > (slot.length - 1)) {
                slotIndex = slot.length - 1;
            }

            slot = this._columns[columnIndex].slots[slotIndex];
            selection.start = new Date(slot.start);
            selection.end = new Date(slot.end);
        },

        isInRange: function(date) {
            return this._slotByDate(date);
        },

        moveSelectionToPeriod: function(selection) {
            var offset = this._selectionOffset(),
                start = selection.start,
                end = selection.end;

            if (this._dateSlotIndex(start) < 0 || this._dateSlotIndex(end) < 0) {
                if (start >= this.endDate()) {
                    offset = -offset;
                }
                selection.start = addDays(start, offset);
                selection.end = addDays(end, offset);
                selection.events = [];
            } else {
                 this.normalizeSelection(selection);
            }
        },

        clearSelection: function() {
            this.content.add(this.datesHeader).find(".k-state-selected").removeClass("k-state-selected");
        },

        select: function(selection) {
            if (selection) {
                this.clearSelection();

                if (selection.events[0]) {
                    if (this._selectEvents(selection)) {
                        return;
                    }
                }

                this._selectCells(selection);
            }
        },

        _selectEvents: function(selection) {
            var container = this.content.add(this.datesHeader.children()),
                events = selection.events,
                length = events.length,
                idx = 0,
                event;

            for (; idx < length; idx++) {
                event = container.children("[data-uid=" + events[idx] + "]").addClass("k-state-selected");
                event = event[event.length - 1];

                if (!event) {
                    this.clearSelection();
                    return;
                }
            }

            if (event) {
                this._scrollTo(event, this.content[0]);
                return true;
            }
        },

        _selectCells: function(selection) {
            var startDate = selection.start,
                endDate = selection.end,
                backwardSelection = startDate > endDate;

            if (backwardSelection) {
                startDate = new Date(endDate);
                endDate = new Date(selection.start);
            }

            var that = this,
                resources = this.groupedResources,
                columns = that._columns,
                startRow = Math.floor(that._timeSlotIndex(startDate)),
                endRow = Math.ceil(that._timeSlotIndex(endDate)),
                startCol = that._dateSlotIndex(startDate),
                endCol = that._dateSlotIndex(endDate),
                endTime = getMilliseconds(this.options.endTime),
                endDateTime = getMilliseconds(endDate),
                verticallyGrouped = this._isVerticallyGrouped(),
                horizontalOffset = 0,
                verticalOffset = 0,
                slots, end,
                firstCell, cell;

            if (startCol < 0) {
                startCol = 0;
            }

            if (endCol < 0) {
                if (endTime === getMilliseconds(endDate)) {
                    endCol = this._columnCountInGroup() || this._columns.length;
                } else {
                    endCol = startCol;
                }
            }

            if (startRow < 0) {
                startRow = 0;
            }

            if (endRow < 0 || (startCol === endCol && endRow < startRow)) {
                endRow = startRow;
            }

            var dayLengthMS = Math.abs((getMilliseconds(this.options.endTime) - getMilliseconds(this.options.startTime)) || MS_PER_DAY);
            if (backwardSelection && Math.abs(endDate - startDate) > dayLengthMS) {
                endRow += 1;
            }

            if (!verticallyGrouped) {
                horizontalOffset = this._columnOffsetForResource(resources.length);
                horizontalOffset = selection.groupIndex * horizontalOffset || 0;

                startCol += horizontalOffset;
                endCol += horizontalOffset;
            } else {
                verticalOffset = this._rowCountInGroup() || 0;
                verticalOffset = selection.groupIndex * verticalOffset;

                startRow += verticalOffset;
                endRow += verticalOffset;
            }

            if (!selection.isAllDay) {
                if (endDateTime === 0 && endDateTime === endTime && startCol !== endCol) {
                    endCol -= 1;
                    endRow = this._rowCountInGroup() + (this._rowCountInGroup() * selection.groupIndex) || columns[endCol].slots.length;
                }

                end = endRow;
                for (; startCol <= endCol; startCol++) {
                    if (startCol === endCol) {
                        end = endRow;
                    } else if (endCol > startCol) {
                        end = this._rowCountInGroup() + (this._rowCountInGroup() * selection.groupIndex) || columns[endCol].slots.length;
                    }

                    slots = columns[startCol].slots;
                    if (startRow !== end) {
                        end -= 1;
                    }

                    for (; startRow <= end; startRow++) {
                        cell = slots[startRow].element;
                        addSelectedState(cell);
                        if (!firstCell) {
                            firstCell = cell;
                        }
                    }

                    startRow = 0 + verticalOffset;
                }
            } else {
                var index = verticallyGrouped ? selection.groupIndex : 0;
                slots = that._rows[index].slots;

                for (; startCol <= endCol; startCol++) {
                    if (slots[startCol].groupIndex === selection.groupIndex) {
                        cell = slots[startCol].element;
                        addSelectedState(cell);
                    }
                }
            }

            cell = backwardSelection ? firstCell : cell;
            if (cell) {
                that._scrollTo(cell, that.content[0]);
            }
        },

        move: function(selection, key, shiftKey) {
            var groupedResources = this.groupedResources,
                interval = this._timeSlotInterval(),
                start = new Date(selection.start),
                end = new Date(selection.end),
                multipleSelection = Math.abs(start - end) > interval,
                groupColumnLength = this._columnCountInGroup(),
                isAllDay = selection.isAllDay,
                handled = false,
                slot;

            if (key === keys.DOWN) {
                handled = true;

                if (isAllDay) {
                    if (shiftKey) {
                        selection.events = [];
                        return handled;
                    }

                    selection.isAllDay = false;
                    slot = this._firstSlot(start);
                    start = slot.start;
                    end = slot.end;
                } else {
                    if (!shiftKey) {
                        if (multipleSelection) {
                            if (end > start) {
                                start = new Date(end);
                            } else {
                                end = new Date(start + interval);
                            }
                        } else {
                            setTime(start, interval);
                        }
                    }

                    setTime(end, interval);

                    if (start.getTime() === end.getTime()) {
                        if (!shiftKey) {
                            setTime(end, interval);
                        } else {
                            setTime(start, -interval);
                            setTime(end, interval);
                        }
                    }
                }

                if (!this._slotByDate(new Date(end - interval)) || !this._slotByDate(start)) {
                    var incrementGroup = (selection.groupIndex + 1) < Math.floor((this._rowCountForLevel(groupedResources.length) / this._rowCountInGroup()));
                    if (groupedResources.length && this._isVerticallyGrouped() && incrementGroup) {
                        selection.isAllDay = true;
                        selection.groupIndex += 1;

                        slot = this._firstSlot(selection.start);
                        end = start = slot.start;
                    } else {
                        start = selection.start;
                        end = selection.end;
                    }
                }
            } else if (key === keys.UP) {
                handled = true;
                if (!shiftKey) {
                    if (multipleSelection) {
                        if (end < start) {
                            start = new Date(end);
                        }

                        end = new Date(start);
                    }
                    setTime(start, -interval);
                } else {
                    //TODO: handle decrease of selection
                }

                setTime(end, -interval);

                if (start.getTime() === end.getTime()) {
                    if (!shiftKey) {
                        setTime(end, interval);
                    } else {
                        setTime(start, interval);
                        setTime(end, -interval);
                    }
                }

                if (shiftKey && !this._slotByDate(end < start ? end : start)) {
                    selection.events = [];
                    return handled;
                } else if (!shiftKey) {
                    if (this._isVerticallyGrouped() && selection.isAllDay && (selection.groupIndex - 1) > -1) {
                        selection.groupIndex -= 1;
                        selection.isAllDay = false;

                        slot = this._lastSlot(selection.start);
                        start = slot.start;
                        end = slot.end;
                    } else if (!this._slotByDate(start) && this.options.allDaySlot) {
                        selection.isAllDay = true;
                        slot = this._firstSlot(selection.start);
                        end = start = slot.start;
                    }
                }
            } else if (key === keys.RIGHT) {
                handled = true;

                if (!shiftKey) {
                    start = addDays(start, 1);
                }
                end = addDays(end, 1);

                if (shiftKey && !multipleSelection) {
                    end.setHours(start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
                    setTime(end, interval);
                }

                if (start > this._end(isAllDay) && groupedResources.length && !this._isVerticallyGrouped()) {
                    selection.groupIndex += 1;

                    if (this._columnCountForLevel(groupedResources.length) > (selection.groupIndex * groupColumnLength)) {
                        start = addDays(start, -groupColumnLength);
                        end = addDays(end, -groupColumnLength);
                    } else {
                        selection.groupIndex = 0;
                    }
                }

            } else if (key === keys.LEFT) {
                handled = true;
                if (!shiftKey) {
                    start = addDays(start, -1);
                }
                end = addDays(end, -1);

                if (shiftKey && !multipleSelection) {
                    end.setHours(start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
                }

                if (start < this.startDate() && groupedResources.length && !this._isVerticallyGrouped()) {
                    selection.groupIndex -= 1;

                    if (selection.groupIndex > -1) {
                        start = addDays(start, groupColumnLength);
                        end = addDays(end, groupColumnLength);
                    } else {
                        selection.groupIndex = (this._columnCountForLevel(groupedResources.length) / groupColumnLength) - 1;
                    }
                }
            }

            if (handled) {
                selection.events = [];
                selection.start = start;
                selection.end = end;
            }

            return handled;
        },

        _firstSlot: function(date) {
            return this._columns[this._dateSlotIndex(date)].slots[0];
        },

        _lastSlot: function(date) {
            var slots = this._columns[this._dateSlotIndex(date)].slots;
            return slots[slots.length - 1];
        },

        _slotByDate: function(date) {
            var column = this._columns[this._dateSlotIndex(date)],
                slot;

            if (column) {
                slot = column.slots[this._timeSlotIndex(date)];
                if (slot && slot.start.getTime() === date.getTime()) {
                    return slot;
                }
            }

            return null;
        },

        _slotByAllDay: function(date) {
            var slot = this._rows[0].slots[this._dateSlotIndex(date)];
            return slot || null;
        },

        _getAllDayEvents: function(col, selected) {
            var allDayRow = this._rows[0],
                events = allDayRow.events,
                result,
                event;

            for (var i = eventIndex(events, selected), length = events.length; i < length; i++) {
                event = events[i];

                if (event.start === col) {
                    result = event;
                    break;
                }
            }

            return result;
        },

        moveToEvent: function(selection, prev) {
            var selectedEventsLength = selection.events.length,
                length = this._columns.length,
                columnIndex,
                column,
                events,
                event,
                index,
                slot;

            var prevPredicate = function(slot) {
                return slot.start < selection.end;
            };

            var prevAllDayPredicate = function(slot) {
                return kendo.date.getDate(slot.start).getTime() === kendo.date.getDate(selection.start).getTime();
            };

            var nextPredicate = function(slot) {
                return slot.start >= selection.start;
            };

            var nextAllDayPredicate = function(slot) {
                return slot.start >= selection.start;
            };

            if (selection.isAllDay) {
                slot = this._slotByAllDay(selection.start);
            } else {
                slot = this._slotByDate(selection.start);
            }

            columnIndex = slot.columnIndex;

            if (prev) {
                for (; columnIndex >= 0; columnIndex--) {
                    column = this._columns[columnIndex];
                    events = filterEvents(column.slots, column.events, prevPredicate);

                    if (events[0]) {
                        index = -1;
                        if (selectedEventsLength) {
                            index = eventIndex(events, selection.events, prev);
                            selectedEventsLength = 0;
                        } else {
                            index = events.length - 1;
                        }
                        event = events[index];

                        if (event) {
                            selection.start = column.slots[event.start].start;
                            selection.end = column.slots[event.end - 1].end;
                            selection.events = [event.element.data("uid")];
                            return true;
                        }
                    }

                    events = filterEvents(this._rows[0].slots, this._rows[0].events, prevAllDayPredicate);

                    if (events[0]) {
                        index = -1;
                        if (selectedEventsLength) {
                            index = eventIndex(events, selection.events, prev);
                            selectedEventsLength = 0;
                        } else {
                            index = events.length - 1;
                        }

                        event = events[index];

                        if (event) {
                            selection.start = this._rows[0].slots[event.start].start;
                            selection.end = this._rows[0].slots[event.end].end;
                            selection.events = [event.element.data("uid")];
                            selection.isAllDay = true;
                            return true;
                        }
                    }
                }
            } else {
                for (; columnIndex < length; columnIndex++) {
                    column = this._columns[columnIndex];
                    events = filterEvents(column.slots, column.events, nextPredicate);

                    if (events[0]) {
                        index = selectedEventsLength ? eventIndex(events, selection.events) : 0;
                        event = events[index];

                        if (event) {
                            selection.start = column.slots[event.start].start;
                            selection.end = column.slots[event.end - 1].end;
                            selection.events = [event.element.data("uid")];
                            return true;
                        }
                    } else {
                        events = filterEvents(this._rows[0].slots, this._rows[0].events, nextAllDayPredicate);

                        if (events[0]) {
                            index = selectedEventsLength ? eventIndex(events, selection.events) : 0;
                            event = events[index];

                            if (event) {
                                selection.start = this._rows[0].slots[event.start].start;
                                selection.end = this._rows[0].slots[event.end].end;
                                selection.events = [event.element.data("uid")];
                                selection.isAllDay = true;
                                return true;
                            }
                        }
                    }
                }
            }
        }
    });

    function filterEvents(slots, events, predicate) {
        var idx = 0, length = events.length,
            data = [],
            event;

        for (; idx < length; idx++) {
            event = events[idx];
            if (predicate(slots[event.start])) {
                data.push(event);
            }
        }

        return data;
    }

    var selectedStateRegExp = /\s*k-state-selected/;
    function addSelectedState(cell) {
        cell.className = cell.className.replace(selectedStateRegExp, "") + " k-state-selected";
    }

    function resourceValue(resource, item) {
        if (resource.valuePrimitive) {
            item = kendo.getter(resource.dataValueField)(item);
        }
        return item;
    }

    function eventIndex(events, selected, prev) {
        if (!selected || !selected.length) {
            if (prev && selected) {
                return selected.length - 1;
            }

            return 0;
        }

        selected = selected[selected.length - 1];

        events = $.map(events, function(item) { return item.element.data("uid"); });

        return $.inArray(selected, events) + (prev ? -1 : 1);
    }

   extend(true, ui, {
       MultiDayView: MultiDayView,
       DayView: MultiDayView.extend({
           options: {
               title: "Day"
           },
           name: "day"
       }),
       WeekView: MultiDayView.extend({
           options: {
               title: "Week",
               selectedDateFormat: "{0:D} - {1:D}"
           },
           name: "week",
           calculateDateRange: function() {
               var selectedDate = this.options.date,
                   start = kendo.date.dayOfWeek(selectedDate, 0, -1),
                   idx, length,
                   dates = [];

               for (idx = 0, length = 7; idx < length; idx++) {
                   dates.push(start);
                   start = kendo.date.nextDay(start);
               }
               this._render(dates);
           }
       })
    });

})(window.kendo.jQuery);
