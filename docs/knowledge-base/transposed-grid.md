---
title: Transpose Kendo UI Grid
description: An example on how to transpose Kendo UI Grid
type: how-to
page_title: Transposed grid| Kendo UI Grid
slug: transposed-grid
tags: grid,transpose
ticketid: 
res_type: kb
---

## Description

How can I flip the axis so my rows become columns and vice versa? This can be easily achieved by modifying the shape of the data.

## Solution

```html       
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

            debugger

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
