---
title: Access an editor control in edit event
page_title: Access an editor control in edit event
description: Kendo UI Grid example that demonstrates how to access an editor control in the edit event handler of the widget
---

# Access an editor control in edit event of Kendo UI Grid

The following example demonstrates how to acccess an editor control in the edit event handler.

#### Example:

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
<div id="example">
    <div id="grid"></div>

    <script>

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
                        ProductName: { validation: { required: true } },
                        Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                        UnitPrice: { type: "number", validation: { required: true, min: 1} }
                     }
                   }
               }
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                toolbar: ["create"],
                columns: [
                    { field:"ProductName",title:"Product Name" },
                    { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
                    { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
                    { command: "edit", title: " ", width: "150px" }],
                editable: "inline",
                edit: function(e) {
                  var model = e.model; //reference to the model that is about the be edited

                  var container = e.container; //reference to the editor container

                  var category = container.find("[data-role=dropdownlist]").data("kendoDropDownList"); //find widget element

                  //if widget is found (required for incell editing)
                  if (category) {
                    //use DropDownList API based on the model values to accomplish your bussiness requirement.

                    //link: http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist
                  }
                }
            });
        });

        function categoryDropDownEditor(container, options) {
            $('<input required data-text-field="CategoryName" data-value-field="CategoryID" data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                        }
                    }
                });
        }

    </script>
</div>
```
