---
title: How to Hide Expand Icon for the Detail Template in Grid Conditionally
description: Example for hiding the expand icon for the detail template in Kendo UI Grid based on a model value
type: how-to
page_title: How to hide the expand icon for the detail template in Kendo UI Grid based on a model value 
slug: grid-hide-expand-icon-based-on-field-value
tags: grid, expand, collapse, hierarchy, detailTemplate
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

How can I hide the expand/collapse icon for the detail template in Kendo UI Grid, based on a hasChildren value that I have in the model?

## Solution

You can traverse the rows of the Grid within the __dataBound__ event and hide the icon conditionally. The data item could be retrieved from the TR element by the __dataItem__ method of the Grid:

#### Example
```html
       <div id="example">
            <div id="grid"></div>

            <script type="text/x-kendo-template" id="template">
                some content
            </script>

            <script>
                $(document).ready(function() {
                    var element = $("#grid").kendoGrid({
                        dataSource: [
                          {FirstName: "name1", hasChildren: true},
                          {FirstName: "name1", hasChildren: false}
                        ],
                        height: 550,
                        sortable: true,
                        pageable: false,
                        detailTemplate: kendo.template($("#template").html()),
                        detailInit: detailInit,
                        dataBound: function(e) {
                            var items = e.sender.items();
                            items.each(function(){
                              var row = $(this);
                              var dataItem = e.sender.dataItem(row);
                              if(!dataItem.hasChildren){
                                row.find(".k-hierarchy-cell").html("");
                              }
                              
                            })
                        },
                        columns: [
                            {
                                field: "FirstName",
                                title: "First Name",
                                width: "120px"
                            }
                        ]
                    });
                });

                function detailInit(e) {
                    
                }
            </script>
           
        </div>

```
