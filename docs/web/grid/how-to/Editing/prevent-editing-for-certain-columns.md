---
title: Prevent editing for records based on boolean value
page_title: Prevent editing for records based on boolean value
description: Prevent editing for records based on boolean value
---

#Prevent editing for records based on boolean value

The following runnable sample demonstrates how to prevent editing for a record based on a boolean field in the data item.

#### Example
```html
    <h3>You are allowed to edit only products that are not discontinued</h3>
    <div id="grid"></div>

    <script>
      $(document).ready(function () { 
        var dataSource1 = new kendo.data.DataSource({
          data: [
            {
              ProductName: "Product1",
              Discontinued: false
            },
            {
              ProductName: "Product2",
              Discontinued: true
            }
          ],
          schema: {
            model: {
              fields: {
                ProductName: { validation :{ required: true}, type: "string" },
                Discontinued: { type: "boolean" }
              }}
          },
          pageSize: 20
        });  
        var grid = $("#grid").kendoGrid({
          dataSource: dataSource1,
          pageable: true,
          height: 500,
          toolbar: ["create"],
          columns: [ 
            { field: "ProductName", title: "Product Name", width: "200px",
             editor: CustomEditor
            },
            { field: "Discontinued", width: "100px" }],
          editable: "incell", 
        }).data("kendoGrid");

        function CustomEditor(container, options) { 
          if(!options.model.Discontinued){
            var input = $('<input required validationMessage="This field is required" data-text-field="'
                          + options.field +'" data-value-field="'
                          + options.field +'" data-bind="value:'
                          + options.field +'"/>');
            $(container).append(input);
          }
          else{ 
            var input = kendo.toString(options.model[options.field]);
            $(container).text(input);
            $(container).toggleClass("k-edit-cell");
          }
        }; 
      });
    </script>
```