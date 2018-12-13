---
title: Auto-Resize Editor inside Grid Editor Template
description: An example on how to render an auto-resizing Kendo UI Editor in a Kendo UI Grid editor template.
type: how-to
page_title: Render Editor in Editor Template | Kendo UI Grid
slug: editor-autoresizing-in-grid-template
tags: grid, editor, template
ticketid: 1140080  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>Progress Kendo UI Editor</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I render an auto-resizing Kendo UI Editor in a Kendo UI Grid editor template?

## Solution

1. In the columns editor function of the Grid, initialize the Editor.
1. In the `edit` event handler, add a custom class to the Editor.
1. Add styles to the custom class so that the Editor has a 100% width and height.

```dojo
<div id="grid"></div>
<script>
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
                return { models: kendo.stringify(options.models) };
              }
            }
          },
          batch: true,
          pageSize: 20,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } }
              }
            }
          }
        });

    $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 430,
        edit: function (e) {
          $("#ProductName").data("kendoEditor").wrapper.width("").height("").addClass("expandEditor");
        },
        toolbar: ["create"],
        columns: [
          { field: "ProductName", title: "Product Name", editor: customEditor },
          { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }],
        editable: {
          mode: "popup",
          window: {
            resizable: true
          }
        }
    });

    function customEditor(container, options) {
        var element = $("<textarea/>");
        element.attr("name", options.field);
        element.attr("id", options.field);
        element.appendTo(container);
        element.kendoEditor({
        });
    }
</script>
<style>
    html {
      font: 12px sans-serif;
      overflow: auto;
    }

    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      min-height: 100%;
    }

    #ProductName {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
      padding: 0;
    }

    table.expandEditor {
      border-width: 0;
      width: 100%;
      height: 100%;
    }

    html body div.k-edit-form-container {
      width: auto;
      min-width: 400px;
      max-width: 1800px;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 40px;
      display: flex;
      flex-direction: row;
    }

    html body .k-popup-edit-form .k-edit-field > .k-textbox,
    html body .k-popup-edit-form .k-edit-field > .k-widget {
      width: 100%;
    }

    html body .k-edit-field {
      flex: 1 1 auto;
    }

    html body .k-edit-form-container .k-edit-buttons {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
</style>
```
