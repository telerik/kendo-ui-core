---
title: Use a different editor based on the value of a column in a Kendo Grid
description: An example on how to use a different editor based on the value of a column in a Kendo Grid.
type: how-to
page_title: Use a different editor based on the value of a column in a Kendo Grid | Kendo UI Grid
slug: grid-different-editor-based-on-column-value
tags: grid, different, condition, editor, value, data, type, dynamic
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
  <td>Created with version 2018.1.221</td>
 </tr>
</table>

## Description

How can I use a different editor based on the value of a column in a Kendo Grid?

> **Important**
>
> Bare in mind that having a field which contains different data types as strings might be a sign for an incorrect database structure.

## Solution

Place a condition within the [editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editor) function and based on that condition return the corresponding editor.

```html
  <div id="example">
    <div id="grid"></div>

    <script>
      var data = [{
        "id": 1,
        "type": "dropdown",
        "editor":"Beverages"
      }, {
        "id": 2,
        "type": "dropdown",
        "editor":"Beverages"
      }, {
        "id": 3,
        "type": "date",
        "editor":"2015/01/11"
      }, {
        "id": 4,
        "type": "string",
        "editor":"some text"
      }, {
        "id": 5,
        "type": "numeric",
        "editor": 5 
      }];

      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          pageSize: 10,
          data: data,
          schema: {
            model: {
              id: "id",
              fields: {
                id: { type: "number" , editable: false },
                type: { type: "string" , editable: false }
              }
            }
          }
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,                          
          columns: [
            { field: "id" , title: "ID" },
            { field:"type" , title: "Type" },
            { field: "editor",
              title: "Editor",
              template: "#= customTemplate(data.type,data.editor) #",
              editor: chooseEditor
            }],
          editable: true
        });
      });

      function customTemplate(type,value) {
        if (value == null)
          return "";

        switch (type) {
          case "date":
            return kendo.toString(kendo.parseDate(value), 'yyyy/MM/dd');
          default:
            return value;
        }
      }

      function chooseEditor(container, options) {
        switch (options.model.type) {
          case "dropdown":
            dropdownEditor(container, options);
            break;
          case "text":
            textEditor(container, options);
            break;
          case "numeric":
            numericEditor(container, options);
            break;
          case "date":
            dateEditor(container, options);
            break;
          default:
            textEditor(container, options);
            break;
        }
      }
      
      function dateEditor(container, options) {
        $('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
          format:'yyyy/MM/dd',
          change: function (e) {
            if (e.sender.value() == null) {
              options.model.set("result", null);
            } else {
              options.model.set("result", 1);
            }
          }
        })
      }

      function dropdownEditor(container, options) {
        switch (options.model.question_attr) {
          case 1:          
            $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
              valuePrimitive: true, //N.B. this is needed to have correct behavior when the initial value can be null
              autoBind: false,
              dataTextField: "CategoryName",
              dataValueField: "CategoryName",
              dataSource: {
                type: "odata",
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                }
              },
              change: function (e) {
                if (e.sender.dataItem() == null) {
                  options.model.set("result", null);
                } else {
                  options.model.set("result", e.sender.dataItem().CategoryID);
                }
              }
            });
            break;
          default:
            $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
              valuePrimitive: true, //N.B. this is needed to have correct behavior when the initial value can be null
              autoBind: false,
              dataTextField: "ProductName",
              dataValueField: "ProductName",
              dataSource: {
                type: "odata",
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
              },
              change: function (e) {
                if (e.sender.dataItem() == null) {
                  options.model.set("result", null);
                } else {
                  options.model.set("result", e.sender.dataItem().ProductID);
                }
              }
            });
            break;
        }
      }

      function textEditor(container, options) {
        $('<input type="text" name="' + options.field + '"/>')
        .addClass('k-input k-textbox')
        .appendTo(container)
        .blur(function(e) {
          if (e.originalEvent.target.value) {
            options.model.set("result", 1);
          } else {
            options.model.set("result", null);
          }
        })
      }
      
      function numericEditor(container, options) {
        $('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
          change: function (e) {
            if (e.sender.value() == null) {
              options.model.set("result", null);
            } else {
              options.model.set("result", e.sender.value());
            }
          }
        })
      }

    </script>
  </div>
```
