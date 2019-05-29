---
title: Use Custom Filter for ForeignKey Column in Grid
description: An example on how to customize the filter of a foreign key column in a Kendo UI Grid.
type: how-to
page_title: Configure Custom Filter for ForeignKey Column | Kendo UI Grid for jQuery
slug: grid-custom-filter-with-foreignkey-column
tags: kendoui, kendo, grid, filtering, foreign key, custom filtering
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

How can I use a custom filter over a foreign key column in the Grid?

## Solution

By default, the Grid internally matches the `values` collection in the column with the corresponding value field from the `dataItem` and creates a collection with the unique values for the filtering of the `foreignKey` column.

Apply custom filtering and manually handle the matching and the creation of the unique values collection.

```dojo
       <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
        <div id="example">
            <div id="grid"></div>

            <script>
                var categories = [{
                    "value": 1,
                    "text": "Beverages"
                },{
                    "value": 2,
                    "text": "Condiments"
                },{
                    "value": 3,
                    "text": "Confections"
                },{
                    "value": 4,
                    "text": "Dairy Products"
                },{
                    "value": 5,
                    "text": "Grains/Cereals"
                },{
                    "value": 6,
                    "text": "Meat/Poultry"
                },{
                    "value": 7,
                    "text": "Produce"
                },{
                    "value": 8,
                    "text": "Seafood"
                }];

var filterDataSource = new kendo.data.DataSource({});

	function onFilterMenuInit(e) {
        var grid = e.sender;
        e.container.data("kendoPopup").bind("open", function () {
            filterDataSource.sort({ field: e.field, dir: "asc" });
            var uniqueDsResult = removeDuplicates(grid.dataSource.view(), e.field);
            filterDataSource.data(uniqueDsResult);
          if(e.field == "CategoryID"){
            var popup = e.container.data("kendoPopup").element;
            var checkboxes = popup.find("input[type='checkbox']");

            checkboxes.each(function(){
              var checkbox = $(this);              
              if(!checkbox.hasClass("k-check-all")){
                var categoryID = checkbox.val();
                categories.forEach(function(el){
                  if(el.value == categoryID){
                 		checkbox.parent().contents().last()[0].textContent = el.text;   
                  }
                })                 
             }
            })
          }
        })

        function removeDuplicates(items, field) {
            var getter = function (item) { return item[field] },
                result = [],
                index = 0,
                seen = {};

            while (index < items.length) {
                var item = items[index++],
                    text = getter(item);

                if (text !== undefined && text !== null && !seen.hasOwnProperty(text)) {
                    result.push(item);
                    seen[text] = true;
                }
            }
            return result;
        }
    }

		function onChange(e) {
        filterDataSource.data(e.items);
    }

                $(document).ready(function () {
                    var dataSource = new kendo.data.DataSource({
                        pageSize: 20,
                        data: products,
                        autoSync: true,
                      change: onChange,
                        schema: {
                            model: {
                                id: "ProductID",
                                fields: {
                                    ProductID: { editable: false, nullable: true },
                                    ProductName: { validation: { required: true} },
                                    CategoryID: { field: "CategoryID", type: "number", defaultValue: 1 },
                                    UnitPrice: { type: "number", validation: { required: true, min: 1} }
                                }
                            }
                        }
                    });


                    $("#grid").kendoGrid({
                        dataSource: dataSource,
                        filterable: true,
                      filterMenuInit: onFilterMenuInit,
                        groupable: true,
                        pageable: true,
                        height: 540,
                        toolbar: ["create"],
                        columns: [
                            { field: "ProductName", title: "Product Name", filterable: { multi: true, dataSource: filterDataSource } },
                            { field: "CategoryID", width: "200px", values: categories, title: "Category", filterable: { multi: true, dataSource: filterDataSource } },
                            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px", filterable: { multi: true, dataSource: filterDataSource } },
                            { command: "destroy", title: " ", width: "150px", filterable: { multi: true, dataSource: filterDataSource }}],
                        editable: true
                    });



                });


            </script>
        </div>
```
