---
title: Preventing Drag on Specific Elements within Kendo UI for jQuery TileLayout
description: Learn how to prevent drag actions on specific elements, such as buttons or icons, in the header of a Kendo UI for jQuery TileLayout component.
type: how-to
page_title: How to Disable Dragging for Specific Elements in TileLayout for Kendo UI for jQuery
slug: prevent-drag-and-drop-tilelayout-kendo-ui-jquery
tags: kendo-ui-for-jquery, tilelayout, drag-and-drop, jquery, ui, draggable, ignore
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery TileLayout</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I need to place a button in the header of a Tile in the Kendo UI for jQuery TileLayout. However, the drag functionality is triggered when clicking on the button. I wish to disable the drag action specifically for this button to perform other actions, like opening a KendoWindow. This knowledge base article also answers the following questions:
- How to exclude elements from triggering drag in Kendo UI for jQuery TileLayout?
- How to add interactive elements to the TileLayout's header without affecting drag functionality?

## Solution

To prevent drag actions on specific elements within the TileLayout, such as icons or buttons in the header, configure the `ignore` option of the Draggable instance of the TileLayout. This configuration allows specifying elements that should not trigger the drag action when clicked.

First, include the desired icon or button in the header of the Tile using the `container.header.template` option. Then, utilize the Draggable's `ignore` option to exclude this element from initiating drag and drop actions.

Here is an example configuration:

```dojo
<script id="first" type="text/x-kendo-template">
<h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
    <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
      $("#tilelayout").kendoTileLayout({
        reorderable:true,
        containers: [
          {
            colSpan: 1,
            rowSpan: 1,
            header: {
              template: () => '<button id="gear"></button><button id="delete"></button>'
            },
            bodyTemplate: kendo.template($("#first").html())
          },
          {
            colSpan: 1,
            rowSpan: 1,
            header: {
              template: "<span>Item two</span>"
            },
            bodyTemplate: kendo.template($("#second").html())
          }
        ],
        columns: 4
      });
      
      $("#delete").kendoButton({
		icon: "x"      
      })
      $("#gear").kendoButton({
	        icon: "gear"      
      })
      
       $("#tilelayout").getKendoTileLayout()._draggableInstance.options.ignore = "button, span, svg";
    </script>
```

This configuration ensures that clicks on the specified elements (in this case, any `button`, `span`, or `svg` elements) do not trigger the TileLayout's drag and drop functionality. As a result, you can attach other event listeners to these elements for different interactions, such as opening a modal window or executing custom logic.

## See Also

- [Kendo UI for jQuery TileLayout Documentation](https://docs.telerik.com/kendo-ui/controls/tilelayout/overview)
- [Kendo UI Draggable Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable)
- [Configuring Container Header in Kendo UI TileLayout](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout/configuration/containers.header.template)
