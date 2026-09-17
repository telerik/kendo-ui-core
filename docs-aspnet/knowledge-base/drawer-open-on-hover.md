---
title: Open the Drawer on Hover
page_title: Open the Drawer on Hover
description: "Learn how to open the Telerik UI Drawer on hover with custom client-side events in an ASP.NET Core app."
components: ["drawer"]
slug: drawer-open-on-hover
tags: drawer, hover, mouseenter, mouseleave, custom, core, mvc
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
</table>

## Description

The Drawer does not provide a built-in hover option. This article demonstrates a custom approach that opens and closes the Drawer when the pointer enters or leaves the Drawer element.

## Solution

Retrieve the initialized Drawer instance and call its `show()` and `hide()` methods from `mouseenter` and `mouseleave` handlers:

```JS script
<script>
    $(function () {
        var drawer = $("#drawer").data("kendoDrawer");

        $("#drawer")
            .on("mouseenter", function () {
                drawer.show();
            })
            .on("mouseleave", function () {
                drawer.hide();
            });
    });
</script>
```

The `#drawer` element is the hover boundary and also contains the associated content. In `overlay` mode, the overlay is outside the Drawer element and can interrupt the hover behavior. Provide a click, focus, or keyboard-accessible alternative when using hover to open the Drawer.

## See Also

* [Drawer Interaction Modes]({% slug interactionmodes_drawer_aspnetcore %})
* [Drawer Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer)