---
title: Create Checkbox Filter Menu
page_title: Create Checkbox Filter Menu | Kendo UI Grid
description: "Learn how to create a checkbox filter menu functionality in the Kendo UI Grid widget."
slug: howto_create_checkbox_filter_menu_grid
---

# Create Checkbox Filter Menu

The example below demonstrates how to create a checkbox filter menu functionality in a Kendo UI Grid.

###### Example

```html
     <div id="grid"></div>

    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
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
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return { models: kendo.stringify(options.models) };
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
                    ProductName: { validation: { required: true} },
                    UnitPrice: { type: "number", validation: { required: true, min: 1} },
                    Discontinued: { type: "boolean" },
                    UnitsInStock: { type: "number", validation: { min: 0, required: true} }
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
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "200px"}],
          editable: "inline",
          filterable: true,
          filterMenuInit: onFilterMenuInit
        });
      });

      function onFilterMenuInit(e) {
        if (e.field == "ProductName") {
          initCheckboxFilter.call(this, e);
        }
      }

      function initCheckboxFilter(e) {
        var popup = e.container.data("kendoPopup");
        var dataSource = this.dataSource;
        var field = e.field;
        var checkboxesDataSource = new kendo.data.DataSource({
          data: uniqueForField(dataSource.data(), field)
        });


        var helpTextElement = e.container.children(":first").children(":first");
        helpTextElement.nextUntil(":has(.k-button)").remove();
        var element = $("<div class='checkbox-ontainer'></div>").insertAfter(helpTextElement).kendoListView({
          dataSource: checkboxesDataSource,
          template: "<div><input type='checkbox' value='#:" + field + "#'/>#:" + field + "#</div>"
        });
        e.container.find("[type='submit']").click(function (e) {
          e.preventDefault();
          e.stopPropagation();
          var filter = dataSource.filter() || { logic: "and", filters: [] };
          var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {            
            return {
              field: field,
              operator: "eq",
              value: input.value
            };
          });
          if (fieldFilters.length) {
            removeFiltersForField(filter, field);
            filter.filters.push({
              logic: "or",
              filters: fieldFilters
            });
            dataSource.filter(filter);
          }
          popup.close();
        });
      }

      function removeFiltersForField(expression, field) {
        if (expression.filters) {
          expression.filters = $.grep(expression.filters, function (filter) {
            removeFiltersForField(filter, field);
            if (filter.filters) {
              return filter.filters.length;
            } else {
              return filter.field != field;
            }
          });
        }
      }

      function uniqueForField(data, field) {
        var map = {};
        var result = [];
        var item;
        for (var i = 0; i < data.length; i++) {
          item = data[i];
          if (!map[item[field]]) {
            result.push(item.toJSON());
            map[item[field]] = true;
          }
        }
        return result;
      }
    </script>
    <style type="text/css">
      .checkbox-ontainer
      {
        max-height: 200px;
        overflow:auto;
      }
    </style>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
