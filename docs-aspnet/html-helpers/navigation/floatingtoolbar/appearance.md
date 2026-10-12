---
title: Appearance
page_title: Appearance
description: "Learn how to configure the size and fill mode of the Telerik UI FloatingToolBar for {{ site.framework }}."
components: ["floatingtoolbar"]
slug: floatingtoolbar_appearance
position: 3
---

# Appearance

The FloatingToolBar for {{ site.framework }} provides options for controlling the styling of the hosted ToolBar and its tools.

## Options

The FloatingToolBar supports the following styling options:

* [`Size()`](#size)&mdash;Configures the overall size of the toolbar and its tools.
* [`FillMode()`](#fill-mode)&mdash;Configures how the color is applied to the toolbar and its tools.

## Size

The `Size()` option controls the size of the hosted ToolBar and its tools. It accepts the following `ComponentSize` values:

* `Small`
* `Medium` (default)
* `Large`

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Size(ComponentSize.Large)
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Print").Icon("print");
            items.Add().Type(CommandType.Button).Text("Download").Icon("download");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" size="ComponentSize.Large">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Print" icon="print" />
            <item type="CommandType.Button" text="Download" icon="download" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Fill Mode

The `FillMode()` option controls how the color is applied to the toolbar and its tools. It accepts the following `FillMode` values:

* `Solid` (default)
* `Flat`
* `Outline`

```HtmlHelper
    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .FillMode(FillMode.Flat)
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Print").Icon("print");
            items.Add().Type(CommandType.Button).Text("Download").Icon("download");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" fill-mode="FillMode.Flat">
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Print" icon="print" />
            <item type="CommandType.Button" text="Download" icon="download" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Next Steps

* [Configuring the Overflow of the FloatingToolBar]({% slug floatingtoolbar_overflow %})
* [Handling the FloatingToolBar Events]({% slug floatingtoolbar_events %})
* [Accessibility of the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [FloatingToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingtoolbar)
