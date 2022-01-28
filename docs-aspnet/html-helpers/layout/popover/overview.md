---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI PopOver HtmlHelper for {{ site.framework }} and learn how to initialize and configure it."
slug: htmlhelpers_overview_popover
position: 1
---

# PopOver HtmlHelper Overview

The Telerik UI PopOver HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI PopOver widget.

The PopOver is a transient view that appears when the user clicks on a specified element or hovers within a particular area. It can contain elements such as buttons, icons, lists, and so on. 

* [Demo page for the PopOver](https://demos.telerik.com/{{ site.platform }}/popover/index)

## PopOver vs. Tooltip

The PopOver and Tooltip components share some similar features - you can use both to display some additional content. The following list describes the differences between them.

The PopOver:

* Usually holds more content than the Tooltip (The PopOver has a header and body section).
* Allows you to add a variety of graphical elements.
* Supports action buttons.
* Provides additional context to the parent element.

The Tooltip:

* Usually holds less content than the PopOver.
* Is designed to display a small amount of text.
* Provides clarification to the parent element.

## Initializing the PopOver

The PopOver is usually displayed or dismissed as a result of a user action. It exposes various options for positioning.

The following example demonstrates how to define the PopOver by using the PopOver HtmlHelper.

```
   <span id="info" class="k-button wider">Hover me!</span>

    @(Html.Kendo().Popover()
        .For("#info")
        .Position(PopOverPosition.Right)
        .ShowOn(PopoverShowOn.MouseEnter)
        .Body("Main content")
    )
```

## Basic Configuration

The PopOver provides default configuration options such as its height and width, action buttons, header and body content, animations and events that will trigger its opening, and so on.

The following example demonstrates the basic configuration of the PopOver HtmlHelper.

```
   <span id="info" class="k-button wider">Click here</span>

    @(Html.Kendo().Popover()
        .For("#info")
        .Width(120)
        .Height(120)
        .Position(PopOverPosition.Top)
        .Header("More Information:")
        .Body("Information content")
        .Actions(a => a.Add().Text("Okay"))
        .ActionsLayout(PopoverActionLayout.Center)
        .Animation(animation =>
        {
            animation.Open(op => op.Zoom(ZoomDirection.In).Duration(5));
            animation.Close(cl => cl.Zoom(ZoomDirection.Out).Duration(5));
        })
        .ShowOn(PopoverShowOn.Click)
    )
```

## Functionality and Features

* [Templates]({% slug htmlhelpers_templates_popover %})

## Events

You can subscribe to all PopOver [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover#events). For a complete example on basic PopOver events, refer to the [demo on using the events of the PopOver](https://demos.telerik.com/{{ site.platform }}/popover/events).

The following example demonstrates how to subscribe to events by a handler name.

```
    <span id="container" class="k-button wider">Click here</span>

    @(Html.Kendo().Popover()
        .For("#container")
        .ShowOn(PopoverShowOn.Click)
        .Events(e => e
            .Show("onShow")
            .Hide("onHide")
        )
    )
    <script>
        function onShow(e) {
            // Handle the show event.
        }

        function onHide(e) {
            // Handle the hide event.
        }
    </script>
```

## Referencing Existing Instances

To reference an existing PopOver instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [PopOver client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover#methods) to control its behavior.

```
    // Place the following after your Telerik UI PopOver for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The For() configuration option of the PopOver is used to get its client-side instance.
            var popover = $("#container").data("kendoPopover");
        });
    </script>
```

## See Also

* [Basic Usage of the PopOver HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover)
* [Using the API of the PopOver HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/popover/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/popover)
* [Server-Side API](/api/popover)
