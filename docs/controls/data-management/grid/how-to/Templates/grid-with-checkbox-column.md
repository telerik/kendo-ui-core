---
title: Use Checkbox Column Templates and Edit
page_title:  Use Checkbox Column Templates and Edit | Kendo UI Grid
description: "Learn how to use checkbox column templates and perform editing in the Kendo UI Grid widget."
slug: howto_use_checkbox_column_templateand_edit_grid
---

# Use Checkbox Column Templates and Edit

The example below demonstrates how to use checkboxes in Kendo UI Grid column templates and perform editing.

###### Example

```html
   <div id="grid"></div>
    <script>
      var crudServiceBaseUrl = "http://demos.kendoui.com/service",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/Products/Update",
                dataType: "jsonp"
              },
              destroy: {
                url: crudServiceBaseUrl + "/Products/Destroy",
                dataType: "jsonp"
              },
              create: {
                url: crudServiceBaseUrl + "/Products/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                }
              }
            }
          });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 430,
        toolbar: ["create", "save", "cancel"],
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
          { field: "UnitsInStock", title: "Units In Stock", width: 110 },
          { template: '<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110 },
          { command: "destroy", title: "&nbsp;", width: 100 }],
        editable: true
      });

      $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("Discontinued", this.checked);
      });
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to the usage of templates:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Create Custom Editor in Detail Template]({% slug howto_create_custom_editorin_detail_template_grid %})
* [How to Refresh Grid in Detail Template]({% slug howto_refresh_gridin_detail_template_grid %})
* [How to Use Dates inside Row Template]({% slug howto_use_dates_inside_row_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
