---
title: Display Warning on Save in Kendo UI Grid
description: An example on how to display a warning message when leaving an edit cell.
type: how-to
page_title: Incell Editing Display a Warning Message on Save
slug: grid-incell-editing-display-message-on-save
tags: grid, incell, edit, save, warning, message, leave, cell
ticketid: 1145326
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Created with Product Version</td>
			<td>2017.3 1026</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>jQuery Grid for Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

I am using in-cell batch editing.  We would like to display a warning message if the user changes the value of a cell.

## Solution

You can use the Kendo UI Grid [`save`](/api/javascript/ui/grid/events/save) event and the event data that it reveals and then open the cell for editing with the [`editCell()`](/api/javascript/ui/grid/methods/editcell) method:

- Using [`kendo.alert()`](/api/javascript/kendo/methods/alert)

```
    save: function(e) {
        var cell = e.container;
        var grid = this;
        if (e.values.name !== "") {
            kendo.alert("You have manually changed name from " + e.model.name + " to " + e.values.name + ", this can cause serious problems!").bind("hide", function(){
              grid.editCell(cell);
            });
        } 
    }    
```

- Using the built-in alert

```
    save: function(e) {
        var cell = e.container;
        var grid = this;
        if (e.values.name !== "") {
         	alert("You have manually changed name from " + e.model.name + " to " + e.values.name +  ", this can cause serious problems!");
          grid.editCell(cell);
        } 
    }
```

```dojo
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
          columns: [
            { field: "name" },
            { field: "age" },
            { command: "destroy" }
          ],
          dataSource: {
            data:[
              { id: 1, name: "Jane Doe", age: 30},
              { id: 2, name: "John Doe", age: 33}
            ],
            schema: {
              model: { id: "id" }
            }
          },
          editable: true,
          save: function(e) {
            var cell = e.container;
            var grid = this;
            if (e.values.name !== "") {
              kendo.alert("You have manually changed name from " + e.model.name + " to " + e. values.name + ", this can cause serious problems!").bind("hide", function(){
                grid.editCell(cell)
              });
            } 
          }
        });
    </script>
```
