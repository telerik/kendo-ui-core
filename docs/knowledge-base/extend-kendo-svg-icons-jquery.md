---
title: Extending Kendo SVG Icons with Custom Ones
description: Learn how to extend the Kendo UI for jQuery SVG icons library by creating and adding custom SVG icons.
type: how-to
page_title: How to Add Custom SVG Icons to Kendo UI for jQuery
slug: extend-kendo-svg-icons-jquery
tags: kendo, ui, jquery, svg, icons, custom, extend
res_type: kb
ticketid: 1670081
---

## Description
Creating custom SVG icons and extending the existing Kendo UI for jQuery SVG icons library is a straightforward process. This KB article demonstrates how to add a custom SVG icon to the list of available icons in Kendo UI for jQuery library.

This KB article also answers the following questions:
- How can I add a custom icon to the Kendo UI for jQuery Icon library?
- What is the process for creating a custom SVG icon in Kendo UI for jQuery?
- Can I extend the Kendo UI SVG icons with custom designs?

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Solution
To create and use a custom SVG icon within the Kendo UI for jQuery, follow these steps:

1. Define the custom icon by specifying its `name`, `content`, and `viewBox`. The `content` should contain the SVG path data.

    ```javascript
    let myCustomIcon = {
        name: 'my-custom',
        content: '<path d="..."></path>', // Specify the SVG path data
        viewBox: '0 0 512 512' // Define the viewBox dimensions
    };
    ```

2. Extend the `kendo.ui.svgIcons` object with the newly created custom icon.

```javascript
    kendo.ui.svgIcons = $.extend({ myCustomIcon }, kendo.ui.svgIcons);
```

3. Reference the custom icon by its name (`my-custom` in this case).

    Here is an example of how to use the custom icon in a Kendo Button:

```dojo
    <button id="button" type="button">
      <span class="k-icon"></span> Inbox
    </button>

    <div id="toolbar"></div>

    <script>
      let myCustomIcon = {
        name: 'my-custom',
        content: '<path d="M448 32H64c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32M256 448c-106 0-192-86-192-192S150 64 256 64s192 86 192 192-86 192-192 192m28-164.8c-82.9 28.9-118.1 83.4-126.7 98.7 27.2 21.3 61.5 34.1 98.7 34.1 22.5 0 43.9-4.6 63.3-13-3.3-18.4-13.1-65.2-34.2-120.1-.4 0-.8.2-1.1.3m-95.5-172.3c-44.9 20.9-78.5 62.1-89 111.8 17.1-.1 78.6-1.7 147.6-20-24.3-43.2-50.3-80.1-58.6-91.8m79 146.8c2.1-.7 4.3-1.3 6.5-2-4.1-9.3-8.6-18.6-13.3-27.8-74.1 22.2-146.1 23.4-164.6 23.4 0 1.6-.1 3.1-.1 4.7 0 40.8 15.3 78 40.4 106.3 10.5-16.7 54.6-79.9 131.1-104.6m94.9-121.1C334.2 111.3 296.9 96 256 96c-12.4 0-24.5 1.4-36 4.1 8.7 11.9 34.9 48.8 58.8 92.7 50.7-19 76-46.7 83.6-56.2m-46.6 138.7C335 328 344 371.9 346.9 387.8c35.2-24.3 60.2-62.5 67.2-106.6-13.2-3.7-53.4-13.1-98.3-5.9m-24.4-58.1c3.8 7.8 7.5 15.8 10.9 23.8 1.2 2.8 2.4 5.7 3.5 8.5 48-6 95.7 1.8 110.2 4.5-.5-37.2-13.7-71.4-35.4-98.3-8.4 10-36.1 39.8-89.2 61.5"></path>',
        viewBox: '0 0 512 512'
      };
      kendo.ui.svgIcons = $.extend({ myCustomIcon }, kendo.ui.svgIcons)
      
      $("#button").kendoButton({
        icon: "my-custom"
      });

      $("#toolbar").kendoToolBar({
        items: [
          { type: "button", text: "foo", icon: "my-custom" },
          { type: "button", text: "bar", icon: "info-circle" }
        ]
      });
 </script>
```

## See Also
- [Kendo UI Icons Overview](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
- [Kendo UI Icons API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/ui/methods/icon)
