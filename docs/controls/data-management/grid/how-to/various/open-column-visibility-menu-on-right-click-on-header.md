---
title: Open column visibility menu on right on column header
page_title: Open column visibility menu on right on column header | Kendo UI Grid Widget
description: "Learn how to customize the Kendo Grid by adding custom menu that opens on right click of the column header"
previous_url: /controls/data-management/grid/how-to/update-aggregates-on-change
slug: open-column-visibility-menu-on-right-click-on-header
---

# Update Aggregates on Change

The following example demonstrates how to add a popup menu for toggling columns visibility that opens on right click of the column header.

###### Example

```html

     <div id="example">
      <div id="grid"></div>

      <script>


        function toggleMenu(e){
          e.preventDefault(); 

          var popup =	$('#checkboxes').data('kendoPopup');
          popup.open();

          $('.k-animation-container').css("top", e.clientY).css('left',e.clientX )

        }

        function addColumnsToPopup(grid){

          var container = $('#checkboxes');

          if (container.is(':empty')) {

            grid.columns.map(function(x,y){
              return {title: x.title? x.title:x.field, field: x.field}
            }).forEach(function(x,y) {

              var div = $('<div/>');	
              var label = $('<label/>')
              var checkbox = $('<input type="checkbox" checked>')

              label.text(x.title);
              label.prepend(checkbox);
              checkbox.attr('data-index', y)
              div.append(label)

              checkbox.on('change', function(e){

                var grid =   $("#grid").data('kendoGrid');

                if(e.target.checked) {
                  grid.showColumn(+$(e.target).attr('data-index'))
                } else {
                  grid.hideColumn(+$(e.target).attr('data-index'))
                }

              }) 
              container.append(div);
            });          
          }
        }

        function createPopup(){
          var popup =	$('#checkboxes').data('kendoPopup');

          if (typeof popup === "undefined") {       
            $('#checkboxes').kendoPopup({
              animation: {
                close: {
                  effects: "fadeOut zoom:out",
                  duration: 300
                },
                open: {
                  effects: "fadeIn zoom:in",
                  duration: 300
                }
              }
            })
          }
        }



        $(document).ready(function() {

          $('body').on('click',function(e){
            if($('#checkboxes').has(e.target).length <= 0){

              $('#checkboxes').data('kendoPopup').close()
            }
          })

          $("#grid").kendoGrid({
            dataBound: function(e) {
              e.sender.element.find('th').on('contextmenu',toggleMenu)
              addColumnsToPopup(this);
              createPopup()

            },
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipAddress: { type: "string" }                                        
                  }
                }
              },
              pageSize: 30,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            sortable: true,
            filterable: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              width: 120
            }, {
              field: "ShipCountry",
              title: "Ship Country"
            }, {
              field: "ShipName",
              title: "Ship Name"
            },  {
              field: "ShipAddress",
              filterable: false
            }
                     ]
          });
        });
      </script>

      <div id="checkboxes"></div>

    </div>

    <style>
      #checkboxes div{
        padding:5px 10px;
      }

      #checkboxes label:hover {
        cursor:pointer;
      }

    </style>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
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

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
