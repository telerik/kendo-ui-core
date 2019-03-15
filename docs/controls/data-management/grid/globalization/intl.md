---
title: Internationalization
page_title: jQuery Grid Documentation | Grid Internationalization | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn about the options it supports for parsing and formatting of dates and numbers."
previous_url: /data-management/grid/date-formats
slug: intl_kendoui_grid_widget
position: 2
---

# Internationalization

The internationalization process applies specific culture formats to a web application by providing options for the parsing and formatting of dates and numbers.

For more information, refer to:
* [Date formatting]({% slug dateformatting_kendoui_globalization %})
* [Date parsing]({% slug dateparsing_kendoui_globalization %})
* [Number formatting]({% slug numberformatting_kendoui_globalization %})
* [Number parsing]({% slug numberparsing_kendoui_globalization %})

The Grid provides options for rendering dates in different culture locales. The most common scenarios are:
* [Showing the dates depending on the client timezone](#showing-dates-depending-on-the-client-timezone)
* [Using UTC on both client and server](#using-utc-on-both-client-and-server)
* [Allowing the user to customize the timezone](#allowing-the-user-to-customize-the-timezone)

## Showing Dates Depending on the Client Timezone

By default, the Grid creates its `date` objects on the client immediately after they are received from the server. Based on the current time, the default JavaScript `date` object automatically adds the time offset. The default behavior is such because the `date` objects demonstrate the same default behavior and most users expect to see the date in its current timezone.

The following example demonstrates how to create different time with an offset depending on the current timezone.

```dojo
  <p></p>
  <div id="grid"></div>
    <script>
      var newDate = new Date("2020-01-01T18:45");
      $('p').html(newDate);     
      $('#grid').kendoGrid({
        dataSource:{
          data:[{date: new Date("2020-01-01T18:45")}]
        }
      })
    </script>
```

## Using UTC on Both Client and Server

To display the date in a UTC timezone regardless of the user timezone, refer to the complete example on [setting the UTC timezone on both client and server](http://docs.telerik.com/aspnet-mvc/helpers/grid/how-to/editing/utc-time-on-both-server-and-client).

## Allowing the User to Customize the Timezone

The following example demonstrates how to allow the user to manually select the desired timezone.

```dojo
    <div id="example">
      <p>Please choose a timezone: </p>
      <input id="timeZone" style="width: 100%;" />
      <hr />
      <div id="grid"></div>
      <script>

        currentoffsetMiliseconds = (new Date()).getTimezoneOffset() * 60000;
        offsetMiliseconds = 0;

        // Modify the current offset if the server is not in UTC.
        // currentoffsetMiliseconds = ((new Date()).getTimezoneOffset() - 120) * 60000;

        $(document).ready(function() {

          var data = [
            { text: "GMT+1", value: "1" },
            { text: "GMT+2", value: "2" },
            { text: "GMT-1", value: "-1" },
            { text: "GMT-2", value: "-2" },
            { text: "GMT", value: "0" }
          ];

          $("#timeZone").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data,
            index: 0,
            change:onChange
          });
          var dataSource = new kendo.data.DataSource({
            requestEnd:onRequestEnd,
            batch: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks",
                dataType: "jsonp"
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                dataType: "jsonp"
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {

                var tizeZoneValue = $("#timeZone").data('kendoDropDownList').value();
                offsetMiliseconds = (3600000 * tizeZoneValue);

                // Remove the current timezone offset and add the offset choosen by the user in the DropDownList.
                if ((operation == "update" || operation == "create") && options.models){
                  for(let i = 0; i < options.models.length; i++)
                  {
                    var startDate = new Date(options.models[i].Start);
                    startDate = new Date(startDate.getTime() - (currentoffsetMiliseconds + offsetMiliseconds));
                    options.models[i].Start = startDate;
                  }
                }
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            schema: {
              model: {
                id: "taskId",
                fields: {
                  taskId: { from: "TaskID", type: "number" },
                  title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                  start: { type: "date", from: "Start" },
                  end: { type: "date", from: "End" },
                  startTimezone: { from: "StartTimezone" },
                  endTimezone: { from: "EndTimezone" },
                  description: { from: "Description" },
                  recurrenceId: { from: "RecurrenceID" },
                  recurrenceRule: { from: "RecurrenceRule" },
                  recurrenceException: { from: "RecurrenceException" },
                  ownerId: { from: "OwnerID", defaultValue: 1 },
                  isAllDay: { type: "boolean", from: "IsAllDay" }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            height: 430,
            toolbar: ["create", "save", "cancel"],
            editable:true,
            pageable: true,
            columns:[
              {field:"taskId", title: "Tast ID"},
              {field:"title", title: "Title"},
              {field:"start", title: "Start Date", format: "{0:MM/dd/yyyy h:mm tt}",editor: customDateTimePickerEditor},

            ]
          });
        });

        function onRequestEnd(e) {
          if (e.response && e.response.length) {
            var data = e.response;
            if (this.group().length && e.type == "read") {
              handleGroups(data);
            } else {              
              loopRecords(data);
            }
          }
        }

        function onChange(e){
          $("#grid").data('kendoGrid').dataSource.read()
        }

        function handleGroups(groups) {
          for (var i = 0; i < groups.length; i++) {
            var gr = groups[i];
            offsetDateFields(gr);
            if (gr.HasSubgroups) {
              handleGroups(gr.Items)
            } else {
              loopRecords(gr.Items);
            }
          }
        }
        function loopRecords(records) {
          for (var i = 0; i < records.length; i++) {
            var record = records[i];
            offsetDateFields(record);
          }
        }

        function offsetDateFields(obj) {
          var tizeZoneValue = $("#timeZone").data('kendoDropDownList').value();
          for (var name in obj) {
            var prop = obj[name];
            // The following replace method is needed because the dates are received from the server in the following format "/Date(1500469281437)/".
            if (typeof (prop) === "string" && prop.indexOf("/Date(") == 0) {
              obj[name] = prop.replace(/\d+/, function (n) {     

                // Calculate the offset based on the user selection in the DropDownList
                offsetMiliseconds = (3600000 * tizeZoneValue);

                // Remove the current timezone offset and add the offset choose by the user in the DropDownList.
                return parseInt(n) + offsetMiliseconds + currentoffsetMiliseconds;
              });
            }
          }
        }

        function customDateTimePickerEditor(container, options) {
          $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDateTimePicker({});
        }
      </script>
    </div>
```

## See Also

* [Globalization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [Formatting and Parsing of Dates and Numbers in Kendo UI for jQuery]({% slug dateformatting_kendoui_globalization %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
