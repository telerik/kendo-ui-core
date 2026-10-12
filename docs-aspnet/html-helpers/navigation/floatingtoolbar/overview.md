---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FloatingToolBar component for {{ site.framework }}."
components: ["floatingtoolbar"]
slug: htmlhelpers_floatingtoolbar_aspnetcore
position: 0
---

# {{ site.framework }} FloatingToolBar Overview

{% if site.core %}
The Telerik UI FloatingToolBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI FloatingToolBar widget.
{% else %}
The Telerik UI FloatingToolBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FloatingToolBar widget.
{% endif %}

The FloatingToolBar hosts a [ToolBar]({% slug htmlhelpers_toolbar_aspnetcore %}) in a floating container. Use it for contextual commands that must stay close to a region of the page, such as formatting tools for selected content or actions for a card, document, or call window.

The component supports two positioning modes:

* **Free-position mode**&mdash;Aligns the toolbar inside its closest positioned ancestor by using the `ContainerAlign()` and `Margin()` options.
* **Anchored mode**&mdash;Places the toolbar beside a target element by using the `Anchor()` and `Position()` options.

The hosted ToolBar renders the commands and handles the overflow. Define the commands through the `Items()` option, which uses the same item configuration as the ToolBar.

## Initializing the FloatingToolBar

The following example demonstrates how to define a FloatingToolBar with shipment actions at the bottom of a positioned container.

```HtmlHelper
    <div id="shipment-details" style="position: relative; height: 240px;">
        <p>Shipment SH-20418 left the Port of Rotterdam and is expected at the Singapore hub in 14 days.</p>

        @(Html.Kendo().FloatingToolBar()
            .Name("floatingtoolbar")
            .Visible(true)
            .ContainerAlign(align => align
                .Horizontal(FloatingToolBarHorizontalAlign.Center)
                .Vertical(FloatingToolBarVerticalAlign.Bottom))
            .Items(items =>
            {
                items.Add().Type(CommandType.Button).Text("Track").Icon("map-marker-target");
                items.Add().Type(CommandType.Button).Text("Print").Icon("print");
                items.Add().Type(CommandType.Separator);
                items.Add().Type(CommandType.Button).Text("Share").Icon("share");
            })
        )
    </div>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <div id="shipment-details" style="position: relative; height: 240px;">
        <p>Shipment SH-20418 left the Port of Rotterdam and is expected at the Singapore hub in 14 days.</p>

        <kendo-floatingtoolbar name="floatingtoolbar" visible="true">
            <container-align horizontal="FloatingToolBarHorizontalAlign.Center" vertical="FloatingToolBarVerticalAlign.Bottom" />
            <floatingtoolbar-items>
                <item type="CommandType.Button" text="Track" icon="map-marker-target" />
                <item type="CommandType.Button" text="Print" icon="print" />
                <item type="CommandType.Separator" />
                <item type="CommandType.Button" text="Share" icon="share" />
            </floatingtoolbar-items>
        </kendo-floatingtoolbar>
    </div>
```
{% endif %}
```Controller
    public class FloatingToolBarController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
```

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Positioning]({% slug floatingtoolbar_positioning %}) | Align the toolbar inside a container or anchor it to a page element. |
| [Appearance]({% slug floatingtoolbar_appearance %}) | Configure the size and fill mode of the toolbar. |
| [Overflow]({% slug floatingtoolbar_overflow %}) | Choose how the hosted ToolBar handles commands that do not fit. |
| [Events]({% slug floatingtoolbar_events %}) | Respond to visibility changes and to toolbar movement. |
| [Accessibility]({% slug htmlhelpers_floatingtoolbar_accessibility %}) | Provide an accessible name and use the [keyboard navigation]({% slug keynav_aspnetcore_floatingtoolbar %}) to reach and move the toolbar. |

## Next Steps

* [Getting Started with the FloatingToolBar]({% slug floatingtoolbar_getting_started %})
* [Configuring the Position of the FloatingToolBar]({% slug floatingtoolbar_positioning %})
* [Customizing the Appearance of the FloatingToolBar]({% slug floatingtoolbar_appearance %})
* [Configuring the Overflow of the FloatingToolBar]({% slug floatingtoolbar_overflow %})
* [Handling the FloatingToolBar Events]({% slug floatingtoolbar_events %})
* [Accessibility of the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [FloatingToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingtoolbar)
* [Knowledge Base Section](/knowledge-base)
