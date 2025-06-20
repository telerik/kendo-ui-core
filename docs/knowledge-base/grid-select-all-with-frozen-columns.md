---
title: Use CheckBox Template for Selecting Rows in Grid with Locked Columns
description: Learn how to configure a template column to handle row selection with frozen columns in the Kendo UI Grid.
type: how-to
page_title: Use Template Column with CheckBoxes for Selecting Rows with Locked Columns - Kendo UI for jQuery Data Grid
slug: grid-select-all-with-frozen-columns
tags: kendoui, kendo, grid, locked columns, frozen columns, checkbox selection, checkboxes
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>

## Description

How can I create a checkbox column for selecting rows in the Grid and render a **Select All** option in the header when the Grid has locked (frozen) columns enabled?

## Solution

Manually select all records within the `click` event of the checkbox for selecting all records in the header. Note that a Grid with locked (frozen) columns renders two separate tables for its data. As an alternative, you can check the [Checkbox Selection Demo of the Grid](https://demos.telerik.com/kendo-ui/grid/checkbox-selection).

```dojo
   <div id="grid"></div>
    <button id="showSelection">Show selected IDs</button>
    <script>
      $(document).ready(function () {
        //DataSource definition
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
            transport: {
                read:  {
                    url: crudServiceBaseUrl + "/Products"
                },
                update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    type: "POST",
            		    contentType: "application/json"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    type: "POST",
            		    contentType: "application/json"
                },
                create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    type: "POST",
            		    contentType: "application/json"
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              batch: true,
              pageSize: 20,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: {
                      editable: false,
                      nullable: true
                    },
                    ProductName: {
                      validation: {
                        required: true
                      }
                    },
                    UnitPrice: {
                      type: "number",
                      validation: {
                        required: true,
                        min: 1
                      }
                    },
                    Discontinued: {
                      type: "boolean"
                    },
                    UnitsInStock: {
                      type: "number",
                      validation: {
                        min: 0,
                        required: true
                      }
                    }
                  }
                }
              }
            });

        //Grid definition
        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 430,
          //define dataBound event handler
          dataBound: onDataBound,
          toolbar: ["create"],
          columns: [
            //define template column with checkbox and attach click event handler
            {
              title: 'Select All',
              headerTemplate: '<input type="checkbox" id="header-chb" class="k-checkbox">',
              template: function(dataItem){
                return '<input type="checkbox" id="${dataItem.ProductID}" class="k-checkbox">'
              },
              width: 80,
              locked: true
            },
            {
              field:"ProductName",
              width: 200
            },
            {
              field: "UnitPrice",
              title: "Unit Price",
              format: "{0:c}",
              width: "100px",
              locked: true
            }, {
              field: "UnitsInStock",
              title: "Units In Stock",
              width: "100px"
            }, {
              field: "Discontinued",
              width: "100px"
            }, {
              command: ["edit", "destroy"],
              title: "&nbsp;",
              width: "172px"
            }
          ],
          editable: "inline"
        }).data("kendoGrid");

        //bind the click event to the checkbox
        grid.element.on("click", ".k-checkbox" , selectRow);
        $('#header-chb').change(function(ev){
          var checked = ev.target.checked;
          $('.k-checkbox:not("#header-chb")').each(function(idx, item){
            if(checked){
              if(!($(item).closest('tr').is('.k-selected'))){
                $(item).click();
              }
            } else {
              if($(item).closest('tr').is('.k-selected')){
                $(item).click();
              }
            }
          });

        });

        $("#showSelection").bind("click", function () {
          var checked = [];
          for(var i in checkedIds){
            if(checkedIds[i]){
              checked.push(i);
            }
          }

          alert(checked);
        });
      });

      var checkedIds = {};

      //on click of the checkbox:
      function selectRow() {
        if(this.id != "header-chb"){
          var checked = this.checked,
              row = $(this).closest("tr"),
              grid = $("#grid").data("kendoGrid"),
              dataItem = grid.dataItem(row);

          checkedIds[dataItem.id] = checked;
          if (checked) {
            $("[data-uid='"+dataItem.uid+"']").addClass("k-selected");
          } else {
            //-remove selection
            $("[data-uid='"+dataItem.uid+"']").removeClass("k-selected");
          }
        }
      }

      //on dataBound event restore previous selected rows:
      function onDataBound(e) {
        $('.k-checkbox').kendoCheckBox();
        var view = this.dataSource.view();
        for(var i = 0; i < view.length;i++){
          if(checkedIds[view[i].id]){
            $("tr[data-uid='" + view[i].uid + "']")
              .addClass("k-selected")
              .find(".k-checkbox")
              .attr("checked","checked");
          }
        }

        // If all rows on the current page are selected, check the master checkbox.
        if($("tr.k-selected").length === view.length * 2) {
          $('#header-chb')[0].checked = true;
        } else {
          // If not all rows are selected, the master checkbox should not be checked.
          $('#header-chb')[0].checked = false;
        }
      }
    </script>
```
