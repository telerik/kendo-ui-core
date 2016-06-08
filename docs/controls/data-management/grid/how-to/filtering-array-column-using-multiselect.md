---
title: Filter Array Columns Using MultiSelect
page_title: Filter Array Columns Using MultiSelect | Kendo UI Grid
description: "Learn how to enable filtering on a Kendo UI Grid column which is bound to an array field by using the Kendo UI Multiselect widget."
slug: howto_filetr_array_columns_using_multiselect_grid
---

# Filter Array Columns Using MultiSelect

The example below demonstrates how to enable filtering on a Grid column which is bound to an array field by using the Kendo UI Multiselect widget.

###### Example

```html

    <h3>Filter array field using custom filter operator:</h3>
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              transport: {
                read: function(request) {
                  request.success([{
                    Country: "BG",
                    ContactTitle: "title 2",
                    id: 1,
                    Ids: [1, 2]
                  }, {
                    Country: "DE",
                    ContactTitle: "title 1",
                    id: 1,
                    Ids: [3, 4]
                  },{
                    Country: "UK",
                    ContactTitle: "title 3",
                    id: 1,
                    Ids: [2, 3]
                  }]);
                }
              },
              pageSize: 20
            },
            height: 550,
            groupable: true,
            sortable: true,
            filterable: true,
            //use the FilterMenuInit event of the Grid:
            filterMenuInit: onFilterMenuInit,
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{
              field: "ContactTitle",
              title: "Contact Title"
            }, {
              field: "Country",
              width: 150
            }, {
              field: "Ids",
               template: "#= Ids.join('</br>')#"
            }]
          });
        });

        function onFilterMenuInit(e) {
          if (e.field == "Ids") {
            initMultiSelectFilter.call(this, e);
          }
        }

        function initMultiSelectFilter(e) {
          var popup = e.container.data("kendoPopup");
          var dataSource = this.dataSource;
          var field = e.field;

          var helpTextElement = e.container.children(":first").children(":first");
          helpTextElement.nextUntil(":has(.k-button)").remove();

           var element = $("<select></select>").insertAfter(helpTextElement).kendoMultiSelect({
              dataSource: [{
                value: 1,
                text: "id 1"
              }, {
                value: 2,
                text: "id 2"
              }, {
                value: 3,
                text: "id 3"
              }, {
                value: 4,
                text: "id 4"
              }],
              dataTextField: "text",
              dataValueField: "value"
            });

          e.container.find("[type='submit']").click(function (e) {
            e.preventDefault();
            e.stopPropagation();


            var editorValue = element.getKendoMultiSelect().value();
                var operator = function(item, value) {
                  var found = true;
                  for (var i = 0; i < editorValue.length; i++) {
                    if (item.indexOf(editorValue[i]) < 0) {
                      found = false;
                    }
                  }
                  return found;
                };

                dataSource.filter({
                  operator: operator,
                  field: "Ids"
                });


            popup.close();
          })
        }
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
