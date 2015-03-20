---
title: Creating custom view
page_title: Creating custom view
description: Creating custom view
---

# Creating custom view

The example below demonstrates how to create a custom view for the Kendo UI Gantt

#### Example:

```html
    <div id="gantt"></div>
    <script type="text/javascript">
      var gantt;
      $(function StartingPoint() {

        kendo.ui.GanttCustomView = kendo.ui.GanttView.extend({
          name: "custom",

          options: {
            yearHeaderTemplate: kendo.template("#=kendo.toString(start, 'yyyy')#"),
            quarterHeaderTemplate: kendo.template("# return ['Q1', 'Q2', 'Q3', 'Q4'][start.getMonth() / 3] #"),
            monthHeaderTemplate: kendo.template("#=kendo.toString(start, 'MMM')#")
          },

          range: function(range) {
            this.start = new Date("01/01/2013");
            this.end = new Date("01/01/2016");
          },

          _generateSlots: function(incrementCallback, span) {
            var slots = [];
            var slotStart = new Date(this.start);
            var slotEnd;

            while (slotStart < this.end) {
              slotEnd = new Date(slotStart);
              incrementCallback(slotEnd);

              slots.push({ start: slotStart, end: slotEnd, span: span });

              slotStart = slotEnd;
            }

            return slots;
          },

          _createSlots: function() {
            var slots = [];

            slots.push(this._generateSlots(function(date) { date.setFullYear(date.getFullYear() + 1); }, 12));
            slots.push(this._generateSlots(function(date) { date.setMonth(date.getMonth() + 3); }, 3));
            slots.push(this._generateSlots(function(date) { date.setMonth(date.getMonth() + 1); }, 1));

            return slots;
          },

          _layout: function() {
            var rows = [];
            var options = this.options;

            rows.push(this._slotHeaders(this._slots[0], kendo.template(options.yearHeaderTemplate)));
            rows.push(this._slotHeaders(this._slots[1], kendo.template(options.quarterHeaderTemplate)));
            rows.push(this._slotHeaders(this._slots[2], kendo.template(options.monthHeaderTemplate)));

            return rows;
          }
        });

        gantt = new kendo.ui.Gantt($("#gantt"),
                                   $.extend({
          columns: [
            { field: "id", title: "ID", sortable: true, editable: false, width: 30 },
            { field: "title", title: "Title", sortable: true, editable: true, width: 100 },
            { field: "start", title: "Start Time", sortable: true, editable: true, format: "{0:MM/dd/yyyy HH:mm}", width: 100 },
            { field: "end", title: "End Time", sortable: true, editable: true, format: "{0:MM/dd/yyyy HH:mm}", width: 100 }
          ],
          views: [
            "week",
            { type: "kendo.ui.GanttCustomView", title: "Quaterly", selected: true }
          ],
          listWidth: 500,
          dataBound: function() {
            var height = this.timeline.view()._slots.length * 2.5;
            this.list.header.find("tr").height(height + "em");
            this.list._adjustHeight();
          },
          dataSource: {
            data: [{ id: 1, parentId: null, percentComplete: 0.2, orderId: 0, title: "foo", start: new Date("05/05/2014 09:00"), end: new Date("06/06/2014 10:00") },
                   { id: 2, parentId: null, percentComplete: 0.4, orderId: 1, title: "bar", start: new Date("07/06/2014 12:00"), end: new Date("08/07/2014 13:00") }]
          },
          dependencies: {
            data: [
              { id: 1, predecessorId: 1, successorId: 2, type: 1 }
            ]
          }
        }, {})
			);
    });
    </script>
```
