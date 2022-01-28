---
title: Create an External Columns Menu
description: Insert a custom external columns menu to help control which columns are shown and hidden.
type: how-to
page_title: Add an External Columns Menu to Control Hidden Columns
slug: grid-create-an-external-columns-menu
position: 
tags: grid, columns, menu
ticketid: 1063371
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to add an external columns menu with checkbox functionality outside to the Kendo UI Grid?

## Solution
Using the [Kendo UI Grid's API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid), you can take advantage of the [hideColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) and [showColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) methods.  These can be used in an external component, such as a Kendo UI Menu, outside of the Grid.  

Here's one approach you can take to add an external Kendo UI Menu with checkbox functionality based on the Kendo UI Grid column's hidden field:

1. Reference the [Grid Columns](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/fields/columns).

    ```javascript
            //reference grid
            var grid = $("#grid").data("kendoGrid");

            //reference columns
            var columnValues = grid.columns;
    ```

1. Create an array and loop through the [grid columns hidden field](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.hidden). If it's not hidden, push the "checked" string.

    ```javascript
            //Create array
            var checkedValues = [];

            //for each column, add checked if hidden is undefined
            $(columnValues).each(function(index){

              if (this.hidden == true) {
                checkedValues.push(" ");
              } else {
                checkedValues.push("checked");
              }
            });    
    ```

1. Get the Kendo UI Menu, [append](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/methods/append) the first item, and reference it.

    ```javascript
            //reference the Kendo UI Menu
            var menu = $("#columnMenu").data("kendoMenu");
            
            //create initial first item
            menu.append({text: "Columns"});
            
            //reference it through jQuery
            var firstItem = $("#columnMenu").children("li").eq(0);
    ```

1. For each of the Grid columns, append a new Kendo UI Menu Item with a checkbox element.  Include the array which will hold if the column will be checked initially or not.

    ```javascript
            //for each column, append checkboxes with checked values based on hidden field
            $(columnValues).each(function(index){
              menu.append({ text: "<input type='checkbox' " + checkedValues[index] + " />"+ grid.columns[index].field, encoded: false }, firstItem);         
            });
    ```

1. When a user selects a column from the menu, the Kendo UI Menu's [select event](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/select) is fired. 
    1. Make a  reference to the Grid.
    1. Determine how many hidden columns are in the Grid to always keep one.
    1. Based on the column's field, use the [showColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) or [hideColumn](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method.
    1.  If the item is shown, check the box.  Otherwise, uncheck it.  If it's the last item, keep the box checked.

    ```javascript
            function onSelect(e){

              //reference checkbox
              var checkbox = $(e.item).find("input");

              //reference the Grid
              var grid = $("#grid").data("kendoGrid");  

              //hold the number of columns
              var numOfColumns = grid.columns.length;  

              //loop through to find how many columns are hidden
              for (var i = 0; i < grid.columns.length; i++) {  
                if (grid.columns[i].hidden == true){
                  numOfColumns--;
                }
              }

              //if the field matches the selected item, check if it is hidden or not.
              for (var i = 0; i < grid.columns.length; i++) {
                if(grid.columns[i].field == e.item.innerText){

                  //Show the hidden column
                  if (grid.columns[i].hidden == true){
                    grid.showColumn(grid.columns[i].field);

                    //check box
                    $(checkbox).prop("checked", true);

                    //it will hide as long as there is more than one column in the Grid
                  } else if(numOfColumns != 1){
                    grid.hideColumn(grid.columns[i].field);

                    //uncheck box
                    $(checkbox).prop("checked", false);
                  } else {

                    //check box if it's the last item
                    $(checkbox).prop("checked", true);
                  }
                }
              }
            }

    ```

1.  Finally, you may want to remove the columns section from the Grid's [columnMenu](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columnmenu). One way to do that is using the Kendo UI Grid's [columnMenuInit event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit), and removing it using jQuery.

    ```javascript
            function onColumnMenuInit(e){
              var item = e.container.find(".k-columns-item");
              item.prev(".k-separator").remove();
              item.remove();
            }
    ```

#### Example

```dojo
    <ul id="columnMenu" style="width: 100px; margin-bottom: 5px"></ul>

    <div id="grid"></div>

    <script>
      $(document).ready(function() {

        $("#columnMenu").kendoMenu({
          closeOnClick: false,
          orientation: "vertical",
          select: onSelect
        });


        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
              model: {
                fields: {
                  OrderID: { type: "number" },
                  ShipCountry: { type: "string" },
                  ShipName: { type: "string" },
                  ShipAddress: { type: "string" }                                        
                }
              }
            },
            pageSize: 30,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
          },
          columnMenuInit: onColumnMenuInit,
          height: 550,
          sortable: true,
          filterable: true,
          columnMenu: true,
          pageable: true,
          columns: [ {
            field: "OrderID",
            title: "Order ID",
            width: 120
          }, {
            field: "ShipCountry",
            hidden: true,
            title: "Ship Country"
          }, {
            field: "ShipName",
            hidden: true,
            title: "Ship Name"
          },  {
            field: "ShipAddress",
            filterable: false
          }]
        });

        //reference grid
        var grid = $("#grid").data("kendoGrid");

        //reference columns
        var columnValues = grid.columns;

        //Create array
        var checkedValues = [];

        //for each column, add checked if hidden is undefined
        $(columnValues).each(function(index){

          if (this.hidden == true) {
            checkedValues.push(" ");
          } else {
            checkedValues.push("checked");
          }
        });    

        //reference the Kendo UI Menu
        var menu = $("#columnMenu").data("kendoMenu");

        //create initial first item
        menu.append({text: "Columns"});

        //reference it through jQuery
        var firstItem = $("#columnMenu").children("li").eq(0);

        //for each column, append checkboxes with checked values based on hidden field
        $(columnValues).each(function(index){
          menu.append({ text: "<input type='checkbox' " + checkedValues[index] + " />"+ grid.columns[index].field, encoded: false }, firstItem);         
        });

        function onColumnMenuInit(e){
          var item = e.container.find(".k-columns-item");
          item.prev(".k-separator").remove();
          item.remove();
        }

        function onSelect(e){

          //reference checkbox
          var checkbox = $(e.item).find("input");

          //reference the Grid
          var grid = $("#grid").data("kendoGrid");  

          //hold the number of columns
          var numOfColumns = grid.columns.length;  

          //loop through to find how many columns are hidden
          for (var i = 0; i < grid.columns.length; i++) {  
            if (grid.columns[i].hidden == true){
              numOfColumns--;
            }
          }

          //if the field matches the selected item, check if it is hidden or not.
          for (var i = 0; i < grid.columns.length; i++) {
            if(grid.columns[i].field == e.item.innerText){

              //Show the hidden column
              if (grid.columns[i].hidden == true){
                grid.showColumn(grid.columns[i].field);

                //check box
                $(checkbox).prop("checked", true);

                //it will hide as long as there is more than one column in the Grid
              } else if(numOfColumns != 1){
                grid.hideColumn(grid.columns[i].field);

                //uncheck box
                $(checkbox).prop("checked", false);
              } else {

                //check box if it's the last item
                $(checkbox).prop("checked", true);
              }
            }
          }
        }
      });
    </script>
```

## See Also
* [showColumn Method - Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn)
* [hideColumn Method - Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn)
* [columns - Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/fields/columns)
* [columns.hidden - Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.hidden)
* [append method - Menu API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/methods/append)
* [select event - Menu API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu/events/select)
* [columnMenu - Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columnmenu)
* [columnMenuInit Event - Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit)
