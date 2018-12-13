---
title: Conditionally Hide Expand Icons for the Detail Template in Grid
description: An example on how to hide the expand icon for the detail template in a Kendo UI Grid based on a model value.
type: how-to
page_title: Hide the Expand Icon for the Detail Template Based on a Model Value | Kendo UI Grid
slug: grid-hide-expand-icon-based-on-field-value
tags: grid, expand, collapse, hierarchy, detailTemplate
res_type: kb
component: grid
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

How can I hide the expand/collapse icon for the detail template in a Kendo UI Grid based on the `hasChildren` value which I have in the model?

## Solution

1. Traverse the rows of the Grid within the `dataBound` event.
1. Conditionally hide the icon.
1. To retrieve the data item, access the `<tr>` element by the `dataItem` method of the Grid.

```dojo
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
