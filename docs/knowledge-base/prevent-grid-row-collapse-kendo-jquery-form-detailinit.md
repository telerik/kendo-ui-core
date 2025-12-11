---
title: Preventing Grid Row Collapse When Using Kendo UI for jQuery Form in detailInit
description: Learn how to prevent grid row collapse when using Kendo UI for jQuery Form inside the Grid's detailInit.
type: how-to
page_title: How to Prevent Grid Row Collapse with Kendo UI for jQuery Form in detailInit
meta_title: Prevent Grid Row Collapse When Using Kendo UI for jQuery Form in detailInit
slug: prevent-grid-row-collapse-kendo-jquery-form-detailinit
tags: kendo-ui-for-jquery, form, grid, detailinit, databound, detailexpand, detailcollapse
res_type: kb
components: ["grid"]
ticketid: 1698866
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Form, <br/>
Kendo UI for jQuery Grid
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.3.825 </td>
</tr>
</tbody>
</table>

## Description

I have a Kendo UI for jQuery Grid with a [Form](https://docs.telerik.com/kendo-ui/api/javascript/ui/form) inside its [`detailInit`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/detailinit). When I change a value in the form, the grid row collapses.

This knowledge base article also answers the following questions:
- Why does my Kendo UI Grid row collapse when using Form in detailInit?
- How to prevent detail row collapse in Kendo UI Grid with Form?
- How to keep the detail row expanded after updating the model in Kendo UI Grid?

## Solution

To prevent the grid row from collapsing when using a Kendo UI for jQuery Form inside the [`detailInit`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/detailinit), track the expanded rows using the [`detailExpand`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/detailexpand), [`detailCollapse`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/detailcollapse), and [`dataBound`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/databound) events of the grid. Follow these steps:

1. Track expanded rows when a `detailExpand` event occurs.
2. Remove rows from tracking when manually collapsed using the `detailCollapse` event.
3. Re-expand rows after grid data refresh using the `dataBound` event.

### Implementation

Use the following code snippet to achieve the desired behavior:

```dojo

    <div id="example">
      <div id="grid"></div>

      <script type="text/x-kendo-template" id="template">
        <div class="detailTabstrip">
            <form class='employee-details'></form>
        </div>
      </script>

      <script>
        $(document).ready(function () {
          var expandedRows = [];
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core/",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
                  url: crudServiceBaseUrl + "/Products",
                },
                update: {
                  url: crudServiceBaseUrl + "/Products/Update",
                  type: "POST",
                  contentType: "application/json",
                },
                destroy: {
                  url: crudServiceBaseUrl + "/Products/Destroy",
                  type: "POST",
                  contentType: "application/json",
                },
                create: {
                  url: crudServiceBaseUrl + "/Products/Create",
                  type: "POST",
                  contentType: "application/json",
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                },
              },
              batch: true,
              pageSize: 20,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: { editable: false, nullable: true },
                    ProductName: { validation: { required: true } },
                    UnitPrice: {
                      type: "number",
                      validation: { required: true, min: 1 },
                    },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: {
                      type: "number",
                      validation: { min: 0, required: true },
                    },
                  },
                },
              },
            });

          var element = $("#grid").kendoGrid({
            dataSource: dataSource,
            height: 550,
            sortable: true,
            pageable: false,
            detailTemplate: kendo.template($("#template").html()),
            detailInit: detailInit,
            dataBound: function() {
              // Re-expand any rows that should remain expanded after data refresh
              var grid = this;
              if (expandedRows) {
                expandedRows.forEach(function(uid) {
                  var row = grid.tbody.find('tr[data-uid="' + uid + '"]');
                  if (row.length && !row.next().hasClass('k-detail-row')) {
                    grid.expandRow(row);
                  }
                });
              }
            },
            detailExpand: function(e) {
              // Track expanded rows
              if (!expandedRows) {
                expandedRows = [];
              }
              var dataItem = this.dataItem(e.masterRow);
              if (expandedRows.indexOf(dataItem.uid) === -1) {
                expandedRows.push(dataItem.uid);
              }
            },
            detailCollapse: function(e) {
              // Remove from expanded rows tracking
              if (expandedRows) {
                var dataItem = this.dataItem(e.masterRow);
                var index = expandedRows.indexOf(dataItem.uid);
                if (index > -1) {
                  expandedRows.splice(index, 1);
                }
              }
            },
            columns: [
              "ProductName",
              {
                field: "UnitPrice",
                title: "Unit Price",
                format: "{0:c}",
                width: 120,
              },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: "&nbsp;", width: 150 },
            ],
          });
        });

        function detailInit(e) {
          var detailRow = e.detailRow;

          detailRow.find(".employee-details").kendoForm({
            submit: function (e) {
              var grid = $("#grid").data('kendoGrid');
              var masterRow = e.sender.element.closest('tr').prev();
              var dataItem = grid.dataItem(masterRow);
              var productId = dataItem.ProductID;
              
              // Prevent default form submission
              e.preventDefault();
              
              // Store the current expanded state
              var wasExpanded = masterRow.hasClass('k-master-row') && masterRow.next().hasClass('k-detail-row');
              
              // Update the data item
              dataItem.set('ProductName', e.model.ProductName);
              grid.dataSource.sync();
              
              // If the row was expanded and becomes collapsed, re-expand it
              if (wasExpanded) {
                setTimeout(function() {
                  var currentMasterRow = grid.tbody.find('tr[data-uid="' + dataItem.uid + '"]');
                  if (currentMasterRow.length && !currentMasterRow.next().hasClass('k-detail-row')) {
                    grid.expandRow(currentMasterRow);
                  }
                }, 10);
              }
              
              return false; // Additional prevention of form submission
            },
            formData: {
              ProductName: e.data.ProductName,
              UnitsInStock: e.data.UnitsInStock,
            },
          });
        }
      </script>
    </div>
```

### Notes

- Avoid updating the main Grid `dataSource` on every input change inside the form. Instead, collect changes locally in the form and update the `dataSource` only upon clicking an "Apply" or "Save" button.

## See Also

- [Kendo UI Grid API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/)
- [Kendo UI Grid Hierarchy](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/hierarchy)
- [Kendo UI Form Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/form/overview)
