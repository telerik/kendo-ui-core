---
title: Show a context menu
page_title: Show a context menu
description: Show a context menu
---

# Show a context menu

The example below demonstrates how to show a context menu for the TreeList rows

#### Example:

```html
  <div id="treelist"></div>


  <ul id="menu">
    <li><span class='k-icon k-add'></span>Add</li>
    <li><span class='k-icon k-delete'></span>Delete</li>
  </ul>

  <script>
    $(document).ready(function () {
      var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service";

      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read:  {
            url: crudServiceBaseUrl + "/EmployeeDirectory/All",
            dataType: "jsonp"
          },
          update: {
            url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
            dataType: "jsonp"
          },
          destroy: {
            url: crudServiceBaseUrl + "/EmployeeDirectory/Destroy",
            dataType: "jsonp"
          },
          create: {
            url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
              return {models: kendo.stringify(options.models)};
            }
          }
        },
        batch: true,
        schema: {
          model: {
            id: "EmployeeId",
            fields: {
              EmployeeId: { type: "number", editable: false, nullable: false },
              parentId: { field: "ReportsTo", nullable: true },
              FirstName: { validation: { required: true } },
              LastName: { validation: { required: true } },
              HireDate: { type: "date" },
              Phone: { type: "string" },
              HireDate: { type: "date" },
              BirthDate: { type: "date" },
              Extension: { type: "number", validation: { min: 0, required: true } },
              Position: { type: "string" }
            },
            expanded: true
          }
        }
      });

      $("#treelist").kendoTreeList({
        dataSource: dataSource,
        toolbar: [ "create" ],
        editable: true,
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { field: "HireDate", title: "Hire Date", format: "{0:MMMM d, yyyy}" },
          { field: "Phone", title: "Phone" },
          { field: "Extension", title: "Ext", format: "{0:#}" }
        ]
      });


      $("#menu").kendoContextMenu({
        // listen to right-clicks on the treelist container
        target: "#treelist",

        // show when a row is clicked
        filter: "tbody > tr",

        // handle item clicks
        select: function(e) {
          var button = $(e.item);
          var row = $(e.target);
          var dataItem = $("#treelist").data("kendoTreeList").dataItem(row);

          alert(kendo.format("'{0}' button clicked on '{1}'", button.text(), dataItem.FirstName));
        }
      });
    });
  </script>
```
