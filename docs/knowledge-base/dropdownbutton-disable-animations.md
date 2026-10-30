---
title: Disabling Animations for DropDownButton in UI for ASP.NET MVC
description: Learn how to disable animations for the DropDownButton component in UI for ASP.NET MVC. Follow the steps to disable animations either for a specific instance or sitewide.
type: how-to
page_title: Disable Animations for DropDownButton
meta_title: Disable Animations for DropDownButton
slug: dropdownbutton-disable-animations
tags: dropDownButton, asp.net mvc, animations, disable
res_type: kb
ticketid: 1720137
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> DropDownButton for UI for ASP.NET MVC </td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I want to disable animations for the [DropDownButton](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/dropdownbutton/overview) component in UI for ASP.NET MVC. Unlike other components like DropDownList and TreeView, DropDownButton does not have a built-in `.Animation()` method or option to disable animations directly. I need a way to disable animations either for individual instances or sitewide.

This knowledge base article also answers the following questions:
- How do I disable animations in the DropDownButton component?
- Is there a way to turn off animations for DropDownButton sitewide?
- Can I configure popup animations in DropDownButton for ASP.NET MVC?

## Solution

To disable animations for the DropDownButton, use the `setOptions()` method of the client-side object to modify the popup's animation settings. Follow these steps:

### Disable Animations for a Specific DropDownButton

Use the following code snippet to disable the animations for a specific instance:

```JavaScript
$(document).ready(function() {
    let ddb = $("#button").kendoDropDownButton({
        icon: "clipboard",
        items: [
            { id: "keep-text", text: "Keep Text Only", icon: "clipboard-text" },
            { id: "paste-default", text: "Set Default Paste" }
        ]
    }).data("kendoDropDownButton");

    // Disable popup animations
    ddb.setOptions({
        popup: {
            animation: false
        }
    });
});
```

## See Also

- [DropDownButton Overview](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/dropdownbutton/overview)
- [DropDownButton API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent.DropDownButtonBuilder)
