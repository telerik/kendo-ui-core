---
title: Create Custom Editor in Detail Template
page_title: Create Custom Editor in Detail Template | Kendo UI Grid
description: "Learn how to create custom a custom editor in a Kendo UI Grid detail template."
slug: howto_create_custom_editorin_detail_template_grid
---

# Create Custom Editor in Detail Template

The example below demonstrates how to create a custom editor in a Kendo UI Grid detail template.

###### Example

```html
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
            read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
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
              read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
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

Other articles on the Kendo UI Grid and how-to examples related to the usage of templates:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Refresh Grid in Detail Template]({% slug howto_refresh_gridin_detail_template_grid %})
* [How to Use Checkbox Column Templates and Edit]({% slug howto_use_checkbox_column_templateand_edit_grid %})
* [How to Use Dates inside Row Template]({% slug howto_use_dates_inside_row_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
