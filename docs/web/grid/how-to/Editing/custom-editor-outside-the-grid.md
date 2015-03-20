---
title: Custom editor shown outside the Grid using the selected date item
page_title: Custom editor shown outside the Grid using the selected date item
description: Custom editor shown outside the Grid using the selected date item
---

# Custom editor shown outside the Grid using the selected date item

The following runnable sample demonstrates how to use custom editor outside the Kendo UI Grid, that uses the currently selected item.

#### Example: 

```html
     <form id="gridEditor">
      <input type="text" name="ProductName" data-bind="value: ProductName">
      <input type="checkbox" name="Discontinued" data-bind="checked: Discontinued">

    </form>

    <div id="validator">
      <div id="grid"></div>
    </div>
    
    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <script>
      $(document).ready(function () { 

        var selectedRow = null;
        var dataSource = new kendo.data.DataSource({
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }}
          },
          pageSize: 20
        });

        var grid = $("#grid").kendoGrid({
          change: function(e){
            selectedRow = this.select();
            var item = this.dataItem(selectedRow);
            kendo.bind($("#gridEditor"), item); 
          },
          dataBound: function(e){
            if(selectedRow){ 
              this.select($("#grid tr[data-uid='"+ selectedRow.attr("data-uid") +"']"));
            }
          },
          dataSource: dataSource,
          selectable: true,
          pageable: true,
          height: 500,
          toolbar: [{template: "<input id='addNew' type='button' class='k-button' value='Add new'/>"}],
          columns: [
            { field: "ProductName", title: "Product Name", width: "100px" }, 
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "100px" },
            { field: "UnitsInStock", title:"Units In Stock", width: "100px" },
            { field: "Discontinued", width: "100px" }]
        }).data("kendoGrid");

        $("#addNew").click(function(){
          var newItem = grid.dataSource.insert({},0);
          grid.select($("#grid tr[data-uid='"+ newItem.uid +"']"));
        })
      });
    </script>
```