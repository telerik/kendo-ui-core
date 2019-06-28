---
title: Filter by Date Only
page_title: Filter by Date | Kendo UI Grid for jQuery
description: "An example on how to filter date columns in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/filter-by-date, /controls/data-management/grid/how-to/filtering/filter-by-date
slug: howto_filter_date_columns_grid
tags: grid, filter, date, columns
component: grid
type: how-to
res_type: kb
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

Your project might require you to filter the columns of the Grid only by date.

To achieve this behavior and ignore the exact time when you filter the data:

1. [Create a helper field, which will hold the date](#creating-the-helper-field)
2. [Transform the filter before applying it](#transforming-the-filter)

## Creating the Helper Field

The helper field is intended to hold only the date, so that the Grid data is later filtered by it while displaying the original `datetime` field.

To create the helper field:
* Use the [`dataSource.schema.parse`](/api/javascript/data/datasource/configuration/schema.parse) configuration to create a new field that is intended to hold the date only.
* Use the data-holding field in the [`columns`](/api/javascript/ui/grid/configuration/columns) definition, but provide a [`template`](/api/javascript/ui/grid/configuration/columns.template) that will visualize the initial datetime field.

```dojo
<div id="grid"></div>
    <script>
      var sampleData = [
        { EventID: 1, EventName: "Event 1", EventDateTime: new Date(2013, 8, 10, 17, 0) },
        { EventID: 2, EventName: "Event 2", EventDateTime: new Date(2013, 8, 10, 18, 0) },
        { EventID: 3, EventName: "Event 3", EventDateTime: new Date(2013, 8, 10, 19, 0) },
        { EventID: 4, EventName: "Event 4", EventDateTime: new Date(2013, 8, 10, 20, 0) },
        { EventID: 5, EventName: "Event 5", EventDateTime: new Date(2013, 8, 11, 19, 0) },
        { EventID: 6, EventName: "Event 6", EventDateTime: new Date() },
      ];

      $(function () {
        var dataSource = new kendo.data.DataSource({
          transport: {
            read: function (e) {
              e.success(sampleData);
            }
          },
          pageSize: 10,
          schema: {
            parse: function(data) {
              var events = [];
              for (var i = 0; i < data.length; i++) {
                var event = data[i];
                event.EventDate = kendo.toString(event.EventDateTime, 'yyyy/MM/dd');
                events.push(event);
              }
              return events;
            },
            model: {
              id: "EventID",
              fields: {
                EventID: { editable: false, nullable: true },
                EventName: { validation: { required: true } },
                EventDateTime: { type: "date" },
                EventDate: { type: "date" }
              }
            }
          }
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          filterable: true,
          columns: [
            { field: "EventName", title: "Event Name" },
            {
              field: "EventDate", title: "Event Date",
              template: "#= kendo.toString(EventDateTime, 'yyyy/MM/dd HH:mm') #"
            }
          ]
        });
      });
    </script>
```
## Transforming the Filter

Before applying it, you have to handle the `filterMenuInit` event to transform the filter.

To achieve the filter change:

* Handle the [`filterMenuInit` event](/api/javascript/ui/grid/events/filtermenuinit) and conditionally apply custom logic to modify the filter so that it looks for dates, selected from the DatePicker, between the start and the end of day.
* Use the [`dataSource.filter()` method](/api/javascript/data/datasource/methods/filter) and pass the modified filter configuration to it.

```dojo
<div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "date",
            format: "{0:MM/dd/yyyy}"
          }
        ],
        filterMenuInit: function(e){
          var firstDropDown = $('[data-bind="value: filters[0].operator"]').data('kendoDropDownList');
          $('button[type="submit"]').click(function(ev){
            if(firstDropDown.value() === 'eq'){
              ev.preventDefault();
              var selectedDate = $('[data-role="datepicker"]').first().data('kendoDatePicker').value();

              if(!selectedDate){
                $(ev.target).closest('[data-role="popup"]').data('kendoPopup').close();
                return;
              }

              var startOfFilterDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            var endOfFilterDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59);
              var filter = {
                logic: "and",
                filters: [
                  { field: "date", operator: "gte", value: startOfFilterDate },
                  { field: "date", operator: "lte", value: endOfFilterDate }
                ]
              };
              e.sender.dataSource.filter(filter);
              $(ev.target).closest('[data-role="popup"]').data('kendoPopup').close();
                return;
            }
          });
        },
        filterable: true,
        dataSource: {
          schema: {
            model: {
              fields: {
                date: { type: "date" }
              }
            }
          },
          data: [ { date: new Date() }, { date: new Date() } ]
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
