---
title: Hide the Edit Fields on Different TreeList Levels
page_title: Hide Edit Fields on Different TreeList Levels
description: "Learn how to hide editors for different columns on different levels in a Kendo UI TreeList widget."
slug: howto_hideeditfieldsondifferentlevels_treelist
previous_url: /controls/data-management/treelist/how-to/hide-edit-fields-on-different-levels
tags: kendo, jquery, treelist, hide, edit, fields, on, different, levels
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

How can I hide editors for different columns on different levels in the Kendo UI for jQuery TreeList?

## Solution

The following example demonstrates how to achieve the required scenario.

```dojo
    <div id="treelist"></div>

    <style>
      .non-editable {
            visibility: hidden;
        }
    </style>

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

        var hideEditorsForLevel = {
          0: ["Position", "HireDate", "Phone", "Extension"],
          1: ["Position"]
        };

        $("#treelist").kendoTreeList({
          dataSource: dataSource,
          toolbar: [ "create" ],
          editable: true,
          height: 540,
          edit: function(e) {
            // Determine the level from the model.
            var level = this.dataSource.level(e.model);

            // Hide the content in non-editable cells.
            $(e.container).closest("tr")
              .find("[data-bind]").filter(function() {
                  var name = $(this).attr("name");
                  return $.inArray(name, hideEditorsForLevel[level]) > -1;
              }).closest("td>*").addClass("non-editable");
          },
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { field: "HireDate", title: "Hire Date", format: "{0:MMMM d, yyyy}" },
            { field: "Phone", title: "Phone" },
            { field: "Extension", title: "Ext", format: "{0:#}" },
            { title: "Edit", command: [ "edit", "destroy" ], width: 250,
             attributes: {
               style: "text-align: center;"
             }
            }
          ]
        });
      });
    </script>
```

## See Also

* [Basic Usage of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [Using the API of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/api)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
