---
title: Show Context Menu in the TreeList
page_title: Show Context Menu in the TreeList
description: "Learn how to show a context menu for the Kendo UI TreeList rows."
slug: howto_showcontextmenu_treelist
previous_url: /controls/data-management/treelist/how-to/show-context-menu, /controls/navigation/menu/how-to/show-context-menu-in-treelist
tags: kendo, jquery, treelist, show, context, menu
component: treelist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeList for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I render a context menu in the Kendo UI for jQuery TreeList?

## Solution

The following example demonstrates how to show a context menu for the TreeList rows.

```dojo
  <div id="treelist"></div>

  <ul id="menu">
    <li><span class='k-icon k-i-add'></span>Add</li>
    <li><span class='k-icon k-i-delete'></span>Delete</li>
  </ul>

  <script>
    $(document).ready(function () {
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

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
        // Listen to right-clicks on the TreeList container.
        target: "#treelist",

        // Show when a row is clicked.
        filter: "tbody > tr",

        // Handle the item clicks.
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

## See Also

* [Basic Usage of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [Using the API of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/api)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
