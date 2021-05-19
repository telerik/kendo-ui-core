---
title: Use Grid Edit Buttons with Icons Only and No Text
description: An example on how to remove the text from the Edit buttons of a Kendo UI Grid and leave only the icons.
type: how-to
page_title: Use the Grid Edit Buttons only with Icons and without Text | Kendo UI Grid for jQuery
slug: grid-icon-only-buttons
tags: grid, editing, buttons, kendo ui, icons
ticketid: 663290
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
  <td>2017.2.504</td>
 </tr>
</table>

## Description

How can I use the **Edit**, **Delete**, **Update**, **Cancel**, and **Add** buttons only with icons and without displaying any text in them?

## Solution

1. Set [`command.text`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command.text) to a space.

    ```
        columns: [
          { command: [
            { name: "edit", text: { edit: " ", update: " ", cancel: " " } },
            { name: "destroy", text: " " }
          ] }
        ]
    ```

2. Set [`toolbar.text`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/toolbar.text) to a space.

    ```
        toolbar: [{name: "create", text: " "}]
    ```

3. In addition, reset some of the default margins of the buttons' icons to `0` (zero) by using CSS.

    > **Important**
    >
    > The selectors in the CSS rules override the styles of the Kendo UI theme.

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

The following example demonstrates the full implementation of the suggested approach.

```dojo
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
```
