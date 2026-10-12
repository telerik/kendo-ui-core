---
title: Positioning
page_title: Positioning
description: "Learn how to align the Telerik UI FloatingToolBar for {{ site.framework }} inside a container or anchor it to a target element."
components: ["floatingtoolbar"]
slug: floatingtoolbar_positioning
position: 2
---

# Positioning

The FloatingToolBar for {{ site.framework }} can be aligned inside its closest positioned container or anchored to a target element. Set the `Anchor()` option to use the anchored mode. When `Anchor()` is not set, the component uses the free-position mode.

## Aligning in a Container

In the free-position mode, the toolbar is placed inside the closest ancestor whose CSS `position` is `relative`, `absolute`, `fixed`, or `sticky`. If no such ancestor exists, the toolbar is aligned to the document body.

Use the `ContainerAlign()` option to set the alignment:

* `Horizontal()`&mdash;Accepts `FloatingToolBarHorizontalAlign.Left`, `Center`, or `Right`.
* `Vertical()`&mdash;Accepts `FloatingToolBarVerticalAlign.Top`, `Center`, or `Bottom`.

The `Margin()` option adds horizontal and vertical offsets in pixels. Use negative values to move the toolbar up or to the left.

```HtmlHelper
    <div id="invoice-panel" style="position: relative; height: 240px;">
        <p>Invoice INV-30871 for 120 units of laboratory reagents is awaiting approval.</p>

        @(Html.Kendo().FloatingToolBar()
            .Name("floatingtoolbar")
            .Visible(true)
            .ContainerAlign(align => align
                .Horizontal(FloatingToolBarHorizontalAlign.Right)
                .Vertical(FloatingToolBarVerticalAlign.Bottom))
            .Margin(margin => margin.Horizontal(-12).Vertical(-16))
            .Items(items =>
            {
                items.Add().Type(CommandType.Button).Text("Approve").Icon("check");
                items.Add().Type(CommandType.Button).Text("Reject").Icon("cancel");
            })
        )
    </div>
```
{% if site.core %}
```TagHelper
    <div id="invoice-panel" style="position: relative; height: 240px;">
        <p>Invoice INV-30871 for 120 units of laboratory reagents is awaiting approval.</p>

        <kendo-floatingtoolbar name="floatingtoolbar" visible="true">
            <container-align horizontal="FloatingToolBarHorizontalAlign.Right" vertical="FloatingToolBarVerticalAlign.Bottom" />
            <margin horizontal="-12" vertical="-16" />
            <floatingtoolbar-items>
                <item type="CommandType.Button" text="Approve" icon="check" />
                <item type="CommandType.Button" text="Reject" icon="cancel" />
            </floatingtoolbar-items>
        </kendo-floatingtoolbar>
    </div>
```
{% endif %}

> The FloatingToolBar detects the positioned container when it initializes. Make sure the `position` style of the container is applied before the component initializes, for example, by using an inline style or a stylesheet loaded in the `<head>` of the page.

## Anchoring to an Element

Set the `Anchor()` option to a selector of the target element. The `Position()` option sets the side of the target at which the toolbar appears and accepts `FloatingToolBarPosition.Top` (default), `Bottom`, `Left`, or `Right`. When the requested side does not have enough room, the toolbar flips or shifts to stay in view.

When `Anchor()` is set, the `ContainerAlign()` option is ignored. The `Margin()` option still applies.

```HtmlHelper
    <p id="shipment-note">Shipment SH-20418 is ready for customs review.</p>

    @(Html.Kendo().FloatingToolBar()
        .Name("floatingtoolbar")
        .Visible(true)
        .Anchor("#shipment-note")
        .Position(FloatingToolBarPosition.Bottom)
        .Margin(margin => margin.Vertical(8))
        .Items(items =>
        {
            items.Add().Type(CommandType.Button).Text("Review").Icon("eye");
            items.Add().Type(CommandType.Button).Text("Comment").Icon("comment");
        })
    )
```
{% if site.core %}
```TagHelper
    <p id="shipment-note">Shipment SH-20418 is ready for customs review.</p>

    <kendo-floatingtoolbar name="floatingtoolbar" visible="true" anchor="#shipment-note" position="FloatingToolBarPosition.Bottom">
        <margin vertical="8" />
        <floatingtoolbar-items>
            <item type="CommandType.Button" text="Review" icon="eye" />
            <item type="CommandType.Button" text="Comment" icon="comment" />
        </floatingtoolbar-items>
    </kendo-floatingtoolbar>
```
{% endif %}

## Changing the Position at Runtime

Use the client-side API of the FloatingToolBar to change its position after initialization:

* `setAnchor(target)`&mdash;Anchors the toolbar to a new target element. Call `setAnchor()` without an argument to return to the container alignment.
* `setPosition({ top, left })`&mdash;Moves the toolbar to explicit coordinates in the free-position mode.

```JavaScript
    var floatingToolBar = $("#floatingtoolbar").data("kendoFloatingToolBar");

    floatingToolBar.setAnchor("#customs-note");
    floatingToolBar.setAnchor();
    floatingToolBar.setPosition({ top: 24, left: 48 });
```

## Next Steps

* [Customizing the Appearance of the FloatingToolBar]({% slug floatingtoolbar_appearance %})
* [Configuring the Overflow of the FloatingToolBar]({% slug floatingtoolbar_overflow %})
* [Handling the FloatingToolBar Events]({% slug floatingtoolbar_events %})
* [Accessibility of the FloatingToolBar]({% slug htmlhelpers_floatingtoolbar_accessibility %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keynav_aspnetcore_floatingtoolbar %})

## See Also

* [FloatingToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/floatingtoolbar)
