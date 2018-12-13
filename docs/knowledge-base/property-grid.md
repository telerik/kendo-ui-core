---
title: Convert Kendo UI Grid to Property Grid
description: An example on how to convert the Kendo UI Grid to a property grid.
type: how-to
page_title: Transform Kendo UI Grid into Property Grid | Kendo UI Grid
slug: property-grid
tags: grid, property, mobile, vertical, change, orientation
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
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>11</td>
 </tr>
</table>

## Description

How can I convert a Kendo UI Grid to a property grid for users with narrow screens to apply?

## Solution

Modify the shape of the data.

```dojo
        <style>
            tbody td:first-child{
            background-color:#d5d5d5;
            }

            .separator{
            height:10px;
            }

        </style>
       <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

        <div id="example">
            <div id="grid"></div>

            <script id="rowTemplate" type="text/x-kendo-tmpl">

                <table id="grid_#=id#" style="width:100%">
                <tr class="innerHeader">
                <th colspan="2" class="separator"></th>
                </tr>
                    # for (var i = 0; i < records.length; i++) { #
                        <tr>
                        <td> #:records[i].Property#</td>
                        <td>#:records[i].Value#</td>
                    </tr>
                            # } #

            </table>
            </script>

            <script>

            var rawData,
                data = [],
                model = {},
                length;

            $(document).ready(function() {

                rawData = createRandomData(50); //fetch data

                var dataLength = rawData.length;
                var propertiesLength = Object.keys(rawData[0]).length;

                for(var i = 0; i < dataLength; i+=1){
                data[i] = {id:i,records: []};
                for(var j =0; j<propertiesLength;j+=1){
                    data[i].records[j] = {}
                    var currentItem = rawData[i];
                    var property = Object.keys(currentItem)[j];
                    data[i].records[j]["Property"] = property;
                    data[i].records[j]["Value"] = currentItem[property]
                }
                }

                $("#grid").kendoGrid({
                dataSource: {
                    data: data,
                    pageSize: 5,
                },            
                scrollable:true,
                rowTemplate: kendo.template($("#rowTemplate").html()),
                pageable:true,
                height:700,
                columns:[{field:"id", title:"Property"}, {field:"records", title:"Value"}]
                });

            });
            </script>
        </div>
```
