---
title: Using CheckBox Template for Selecting Rows in Kendo UI Grid with Locked Columns
description: An example for configuring a template column to handle rows selection with frozen columns
type: how-to
page_title: Using Template Column with CheckBoxes for Selecting Rows with Locked Columns in Kendo UI Grid
slug: grid-select-all-with-frozen-columns
tags: kendoui, kendo, grid, locked columns, frozen columns, checkbox selection, checkboxes
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How to create a checkbox column for selecting rows in Grid and render a select-all in the header when I have locked/frozen columns? 

## Solution

When there are locked columns in the Grid, it will render two separate tables for the data, so this should be taken into account when we manually select all records within the click event of the checkbox in the header for selecting all records.

```html
   <div id="grid"></div>
    <button id="showSelection">Show selected IDs</button>
    <script>
      $(document).ready(function () {
        //DataSource definition
        var crudServiceBaseUrl = "http://demos.kendoui.com/service",
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
                    return {
                      models: kendo.stringify(options.models)
                    };
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
              headerTemplate: `<input type="checkbox" id="header-chb" class="k-checkbox">
<label class="k-checkbox-label" for="header-chb"></label>`,
              template: function(dataItem){
                return `<input type="checkbox" id="${dataItem.ProductID}" class="k-checkbox">
<label class="k-checkbox-label" for="${dataItem.ProductID}"></label>`
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

        //bind click event to the checkbox
        grid.element.on("click", ".k-checkbox" , selectRow);
        $('#header-chb').change(function(ev){
          var checked = ev.target.checked;
          $('.k-checkbox').each(function(idx, item){
            if(checked){
              if(!($(item).closest('tr').is('.k-state-selected'))){
                $(item).click();
              }
            } else {
              if($(item).closest('tr').is('.k-state-selected')){
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
            $("[data-uid='"+dataItem.uid+"']").addClass("k-state-selected");
          } else {
            //-remove selection
            $("[data-uid='"+dataItem.uid+"']").removeClass("k-state-selected");
          }
        }
      }

      //on dataBound event restore previous selected rows:
      function onDataBound(e) {
        var view = this.dataSource.view();
        for(var i = 0; i < view.length;i++){
          if(checkedIds[view[i].id]){
            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
              .addClass("k-state-selected")
              .find(".checkbox")
              .attr("checked","checked");
          }
        }
      }
    </script>
```
