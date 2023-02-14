---
title: Configure Kendo Tooltip for TreeList command buttons
description: Learn how to update the content of Kendo Tooltip when used on TreeList command buttons.
type: how-to
page_title: Use Kendo Tooltip for TreeList command buttons - Kendo UI Tooltip for jQuery
slug: tooltip-on-treelist-command-buttons
tags: kendo ui, tooltip, treelist, content
ticketid: 1534253
res_type: kb
component: tooltip
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Tooltip for jQuery</td>
  <td>Progress® Kendo UI® TreeList for jQuery</td>
 </tr>
</table>
 

## Description

How to update the content of Kendo Tooltip when it is used for the TreeList command buttons?

## Solution

Subscribe to the TreeList `edit`, `dataBound` and `cancel` events. In the event handlers refresh the Tooltip content using the [`refresh`](/api/javascript/ui/tooltip/methods/refresh) method

### DatePicker

The following example demonstrates how to refresh the content of Kendo Tooltip when different command buttons in the TreeView are clicked.

```dojo
 <div id="treelist"></div>

<script>
    $(document).ready(function(){
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
            parentId: "ReportsTo",
            fields: {
              EmployeeId: { type: "number", editable: false, nullable: false },
              ReportsTo: { nullable: true, type: "number" },
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
        edit: function(e){            
          $('#treelist').data('kendoTooltip').refresh()             
        },
        dataBound: function(e){            
          $('#treelist').data('kendoTooltip').refresh()             
        },
        cancel: function(e){
          setTimeout(function(){
            $('#treelist').data('kendoTooltip').refresh()
          })
        },
        toolbar: [ "create" ],
        editable: true,
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { field: "HireDate", title: "Hire Date", format: "{0:MMMM d, yyyy}" },
          { field: "Phone", title: "Phone" },
          { field: "Extension", title: "Ext", format: "{0:#}" },
          { command: ["edit", "destroy", "cancel"], width: 300 }
        ]
      });

      $("#treelist").kendoTooltip({
        filter: ".k-button-icontext",
        content: function(e){              	
          return e.target.text()
        }
      });

      function customBoolEditor(container, options) {
        $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
      }
    })
</script>
```

## See Also

* [Tooltip] API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
* [TreeList API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist)
