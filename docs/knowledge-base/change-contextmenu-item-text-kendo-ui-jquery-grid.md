---
title: Changing Text of ContextMenu Item in Kendo UI for jQuery Grid
description: Learn how to change the text of the built-in "reorderRow" ContextMenu item in Kendo UI for jQuery Grid while maintaining its submenu functionality.
type: how-to
page_title: Change ContextMenu Item Text in Kendo UI for jQuery Grid
meta_title: Change ContextMenu Item Text in Kendo UI for jQuery Grid
slug: change-contextmenu-item-text-kendo-ui-jquery-grid
tags: grid, kendo ui for jquery, contextmenu, reorderrow, text change
res_type: kb
ticketid: 1703712
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td >
Kendo UI for jQuery Grid
</td>
</tr>
<tr>
<td> Version </td>
<td>
2025.4.1111
</td>
</tr>
</tbody>
</table>

## Description

I want to change the text of the built-in "reorderRow" ContextMenu item in the [Kendo UI for jQuery Grid](https://www.telerik.com/kendo-jquery-ui/documentation/controls/grid/context-menu) to "Change order of employees". However, when I define a custom command with the desired text, the submenu functionality (up, down, top, bottom) stops working. The goal is to modify the text while retaining the submenu functionality.

This knowledge base article also answers the following questions:
- How to modify the text of the "reorderRow" ContextMenu item in Kendo UI Grid?
- How to keep submenu functionality when changing ContextMenu item text in Kendo UI Grid?
- How to customize the "reorderRow" ContextMenu item in Kendo UI Grid?

## Solution

To change the text of the built-in "reorderRow" ContextMenu item while keeping its submenu functionality, use DOM manipulation after the ContextMenu is rendered. Utilize the [`open`](/api/javascript/ui/contextmenu/events/open) event of the ContextMenu component to update the text dynamically.

### Steps

1. Get a reference to the Grid's ContextMenu.
2. Use the [`open`](/api/javascript/ui/contextmenu/events/open) event to locate the built-in "reorderRow" menu item.
3. Replace its text while preserving the submenu functionality.

### Code Example

```javascript
$("#grid")
  .data("kendoGrid")
  .tbodyContextMenu.element.data("kendoContextMenu")
  .bind("open", function (e) {
    // Reference the ContextMenu element
    var menu = e.sender.element;
    // Locate the "Reorder row" text and replace it
    menu.find("span:contains('Reorder row')").contents().filter(function() {
      return this.nodeType === 3; // Ensure it's a text node
    }).first().replaceWith("Change the order of employees");
  });
```

### Working Example

You can see a working example of this solution in the following Dojo:

```dojo
<div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        contextMenu: {
          body: [
            "reorderRow",
            { text: "Change the order of employye", command: "reorderRow" },
          ],
        },
        editable: true,
        sortable: true,
        draggable: true,
        reorderable: true,
        dataSource: new kendo.data.DataSource({
          schema: {
            model: {
              id: "foo",
              fields: {
                name: "name",
                foo: "foo",
              },
            },
          },
          data: [
            { foo: "bar", name: "tom" },
            { foo: "baz", name: "jerry" },
            { foo: "1bar", name: "tom" },
            { foo: "14baz", name: "jerry" },
            { foo: "2bar", name: "tom" },
            { foo: "3baz", name: "jerry" },
            { foo: "4bar", name: "tom" },
            { foo: "5baz", name: "jerry" },
          ],
        }),
      });

      kendo.ui.grid.commands["CustomCommand"] =
        kendo.ui.grid.GridCommand.extend({
          exec: function () {
            var that = this,
              grid = that.grid;

            grid.saveAsPDF();
          },
        });
      
      $("#grid")
        .data("kendoGrid")
        .tbodyContextMenu.element.data("kendoContextMenu")
        .bind("open", function (e) {
          var menu = e.sender.element;
           menu.find("span:contains('Reorder row')").contents().filter(function() {
               return this.nodeType === 3;
           }).first().replaceWith("Change the order of employees");
        });
    </script>
```

## See Also

- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Kendo UI ContextMenu API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu)
