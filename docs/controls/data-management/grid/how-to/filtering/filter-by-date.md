---
title: Filter by Date Only
page_title: Filter by Date Only | Kendo UI Grid
description: "Learn how to filter date columns in the Kendo UI Grid widget."
previous_url: /controls/data-management/grid/how-to/filter-by-date
slug: howto_filter_date_columns_grid
---

# Filter by Date Only

To achieve the behavior of filtering Grid columns by date only, ignoring the exact time, apply the following approaches:

1. [Create a helper field, which will hold the date]({% slug howto_filter_date_columns_grid %}#create-helper-field).
2. [Transform the filter before applying it]({% slug howto_filter_date_columns_grid %}#transform-the-filter).

## Create Helper Field

The helper field is intended to hold only the date, so that the Grid data is later filtered by it while displaying the original datetime field.

To create the helper field, follow the steps below:
* Use the [`dataSource.schema.parse`](/api/javascript/data/datasource#configuration-schema.parse) configuration to create a new field that is intended to hold the date only.
* Use the data-holding field in the [`columns`](/api/javascript/ui/grid#configuration-columns) definition, but provide a [`template`](/api/javascript/ui/grid#configuration-columns.template) that will visualize the initial datetime field.

###### Example

```html
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
## Transform the Filter

Before applying it, you have to handle the `filterMenuInit` event to transform the filter.

To achieve the filter change, follow the steps below:

* Handle the [`filterMenuInit` event](/api/javascript/ui/grid#events-filterMenuInit) and conditionally apply custom logic to modify the filter so that it looks for dates, selected from the DatePicker, between the start and the end of day.
* Use the [`dataSource.filter()` method](/api/javascript/data/datasource#methods-filter) and pass the modified filter configuration to it.

###### Example

```html
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

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
