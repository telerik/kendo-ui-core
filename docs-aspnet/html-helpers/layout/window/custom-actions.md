---
title: Custom Actions
page_title: Custom Actions
description: "Learn how to set custom user actions the Telerik UI Window HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_window_customactions_aspnetcore
position: 9
---

# Custom Actions

You can create custom actions for the Window via the [`Actions.Custom()`](/api/Kendo.Mvc.UI.Fluent/WindowActionsBuilder#customsystemstring) configuration option. 

The Window then renders `k-icon` and `k-i-actionname` CSS classes for the action but does not automatically attach a `click` event handler to it. While the Kendo UI stylesheets provide a `"custom"` icon for custom actions, you can use an icon name of your choice. To capture and handle the `click` events, follow the standard approach:

```
@(Html.Kendo().Window()
    .Name("window")
    .Title("Window")
    .Actions(actions => actions
        .Custom("custom")
        .Minimize()
        .Maximize()
        .Close()
    )
    .Content("Window Content")
)

<script>
    $(document).ready(function() {
        $("#window").data("kendoWindow").wrapper
            .find(".k-i-custom").parent().click(function (e) {
                alert("Custom action button clicked");
                e.preventDefault();
            });
    });
</script>

```

## See Also

* [Implementing Custom Actions in the Window (Demo)](https://demos.telerik.com/{{ site.platform }}/window/actions)
* [Server-Side API of the Telerik UI Window HtmlHelper for {{ site.framework }}](/api/window)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
