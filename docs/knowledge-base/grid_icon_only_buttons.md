---
title: Use Grid Edit Buttons with Icons Only and No Text
description: Example showing how to remove the text of Grid edit buttons and leave just the icons
type: how-to
page_title: Use Kendo UI Grid Edit Buttons with Icons Only and No Text
slug: grid_icon_only_buttons
position: 0
tags: grid, editing, buttons, kendo ui, icons
teampulseid:
ticketid: 663290
pitsid:

res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress® Kendo UI® version</td>
  <td>2017.2.504</td>
 </tr>
</table>

## Description

Some developers may want to use Grid edit/delete/update/cancel/add buttons with icons only and no text, for example to save some space.

## Solution

The required approach is to set the commands' `text` to a space:

http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.command.text

    columns: [
      { command: [
        { name: "edit", text: { edit: " ", update: " ", cancel: " " } },
        { name: "destroy", text: " " }
      ] }
    ]

http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-toolbar.text

    toolbar: [{name: "create", text: " "}]

In addition, some default margins of the buttons' icons need to be reset to zero with CSS:

    .k-grid .k-grid-toolbar .k-grid-add,
    .k-grid tbody .k-grid-edit,
    .k-grid tbody .k-grid-update,
    .k-grid tbody .k-grid-cancel,
    .k-grid tbody .k-grid-delete {
      min-width: 0;
    }
     
    .k-grid .k-grid-toolbar .k-grid-add .k-icon,
    .k-grid tbody .k-grid-edit .k-icon,
    .k-grid tbody .k-grid-update .k-icon,
    .k-grid tbody .k-grid-cancel .k-icon,
    .k-grid tbody .k-grid-delete .k-icon {
      margin: 0;
    }

Here is a complete example:

http://dojo.telerik.com/ojoViD

```
<!DOCTYPE html>
<html>
  <head>
    <title>Kendo UI Grid Icon Buttons</title>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.2.504/styles/kendo.default.min.css" />

    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/jquery.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.2.504/js/kendo.all.min.js"></script>
    <style>
      
      .k-grid .k-grid-toolbar .k-grid-add,
      .k-grid tbody .k-grid-edit,
      .k-grid tbody .k-grid-update,
      .k-grid tbody .k-grid-cancel,
      .k-grid tbody .k-grid-delete {
        min-width: 0;
      }
      
      .k-grid .k-grid-toolbar .k-grid-add .k-icon,
      .k-grid tbody .k-grid-edit .k-icon,
      .k-grid tbody .k-grid-update .k-icon,
      .k-grid tbody .k-grid-cancel .k-icon,
      .k-grid tbody .k-grid-delete .k-icon {
        margin: 0;
      }
      
    </style>
  </head>
  <body>
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
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
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 10,
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
            height: 500,
            toolbar: [{name: "create", text: " "}],
            columns: [
              { field: "ProductName" },
              { command: [
                {name: "edit", text: { edit: " ", update: " ", cancel: " " }},
                { name: "destroy", text: " "}
              ], title: "&nbsp;", width: "250px" }
            ],
            editable: "inline"
          });
        });

      </script>
    </div>

  </body>
</html>
```

## Notes

The selectors in the CSS rules should override styles in the Kendo UI theme.
