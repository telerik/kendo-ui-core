---
title: Refreshing Popover Body Dynamically in Kendo UI for jQuery
description: Learn how to dynamically refresh the body content of a Kendo UI for jQuery Popover after it has been shown.
type: how-to
page_title: How to Dynamically Update Popover Content in Kendo UI for jQuery
meta_title: How to Dynamically Update Popover Content in Kendo UI for jQuery
slug: dynamically-refresh-kendo-jquery-popover-body
tags: kendo-ui-for-jquery, popover, dynamic-content, refresh-body, setOptions, show-event
res_type: kb
ticketid: 1692487
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Popover
</td>
</tr>
<tr>
<td> Version </td>
<td>
2025.2.702
</td>
</tr>
</tbody>
</table>

## Description

I want to refresh the body content of a Kendo UI for jQuery [Popover](https://www.telerik.com/kendo-jquery-ui/documentation/controls/popover/overview) dynamically after it has been displayed. Setting the Popover options programmatically with [`setOptions`](/api/javascript/ui/widget/methods/setoptions) updates the initial configuration but does not reflect changes in the displayed content. The content remains static after the Popover has been shown. How can I ensure the body content updates dynamically?

This knowledge base article also answers the following questions:
- How to update Kendo UI for jQuery Popover content dynamically?
- Why does `setOptions` not refresh Popover content after showing?
- How to handle dynamic content in Kendo UI for jQuery Popover?

## Solution

To dynamically update the content of the Popover after it has been shown, use the [`show`](/api/javascript/ui/popover/events/show) event handler to modify the body content directly. The `show` event is triggered whenever the Popover becomes visible, allowing you to inject updated content.

Follow these steps:

1. Configure the Popover with the `show` event handler.
2. In the `show` event, use `e.sender.wrapper.find(".k-popover-body")` to target the body element inside the Popover.
3. Update the content using `.html()` with the new dynamic data.

Here’s an example:

```dojo

  <span id="target" class="k-group">Target</span>

<script id="body-template" type="text/x-kendo-template">
    <div>
        <p>The current time is: #: time #</p>
    </div>
</script>

<script>
    $(document).ready(function () {
        var bodyTemplate = kendo.template($("#body-template").html());
var counter = 1
        $("#target").kendoPopover({           
            position: "right",
            header: "Dynamic Template Example",
            show: function(e) {
            	let content = bodyTemplate({ time: new Date().toLocaleTimeString() })
            	e.sender.wrapper.find(".k-popover-body").html(content)
         	 },
            body: function () {
              	
                return bodyTemplate({ time: new Date().toLocaleTimeString() });
            }
        });
    });
</script>
```

### Explanation
- `show` event triggers each time the Popover is displayed.
- `e.sender.wrapper.find(".k-popover-body").html(newContent)` modifies the body content dynamically.

Use this approach to ensure the Popover content updates each time it is opened.

## See Also

- [Kendo UI for jQuery Popover Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/popover/overview)
- [Popover API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover)
