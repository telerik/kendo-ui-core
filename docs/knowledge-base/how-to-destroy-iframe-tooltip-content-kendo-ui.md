---
title: Destroying Iframe Content in a Tooltip When Hidden
description: Learn how to remove or destroy the iframe content of a Kendo UI for jQuery Tooltip when it is hidden.
type: how-to
page_title: How to Destroy Iframe Content in Kendo UI Tooltip on Hide
slug: how-to-destroy-iframe-tooltip-content-kendo-ui
tags: kendo, ui, jquery, tooltip, destroy, iframe, content, hide
res_type: kb
ticketid: 1682358
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Tooltip</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I noticed that when a tooltip iframe is hidden, it still actually exists in the HTML code. The URL I open with the tooltip is active, and I would like to stop the activity of this page when the tooltip hides. Therefore, I need the iframe to be destroyed or its content to be removed when the tooltip is hidden. How can I achieve this?

This knowledge base article also answers the following questions:
- How do I stop an iframe from loading content when the tooltip is hidden?
- How can I remove the iframe content of a tooltip upon hiding?

## Solution

To remove or destroy the iframe content of a [Tooltip](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip) when it is hidden, handle the [`hide`](/api/javascript/ui/tooltip/events/hide) event of the Tooltip and modify the `src` attribute of the iframe to an empty string. Additionally, during the [`show`](/api/javascript/ui/tooltip/events/show) event, you can set the `src` attribute of the iframe to the desired URL.

Below is an example demonstrating how to implement this behavior:

```dojo
 <span id="target" title="Tooltip content"> Some content </span>

    <script>
      $(document).ready(function () {
        $("#target").kendoTooltip({
          iframe: true,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html",
          },
          hide: function(e){
            $('.k-content-frame').attr('src', '')
          },
          show: function(){
            $('.k-content-frame').attr('src', 'https://www.google.com/maps/embed')
            
          },
          width: 220,
          height: 280,
          requestStart: function (e) {
            e.options.url = "https://www.google.com/maps/embed";
          },
        });
      });
    </script>
```

In this solution, the `hide` event handler sets the `src` attribute of the iframe (selected by the `.k-content-frame` class) to an empty string, effectively removing its content. The `show` event handler resets the `src` attribute to the desired content URL each time the tooltip is shown.

## See Also

- [Tooltip Hide Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip/events/hide)
- [Tooltip Show Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip/events/show)
- [Tooltip API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
