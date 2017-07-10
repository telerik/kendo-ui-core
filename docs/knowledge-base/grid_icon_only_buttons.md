---
title: Use Grid Edit Buttons with Icons Only and No Text
description: How to remove the text of the Grid Edit buttons and leave only the icons in a Kendo UI Grid.
type: how-to
page_title: Use Grid Edit Buttons with Icons Only and No Text
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

You might want to use the **Edit**, **Delete**, **Update**, **Cancel**, or **Add** buttons of the Grid with icons only and without text. For example, in the cases when you need to save space.

## Possible Solution

To remove the text from the user-interaction buttons of the Grid and make them display only icons:

1. Set the `text` of the `command` to a space:

    http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.command.text

    ```
        columns: [
          { command: [
            { name: "edit", text: { edit: " ", update: " ", cancel: " " } },
            { name: "destroy", text: " " }
          ] }
        ]
    ```

    http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-toolbar.text

    ```
        toolbar: [{name: "create", text: " "}]
    ```

1. In addition, reset some of the default margins of the buttons' icons to `0` (zero) by using CSS.

    ```
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
    ```

For the complete example, refer to http://dojo.telerik.com/ojoViD.

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

The selectors in the CSS rules override the styles of the Kendo UI theme.
