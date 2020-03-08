---
title: Customize Null Text for Checkbox Filter mode
description: How to Customize Null Text for Checkbox Filter mode in Grid
type: how-to
page_title: Customize Null Text for Checkbox Filter mode in Grid | Kendo UI Grid for jQuery
slug: grid-customize-null-text-checkbox-filtering
position:
tags: grid, filter
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2019.3.1023</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I customize the null option's text in the Checkbox filter menu?

## Solution

You can add the [columns.filterable.itemTemplate](/api/javascript/ui/grid/configuration/columns.filterable.itemtemplate) option and either change the text or completely hide the null value as an option:

## Hide the null option from the filter menu

```dojo
    <div id="grid"></div>
    <script>
      var data = [
        { id: 1, name: "Fred", key: 1, value: "Green" },
        { id: 2, name: "Jed", key: 11, value: null },
        { id: 3, name: "Red", key: 2, value: "Doe" },
        { id: 4, name: null, key: 23, value: "Bleh" },
        { id: 5, name: "Ed", key: 3, value: "Toast" },
        { id: 6, name: "Zed", key: 4, value: "Smith" },
        { id: 7, name: "Ed", key: 41, value: null }
      ];

      $(function() {

        var commonCheckboxTemplate = function(e) {
          return "#if(data.all || data.value){#" +
            "<div><label><input  type='checkbox' name='"+ e.field +"' value='#= data." + e.field + "#'><span>#= data.all || data.value # </span></label></div>" +
            "#}#"
        };


        var dataSource = new kendo.data.DataSource({
          data: data,
          schema: {
            model: {
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                key: { type: "number" },
                value: { type: "string" }
              }
            }
          }
        });

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          sortable: true,
          filterable: true,
          columns: [
            {field: "id", title: "Id"},
            {
              field: "name",
              title: "Name",
              filterable: { multi: true, itemTemplate: commonCheckboxTemplate }

            },
            {field: "key", title: "Key"},
            { field: "value", title: "Value",
             filterable: { multi: true, itemTemplate: commonCheckboxTemplate }
            }
          ]
        });
      });
    </script>
    </div>
```

## Customize null option text in the filter menu

```dojo
    <div id="grid"></div>
    <script>
      var data = [
        { id: 1, name: "Fred", key: 1, value: "Green" },
        { id: 2, name: "Jed", key: 11, value: null },
        { id: 3, name: "Red", key: 2, value: "Doe" },
        { id: 4, name: null, key: 23, value: "Bleh" },
        { id: 5, name: "Ed", key: 3, value: "Toast" },
        { id: 6, name: "Zed", key: 4, value: "Smith" },
        { id: 7, name: "Ed", key: 41, value: null }
      ];

      $(function() {

        var commonCheckboxTemplate = function(e) {
          return "<div><label><input  type='checkbox' name='"+ e.field +"' value='#= data." + e.field + "#'><span>#= data.all || (data.value?data.value: 'No Value') # </span></label></div>" 
        };


        var dataSource = new kendo.data.DataSource({
          data: data,
          schema: {
            model: {
              fields: {
                id: { type: "number" },
                name: { type: "string" },
                key: { type: "number" },
                value: { type: "string" }
              }
            }
          }
        });

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          sortable: true,
          filterable: true,
          columns: [
            {field: "id", title: "Id"},
            {
              field: "name",
              title: "Name",
              filterable: { multi: true, itemTemplate: commonCheckboxTemplate }

            },
            {field: "key", title: "Key"},
            { field: "value", title: "Value",
             filterable: { multi: true, itemTemplate: commonCheckboxTemplate }
            }
          ]
        });
      });
    </script>
```
