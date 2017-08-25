---
title: Kendo UI Professional Filtering Kendo Grid Date with Persisting the State
description: The date filters are not correctly persisted after kendo.stringify
type: troubleshooting
page_title: The Grid Filters Are Not Correctly Persisted After Saving and Loading the Grid State
slug: the-grid-filters-are-not-correctly-persisted-after-saving-and-loading-the-grid-stateposition
tags: grid, filter, persist
ticketid: 1126061
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress Kendo UI</td>
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

The Grid filters are not correctly persisted after saving and loading the Grid state, which is causing inccorect data to be shown in the Grid.

## Cause

The issue occurs beucase the JSON.stringify() method used internally by the kendo.stringify() method is using the Date.prototype.toISOString function which represents time in unmodified UTC.

## Solution

The issue can be resolved by programmatically applying the time offset before the filter is set again.

A runnable example can be found [here](http://dojo.telerik.com/EgAQUR/4)

```
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
                    //Taking the current offset
                    var currentoffset = (new Date()).getTimezoneOffset()
                    var newTime = new Date(parsedOptions.dataSource.filter.filters[i].value)
                    //Setting the offset to the date
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

