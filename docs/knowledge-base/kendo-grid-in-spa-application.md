---
title: Use Grid in Kendo UI SPA Application
page_title: Use in SPA Application | Kendo UI Grid for jQuery
description: "An example on how to initialize the Kendo UI Grid for jQuery in a SPA application."
previous_url: /controls/data-management/grid/how-to/kendo-grid-in-spa-application, /controls/data-management/grid/how-to/various/kendo-grid-in-spa-application
slug: howto_use_gridin_kendouispa_app_grid
tags: grid, initialize, spa, apps
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I initialize the Kendo UI Grid for jQuery in a SPA application?

## Solution

The following example demonstrates how to initialize a Grid widget in a Single-Page Application (SPA).

```dojo
  <div id="app"></div>

    <script id="grid-view" type="text/x-kendo-tmpl">
    <div class="manage-roles">
      <div data-role="grid"
      data-scrollable="true"
      data-editable="inline"
      data-columns='[
        { field : "JobTitle", width: 120, title : "Job Title Code" },
        { field : "Description" },
        { field : "CategoryId", template: "${Category}" },
        {"command": "edit"}]'
      data-bind="source: roles"
      style="height: 500px">
      </div>
      </div>
    </script>

    <script>
      var roleViewModel = kendo.observable({
        categories: new kendo.data.DataSource({
          data: [
            { "CategoryId": 1, "Description": "IT" },
            { "CategoryId": 2, "Description": "Billing" },
            { "CategoryId": 3, "Description": "HR" },
            { "CategoryId": 4, "Description": "Sales" },
            { "CategoryId": 5, "Description": "Field" },
            { "CategoryId": 10, "Description": "Stuff" },
            { "CategoryId": 11, "Description": "Unassigned" }
          ]
        }),
        roles: new kendo.data.DataSource({
          data: [
            { "RoleId": 1, "JobTitle": "AADM1", "Description": "Administrative Assistant I", "Category": "Stuff", "CategoryId": 10 },
            { "RoleId": 2, "JobTitle": "AADM2", "Description": "Administrative Assistant II", "Category": null, "CategoryId": 0 },
            { "RoleId": 3, "JobTitle": "ACCIN", "Description": "Accounting Intern", "Category": null, "CategoryId": 0 },
            { "RoleId": 4, "JobTitle": "ACCSU", "Description": "Accounting Supervisor", "Category": null, "CategoryId": 0 }, { "RoleId": 5, "JobTitle": "ACCTC", "Description": "Accountant", "Category": null, "CategoryId": 0 }
          ]
        })
      });

      var categoryEditor = function(container, options) {     
        $('<input data-bind="value: ' + options.field + '" />')
        .appendTo(container)
        .kendoDropDownList({
          dataSource: roleViewModel.categories,
          dataTextField: 'Description',
          dataValueField: 'CategoryId'
        });
      };

      var view = new kendo.View($("#grid-view").html(), {
        model: roleViewModel,
        init: function() {
          var widget = this.element.find("[data-role=grid]").data("kendoGrid");

          widget.columns[2].editor = categoryEditor;
        }

      });

      var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

      layout.render($("#app"));

      layout.showIn("#content", view);
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
