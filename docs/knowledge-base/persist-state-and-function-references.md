---
title: Persist Function References of Custom Command Buttons in the Grid
description: An example on how to persist the function references of the custom command buttons in the Kendo UI Grid after serialization.
type: how-to
page_title: Persist the Command Button State and Function References | Kendo UI Grid
slug: persist-state-and-function-references
previous_url: /knowledge-base/how-to-persist-state-and-function-references
tags: grid, persist, state, function, reference
ticketid: 1133697
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
  <td>Latest</td>
 </tr>
  <tr>
  <td>Made with version</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

How can I persist the function references of the custom command buttons in the Kendo UI Grid after serialization?

## Solution

Just before you pass the options to the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method of the Grid, add the function reference to the parsed JSON file.

```dojo
    <div id="example">
      <div class="box wide">
        <a href="#" class="k-button" id="save">Save State</a>
        <a href="#" class="k-button" id="load">Load State</a>
      </div>
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            reorderable: true,
            resizable: true,
            columnMenu: true,
            filterable: {
              mode: "row"
            },
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{ command: { text: "View Details", click: showDetails }, title: " ", width: "180px" },{
              field: "ContactName",
              title: "Contact Name",
              width: 250,
            }, {
              field: "ContactTitle",
              title: "Contact Title",
              width: 350
            }, {
              field: "CompanyName",
              title: "Company Name",
              width: 350
            }, {
              field: "Country",
              width: 450
            }]
          });

          var grid = $("#grid").data("kendoGrid");

          $("#save").click(function (e) {
            e.preventDefault();
            localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
          });

          $("#load").click(function (e) {
            e.preventDefault();
            var options = localStorage["kendo-grid-options"];
            if (options) {
              var parsedOptions = JSON.parse(options)
              // Add the function reference
              parsedOptions.columns[0].command.click = showDetails
              grid.setOptions(parsedOptions);
            }
          });

          function showDetails(e) {
            e.preventDefault();
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            console.log(dataItem);
          }
        });
      </script>
    </div>
```
