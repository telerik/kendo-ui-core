---
title: Transpose Grid Data
description: An example on how to transpose the data of a Kendo UI Grid.
type: how-to
page_title: Transpose Data | Kendo UI Grid
slug: transposed-grid
tags: vertical, grid, transpose, data, transposed, columns, rows, change, orientation, switch
res_type: kb
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
</table>

## Description

How can I flip the axis of the Kendo UI Grid, so that its rows become columns and vice versa?

## Solution

Modify the shape of the data.

```dojo
    <style>
        tbody td:first-child{
        background-color:#d5d5d5;
        }
    </style>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

    <div id="example">
        <div id="grid"></div>
        <script>

        var rawData,
            data = [],
            model = {},
            length,
            dataLength,
            propertiesLength;

        $(document).ready(function() {
            rawData = createRandomData(5);

            dataLength = rawData.length;
            propertiesLength = Object.keys(rawData[0]).length;

            for(var i=0; i <propertiesLength; i+=1){
            data[i] = {};
            for(var j =0; j < dataLength; j+=1 ){
                var currentItem = rawData[j]
                var property = Object.keys(currentItem)[i];
                if(j === 0){
                data[i]["Property"] = property;
                }
                data[i][currentItem.FirstName] = currentItem[property]
            }
            }

            $("#grid").kendoGrid({
            dataSource: {
                data: data,
                pageSize: 20,
            },
            scrollable:true
            });
        });
        </script>
    </div>
```
