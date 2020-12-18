---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FloatingActionButton HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_floatingactionbutton_aspnetcore
position: 1
---

# FloatingActionButton HtmlHelper Overview

The Telerik UI FloatingActionButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FloatingActionButton widget.

The FloatingActionButton is a UI component that is tied to the most logical action that we expect from a user looking at a particular screen. For example, the most logical action for a user looking at the main screen of a mobile messaging app is to write a message. You can implement a FloatingActionButton that allows the user to compose a new message. 

The FloatingActionButton floats in the application above other items, and its main action directly corresponds to the content on the screen. Apart from being a single button with a single action, the FloatingActionButton can also be configured to display additional related actions or speed dial actions.

* [Demo page for the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/index)

## Initializing the FloatingActionButton

The following example demonstrates how to initialize the FloatingActionButton.

```Razor
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .ThemeColor(FloatingActionButtonThemeColor.Primary)
        .Align(FloatingActionButtonAlign.BottomEnd)
        .AlignOffset(ao=>ao.Horizontal(50).Vertical(50))
        .PositionMode(FloatingActionButtonPositionMode.Absolute)
        .Size(FloatingActionButtonSize.Medium)
        .Shape(FloatingActionButtonShape.Pill)
        .Icon("plus")
        .Items(items=>{
            items.Add().Icon("star").Label("Rate product").Click(onItemClick);
            items.Add().Icon("edit").Label("Leave comment").Click(onItemClick);
            items.Add().Icon("cart").Label("Add to cart").Click(onItemClick);
        })
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the FloatingActionButton is used to get its client-side instance.
            var fab = $("#fab").data("kendoFloatingActionButton");
            console.log(fab);
        });

        function onItemClick(e){
            // Handle the action item click event.
        }
    </script>
```

## Functionality and Features

* [Alignment]({% slug htmlhelpers_alignment_floatingactionbutton_aspnetcore %})
* [Appearance]({% slug htmlhelpers_appearance_floatingactionbutton_aspnetcore %})
* [Templates]({% slug htmlhelpers_templates_floatingactionbutton_aspnetcore %})
* [Accessibility]({% slug htmlhelpers_accessibility_floatingactionbutton_aspnetcore %})

## Events

You can subscribe to all FloatingActionButton events. For a complete example on  FloatingActionButton events, refer to the [demo on using the events of the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/events).

The following example demonstrates how to subscribe to the FloatingActionButton click event.

```Razor
@(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .Events(e => e
            .Click("fab_click")
        )
)
<script>
    function fab_click() {
        // Handle the click event.
    }
</script>
```

## See Also

* [Overview of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/index)
* [Using the API of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Server-Side API](/api/floatingactionbutton)
