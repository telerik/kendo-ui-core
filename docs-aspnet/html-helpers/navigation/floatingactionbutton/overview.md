---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FloatingActionButton component for {{ site.framework }}."
slug: htmlhelpers_floatingactionbutton_aspnetcore
position: 1
---

# FloatingActionButton Overview

{% if site.core %}
The Telerik UI FloatingActionButton TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI FloatingActionButton widget.
{% else %}
The Telerik UI FloatingActionButton HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FloatingActionButton widget.
{% endif %}

The FloatingActionButton is a UI component that is tied to the most logical action that we expect from a user looking at a particular screen. For example, the most logical action for a user looking at the main screen of a mobile messaging app is to write a message. You can implement a FloatingActionButton that allows the user to compose a new message. 

The FloatingActionButton floats in the application above other items, and its main action directly corresponds to the content on the screen. Apart from being a single button with a single action, the FloatingActionButton can also be configured to display additional related actions or speed dial actions.

* [Demo page for the FloatingActionButton HtmlHelper](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/index)
{% if site.core %}
* [Demo page for the FloatingActionButton TagHelper](https://demos.telerik.com/aspnet-core/floatingactionbutton/tag-helper)
{% endif %}

## Initializing the FloatingActionButton

The following example demonstrates how to initialize the FloatingActionButton.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-floatingactionbutton name="fab"
                                align="FloatingActionButtonAlign.BottomCenter"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Absolute"
                                icon="share"
                                shape="FloatingActionButtonShape.Pill"
                                size="FloatingActionButtonSize.Medium"
                                theme-color="FloatingActionButtonThemeColor.Info"
                                >
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Download" icon="download" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Print" icon="print" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Email" icon="email" click="onItemClick"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>
```
{% endif %}

## Functionality and Features

* [Alignment]({% slug htmlhelpers_alignment_floatingactionbutton_aspnetcore %})
* [Appearance]({% slug htmlhelpers_appearance_floatingactionbutton_aspnetcore %})
* [Templates]({% slug htmlhelpers_templates_floatingactionbutton_aspnetcore %})
* [Accessibility]({% slug htmlhelpers_accessibility_floatingactionbutton_aspnetcore %})

## Events

You can subscribe to all FloatingActionButton events. For a complete example on  FloatingActionButton events, refer to the [demo on using the events of the FloatingActionButton](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/events).

The following example demonstrates how to subscribe to the FloatingActionButton click event.

```HtmlHelper
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
{% if site.core %}
```TagHelper
   <kendo-floatingactionbutton name="fab"
                                on-click="onClick"
                                on-expand="onExpand"
                                on-collapse="onCollapse"
                                align="FloatingActionButtonAlign.BottomCenter"
                                align-offset-vertical="50"
                                position-mode="FloatingActionButtonPositionMode.Fixed"
                                icon="share"
                                >
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Download" icon="download" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Print" icon="print" click="onItemClick"></floatingactionbutton-item>
            <floatingactionbutton-item label="Email" icon="email" click="onItemClick"></floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>

    <script>
        function onClick(e){
            //handle the FloatingActionButton click event
        };
        
        function onExpand(e){
            //handle the FloatingActionButton expand event
        };

        function onCollapse(e){
            //handle the FloatingActionButton collapse event
        };

        function onItemClick(e){
            //handle the FloatingActionButton action item event
        };
    </script>
```
{% endif %}

## See Also

* [Overview of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/index)
{% if site.core %}
* [Basic Usage of the FloatingActionButton TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/floatingactionbutton/tag-helper)
{% endif %}
* [Using the API of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Server-Side API](/api/floatingactionbutton)
