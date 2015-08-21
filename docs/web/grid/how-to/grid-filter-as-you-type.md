---
title: Filter Kendo UI Grid as you type
page_title: Filter Kendo UI Grid as you type
description: Filter Kendo UI Grid as you type
---

# Filter Kendo UI Grid as you type

The following example demonstrates how to filter the Kendo UI Grid on the fly, as the user types in the filter row textbox.

The following steps are required:

* enable [row filtering mode](/api/javascript/ui/grid#configuration-filterable.mode)
* use a custom [filter cell template](/api/javascript/ui/grid#configuration-columns.filterable.cell.template) for the desired Grid column 
* the purpose of the filter cell template is to attach a keydown or keypress event handler to the textbox (`args.element`) and in this handler,
trigger the `change` event of the textbox. The `change` event will trigger Grid filtering.
* [change the default `"eq"` operator](/api/javascript/ui/grid#configuration-columns.filterable.cell.operator)
of the column with `"contains"`, `"startswith"` or any other [supported operator](/api/javascript/data/datasource#configuration-filter.operator)

#### Example:

```html
    <div id="grid"></div>

    <script>

      $(function(){
        $("#grid").kendoGrid({
          dataSource: products,
          filterable: {
            mode: "row"
          },
          height: 400,
          columns: [{
            field: "ProductName",
            title: "Product Name",
            filterable: {
              cell: {
                operator: "contains",
                template: function (args) {
                  args.element.css("width", "90%").addClass("k-textbox").keydown(function(e){
                    setTimeout(function(){
                      $(e.target).trigger("change");
                    });
                  });                	
                },
                showOperators: false
              }
            }
          }]
        });
      });

      var products = new kendo.data.DataSource({
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductName: { type: "string" }
            }
          }
        },
        transport: {
          read: {
            url: "//demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp"
          }
        }
      });

    </script>
```