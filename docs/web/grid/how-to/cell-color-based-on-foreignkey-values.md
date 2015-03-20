---
title: Cell color based on ForeignKey values
page_title: Cell color based on ForeignKey values
description: Cell color based on ForeignKey values
---

# Set cell text color based on the ForeignKey values

The example below demonstrates how to set cell text color based on the ForeignKey values.

#### Example:

```html
    <style>
    .red{
    	color:red;
    }
      
    .green {
    	color:green;
    }
    </style>
    <script src="../content/shared/js/products.js" type="text/javascript"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
        var categories = [{
          "value": 1,
          "text": "Beverages"
        },{
          "value": 2,
          "text": "Condiments"
        },{
          "value": 3,
          "text": "Confections"
        },{
          "value": 4,
          "text": "Dairy Products"
        },{
          "value": 5,
          "text": "Grains/Cereals"
        },{
          "value": 6,
          "text": "Meat/Poultry"
        },{
          "value": 7,
          "text": "Produce"
        },{
          "value": 8,
          "text": "Seafood"
        }];

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true} },
                  CategoryID: { field: "CategoryID", type: "number", defaultValue: 1 },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            filterable: true,
            groupable: true,
            pageable: true,
            height: 540,
            toolbar: ["create"],
            columns: [
              { field: "ProductName", title: "Product Name" },
              { field: "CategoryID", width: "200px", values: categories, title: "Category",attributes: {
                class: "#=ProductID % 2 ? 'red' : 'green' # #console.log(data)#" 
              },
               template:  function(dataItem) {
                 var value = dataItem.CategoryID;

                 var text = $.grep(categories, function(item) {                                 
                   return item.value == value;
                 })[0].text;

                 return text;
               } 
              },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px" },
              { command: "destroy", title: " ", width: "150px"}],
            editable: true
          });
        });
      </script>
    </div>

```
