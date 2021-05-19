---
title: Create Custom Editor in Detail Template
page_title: Custom Detail Template Editor | Kendo UI Grid for jQuery
description: "An example on how to create custom editor in the detail template of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Templates/detail-template-editor
slug: howto_create_custom_editorin_detail_template_grid
tags: grid, create, custom, editor, detail, template
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

How can I create custom editor in the detail template of the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to create a custom editor in a Grid detail template.

```dojo
    <div id="grid"></div>

    <script type="text/x-kendo-template" id="template">
    <div class="tabstrip">
        <ul>
            <li class="k-state-active">Contact Information</li>
            <li>Orders</li>
      </ul>

        <div>
            <div class='employee-details'>
                First Name: <input type="text" data-bind="value:FirstName"/><br />
                Last Name: <input type="text" data-bind="value:LastName"/><br />
                Country: <input type="text" data-bind="value:Country"/><br />   

      </div>
      </div>
        <div>
            <div class="orders"></div>
      </div>
      </div>

    </script>


    <script>
      var element = $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
          },
          pageSize: 5,
          serverPaging: true,
          serverSorting: true,
          schema: {
            model: {
              id: "EmplyeeID",
              fields: {
                FirstName: "FirstName",
                LastName: "LastName",
                Country: "Country"
              }
            }
          }
        },
        height: 450,
        sortable: true,
        pageable: true,
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        toolbar: [{ text:"Save Changes", className: "grid-save-changes"}],
        columns: [
          {
            field: "FirstName",
            title: "First Name"
          },
          {
            field: "LastName",
            title: "Last Name"
          },
          {
            field: "Country"
          },
          {
            field: "City"
          },
          {
            field: "Title"
          }
        ]
      });

      function detailInit(e) {
        var detailRow = e.detailRow;
        var model = e.data;
        kendo.bind(detailRow,model);
        model.bind('change',function(e){
          var tr = $('tr[data-uid='+model.uid+']');
          $('#grid').data().kendoGrid.expandRow(tr);
        })
        detailRow.find(".tabstrip").kendoTabStrip({
          animation: {
            open: { effects: "fadeIn" }
          }
        });



        detailRow.find(".orders").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize:6,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          sortable: true,
          pageable: true,
          columns: [
            { field: "OrderID", width: 70 },
            { field: "ShipCountry", title:"Ship Country", width: 100 },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: 200 }
          ]
        });
      }
    </script>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
