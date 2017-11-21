---
title: Use dynamic editor
description: Example on how to use dynamic editor
type: how-to
page_title: Use dynamic editor | Kendo UI Grid
slug: grid-use-dynamic-editor
tags: grid, editor, dynamic, different, single, input, textbox
res_type: kb
component: grid
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

I have a column which editor depends on the value of the record.

## Solution

Place a condition within the [columns.editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.editor) function and based on that condition add the  corresponding editor template.
    

```html

    <div id="grid"></div>


    <script>
      $(document).ready(function () { 
        var dataSource1 = new kendo.data.DataSource({
          data: [{id:1,value:"value1"},{id:2,value:"value2"},{id:3,value:"value3"}],
          schema: {
            model: {
              fields: {
                id: { type: "number", editable:false },
                value: { type: "string" }
              }}
          },
          pageSize: 20
        });  
        var grid = $("#grid").kendoGrid({
          dataSource: dataSource1,
          pageable: true,
          height: 500,
          columns: [ 
            { field: "id", title: "ID", width: "200px"},
            { field: "value", title: "Value", width: "200px", editor: dynamicEditor}],
          editable: "incell"
        }).data("kendoGrid");

        function dynamicEditor(container, options) {

          if(options.model.id == 1){
            var input = $('<input required data-bind="value:value"/>')
            input.appendTo(container);
            input.kendoDropDownList({
              autoBind: false,
              dataSource: {
                data:["value3","value4","value5"]
              }
            });
          }
          else if(options.model.id == 2){
            var input = $('<input type="text" class="k-input k-textbox" name="value" data-bind="value:value">'); 
            input.appendTo(container); 
          }else{
            var input = $('<input type="checkbox" name="value" data-bind="value:value">'); 
            input.appendTo(container); 
          }
        };


      });

    </script>
```