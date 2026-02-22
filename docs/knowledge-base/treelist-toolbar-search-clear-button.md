---
title: Add a Clear button to the TreeList Search Panel
description: Learn how to add a clear button in the Kendo UI TreeList search panel.
type: how-to
page_title: Add a Clear Button in the Search TextBox - Kendo UI TreeList for jQuery
slug: treelist-toolbar-search-clear-button
tags: search, clear, button, treelist, panel
ticketid: 1499021
res_type: kb
components: ["treelist"]
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® TreeList for jQuery</td>
	</tr>
	<tr>
		<td>Product Version</td>
		<td>2023.3.1114</td>
	</tr>
</table>


## Description

I would like to add a button to clear the search text for TreeList Toolbar Search.

## Solution

The TreeList search panel does not feature a clear button at present. Therefore, we need to:

1. Find the search textbox wrapper
1. Append the clear button with [SVG icon](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/svg-icons) 
1. Add a `click` handler to the icon
1. Define the [SVG Icon](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/svg-icons#rendering-svg-icons)

```
    //Add a selector for SVG Icon
    var clearButton = '<span class="k-link k-link-clear" aria-label="Clear the Search"><span unselectable="on" id="clearIcon"></span></span>';

    $(".k-grid-search").append(clearButton);
    $(".k-link-clear").click(function(){
      $(".k-grid-search input").val("").trigger("input");                    
    });

    //Icon defined
    var icon =  kendo.ui.icon('x');
    $('#clearIcon').append(icon);

    <style>
      span.k-svg-i-x{
        padding-top: 5px;
      }

      .k-link-clear {
        margin-right: .428em;
      }
    </style>
```

```dojo
    <div id="example">
      <div id="treelist"></div>
      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";
          var dataSource = new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All"
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
                  HireDate: { type: "date" },
                  Phone: { type: "string" },
                  HireDate: { type: "date" },
                  BirthDate: { type: "date" },
                  Extension: { type: "number", validation: { min: 0} },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          });

          $("#treelist").kendoTreeList({
            dataSource: dataSource,
            toolbar: [ "search" ],
            height: 540,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 250 },
              { field: "LastName", title: "Last Name" },
              { field: "Position" },
              { field: "Phone", title: "Phone" },
              { field: "Extension", title: "Ext", format: "{0:#}" }
            ],

          });

          //Add a selector for SVG Icon
          var clearButton = '<span class="k-link k-link-clear" aria-label="Clear the Search"><span unselectable="on" id="clearIcon"></span></span>';

          $(".k-grid-search").append(clearButton);
          $(".k-link-clear").click(function(){
            $(".k-grid-search input").val("").trigger("input");                    
          });

          //Icon defined
          var icon =  kendo.ui.icon('x');
          $('#clearIcon').append(icon);
        });
      </script>
    </div>

    <style>
      span.k-svg-i-x{
        padding-top: 5px;
      }

      .k-link-clear {
        margin-right: .428em;
      }
    </style>
```
