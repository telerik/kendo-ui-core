---
title: Overview
page_title: Overview
description: "Try now the Telerik UI FloatingActionButton component for {{ site.framework }} providing various alignment options for its items and complete control over its appearance."
slug: htmlhelpers_floatingactionbutton_aspnetcore
position: 0
---

# {{ site.framework }} FloatingActionButton Overview

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

The following example demonstrates how to initialize the FloatingActionButton, configure its items, and set its position.

```HtmlHelper
    @(Html.Kendo().FloatingActionButton()
        .Name("fab")
        .ThemeColor(FloatingActionButtonThemeColor.Primary)
        .Align(FloatingActionButtonAlign.BottomEnd)
        .AlignOffset(ao=>ao.Horizontal(50).Vertical(50))
        .PositionMode(FloatingActionButtonPositionMode.Absolute)
        .Size(FloatingActionButtonSize.Medium)
        .Shape(FloatingActionButtonShape.Pill)
        .Icon("share")
        .Items(items=>{
            items.Add().Icon("download").Label("Download").Click(onItemClick);
            items.Add().Icon("print").Label("Print").Click(onItemClick);
            items.Add().Icon("envelop").Label("Email").Click(onItemClick);
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
                                align="FloatingActionButtonAlign.BottomEnd"
                                align-offset-vertical="50"
                                align-offset-horizontal="50"
                                position-mode="FloatingActionButtonPositionMode.Absolute"
                                icon="share"
                                size="FloatingActionButtonSize.Medium"
                                theme-color="FloatingActionButtonThemeColor.Info">
        <floatingactionbutton-items>
            <floatingactionbutton-item label="Download"
                                       icon="download"
                                       click="onItemClick">
            </floatingactionbutton-item>
            <floatingactionbutton-item label="Print"
                                       icon="print"
                                       click="onItemClick">
            </floatingactionbutton-item>
            <floatingactionbutton-item label="Email"
                                       icon="envelop"
                                       click="onItemClick">
            </floatingactionbutton-item>
        </floatingactionbutton-items>
    </kendo-floatingactionbutton>
```
{% endif %}

## Functionality and Features

* [Alignment]({% slug htmlhelpers_alignment_floatingactionbutton_aspnetcore %})&mdash;The FloatingActionButton provides options that allow you to manipulate the position of the component.
* [Appearance]({% slug htmlhelpers_appearance_floatingactionbutton_aspnetcore %})&mdash;You can set the size, color, icon, and text of the FloatingActionButton by using the built-in appearance options.
* [Templates]({% slug htmlhelpers_templates_floatingactionbutton_aspnetcore %})&mdash;The item templates allow you to control the rendering of the items in the FloatingActionButton popup.
* [Accessibility]({% slug htmlhelpers_accessibility_floatingactionbutton_aspnetcore %})&mdash;The FloatingActionButton is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.
* [Events]({% slug events_floatingactionbutton %})&mdash;The FloatingActionButton emits `Click()`, `Expand()`, and `Collapse()` events that you can use to trigger specific actions.

## Next Steps

* [Getting Started with the FloatingActionButton]({% slug floatingactionbutton_getting_started %})
* [Basic Usage of the FloatingActionButton HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/index)
{% if site.core %}
* [Basic Usage of the FloatingActionButton TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/floatingactionbutton/tag-helper)
{% endif %}

## See Also

* [Using the API of the FloatingActionButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/floatingactionbutton/api)
* [Knowledge Base Section](/knowledge-base)
