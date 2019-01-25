---
title: Use Checkbox Column Templates and Edit
page_title:  jQuery Grid Documentation | Checkbox Column Templates | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to use checkbox column templates and perform editing."
previous_url: /kendo-uimvc/web/grid/how-to/Templates/grid-with-checkbox-column
slug: howto_use_checkbox_column_templateand_edit_grid
---

# Use Checkbox Column Templates and Edit

The following example demonstrates how to use checkboxes in the Grid column templates and perform editing.

For more information on how to apply batch editing with a bound Boolean column, check the article about [adding model-bound and batch-editable checkbox columns to the Grid](/knowledge-base/grid-bound-checkbox-editable-column).

###### Example

```dojo
   <div id="grid"></div>
    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
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
          { template: '#=dirtyField(data,"Discontinued")#<input type="checkbox" #= Discontinued ? \'checked="checked"\' : "" # class="chkbx" />', width: 110 },
          { command: "destroy", title: "&nbsp;", width: 100 }],
        editable: true
      });

      $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("Discontinued", this.checked);
      });

      function dirtyField(data, fieldName){
        var hasClass = $("[data-uid=" + data.uid + "]").find(".k-dirty-cell").length < 1;
        if(data.dirty && data.dirtyFields[fieldName] && hasClass){
          return "<span class='k-dirty'></span>"
        }
        else{
          return "";
        }
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Create Custom Editor in Detail Template]({% slug howto_create_custom_editorin_detail_template_grid %})
* [How to Refresh Grid in Detail Template]({% slug howto_refresh_gridin_detail_template_grid %})
* [How to Use Dates inside Row Template]({% slug howto_use_dates_inside_row_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
