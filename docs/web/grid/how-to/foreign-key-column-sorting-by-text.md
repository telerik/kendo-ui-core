---
title: ForeignKey column sorting by text
page_title: ForeignKey column sorting by text
description: ForeignKey column sorting by text
---

# ForeignKey column sorting by text

The example below demonstrates how to enable sorting by text in ForeignKey column using calculated field.

#### Example:

```html

    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
        var categories = [
            { "value": 1, "text": "Beverages"},
            { "value": 2, "text": "Condiments"},
            { "value": 3, "text": "Confections"},
            { "value": 4, "text": "Dairy Products"},
            { "value": 5, "text": "Grains/Cereals"},
            { "value": 6, "text": "Meat/Poultry"},
            { "value": 7, "text": "Produce"},
            {"value": 8, "text": "Seafood"}];
        
        //create dictionary of text-values for the FKC
        var categoriesDict = {};
        for (var i=0; i<categories.length;i++) {
        	categoriesDict[categories[i].value] = categories[i].text;
        }

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            change: function(e) {
              if (!e.action) {
                this.data();
              }
            },
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true} },
                  CategoryID: { field: "CategoryID", type: "number", defaultValue: 1 },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                },
                //define calculated field:
                CategoryName: function() {
                  return categoriesDict[this.get("CategoryID")];
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            groupable: true,
            pageable: true,
            sortable: true,
            height: 540,
            toolbar: ["create"],
            columns: [
              { field: "ProductName", title: "Product Name" },
              //bind column to the calculated field and specify custom editor:
              { field: "CategoryName()", width: "200px", title: "Category", editor: categoryDropDownEditor },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px" },
              { command: "destroy", title: " ", width: "150px"}],
            editable: true
          });
        });


        function categoryDropDownEditor(container, options) {
          //specify the value field in the "data-bind" attribute
          $('<input required data-text-field="text" data-value-field="value" data-bind="value:CategoryID"/>')
          .appendTo(container)
          .kendoDropDownList({
            autoBind: false,
            dataSource: categories
          });
        }
      </script>
    </div>
```
