---
title: Filtering Is Not Properly Persisted after Saving and Loading the State of the Grid
description: "The date filters of the Grid are not correctly persisted after kendo.stringify is applied."
type: troubleshooting
page_title: Filters Are Not Correctly Persisted After Saving and Loading the Grid State | Kendo UI Grid for jQuery
slug: grid-filters-are-not-correctly-persisted-after-saving-and-loading-the-grid-stateposition
previous_url: /knowledge-base/the-grid-filters-are-not-correctly-persisted-after-saving-and-loading-the-grid-state
tags: grid, filter, persist
ticketid: 1126061
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>60.0.3112.101</td>
 </tr>
</table>

## Description

The filters of the Grid are not correctly persisted after its state is saved and loaded. How can I properly persist the filtering and avoid the rendering of incorrect data in the Grid?

## Cause

The `JSON.stringify()` method that is internally used by the `kendo.stringify()` method utilizes the `Date.prototype.toISOString` function which represents time in unmodified UTC format.

## Solution

Programmatically apply the time offset before the filter is set again.

```dojo
 <body>

    <div id="example">
      <div class="box wide">
        <a href="#" class="k-button" id="save">Save State</a>
        <a href="#" class="k-button" id="load">Load State</a>
      </div>
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var saved;
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Meetings"
              },
              pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            reorderable: true,
            resizable: true,
            filterable:true,
            columnMenu: true,
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{
              field: "MeetingID",
              title: "Meeting",
              width: 250,
              locked: true
            }, {
              field: "Start",
              title: "Start",
              width: 350,
              type: "date",
              format: "{0:MM/dd/yy hh:mmtt}"
            }, {
              field: "End",
              title: "End",
              width: 350,
              type: "date",
              format: "{0:MM/dd/yy hh:mmtt}"
            }, {
              field: "RoomID",
              width: 450
            }]
          });

          var grid = $("#grid").data("kendoGrid");

          $("#save").click(function (e) {
            saved = true;
            e.preventDefault();
            localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
          });

          $("#load").click(function (e) {
            e.preventDefault();
            var options = localStorage["kendo-grid-options"];
            if (options) {
              var parsedOptions = JSON.parse(options)
              if(saved && parsedOptions.dataSource.filter != undefined){
                for (let i = 0; i<parsedOptions.dataSource.filter.filters.length; i++ ){
                  if(parsedOptions.dataSource.filter.filters[i].field = "Start"){
                    // Take the current offset
                    var currentoffset = (new Date()).getTimezoneOffset()
                    var newTime = new Date(parsedOptions.dataSource.filter.filters[i].value)
                    // Set the offset to the date
                    newTime.setHours(newTime.getHours() + currentoffset/60);
                    parsedOptions.dataSource.filter.filters[i].value = newTime
                  }
                }
                saved = false;
              }

              grid.setOptions(parsedOptions);
            }

          });
        });
      </script>
    </div>

```
